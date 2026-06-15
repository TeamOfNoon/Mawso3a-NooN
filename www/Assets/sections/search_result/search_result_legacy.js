function resetSearchOptions(btn){
	
sendMulti({
    searchPerPage: "5",
    highlightSearch: true,
    highlightpartsearch: false,
	search_type:"exact",
	search_match:"normal",
    sniptSearch: true,
	mn33_sec: true,
	all_ar_sec: false,
	all_en_sec: false,
	custom_sec: false
	
});	
	
document.getElementById("highlightsearch").checked = true;
document.getElementById("highlightpartsearch").checked = false;
document.getElementById("sniptsearch").checked = true;


document.getElementById("mn33_sec").checked = true;
document.getElementById("all_ar_sec").checked = false;
document.getElementById("all_en_sec").checked = false;
document.getElementById("custom_sec").checked = false;


window.search_type ="exact";
window.search_match ="normal";
updateSearchMatchRadio();
updateSearchTypeRadio();	
	
	
	
document.getElementById(
    "searchResCount"
).value =
    String(
        5
    );
	
	  btn.innerHTML = window.SEARCH_LANG.done_reset;

    setTimeout(function () {
        btn.innerHTML = window.SEARCH_LANG.default_options_lbl;
    }, 1500);
}

function toggleScopeSections(el){

    var ids = [
        "mn33_sec",
        "all_ar_sec",
        "all_en_sec",
        "custom_sec"
    ];

    var checkedCount = 0;
    var i;
    var chk;

    for(i = 0; i < ids.length; i++){

        chk = document.getElementById(ids[i]);

        if(!chk){
            continue;
        }

        if(chk.checked){
            checkedCount++;
        }
    }

    // لا تسمح بإلغاء آخر خيار
    if(checkedCount === 0){
        el.checked = true;
        checkedCount = 1;
    }

    // احفظ القيم بعد التصحيح النهائي
    for(i = 0; i < ids.length; i++){

        chk = document.getElementById(ids[i]);

        if(!chk){
            continue;
        }

        var obj = {};
        obj[ids[i]] = chk.checked;

        sendMulti(obj);
    }
}

function onMaxPageCountChange(maxVal)
{
	

	sendMulti({searchPerPage: maxVal,action: "searchPerPage"});
	hideBottomSheet();
	
}


function toggleSearchHighlight() {

    var chk =
        document.getElementById("highlightsearch");

    if (!chk) {
        return;
    }

   
	
	sendMulti({
    highlightSearch: chk.checked
});
  
}





function toggleSearchpartHighlight() {

    var chk =
        document.getElementById("highlightpartsearch");

    if (!chk) {
        return;
    }

   
	
	sendMulti({
    highlightpartsearch: chk.checked
   });
  
}





function togglesniptHighlight() {

    var chk =
        document.getElementById("sniptsearch");

    if (!chk) {
        return;
    }
	sendMulti({
    sniptSearch: chk.checked
});
  
  
}


function updateSearchMatchRadio() {

    var radios =
        document.getElementsByName("searchMatch");

    var searchMatch =
        window.search_match || "normal";

    for (var i = 0; i < radios.length; i++) {

        radios[i].checked =
            (radios[i].value === searchMatch);
    }
}



function updateSearchTypeRadio() {

    var radios =
        document.getElementsByName("searchType");

    searchType =
        window.search_type || "all";

    for (var i = 0; i < radios.length; i++) {

        radios[i].checked =
            (radios[i].value === searchType);
    }
}

function onSearchTypeChange(mode){
	
	

		window.search_type = mode;
		
	    //sendMulti({search_type: window.search_type,action: "search_type"});
	
		
		sendToParent({
			type: "search_type",
			value: mode
		});
		
		
}

function onWordMatchChange(el) {

    var normal = document.getElementById("wordMatchNom");
    var part   = document.getElementById("wordMatchPart");
    var stem   = document.getElementById("wordMatchStem");

    if (el.checked) {

        normal.checked = false;
        part.checked   = false;
        stem.checked   = false;

        el.checked = true;

        var mode = "normal";

        if (el.id === "wordMatchPart") {
            mode = "part";
        }
        else if (el.id === "wordMatchStem") {
            mode = "stem";
        }

        window.search_match = mode;


        sendToParent({
            type: "search_match",
            value: mode
        });
    }
}

 var values = [5,10,15,20,25,30,35,40,45,50];
    var optionsHTML = "";

    for (var i = 0; i < values.length; i++) {

        optionsHTML +=
            '<option value="' + values[i] + '">' +
            values[i] +
            '</option>';
    }


var search_sett =
'' +

'<div class="andholder">' +


    '<button class="search-default-btn" type="button" onclick="resetSearchOptions(this)">' +
     window.SEARCH_LANG.default_options_lbl +
    '</button>'+

    '<hr>' +


	
	
	'<div class="search-match-group">' +

    '<div>' + window.SEARCH_LANG.word_match_options_lbl + ':</div>' +

    '<label class="custom-control">' +
        '<input type="radio" value="normal" name="searchMatch" id="wordMatchNom" checked="checked"  onchange="onWordMatchChange(this)" />' +
        '<span class="circle"><span class="dot"></span></span>' +
        '<span>' + window.SEARCH_LANG.normal_match_lbl + '..</span>' +
    '</label>' +

    '<br>' +

    '<label class="custom-control">' +
        '<input type="radio" value="part" name="searchMatch" id="wordMatchPart" onchange="onWordMatchChange(this)" />' +
        '<span class="circle"><span class="dot"></span></span>' +
        '<span>' + window.SEARCH_LANG.partial_match_lbl + '..</span>' +
    '</label>' +

    '<br>' +

    '<label class="custom-control">' +
        '<input type="radio" value="stem" name="searchMatch" id="wordMatchStem" onchange="onWordMatchChange(this)" />' +
        '<span class="circle"><span class="dot"></span></span>' +
        '<span>' + window.SEARCH_LANG.root_match_lbl + '..</span>' +
    '</label>' +

    '</div>'+

    '<hr>'+
	
	
	'<div class="search-type-group">' +
        '<div>'+window.SEARCH_LANG.search_type_lbl+':</div>'+
        '<label class="custom-control">' +
            '<input type="radio" name="searchType" value="exact" checked="checked" onchange="onSearchTypeChange(\'exact\')" />' +
            '<span class="circle"><span class="dot"></span></span>' +
            '<span>' + window.SEARCH_LANG.exact_matach_lbl + ' ("phrase")..</span>' +
        '</label>' +

        '<br>' +

        '<label class="custom-control">' +
            '<input type="radio" name="searchType" value="all" onchange="onSearchTypeChange(\'all\')" />' +
            '<span class="circle"><span class="dot"></span></span>' +
            '<span>' + window.SEARCH_LANG.all_matach_lbl + ' (and)..</span>' +
        '</label>' +

        '<br>' +

        '<label class="custom-control">' +
            '<input type="radio" name="searchType" value="any" onchange="onSearchTypeChange(\'any\')" />' +
            '<span class="circle"><span class="dot"></span></span>' +
            '<span>' + window.SEARCH_LANG.any_matach_lbl + ' (or)..</span>' +
        '</label>' +

     '</div>' +
	
	 '<hr>' +
	
	
	 '<div class="search-options">' +
        '<div>' + window.SEARCH_LANG.highlight_snippet_options_lbl + ':</div>' +
        '<label class="custom-control">' +
            '<input id="highlightsearch" type="checkbox" checked="checked" onchange="toggleSearchHighlight()" />' +
            '<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.SEARCH_LANG.hit_enable_option_lbl + '..</span>' +
        '</label>' +

        '<br>' +
		 
		'<label class="custom-control">' +
            '<input id="highlightpartsearch" type="checkbox" checked="checked" onchange="toggleSearchpartHighlight()" />' +
            '<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.SEARCH_LANG.hit_part_enable_option_lbl+ '..</span>' +
        '</label>' +

        '<br>' +

        '<label class="custom-control">' +
            '<input id="sniptsearch" type="checkbox" checked="checked" onchange="togglesniptHighlight()" />' +
            '<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.SEARCH_LANG.snipt_enable_option_lbl + '..</span>' +
        '</label>' +

    '</div>' +

   
		 '<hr>' +
	
	
	 '<div class="search-scope">' +
        '<div>' + window.SEARCH_LANG.select_section_lbl + ':</div>' +
        '<label class="custom-control">' +
            '<input id="mn33_sec" type="checkbox" checked="checked" onchange="toggleScopeSections(this)" />' +
            '<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.SEARCH_LANG.mn_section_arabic_lbl + '..</span>' +
        '</label>' +

        '<br>' +
		 
		'<label class="custom-control">' +
            '<input id="all_ar_sec" type="checkbox"  onchange="toggleScopeSections(this)" />' +
            '<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.SEARCH_LANG.all_sections_arabic_lbl+ '..</span>' +
        '</label>' +

        '<br>' +

        '<label class="custom-control">' +
            '<input id="all_en_sec" type="checkbox"  onchange="toggleScopeSections(this)" />' +
            '<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.SEARCH_LANG.all_sections_international_lbl + '..</span>' +
        '</label>' +
		
		'<br>' +

        '<label class="custom-control">' +
            '<input id="custom_sec" type="checkbox"  onchange="toggleScopeSections(this)" />' +
            '<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.SEARCH_LANG.custom_sections_lbl + '..</span>' +
        '</label>' +

    '</div>' +


    '<hr>' +

    '<div class="wSearchResultSettingsSmallScr">' +

        '<div class="wSearchCountComboSmallScr">' +

            '<select class="wSearchCountSmallScr" id="searchResCount" onchange="onMaxPageCountChange(this.value)">' +
                optionsHTML +
            '</select>' +

            '&nbsp;<span class="wSearchCountSmallScr">' +
                window.SEARCH_LANG.results_per_page_lbl +".."+
            '</span>' +

        '</div>' +

    '</div>' +
	
	
	

