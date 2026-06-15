// ================== Canonical Arabic Normalizer ==================
const canon = (ch) => {
  if (/[\u0622\u0623\u0625\u0671]/.test(ch)) return "\u0627"; // آأإٱ → ا
  if (ch === "\u0649") return "\u064A";   // ى → ي
  if (ch === "\u0629") return "\u0647";   // ة → ه
  if (ch === "\u0624") return "\u0648";   // ؤ → و
  if (ch === "\u0626") return "\u064A";   // ئ → ي
  if (ch === "\uFEFB" || ch === "\u0644\u0627") return "\u0644\u0627"; // ﻻ / لا
  if (/[\u064B-\u065F\u06D6-\u06ED\u0640.,;:!؟…()\[\]{}"'«»""~\-_=+<>٪%*^$#@&]/.test(ch)) return "";
  if (/[0-9\u0660-\u0669]/.test(ch)) return String.fromCharCode((ch.charCodeAt(0) % 0x10) + 48);
  if (/[\u0621-\u064A]/.test(ch)) return ch;
  if (/[A-Za-z]/.test(ch)) return ch.toLowerCase();
  if (/\s/.test(ch)) return " ";
  return "";
};

// ================== Collect text nodes ==================
const getAllTextNodes = (root) => {
  const out = [];
  const walk = (n) => {
    if (n.nodeType === 3) {
      out.push(n);
    } else {
      if (n.tagName === "BR") out.push({ nodeValue: " ", _isBR: true });
      let c = n.firstChild;
      while (c) { walk(c); c = c.nextSibling; }
    }
  };
  walk(root);
  return out;
};

// ================== Globals ==================
let C = null;
let CNT = null;
let ORIGINAL_HTML = "";
let TEXT = "", NORM = "", MAP = [], WORD_STARTS = [], BR_OFFS = [];
let hitCounter = 0, hitCounter_snip = 0, totalFound = 0;
let HIGHLIGHTED_HITS = [];
let HIGHLIGHT_STATE = {};
let NODE_CACHE = null;
let HIT_INDEX = [];

const DOM_CACHE = { hitSpans: null, snipSpans: null };
let DOM_VERSION = 0;
let INDEX_VERSION = -1;

// ================== Async Index Builder ==================
const buildIndexAsync = (done) => {
  TEXT = "";
  BR_OFFS = [];
  
  C = document.getElementById("content");
  CNT = document.getElementById("counter");
  
  ORIGINAL_HTML = C.innerHTML;

  const nodes = getAllTextNodes(C);
  let off = 0, i = 0;
  CNT.innerText = "Indexing text... 0%";

  const step1 = () => {
    const start = Date.now();
    while (i < nodes.length && Date.now() - start < 60) {
      const v = nodes[i].nodeValue;
      if (nodes[i]._isBR) BR_OFFS.push(off);
      TEXT += v;
      off += v.length;
      i++;
    }
    if (i < nodes.length) {
      CNT.innerText = `Indexing text... ${Math.floor((i / nodes.length) * 50)}%`;
      setTimeout(step1, 10);
    } else {
      i = 0;
      buildNorm();
    }
  };

  const buildNorm = () => {
    NORM = ""; MAP = []; WORD_STARTS = [];
    let lastSpace = true;
    let k = 0;
    const len = TEXT.length;

    const chunk = () => {
      const startTick = Date.now();
      while (k < len && Date.now() - startTick < 60) {
        const ch = canon(TEXT.charAt(k));
        if (!ch) { k++; continue; }
        if (ch === " ") {
          if (NORM.length && NORM.charAt(NORM.length - 1) !== " ") {
            NORM += " "; MAP.push(k); lastSpace = true;
          }
        } else {
          if (lastSpace) WORD_STARTS.push(NORM.length);
          NORM += ch; MAP.push(k); lastSpace = false;
        }
        k++;
      }
      if (k < len) {
        CNT.innerText = `Indexing text... ${50 + Math.floor((k / len) * 50)}%`;
        setTimeout(chunk, 10);
      } else {
        CNT.innerText = `Indexed ${NORM.length} chars`;
        done?.();
      }
    };

    chunk();
  };

  step1();
};

// ================== Hit Index (binary search) ==================
const buildHitIndex = () => {
  HIT_INDEX = [];
  DOM_CACHE.hitSpans = null;

  const spans = C.querySelectorAll("span.hitX");
  const groups = new Map();

  for (const span of spans) {
    if (!span.className?.includes("hitX")) continue;
    const match = span.className.match(/hit-(\d+)/);
    if (!match) continue;
    const hitNum = parseInt(match[1], 10);
    if (!groups.has(hitNum)) groups.set(hitNum, []);
    groups.get(hitNum).push(span);
  }

  for (const [num, nodes] of groups) {
    nodes.sort((a, b) => a.offsetTop - b.offsetTop);
    HIT_INDEX.push({ num, nodes });
  }

  HIT_INDEX.sort((a, b) => a.num - b.num);
};

// Binary search lookup
const findHitByNum = (num) => {
  let lo = 0, hi = HIT_INDEX.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const h = HIT_INDEX[mid];
    if (num < h.num) hi = mid - 1;
    else if (num > h.num) lo = mid + 1;
    else return h;
  }
  return null;
};







const scrollToHit = (num) => {
  // If no hitid, find the first valid hit (starting from 1)
  if (!num || num === "null") {
    // Find first existing hit by trying indices from 1 upward
    let firstHitNum = null;
    for (let i = 1; i < 100; i++) {
      const hit = findHitByNum(i);
      if (hit && hit.nodes && hit.nodes.length > 0) {
        firstHitNum = i;
        break;
      }
    }
    
    if (firstHitNum) {
      const h = findHitByNum(firstHitNum);
      if (h && h.nodes && h.nodes[0]) {
        h.nodes[0].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
        return true;
      }
    }
    return false;
  }
  
  // Otherwise scroll to specific hit number
  const h = findHitByNum(parseInt(num));
  if (!h || !h.nodes.length) return false;

  const first = h.nodes[0];
  
  first.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest'
  });
  
  return true;
};







