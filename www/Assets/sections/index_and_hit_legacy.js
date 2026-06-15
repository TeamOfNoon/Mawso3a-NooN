

// Store current red hit ID for quick access
var currentRedHitId = null;




















// ================== Canonical Arabic Normalizer (ES3) ==================
var canon = function(ch) {
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
};




function normalizeText(txt) {

 	

		
	    if (!txt) {
        return "";
    }

    var out = "";

    for (var i = 0; i < txt.length; i++) {

        var ch = canon(txt.charAt(i));

        if (ch === " ") {

            // keep single spaces between words
            if (
                out.length > 0 &&
                out.charAt(out.length - 1) !== " "
            ) {
                out += " ";
            }

        } else if (ch) {

            out += ch;
        }
    }

    return out
        .replace(/^\s+|\s+$/g, "");	
		
		
}

function normalizeSearchQuery(txt) {

    if (!txt) {
        return "";
    }

    var parts = splitSmart(txt);
    var seen = {};
    var out = [];

    for (var i = 0; i < parts.length; i++) {

        var p = parts[i];
        var quoted = false;

        if (
            p.length > 1 &&
            (
                (p.charAt(0) === '"'  && p.charAt(p.length - 1) === '"') ||
                (p.charAt(0) === '«' && p.charAt(p.length - 1) === '»')
            )
        ) {

            quoted = true;
            p = p.substring(1, p.length - 1);
        }

        p = normalizeText(p);

        if (!p || seen[(quoted ? '"' : '') + p]) {
            continue;
        }

        seen[(quoted ? '"' : '') + p] = true;

        if (quoted) {
            out.push('"' + p + '"');
        } else {
            out.push(p);
        }
    }

    return out.join("|");
}
// ================== Collect text nodes (ES3) ==================
var getAllTextNodes = function(root) {
  var out = [];
  var walk = function(n) {
    if (n.nodeType === 3) {
      out.push(n);
    } else {
      if (n.tagName === "BR") {
        out.push({ nodeValue: " ", _isBR: true });
      }
      var c = n.firstChild;
      while (c) {
        walk(c);
        c = c.nextSibling;
      }
    }
  };
  walk(root);
  return out;
};
// ================== Globals (ES3) ==================
var C = null;
var CNT = null;
var ORIGINAL_HTML = "";
var TEXT = "", NORM = "", MAP = [], WORD_STARTS = [], BR_OFFS = [];
var hitCounter = 0, hitCounter_snip = 0, totalFound = 0;
var HIGHLIGHTED_HITS = [];
var HIGHLIGHT_STATE = {};
var NODE_CACHE = null;
var HIT_INDEX = [];

var DOM_CACHE = { hitSpans: null, snipSpans: null };
var DOM_VERSION = 0;
var INDEX_VERSION = -1;

// ================== Async Index Builder (ES3) ==================
var buildIndexAsync = function(done) {
  TEXT = "";
  BR_OFFS = [];
  
  C = document.getElementById("content");
  CNT = document.getElementById("counter");
  
  ORIGINAL_HTML = C.innerHTML;

  var nodes = getAllTextNodes(C);
  var off = 0, i = 0;
  CNT.innerText = "Indexing text... 0%";

  var step1 = function() {
    var start = Date.now();
    while (i < nodes.length && Date.now() - start < 60) {
      var v = nodes[i].nodeValue;
      if (nodes[i]._isBR) BR_OFFS.push(off);
      TEXT += v;
      off += v.length;
      i++;
    }
    if (i < nodes.length) {
      CNT.innerText = "Indexing text... " + Math.floor((i / nodes.length) * 50) + "%";
      setTimeout(step1, 10);
    } else {
      i = 0;
      buildNorm();
    }
  };

  var buildNorm = function() {
    NORM = ""; MAP = []; WORD_STARTS = [];
    var lastSpace = true;
    var k = 0;
    var len = TEXT.length;

    var chunk = function() {
      var startTick = Date.now();
      while (k < len && Date.now() - startTick < 60) {
        var ch = canon(TEXT.charAt(k));
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
        CNT.innerText = "Indexing text... " + (50 + Math.floor((k / len) * 50)) + "%";
        setTimeout(chunk, 10);
      } else {
        CNT.innerText = "Indexed " + NORM.length + " chars";
        if (done) done();
      }
    };

    chunk();
  };

  step1();
};

