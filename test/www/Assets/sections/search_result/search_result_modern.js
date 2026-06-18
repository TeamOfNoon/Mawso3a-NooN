// ============================================================
// UTILS
// ============================================================

const esc = (s) => {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

const cleanDisplayUrl = (url) => {
  if (!url) return "";
  let u = url.split("?")[0];
  if (u.startsWith("./")) u = u.slice(2);
  return u;
};

const splitSmart = (input) => {
  if (!input) return [];

  const parts = [];
  let cur = "";
  let inQuote = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input.charAt(i);

    if (['"', "«", "»", "\u201c", "\u201d"].includes(ch)) {
      inQuote = !inQuote;
      cur += ch;
      continue;
    }

    if (ch === "|" && !inQuote && input.charAt(i - 1) !== "\\") {
      if (cur.trim()) parts.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }

  if (cur.trim()) parts.push(cur.trim());

  return parts.map((p) => p.replace(/\\\|/g, "|"));
};

const getRhSearchFromUrl = (url) => {
  if (!url) return "";
  const qIndex = url.indexOf("?");
  if (qIndex === -1) return "";

  for (const part of url.slice(qIndex + 1).split("&")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const key = part.slice(0, eq);
    const val = part.slice(eq + 1);
    if (key === "rhsearch") {
      try {
        return decodeURIComponent(val.replace(/\+/g, " "));
      } catch {
        return val;
      }
    }
  }
  return "";
};

const convertToJsonPath = (url) => {
  if (!url) return "";
  const query = url.split("?")[1] || "";
  const clean = url.split("?")[0];
  const match = clean.match(/post_(\d+)\.html$/);
  if (!match) {
    console.log("INVALID URL:", url);
    return "";
  }
  const postId = match[1];
  const forumMatch = clean.match(/index\.php\/([^/]+)\//);
  const forum = forumMatch ? forumMatch[1] : "forum_mn33";
  let result = `./index.php/${forum}/js_json/posts/post_${postId}.js`;
  if (query) result += `?${query}`;
  return result;
};

const buildSnippet = (text, maxLength) => {
  if (!text) return "";
  text = text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
  if (maxLength && text.length > maxLength) text = text.slice(0, maxLength) + "...";
  return text;
};

// ============================================================
// TEXT INDEXER
// ============================================================

class TextIndexer {
  constructor(text, itemElement, onComplete) {
    this.rawText    = text || "";
    this.text       = "";
    this.brOffsets  = [];
    this.norm       = "";
    this.map        = [];
    this.wordStarts = [];
    this.itemElement = itemElement;
    this.onComplete  = onComplete;
    this.isIndexing  = false;
    this.isComplete  = false;
  }

  // ── Arabic canonical normalizer ──────────────────────────
  canon(ch) {
    if (!ch) return "";
    if (/[\u0622\u0623\u0625\u0671]/.test(ch)) return "\u0627";
    if (ch === "\u0649") return "\u064A";
    if (ch === "\u0629") return "\u0647";
    if (ch === "\u0624") return "\u0648";
    if (ch === "\u0626") return "\u064A";
    if (ch === "\u0671") return "\u0627";
    if (ch === "\uFEFB" || ch === "\u0644\u0627") return "\u0644\u0627";
    if (/[\u064B-\u065F\u06D6-\u06ED\u0640.,;:!\u061F\u2026()\[\]{}"'«»\u201c\u201d~\-_=+<>\u0660%*^$#@&]/.test(ch)) return "";
    if (/[0-9\u0660-\u0669]/.test(ch)) return String.fromCharCode((ch.charCodeAt(0) % 0x10) + 48);
    if (/[\u0621-\u064A]/.test(ch)) return ch;
    if (/[A-Za-z]/.test(ch)) return ch.toLowerCase();
    if (/\s/.test(ch)) return " ";
    return "";
  }

  // ── Walk DOM collecting text nodes ───────────────────────
  getAllTextNodes(container) {
    const out = [];
    const walk = (n) => {
      if (!n) return;
      if (n.nodeType === 3) {
        out.push(n);
      } else {
        if (n.tagName === "BR") out.push({ nodeValue: " ", _isBR: true });
        let c = n.firstChild;
        while (c) { walk(c); c = c.nextSibling; }
      }
    };
    walk(container);
    return out;
  }

  // ── Async index build ─────────────────────────────────────
  buildIndexAsync(done) {
    if (this.isIndexing || this.isComplete) return;
    this.isIndexing = true;

    const statusDiv = this.itemElement.querySelector(".index-status");
    const updateStatus = (msg) => {
      if (statusDiv) statusDiv.innerHTML = `<span class="index-progress">${esc(msg)}</span>`;
    };

    const textContainer = document.createElement("div");
    textContainer.innerHTML = this.rawText;
    const nodes = this.getAllTextNodes(textContainer);

    // ── Phase 1: collect raw text ────────────────────────
    let off = 0;
    let i   = 0;

    const step1 = () => {
      const start = Date.now();
      while (i < nodes.length && Date.now() - start < 60) {
        const v = nodes[i].nodeValue || "";
        if (nodes[i]._isBR) this.brOffsets.push(off);
        this.text += v;
        off += v.length;
        i++;
      }
      if (i < nodes.length) {
        updateStatus(`Indexing text... ${Math.floor((i / nodes.length) * 50)}%`);
        setTimeout(step1, 10);
      } else {
        buildNorm();
      }
    };

    // ── Phase 2: build normalized index ──────────────────
    const buildNorm = () => {
      this.norm       = "";
      this.map        = [];
      this.wordStarts = [];

      let lastSpace = true;
      let k         = 0;
      const len     = this.text.length;

      const chunk = () => {
        const startTick = Date.now();
        while (k < len && Date.now() - startTick < 60) {
          const ch = this.canon(this.text.charAt(k));
          if (!ch) { k++; continue; }

          if (ch === " ") {
            if (this.norm.length && this.norm.charAt(this.norm.length - 1) !== " ") {
              this.norm += " ";
              this.map.push(k);
              lastSpace = true;
            }
          } else {
            if (lastSpace) this.wordStarts.push(this.norm.length);
            this.norm += ch;
            this.map.push(k);
            lastSpace = false;
          }
          k++;
        }

        if (k < len) {
          updateStatus(`Indexing text... ${50 + Math.floor((k / len) * 50)}%`);
          setTimeout(chunk, 10);
        } else {
          this.isComplete = true;
          this.isIndexing = false;
          updateStatus(`Indexed ${this.norm.length} chars, ${this.wordStarts.length} words`);
          this.onComplete?.(this);
          done?.();
        }
      };

      chunk();
    };

    step1();
  }

  // ── Normalize a search query ──────────────────────────────
  canonicalQuery(q) {
    let result = "";
    for (const rawCh of q) {
      const ch = this.canon(rawCh);
      if (ch === " ") {
        if (result.length && result.at(-1) !== " ") result += " ";
      } else if (ch) {
        result += ch;
      }
    }
    return result.trim().replace(/\s+/g, " ");
  }

  // ── Context window helpers ────────────────────────────────
  expandLeft(pos, chars) {
    const SKIP = /[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED\u0640\s]/;
    let moved = 0, p = pos - 1;
    while (p >= 0 && moved < chars) {
      if (!SKIP.test(this.text.charAt(p))) moved++;
      p--;
    }
    return Math.max(0, p + 1);
  }

  expandRight(pos, chars) {
    const SKIP = /[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED\u0640\s]/;
    let moved = 0, p = pos;
    while (p < this.text.length && moved < chars) {
      if (!SKIP.test(this.text.charAt(p))) moved++;
      p++;
    }
    return Math.min(this.text.length, p);
  }





















renderSnippets(rawQuery, contextChars = 40, showAll = false) {
  if (!this.isComplete) return "\u29D7 Indexing not yet complete";
  if (!rawQuery)        return "No search query";

  let baseLink = "";
  if (this.itemElement) {
    let jsonUrl = (this.itemElement.getAttribute("data-json-url") || "")
      .split("?")[0].split("#")[0];

    if (jsonUrl) {
      baseLink = jsonUrl
        .replace(/\/js_json\/posts\//, "/")
        .replace(/\.js$/i, ".html");
    }
  }

  const isWholeWord = (norm, pos, length) => {
    const WORD = /[A-Za-z0-9\u0621-\u064A\u0640]/;
    const before = norm.charAt(pos - 1);
    const after  = norm.charAt(pos + length);
    return (!before || !WORD.test(before)) && (!after || !WORD.test(after));
  };

  // =============================
  // Parse terms
  // =============================
  const parsedTerms = splitSmart(rawQuery).reduce((acc, kw, i) => {
    const quoted =
      (kw.charAt(0) === '"' && kw.at(-1) === '"') ||
      (kw.charAt(0) === "\u00AB" && kw.at(-1) === "\u00BB") ||
      (kw.charAt(0) === "\u201C" && kw.at(-1) === "\u201D");

    const clean = quoted ? kw.slice(1, -1).trim() : kw;
    const q = this.canonicalQuery(clean);

    if (q) acc.push({ q, quoted, termIndex: i });
    return acc;
  }, []);

  if (!parsedTerms.length) return "No search query";

  // =============================
  // Collect hits per term
  // =============================
  const allHitsPerTerm = parsedTerms.map((pt) => {
    const hits = [];
    let pos = 0;

    while ((pos = this.norm.indexOf(pt.q, pos)) !== -1) {
      if (!pt.quoted || isWholeWord(this.norm, pos, pt.q.length)) {
        hits.push({
          normStart : pos,
          normEnd   : pos + pt.q.length - 1,
          termIndex : pt.termIndex
        });
      }
      pos += pt.q.length;
    }

    // keep order inside term
    hits.sort((a, b) => a.normStart - b.normStart);
    return hits;
  });

  let hits = allHitsPerTerm.flat();
  if (!hits.length) return "No results found in text";

  const totalMatches = hits.length;

  // =============================
  // 🔥 IMPORTANT: assign REAL IDs (same as runSearch)
  // =============================
  let termCounts = {};
  let termBase = {};
  let running = 0;

  // count per term
  hits.forEach(h => {
    termCounts[h.termIndex] = (termCounts[h.termIndex] || 0) + 1;
  });

  // base per term
  Object.keys(termCounts).sort((a,b)=>a-b).forEach(k => {
    termBase[k] = running;
    running += termCounts[k];
  });

  // assign IDs
  let local = {};
  hits.forEach(h => {
    local[h.termIndex] = (local[h.termIndex] || 0) + 1;
    h.realId = termBase[h.termIndex] + local[h.termIndex];
  });

  // =============================
  // preview limit
  // =============================
  let limited;
  if (showAll) {
    limited = hits;
  } else {
    const seen = {};
    limited = hits.filter(h => {
      seen[h.termIndex] = (seen[h.termIndex] || 0) + 1;
      return seen[h.termIndex] <= 2;
    });
  }

  // =============================
  // Build snippets
  // =============================
  const snippetHTML = limited.map((hit) => {

    let a = this.map[hit.normStart];
    let b = this.map[hit.normEnd];

    // fallback mapping
    if (a == null || b == null) {
      for (let i = hit.normStart; i >= 0; i--) {
        if (this.map[i] != null) { a = this.map[i]; break; }
      }
      for (let i = hit.normEnd; i < this.map.length; i++) {
        if (this.map[i] != null) { b = this.map[i]; break; }
      }
    }

    if (a == null || b == null) return "";

    const bNext = b + 1;
    const start = this.expandLeft(a, contextChars);
    const end   = this.expandRight(bNext, contextChars);

    const matched = this.text.slice(a, bNext);

    const resultUrl = this.itemElement?.getAttribute("data-result-url") || "";
    const fullSearchQuery = getRhSearchFromUrl(resultUrl) || rawQuery;

    const id = hit.realId;

    const href =
      baseLink +
      `#&rhsearch=${encodeURIComponent(fullSearchQuery)}&hitid=${id}`;

    return (
      `<div class="snip-one" style="margin-bottom:8px;border-bottom:1px solid #eee;padding-bottom:6px;">` +
        `<b style="color:#06c">#${id} </b>` +
        `…` +
        esc(this.text.slice(start, a).replace(/\s+/g, " ")) +
        `<a class = "do_yelow_hit" href="${esc(href)}" target="_parent"
           style="">` +
          esc(matched) +
        `</a>` +
        esc(this.text.slice(bNext, end).replace(/\s+/g, " ")) +
        `…</div>`
    );

  }).join("");

  const header =
    `<div style="margin-bottom:6px;color:#e91e63;font-size:12px;">` +
    `🔍 ${totalMatches} match${totalMatches > 1 ? "es" : ""}` +
    `</div>`;

  if (showAll) return header + snippetHTML;

  const needMore = Object.values(
    hits.reduce((acc, { termIndex }) => {
      acc[termIndex] = (acc[termIndex] || 0) + 1;
      return acc;
    }, {})
  ).some(count => count > 2);

  if (!needMore) return header + snippetHTML;

  return (
    header + snippetHTML +
    `<div style="margin-top:5px;">` +
      `<a href="javascript:void(0)" onclick="openSnipOverlay(this)"
         style="color:#6b16a9;font-weight:bold;">more (${totalMatches})</a>` +
    `</div>`
  );
}



















}

// ============================================================
// STATE
// ============================================================

let overlayOpen = false;
let lastHeight  = -1;
let resizeTimer = null;
const indexers  = {};
const container = document.getElementById("container");

// ============================================================
// VIRTUAL SCROLL HELPERS
// ============================================================

const destroyVirtualScroll = (elementId) => {
  const $el      = $(`#${elementId}`);
  const el       = $el[0];
  const instance = el?.__mqData?.["VirtualScrollPro"];

  if (!instance) return false;

  instance.destroy();
  delete el.__mqData["VirtualScrollPro"];

  el.querySelector(".scrollbar")?.remove();

  $el.css({ position: "", width: "", height: "", border: "", overflow: "", background: "" });

  el.className = el.className.replace(
    /rtl-horizontal|ltr-horizontal|rtl-vertical|ltr-vertical|vertical|horizontal/g,
    ""
  );

  for (const id of ["#rowsA", "#rowsB"]) {
    const node = el.querySelector(id);
    if (node) { node.innerHTML = ""; node.style.display = ""; }
  }

  const info = el.querySelector("#info");
  if (info) info.textContent = "";

  const widgetId = $el.attr("id");
  if (widgetId) $(window).off(`resize.${widgetId}`);

  return true;
};

// ============================================================
// OVERLAY
// ============================================================
const closeSnipOverlay = () => {
  overlayOpen = false;

  const overlay = document.getElementById("snipOverlay");
  const content = document.getElementById("snipOverlayContent");
  if (!overlay || !content) return;

  destroyVirtualScroll("snipOverlayContent");

  content.querySelector("#rowsA")?.replaceChildren();
  content.querySelector("#rowsB")?.replaceChildren();

  overlay.style.display = "none";

  triggerHeightCheck();

  window.parent?.postMessage?.(
    { type: "ifram_full", full: false },
    "*"
  );

  // 🔥 FIX HERE
  setTimeout(sendHeightStable, 50);
};
let vs;
const openSnipOverlay = (el) => {
  overlayOpen = true;
  window.parent?.postMessage?.({ type: "ifram_full", full: true }, "*");

  const overlay = document.getElementById("snipOverlay");
  const content = document.getElementById("snipOverlayContent");
  if (!overlay || !content) return;

  const item = el.closest?.(".result-item") ??
    (() => {
      let node = el;
      while (node && !node.classList?.contains("result-item")) node = node.parentNode;
      return node;
    })();

  if (!item) return;

  const itemId  = item.getAttribute("data-item-id");
  const indexer = indexers[itemId];

  if (!indexer?.isComplete) {
    content.innerHTML     = "Indexing not yet complete";
    overlay.style.display = "block";
    return;
  }

  destroyVirtualScroll("snipOverlayContent");

  const rhsearch   = getRhSearchFromUrl(item.getAttribute("data-result-url") || "");
  const allSnippets = indexer.renderSnippets(rhsearch, 60, true);

  const tempDiv  = document.createElement("div");
  tempDiv.innerHTML = allSnippets;
  const snipNodes = tempDiv.querySelectorAll(".snip-one");

  const myData = snipNodes.length > 0
  ? Array.from(snipNodes, (node, i) => {

      // 🔥 extract hitId from snippet
      const match = node.innerHTML.match(/#(\d+)/);
      const hitId = match ? parseInt(match[1], 10) : (i + 1);

      return {
        id: hitId, // ✅ real hit id (important)
        html: `<div class="row">${node.outerHTML}</div>`
      };
    })
  : [{
      id: 1,
      html: `<div class="row">
               <div class="snips">${allSnippets}</div>
             </div>`
    }];

  setTimeout(() => {
 const $el = $("#snipOverlayContent");

$el.VirtualScrollPro({
  scroll_dir: "vertical",
  header    : "#vHeader",
  footer    : "#vFooter",
  dir       : "rtl",
  width     : "100%",
  height    : "100%",
  data      : myData,
});

// 🔥 get REAL instance
vs = $el[0].__mqData?.["VirtualScrollPro"];
  
}, 10);

  overlay.style.display = "block";
  triggerHeightCheck();
  

  
  
};







// ============================================================
// RESULT RENDERING
// ============================================================

// Convert query string to hash fragment and add hitid=null
const buildTitleUrl = (url) => {
  if (!url) return url;

  // split on existing hash
  const hashPos = url.indexOf("#");
  const base = hashPos === -1 ? url : url.slice(0, hashPos);
  const existingHash = hashPos === -1 ? "" : url.slice(hashPos + 1); // strip the # itself

  // split base into path and query
  const qPos = base.indexOf("?");
  const path  = qPos === -1 ? base : base.slice(0, qPos);
  const query = qPos === -1 ? ""   : base.slice(qPos + 1); // strip the ? itself

  // build new hash: #&query&hitid=null   (or just #&hitid=null if no query)
  const parts = [];
  if (query)        parts.push(query);
  if (existingHash) parts.push(existingHash);

  // add hitid=null only if not already present
  if (!/(?:^|&)hitid=/.test(parts.join("&"))) {
    parts.push("hitid=null");
  }

  return `${path}#&${parts.join("&")}`;
};


const writeResult = (url, title, index, summary) => {
  const jsonUrl  = convertToJsonPath(url);
  const titleUrl = buildTitleUrl(url); // ✅ hash-based URL with hitid=null
 
  return (
    `<div class="result-item" data-json-url="${esc(jsonUrl)}" data-result-url="${esc(url)}" data-indexed="false">` +
      `<div class="result-header">` +
        `<a class="result-title" href="${esc(titleUrl)}" target="_parent">[ ${esc(index)} ] ${esc(title)}</a>` +
      `</div>` +
      `<div class="url">${esc(cleanDisplayUrl(url))}</div>` +
      `<div class="result-summary">${esc(summary)}</div>` +
      `<div class="snips">Loading content...</div>` +
      `<div class="index-status"></div>` +
    `</div>`
  );
};

const applySnippetsToItem = (item, indexer) => {
  const resultUrl = item.getAttribute("data-result-url") || "";
  const rhsearch  = getRhSearchFromUrl(resultUrl);
  const snipDiv   = item.querySelector(".snips");
  if (!snipDiv) return;

  snipDiv.innerHTML = rhsearch
    ? indexer.renderSnippets(rhsearch, 40)
    : "No rhsearch in URL";

  triggerHeightCheck();
};

const loadJsonForItem = (item, itemId) => {
  if (item.getAttribute("data-script-created") === "true") return;

  const jsonUrl = item.getAttribute("data-json-url");
  if (!jsonUrl) return;

  const script  = Object.assign(document.createElement("script"), {
    type : "text/javascript",
    async: true,
    src  : jsonUrl,
  });

  script.onload = () => {
    try {
      if (window.RAW_JSON?.long_text) {
        const indexer = new TextIndexer(window.RAW_JSON.long_text, item, (done) => {
          item.setAttribute("data-indexed", "true");
          applySnippetsToItem(item, done);
        });
        indexers[itemId] = indexer;
        indexer.buildIndexAsync();
      } else {
        const snipDiv   = item.querySelector(".snips");
        const statusDiv = item.querySelector(".index-status");
        if (snipDiv)   snipDiv.innerHTML   = "No text content to index";
        if (statusDiv) statusDiv.innerHTML = `<span class="index-progress">No text to index</span>`;
      }
    } catch (err) {
      console.error("load error:", err);
      const snipDiv = item.querySelector(".snips");
      if (snipDiv) snipDiv.innerHTML = "Error loading content";
    } finally {
      try { delete window.RAW_JSON;            } catch { /* ignore */ }
      try { document.head.removeChild(script); } catch { /* ignore */ }
    }
  };

  script.onerror = () => {
    const snipDiv   = item.querySelector(".snips");
    const statusDiv = item.querySelector(".index-status");
    if (snipDiv)   snipDiv.innerHTML   = "Failed to load data";
    if (statusDiv) statusDiv.innerHTML = `<span class="index-progress">Failed to load data</span>`;
  };

  document.head.appendChild(script);
  item.setAttribute("data-script-created", "true");
};

const createScriptTags = () => {
  document.querySelectorAll(".result-item").forEach((item, i) => {
    const itemId = `item_${Date.now()}_${i}_${Math.floor(Math.random() * 100_000)}`;
    item.setAttribute("data-item-id", itemId);
    loadJsonForItem(item, itemId);
  });
};





// Helper: add hitid=null to URL if not already present
const addHitIdNull = (url) => {
  if (!url) return url;
 
  // keep hash as-is
  const hashPos = url.indexOf("#");
  const base = hashPos === -1 ? url : url.slice(0, hashPos);
  const hash = hashPos === -1 ? ""  : url.slice(hashPos);
 
  // don't duplicate if hitid already exists
  if (/[?&]hitid=/.test(base)) return url;
 
  const out = base.includes("?")
    ? `${base}&hitid=null`
    : `${base}?hitid=null`;
 
  return out + hash;
};





// ============================================================
// HEIGHT SYSTEM
// ============================================================










const getDocHeight = () => {
  const { body, documentElement: html } = document;
  body.style.height = html.style.height = "auto";
  void body.offsetHeight; // force reflow
  return Math.max(body.scrollHeight, body.offsetHeight);
};

const sendHeightStable = () => {
  if (overlayOpen) return;
  const h = getDocHeight();
  if (h !== lastHeight) {
    lastHeight = h;
    window.parent?.postMessage?.({ type: "resize", height: h }, "*");
  }
};

const triggerHeightCheck = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(sendHeightStable, 30);
};

// ============================================================
// RESULT MANAGEMENT
// ============================================================

const clearResults = () => {
  container.innerHTML = "";
  Object.keys(indexers).forEach((k) => delete indexers[k]);
  lastHeight = -1;
  [0, 50, 150].forEach((delay) => setTimeout(sendHeightStable, delay));
};

const renderBatch = (arr) => {
  container.innerHTML = arr.map(({ url, title, index, summary }) =>
    writeResult(url, title, index, summary)
  ).join("");
  setTimeout(createScriptTags, 10);
  [0, 50, 150, 300].forEach((delay) => setTimeout(triggerHeightCheck, delay));
};

const appendItem = ({ url, title, index, summary }) => {
  container.insertAdjacentHTML("beforeend", writeResult(url, title, index, summary));
  setTimeout(() => {
    const last = container.lastElementChild;
    if (last) {
      const itemId = `item_${Date.now()}_${Math.floor(Math.random() * 100_000)}`;
      last.setAttribute("data-item-id", itemId);
      loadJsonForItem(last, itemId);
    }
  }, 10);
  triggerHeightCheck();
};

// ============================================================
// MESSAGE BUS
// ============================================================

const receive = ({ data: msg }) => {
  if (!msg?.type) return;
  switch (msg.type) {
    case "reset": clearResults();              break;
    case "batch": renderBatch(msg.data || []); break;
    case "item":  appendItem(msg.data);        break;
  }
};





document.addEventListener(
  "click",
  (ev) => {
    const a = ev.target?.closest?.("a.result-title, .snip-one a");
    if (!a) return;

    ev.preventDefault();
    ev.stopPropagation();

    // ❌ remove old
    document.querySelectorAll(".active_hit").forEach((el) => {
      el.classList.remove("active_hit");
    });

    // ✅ mark current
    a.classList.add("active_hit");

    const href = a.getAttribute("href") || "";

    // 🔥🔥 ADD THIS PART (IMPORTANT)
    const m = href.match(/hitid=(\d+)/);
    if (m) {
		
      window.__ACTIVE_HIT_ID__ = parseInt(m[1], 10);
    } else {
      window.__ACTIVE_HIT_ID__ = null;
    }

     if (vs && window.__ACTIVE_HIT_ID__) {
        vs.setHitId(window.__ACTIVE_HIT_ID__);
        vs.scrollToindex(window.__ACTIVE_HIT_ID__);
     }

    window.parent?.postMessage?.(
      { type: "clicked_url", url: href },
      "*"
    );
  },
  true
);



window.addEventListener('message', function(e) {

 if (!e || !e.data) return;


if (e.data.type === "page_info") {
	  
	   document.querySelector("html").dir = e.data.page_dir;
	   
}
if (e.data.type === "do_scroll_to") {

  setTimeout(function () {

    // 🔥 virtual scroll first
    if (vs && window.__ACTIVE_HIT_ID__) {
      vs.setHitId(window.__ACTIVE_HIT_ID__);
      vs.scrollToindex(window.__ACTIVE_HIT_ID__);
    }

    // 🔥 then DOM scroll
    const el = document.querySelector(".active_hit");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }

  }, 50); // try 50–100 if needed
}

	

});
 




window.addEventListener("message", receive,            false);
window.addEventListener("resize",  triggerHeightCheck, false);

if (window.MutationObserver) {
  new MutationObserver(triggerHeightCheck).observe(document.body, {
    childList    : true,
    subtree      : true,
    characterData: true,
  });
}

setInterval(sendHeightStable, 100);