// ================== Clear Helpers ==================
const clearHighlights = () => {
  C.innerHTML = ORIGINAL_HTML;
  CNT.innerText = "";
  hitCounter = 0;
  hitCounter_snip = 0;
  totalFound = 0;
  NODE_CACHE = null;
  HIGHLIGHTED_HITS = [];
};

const clearAllHighlights = () => {
  HIGHLIGHT_STATE = {};
  for (const span of C.getElementsByTagName("span")) {
    if (span.className?.includes("hitX")) {
      span.style.border = "";
      span.style.padding = "";
      span.style.backgroundColor = "yellow";
    }
  }
};

// ================== splitSmart ==================
const splitSmart = (input) => {
  const parts = [];
  let cur = "", inQuote = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charAt(i);
    if (['"', '«', '»', '\u201C', '\u201D'].includes(ch)) {
      inQuote = !inQuote; cur += ch; continue;
    }
    if (ch === '|' && !inQuote && input.charAt(i - 1) !== '\\') {
      if (cur.trim()) parts.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts.map(p => p.replace(/\\\|/g, "|"));
};

// ================== escapeRegex ==================
const escapeRegex = (s) => s.replace(/([\.\*\+\?\^${}()])/g, "\\$1");

// ================== Node Cache Builder ==================
const ensureNodeCache = () => {
  if (NODE_CACHE) return;
  NODE_CACHE = [];
  let off = 0;
  for (const n of getAllTextNodes(C)) {
    const len = n.nodeValue.length;
    NODE_CACHE.push({ n, s: off, e: off + len });
    off += len;
  }
};

// ================== Batch Highlighter ==================
const highlightRangeAbsBatch = (ranges) => {
  if (!ranges?.length) return;

  ensureNodeCache();

  const grouped = {};
  for (const r of ranges) {
    const g = r.groupIndex ?? 0;
    (grouped[g] ??= []).push(r);
  }
  const groupKeys = Object.keys(grouped).sort((a, b) => a - b);

  let hitId = hitCounter;
  let groupPos = 0;

  const processNextGroup = () => {
    if (groupPos >= groupKeys.length) { hitCounter = hitId; return; }

    const current = [...grouped[groupKeys[groupPos++]]].sort((a, b) => a.start - b.start);

    const merged = [];
    let last = null;
    for (const r of current) {
      if (last && r.start < last.end) {
        last.end = Math.max(last.end, r.end);
      } else {
        last = { start: r.start, end: r.end, sharedId: r.sharedId ?? ++hitId };
        merged.push(last);
      }
    }

    let rangeIdx = 0, nodeIdx = 0;
    const total = merged.length, nCount = NODE_CACHE.length;

    while (nodeIdx < nCount && rangeIdx < total) {
      const nc = NODE_CACHE[nodeIdx];
      const { n, s: nStart, e: nEnd } = nc;

      while (rangeIdx < total && merged[rangeIdx].end <= nStart) rangeIdx++;
      const saveIdx = rangeIdx;

      const localHits = [];
      let ri = rangeIdx;
      while (ri < total && merged[ri].start < nEnd) {
        const r = merged[ri++];
        const s = Math.max(0, r.start - nStart);
        const e = Math.min(nEnd - nStart, r.end - nStart);
        if (s < e) localHits.push({ s, e, id: r.sharedId });
      }

      if (!localHits.length) { nodeIdx++; continue; }

      try {
        const txt = n.nodeValue;
        const frag = document.createDocumentFragment();
        let pos = 0;
        for (const hit of localHits) {
          if (hit.s > pos) frag.appendChild(document.createTextNode(txt.slice(pos, hit.s)));
          const span = document.createElement("span");
          span.className = `hitX hit-${hit.id}`;
          span.id = `hit-${hit.id}`;
          span.appendChild(document.createTextNode(txt.slice(hit.s, hit.e)));
          frag.appendChild(span);
          pos = hit.e;
        }
        if (pos < txt.length) frag.appendChild(document.createTextNode(txt.slice(pos)));
        n.parentNode.replaceChild(frag, n);
      } catch (_) { }

      nodeIdx++;
      rangeIdx = saveIdx;
    }

    setTimeout(processNextGroup, 0);
  };

  processNextGroup();
};

const highlightRangeAbsBatchGradual = (allRanges, done) => {
  if (!allRanges?.length) { 
    CNT.innerText = "No results"; 
    done && done(); 
    return; 
  }

  allRanges.sort((a, b) => a.start - b.start);

  const BATCH = 200, DELAY = 1;
  const total = allRanges.length;
  let processedBatches = 0;
  const totalBatches = Math.ceil(total / BATCH);

  const step = () => {
    if (!allRanges.length) {
      CNT.innerText = `${total} results`;
      done && done();
      return;
    }

    const chunk = allRanges.splice(0, BATCH);
    NODE_CACHE = null;
    highlightRangeAbsBatch(chunk);

    processedBatches++;
    
    if (processedBatches >= totalBatches) {
      CNT.innerText = `${total} results`;
      done && done();
    } else {
      setTimeout(step, DELAY);
    }
  };

  CNT.innerText = "Highlighting...";
  step();
};

// ================== MAIN SEARCH FUNCTION (FIXED) ==================
const runSearch = (txt, hitid) => {
  clearHighlights();
  if (!txt) { CNT.innerText = ""; return; }

  const terms = splitSmart(txt);
  let totalHits = 0;
  const highlightQueue = [];
  let t = 0;
  const perTermCounter = {};

  const processTerm = () => {
    if (t >= terms.length) {
      const termOrder = Object.keys(perTermCounter);
      const termBase = {};
      let runningTotal = 0;

      for (const key of termOrder) {
        termBase[key] = runningTotal;
        runningTotal += perTermCounter[key];
      }

      highlightQueue.sort((a, b) => a.start - b.start);

      const localCount = {};
      for (const r of highlightQueue) {
        localCount[r.term] = (localCount[r.term] ?? 0) + 1;
        r.sharedId = (termBase[r.term] ?? 0) + localCount[r.term];
      }

      // ✅ Wait for highlighting to complete before scrolling
      highlightRangeAbsBatchGradual(highlightQueue, () => {
        buildHitIndex();
        
        if (hitid && hitid !== "null") {
          setTimeout(() => {
            resetAllHits();
            
            markHitRed(parseInt(hitid));
			
          }, 100);
        }
		
		scrollToHit(parseInt(hitid));
        
        CNT.innerText = totalHits ? `${totalHits} results` : "No results";
      });
      return;
    }

    let kw = terms[t];
    let boundaryMode = false;

    const firstCh = kw.charAt(0), lastCh = kw.charAt(kw.length - 1);
    if (
      (firstCh === '"'  && lastCh === '"')  ||
      (firstCh === '«'  && lastCh === '»')  ||
      (firstCh === '\u201C' && lastCh === '\u201D')
    ) {
      kw = kw.slice(1, -1).trim();
      boundaryMode = true;

      if (kw.includes("|")) {
        const parts = kw.split("|");
        terms[t] = `"${parts[0].trim()}"`;
        for (let i = 1; i < parts.length; i++)
          terms.splice(t + i, 0, `"${parts[i].trim()}"`);
        kw = parts[0].trim();
      }
    }

    let q = [...kw].map(c => canon(c)).join("").replace(/\s+/g, " ").trim();
    if (boundaryMode) q = escapeRegex(q);
    if (!q) { t++; setTimeout(processTerm, 0); return; }

    perTermCounter[q] ??= 0;

    if (boundaryMode) {
      const re = new RegExp(
        `(^|[^A-Za-z0-9\\u0621-\\u064A\\u0640])(${q})(?=[^A-Za-z0-9\\u0621-\\u064A\\u0640]|$)`,
        "g"
      );
      let m;
      while ((m = re.exec(NORM)) !== null) {
        const idx = m.index + (m[1]?.length ?? 0);
        const a = MAP[idx];
        const b = MAP[idx + q.length - 1] + 1;
        highlightQueue.push({ start: a, end: b, term: q });
        totalHits++;
        perTermCounter[q]++;
      }
    } else {
      let pos = NORM.indexOf(q);
      while (pos !== -1) {
        const a = MAP[pos];
        const b = MAP[pos + q.length - 1] + 1;
        highlightQueue.push({ start: a, end: b, term: q });
        totalHits++;
        perTermCounter[q]++;
        pos = NORM.indexOf(q, pos + q.length);
      }
    }

    t++;
    setTimeout(processTerm, 1);
  };

  processTerm();
};

// ================== Helper Functions ==================
function resetAllHits() {
  var spans = C.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    var s = spans[i];
    if (s.className && s.className.indexOf("hitX") !== -1) {
      s.style.backgroundColor = "yellow";
      s.style.color = "";
      s.style.outline = "";
    }
  }
}

function markHitRed(hitid) {
  

  
  var h = findHitByNum(hitid);
    if (!h || !h.nodes || !h.nodes.length) return;

    // scroll to first fragment
    var first = h.nodes[0];
    var y = 0, p = first;
    while (p && p !== C && p !== document.body) {
      y += p.offsetTop || 0;
      p = p.offsetParent || p.parentNode;
    }
    C.scrollTop = Math.max(0, y - C.clientHeight / 3);

    // highlight main content
    for (var j = 0; j < h.nodes.length; j++) {
      var n = h.nodes[j];
      if (!n || !n.style) continue;

      n.style.border = "2px solid orange";
      n.style.padding = "1px";
      n.style.backgroundColor = "red";
     
    }
  
  
  
  
  
  
  
  
}

