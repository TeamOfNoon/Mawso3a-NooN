/* =========================================
   GLOBAL MONITOR ENGINE
   (single interval for whole app)
========================================= */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

var GLOBAL_MONITOR = (function () {

    var callbacks = [];
    var intervalId = null;
    var delay = 250;   // default speed

    function run() {

        for (var i = 0; i < callbacks.length; i++) {
            try {
                callbacks[i]();
            } catch (e) {}
        }
    }

    function start() {
        if (!intervalId) {
            intervalId = setInterval(run, delay);
        }
    }

    function stopIfEmpty() {
        if (callbacks.length === 0 && intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    return {

        add: function (fn) {
            if (typeof fn !== "function") return;

            /* prevent duplicate */
            for (var i = 0; i < callbacks.length; i++) {
                if (callbacks[i] === fn) return;
            }

            callbacks.push(fn);
            start();
        },

        remove: function (fn) {

            for (var i = callbacks.length - 1; i >= 0; i--) {
                if (callbacks[i] === fn) {
                    callbacks.splice(i, 1);
                }
            }

            stopIfEmpty();
        },

        clearAll: function () {
            callbacks = [];
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

    };

})();


function detectDesktop() {

    var isDesktop = false;
    var isTouch = false;

    // width check
    if (screen.width >= 1024) {
        isDesktop = true;
    }

    // touch check
    try {
        if ('ontouchstart' in window) {
            isTouch = true;
        }
    } catch(e){}

    return (isDesktop && !isTouch);
}






function getForumBaseName() {
        return location.href
            .split("#")[0]
            .split("?")[0]
            .replace(/^.*[\/\\]/, "")
            .replace(/_pa_\d+\.html$/, "")
            .replace(/\.html$/, "");
}



function getForumDirPath() {
        return location.href
            .split("#")[0]
            .split("?")[0]
            .replace(/[^\/\\]+$/, "");
}





function stripDivFromHTML(htmlString) {

    if (!htmlString) return "";

    var $temp = $("<div></div>");
    $temp.html(htmlString);

    /* ===== إزالة كل div ===== */
    $temp.find("div").each(function () {

        var $div = $(this);

        $div.contents().each(function () {
            $div.before(this);
        });

        $div.remove();
    });

    /* ===== إزالة كل br ===== */
    $temp.find("br").remove();

    return $temp.html();
}


function isIE() {

    var ua = window.navigator.userAgent;

    // IE 10 وأقدم
    if (ua.indexOf("MSIE ") > -1) return true;

    // IE 11
    if (ua.indexOf("Trident/") > -1) return true;

    return false;
}

function isInsideCHM() {

    var href = String(window.location.href).toLowerCase();

    return (
        href.indexOf("mk:@") === 0 ||
        href.indexOf("ms-its:") === 0 ||
        href.indexOf("its:") === 0
    );
}


function isCopyEventSupported(){

    /* IE9+ and modern browsers only */
    if (document.addEventListener)
        return true;

    return false;
}
/* =========================================
       DATE FORMAT (ORIGINAL LOGIC)
========================================= */
function formatDate(dateline) {
        var d = new Date(dateline * 1000);

        var saudiOffset = 3;
        var localOffset = -d.getTimezoneOffset() / 60;
        d.setHours(d.getHours() + (saudiOffset - localOffset));

        function pad(n) {
            return n < 10 ? "0" + n : n;
        }

        var day = pad(d.getDate());
        var month = pad(d.getMonth() + 1);
        var year = d.getFullYear();

        var hours24 = d.getHours();
        var ampm = (hours24 >= 12) ? "PM" : "AM";

        var hours12 = hours24 % 12;
        if (hours12 === 0) hours12 = 12;

        var minutes = pad(d.getMinutes());

        return (
            day + "-" + month + "-" + year +
            " - " + pad(hours12) + ":" + minutes + " " + ampm
        );
}


function getForumTypeFromPath() {
        var path = window.location.pathname;
        if (path.indexOf("forum_mn") !== -1) return "mn";
        if (path.indexOf("forum_vb") !== -1) return "vb";
        return "";
}

function buildQuoteHTML() {

    /* ===============================
       1️⃣ الحصول على HTML التحديد
    =============================== */

    var selectedHTML = getSavedSelectionHTML();
    if (!selectedHTML) return "";

    /* ===============================
       2️⃣ إزالة itemGroup من التحديد
    =============================== */

    var $temp = $("<div></div>").html(selectedHTML);
    $temp.find(".itemGroup").remove();

    var cleanMainHTML = $temp.html();

    /* ===============================
       3️⃣ تنظيف HTML
    =============================== */

    var $container = $("<div></div>").html(cleanMainHTML);

    getDef($container[0], "+");
    getDef($container[0], "-");

    $container.find("font").each(function () {
        $(this).replaceWith($(this).contents());
    });

    $container.find("a").each(function () {
        $(this).replaceWith($(this).contents());
    });

    $container.find("span").removeAttr("style");

    cleanMainHTML = $container.html();

    /* ===============================
       4️⃣ جلب itemGroup من نفس البوست فقط
    =============================== */

    var groupsHTML = "";
    var node = null;

    // ===== Modern Browsers =====
    if (window.getSelection) {

        var sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            node = sel.getRangeAt(0).startContainer;
        }

    }
    // ===== IE6–IE8 =====
    else if (document.selection && document.selection.createRange) {

        try {
            var range = document.selection.createRange();
            if (range) {
                node = range.parentElement();
            }
        } catch (e) {}
    }

    if (!node) {
        return "<div>" + cleanMainHTML + "</div>";
    }

    if (node.nodeType === 3) {
        node = node.parentNode;
    }

    // 🔥 أقرب postBody فقط
    var $postBody = $(node).closest(".postBody");

    if ($postBody.length) {

        $postBody.find(".itemGroup").each(function () {

            if (this.outerHTML) {
                groupsHTML += this.outerHTML;
            } else {
                groupsHTML += $("<div></div>").append($(this).clone()).html();
            }

        });
    }

    /* ===============================
       5️⃣ بناء HTML النهائي
    =============================== */

    return "<div>" + cleanMainHTML + "</div>" + groupsHTML;
}


/* =====================================================
   GET SAVED TEXT (RESTORES SELECTION)
===================================================== */
function getSavedSelectionHTML() {

    /* ===== MODERN ===== */
    if (SAVED_MODERN_RANGE) {

        try {

            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(SAVED_MODERN_RANGE);

            var container = document.createElement("div");
            container.appendChild(SAVED_MODERN_RANGE.cloneContents());

            return container.innerHTML;

        } catch (e) {
            return "";
        }
    }

    /* ===== IE6–8 ===== */
    if (SAVED_IE_RANGE) {

        try {

            SAVED_IE_RANGE.select();
            return SAVED_IE_RANGE.htmlText;  // 👈 هذا المهم

        } catch (e) {
            return "";
        }
    }

    return "";
}

function getDef(elem, dir) {

    if (!elem) return;

    function isEmptyText(node) {
        return node.nodeType === 3 &&
               node.nodeValue.replace(/^\s+|\s+$/g, "") === "";
    }

    function isZoom(node) {
        return node.nodeType === 1 &&
               node.className &&
               node.className.indexOf("zoom") !== -1;
    }

    function isBr(node) {
        return node.nodeType === 1 &&
               node.tagName === "BR";
    }

    function cleanBottom(node) {

        while (node.lastChild) {

            var child = node.lastChild;

            if (isEmptyText(child) || isBr(child) || isZoom(child)) {
                node.removeChild(child);
                continue;
            }

            if (child.nodeType === 1) {
                cleanBottom(child);

                if (!child.firstChild) {
                    node.removeChild(child);
                    continue;
                }
            }

            break;
        }
    }

    function cleanTop(node) {

        while (node.firstChild) {

            var child = node.firstChild;

            if (isEmptyText(child) || isBr(child) || isZoom(child)) {
                node.removeChild(child);
                continue;
            }

            if (child.nodeType === 1) {
                cleanTop(child);

                if (!child.firstChild) {
                    node.removeChild(child);
                    continue;
                }
            }

            break;
        }
    }

    if (dir === "+") cleanTop(elem);
    if (dir === "-") cleanBottom(elem);
}










function DragScroll(enable){

if(typeof DragScroll._init === "undefined"){
    DragScroll._init = false;
    DragScroll._enabled = false;
}

if(typeof window.DRAG_SCROLL_DRAGGING === "undefined"){
    window.DRAG_SCROLL_DRAGGING = false;
}

DragScroll._enabled = (enable === true);

/* FULL HARD DISABLE SELECTION */
if(DragScroll._enabled){
    document.onselectstart = function(){ return false; };
}else{
    document.onselectstart = null;
}

if(DragScroll._init) return;
DragScroll._init = true;


/* =========================
   HELPERS
========================= */
function add(el,t,f){
    if(!el) return;
    if(el.addEventListener) el.addEventListener(t,f,false);
    else if(el.attachEvent) el.attachEvent("on"+t,f);
    else el["on"+t]=f;
}

function stop(e){
    if(!e) return;
    if(e.preventDefault) e.preventDefault();
    e.returnValue = false;
    if(e.stopPropagation) e.stopPropagation();
    e.cancelBubble = true;
}

function clearSelection(){

    setTimeout(function(){

        // Modern browsers
        if (window.getSelection) {

            var sel = window.getSelection();

            if (sel && sel.toString().length > 0) {
                sel.removeAllRanges();
            }

        }
        // Old IE
        else if (document.selection) {

            var range = document.selection.createRange();

            if (range && range.text && range.text.length > 0) {
                document.selection.empty();
            }
        }
		
		
		document.onselectstart = function(){ return false; };
		

    }, 0);
}

/* =========================
   CHECK IF ELEMENT IS SLIDER (NEW FUNCTION)
========================= */
function isSliderElement(el) {
    while (el && el !== document) {
        if (el.id === "sliderWrap" || 
            el.id === "sliderTrack" || 
            el.id === "sliderThumb" ||
            el.id === "speedPanel" ||
            el.id === "readBtn" ||
            el.id === "speedLabel" ||
            el.id === "controls-horizontal" ||
            (el.className && typeof el.className === "string" && 
             (el.className.indexOf("slider") !== -1 ||
              el.className.indexOf("ctrl-item") !== -1 ||
              el.className.indexOf("thumb") !== -1))) {
            return true;
        }
        el = el.parentNode;
    }
    return false;
}

/* =========================
   FIND FIRST SCROLLABLE (VERTICAL & HORIZONTAL)
========================= */
function findScrollable(el, checkHorizontal){
    while(el && el !== document){
        if(checkHorizontal){
            // Check for horizontal scrollability
            if(el.scrollWidth > el.clientWidth &&
               el.clientWidth > 0){
                return el;
            }
        }else{
            // Check for vertical scrollability
            if(el.scrollHeight > el.clientHeight &&
               el.clientHeight > 0){
                return el;
            }
        }
        el = el.parentNode;
    }
    return null;
}

function getScrollRoot(){
    if(document.scrollingElement)
        return document.scrollingElement;

    if(document.compatMode === "CSS1Compat")
        return document.documentElement;

    return document.body;
}

var dragging = false;
var moved = false;
var startX = 0;
var startY = 0;
var lastX = 0;
var lastY = 0;
var activeScrollVertical = null;
var activeScrollHorizontal = null;


/* =========================
   MOUSEDOWN
========================= */
function down(e){

    if(!DragScroll._enabled) return;

    e = e || window.event;

    var btn = e.which || e.button;
    if(btn != 1) return;

    var target = e.target || e.srcElement;

    // IGNORE SLIDER ELEMENTS
    if (isSliderElement(target)) {
        return;
    }

    // Ignore if clicking on scrollbar
    if(isScrollbarClick(e, target)) {
        return;
    }

   // Ignore html and body elements
   if(target === document.documentElement || target === document.body){
       return;
   }

    activeScrollVertical = findScrollable(target, false);
    if(!activeScrollVertical)
        activeScrollVertical = getScrollRoot();

    activeScrollHorizontal = findScrollable(target, true);
    if(!activeScrollHorizontal)
        activeScrollHorizontal = getScrollRoot();

    dragging = true;
    moved = false;
    window.DRAG_SCROLL_DRAGGING = false;

    startX = e.clientX;
    startY = e.clientY;
    lastX = e.clientX;
    lastY = e.clientY;

    document.documentElement.style.cursor = "move";
    document.body.style.cursor = "move";

    if(e.preventDefault) e.preventDefault();
    e.returnValue = false;
}

// Check if click is on scrollbar - Combined version (ES3 compatible)
function isScrollbarClick(e, el) {
    if (!el || !e) return false;

    // Get element dimensions and position
    var rect = null;
    
    if (el.getBoundingClientRect) {
        rect = el.getBoundingClientRect();
    } else {
        // Fallback for older browsers
        return false;
    }
    
    var threshold = 18; // Scrollbar width approximation (safer size)
    
    // Get computed style to check overflow (ES3 compatible)
    var style = null;
    if(window.getComputedStyle) {
        style = window.getComputedStyle(el);
    } else if(el.currentStyle) {
        style = el.currentStyle;
    }
    
    var overflowX = 'visible';
    var overflowY = 'visible';
    
    if(style) {
        overflowX = style.overflowX || style.overflow || 'visible';
        overflowY = style.overflowY || style.overflow || 'visible';
    }
    
    // Check if element has scrollbars based on both style and content
    var hasVerticalScroll = (overflowY === 'scroll' || overflowY === 'auto') && 
                            el.scrollHeight > el.clientHeight;
    var hasHorizontalScroll = (overflowX === 'scroll' || overflowX === 'auto') && 
                              el.scrollWidth > el.clientWidth;
    
    // Detect RTL (scrollbar appears on left)
    var isRTL = false;
    if (el.dir === "rtl") isRTL = true;
    else if (document.dir === "rtl") isRTL = true;
    
    /* =======================
       VERTICAL SCROLLBAR CHECK
    ======================= */
    if (hasVerticalScroll) {
        
        if (isRTL) {
            // LEFT side scrollbar (RTL)
            if (e.clientX >= rect.left &&
                e.clientX <= rect.left + threshold) {
                return true;
            }
        } else {
            // RIGHT side scrollbar (LTR)
            if (e.clientX >= rect.right - threshold &&
                e.clientX <= rect.right) {
                return true;
            }
        }
    }
    
    /* =======================
       HORIZONTAL SCROLLBAR CHECK
    ======================= */
    if (hasHorizontalScroll) {
        // Check if click is on bottom edge (horizontal scrollbar)
        if (e.clientY >= rect.bottom - threshold &&
            e.clientY <= rect.bottom) {
            return true;
        }
    }
    
    /* =======================
       ADDITIONAL CHECK FOR SCROLLBAR THUMB
       This detects clicks specifically on the thumb area
    ======================= */
    if (hasVerticalScroll && el.scrollHeight > el.clientHeight) {
        // Calculate vertical scrollbar thumb position
        var scrollbarWidth = el.offsetWidth - el.clientWidth;
        var verticalTrackLeft = isRTL ? rect.left : rect.right - scrollbarWidth;
        var verticalTrackRight = isRTL ? rect.left + scrollbarWidth : rect.right;
        
        // Check if click is within the vertical scrollbar track area
        if (e.clientX >= verticalTrackLeft && e.clientX <= verticalTrackRight &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            
            // Calculate thumb position
            var scrollTop = el.scrollTop;
            var scrollHeight = el.scrollHeight;
            var clientHeight = el.clientHeight;
            
            var thumbHeight = Math.max(20, (clientHeight / scrollHeight) * clientHeight);
            var maxThumbTop = clientHeight - thumbHeight;
            var thumbTop = scrollHeight > clientHeight ? 
                          (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop : 0;
            
            // Check if click is on thumb (within thumb area)
            var thumbY = rect.top + thumbTop;
            if (e.clientY >= thumbY && e.clientY <= thumbY + thumbHeight) {
                return true; // Click on thumb
            }
            
            // Click is in scrollbar track but not on thumb - still should not trigger drag
            return true;
        }
    }
    
    /* =======================
       ADDITIONAL CHECK FOR HORIZONTAL SCROLLBAR THUMB
    ======================= */
    if (hasHorizontalScroll && el.scrollWidth > el.clientWidth) {
        // Calculate horizontal scrollbar thumb position
        var scrollbarHeight = el.offsetHeight - el.clientHeight;
        var horizontalTrackTop = rect.bottom - scrollbarHeight;
        
        // Check if click is within the horizontal scrollbar track area
        if (e.clientY >= horizontalTrackTop && e.clientY <= rect.bottom &&
            e.clientX >= rect.left && e.clientX <= rect.right) {
            
            // Calculate thumb position
            var scrollLeft = el.scrollLeft;
            var scrollWidth = el.scrollWidth;
            var clientWidth = el.clientWidth;
            
            var thumbWidth = Math.max(20, (clientWidth / scrollWidth) * clientWidth);
            var maxThumbLeft = clientWidth - thumbWidth;
            var thumbLeft = scrollWidth > clientWidth ? 
                           (scrollLeft / (scrollWidth - clientWidth)) * maxThumbLeft : 0;
            
            // Check if click is on thumb (within thumb area)
            var thumbX = rect.left + thumbLeft;
            if (e.clientX >= thumbX && e.clientX <= thumbX + thumbWidth) {
                return true; // Click on thumb
            }
            
            // Click is in scrollbar track but not on thumb - still should not trigger drag
            return true;
        }
    }
    
    return false;
}
/* =========================
   MOUSEMOVE
========================= */
function move(e){

    if(!dragging) return;
    if(!DragScroll._enabled) return;

    e = e || window.event;

    var dx = e.clientX - lastX;
    var dy = e.clientY - lastY;

    if(Math.abs(e.clientX - startX) > 4 || Math.abs(e.clientY - startY) > 4){
        moved = true;
        window.DRAG_SCROLL_DRAGGING = true;
    }

    lastX = e.clientX;
    lastY = e.clientY;

    // Handle horizontal scrolling
    var remainingX = dx;
    var currentHorizontal = activeScrollHorizontal;

    while(currentHorizontal){

        if(currentHorizontal.scrollWidth > currentHorizontal.clientWidth){

            var beforeX = currentHorizontal.scrollLeft;
            currentHorizontal.scrollLeft -= remainingX;
            var afterX = currentHorizontal.scrollLeft;

            var usedX = beforeX - afterX;
            remainingX -= usedX;

            if(remainingX === 0)
                break;
        }

        currentHorizontal = findScrollable(currentHorizontal.parentNode, true);
    }

    if(remainingX !== 0){
        var root = getScrollRoot();
        root.scrollLeft -= remainingX;
    }

    // Handle vertical scrolling
    var remainingY = dy;
    var currentVertical = activeScrollVertical;

    while(currentVertical){

        if(currentVertical.scrollHeight > currentVertical.clientHeight){

            var beforeY = currentVertical.scrollTop;
            currentVertical.scrollTop -= remainingY;
            var afterY = currentVertical.scrollTop;

            var usedY = beforeY - afterY;
            remainingY -= usedY;

            if(remainingY === 0)
                break;
        }

        currentVertical = findScrollable(currentVertical.parentNode, false);
    }

    if(remainingY !== 0){
        var root = getScrollRoot();
        root.scrollTop -= remainingY;
    }

    if(e.preventDefault) e.preventDefault();
    e.returnValue = false;
}


/* =========================
   MOUSEUP
========================= */
function up(){

    if(!dragging) return;

    dragging = false;

    document.documentElement.style.cursor = "default";
    document.body.style.cursor = "default";
}

function isIgnoredButton(el){

    while (el && el !== document) {

        if (el.className &&
            typeof el.className === "string") {

            var cls = " " + el.className + " ";

            if (cls.indexOf(" postBtnCopy ") !== -1 ||
                cls.indexOf(" quote_button ") !== -1 ||
				cls.indexOf(" panel-minimize ") !== -1 ||
				cls.indexOf(" quote-con-close ") !== -1 ||
				cls.indexOf(" quote-copy-all ") !== -1 ||
				cls.indexOf(" copy_post ") !== -1 
				) {
                return true;
            }
        }

        el = el.parentNode;
    }

    return false;
}
/* =========================
   CLICK BLOCK
========================= */
function clickBlock(e){

    if(!DragScroll._enabled) return;

    e = e || window.event;

    var target = e.target || e.srcElement;

    // IGNORE SLIDER ELEMENTS
    if (isSliderElement(target)) {
        return;
    }

    /* Ignore special buttons */
    if (isIgnoredButton(target)) {
        return;
    }

    clearSelection();

    if(window.DRAG_SCROLL_DRAGGING){

        stop(e);

        setTimeout(function(){
            window.DRAG_SCROLL_DRAGGING = false;
        },0);
    }
}
add(document,"mousedown",down);
add(document,"mousemove",move);
add(document,"mouseup",up);
add(document,"click",clickBlock);

}


function blockNativeDrag(el) {

    // jQuery
    $(el).bind("dragstart", function(e) {

        e = e || window.event;

        if (e.preventDefault) {
            e.preventDefault();
        }

        e.returnValue = false;

        return false;
    });

    // native
    el.ondragstart = function() {
        return false;
    };

    // old webkit image drag fix
    var imgs = el.getElementsByTagName("img");

    for (var i = 0; i < imgs.length; i++) {

        imgs[i].ondragstart = function() {
            return false;
        };

        imgs[i].setAttribute("draggable", "false");
    }
}




function enableDragScroll(selector) {

    var $wraps = $(selector);

    if (!$wraps.length) return;

    $wraps.each(function() {

        var wrap = this;
        var $wrap = $(wrap);

        // already initialized
        if (wrap._dragInit) {
            return;
        }

        wrap._dragInit = true;

        var down = false;

        var startX = 0;
        var startScroll = 0;

        wrap._dragMoved = false;

        // 🔥 DISABLE LINK DRAG
        var links = wrap.getElementsByTagName("a");

        for (var i = 0; i < links.length; i++) {

            links[i].draggable = false;

            links[i].ondragstart = function() {
                return false;
            };

            links[i].onselectstart = function() {
                return false;
            };

            links[i].unselectable = "on";

            // old webkit
            links[i].style.webkitUserSelect = "none";
            links[i].style.KhtmlUserSelect = "none";
            links[i].style.userSelect = "none";
        }

        /* ===== MOUSEDOWN ===== */
        $wrap.mousedown(function(e) {

            e = e || window.event;

            down = true;

            startX = e.clientX;
            startScroll = wrap.scrollLeft;

            wrap._dragMoved = false;

            wrap.style.cursor = "move";

            wrap.onselectstart = function() {
                return false;
            };

            return false;
        });

        /* ===== MOUSEMOVE ===== */
        $(document).mousemove(function(e) {

            if (!down) return;

            e = e || window.event;

            var dx = e.clientX - startX;

            if (dx > 3 || dx < -3) {

                wrap._dragMoved = true;

                if (e.preventDefault) {
                    e.preventDefault();
                }

                e.returnValue = false;
            }

            wrap.scrollLeft = startScroll - dx;

            return false;
        });

        /* ===== MOUSEUP ===== */
        $(document).mouseup(function() {

            if (!down) return;

            down = false;

            wrap.style.cursor = "default";

            setTimeout(function() {

                wrap._dragMoved = false;

            }, 50);
        });

        /* ===== PREVENT CLICK / VCLICK AFTER DRAG ===== */
        $wrap.bind("click vclick", function(e) {

            if (wrap._dragMoved) {

                if (e.preventDefault) {
                    e.preventDefault();
                }

                e.stopPropagation();

                e.returnValue = false;

                return false;
            }
        });

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










/* generate simple random code (IE6 / ES3 safe) */
function genRandomCode(len) {

        var s = "";
        var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        for (var i = 0; i < len; i++) {
            s += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return s;
}

function forceOverlayResize() {

        var el = $(".post-con-info")[0];
        if (!el) return;

        /* إجبار IE6 على إعادة الحساب */
        el.style.display = "none";
        el.offsetHeight; // 🔥 force reflow
        el.style.display = "block";

        /* trick إضافي لـ IE6 */
        el.style.zoom = el.style.zoom === "1" ? "1.001" : "1";
}

function renderPostConHTML(postid, postcount) {

    if (
        !window.POST_TEMPLATES ||
        !window.POST_TEMPLATES.postConHTML
    ) {
        return "";
    }

    return window.POST_TEMPLATES.postConHTML
        .replace(/{{postid}}/g, postid)
        .replace(/{{postcount}}/g, postcount);
}




  function getForumTypeFromPath() {
        var path = window.location.pathname;
        if (path.indexOf("forum_mn") !== -1) return "mn";
        if (path.indexOf("forum_vb") !== -1) return "vb";
        return "";
    }

























function handleItemBoxToggle_jq(selector) {

    // امنع التكرار
    $(document).off("click.itemToggle");

    $(document).on("click.itemToggle", selector, function (e) {
	
if (window.DRAG_SCROLL_DRAGGING) {
return false;
}
        e = e || window.event;

        /* 🔥 stop event completely */
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;

        if (e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;

        /* ---------------------------------
           get real .item-title
        --------------------------------- */

        var $title = $(this).closest(".item-title");
        if (!$title.length) return false;

        var $box = $title.parent();
        if (!$box.is(".item-box")) return false;

        var type = $box.attr("data-type");
        if (!type) return false;

        var $body = $box.children(".item-body").eq(0);
        if (!$body.length) return false;

        var hide = !$body.hasClass("fake_hide");

        var $all = $('.item-box[data-type="' + type + '"]');

        $all.each(function () {

            var $itemBox = $(this);
            var isNoInfo = $itemBox.closest(".no_info").length > 0;

            var $b = $itemBox.children(".item-body").eq(0);
            var $s = $itemBox.find("> .item-title .toggle-sign").eq(0);
            var $brs = $itemBox.parent().find("br." + type);

            if (!$b.length) return;

            if (hide) {


                $b.addClass("fake_hide");

                if (!isNoInfo) {
                    $itemBox.addClass("no_copy");
                    $brs.addClass("no_copy");
                }

                if ($s.length) $s.html("[+]");

            } else {

                $b.removeClass("fake_hide");

                if (!isNoInfo) {
                    $itemBox.removeClass("no_copy");
                    $brs.removeClass("no_copy");
                }

                if ($s.length) $s.html("[-]");
            }

        });
        scrollTopThenBack();
        /* scroll into view (IE safe) */
        setTimeout(function () {
            if ($box[0] && $box[0].scrollIntoView) {
                $box[0].scrollIntoView(true);
            }
        }, 100);

        return false;
    });
}


/* ===========================================
   GENERAL – select element text
   IE6 + modern
=========================================== */
function selectTextGeneral(el) {

    if (!el) return false;

    /* ===== IE6 ===== */
    if (document.body && document.body.createTextRange) {

        var r = document.body.createTextRange();
        r.moveToElementText(el);
        r.select();
        return true;
    }

    /* ===== Modern ===== */
    if (window.getSelection && document.createRange) {

        var sel = window.getSelection();
        sel.removeAllRanges();

        var r2 = document.createRange();
        r2.selectNodeContents(el);
        sel.addRange(r2);

        return true;
    }

    return false;
}


/* ===========================================
   GENERAL – copy current selection
   IE6 + modern
=========================================== */
function copySelectedGeneral() {

    /* IE6 */
    if (window.clipboardData && window.clipboardData.setData) {
        return document.execCommand("Copy");
    }

    /* modern */
    if (document.execCommand) {
        return document.execCommand("copy");
    }

    return false;
}

function scrollToElementIE(el) {

    if (!el) return;

    var y = 0;
    var n = el;

    while (n) {
        y += n.offsetTop || 0;
        n = n.offsetParent;
    }

    /* small offset for fixed headers / panels */
    y = y - 40;
    if (y < 0) y = 0;

    try {
        window.scrollTo(0, y);
    } catch (ex) {}
}




function detachNoCopy(root){

    var list = [];
    if(!root) return list;

    var all = root.getElementsByTagName("*");

    for(var i = 0; i < all.length; i++){

        var c = all[i].className;
        c = (typeof c === "string") ? c : "";

        if(c.indexOf("no-copy") !== -1 || c.indexOf("no_copy") !== -1){

            var parent = all[i].parentNode;
            var idx = 0;

            for(var n = parent.firstChild; n; n = n.nextSibling){
                if(n === all[i]) break;
                idx++;
            }

            list.push({
                node: all[i],
                parent: parent,
                index: idx
            });
        }
    }

    for(var j = list.length - 1; j >= 0; j--){
        list[j].parent.removeChild(list[j].node);
    }

    return list;
}


function restoreNoCopy(list){

    for(var i = 0; i < list.length; i++){

        var rec = list[i];
        var parent = rec.parent;
        var node   = rec.node;

        if(!parent || !node) continue;

        try{

            if(node.parentNode === parent) continue;

            var ref = parent.firstChild;
            var pos = 0;

            while(ref && pos < rec.index){
                ref = ref.nextSibling;
                pos++;
            }

            if(ref){
                parent.insertBefore(node, ref);
            }else{
                parent.appendChild(node);
            }

        }catch(e){
            try{ parent.appendChild(node); }catch(e2){}
        }
    }
}














/* =====================================================
   CLEAR OLD MARKS
===================================================== */
function clearPostMarks() {
  $(".imamCurrent").removeClass("imamCurrent");
  $(".hash-hit").removeClass("hash-hit");
}


/* =====================================================
   GET POST ID FROM HASH
===================================================== */
function getPostIdFromHash() {
  if (!location.hash) return null;

  var m = location.hash.match(/^#post_(\d+)$/);
  return m ? m[1] : null;
}





/* =====================================================
   HASH JUMP
===================================================== */
function fixHashJump() {
  if (!location.hash) return;

  var id = location.hash.substring(1);

  (function retry() {
    var el = document.getElementById(id);
    if (!el) {
      setTimeout(retry, 20);
      return;
    }

    try {
      // 🔹 DOM native scroll (NOT jQuery)
      el.scrollIntoView(true);

    } catch (e) {}

    // 🔹 highlight
    if (el.className.indexOf("hash-hit") === -1) {
      el.className += " hash-hit";
    }

  })();
}





function setupBackForumButton() {
    $(".backBtn").attr("href", "../../index.php.htm");
}

function setupBackThreadButton() {
    var type = getForumTypeFromPath();
    if (type) {
        var targetUrl = "./forum_" + type + THREAD.forum_id + ".html";
        $(".backBtn").attr("href", "" + targetUrl);
    }
}

function setupBackPostButton() {
    if (window.RAW_JSON && window.RAW_JSON.threadid) {
        var targetUrl = "./thread_" + window.RAW_JSON.threadid + ".html";
        $(".backBtn").attr("href", "" + targetUrl);
    }
}

function setupUpForumButton() {
    var targetUrl = "../../index.php.htm#" + getForumBaseName();
    $(".upBtn").attr("href", "" + targetUrl);
}

function setupUpThreadButton() {
    $(".upBtn").each(function() {
        var $btn = $(this);
        
        if (window.THREAD && window.THREAD.thread_up_link_desc) {
            $btn.attr("href", "" + window.THREAD.thread_up_link_desc);
        } else if (window.THREAD && window.THREAD.thread_up_link_asc) {
            $btn.attr("href", "" + window.THREAD.thread_up_link_asc);
        }
    });
}

function setupUpPostButton() {
    $(".upBtn").each(function() {
        var $btn = $(this);
        
        if (window.RAW_JSON && window.RAW_JSON.up_link) {
            $btn.attr("href", "" + window.RAW_JSON.up_link);
        }
    });
}


function setupUpPostButton() {
    
    $(".upBtn").each(function() {
        var $btn = $(this);
        
        // Set href attribute with #&url=
        if (window.RAW_JSON && window.RAW_JSON.up_link) {
            $btn.attr("href", "" + window.RAW_JSON.up_link);
        } 
        
    });
}




/* ===========================================
   IMAM BAR LINK HANDLER
   router style – jQuery delegated
=========================================== */
function initImamBarHandler_jq() {

    // منع التكرار
    $(document).off("click.imamBar");

    $(document).on("click.imamBar", ".imam-bar a", function (e) {

        var $link = $(this);
        if (!$link.length) return true;

        var bar = $link.closest(".imam-bar")[0];

        /* ==============================
           drag scroll protection
        ============================== */
        if (bar && bar._dragMoved) {
            return true;
        }

        var href = $link.attr("href");
        if (!href) return true;

        var idx = href.indexOf("#");
        if (idx === -1) {
            return true;   // دع المتصفح يتصرف
        }

        var linkPage = href.substring(0, idx);
        var hash     = href.substring(idx);

        var curPage = location.href.split("#")[0];

        /* =================================================
           نفس الصفحة
        ================================================= */
        if (linkPage === "" || linkPage === curPage) {

            if (e && e.preventDefault) e.preventDefault();
            e.cancelBubble = true;

            location.hash = hash;

            var pid = getPostIdFromHash();

            clearPostMarks();
            fixHashJump();

            if (pid) {

                var postEl = document.getElementById("post_" + pid);
                var linkEl = document.getElementById("post-" + pid);

                if (postEl) $(postEl).addClass("hash-hit");
                if (linkEl) $(linkEl).addClass("imamCurrent");
            }

            scrollCurrentItem(".pageNums", ".pageNums a.active");
            scrollCurrentItem(".imam-bar", ".imam-bar a.imamCurrent");

            return false; // منع أي شيء إضافي
        }

        /* صفحة مختلفة */
        return true;
    });
}
function removeDiacritics(str) {
    if (!str) return "";
    return str.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");
}



function stripHTML(html) {
    return html.replace(/<[^>]+>/g, "");
}






    
    
function getStringBetween(string) {
    // Strip HTML first
    if (string) {
        string = string.replace(/<[^>]+>/g, "");
    }
    
    if (!string) return false;
    
    // More flexible imam pattern
    var imam = 'ال[إاأ]مام.{0,50}اليماني';
    
    // Better separator pattern - matches any combination of tatweel, underscores, or newlines
    var slash = '[ـ_]{4,}|(?:\\n\\s*){2,}';
    
    // Make separator optional with |$ to match even if no separator
    var pattern = new RegExp('(' + imam + ')([\\s\\S]*?)(?:(' + slash + ')|$)', 'i');

    var match = string.match(pattern);
    
    if (match) {
   
        var extractedString = match[2] || match[0];
        
        // HIJRI: Match both formats (with month name or numbers)
        var patternHigri1 = /(\d{1,2}\s*[-–]\s*[^\d\-–]{2,20}?\s*[-–]\s*\d{3,4}\s*[هـه])/;
        var patternHigri2 = /(\d{1,2}\s*[-–]\s*\d{1,2}\s*[-–]\s*\d{3,4}\s*[هـه])/;
        
        // GREGORIAN
        var patternMeladi = /(\d{1,2}\s*[-–]\s*\d{1,2}\s*[-–]\s*\d{4}\s*[مـ])/;
        
        // TIME - capture time line only
        var patternTime = /(\d{1,2}\s*:\s*\d{1,2}[^\n]*)/;
        
        // NOTE - capture parentheses anywhere including after newlines
        var patternNote = /\(([^)]+)\)/;

        var resultH = extractedString.match(patternHigri1) || extractedString.match(patternHigri2);
        var resultM = extractedString.match(patternMeladi);
        var resultT = extractedString.match(patternTime);
        var resultN = extractedString.match(patternNote);

        var calendar = {};
        var key, result;
        
       calendar.imam ="الإمام ناصر محمد اليماني";
        
        if (resultH) {
            // Strip extra spaces and clean up
            var hijri = resultH[1].replace(/\s+/g, ' ');
            hijri = hijri.replace(/[ ]*[-–][ ]*/g, ' - ');
            hijri = hijri.replace(/[هـه]$/, 'هـ').trim();
            calendar.higri = hijri;
        }
        if (resultM) {
            // Strip extra spaces and clean up
            var meladi = resultM[1].replace(/\s+/g, ' ');
            meladi = meladi.replace(/[ ]*[-–][ ]*/g, ' - ');
            meladi = meladi.replace(/[مـ]$/, 'مـ').trim();
            calendar.meladi = meladi;
        }
        if (resultT) {
            // Strip extra spaces from time
            var time = resultT[1].replace(/\s+/g, ' ').trim();
            calendar.time = time;
        }
        if (resultN) {
            // Keep parentheses but strip inner spaces
            var note = resultN[0].replace(/\s+/g, ' ').trim();
            calendar.note = note;
        }

        // Count properties
        var propCount = 0;
        for (key in calendar) {
            if (calendar.hasOwnProperty(key)) {
                propCount++;
            }
        }
        
        return propCount > 0 ? calendar : false;
    }

    return false;
}










function addZoomSpanAfterBr(root){

    if(!root) return;

    var brs = root.getElementsByTagName("br");
    var i, br, sp, parent, next;

    /* live NodeList -> loop backwards */
    for(i = brs.length - 1; i >= 0; i--){

        br = brs[i];
        parent = br.parentNode;
        if(!parent) continue;

        /* already has zoom span after it? */
        next = br.nextSibling;
        if(
            next &&
            next.nodeType === 1 &&
            next.tagName === "SPAN" &&
            next.className &&
            next.className.indexOf("zoom") !== -1
        ){
            continue;
        }

        sp = document.createElement("span");
        sp.className = "zoom";

        if(br.nextSibling){
            parent.insertBefore(sp, br.nextSibling);
        }else{
            parent.appendChild(sp);
        }
    }
}



function scrollTopThenBack() {

    var $container = $('.scroll-hide');

    if (!$container.length) {
        $container = $('#app');
    }

    if (!$container.length) {
        $container = $('body, html');
    }

    var y = $container.scrollTop();

    $container.scrollTop(0);

    setTimeout(function () {

        $container.scrollTop(y);

        setTimeout(function () {
            $container.scrollTop(y);
        }, 1);

    }, 1);
}


function handleOrientationBr() {

   var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


     if (w > h) {
		

        $("br.br").hide();
    } else {
        $("br.br").show();
    }
}


/* =====================================================
   GLOBALS
===================================================== */

var SAVED_MODERN_RANGE = null;
var SAVED_IE_RANGE     = null;

var _DETECT_SELECTORS = [];
var _DETECT_BOUND     = false;



/* =====================================================
   MAIN FUNCTION
===================================================== */

function detectTextSelection_jq(rootSelector) {

    if (!rootSelector) return;

    var $roots = $(rootSelector);
    if (!$roots.length) return;

    var $quote     = $(".quote_button");
    var $quickCopy = $(".quick_copy_button");
    var $move      = $(".move_button");
    var $tool      = $(".tool_button");

    function show($el){ if ($el && $el.length) $el.show(); }
    function hide($el){ if ($el && $el.length) $el.hide(); }

    hide($quote);
    hide($quickCopy);

    var isModern = window.getSelection && document.createRange;

    /* =====================================
       MODERN (IE9+, Chrome, Firefox etc)
    ===================================== */

    if (isModern) {

        $(document).off("selectionchange.detectSel");

        $(document).on("selectionchange.detectSel", function () {

            var sel = window.getSelection();

            if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
                window.SAVED_MODERN_RANGE = null;
                hide($quote);
                hide($quickCopy);
                show($move);
                show($tool);
                return;
            }

            /* ===== real character check ===== */

            var txt = sel.toString().replace(/[\s\r\n\t]/g,"");

            if (txt.length < 1) {
                window.SAVED_MODERN_RANGE = null;
                hide($quote);
                hide($quickCopy);
                show($move);
                show($tool);
                return;
            }

            var range = sel.getRangeAt(0);

            var startNode = range.startContainer;
            var endNode   = range.endContainer;

            if (startNode.nodeType === 3) startNode = startNode.parentNode;
            if (endNode.nodeType === 3)   endNode   = endNode.parentNode;

            var $startPost = $(startNode).closest(".postBody");
            var $endPost   = $(endNode).closest(".postBody");

            /* must be same postBody */

            if (!$startPost.length || !$endPost.length ||
                $startPost[0] !== $endPost[0]) {

                window.SAVED_MODERN_RANGE = null;
                hide($quote);
                hide($quickCopy);
                show($move);
                show($tool);
                return;
            }

            var valid = false;

            $roots.each(function(){
                if (this === $startPost[0]) {
                    valid = true;
                    return false;
                }
            });

            if (!valid) {
                window.SAVED_MODERN_RANGE = null;
                hide($quote);
                hide($quickCopy);
                show($move);
                show($tool);
                return;
            }

            window.SAVED_MODERN_RANGE = range.cloneRange();

            show($quote);
            show($quickCopy);
            hide($move);
            hide($tool);

            if ($(".quote-panal").length > 0) return;

            $(".tool_bar").show();
        });

        return;
    }

    /* =====================================
       IE6–8 (TextRange)
    ===================================== */

    else {

        var updateUI_IE = function () {

            try {

                if (!document.selection) return;

                var sel = document.selection;

                if (sel.type === "None") {
                    window.SAVED_IE_RANGE = null;
                    hide($quote);
                    hide($quickCopy);
                    show($move);
                    show($tool);
                    return;
                }

                var r = sel.createRange();

                if (!r) {
                    window.SAVED_IE_RANGE = null;
                    hide($quote);
                    hide($quickCopy);
                    show($move);
                    show($tool);
                    return;
                }

                /* ===== real character check ===== */

                var txt = r.text.replace(/[\s\r\n\t]/g,"");

                if (txt.length < 1) {
                    window.SAVED_IE_RANGE = null;
                    hide($quote);
                    hide($quickCopy);
                    show($move);
                    show($tool);
                    return;
                }

                var parent = r.parentElement();
                var $postBody = $(parent).closest(".postBody");

                if (!$postBody.length) {
                    hide($quote);
                    hide($quickCopy);
                    show($move);
                    show($tool);
                    return;
                }

                var valid = false;

                $roots.each(function(){
                    if (this === $postBody[0]) {
                        valid = true;
                        return false;
                    }
                });

                if (!valid) {
                    hide($quote);
                    hide($quickCopy);
                    show($move);
                    show($tool);
                    return;
                }

                window.SAVED_IE_RANGE = r.duplicate();

                show($quote);
                show($quickCopy);
                hide($move);
                hide($tool);

                if ($(".quote-panal").length > 0) return;

                $(".tool_bar").show();

            } catch(e){}
        };

        GLOBAL_MONITOR.add(updateUI_IE);
    }
}


var quoteBlocker = null;

function initQuoteButton_jq(selector) {

    $(document).off("click.quoteOpen");

    $(document).on("click.quoteOpen", selector, function (e) {

        e = e || window.event;

        /* ===============================
           1️⃣ CAPTURE SELECTION FIRST
        =============================== */

        var finalHTML = buildQuoteHTML();
        if (!finalHTML) return false;

        /* ===============================
           2️⃣ STOP IE FROM COLLAPSING SELECTION
        =============================== */

        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;

        /* ⚠ DO NOT allow focus change */
        this.blur();

        /* ===============================
           3️⃣ Continue normally
        =============================== */

        forceOverlayResize();

        //document.documentElement.style.overflow = "hidden";
        //document.body.style.overflow = "hidden";
        
		
		if(isIE()){
				document.getElementById('app').style.overflow = "hidden";
			}
		
        if (quoteBlocker && typeof quoteBlocker.stop === "function") {
            quoteBlocker.stop();
        }

        /*quoteBlocker = initSelectionBlocker({
            namespace: "quoteBlock",
            allowed: [
                ".quote-panal",
                ".quote_button"
            ]
        });*/

        $(".quote-panal").remove();
        $("body").append(window.QUOTE_PANAl);

        var $content = $(".quote-panal .quote-content");

        $content.html(finalHTML);
        $content.find("span.zoom").remove();

        if ($content.length) {
            addZoomSpanAfterBr($content[0]);
        }

        var $panel = $(".quote-panal");
        if ($panel.length) {
            $panel[0].style.height = "100%";
        }

        return false;
    });
}


function closeQuoteInfoPanel_jq(selector) {
    
	
	
    $(document).off("click.quoteClose");

    $(document).on("click.quoteClose", selector, function (e) {
    $(".tool_bar").show();
	

	var $panel   = $(".quote-panal");
        $panel[0].style.height = "100%";
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        var $box = $(this).closest(".quote-panal");
        if ($box.length) {

            $box.remove();

            /* ✅ stop الحقيقي */
            if (quoteBlocker && typeof quoteBlocker.stop === "function") {
                quoteBlocker.stop();
                quoteBlocker = null;
            }

            //document.documentElement.style.overflow = "";
            //document.body.style.overflow = "";
			
			if(isIE()){
				document.getElementById('app').style.overflow = "";
			}
			
        
		}
		
		
		


        return false;
    });
}

function initQuickCopyButton_jq(selector) {

    $(document).off("click.quickCopy");

    $(document).on("click.quickCopy", selector, function (e) {

        e = e || window.event;

        /* ===============================
           STOP EVENT
        =============================== */

        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;

        if (e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;

        /* ===============================
           Detect scroll container
           order: .scroll-hide → #app → body
        =============================== */

        var scrollEl = null;

        var sh = document.getElementsByClassName ?
                 document.getElementsByClassName("scroll-hide") : null;

        if (sh && sh.length) {
            scrollEl = sh[0];
        }

        if (!scrollEl) {
            scrollEl = document.getElementById("app");
        }

        if (!scrollEl) {
            scrollEl = document.body;
        }

        /* ===============================
           Save scroll
        =============================== */

        var scrollTop  = scrollEl.scrollTop;
        var scrollLeft = scrollEl.scrollLeft;

        var body = document.body;
        var doc  = document.documentElement;

        var pageTop  = body.scrollTop  || doc.scrollTop;
        var pageLeft = body.scrollLeft || doc.scrollLeft;

        /* ===============================
           Build HTML
        =============================== */

        var finalHTML = buildQuoteHTML();
        if (!finalHTML) return false;

        /* ===============================
           Create hidden panel
        =============================== */

        $(".quote-panal").remove();

        var $panel = $(window.QUOTE_PANAl);

        $panel.css({
            position: "absolute",
            left: "-99999px",
            top: "0",
            width: "1px",
            height: "1px",
            overflow: "hidden"
        });

        $("#box").append($panel);

        var $content = $panel.find(".quote-content");
        $content.html(finalHTML);

        var postBody = $content[0];

        /* ===============================
           Detach no_copy
        =============================== */

        var removed = detachNoCopy(postBody);

        /* ===============================
           Copy
        =============================== */

        try {

            /* ===== IE ===== */

            if (document.body.createTextRange) {

                if ($panel[0].runtimeStyle) {
                    $panel[0].runtimeStyle.zoom = 1;
                }

                var range = document.body.createTextRange();

                range.moveToElementText(postBody);

                document.body.focus();

                range.select();

                document.execCommand("copy");

                if (document.selection) {
                    document.selection.empty();
                }

            }

            /* ===== Modern ===== */

            else if (window.getSelection && document.createRange) {

                var sel = window.getSelection();
                var range2 = document.createRange();

                range2.selectNodeContents(postBody);

                sel.removeAllRanges();
                sel.addRange(range2);

                document.execCommand("copy");

                sel.removeAllRanges();
            }

        } catch (ex) {}

        /* ===============================
           Restore no_copy + scroll
        =============================== */

        setTimeout(function () {

            restoreNoCopy(removed);

            $panel.remove();

            /* restore container scroll */

            if (scrollEl) {
                scrollEl.scrollTop  = scrollTop;
                scrollEl.scrollLeft = scrollLeft;
            }

            /* restore page scroll */

            if (doc) {
                doc.scrollTop  = pageTop;
                doc.scrollLeft = pageLeft;
            }

            if (body) {
                body.scrollTop  = pageTop;
                body.scrollLeft = pageLeft;
            }

        }, 0);

        return false;
    });
}


function initMinimize_jq() {

    $(document).off("click.minimizePanel");

    $(document).on("click.minimizePanel", ".panel-minimize", function (e) {

        e = e || window.event;

        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;

        if (e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;

        var $btn   = $(this);
        var $label = $btn.find("span");
        var $icon  = $btn.find("i.demo-icon");

        var $panel = $btn.closest(".quote-panal");
        if (!$panel.length) return false;

        // 🔁 TOGGLE
        if (!$panel.hasClass("minimized")) {

            // ===== MINIMIZE =====
            $panel.addClass("minimized");

            // 🔹 تغيير النص
            if ($label.length) {
                $label.text(window.LANG_COMMON.max);
            }

            // 🔹 تغيير الأيقونة
            if ($icon.length) {
                $icon
                    .removeClass("icon-minus")
                    .addClass("icon-window-maximize")
                    .html("");
            }

            // إخفاء المحتوى
            $panel.find(".quote-content,.quote-copy-all").hide();
            

            $panel.find(".child-post-con-info").each(function () {
                $(this).css({
                    overflow: "hidden"
                });
            });

            if (quoteBlocker && typeof quoteBlocker.stop === "function") {
                quoteBlocker.stop();
                quoteBlocker = null;
            }

            $panel.css({
                backgroundColor: "transparent"
            });

            //if(detectDesktop()){
            
			//document.documentElement.style.overflow = "";
            //document.body.style.overflow = "";
			//document.getElementById('app').style.overflow = "";
			
			//}
	
	
	
         if(isIE()){
				document.getElementById('app').style.overflow = "";
			}
            

            var $panel   = $(".quote-panal");
            $panel[0].style.height = "";
 
           $(".tool_bar").hide();
        } else {
          
            // ===== RESTORE =====
            $panel.removeClass("minimized");

            // 🔹 تغيير النص
            if ($label.length) {
                $label.text(window.LANG_COMMON.min);
            }

            // 🔹 تغيير الأيقونة
            if ($icon.length) {
                $icon
                    .removeClass("icon-window-maximize")
                    .addClass("icon-minus")
                    .html("");
            }

            $panel.find(".quote-content,.quote-copy-all").show();
            $(".tool_bar").show();

            $panel.find(".child-post-con-info").each(function () {
                $(this).css({
                    overflow: ""
                });
            });

            /*quoteBlocker = initSelectionBlocker({
                namespace: "quoteBlock",
                allowed: [
                    ".quote-panal",
                    ".quote_button"
                ]
            });*/



            //if(detectDesktop()){
				  //document.documentElement.style.overflow = "hidden";
                  //document.body.style.overflow = "hidden";
			      //document.getElementById('app').style.overflow = "hidden";	
			//}
          

           if(isIE()){
				document.getElementById('app').style.overflow = "hidden";
			}


            $panel.css({
                backgroundColor: ""
            });

            var $panel   = $(".quote-panal");
            $panel[0].style.height = "100%";
        
		$(".tool_bar").show();
		
		}



     $(".tool_bar").hide();

        return false;
    });
}



function handleCopyPost_jq(buttonSelector, bodySelector) {

    if (!buttonSelector || !bodySelector) return;

    var ns = buttonSelector.replace(/[^\w]/g, "");

    $(document).unbind("click." + ns);

    $(document).bind("click." + ns, function (e) {

        var target = e.target || e.srcElement;

        var btn = $(target).closest(buttonSelector)[0];
        if (!btn) return;

        if (window.DRAG_SCROLL_DRAGGING) return false;

        document.onselectstart = null;

        e = e || window.event;

        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;

        if (e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;

        /* =========================
           SAVE SCROLL POSITION
        ========================== */

        var scrollHide = $(".scroll-hide")[0];
        var app = $("#app")[0];

        var scrollHidePos = scrollHide ? scrollHide.scrollTop : 0;
        var appPos = app ? app.scrollTop : 0;

        var bodyPos =
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        if (btn._copied) return false;

        var oldText = btn.innerHTML;
        btn._copied = true;

        var postBody = null;

        /* =========================
           SEARCH SAME BLOCK
        ========================== */

        var $block = $(btn).closest(".post-list-button, [data-copy]");

        if ($block.length) {
            postBody = $block.find(bodySelector)[0];
        }

        /* =========================
           SAFETY FALLBACK
        ========================== */

        if (!postBody) {

            var node = btn;
            var limit = 0;

            while (node && limit < 20) {

                var found = $(node).find(bodySelector)[0];

                if (found) {
                    postBody = found;
                    break;
                }

                node = node.parentNode;
                limit++;
            }
        }

        if (!postBody) {
            btn._copied = false;
            return false;
        }

        var el = postBody;

        var removed = detachNoCopy(el);

        /* =========================
           SELECT TEXT
        ========================== */

        try {

            if (document.body.createTextRange) {

                // IE6 / IE7 / IE8
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.select();

            } else if (window.getSelection) {

                var sel = window.getSelection();
                var range = document.createRange();

                range.selectNodeContents(el);

                sel.removeAllRanges();
                sel.addRange(range);

            }

        } catch (err) {}

        /* =========================
           COPY
        ========================== */

        try {
            document.execCommand("copy");
        } catch (ex) {}

        /* =========================
           RESTORE SCROLL
        ========================== */

        function restoreScroll() {

            if (scrollHide) scrollHide.scrollTop = scrollHidePos;
            if (app) app.scrollTop = appPos;

            document.body.scrollTop = bodyPos;
            document.documentElement.scrollTop = bodyPos;
        }

        restoreScroll();
        setTimeout(restoreScroll, 1);
        setTimeout(restoreScroll, 30);

        setTimeout(function () {
            restoreNoCopy(removed);
        }, 1);

        /* =========================
           BUTTON TEXT
        ========================== */

        if (window.LANG_COMMON) {
            btn.innerHTML =
                window.LANG_COMMON.check_ok +
                window.LANG_COMMON.copy_done;
        } else {
            btn.innerHTML = "Copied";
        }

        setTimeout(function () {

            btn.innerHTML = oldText;
            btn._copied = false;

        }, 1500);

        return false;

    });
}
function initCustomCopyMenu(rootSelector, menuSelector){

    var $roots = $(rootSelector);
    var $menu  = $(menuSelector);

    if(!$roots.length || !$menu.length) return;

    var SAVED_IE_RANGE = null;

    function hideMenu(){
        $menu.hide();
    }

    function showMenu(x,y){
        $menu.css({
            position: "absolute",
            left: x + "px",
            top:  y + "px"
        }).show();
    }

    function hasSelectionInside(rootEl){

        if(!document.selection) return false;

        try{
            var r = document.selection.createRange();
            if(!r || !r.text) return false;

            var p = r.parentElement();
            while(p){
                if(p === rootEl) return true;
                p = p.parentNode;
            }
        }catch(e){}

        return false;
    }


    /* =========================
       RIGHT CLICK
    ========================= */

    $roots.on("contextmenu.customCopy", function(e){

        if(!hasSelectionInside(this)){
            hideMenu();
            return true;
        }

        try{
            var r = document.selection.createRange();
            SAVED_IE_RANGE = r ? r.duplicate() : null;
        }catch(ex){
            SAVED_IE_RANGE = null;
        }

        var x, y;

        if(typeof e.pageX !== "undefined"){
            x = e.pageX;
            y = e.pageY;
        }
        else{
            var doc  = document.documentElement;
            var body = document.body;

            x = e.clientX + (doc.scrollLeft || body.scrollLeft);
            y = e.clientY + (doc.scrollTop  || body.scrollTop);
        }

        var app = document.getElementById("app");

        if(app){
            var appOffset = $(app).offset();

            x = x - appOffset.left + app.scrollLeft;
            y = y - appOffset.top  + app.scrollTop;
        }

        showMenu(x,y);

        e.preventDefault();
        return false;
    });



    /* =========================
       COPY CLICK
    ========================= */

    $menu.on("mousedown.customCopy", function(e){

        if(!SAVED_IE_RANGE) return false;

        /* ===== detect scroll container ===== */

        var scrollEl = null;

        var sh = document.getElementsByClassName ?
                 document.getElementsByClassName("scroll-hide") : null;

        if(sh && sh.length){
            scrollEl = sh[0];
        }

        if(!scrollEl){
            scrollEl = document.getElementById("app");
        }

        if(!scrollEl){
            scrollEl = document.body;
        }

        /* ===== save scroll ===== */

        var scrollTop  = scrollEl.scrollTop;
        var scrollLeft = scrollEl.scrollLeft;

        var body = document.body;
        var doc  = document.documentElement;

        var pageX = body.scrollLeft || doc.scrollLeft;
        var pageY = body.scrollTop  || doc.scrollTop;

        /* ===== restore selection ===== */

        try{
            document.body.focus();
            SAVED_IE_RANGE.select();
        }catch(ex){}

        /* ===== restore scroll ===== */

        scrollEl.scrollTop  = scrollTop;
        scrollEl.scrollLeft = scrollLeft;

        body.scrollLeft = pageX;
        body.scrollTop  = pageY;

        doc.scrollLeft  = pageX;
        doc.scrollTop   = pageY;


        /* ===== find root element ===== */

        var rootEl = null;
        var p = SAVED_IE_RANGE.parentElement();

        while(p){
            if($(p).is(rootSelector)){
                rootEl = p;
                break;
            }
            p = p.parentNode;
        }

        if(!rootEl) return false;


        /* ===== detach no_copy elements ===== */

        var removed = detachNoCopy(rootEl);


        /* ===== copy ===== */

        try{
            copySelectedGeneral();
        }catch(ex){}


        setTimeout(function(){
            restoreNoCopy(removed);
        },0);


        hideMenu();

        e.preventDefault();
        return false;
    });



    /* =========================
       Hide outside
    ========================= */

    $(document).on("mousedown.customCopy", function(e){

        if(!$menu.is(":visible")) return;

        if(!$(e.target).closest($menu).length){
            hideMenu();
        }
    });


    $(document).on("keydown.customCopy", function(e){
        if(e.keyCode == 27){
            hideMenu();
        }
    });


    $(window).on("scroll.customCopy", hideMenu);
}
 
 /* ======================================================
   intercept Ctrl+C – detect by ROOT only (ES3 + jQuery)
====================================================== */

function interceptPostBodyCtrlC(root){

    if(!root) root = document;

    function ieRangeHit(r, el){
        try{
            var er = document.body.createTextRange();
            er.moveToElementText(el);
            return r.inRange(er) || er.inRange(r);
        }catch(e){
            return false;
        }
    }

    function rangeHit(r, el){

        if(r.intersectsNode)
            return r.intersectsNode(el);

        var er = document.createRange();
        er.selectNodeContents(el);

        return !(
            r.compareBoundaryPoints(Range.END_TO_START, er) <= 0 ||
            r.compareBoundaryPoints(Range.START_TO_END, er) >= 0
        );
    }

    /* -------------------------------------------
       detect selection touching ROOT
    ------------------------------------------- */
    function detectByRoot(){

        /* ===== IE ===== */
        if(document.selection){

            var r;
            try{ r = document.selection.createRange(); }catch(e){}
            if(!r) return null;

            var n = r.parentElement();
            while(n){
                if(n === root)
                    return root;
                n = n.parentNode;
            }

            if(ieRangeHit(r, root))
                return root;

            return null;
        }

        /* ===== modern ===== */
        if(window.getSelection){

            var s = window.getSelection();
            if(!s || s.isCollapsed) return null;

            var r2 = s.getRangeAt(0);

            var n2 = s.anchorNode;
            while(n2){
                if(n2 === root)
                    return root;
                n2 = n2.parentNode;
            }

            if(rangeHit(r2, root))
                return root;
        }

        return null;
    }

    /* -------------------------------------------
       keydown (jQuery, ES3)
    ------------------------------------------- */

    $(root).on("keydown", function(e){

        e = e || window.event;

        var code = e.keyCode || e.which;

        if(code === 67 && e.ctrlKey){

            var hit = detectByRoot();

            if(hit){

                if(document.selection){
                    try{
                        SAVED_IE_RANGE = document.selection.createRange();
                    }catch(ex){}
                }

                var removed = detachNoCopy(root);

                try{
                    copySelectedGeneral();
                }catch(ex){}

                setTimeout(function(){
                    restoreNoCopy(removed);
					scrollCurrentItem(".imam-bar", ".imam-bar a.imamCurrent");
                }, 0);

                e.preventDefault();
                return false;
            }
        }

        return true;
    });


    /* -------------------------------------------
       beforecopy
    ------------------------------------------- */

    if(document.body && document.body.onbeforecopy !== undefined){

        $(document.body).on("beforecopy", function(){

            if(detectByRoot())
                return false;

            return true;
        });
    }
}









function init_tool_Buttons() {

    /* =========================
       TOOL BUTTON
    ========================= */
    $(".tool_button").click(function(e){

        e.preventDefault();

        $(".main_button").hide();
        $(".tool_sec").show();
    });


    /* =========================
       BACK BUTTON
    ========================= */
    $(".back_button").click(function(e){

        e.preventDefault();

        $(".main_button").show();
        $(".tool_sec").hide();
		$(".movement_sec").hide();
    });


    /* =========================
       READ BUTTON
    ========================= */
    $(".read_button").click(function(e){

        e.preventDefault();

        $("#controls-horizontal").show();
        $(".tool_sec").hide();
    });

   $(".move_button").click(function(e){

        e.preventDefault();

        $(".main_button").hide();
        $(".movement_sec").show();
    });

	
var controls = $('#app').scrollControls();
var controls_sub = null; // Initialize as null

// Only initialize if elements exist
if ($('.scroll-hide').length > 0) {
    controls_sub = $('.scroll-hide').scrollControls();
 
} 

$(".move_up_button").click(function(e) {
    e.preventDefault();
    
   
        controls.top();
		if(controls_sub){
        controls_sub.top();
		}
   
});

$(".move_down_button").click(function(e) {
    e.preventDefault();
    
   
        controls.bottom();
        if(controls_sub){
			controls_sub.bottom();
		}
		
    
});


    /* ===============================
   TOGGLE CONTROLS ON DOCUMENT DOWN
================================= */
$(document).on("mousedown touchstart", function(e){

    var $controls = $("#controls-horizontal");
    var $tools    = $(".tool_sec");

    // 🚫 Ignore clicks inside controls-horizontal
    if($(e.target).closest("#controls-horizontal").length){
        return;
    }

    if($controls.is(":visible")){
        $controls.hide();
        $tools.show();
    }

});
	


}


















function toggleDragScroll() {
    if (typeof DragScroll !== 'undefined') {
        // Check current state and toggle
        var isEnabled = DragScroll._enabled === true;
        DragScroll(!isEnabled);
        
		if (DragScroll._enabled) {
              $('.drag_button i').removeClass('icon-hand-paper-o').addClass('icon-hand-grab-o');
        $('.drag_button i').html('');
    } else {
  
		
		$('.drag_button i').removeClass('icon-hand-grab-o').addClass('icon-hand-paper-o');
        $('.drag_button i').html('');
    }
		
		
		
        return !isEnabled;
    }
    return false;
}










function toggle_drag(){
 // Add click handler
    $('.drag_button').on('click', function(e) {
        e.preventDefault();
        toggleDragScroll();
    });	
}



























function toggleMoreMenu_jq(selector) {

    $(document).on("click", selector, function (e) {

        e = e || window.event;

        var $btn = $(this).closest(".more_butt");
        if (!$btn.length) return false;

        /* 🔥 STOP EVENT */
        if (e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;

        var $w = $btn.closest(".menu-wrapper");
        if (!$w.length) return false;

        var isOpen = $w.hasClass("open");

        $(".menu-wrapper.open").removeClass("open");

        if (!isOpen) {
            $w.addClass("open");
        }

        return false;
    });

    /* optional: close when clicking outside */
    $(document).on("click.moreClose", function (e) {

        if (!$(e.target).closest(".menu-wrapper").length) {
            $(".menu-wrapper.open").removeClass("open");
        }

    });
}














var mapBlocker = null;
function openMapForum_InfoPanel_jq(selector) {

    $(document).off("click.mapPanel");

    $(document).on("click.mapPanel", selector, function (e) {

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        $(".menu-wrapper.open").removeClass("open");
        $(".map-con-info").remove();



        $("body").append(window.FORUM_TEMPLATES.mapConHTML);

        $(".map-con-info").fadeIn(150);

        if (typeof forceOverlayResize === "function") {
            forceOverlayResize();
        }

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

      
       

        return false;
    });
}



function openMapThread_InfoPanel_jq(selector) {

    $(document).off("click.mapPanel");

    $(document).on("click.mapPanel", selector, function (e) {

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        $(".menu-wrapper.open").removeClass("open");
        $(".map-con-info").remove();


        $("body").append(window.THREAD_TEMPLATES.mapConHTML);

        $(".map-con-info").fadeIn(150);

        if (typeof forceOverlayResize === "function") {
            forceOverlayResize();
        }

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        return false;
    });
}



var panelBlocker = null;

function openPostInfoPanel_jq(selector) {

    $(document).off("click.postPanel");

    $(document).on("click.postPanel", selector, function (e) {

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        $(".menu-wrapper.open").removeClass("open");

        var html = renderPostConHTML(
            window.RAW_JSON.postid,
            RAW_JSON.postcount
        );

        $("body").append(html);

        forceOverlayResize();

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

      
        return false;
    });
}

function closePostInfoPanel_jq(selector) {

    $(document).off("click.postClose");

    $(document).on("click.postClose", selector, function (e) {

        e = e || window.event;

        var $btn = $(this).closest(".post-con-close");
        if (!$btn.length) return false;

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        var $box = $btn.closest(".post-con-info");
        if ($box.length) $box.remove();

        /* ✅ استخدم stop بدل offSelectionBlocker */
        if (panelBlocker && typeof panelBlocker.stop === "function") {
            panelBlocker.stop();
            panelBlocker = null;
        }

        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";

        return false;
    });
}




function openMapPost_InfoPanel_jq(selector) {

    $(document).off("click.mapPanel");

    $(document).on("click.mapPanel", selector, function (e) {

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        $(".menu-wrapper.open").removeClass("open");
        $(".map-con-info").remove();

        if (!window.RAW_JSON || !window.RAW_JSON.postid) return false;

        $("body").append(window.POST_TEMPLATES.mapConHTML);

        $(".map-con-info").fadeIn(150);

        if (typeof forceOverlayResize === "function") {
            forceOverlayResize();
        }

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        /* ✅ أوقف القديم ثم أنشئ الجديد */
        if (mapBlocker && typeof mapBlocker.stop === "function") {
            mapBlocker.stop();
        }

        mapBlocker = initSelectionBlocker({
            namespace: "mapBlock",
            allowed: [".map-con-info", ".post-con-info"]
        });

        return false;
    });
}


function closeMapInfoPanel_jq(selector) {

    $(document).off("click.mapClose");

    $(document).on("click.mapClose", selector, function (e) {

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        var $box = $(this).closest(".map-con-info");
        if ($box.length) $box.remove();

        /* ✅ stop الحقيقي */
        if (mapBlocker && typeof mapBlocker.stop === "function") {
            mapBlocker.stop();
            mapBlocker = null;
        }

        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";

        return false;
    });
}












function initClearSelectionIfToolBar_jq(selector) {

    // امنع التكرار
    $(document).off("click.clearSel");

    $(document).on("click.clearSel", selector, function (e) {

        e = e || window.event;

        /* 🔥 STOP فقط إذا أردت */
        // لا نوقف propagation هنا إلا إذا تحب

        /* ===============================
           CLEAR SELECTION
        =============================== */

        /* IE6–8 */
        if (document.selection) {
            try {
                document.selection.empty();
            } catch (ex) {}
        }

        /* Modern */
        else if (window.getSelection) {
            var sel = window.getSelection();
            if (sel && sel.removeAllRanges) {
                sel.removeAllRanges();
            }
        }

        return true;
    });
}





/* =========================================
   INIT SELECTION BLOCKER (jQuery)
========================================= */
function initSelectionBlocker(config) {

    if (!config) return;

    var allowed = config.allowed || [];
    var namespace = config.namespace || ("selBlock" + new Date().getTime());

    if (typeof allowed === "string") {
        allowed = [allowed];
    }

    var allowedSelector = allowed.join(",");
    var ns = ".selBlock_" + namespace;

    /* إزالة أي handler سابق لنفس namespace */
    $(document).off("selectstart" + ns);
    $(document).off("dragstart" + ns);

    var handler = function (e) {

        if (
            allowedSelector &&
            e.target &&
            $(e.target).closest(allowedSelector).length
        ) {
            return true; // ✅ allow
        }

        e.preventDefault();
        return false;
    };

    $(document).on("selectstart" + ns, handler);
    $(document).on("dragstart" + ns, handler);

    return {
        stop: function () {
            $(document).off("selectstart" + ns);
            $(document).off("dragstart" + ns);
        }
    };
}























































$.fn.scrollControls = function() {
    var $c = $(this);
    
    function scrollToTop() {
        $c.animate({ scrollTop: 0 }, 'fast');
    }
    
    function scrollToBottom() {
        $c.animate({ scrollTop: $c[0].scrollHeight }, 'fast');
    }
    
    function check() {
        var st = $c.scrollTop();
        var sh = $c[0].scrollHeight;
        var ch = $c.innerHeight();
    }
    
    $c.on('scroll', check);
    check();
    
    return {
        top: scrollToTop,
        bottom: scrollToBottom
    };
};



(function(global) {

function addEvent(el, type, fn) {
    if (!el) return;
    if (el.addEventListener) el.addEventListener(type, fn, false);
    else if (el.attachEvent) el.attachEvent("on" + type, fn);
    else el["on" + type] = fn;
}

function stopEvent(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    return false;
}

function getStyle(el, prop) {
    if (window.getComputedStyle) return window.getComputedStyle(el, null)[prop];
    return el.currentStyle ? el.currentStyle[prop] : "";
}

function getScrollbarWidth() {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "-9999px";
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.overflow = "scroll";
    document.body.appendChild(div);
    var width = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return width;
}

function CustomScrollbar(container, options) {

    if (typeof container === "string") {
        container = document.getElementById(container.replace("#", ""));
    }
    if (!container) return;

    options = options || {};
    this.container = container;

    this.thumbMinHeight = options.thumbMinHeight || 40;
    this.scrollbarWidth = options.scrollbarWidth || 15;
    this.arrowGap = 0;
    this.dragging = false;

    this._init();
}

CustomScrollbar.prototype._init = function() {

    var self = this;
    var c = this.container;
    var isRTL = (getStyle(c, "direction") === "rtl");

    c.style.overflow = "hidden";

    // scrollInner
    this.scrollInner = document.createElement("div");
    this.scrollInner.className = "scroll-hide";
    this.scrollInner.style.top = "0px";
    this.scrollInner.style.height = "100%";
    this.scrollInner.style.overflowX = "hidden";
    this.scrollInner.style.overflowY = "auto";
    this.scrollInner.style.zoom = 1; // IE6 hasLayout

    // نقل المحتوى
    while (c.firstChild) {
        this.scrollInner.appendChild(c.firstChild);
    }
    c.appendChild(this.scrollInner);

    // scrollbar
    this.scrollbar = document.createElement("div");
    this.scrollbar.style.position = "absolute";
    this.scrollbar.style.top = "0px";
    this.scrollbar.style.height = "100%";
    this.scrollbar.style.width = this.scrollbarWidth + "px";
    this.scrollbar.style.background = "#eee";
    this.scrollbar.style.cursor = "default";
    this.scrollbar.style.touchAction = "none";

    if (isRTL) {
        this.scrollbar.style.left = "0px";
        this.scrollInner.style.left = this.scrollbarWidth + "px";
        this.scrollInner.style.right = "auto";
		this.scrollbar.style.marginLeft = "6px";
    } else {
        this.scrollbar.style.right = "0px";
        this.scrollInner.style.left = "0px";
		
		this.scrollbar.style.marginRight = "6px";
    }
    c.appendChild(this.scrollbar);

    // thumb
    this.thumb = document.createElement("div");
    this.thumb.style.position = "absolute";
    this.thumb.style.left = "0px";
    this.thumb.style.top = this.arrowGap + "px";
    this.thumb.style.width = "100%";
    this.thumb.style.height = "60px";
    this.thumb.style.background = "#cbbf8c";
    this.thumb.style.cursor = "pointer";
    this.thumb.style.touchAction = "none";
    this.thumb.style.borderRadius = "5px";
    this.scrollbar.appendChild(this.thumb);

    // Update width initially
    this._updateContentWidth();

    this._bindEvents();

    // IE6 sometimes needs a tick after layout
    setTimeout(function() { self.update(); }, 0);
};

// New method to update content width
CustomScrollbar.prototype._updateContentWidth = function() {

    var c = this.container;

    var containerWidth = c.clientWidth; // excludes border, correct for layout

    if (!containerWidth) return;

    var newWidth = containerWidth - this.scrollbarWidth;

    if (newWidth < 0) newWidth = 0;

    this.scrollInner.style.width = newWidth + "px";
};

CustomScrollbar.prototype._bindEvents = function() {

    var self = this;

    function getClientY(e) {
        e = e || window.event;
        if (e.touches) {
            return e.touches[0].clientY;
        }
        return e.clientY;
    }

    function startDrag(e) {
        e = e || window.event;
        self.dragging = true;
        self.startY = getClientY(e);
        self.startThumbTop = parseInt(self.thumb.style.top, 10) || 0;

        if (e.preventDefault) e.preventDefault();
        if (self.thumb.setCapture) self.thumb.setCapture();
        return stopEvent(e);
    }

    function stopDrag(e) {
        e = e || window.event;
        if (!self.dragging) return;
        self.dragging = false;
        if (self.thumb.releaseCapture) self.thumb.releaseCapture();
    }

    function onDrag(e) {
        e = e || window.event;
        if (!self.dragging) return;
        if (e.preventDefault) e.preventDefault();

        var containerHeight = self.container.clientHeight || self.container.offsetHeight;
        if (!containerHeight) return;

        var thumbH = self.thumb.offsetHeight;
        var maxTop = containerHeight - thumbH - self.arrowGap;
        var minTop = self.arrowGap;

        var currentY = getClientY(e);
        var delta = currentY - self.startY;
        var newTop = self.startThumbTop + delta;

        if (newTop < minTop) newTop = minTop;
        if (newTop > maxTop) newTop = maxTop;

        self.thumb.style.top = newTop + "px";

        var contentHeight = self.scrollInner.scrollHeight;
        var maxScroll = contentHeight - containerHeight;
        if (maxScroll < 1) {
            self.scrollInner.scrollTop = 0;
            return;
        }

        var track = (maxTop - minTop);
        if (track < 1) track = 1;

        var ratio = (newTop - minTop) / track;
        self.scrollInner.scrollTop = Math.round(ratio * maxScroll);

        return stopEvent(e);
    }

    // Mouse events
    addEvent(this.thumb, "mousedown", startDrag);
    addEvent(document, "mouseup", stopDrag);
    addEvent(document, "mousemove", onDrag);

    // Touch events
    addEvent(this.thumb, "touchstart", startDrag);
    addEvent(document, "touchend", stopDrag);
    addEvent(document, "touchcancel", stopDrag);
    addEvent(document, "touchmove", onDrag);

    addEvent(this.thumb, "touchstart", function(e) {
        if (e.preventDefault) e.preventDefault();
    });

    addEvent(this.scrollbar, "touchstart", function(e) {
        if (e.preventDefault) e.preventDefault();
    });

    addEvent(this.scrollInner, "scroll", function() {
        self.updateThumbPosition();
    });

    // Fixed resize event handler
    addEvent(window, "resize", function() {
        self._updateContentWidth(); // Update width first
        self.update(); // Then update height/thumb
    });
};

CustomScrollbar.prototype.updateThumbPosition = function() {

    var containerHeight = this.container.clientHeight || this.container.offsetHeight;
    if (!containerHeight) return;

    var contentHeight = this.scrollInner.scrollHeight;
    var maxScroll = contentHeight - containerHeight;
    if (maxScroll < 1) {
        this.thumb.style.top = this.arrowGap + "px";
        return;
    }

    var minTop = this.arrowGap;
    var maxTop = containerHeight - this.thumb.offsetHeight - this.arrowGap;
    var track = maxTop - minTop;
    if (track < 1) track = 1;

    var ratio = this.scrollInner.scrollTop / maxScroll;
    var newTop = minTop + Math.round(ratio * track);
    this.thumb.style.top = newTop + "px";
};

CustomScrollbar.prototype.update = function() {

    var containerHeight = this.container.clientHeight || this.container.offsetHeight;
    if (!containerHeight) {
        this.scrollbar.style.display = "none";
        return;
    }

    var contentHeight = this.scrollInner.scrollHeight;

    if (contentHeight <= containerHeight) {
        this.scrollbar.style.display = "none";
        this.scrollInner.style.overflowY = "hidden";
        this.scrollInner.scrollTop = 0;
        return;
    }

    this.scrollbar.style.display = "block";
    this.scrollInner.style.overflowY = "scroll";

    var visibleRatio = containerHeight / contentHeight;
    var thumbH = Math.max(Math.round(visibleRatio * containerHeight), this.thumbMinHeight);

    if (thumbH > containerHeight - (2 * this.arrowGap)) thumbH = containerHeight - (2 * this.arrowGap);
    if (thumbH < 10) thumbH = 10;

    this.thumb.style.height = thumbH + "px";
    this.updateThumbPosition();
};

global.CustomScrollbar = CustomScrollbar;

})(window);








function initAutoHideBar(){

    var $bar = $(".tool_bar");
    var $mainBtn = $(".main_button");
    var $quoteBtn = $(".quote_button");

    var last = 0;
    var hidden = false;
    var threshold = 8;

    var isIE6 = !!(window.attachEvent && !window.addEventListener);

    var $c = $(".scroll-hide").filter(function(){
        return this.scrollHeight > this.clientHeight;
    }).first();

    if(!$c.length){
        $c = $("#app").filter(function(){
            return this.scrollHeight > this.clientHeight;
        });
    }

    if(!$c.length) return;

    var scrollTimer = null;

    $c.off("scroll.autoHide");

    $c.on("scroll.autoHide", function(){

        var self = this;

        // 🔥 THROTTLE FOR IE6
        if(scrollTimer){
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(function(){

            /* ===== CONDITIONS BLOCK ===== */
            if(window.read_scroll.isReading()) return;
            if ($(".quote-panal").length > 0) return;
            if ($mainBtn[0].style.display === "none") return;
            if ($quoteBtn[0].style.display !== "none") return;

            var st = self.scrollTop;
            var maxScroll = self.scrollHeight - self.clientHeight;

            if (st >= maxScroll - 2) {
                if(hidden){
                    if(isIE6){
                        $bar.show();   // no animation in IE6
                    }else{
                        $bar.stop(true,true).fadeIn(200);
                    }
                    hidden = false;
                }
                last = st;
                return;
            }

            if(self.scrollHeight <= self.clientHeight){
                if(isIE6){
                    $bar.show();
                }else{
                    $bar.stop(true,true).fadeIn(200);
                }
                hidden = false;
                return;
            }

            if(st > last + threshold){
                if(!hidden){
                    if(isIE6){
                        $bar.hide();
                    }else{
                        $bar.stop(true,true).fadeOut(200);
                    }
                    hidden = true;
                }
                last = st;
            }
            else if(st < last - threshold){
                if(hidden){
                    if(isIE6){
                        $bar.show();
                    }else{
                        $bar.stop(true,true).fadeIn(200);
                    }
                    hidden = false;
                }
                last = st;
            }

        }, isIE6 ? 40 : 0);  // 🔥 IE6 throttle (25fps)

    });
}












































var ScrollReader = (function($) {
    "use strict";
    var topPauseUntil = 0;
    var lastScrollPos = 0;
	var restartingFromTop = false;
    var timer = null,
        isReading = false,
        isDragging = false,
        thumbWidth = 22,
        currentPercent = 0,
        readerInstance = null,
        dragOffsetX = 0,
        lastScrollTime = 0,
        scrollAccumulator = 0,
        animationFrame = null,
        lastManualScroll = 0,
        scrollTimeout = null,
        // IE6 optimization variables
        ie6FrameCount = 0,
        ie6LastScroll = 0,
        ie6ScrollBatch = 0,
        ie6TargetPosition = 0,
        ie6CurrentPosition = 0,
        ie6SmoothingFactor = 0.15; // Increased smoothing
    
    var isIE6 = !!(window.attachEvent && !window.addEventListener);
    
    var hasRAF = !isIE6 && window.requestAnimationFrame;
    
   
    
    function isRTL() {
        return $("body").hasClass("rtl") || 
               (document.documentElement && document.documentElement.getAttribute("dir") === "rtl") || 
               (document.body && document.body.getAttribute("dir") === "rtl");
    }
    
    // Cache DOM elements for IE6
    var cachedScrollHide = null,
        cachedApp = null,
        cachedDocElement = document.documentElement,
        cachedBody = document.body;
    
    function getCurrentScroll() {
        // Fast path for IE6 with caching
        if (isIE6) {
		
            // Try scroll-hide first
            if (!cachedScrollHide) {
                cachedScrollHide = $('.scroll-hide').first();
            }
            if (cachedScrollHide && cachedScrollHide.length) {
                return cachedScrollHide[0].scrollTop || 0;
            }
            
            // Try app
            if (!cachedApp) {
                cachedApp = $('#app').first();
            }
            if (cachedApp && cachedApp.length) {
                return cachedApp[0].scrollTop || 0;
            }
            
            // Use cached elements
            return cachedBody ? (cachedBody.scrollTop || 0) : 0;
        }
        
        // Non-IE6 path
        var $scrollHide = $('.scroll-hide').first();
        if ($scrollHide.length) {
            return $scrollHide[0].scrollTop || 0;
        }
        
        var $app = $('#app');
        if ($app.length) {
            return $app[0].scrollTop || 0;
        }
        return window.pageYOffset || 
               (document.documentElement ? document.documentElement.scrollTop : 0) || 
               (document.body ? document.body.scrollTop : 0) || 0;
    }
    
    function setScrollPosition(pos) {
        pos = Math.max(0, Math.min(getMaxScroll(), pos));
        
        // Fast path for IE6
        if (isIE6) {
            if (cachedScrollHide && cachedScrollHide.length) {
                cachedScrollHide[0].scrollTop = Math.round(pos);
                return;
            }
            
            if (cachedApp && cachedApp.length) {
                cachedApp[0].scrollTop = Math.round(pos);
                return;
            }
            
            if (cachedBody) {
                cachedBody.scrollTop = Math.round(pos);
            }
            if (cachedDocElement) {
                cachedDocElement.scrollTop = Math.round(pos);
            }
            return;
        }
        
        // Non-IE6 path
        var $scrollHide = $('.scroll-hide').first();
        if ($scrollHide.length) {
            $scrollHide[0].scrollTop = pos;
            return;
        }
        
        var $app = $('#app');
        if ($app.length) {
            $app[0].scrollTop = pos;
            return;
        }
        
        window.scrollTo(0, pos);
        if (document.documentElement) document.documentElement.scrollTop = pos;
        if (document.body) document.body.scrollTop = pos;
    }
    
    // Cache max scroll value for IE6
    var cachedMaxScroll = -1,
        lastHeightCheck = 0;
    
    function getMaxScroll() {
        // For IE6, cache the value and only recalculate every 1000ms
        if (isIE6) {
            var now = new Date().getTime();
            if (cachedMaxScroll !== -1 && now - lastHeightCheck < 1000) {
                return cachedMaxScroll;
            }
            lastHeightCheck = now;
        }
        
        var maxScroll = 0;
        
        if (isIE6) {
            if (cachedScrollHide && cachedScrollHide.length) {
                maxScroll = Math.max(0, cachedScrollHide[0].scrollHeight - cachedScrollHide[0].clientHeight);
            } else if (cachedApp && cachedApp.length) {
                maxScroll = Math.max(0, cachedApp[0].scrollHeight - cachedApp[0].clientHeight);
            } else {
                var docHeight = Math.max(
                    cachedDocElement ? cachedDocElement.scrollHeight : 0,
                    cachedBody ? cachedBody.scrollHeight : 0
                );
                var windowHeight = cachedDocElement ? cachedDocElement.clientHeight : 
                                 (cachedBody ? cachedBody.clientHeight : 0);
                maxScroll = Math.max(0, docHeight - windowHeight);
            }
            
            cachedMaxScroll = maxScroll;
            return maxScroll;
        }
        
        // Non-IE6 path
        var $scrollHide = $('.scroll-hide').first();
        if ($scrollHide.length) {
            return Math.max(0, $scrollHide[0].scrollHeight - $scrollHide[0].clientHeight);
        }
        
        var $app = $('#app');
        if ($app.length) {
            return Math.max(0, $app[0].scrollHeight - $app[0].clientHeight);
        }
        var docHeight = Math.max(
            document.documentElement ? document.documentElement.scrollHeight : 0,
            document.body ? document.body.scrollHeight : 0
        );
        var windowHeight = window.innerHeight || 
                          (document.documentElement ? document.documentElement.clientHeight : 0) || 
                          (document.body ? document.body.clientHeight : 0);
        return Math.max(0, docHeight - windowHeight);
    }
    
    function getScrollSpeed() {
        if (currentPercent < 0.05) {
            return 0.5;
        } else if (currentPercent < 0.1) {
            return 1;
        } else if (currentPercent < 0.15) {
            return 1.5;
        } else if (currentPercent < 0.2) {
            return 2;
        } else if (currentPercent < 0.25) {
            return 2.5;
        } else if (currentPercent < 0.3) {
            return 3;
        } else if (currentPercent < 0.4) {
            return 3.5;
        } else if (currentPercent < 0.5) {
            return 4;
        } else if (currentPercent < 0.6) {
            return 4.5;
        } else if (currentPercent < 0.7) {
            return 5;
        } else if (currentPercent < 0.8) {
            return 5.5;
        } else if (currentPercent < 0.9) {
            return 6;
        } else {
            return 6.5;
        }
    }
    
    function getIntervalTime() {
        if (currentPercent < 0.05) {
            return 300;
        } else if (currentPercent < 0.1) {
            return 280;
        } else if (currentPercent < 0.15) {
            return 260;
        } else if (currentPercent < 0.2) {
            return 240;
        } else if (currentPercent < 0.25) {
            return 220;
        } else if (currentPercent < 0.3) {
            return 200;
        } else if (currentPercent < 0.4) {
            return 180;
        } else if (currentPercent < 0.5) {
            return 160;
        } else if (currentPercent < 0.6) {
            return 140;
        } else if (currentPercent < 0.7) {
            return 120;
        } else if (currentPercent < 0.8) {
            return 100;
        } else if (currentPercent < 0.9) {
            return 80;
        } else {
            return 60;
        }
    }
 
  
function ieSmoothScroll() {

    if (!isReading || currentPercent <= 0) {
        stopScrolling();
        return;
    }

    var current = getCurrentScroll();
    var max = getMaxScroll();
    var now = new Date().getTime();

    /* ======================================
       🔥 HARD STOP + RESTART AT TOP
    ====================================== */

    if (current <= 1 && lastScrollPos > 1 && !restartingFromTop) {

        restartingFromTop = true;

        stopScrolling();

        setTimeout(function () {

            if (currentPercent > 0) {

                lastScrollTime = new Date().getTime();
                scrollAccumulator = 0;

                startScrolling();
            }

            restartingFromTop = false;

        }, 1000);

        return;
    }

    /* ======================================
       NORMAL SCROLLING
    ====================================== */

    var deltaTime = now - lastScrollTime;
    lastScrollTime = now;

    if (deltaTime > 0 && deltaTime < 200) {

        var speedPerMs = getScrollSpeed() / getIntervalTime();
        scrollAccumulator += speedPerMs * deltaTime;

        if (scrollAccumulator >= 1) {

            var scrollAmount = Math.floor(scrollAccumulator);
            var newPos = current + scrollAmount;

            if (newPos > max) {
                newPos = max;
                scrollAccumulator = 0;
            } else {
                scrollAccumulator -= scrollAmount;
            }

            setScrollPosition(newPos);
        }
    }

    lastScrollPos = current;

    if (isReading && currentPercent > 0) {
        timer = setTimeout(ieSmoothScroll, 16);
    }
}
function modernScroll() {

    if (!isReading || currentPercent <= 0) {
        stopScrolling();
        return;
    }

    var current = getCurrentScroll();
    var max = getMaxScroll();
    var now = Date.now();

    /* ======================================
       🔥 HARD STOP + RESTART AT TOP
    ====================================== */

    if (current <= 1 && lastScrollPos > 1 && !restartingFromTop) {

    restartingFromTop = true;

    stopScrolling();

    setTimeout(function () {

        if (currentPercent > 0) {

            lastScrollTime = Date.now();
            scrollAccumulator = 0;

            startScrolling();
        }

        restartingFromTop = false;

    }, 1000);

    return;
}
    /* ======================================
       NORMAL SCROLLING
    ====================================== */

    if (current < max) {

        var deltaTime = now - lastScrollTime;
        lastScrollTime = now;

        if (deltaTime > 0 && deltaTime < 200) {

            var speedPerMs = getScrollSpeed() / getIntervalTime();
            scrollAccumulator += speedPerMs * deltaTime;

            if (scrollAccumulator >= 1) {

                var scrollAmount = Math.floor(scrollAccumulator);
                var newPos = current + scrollAmount;

                if (newPos > max) {
                    newPos = max;
                    scrollAccumulator = 0;
                } else {
                    scrollAccumulator -= scrollAmount;
                }

                setScrollPosition(newPos);
            }
        }
    }

    lastScrollPos = current;

    if (isReading && currentPercent > 0 && hasRAF) {
        animationFrame = requestAnimationFrame(modernScroll);
    }
}


function controlScrollingByPercent(percent) {
        if (percent > 0) {
            if (!isReading) {
                isReading = true;
                startScrolling();
            }
        } else {
            if (isReading) {
                isReading = false;
                stopScrolling();
            }
        }
    }
    
    function startScrolling() {
        stopScrolling();
        
        lastScrollTime = new Date().getTime();
        scrollAccumulator = 0;
        
        if (isIE6) {
         
            ieSmoothScroll();
        } else if (hasRAF) {
            modernScroll();
        } else {
            ieSmoothScroll(); // For other old IEs
        }
    }
    
    function stopScrolling() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
        scrollAccumulator = 0;
    }
    
    function updateLabel($label, percent) {
        if ($label && $label.length) {
            var p = Math.round(percent * 100);
            
            // For IE6, simplify label updates
            if (isIE6) {
                if (percent <= 0) {
                    $label[0].innerHTML = window.LANG_COMMON.stop + " 0%";
                } else {
                    $label[0].innerHTML = window.LANG_COMMON.speed + " " + p + "%";
                }
                return;
            }
            
            var current = getCurrentScroll();
            var max = getMaxScroll();
            
            if (percent <= 0) {
                $label.html(window.LANG_COMMON.stop + " 0%");
            } else if (current >= max) {
                $label.html(window.LANG_COMMON.speed + " " + p + "%");
            } else {
               $label.html(window.LANG_COMMON.speed + " " + p + "%");
            }
        }
    }
    
    function setSliderPosition($wrap, $track, $thumb, $label, percent) {
        if (!$wrap || !$wrap.length) return;
        
        var wrapWidth = $wrap.width();
        if (wrapWidth <= 0) {
            setTimeout(function() { setSliderPosition($wrap, $track, $thumb, $label, percent); }, 50);
            return;
        }
        
        percent = Math.max(0, Math.min(1, percent));
        
        var oldPercent = currentPercent;
        currentPercent = percent;
        
        var rtl = isRTL();
        var thumbPos = Math.round(percent * (wrapWidth - thumbWidth));
        
        if ($thumb && $thumb.length && $track && $track.length) {
            // Direct style manipulation for IE6 performance
            var thumbStyle = $thumb[0].style;
            var trackStyle = $track[0].style;
            
            if (rtl) {
                thumbStyle.left = 'auto';
                thumbStyle.right = thumbPos + 'px';
                trackStyle.width = Math.round(percent * wrapWidth) + 'px';
                trackStyle.left = 'auto';
                trackStyle.right = '0';
            } else {
                thumbStyle.left = thumbPos + 'px';
                thumbStyle.right = 'auto';
                trackStyle.width = Math.round(percent * wrapWidth) + 'px';
                trackStyle.left = '0';
                trackStyle.right = 'auto';
            }
        }
        
        if (oldPercent !== percent) {
            controlScrollingByPercent(percent);
        }
        
        updateLabel($label, percent);
    }
    
    function isAtEnd() {
        var current = getCurrentScroll();
        var max = getMaxScroll();
        return current >= max;
    }
    
    function getScrollStatus() {
        return {
            isReading: isReading,
            currentPercent: currentPercent,
            isAtEnd: isAtEnd(),
            currentScroll: getCurrentScroll(),
            maxScroll: getMaxScroll()
        };
    }
    
    function getPointerX(e) {
        if (!e) e = window.event;
        var x = 0;
        
        if (e.pageX) x = e.pageX;
        else if (e.clientX) {
            x = e.clientX;
            var scrollLeft = 0;
            if (document.documentElement && document.documentElement.scrollLeft) {
                scrollLeft = document.documentElement.scrollLeft;
            } else if (document.body && document.body.scrollLeft) {
                scrollLeft = document.body.scrollLeft;
            }
            x += scrollLeft;
        }
        
        try {
            if (e.touches && e.touches.length > 0) {
                var touch = e.touches[0];
                x = touch.pageX || touch.clientX || 0;
            } else if (e.changedTouches && e.changedTouches.length > 0) {
                var touch = e.changedTouches[0];
                x = touch.pageX || touch.clientX || 0;
            }
        } catch(err) {}
        
        return x;
    }
    
    function getOffsetLeft(elem) {
        var offset = 0;
        while (elem) {
            offset += elem.offsetLeft || 0;
            elem = elem.offsetParent;
        }
        return offset;
    }
    
    function calculateDragOffset($thumb, e) {
        if (!$thumb || !$thumb.length) return 0;
        
        var thumbElem = $thumb[0];
        var thumbOffsetLeft = getOffsetLeft(thumbElem);
        var mouseX = getPointerX(e);
        
        return mouseX - thumbOffsetLeft;
    }
    
    function updateSliderFromEvent($wrap, $track, $thumb, $label, e) {
        if (!e) e = window.event;
        if (!$wrap || !$wrap.length) return false;
        
        var x = getPointerX(e);
        if (x === 0) return false;
        
        var offset = getOffsetLeft($wrap[0]);
        var wrapWidth = $wrap.width();
        var rtl = isRTL();
        
        var relativeX = (x - dragOffsetX) - offset;
        
        if (relativeX < 0) relativeX = 0;
        if (relativeX > wrapWidth - thumbWidth) relativeX = wrapWidth - thumbWidth;
        
        var percent = rtl ? 1 - (relativeX / (wrapWidth - thumbWidth)) : relativeX / (wrapWidth - thumbWidth);
        setSliderPosition($wrap, $track, $thumb, $label, percent);
        
        return false;
    }
    
    function bindEvents($wrap, $track, $thumb, $label) {
        if (!$thumb || !$thumb.length || !$wrap || !$wrap.length || !$track || !$track.length) {
            setTimeout(function() {
                bindEvents($("#sliderWrap"), $("#sliderTrack"), $("#sliderThumb"), $("#speedLabel"));
            }, 100);
            return;
        }
        
        if ($thumb[0]) {
            if ($thumb[0].attachEvent) {
                $thumb[0].attachEvent("onmousedown", function(e) {
                    if (!e) e = window.event;
                    
                    dragOffsetX = calculateDragOffset($thumb, e);
                    isDragging = true;
                    
                    $thumb[0].onselectstart = function() { return false; };
                    document.onselectstart = function() { return false; };
                    
                    if ($thumb[0].setCapture) {
                        $thumb[0].setCapture();
                    }
                    
                    e.returnValue = false;
                    return false;
                });
                
                $thumb[0].attachEvent("ondragstart", function() { return false; });
            } else {
                $thumb[0].onmousedown = function(e) {
                    if (!e) e = window.event;
                    
                    dragOffsetX = calculateDragOffset($thumb, e);
                    isDragging = true;
                    
                    this.onselectstart = function() { return false; };
                    document.onselectstart = function() { return false; };
                    
                    if (this.setCapture) {
                        this.setCapture(true);
                    }
                    
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                    
                    return false;
                };
                
                $thumb[0].ondragstart = function() { return false; };
            }
        }
        
       
        var hasTouch = false;
        try {
            hasTouch = 'ontouchstart' in window;
        } catch(e) {}
        
        if (hasTouch && $thumb[0]) {
            if ($thumb[0].attachEvent) {
                $thumb[0].attachEvent("ontouchstart", function(e){
                    dragOffsetX = calculateDragOffset($thumb, e);
                    isDragging = true;
                    e.returnValue = false;
                });
                
                document.attachEvent("ontouchmove", function(e){
                    if(!isDragging) return;
                    e.returnValue = false;
                    updateSliderFromEvent($wrap, $track, $thumb, $label, e);
                });
                
                document.attachEvent("ontouchend", function(){ 
                    isDragging = false;
                    dragOffsetX = 0;
                });
            } else {
                $thumb[0].addEventListener("touchstart", function(e){
                    dragOffsetX = calculateDragOffset($thumb, e);
                    isDragging = true;
                    e.preventDefault();
                }, { passive: false });
                
                document.addEventListener("touchmove", function(e){
                    if(!isDragging) return;
                    e.preventDefault();
                    updateSliderFromEvent($wrap, $track, $thumb, $label, e);
                }, { passive: false });
                
                document.addEventListener("touchend", function(){ 
                    isDragging = false;
                    dragOffsetX = 0;
                }, { passive: true });
            }
        }else{
			
			 if (document.attachEvent) {
            document.attachEvent("onmousemove", function(e) {
                if (!isDragging) return true;
                
                if (!e) e = window.event;
                e.returnValue = false;
                
                return updateSliderFromEvent($wrap, $track, $thumb, $label, e);
            });
            
            document.attachEvent("onmouseup", function(e) {
                if (isDragging) {
                    isDragging = false;
                    dragOffsetX = 0;
            
                    if ($thumb[0] && $thumb[0].releaseCapture) {
                        $thumb[0].releaseCapture();
                    }
                    
                    document.onselectstart = null;
                    if ($thumb[0]) $thumb[0].onselectstart = null;
                }
                //return false;
            });
        } else {
            document.onmousemove = function(e) {
                if (!isDragging) return true;
                
                if (!e) e = window.event;
                
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                
                return updateSliderFromEvent($wrap, $track, $thumb, $label, e);
            };
            
            document.onmouseup = function(e) {
                if (isDragging) {
                    isDragging = false;
                    dragOffsetX = 0;
            
                    if ($thumb[0] && $thumb[0].releaseCapture) {
                        $thumb[0].releaseCapture();
                    }
                    
                    document.onselectstart = null;
                    if ($thumb[0]) $thumb[0].onselectstart = null;
                }
                //return false;
            };
        }
        
			
			
		}
        
		
		
		
		
		
		
		
		
		
		
		
		
        if ($wrap[0]) {
            if ($wrap[0].attachEvent) {
                $wrap[0].attachEvent("onclick", function(e) {
                    if (!e) e = window.event;
                    var target = e.srcElement;
                    
                    if (target !== $thumb[0]) {
                        dragOffsetX = thumbWidth / 2;
                        return updateSliderFromEvent($wrap, $track, $thumb, $label, e);
                    }
                    return false;
                });
            } else {
                $wrap[0].onclick = function(e) {
                    if (!e) e = window.event;
                    var target = e.target || e.srcElement;
                    
                    if (target !== $thumb[0]) {
                        dragOffsetX = thumbWidth / 2;
                        return updateSliderFromEvent($wrap, $track, $thumb, $label, e);
                    }
                    return false;
                };
            }
        }
        
        if (window.attachEvent) {
            window.attachEvent("onresize", function() {
                setSliderPosition($wrap, $track, $thumb, $label, currentPercent);
            });
        } else {
            window.addEventListener('resize', function() {
                setSliderPosition($wrap, $track, $thumb, $label, currentPercent);
            });
        }
        
        setTimeout(function() {
            setSliderPosition($wrap, $track, $thumb, $label, 0);
        }, 100);
    }
    
    function init() {
        var $wrap = $("#sliderWrap");
        var $track = $("#sliderTrack");
        var $thumb = $("#sliderThumb");
        var $label = $("#speedLabel");
        
        bindEvents($wrap, $track, $thumb, $label);
        //setupScrollMonitoring();
        
        return {
            setPosition: function(percent) {
                setSliderPosition($wrap, $track, $thumb, $label, percent);
            },
            getPosition: function() {
                return currentPercent;
            },
            isReading: function() {
                return isReading;
            },
            start: function() {
                if (!isReading && currentPercent > 0) {
                    isReading = true;
                    startScrolling();
                }
            },
            stop: function() {
                if (isReading) {
                    isReading = false;
                    stopScrolling();
                }
            },
            getStatus: function() {
                return getScrollStatus();
            }
        };
    }
    
    readerInstance = init();
    
    return {
        setPosition: function(percent) {
            if (readerInstance) {
                readerInstance.setPosition(percent);
            }
        },
        getPosition: function() {
            if (readerInstance) {
                return readerInstance.getPosition();
            }
            return 0;
        },
        isReading: function() {
            if (readerInstance) {
                return readerInstance.isReading();
            }
            return false;
        },
        start: function() {
            if (readerInstance) {
                readerInstance.start();
            }
        },
        stop: function() {
            if (readerInstance) {
                readerInstance.stop();
            }
        },
        getStatus: function() {
            if (readerInstance) {
                return readerInstance.getStatus();
            }
            return { isReading: false, currentPercent: 0, isAtEnd: false, currentScroll: 0, maxScroll: 0 };
        }
    };
    
})(jQuery);

// Create the main function
window.read_scroll = function(percent) {
    if (typeof ScrollReader !== 'undefined') {
        if (typeof percent === 'number') {
            ScrollReader.setPosition(Math.max(0, Math.min(1, percent)));
            return ScrollReader.getPosition();
        } else if (typeof percent === 'string') {
            if (percent === 'status') {
                return ScrollReader.getStatus();
            } else if (percent === 'start') {
                ScrollReader.start();
                return ScrollReader.isReading();
            } else if (percent === 'stop') {
                ScrollReader.stop();
                return !ScrollReader.isReading();
            } else if (percent === 'isreading') {
                return ScrollReader.isReading();
            }
        } else {
            return ScrollReader.getPosition();
        }
    }
    return 0;
};

// Add method aliases to the function (this is what you're missing)
window.read_scroll.isReading = function() {
    if (typeof ScrollReader !== 'undefined') {
        return ScrollReader.isReading();
    }
    return false;
};

window.read_scroll.start = function() {
    if (typeof ScrollReader !== 'undefined') {
        return ScrollReader.start();
    }
};

window.read_scroll.stop = function() {
    if (typeof ScrollReader !== 'undefined') {
        return ScrollReader.stop();
    }
};

window.read_scroll.getPosition = function() {
    if (typeof ScrollReader !== 'undefined') {
        return ScrollReader.getPosition();
    }
    return 0;
};

window.read_scroll.getStatus = function() {
    if (typeof ScrollReader !== 'undefined') {
        return ScrollReader.getStatus();
    }
    return { isReading: false, currentPercent: 0, isAtEnd: false, currentScroll: 0, maxScroll: 0 };
};

window.read_scroll.setPosition = function(percent) {
    if (typeof ScrollReader !== 'undefined') {
        return ScrollReader.setPosition(percent);
    }
};
























  function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
  }



  function sendUrl(url, title,save) {
    sendToParent({
      type: 'URL_UPDATE',
      url: url,
	  save:save,
      title: title || document.title
    });
  }

  // =========================
  // 🔹 SEND ON LOAD
  // =========================
  if (isInIframe()) {
   // sendUrl(window.location.href, document.title);
	
  }

  // =========================
  // 🔹 CLICK HANDLER
  // =========================
  $(document.body).click(function (e) {

    e = e || window.event;

    var $target = $(e.target || e.srcElement);
    var $link = $target.closest ? $target.closest('a') : $target.parents('a').eq(0);

    if (!$link.length) return;

    var link = $link[0];

    // 🚫 ignore .no_copy
	
	
	if ($link.hasClass('item-copy')) return;
    if ($link.hasClass('postBtnCopy')) return;

    if (link.href && link.target !== "_blank") {

      // same link
      /*if (link.href === window.location.href) {

        sendToParent({
          type: 'skipHitidRemoval',
          skipHitidRemoval: true
        });

        return;
      }*/

      var title =  document.title;



	 
      if (isInIframe()) {

        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
        //console.log(link.href);
        sendUrl(link.href, title,false);

        return false;
      }
    }
  });

if (!isInIframe()) {










}