'</div>';



function wait(fn) {

    var i = setInterval(function() {

        if (
            document.getElementById("app") &&
            window.jQuery &&
            window.SEARCH_LANG
        ) {

            clearInterval(i);

            fn(
                document.getElementById("app"),
                window.jQuery
            );
        }

    }, 50);
}

function isRTL() {
    var d = document.documentElement.getAttribute("dir");
    return d && d.toLowerCase() === "rtl";
}


function setResultsStringHTML(results_no, searchStr,gResultsFoundString)
{
	var msg = gResultsFoundString;
	msg = msg.replace("%1", results_no);
	msg = msg.replace("%2", "\'" + searchStr + "\'");
	$("#searchResList").html(msg);	
}

function onClickPrevNext( btn, a_nPageNumber )
{
	onClickPage(a_nPageNumber);	
}

function onClickPage( a_nPageNumber ) {
    g_CurPage = a_nPageNumber ;
       
		sendToParent({
			type: "navigation_click",
			curr: g_CurPage,
			button: "page"
		});
	
}




function scrollCurrentItem(barSelector, currentSelector) {

        var $bars = $(barSelector);
        var $currentdelt = $(currentSelector);

        $bars.each(function() {

            var wrap = this;

            var $cur = $currentdelt.filter(function() {
                return $.contains(wrap, this);
            }).eq(0);

            if (!$cur.length) return;

            var cur = $cur[0];

            if (cur.offsetParent === null) return;

            var wrapRect, curRect;

            try {
                wrapRect = wrap.getBoundingClientRect();
                curRect = cur.getBoundingClientRect();
            } catch (e) {
                wrapRect = {
                    left: wrap.offsetLeft
                };
                curRect = {
                    left: cur.offsetLeft
                };
            }

            var wrapWidth = wrap.offsetWidth;
            var curWidth = cur.offsetWidth;

            var offset =
                (curRect.left - wrapRect.left) -
                (wrapWidth / 2) +
                (curWidth / 2);

            wrap.scrollLeft = wrap.scrollLeft + offset;

        });
}










function buildPagination(nCurPage, nNumPages)
{
    nCurPage = parseInt(nCurPage, 10) || 1;
    nNumPages = parseInt(nNumPages, 10) || 1;

    var container =
        document.getElementById(
            "pageNums"
        );

    if (!container)
    {
        return;
    }

    var subFooterRow =
        document.getElementById(
            "subFooterRow"
        );

    var rtl = isRTL();
    var html = "";
    var i;

    // =====================================
    // NO PAGES
    // =====================================

    if (
        !nNumPages ||
        nNumPages <= 1
    )
    {
        if (subFooterRow)
        {
            subFooterRow.style.display =
                "none";
        }

        container.innerHTML = "";
        container.className =
            "pageNums no_pages";

        return;
    }

    // =====================================
    // SHOW FOOTER
    // =====================================

    if (subFooterRow)
    {
        subFooterRow.style.display = "";
    }

    // =====================================
    // BUILD BUTTONS
    // =====================================

    for (
        i = 1;
        i <= nNumPages;
        i++
    )
    {
        html +=
            '<a href="javascript:void(0)"' +
            ' class="pageBtn' +
            (
                i === nCurPage
                    ? ' active'
                    : ''
            ) +
            '"' +
            ' data-page="' +
            i +
            '"' +
            ' draggable="false"' +
            ' style="user-select:none;">' +
            i +
            '</a>';
    }

    container.innerHTML = html;

    container.style.direction =
        rtl
            ? "rtl"
            : "ltr";

    // =====================================
    // CLICK EVENTS
    // =====================================

    var links =
        container.getElementsByTagName(
            "a"
        );

    for (
        i = 0;
        i < links.length;
        i++
    )
    {
        links[i].onclick =
            function(e)
            {
                e =
                    e ||
                    window.event;

                // block click after drag

                if (
                    container._dragMoved
                )
                {
                    if (
                        e.preventDefault
                    )
                    {
                        e.preventDefault();
                    }

                    e.returnValue =
                        false;

                    e.cancelBubble =
                        true;

                    return false;
                }

                onClickPrevNext(
                    this,
                    this.getAttribute(
                        "data-page"
                    )
                );

                return false;
            };
    }

    // =====================================
    // FIND ACTIVE BUTTON
    // =====================================

    var currentBtn = null;

    for (
        i = 0;
        i < links.length;
        i++
    )
    {
        if (
            parseInt(
                links[i].getAttribute(
                    "data-page"
                ),
                10
            ) ===
            parseInt(
                nCurPage,
                10
            )
        )
        {
            currentBtn =
                links[i];

            break;
        }
    }

    // =====================================
    // SCROLL TO ACTIVE
    // =====================================

    if (currentBtn)
    {
        if (rtl)
        {
            container.scrollLeft =
                currentBtn.offsetLeft;
        }
        else
        {
            container.scrollLeft =
                currentBtn.offsetLeft -
                Math.floor(
                    container.offsetWidth / 2
                );
        }
    }

    scrollCurrentItem(
        ".pageNums",
        ".pageNums a.active"
    );
}