// ================== Hit Index (binary search) (ES3) ==================
var buildHitIndex = function() {
  HIT_INDEX = [];
  DOM_CACHE.hitSpans = null;

  var spans = C.querySelectorAll("span.hitX");
  var groups = {};

  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    if (!span.className || span.className.indexOf("hitX") === -1) continue;
    var match = span.className.match(/hit-(\d+)/);
    if (!match) continue;
    var hitNum = parseInt(match[1], 10);
    if (!groups[hitNum]) groups[hitNum] = [];
    groups[hitNum].push(span);
  }

  for (var num in groups) {
    if (groups.hasOwnProperty(num)) {
      var nodes = groups[num];
      nodes.sort(function(a, b) {
        return a.offsetTop - b.offsetTop;
      });
      HIT_INDEX.push({ num: parseInt(num, 10), nodes: nodes });
    }
  }

  HIT_INDEX.sort(function(a, b) {
    return a.num - b.num;
  });
};

// Binary search lookup
var findHitByNum = function(num) {
  var lo = 0, hi = HIT_INDEX.length - 1;
  while (lo <= hi) {
    var mid = (lo + hi) >> 1;
    var h = HIT_INDEX[mid];
    if (num < h.num) hi = mid - 1;
    else if (num > h.num) lo = mid + 1;
    else return h;
  }
  return null;
};


// ================== YOUR ORIGINAL FUNCTION (JUST ADD ONE LINE) ==================
var scrollToHit = function(num) {
    
    // Your existing code to find targetSpan (keep it exactly as is)
    var allSpans = C.getElementsByTagName("span");
    var hitSpans = [];
    
    for (var i = 0; i < allSpans.length; i++) {
        var span = allSpans[i];
        if (span.className && span.className.indexOf("hitX") !== -1) {
            hitSpans.push(span);
        }
    }
    
    if (hitSpans.length === 0) {
        console.log("No hit spans found");
        return false;
    }
    
    var targetSpan = null;
    
    if (!num || num === "null") {
        targetSpan = hitSpans[0];
    } else {
        var targetId = "hit-" + num;
        for (var j = 0; j < hitSpans.length; j++) {
            if (hitSpans[j].id === targetId) {
                targetSpan = hitSpans[j];
                break;
            }
        }
        
        if (!targetSpan) {
            var targetClass = "hit-" + num;
            for (var k = 0; k < hitSpans.length; k++) {
                if (hitSpans[k].className.indexOf(targetClass) !== -1) {
                    targetSpan = hitSpans[k];
                    break;
                }
            }
        }
    }
    
    if (!targetSpan) {
        console.log("Target span not found:", num);
        return false;
    }
    
    // ========== JUST THIS ONE LINE DOES EVERYTHING ==========
    window.scrollToCenter(targetSpan);
    
    return true;
};











// ================== Clear Helpers (ES3) ==================
var clearHighlights = function() {
  C.innerHTML = ORIGINAL_HTML;
  CNT.innerText = "";
  hitCounter = 0;
  hitCounter_snip = 0;
  totalFound = 0;
  NODE_CACHE = null;
  HIGHLIGHTED_HITS = [];
};

var clearAllHighlights = function() {
  HIGHLIGHT_STATE = {};
  var spans = C.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    if (span.className && span.className.indexOf("hitX") !== -1) {
      span.style.border = "";
      span.style.padding = "";
      span.style.backgroundColor = "yellow";
    }
  }
};

// ================== splitSmart (ES3) ==================
var splitSmart = function(input) {
  var parts = [];
  var cur = "", inQuote = false;
  var quoteChars = ['"', '«', '»', '\u201C', '\u201D'];
  
  for (var i = 0; i < input.length; i++) {
    var ch = input.charAt(i);
    var isQuoteChar = false;
    for (var q = 0; q < quoteChars.length; q++) {
      if (ch === quoteChars[q]) {
        isQuoteChar = true;
        break;
      }
    }
    if (isQuoteChar) {
      inQuote = !inQuote;
      cur += ch;
      continue;
    }
    if (ch === '|' && !inQuote && (i === 0 || input.charAt(i - 1) !== '\\')) {
      if (cur.replace(/^\s+|\s+$/g, '').length > 0) parts.push(cur.replace(/^\s+|\s+$/g, ''));
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur.replace(/^\s+|\s+$/g, '').length > 0) parts.push(cur.replace(/^\s+|\s+$/g, ''));
  
  var result = [];
  for (var p = 0; p < parts.length; p++) {
    result.push(parts[p].replace(/\\\|/g, "|"));
  }
  return result;
};

// ================== escapeRegex (ES3) ==================
var escapeRegex = function(s) {
  return s.replace(/([\.\*\+\?\^${}()])/g, "\\$1");
};

// ================== Node Cache Builder (ES3) ==================
var ensureNodeCache = function() {
  if (NODE_CACHE) return;
  NODE_CACHE = [];
  var off = 0;
  var nodes = getAllTextNodes(C);
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var len = n.nodeValue.length;
    NODE_CACHE.push({ n: n, s: off, e: off + len });
    off += len;
  }
};