var esc = function(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

var cleanDisplayUrl = function(url) {
  if (!url) return "";
  var u = url.split("?")[0];
  if (u.indexOf("./") === 0) u = u.slice(2);
  return u;
};

var splitSmart = function(input) {
  if (!input) return [];

  var parts = [];
  var cur = "";
  var inQuote = false;

  for (var i = 0; i < input.length; i++) {
    var ch = input.charAt(i);

    if (['"', "«", "»", "\u201c", "\u201d"].indexOf(ch) !== -1) {
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

  return parts.map(function(p) { return p.replace(/\\\|/g, "|"); });
};

var getRhSearchFromUrl = function(url) {
  if (!url) return "";
  var qIndex = url.indexOf("?");
  if (qIndex === -1) return "";

  var parts = url.slice(qIndex + 1).split("&");
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    var eq = part.indexOf("=");
    if (eq === -1) continue;
    var key = part.slice(0, eq);
    var val = part.slice(eq + 1);
    if (key === "rhsearch") {
      try {
        return decodeURIComponent(val.replace(/\+/g, " "));
      } catch(e) {
        return val;
      }
    }
  }
  return "";
};

var convertToJsonPath = function(url) {
  if (!url) return "";
  var query = url.split("?")[1] || "";
  var clean = url.split("?")[0];
  var match = clean.match(/post_(\d+)\.html$/);
  if (!match) {
    console.log("INVALID URL:", url);
    return "";
  }
  var postId = match[1];
  var forumMatch = clean.match(/index\.php\/([^/]+)\//);
  var forum = forumMatch ? forumMatch[1] : "forum_mn33";
  var result = "./index.php/" + forum + "/js_json/posts/post_" + postId + ".js";
  if (query) result += "?" + query;
  return result;
};

var buildSnippet = function(text, maxLength) {
  if (!text) return "";
  text = text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
  if (maxLength && text.length > maxLength) text = text.slice(0, maxLength) + "...";
  return text;
};
var PAGE_BUILD_ID = 0;
// ============================================================
// TEXT INDEXER
// ============================================================

var TextIndexer = function(text, itemElement, onComplete) {
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
  this.buildId = 0;
};









TextIndexer.prototype.normalizeText = function(txt) {

    if (!txt) {
        return "";
    }

    var out = "";

    for (var i = 0; i < txt.length; i++) {

        var ch = this.canon(txt.charAt(i));

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

};



TextIndexer.prototype.normalizeSearchQuery = function(txt) {

    if (!txt) {
        return "";
    }

    var parts = txt.split("|");
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

        p = this.normalizeText(p);

        if (!p) {
            continue;
        }

        var key = (quoted ? '"' : '') + p;

        if (seen[key]) {
            continue;
        }

        seen[key] = true;

        if (quoted) {
            out.push('"' + p + '"');
        } else {
            out.push(p);
        }
    }

    return out.join("|");
};












// ── Arabic canonical normalizer ──────────────────────────
TextIndexer.prototype.canon = function(ch) {
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

// ── Walk DOM collecting text nodes ───────────────────────
TextIndexer.prototype.getAllTextNodes = function(container) {
  var out = [];
  var walk = function(n) {
    if (!n) return;
    if (n.nodeType === 3) {
      out.push(n);
    } else {
      if (n.tagName === "BR") out.push({ nodeValue: " ", _isBR: true });
      var c = n.firstChild;
      while (c) { walk(c); c = c.nextSibling; }
    }
  };
  walk(container);
  return out;
};







// ── Async index build ─────────────────────────────────────
TextIndexer.prototype.buildIndexAsync = function(done) {

    var self = this;

    // invalidate previous build immediately
    this.buildId = (this.buildId || 0) + 1;

    var currentBuildId = this.buildId;

    // force previous state reset
    this.isIndexing = true;
    this.isComplete = false;

    // clear old data
    this.text = "";
    this.norm = "";
    this.map = [];
    this.wordStarts = [];
    this.brOffsets = [];

    var statusDiv =
        $(this.itemElement)
        .find(".index-status")[0];

    var updateStatus = function(msg) {

        // ignore old tasks
        if (currentBuildId !== self.buildId)
            return;

        if (statusDiv) {
            $(statusDiv).html(
                '<span class="index-progress">' +
                esc(msg) +
                '</span>'
            );
        }
    };

    var textContainer =
        document.createElement("div");

    textContainer.innerHTML = this.rawText;

    var nodes =
        this.getAllTextNodes(textContainer);

    // ── Phase 1 ─────────────────────────────────────
    var off = 0;
    var i = 0;

    var step1 = function() {

        // cancelled
        if (currentBuildId !== self.buildId)
            return;

        var start = Date.now();

        while (
            i < nodes.length &&
            Date.now() - start < 60
        ) {

            var v = nodes[i].nodeValue || "";

            if (nodes[i]._isBR)
                self.brOffsets.push(off);

            self.text += v;

            off += v.length;

            i++;
        }

        if (i < nodes.length) {

            updateStatus(
                "Indexing text... " +
                Math.floor((i / nodes.length) * 50) +
                "%"
            );

            setTimeout(step1, 10);

        } else {

            buildNorm();
        }
    };

    // ── Phase 2 ─────────────────────────────────────
    var buildNorm = function() {

        // cancelled
        if (currentBuildId !== self.buildId)
            return;

        self.norm = "";
        self.map = [];
        self.wordStarts = [];

        var lastSpace = true;
        var k = 0;
        var len = self.text.length;

        var chunk = function() {

            // cancelled
            if (currentBuildId !== self.buildId)
                return;

            var startTick = Date.now();

            while (
                k < len &&
                Date.now() - startTick < 60
            ) {

                var ch =
                    self.canon(
                        self.text.charAt(k)
                    );

                if (!ch) {
                    k++;
                    continue;
                }

                if (ch === " ") {

                    if (
                        self.norm.length &&
                        self.norm.charAt(
                            self.norm.length - 1
                        ) !== " "
                    ) {

                        self.norm += " ";

                        self.map.push(k);

                        lastSpace = true;
                    }

                } else {

                    if (lastSpace)
                        self.wordStarts.push(
                            self.norm.length
                        );

                    self.norm += ch;

                    self.map.push(k);

                    lastSpace = false;
                }

                k++;
            }

            if (k < len) {

                updateStatus(
                    "" +
                    window.SEARCH_LANG.Indexed_text_lbl +
                    ".. " +
                    (
                        50 +
                        Math.floor((k / len) * 50)
                    ) +
                    "%"
                );

                setTimeout(chunk, 10);

            } else {

                // only final active build can finish
                if (currentBuildId !== self.buildId)
                    return;

                self.isComplete = true;
                self.isIndexing = false;

                updateStatus(
                    "" +
                    window.SEARCH_LANG.Indexed_lbl +
                    " " +
                    self.norm.length +
                    " " +
                    window.SEARCH_LANG.chars_lbl +
                    ", " +
                    self.wordStarts.length +
                    " " +
                    window.SEARCH_LANG.words_lbl
                );

                if (self.onComplete)
                    self.onComplete(self);

                if (done)
                    done();
            }
        };

        chunk();
    };

    step1();
};










// ── Normalize a search query ──────────────────────────────
TextIndexer.prototype.canonicalQuery = function(q) {
  var result = "";
  for (var idx = 0; idx < q.length; idx++) {
    var rawCh = q[idx];
    var ch = this.canon(rawCh);
    if (ch === " ") {
      if (result.length && result.charAt(result.length - 1) !== " ") result += " ";
    } else if (ch) {
      result += ch;
    }
  }
  return result.trim().replace(/\s+/g, " ");
};

// ── Context window helpers ────────────────────────────────
TextIndexer.prototype.expandLeft = function(pos, chars) {
  var SKIP = /[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED\u0640\s]/;
  var moved = 0, p = pos - 1;
  while (p >= 0 && moved < chars) {
    if (!SKIP.test(this.text.charAt(p))) moved++;
    p--;
  }
  return Math.max(0, p + 1);
};

TextIndexer.prototype.expandRight = function(pos, chars) {
  var SKIP = /[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED\u0640\s]/;
  var moved = 0, p = pos;
  while (p < this.text.length && moved < chars) {
    if (!SKIP.test(this.text.charAt(p))) moved++;
    p++;
  }
  return Math.min(this.text.length, p);
};

TextIndexer.prototype.renderSnippets = function(rawQuery, contextChars, showAll) {
  var self = this;
  if (contextChars === undefined) contextChars = 40;
  if (showAll === undefined) showAll = false;
  
  if (!this.isComplete) return "\u29D7 Indexing not yet complete";
  if (!rawQuery)        return "No search query";

  var baseLink = "";
  if (this.itemElement) {
    var jsonUrl = ($(this.itemElement).attr("data-json-url") || "")
      .split("?")[0].split("#")[0];

    if (jsonUrl) {
      baseLink = jsonUrl
        .replace(/\/js_json\/posts\//, "/")
        .replace(/\.js$/i, ".html");
    }
  }

  var isWholeWord = function(norm, pos, length) {
    var WORD = /[A-Za-z0-9\u0621-\u064A\u0640]/;
    var before = norm.charAt(pos - 1);
    var after  = norm.charAt(pos + length);
    return (!before || !WORD.test(before)) && (!after || !WORD.test(after));
  };

  // =============================
  // Parse terms
  // =============================
  var parsedTerms = [];
  var terms = splitSmart(rawQuery);
  for (var ti = 0; ti < terms.length; ti++) {
    var kw = terms[ti];
    var quoted = (kw.charAt(0) === '"' && kw.charAt(kw.length - 1) === '"') ||
                 (kw.charAt(0) === "\u00AB" && kw.charAt(kw.length - 1) === "\u00BB") ||
                 (kw.charAt(0) === "\u201C" && kw.charAt(kw.length - 1) === "\u201D");

    var clean = quoted ? kw.slice(1, -1).trim() : kw;
    var q = this.canonicalQuery(clean);

    if (q) parsedTerms.push({ q: q, quoted: quoted, termIndex: ti });
  }

  if (!parsedTerms.length) return "No search query";

  // =============================
  // Collect hits per term with boundary detection
  // =============================
  var allHitsPerTerm = [];
  for (var ptIdx = 0; ptIdx < parsedTerms.length; ptIdx++) {
    var pt = parsedTerms[ptIdx];
    var hits = [];
    var pos = 0;

    while ((pos = this.norm.indexOf(pt.q, pos)) !== -1) {
      if (!pt.quoted || isWholeWord(this.norm, pos, pt.q.length)) {
        var isBoundaryMatch = false;
        if (!pt.quoted) {
          var beforeChar = this.norm.charAt(pos - 1);
          var afterChar = this.norm.charAt(pos + pt.q.length);
          var isBeforeBoundary = !beforeChar || beforeChar === ' ';
          var isAfterBoundary = !afterChar || afterChar === ' ';
          isBoundaryMatch = isBeforeBoundary && isAfterBoundary;
        }
        
        hits.push({
          normStart : pos,
          normEnd   : pos + pt.q.length - 1,
          termIndex : pt.termIndex,
          isBoundaryMatch: isBoundaryMatch
        });
      }
      pos += pt.q.length;
    }

    hits.sort(function(a, b) { return a.normStart - b.normStart; });
    allHitsPerTerm.push(hits);
  }

  var hits = [];
  for (var hIdx = 0; hIdx < allHitsPerTerm.length; hIdx++) {
    for (var hitIdx = 0; hitIdx < allHitsPerTerm[hIdx].length; hitIdx++) {
      hits.push(allHitsPerTerm[hIdx][hitIdx]);
    }
  }
  if (!hits.length) return window.SEARCH_LANG.no_results_found+" !!";

  var totalMatches = hits.length;

  // =============================
  // assign REAL IDs (same as before)
  // =============================
  var termCounts = {};
  var termBase = {};
  var running = 0;

  for (var hc = 0; hc < hits.length; hc++) {
    var h = hits[hc];
    termCounts[h.termIndex] = (termCounts[h.termIndex] || 0) + 1;
  }

  var termKeys = [];
  for (var k in termCounts) {
    if (termCounts.hasOwnProperty(k)) termKeys.push(parseInt(k));
  }
  termKeys.sort(function(a, b) { return a - b; });
  for (var tk = 0; tk < termKeys.length; tk++) {
    var kid = termKeys[tk];
    termBase[kid] = running;
    running += termCounts[kid];
  }

  var local = {};
  for (var hh = 0; hh < hits.length; hh++) {
    var hit = hits[hh];
    local[hit.termIndex] = (local[hit.termIndex] || 0) + 1;
    hit.realId = termBase[hit.termIndex] + local[hit.termIndex];
  }

  // =============================
  // REORDER: For EACH TERM separately, take first 2 boundary then first 2 substring
  // =============================
  var orderedHits = [];
  
  for (var t = 0; t < allHitsPerTerm.length; t++) {
    var termHits = allHitsPerTerm[t];
    
    // Separate boundary and substring hits for this term
    var termBoundaryHits = [];
    var termSubstringHits = [];
    
    for (var th = 0; th < termHits.length; th++) {
      if (termHits[th].isBoundaryMatch) {
        termBoundaryHits.push(termHits[th]);
      } else {
        termSubstringHits.push(termHits[th]);
      }
    }
    
    // Take first 2 from boundary and first 2 from substring
    if (!showAll) {
      for (var b = 0; b < Math.min(2, termBoundaryHits.length); b++) {
        orderedHits.push(termBoundaryHits[b]);
      }
      for (var s = 0; s < Math.min(2, termSubstringHits.length); s++) {
        orderedHits.push(termSubstringHits[s]);
      }
    } else {
      // For showAll, keep original order but grouped by term
      for (var th2 = 0; th2 < termHits.length; th2++) {
        orderedHits.push(termHits[th2]);
      }
    }
  }

  // =============================
  // Build snippets (preserving all existing link logic)
  // =============================
  var snippetHTML = "";
  
  for (var sn = 0; sn < orderedHits.length; sn++) {
    var hit = orderedHits[sn];

    var a = this.map[hit.normStart];
    var b = this.map[hit.normEnd];

    if (a == null || b == null) {
      for (var i = hit.normStart; i >= 0; i--) {
        if (this.map[i] != null) { a = this.map[i]; break; }
      }
      for (var j = hit.normEnd; j < this.map.length; j++) {
        if (this.map[j] != null) { b = this.map[j]; break; }
      }
    }

    if (a == null || b == null) continue;

    var bNext = b + 1;
    var start, end;
    
    // Different context sizes based on match type
    if (!showAll && hit.isBoundaryMatch) {
      // Boundary match: larger context
      start = this.expandLeft(a, contextChars * 1.5);
      end = this.expandRight(bNext, contextChars * 1.5);
    } else {
      // Substring match or showAll: standard context
      start = this.expandLeft(a, contextChars);
      end = this.expandRight(bNext, contextChars);
    }

    var matched = this.text.slice(a, bNext);

    var resultUrl = $(this.itemElement).attr("data-result-url") || "";
    var fullSearchQuery = getRhSearchFromUrl(resultUrl) || rawQuery;
    var id = hit.realId;

    // EXISTING LINK LOGIC - PRESERVED
    var href = baseLink +
      "#&rhsearch=" + encodeURIComponent(fullSearchQuery) + "&hitid=" + id;

    // EXISTING SNIPPET BUILDING - PRESERVED
    snippetHTML +=
      '<div class="snip-one" style="margin-bottom:8px;border-bottom:1px solid #eee;padding-bottom:6px;">' +
        '<b style="color:#06c">#' + id + ' </b>' +
        '…' +
        esc(this.text.slice(start, a).replace(/\s+/g, " ")) +
        '<a class="do_yelow_hit" href="' + esc(href) + '" target="_parent" style="">' +
          esc(matched) +
        '</a>' +
        esc(this.text.slice(bNext, end).replace(/\s+/g, " ")) +
        '…</div>';
  }

  var header = '<div style="margin-bottom:6px;color:#e91e63;font-size:12px;">' +
    '<i class="demo-icon icon-search-3"></i> ' + totalMatches + (totalMatches > 1 ? " "+window.SEARCH_LANG.matches_lbl+"" : " "+window.SEARCH_LANG.match_lbl+"") +
    '</div>';

  if (showAll) return header + snippetHTML;

  // Check if we need "more" button (for any term that has more than 2 hits of either type)
  var needMore = false;
  for (var tm = 0; tm < allHitsPerTerm.length; tm++) {
    var boundaryCount = 0;
    var substringCount = 0;
    for (var tc = 0; tc < allHitsPerTerm[tm].length; tc++) {
      if (allHitsPerTerm[tm][tc].isBoundaryMatch) {
        boundaryCount++;
      } else {
        substringCount++;
      }
    }
    if (boundaryCount > 2 || substringCount > 2) {
      needMore = true;
      break;
    }
  }

  if (!needMore) return header + snippetHTML;

  return header + snippetHTML +
    '<div style="margin-top:5px;">' +
      '<a href="javascript:void(0)" onclick="openSnipOverlay(this, event)" style="color:#6b16a9;font-weight:bold;">' + window.SEARCH_LANG.more_lbl + ' (' + totalMatches + ')</a>' +
    '</div>';
};


var navHtml =
''
+ '<div id="searchNavHolder">'

+ '    <div'
+ '        id="wSearchEnd"'
+ '        class="wSearchEnd"'
+ '        style="display:none;">'
+             (
				window.SEARCH_LANG &&
				window.SEARCH_LANG.dir === "ltr"
					? window.SEARCH_LANG.SearchEnd_lbl+' ..'
					: window.SEARCH_LANG.SearchEnd_lbl+' ..'
			 )
+ '    </div>'

+ '    <div class="wSearchFirstSmallScr '
+          (
			window.SEARCH_LANG &&
			window.SEARCH_LANG.dir === "ltr"
				? 'ltr'
				: 'rtl'
		  )
+ '    " style="display:none;">'

+ '        <a id="searchfirst" class="wSearchFirstSmallScr">'
+ '            <span>'
+                  (
					window.SEARCH_LANG &&
					window.SEARCH_LANG.dir === "ltr"
						? '<i class="demo-icon icon-to-start-alt"></i><br>'+window.SEARCH_LANG.first_lbl
						: '<i class="demo-icon icon-fast-fw"></i><br>'+window.SEARCH_LANG.first_lbl
				  )
+ '            </span>'
+ '        </a>'

+ '    </div>'

+ '    <div class="wSearchBackSmallScr '
+          (
			window.SEARCH_LANG &&
			window.SEARCH_LANG.dir === "ltr"
				? 'ltr'
				: 'rtl'
		  )
+ '    " style="display:none;">'

+ '        <a id="searchprev" class="wSearchBackSmallScr">'
+ '            <span>'
+                  (
					window.SEARCH_LANG &&
					window.SEARCH_LANG.dir === "ltr"
						? '<i class="demo-icon icon-fast-bw"></i><br>'+window.SEARCH_LANG.prev_lbl
						: '<i class="demo-icon icon-fast-fw"></i><br>'+window.SEARCH_LANG.prev_lbl
				  )
+ '            </span>'
+ '        </a>'

+ '    </div>'

+ '    <div class="wSearchNextSmallScr '
+          (
			window.SEARCH_LANG &&
			window.SEARCH_LANG.dir === "ltr"
				? 'ltr'
				: 'rtl'
		  )
+ '    " style="display:none;">'

+ '        <a id="searchnext" class="wSearchNextSmallScr">'
+ '            <span>'
+                  (
					window.SEARCH_LANG &&
					window.SEARCH_LANG.dir === "ltr"
						? '<i class="demo-icon icon-fast-fw"></i><br>'+window.SEARCH_LANG.next_lbl
						: '<i class="demo-icon icon-fast-bw"></i><br>'+window.SEARCH_LANG.next_lbl
				  )
+ '            </span>'
+ '        </a>'

+ '    </div>'

+ '    <div class="wSearchLastSmallScr '
+          (
			window.SEARCH_LANG &&
			window.SEARCH_LANG.dir === "ltr"
				? 'ltr'
				: 'rtl'
		  )
+ '    " style="display:none;">'

+ '        <a id="searchlast" class="wSearchLastSmallScr">'
+ '            <span>'
+                  (
					window.SEARCH_LANG &&
					window.SEARCH_LANG.dir === "ltr"
						? '<i class="demo-icon icon-to-end-alt"></i><br>'+window.SEARCH_LANG.last_lbl
						: '<i class="demo-icon icon-fast-bw"></i><br>'+window.SEARCH_LANG.last_lbl
				  )
+ '            </span>'
+ '        </a>'

+ '    </div>'

+ '</div>';




// Scroll to top
function scrollToTop() {
    var vs = $("#snipOverlayContent").data("VirtualScrollPro");
    if (vs && vs.scrollToTop) vs.scrollToTop();
}

// Scroll to bottom
function scrollToBottom() {
    var vs = $("#snipOverlayContent").data("VirtualScrollPro");
    if (vs && vs.scrollToBottom) vs.scrollToBottom();
}

// Scroll to bottom
function scrollToindex() {
    var vs = $("#snipOverlayContent").data("VirtualScrollPro");
    
	if(window.__ACTIVE_HIT_ID__!=null){
			if (vs && vs.scrollToindex) vs.scrollToindex(window.__ACTIVE_HIT_ID__);

	}
}



// ============================================================
// STATE
// ============================================================

var overlayOpen = false;
var lastHeight  = -1;
var resizeTimer = null;
var indexers    = {};
var container   = document.getElementById("container");
var vs          = null;

// ============================================================
// VIRTUAL SCROLL HELPERS
// ============================================================

var destroyVirtualScroll = function(elementId) {
    var $el = $("#" + elementId);

    if (!$el.length) {
        return false;
    }

    var instance = $el.data("VirtualScrollPro");

    if (!instance) {
        return false;
    }

    instance.destroy();
    $el.removeData("VirtualScrollPro");
    $el.find(".scrollbar").remove();

    $el.css({
        position: "",
        width: "",
        height: "",
        border: "",
        overflow: "",
        background: ""
    });

    var cls = $el.attr("class") || "";
    cls = cls.replace(
        /rtl-horizontal|ltr-horizontal|rtl-vertical|ltr-vertical|vertical|horizontal/g,
        ""
    );
    $el.attr("class", cls);

    var $rowsA = $el.find("#rowsA");
    var $rowsB = $el.find("#rowsB");

    if ($rowsA.length) {
        $rowsA.empty();
        $rowsA.css({
            display: "block",
            left: "0px",
            top: "0px",
            right: "",
            transform: ""
        });
    }

    if ($rowsB.length) {
        $rowsB.empty();
        $rowsB.css({
            display: "block",
            left: "0px",
            top: "0px",
            right: "",
            transform: ""
        });
    }

    var $info = $el.find("#info");
    if ($info.length) {
        $info.empty();
    }

    $(window).off("resize." + elementId);

    return true;
};
// ============================================================
// OVERLAY
// ============================================================
// ============================================================
var closeSnipOverlay = function() {
    overlayOpen = false;
    lastHeight = -1;
	window.__ACTIVE_HIT_ID__ =null;
    var $overlay = $("#snipOverlay");
    var $content = $("#snipOverlayContent");

    if (!$overlay.length || !$content.length) return;

    destroyVirtualScroll("snipOverlayContent");

    $content.find("#rowsA").empty();
    $content.find("#rowsB").empty();

    $overlay.css("display", "none");
    DragScroll(true);  // Only horizontal scrolling 
    triggerHeightCheck();

};

var openSnipOverlay = function(el, e) {

	window.__ACTIVE_HIT_ID__ =null; 
  
  // Check drag flag - prevents clicks during drag
    if(window.DRAG_SCROLL_DRAGGING === true){
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
  
  DragScroll(false);  // Only horizontal scrolling 
  overlayOpen = true;
 
  
   var msg = JSON.stringify({ type: "ifram_full", full: true });
    
 
  sendToParent(msg);
  
  

  var overlay = document.getElementById("snipOverlay");
  var content = document.getElementById("snipOverlayContent");
  if (!overlay || !content) return;

  var item = $(el).closest(".result-item")[0];
  if (!item) {
    var node = el;
    while (node && !$(node).hasClass("result-item")) node = node.parentNode;
    item = node;
  }

  if (!item) return;

  var itemId  = $(item).attr("data-item-id");
  var indexer = indexers[itemId];

  if (!indexer || !indexer.isComplete) {
    content.innerHTML = "Indexing not yet complete";
    overlay.style.display = "block";
    return;
  }

  destroyVirtualScroll("snipOverlayContent");

  var rhsearch   = getRhSearchFromUrl($(item).attr("data-result-url") || "");
  
  rhsearch = indexer.normalizeSearchQuery(rhsearch);
  
  
  var allSnippets = indexer.renderSnippets(rhsearch, 60, true);

  var tempDiv  = document.createElement("div");
  tempDiv.innerHTML = allSnippets;
  var snipNodes = $(tempDiv).find(".snip-one");

  var myData = snipNodes.length > 0 ? [] : [{ id: 1, html: '<div class="row"><div class="snips">' + allSnippets + '</div></div>' }];
  
  if (snipNodes.length > 0) {
    snipNodes.each(function(idx, node) {
      var match = node.innerHTML.match(/#(\d+)/);
      var hitId = match ? parseInt(match[1], 10) : (idx + 1);
      myData.push({
        id: hitId,
        html: '<div class="row">' + node.outerHTML + '</div>'
      });
    });
  }

  setTimeout(function() {
    var $el = $("#snipOverlayContent");
    
    $el.VirtualScrollPro({
      scroll_dir: "vertical",
      header    : "#vHeader",
      footer    : "#vFooter",
      dir       : window.SEARCH_LANG.dir,
      width     : "100%",
      height    : "100%",
      data      : myData
    });
    
    if ($el[0] && $el[0].__mqData) {
      vs = $el[0].__mqData["VirtualScrollPro"];
    }
  }, 10);

  overlay.style.display = "block";
  triggerHeightCheck();
};

// ============================================================
// RESULT RENDERING
// ============================================================

var buildTitleUrl = function(url) {
  if (!url) return url;

  var hashPos = url.indexOf("#");
  var base = hashPos === -1 ? url : url.slice(0, hashPos);
  var existingHash = hashPos === -1 ? "" : url.slice(hashPos + 1);

  var qPos = base.indexOf("?");
  var path  = qPos === -1 ? base : base.slice(0, qPos);
  var query = qPos === -1 ? ""   : base.slice(qPos + 1);

  var parts = [];
  if (query) parts.push(query);
  if (existingHash) parts.push(existingHash);

  if (!/(?:^|&)hitid=/.test(parts.join("&"))) {
    parts.push("hitid=null");
  }

  return path + "#&" + parts.join("&");
};

var writeResult = function(url, title, index, summary) {
  var jsonUrl  = convertToJsonPath(url);
  var titleUrl = buildTitleUrl(url);
 
  return '<div class="result-item" data-json-url="' + esc(jsonUrl) + '" data-result-url="' + esc(url) + '" data-indexed="false">' +
      '<div class="result-header">' +
        '<a class="result-title" href="' + esc(titleUrl) + '" target="_parent">[ ' + esc(index) + ' ] ' + esc(title) + '</a>' +
      '</div>' +
      '<div class="url">' + esc(cleanDisplayUrl(url)) + '</div>' +
      '<div class="result-summary">' + esc(summary) + '</div>' +
      '<div class="snips">'+window.SEARCH_LANG.Loading_content_lbl+'...</div>' +
      '<div class="index-status"></div>' +
    '</div>';
};

var applySnippetsToItem = function(item, indexer) {

    var resultUrl = $(item).attr("data-result-url") || "";
    var rhsearch  = getRhSearchFromUrl(resultUrl);

    if (!rhsearch) {
        return;
    }

    
	
	
	
     rhsearch = indexer.normalizeSearchQuery(rhsearch);
	
	
	


    var snipDiv = $(item).find(".snips")[0];

    if (!snipDiv) {
        return;
    }

    snipDiv.innerHTML = rhsearch
        ? indexer.renderSnippets(rhsearch, 40)
        : "No rhsearch in URL";

    triggerHeightCheck();
};

var loadJsonForItem = function(item, itemId) {
  if ($(item).attr("data-script-created") === "true") return;

  var jsonUrl = $(item).attr("data-json-url");
  if (!jsonUrl) return;

  var script = document.createElement("script");
  var localPageId = PAGE_BUILD_ID;
  script.type = "text/javascript";
  script.async = true;
  script.src = jsonUrl;

  script.onload = function() {
if (localPageId !== PAGE_BUILD_ID)
    return;
    // item removed from DOM
    if (!document.body.contains(item)) {
        return;
    }

    try {

        if (window.RAW_JSON && window.RAW_JSON.long_text) {

            var indexer =
                new TextIndexer(
                    window.RAW_JSON.long_text,
                    item,
                    function(done) {

    if (localPageId !== PAGE_BUILD_ID)
        return;

    if (!document.body.contains(item))
        return;

    $(item).attr(
        "data-indexed",
        "true"
    );

    applySnippetsToItem(
        item,
        done
    );
}
                );

            indexers[itemId] = indexer;

            indexer.buildIndexAsync();
        }

    } finally {

        try {
            delete window.RAW_JSON;
        } catch(e) {}

        try {
            if (script.parentNode)
                script.parentNode.removeChild(script);
        } catch(e) {}
    }
};
  script.onerror = function() {
    var snipDiv   = $(item).find(".snips")[0];
    var statusDiv = $(item).find(".index-status")[0];
    if (snipDiv) snipDiv.innerHTML = "Failed to load data";
    if (statusDiv) statusDiv.innerHTML = '<span class="index-progress">Failed to load data</span>';
  };

  document.head.appendChild(script);
  $(item).attr("data-script-created", "true");
};

function createScriptTags() {

    // Snippets disabled
    if (!window.sniptSearch) {

        $(".snips").hide();
        $(".index-status").hide();

        return;
    }

    $(".result-item").each(function(i, item) {

        var itemId =
            "item_" +
            Date.now() +
            "_" +
            i +
            "_" +
            Math.floor(Math.random() * 100000);

        $(item).attr(
            "data-item-id",
            itemId
        );

        loadJsonForItem(
            item,
            itemId
        );
    });
}

var addHitIdNull = function(url) {
  if (!url) return url;
 
  var hashPos = url.indexOf("#");
  var base = hashPos === -1 ? url : url.slice(0, hashPos);
  var hash = hashPos === -1 ? ""  : url.slice(hashPos);
 
  if (/[?&]hitid=/.test(base)) return url;
 
  var out = base.indexOf("?") !== -1
    ? base + "&hitid=null"
    : base + "?hitid=null";
 
  return out + hash;
};

// ============================================================
// HEIGHT SYSTEM
// ============================================================

function getDocHeight() {

    var all = document.body.getElementsByTagName("*");

    var maxBottom = 0;

    for (var i = 0; i < all.length; i++) {

        var el = all[i];

        if (!el.offsetParent) {
            continue;
        }

        var bottom =
            el.offsetTop +
            el.offsetHeight;

        if (bottom > maxBottom) {
            maxBottom = bottom;
        }
    }

  //  console.log("CALCULATED:", maxBottom);

    return maxBottom;
}

var sendHeightStable = function() {
  if (overlayOpen) return;
  var h = getDocHeight();
  if (h !== lastHeight) {
    lastHeight = h;
    
    var msg = JSON.stringify({ type: "resize", height: h });
    
    
	sendToParent(msg);
	
	
  }
};

var triggerHeightCheck = function() {
  clearTimeout(resizeTimer);
  
  
  
  
  resizeTimer = setTimeout(sendHeightStable, 30);
};

// ============================================================
// RESULT MANAGEMENT
// ============================================================

var clearResults = function() {

    // =====================================
    // HARD CANCEL ALL INDEXERS
    // =====================================

    for (var k in indexers) {

        if (!indexers.hasOwnProperty(k))
            continue;

        var idx = indexers[k];

        if (!idx)
            continue;

        // invalidate async loops
        idx.buildId++;

        // force stop
        idx.isIndexing = false;

        // IMPORTANT
        idx.isComplete = true;

        // remove callbacks
        idx.onComplete = null;
    }

    // wipe store
    indexers = {};

    // remove DOM
    container.innerHTML = "";

    lastHeight = -1;

    setTimeout(sendHeightStable, 150);
};

var renderBatch = function(arr) {

    // invalidate old page instantly
    PAGE_BUILD_ID++;

    var myPageId = PAGE_BUILD_ID;

    // FULL RESET
    clearResults();

    var html = "";

    for (var i = 0; i < arr.length; i++) {

        html += writeResult(
            arr[i].url,
            arr[i].title,
            arr[i].index,
            arr[i].summary
        );
    }

    // page changed meanwhile
    if (myPageId !== PAGE_BUILD_ID)
        return;

    container.innerHTML = html;

    $(".scrollBox").scrollTop(0);

    setTimeout(function() {

        // old async
        if (myPageId !== PAGE_BUILD_ID)
            return;

        createScriptTags();

    }, 10);

    setTimeout(function() {

        if (myPageId !== PAGE_BUILD_ID)
            return;

        triggerHeightCheck();

    }, 150);
};

var appendItem = function(data) {
  $(container).append(writeResult(data.url, data.title, data.index, data.summary));
  setTimeout(function() {
    var last = container.lastElementChild;
    if (last) {
      var itemId = "item_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
      $(last).attr("data-item-id", itemId);
      loadJsonForItem(last, itemId);
    }
  }, 10);
  triggerHeightCheck();
};

// ============================================================
// MESSAGE BUS
// ============================================================

var receive = function(msg) {
  if (!msg || !msg.data || !msg.data.type) return;
  switch (msg.data.type) {
    case "reset": clearResults(); break;
    case "batch": renderBatch(msg.data.data || []); break;
    case "item":  appendItem(msg.data.data); break;
  }
};

$(document).on("click", function(ev) {

    // Check drag flag - prevents clicks during drag
    if(window.DRAG_SCROLL_DRAGGING === true){
        ev.preventDefault();
        ev.stopPropagation();
        return false;
    }

    var a = $(ev.target).closest("a.result-title, .snip-one a")[0];

    if (!a) return;

    ev.preventDefault();
    ev.stopPropagation();

    var href = a.getAttribute("href") || "";

    var m = href.match(/hitid=(\d+)/);

    if (m) {
        window.__ACTIVE_HIT_ID__ = parseInt(m[1], 10);
    } else {
        window.__ACTIVE_HIT_ID__ = null;
    }

    $(".active_hit").removeClass("active_hit");

    $(a).addClass("active_hit");

    if (vs && window.__ACTIVE_HIT_ID__) {
        vs.setHitId(window.__ACTIVE_HIT_ID__);
        setTimeout(function() {
            vs.scrollToindex(window.__ACTIVE_HIT_ID__);
        }, 10);
    }

    var msg = JSON.stringify({
        type: "clicked_url",
        url: href
    });

    sendToParent(msg);
});


var processMessage = function(msg) {

  if (!msg) return;

  // STRING → OBJECT
  if (typeof msg === "string") {

    try {

      msg = JSON.parse(msg);

    } catch(e) {

      try {

        msg = eval("(" + msg + ")");

      } catch(ex) {

        return;
      }
    }
  }

  if (!msg || !msg.type) {
    return;
  }

  // RESET
  if (
    msg.reset &&
    typeof clearResults === "function"
  ) {

    clearResults();
  }

  // PAGE DIR
  if (msg.page_dir) {

    
  
  }

  // REMOVE OVERLAY
  if (msg.type === "remove_overlay") {

    closeSnipOverlay();
  }

 // BATCH
if (msg.type === "batch_all") {

    setResultsStringHTML(
        msg.results_no,
        msg.searchStr,
        msg.result_info
    );

    if (parseInt(msg.results_no, 10) <= 0) {
        $(".wSearchNavigationSmallScr").hide();
    } else {
        $(".wSearchNavigationSmallScr").show();
    }

    renderBatch(msg.data);
    buildPagination(msg.g_CurPage, msg.nNumPages);
}


};







$(window).on("resize", function() {



});
  
  




function bindNavigationButtons()
{
	

	var buttons = [
		{ id: "searchfirst", name: "first" },
		{ id: "searchprev", name: "prev" },
		{ id: "searchnext", name: "next" },
		{ id: "searchlast", name: "last" }
	];
	
	function handleNavigationClick(e, buttonName){
		// Prevent click if dragging
		if(window.DRAG_SCROLL_DRAGGING === true){
			if(e){
				if(e.preventDefault) e.preventDefault();
				if(e.stopPropagation) e.stopPropagation();
				e.returnValue = false;
			}
			return false;
		}
		
		sendToParent({
			type: "navigation_click",
			button: buttonName
		});
		
		return false;
	}
	
	for(var i = 0; i < buttons.length; i++){
		
		var btn = document.getElementById(buttons[i].id);
		if(btn){
			//alert();
			(function(buttonName){
				btn.onclick = function(e){
					return handleNavigationClick(e, buttonName);
				};
			})(buttons[i].name);
		}
	}
}









wait(function (app, $) {


// =====================================
// START
// =====================================

 sendToParent({
    type: "iframe_ready"
});


 
  
   //if (window.location.search.indexOf('trigger=') !== -1) {
	  // alert();
	   
	   
	   
	     
  
  
  
    $("#app").show();
  
  
  
  $(".wSearchNavigationSmallScr").html(navHtml);
  $("#sheetContent").html(search_sett);
  
  $("html").attr("dir", window.SEARCH_LANG.dir);

  $("#openBtn").html(
        '<i class="demo-icon icon-cog-outline"></i>' +
        window.SEARCH_LANG.search_settings
    );
  

  bindNavigationButtons();











document.getElementById(
    "searchResCount"
).value =
    String(
        window.search_per_page || 20
    );

document.getElementById("highlightsearch").checked = window.highlightSearch;
document.getElementById("highlightpartsearch").checked = window.highlightpartsearch;

document.getElementById("sniptsearch").checked = window.sniptSearch;


document.getElementById("mn33_sec").checked = window.mn33_sec;
document.getElementById("all_ar_sec").checked = window.all_ar_sec;
document.getElementById("all_en_sec").checked = window.all_en_sec;
document.getElementById("custom_sec").checked = window.custom_sec;

updateSearchMatchRadio();
updateSearchTypeRadio();

DragScroll(true, "xy", { momentum: true, momentumDecay: 0.85 });
  


                   

  

	   
	   
	   
	   
	   
  // }

  



if (window.jQuery && $.receiveMessage) {
    $.receiveMessage(function(event) {
      processMessage(event.data);
    }, "*");
}



});




$(document).ready(function() {
 
  
  
  
//alert(window.sheet_state);



(function () {

    var sheet = document.getElementById("sheet");
    var overlay = document.getElementById("overlayEl");
    var openButton = document.getElementById("openBtn");
    var closeTiny = document.getElementById("closeTinyBtn");
    var dragHandle = document.getElementById("dragTiny");

    var visible = false;
    var dragging = false;
    var startY = 0;
    var lastY = 0;
    var state = "half"; // half | full
    var animationFrame = null;

    function getY(e) {
        if (e.touches && e.touches.length) return e.touches[0].clientY;
        if (e.changedTouches && e.changedTouches.length) return e.changedTouches[0].clientY;
        return e.clientY;
    }

    function setTransition(on) {
        if (on) {
            sheet.style.transition = "transform 300ms ease-out, height 300ms ease-out";
            sheet.style.webkitTransition = "-webkit-transform 300ms ease-out, height 300ms ease-out";
        } else {
            sheet.style.transition = "none";
            sheet.style.webkitTransition = "none";
        }
    }

    function setTransform(y) {
        sheet.style.transform = "translateY(" + y + "px)";
        sheet.style.webkitTransform = "translateY(" + y + "px)";
    }

    function setHeight(percent) {
        sheet.style.height = percent + "%";
    }

    // Function to send state
    function sendSheetState() {
        if (state === "full") {
            if (typeof sendMulti === "function") {
                sendMulti({sheet_state: "sheet_full"});
            }
        } else if (state === "half") {
            if (typeof sendMulti === "function") {
                sendMulti({sheet_state: "sheet_part"});
            }
        }
    }

    function openSheet() {
        if (visible) return;
        
        // CHECK WINDOW STATE AND SET INITIAL HEIGHT
        if (window.sheet_state === "sheet_full") {
            state = "full";
            setHeight(100);
        } else if (window.sheet_state === "sheet_part") {
            state = "half";
            setHeight(50);
        } else {
            // Default to half if no state is set
            state = "half";
            setHeight(50);
        }
        
        visible = true;

        sheet.style.display = "flex";
        setTransform(window.innerHeight);
        
        // Force reflow
        sheet.offsetHeight;
        
        setTransition(true);

        // Use requestAnimationFrame for immediate but smooth animation
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(function() {
            setTransform(0);
            animationFrame = null;
        });

        if (overlay) {
            overlay.style.display = "block";
            overlay.style.opacity = "0";
            overlay.offsetHeight;
            requestAnimationFrame(function() {
                overlay.style.opacity = "1";
            });
        }

        document.body.style.overflow = "hidden";
        
        // Send initial state
        sendSheetState();
    }

    function closeSheet() {
        if (!visible) return;
        visible = false;
        dragging = false;
        setTransition(true);
        setTransform(window.innerHeight);

        if (overlay) overlay.style.opacity = "0";

        setTimeout(function () {
            sheet.style.display = "none";
            if (overlay) overlay.style.display = "none";
            document.body.style.overflow = "";
        }, 150);
    }

    function startDrag(e) {
        if (!visible) return;
        dragging = true;
        startY = getY(e);
        lastY = startY;
        setTransition(false);
        //if (e.preventDefault) e.preventDefault();
    }

    function moveDrag(e) {
        if (!dragging || !visible) return;
        lastY = getY(e);
        var deltaY = lastY - startY;

        if (deltaY < 0) {
            var grow = Math.abs(deltaY) / window.innerHeight * 100;
            if (grow > 50) grow = 50;
            if (state === "half") setHeight(50 + grow);
            else setHeight(100);
            setTransform(0);
        } else {
            setTransform(deltaY);
            if (state === "full") setHeight(100);
            else setHeight(50);
        }
        //if (e.preventDefault) e.preventDefault();
    }

    function endDrag(e) {
        if (!dragging) return;
        dragging = false;
        var deltaY = lastY - startY;

        setTransition(true);

        if (deltaY > 120) {
            closeSheet();
            return;
        }

        if (deltaY < -80) {
            state = "full";
            setHeight(100);
            setTransform(0);
            sendSheetState(); // Send state when changed to full
            return;
        }

        if (state === "full") {
            if (deltaY > 40) {
                state = "half";
                setHeight(50);
                setTransform(0);
                sendSheetState(); // Send state when changed to half
            } else {
                setHeight(100);
                setTransform(0);
            }
        } else {
            state = "half";
            setHeight(50);
            setTransform(0);
        }
    }

    // ربط أحداث السحب فقط على dragHandle
    if (dragHandle) {
        dragHandle.addEventListener("touchstart", startDrag, false);
        dragHandle.addEventListener("mousedown", startDrag, false);
    }

    document.addEventListener("touchmove", moveDrag, false);
    document.addEventListener("mousemove", moveDrag, false);
    document.addEventListener("touchend", endDrag, false);
    document.addEventListener("mouseup", endDrag, false);

    openButton.onclick = openSheet;
    if (closeTiny) closeTiny.onclick = closeSheet;
    if (overlay) overlay.onclick = closeSheet;

    // الأنماط الأساسية
    sheet.style.position = "fixed";
    sheet.style.left = "0";
    sheet.style.right = "0";
    sheet.style.bottom = "0";
    sheet.style.zIndex = "10001";
    sheet.style.backgroundColor = "#fff";
    sheet.style.borderRadius = "16px 16px 0 0";
    sheet.style.boxShadow = "0 -2px 12px rgba(0,0,0,0.2)";
    sheet.style.display = "none";
    sheet.style.flexDirection = "column";

    setHeight(50);
    setTransform(window.innerHeight);

    if (overlay) {
        overlay.style.position = "fixed";
        overlay.style.left = "0";
        overlay.style.top = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.zIndex = "10000";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        overlay.style.display = "none";
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 300ms ease";
    }

    if (dragHandle) {
        dragHandle.style.cursor = "move";
        dragHandle.style.userSelect = "none";
        dragHandle.style.webkitUserSelect = "none";
    }

    window.hideBottomSheet = closeSheet;

})();



  
});