// ================== Fixed Batch Highlighter (Prevents Nested Spans) ==================
var highlightRangeAbsBatch = function(ranges) {
  if (!ranges || !ranges.length) return;

  ensureNodeCache();

  var grouped = {};
  for (var i = 0; i < ranges.length; i++) {
    var r = ranges[i];
    var g = r.groupIndex !== undefined ? r.groupIndex : 0;
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(r);
  }
  
  var groupKeys = [];
  for (var key in grouped) {
    if (grouped.hasOwnProperty(key)) groupKeys.push(parseInt(key, 10));
  }
  groupKeys.sort(function(a, b) { return a - b; });

  var hitId = hitCounter;
  var groupPos = 0;

  var processNextGroup = function() {
    if (groupPos >= groupKeys.length) { 
      hitCounter = hitId; 
      return; 
    }

    var current = [];
    var grp = grouped[groupKeys[groupPos++]];
    for (var i = 0; i < grp.length; i++) current.push(grp[i]);
    current.sort(function(a, b) { return a.start - b.start; });

    var merged = [];
    var last = null;
    for (var i = 0; i < current.length; i++) {
      var r = current[i];
      if (last && r.start < last.end) {
        last.end = Math.max(last.end, r.end);
      } else {
        last = { start: r.start, end: r.end, sharedId: r.sharedId !== undefined ? r.sharedId : ++hitId };
        merged.push(last);
      }
    }

    var rangeIdx = 0, nodeIdx = 0;
    var total = merged.length, nCount = NODE_CACHE.length;

    while (nodeIdx < nCount && rangeIdx < total) {
      var nc = NODE_CACHE[nodeIdx];
      var n = nc.n, nStart = nc.s, nEnd = nc.e;
      
      // Skip if this node is already inside a hit span
      var isInsideHit = false;
      var parent = n.parentNode;
      while (parent && parent !== C) {
        if (parent.tagName === 'SPAN' && parent.className && parent.className.indexOf('hitX') !== -1) {
          isInsideHit = true;
          break;
        }
        parent = parent.parentNode;
      }
      
      if (isInsideHit) {
        nodeIdx++;
        continue;
      }

      while (rangeIdx < total && merged[rangeIdx].end <= nStart) rangeIdx++;
      var saveIdx = rangeIdx;

      var localHits = [];
      var ri = rangeIdx;
      while (ri < total && merged[ri].start < nEnd) {
        var r = merged[ri++];
        var s = Math.max(0, r.start - nStart);
        var e = Math.min(nEnd - nStart, r.end - nStart);
        if (s < e) localHits.push({ s: s, e: e, id: r.sharedId });
      }

      if (!localHits.length) { 
        nodeIdx++; 
        continue; 
      }

      try {
        var txt = n.nodeValue;
        var frag = document.createDocumentFragment();
        var pos = 0;
        for (var h = 0; h < localHits.length; h++) {
          var hit = localHits[h];
          if (hit.s > pos) frag.appendChild(document.createTextNode(txt.slice(pos, hit.s)));
          var span = document.createElement("span");
          span.className = "hitX hit-" + hit.id;
          span.id = "hit-" + hit.id;
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
var highlightRangeAbsBatchGradual = function(allRanges, done) {
  if (!allRanges || !allRanges.length) { 
    CNT.innerText = "No results"; 
    if (done) done(); 
    return; 
  }

  allRanges.sort(function(a, b) { return a.start - b.start; });

  var BATCH = 200, DELAY = 1;
  var total = allRanges.length;
  var processedBatches = 0;
  var totalBatches = Math.ceil(total / BATCH);

  var step = function() {
    if (!allRanges.length) {
      CNT.innerText = total + " results";
      if (done) done();
      return;
    }

    var chunk = allRanges.splice(0, BATCH);
    NODE_CACHE = null;
    highlightRangeAbsBatch(chunk);

    processedBatches++;
    
    if (processedBatches >= totalBatches) {
      CNT.innerText = total + " results";
      if (done) done();
    } else {
      setTimeout(step, DELAY);
    }
  };

  CNT.innerText = "Highlighting...";
  step();
};

// ================== Modified runSearch with DAM option ==================
var runSearch = function(txt, hitid, dam) {
    // dam = true: Don't All Clear - preserve yellow highlights, only clear red
    // dam = false or undefined: Full clear everything

    if (dam) {
        // Only clear red highlights and orange borders, preserve yellows
        clearRedHitsOnly();
    } else {
        // Full clear including all yellow highlights
        clearHighlights();
    }

    if (!txt) {
        CNT.innerText = "";
        return;
    }

    txt = normalizeSearchQuery(txt);

    var terms = splitSmart(txt);

    var totalHits = 0;
    var highlightQueue = [];
    var t = 0;

    // =====================================
    // GLOBAL HIT COUNTER
    // SAME AS SNIPPETS
    // =====================================

    var globalHitId = 0;

    var processTerm = function() {

        if (t >= terms.length) {

            highlightQueue.sort(function(a, b) {
                return a.start - b.start;
            });

            highlightRangeAbsBatchGradual(
                highlightQueue,
                function() {

                    buildHitIndex();

                    if (
                        hitid &&
                        hitid !== "null"
                    ) {

                        setTimeout(function() {

                            if (dam) {
                                clearRedHitsOnly();
                            } else {
                                resetAllHits();
                            }

                            markHitRed(
                                parseInt(
                                    hitid,
                                    10
                                )
                            );

                        }, 100);
                    }

                    scrollToHit(
                        parseInt(
                            hitid,
                            10
                        )
                    );

                    CNT.innerText =
                        totalHits
                            ? totalHits + " results"
                            : "No results";
                }
            );

            return;
        }

        var kw = terms[t];
        var boundaryMode = false;

        var firstCh = kw.charAt(0);
        var lastCh  = kw.charAt(kw.length - 1);

        if (
            (firstCh === '"' && lastCh === '"') ||
            (firstCh === '«' && lastCh === '»') ||
            (firstCh === '\u201C' && lastCh === '\u201D')
        ) {

            kw = kw
                .slice(1, -1)
                .replace(/^\s+|\s+$/g, '');

            boundaryMode = true;

            if (kw.indexOf("|") !== -1) {

                var parts = kw.split("|");

                terms[t] =
                    '"' +
                    parts[0]
                        .replace(/^\s+|\s+$/g, '') +
                    '"';

                for (
                    var ii = 1;
                    ii < parts.length;
                    ii++
                ) {

                    terms.splice(
                        t + ii,
                        0,
                        '"' +
                        parts[ii]
                            .replace(/^\s+|\s+$/g, '') +
                        '"'
                    );
                }

                kw =
                    parts[0]
                        .replace(/^\s+|\s+$/g, '');
            }
        }

        var qChars = [];

        for (
            var i = 0;
            i < kw.length;
            i++
        ) {

            qChars.push(
                canon(
                    kw.charAt(i)
                )
            );
        }

        var q =
            qChars
                .join("")
                .replace(/\s+/g, " ")
                .replace(/^\s+|\s+$/g, '');

        if (boundaryMode) {
            q = escapeRegex(q);
        }

        if (!q) {

            t++;

            setTimeout(
                processTerm,
                0
            );

            return;
        }

        if (boundaryMode) {

            var re =
                new RegExp(
                    "(^|[^A-Za-z0-9\\u0621-\\u064A\\u0640])(" +
                    q +
                    ")(?=[^A-Za-z0-9\\u0621-\\u064A\\u0640]|$)",
                    "g"
                );

            var m;

            while (
                (m = re.exec(NORM))
                    !== null
            ) {

                var idx =
                    m.index +
                    (
                        m[1]
                            ? m[1].length
                            : 0
                    );

                var a = MAP[idx];

                var b =
                    MAP[
                        idx +
                        q.length -
                        1
                    ] + 1;

                highlightQueue.push({

                    start: a,

                    end: b,

                    term: q,

                    sharedId:
                        ++globalHitId
                });

                totalHits++;
            }

        } else {

            var pos =
                NORM.indexOf(q);

            while (
                pos !== -1
            ) {

                var a =
                    MAP[pos];

                var b =
                    MAP[
                        pos +
                        q.length -
                        1
                    ] + 1;

                highlightQueue.push({

                    start: a,

                    end: b,

                    term: q,

                    sharedId:
                        ++globalHitId
                });

                totalHits++;

                pos =
                    NORM.indexOf(
                        q,
                        pos +
                        q.length
                    );
            }
        }

        t++;

        setTimeout(
            processTerm,
            1
        );
    };

    processTerm();
};

// ================== Additional Helper Functions ==================

// Function to manually clear a specific hit by ID (preserves others)
function clearHitById(hitid) {
    var hit = findHitByNum(hitid);
    if (!hit || !hit.nodes) return;
    
    for (var i = 0; i < hit.nodes.length; i++) {
        var n = hit.nodes[i];
        if (n && n.style) {
            n.style.backgroundColor = "yellow";
            n.style.color = "";
            n.style.outline = "";
            n.style.border = "";
            n.style.padding = "";
        }
    }
    
    if (currentRedHitId === hitid) {
        currentRedHitId = null;
    }
}

// Function to clear all orange borders only
function clearOrangeBordersOnly() {
    if (HIT_INDEX && HIT_INDEX.length) {
        for (var i = 0; i < HIT_INDEX.length; i++) {
            var hit = HIT_INDEX[i];
            if (hit && hit.nodes) {
                for (var j = 0; j < hit.nodes.length; j++) {
                    var n = hit.nodes[j];
                    if (n && n.style && n.style.border === "2px solid orange") {
                        n.style.border = "";
                        n.style.padding = "";
                    }
                }
            }
        }
    }
}

// Function to get current red hit ID
function getCurrentRedHit() {
    return currentRedHitId;
}



function resetAllHits() {
  // Get all hit spans (including nested ones)
  var allSpans = C.getElementsByTagName("span");
  var hitSpans = [];
  
  // Collect unique hit spans (avoid duplicates by ID)
  var seenIds = {};
  for (var i = 0; i < allSpans.length; i++) {
    var s = allSpans[i];
    if (s.className && s.className.indexOf("hitX") !== -1) {
      if (s.id && !seenIds[s.id]) {
        seenIds[s.id] = true;
        hitSpans.push(s);
      }
    }
  }
  
  for (var i = 0; i < hitSpans.length; i++) {
    var s = hitSpans[i];
    s.style.backgroundColor = "yellow";
    s.style.color = "";
    s.style.outline = "";
    s.style.border = "";
    s.style.padding = "";
  }
  currentRedHitId = null;
}






function clearRedHitsOnly() {
  if (currentRedHitId !== null) {
    // Find all spans with this hit ID (including nested ones)
    var allSpans = C.getElementsByTagName("span");
    for (var i = 0; i < allSpans.length; i++) {
      var s = allSpans[i];
      if (s.className && s.className.indexOf("hitX") !== -1) {
        var match = s.className.match(/hit-(\d+)/);
        if (match && parseInt(match[1], 10) === currentRedHitId) {
          s.style.backgroundColor = "yellow";
          s.style.color = "";
          s.style.outline = "";
          s.style.border = "";
          s.style.padding = "";
        }
      }
    }
    currentRedHitId = null;
  }
}


function markHitRed(hitid) {
  // Find all spans with this hit ID
  var allSpans = C.getElementsByTagName("span");
  var hitSpans = [];
  
  for (var i = 0; i < allSpans.length; i++) {
    var s = allSpans[i];
    if (s.className && s.className.indexOf("hitX") !== -1) {
      var match = s.className.match(/hit-(\d+)/);
      if (match && parseInt(match[1], 10) === hitid) {
        hitSpans.push(s);
      }
    }
  }
  
  if (hitSpans.length === 0) return;
  
  currentRedHitId = hitid;
  
  // Clear previous red hits
  for (var i = 0; i < allSpans.length; i++) {
    var s = allSpans[i];
    if (s.style && s.style.backgroundColor === "red") {
      s.style.backgroundColor = "yellow";
      s.style.border = "";
      s.style.padding = "";
    }
    if (s.style && s.style.border === "2px solid orange") {
      s.style.border = "";
      s.style.padding = "";
    }
  }
  
  // scroll to first fragment
  var first = hitSpans[0];
  var y = 0, p = first;
  while (p && p !== C && p !== document.body) {
    y += p.offsetTop || 0;
    p = p.offsetParent || p.parentNode;
  }
  C.scrollTop = Math.max(0, y - C.clientHeight / 3);
  
  // highlight main content
  for (var j = 0; j < hitSpans.length; j++) {
    var n = hitSpans[j];
    if (!n || !n.style) continue;
    
    n.style.border = "2px solid orange";
    n.style.padding = "1px";
    n.style.backgroundColor = "red";
  }
}

// ================== Function to Clean Up Nested Spans ==================
function cleanupNestedSpans() {
  var allSpans = C.getElementsByTagName("span");
  var toRemove = [];
  
  // Find nested spans
  for (var i = 0; i < allSpans.length; i++) {
    var span = allSpans[i];
    if (span.className && span.className.indexOf("hitX") !== -1) {
      var parent = span.parentNode;
      while (parent && parent !== C) {
        if (parent.tagName === 'SPAN' && parent.className && parent.className.indexOf("hitX") !== -1) {
          // This span is nested inside another hit span - mark for removal
          toRemove.push(span);
          break;
        }
        parent = parent.parentNode;
      }
    }
  }
  
  // Remove nested spans and merge their content
  for (var i = 0; i < toRemove.length; i++) {
    var nestedSpan = toRemove[i];
    var parentSpan = nestedSpan.parentNode;
    
    // Move child nodes to parent
    while (nestedSpan.firstChild) {
      parentSpan.insertBefore(nestedSpan.firstChild, nestedSpan);
    }
    // Remove empty nested span
    parentSpan.removeChild(nestedSpan);
  }
}

// Call cleanup after building highlights
var originalBuildHitIndex = buildHitIndex;
buildHitIndex = function() {
  cleanupNestedSpans();
  originalBuildHitIndex();
};
