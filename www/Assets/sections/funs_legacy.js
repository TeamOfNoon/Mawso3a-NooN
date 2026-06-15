

















































function strip_And_Normlize(value) {
	
	hitcount = 0;
	var hh = value;
	var ff = hh;
	//alert(value);	//وَمَا يُلَقَّٮٰهَآ
	//ٰ
	 hh = hh.replace(XRegExp('[^\\s\\p{L}\\p{N}]', 'g'), '');
	
	hh = hh.replace(XRegExp("ٰ", 'gmi'), "").replace(XRegExp("ـٰ", 'gmi'), "ا").replace(XRegExp("ٮٰ", 'gmi'), "ا").replace(XRegExp("[\\p{Mn}\\u0640\\u200C\\u200e\\u06e5]", 'gmi'), '').replace(XRegExp("[\\p{S}\\p{P}\\u06E9\\u06DE{}\"'()\\uFD3F\\uFD3E]", 'gmi'), '').replace(/\s\s+/gmi, ' ').replace(XRegExp("^\\s+|\\s+$", 'gmi'), "").replace(XRegExp("[أاإآٲٳٱ]", 'gmi'), "ا").replace(XRegExp("ة", 'gmi'), "ه").replace(XRegExp("ؤ", 'gmi'), "و").replace(XRegExp("ئ", 'gmi'), "ى").replace(XRegExp("[\u200F]", 'gmi'), "").replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(m) {
		return {
			'٠': '0',
			'١': '1',
			'٢': '2',
			'٣': '3',
			'٤': '4',
			'٥': '5',
			'٦': '6',
			'٧': '7',
			'٨': '8',
			'٩': '9'
		} [m];
	}).replace(/[\ﺀ\ﺁ\ﺂ\ﺃ\ﺄ\ﺅ\ﺆ\ﺇ\ﺈ\ﺉ\ﺊ\ﺋ\ﺌ\ﺍ\ﺎ\ﺏ\ﺐ\ﺑ\ﺒ\ﺓ\ﺔ\ﺕ\ﺖ\ﺗ\ﺘ\ﺙ\ﺚ\ﺛ\ﺜ\ﺝ\ﺞ\ﺟ\ﺠ\ﺡ\ﺢ\ﺣ\ﺤ\ﺥ\ﺦ\ﺧ\ﺨ\ﺩ\ﺪ\ﺫ\ﺬ\ﺭ\ﺮ\ﺯ\ﺰ\ﺱ\ﺲ\ﺳ\ﺴ\ﺵ\ﺶ\ﺷ\ﺸ\ﺹ\ﺺ\ﺻ\ﺼ\ﺽ\ﺾ\ﺿ\ﻀ\ﻁ\ﻂ\ﻃ\ﻄ\ﻅ\ﻆ\ﻇ\ﻈ\ﻉ\ﻊ\ﻋ\ﻌ\ﻍ\ﻎ\ﻏ\ﻐ\ﻑ\ﻒ\ﻓ\ﻔ\ﻕ\ﻖ\ﻗ\ﻘ\ﻙ\ﻚ\ﻛ\ﻜ\ﻝ\ﻞ\ﻟ\ﻠ\ﻡ\ﻢ\ﻣ\ﻤ\ﻥ\ﻦ\ﻧ\ﻨ\ﻱ\ﻲ\ﻳ\ﻴ\ﻩ\ﻪ\ﻫ\ﻬ\ﻭ\ﻮ\ﻯ\ﻰ\ﻵ\ﻶ\ﻷ\ﻸ\ﻹ\ﻺ\ﻻ\ﻼ]/g, function(m) {
		return {
			'ﺀ': 'ء',
			'ﺁ': 'ا',
			'ﺂ': 'ا',
			'ﺃ': 'ا',
			'ﺄ': 'ا',
			'ﺅ': 'و',
			'ﺆ': 'و',
			'ﺇ': 'ا',
			'ﺈ': 'ا',
			'ﺉ': 'ى',
			'ﺊ': 'ى',
			'ﺋ': 'ى',
			'ﺌ': 'ى',
			'ﺍ': 'ا',
			'ﺎ': 'ا',
			'ﺏ': 'ب',
			'ﺐ': 'ب',
			'ﺑ': 'ب',
			'ﺒ': 'ب',
			'ﺓ': 'ه',
			'ﺔ': 'ه',
			'ﺕ': 'ت',
			'ﺖ': 'ت',
			'ﺗ': 'ت',
			'ﺘ': 'ت',
			'ﺙ': 'ث',
			'ﺚ': 'ث',
			'ﺛ': 'ث',
			'ﺜ': 'ث',
			'ﺝ': 'ج',
			'ﺞ': 'ج',
			'ﺟ': 'ج',
			'ﺠ': 'ج',
			'ﺡ': 'ح',
			'ﺢ': 'ح',
			'ﺣ': 'ح',
			'ﺤ': 'ح',
			'ﺥ': 'خ',
			'ﺦ': 'خ',
			'ﺧ': 'خ',
			'ﺨ': 'خ',
			'ﺩ': 'د',
			'ﺪ': 'د',
			'ﺫ': 'ذ',
			'ﺬ': 'ذ',
			'ﺭ': 'ر',
			'ﺮ': 'ر',
			'ﺯ': 'ز',
			'ﺰ': 'ز',
			'ﺱ': 'س',
			'ﺲ': 'س',
			'ﺳ': 'س',
			'ﺴ': 'س',
			'ﺵ': 'ش',
			'ﺶ': 'ش',
			'ﺷ': 'ش',
			'ﺸ': 'ش',
			'ﺹ': 'ص',
			'ﺺ': 'ص',
			'ﺻ': 'ص',
			'ﺼ': 'ص',
			'ﺽ': 'ض',
			'ﺾ': 'ض',
			'ﺿ': 'ض',
			'ﻀ': 'ض',
			'ﻁ': 'ط',
			'ﻂ': 'ط',
			'ﻃ': 'ط',
			'ﻄ': 'ط',
			'ﻅ': 'ظ',
			'ﻆ': 'ظ',
			'ﻇ': 'ظ',
			'ﻈ': 'ظ',
			'ﻉ': 'ع',
			'ﻊ': 'ع',
			'ﻋ': 'ع',
			'ﻌ': 'ع',
			'ﻍ': 'غ',
			'ﻎ': 'غ',
			'ﻏ': 'غ',
			'ﻐ': 'غ',
			'ﻑ': 'ف',
			'ﻒ': 'ف',
			'ﻓ': 'ف',
			'ﻔ': 'ف',
			'ﻕ': 'ق',
			'ﻖ': 'ق',
			'ﻗ': 'ق',
			'ﻘ': 'ق',
			'ﻙ': 'ك',
			'ﻚ': 'ك',
			'ﻛ': 'ك',
			'ﻜ': 'ك',
			'ﻝ': 'ل',
			'ﻞ': 'ل',
			'ﻟ': 'ل',
			'ﻠ': 'ل',
			'ﻡ': 'م',
			'ﻢ': 'م',
			'ﻣ': 'م',
			'ﻤ': 'م',
			'ﻥ': 'ن',
			'ﻦ': 'ن',
			'ﻧ': 'ن',
			'ﻨ': 'ن',
			'ﻱ': 'ي',
			'ﻲ': 'ي',
			'ﻳ': 'ي',
			'ﻴ': 'ي',
			'ﻩ': 'ه',
			'ﻪ': 'ه',
			'ﻫ': 'ه',
			'ﻬ': 'ه',
			'ﻭ': 'و',
			'ﻮ': 'و',
			'ﻯ': 'ى',
			'ﻰ': 'ى',
			'ﻵ': 'لا',
			'ﻶ': 'لا',
			'ﻷ': 'لا',
			'ﻸ': 'لا',
			'ﻹ': 'لا',
			'ﻺ': 'لا',
			'ﻻ': 'لا',
			'ﻼ': 'لا'
		} [m];
	});
	
	return hh = convertToLowercase(hh) ;
	
}























function DragScroll(enable, axes, options){
    
    // Set default axes if not provided
    if(typeof axes === "undefined"){
        axes = "xy";
    }
    
    // Options for momentum/animation (ES3 compatible)
    var opts = options || {};
    var enableMomentum = (opts.momentum !== false);
    var momentumDecay = (typeof opts.momentumDecay !== "undefined") ? opts.momentumDecay : 0.92;
    var momentumMinVel = (typeof opts.momentumMinVel !== "undefined") ? opts.momentumMinVel : 0.5;
    var maxVelocity = (typeof opts.maxVelocity !== "undefined") ? opts.maxVelocity : 2500;
    
    if(typeof DragScroll._init === "undefined"){
        DragScroll._init = false;
        DragScroll._enabled = false;
        DragScroll._momentumActive = false;
        DragScroll._velocityX = 0;
        DragScroll._velocityY = 0;
        DragScroll._lastX = 0;
        DragScroll._lastY = 0;
        DragScroll._lastTime = 0;
        DragScroll._momentumFrame = null;
    }
    
    if(typeof window.DRAG_SCROLL_DRAGGING === "undefined"){
        window.DRAG_SCROLL_DRAGGING = false;
    }
    
    DragScroll._enabled = (enable === true);
    
    // Parse axes parameter (ES3 compatible)
    var enableX = false;
    var enableY = false;
    
    if(axes === "x" || axes === "xy" || axes === "yx"){
        enableX = true;
    }
    if(axes === "y" || axes === "xy" || axes === "yx"){
        enableY = true;
    }
    
    /* DON'T disable selection globally - let form elements work */
    if(DragScroll._enabled){
        // Don't disable selectstart globally anymore
        // document.onselectstart = function(){ return false; };
    }else{
        document.onselectstart = null;
        // Stop momentum if disabled
        if(DragScroll._momentumFrame){
            cancelAnimationFrame(DragScroll._momentumFrame);
            DragScroll._momentumFrame = null;
            DragScroll._momentumActive = false;
        }
        return;
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
        // Only clear if we're actually dragging and not on form elements
        if(window.DRAG_SCROLL_DRAGGING){
            setTimeout(function(){
                if (window.getSelection) {
                    var sel = window.getSelection();
                    if (sel && typeof sel.toString === "function" && sel.toString().length > 0) {
                        sel.removeAllRanges();
                    }
                }
                else if (document.selection) {
                    var range = document.selection.createRange();
                    if (range && range.text && range.text.length > 0) {
                        document.selection.empty();
                    }
                }
            }, 0);
        }
    }
    
    /* =========================
       CREATE BLOCKING OVERLAY
    ========================= */
    function createOverlay(){
        var overlay = document.getElementById("drag-scroll-overlay");
        if(!overlay && document.body){
            overlay = document.createElement("div");
            overlay.id = "drag-scroll-overlay";
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.zIndex = "999999";
            overlay.style.cursor = "move";
            overlay.style.backgroundColor = "transparent";
            document.body.appendChild(overlay);
        }
        return overlay;
    }
    
    function removeOverlay(){
        var overlay = document.getElementById("drag-scroll-overlay");
        if(overlay){
            overlay.parentNode.removeChild(overlay);
        }
    }
    
    /* =========================
       CHECK IF ELEMENT IS FORM ELEMENT
    ========================= */
    function isFormElement(el) {
        while (el && el !== document) {
            // Check for form elements that should NOT be blocked
            if (el.tagName === "SELECT" || 
                el.tagName === "INPUT" || 
                el.tagName === "TEXTAREA" ||
                el.tagName === "BUTTON" ||
                el.tagName === "OPTION" ||
                el.tagName === "OPTGROUP" ||
                el.getAttribute("role") === "combobox" ||
                el.getAttribute("role") === "listbox" ||
                el.contentEditable === "true") {
                return true;
            }
            
            // Check for slider elements
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
       FIND FIRST SCROLLABLE
    ========================= */
    function findScrollable(el, checkHorizontal){
        while(el && el !== document){
            if(checkHorizontal){
                if(el.scrollWidth > el.clientWidth && el.clientWidth > 0){
                    return el;
                }
            }else{
                if(el.scrollHeight > el.clientHeight && el.clientHeight > 0){
                    return el;
                }
            }
            el = el.parentNode;
        }
        return null;
    }
    
    function getScrollRoot(){
        if(document.scrollingElement) return document.scrollingElement;
        if(document.compatMode === "CSS1Compat") return document.documentElement;
        return document.body;
    }
    
    /* =========================
       MOMENTUM SCROLLING ENGINE
    ========================= */
    function startMomentum(velX, velY){
        // Stop any existing momentum
        if(DragScroll._momentumFrame){
            cancelAnimationFrame(DragScroll._momentumFrame);
            DragScroll._momentumFrame = null;
        }
        
        if(!enableMomentum) return;
        if((!enableX || Math.abs(velX) < momentumMinVel) && (!enableY || Math.abs(velY) < momentumMinVel)) return;
        
        DragScroll._momentumActive = true;
        DragScroll._velocityX = velX;
        DragScroll._velocityY = velY;
        
        // Store last scroll positions for each scrollable element (tracking per axis)
        var scrollState = {
            horizontal: {},
            vertical: {}
        };
        
        function applyMomentum(){
            if(!DragScroll._momentumActive) return;
            
            var changed = false;
            var velX = DragScroll._velocityX;
            var velY = DragScroll._velocityY;
            
            // Apply horizontal momentum
            if(enableX && Math.abs(velX) >= momentumMinVel){
                var remainingX = velX;
                var currentHorizontal = DragScroll._activeScrollHorizontal;
                
                // Traverse scrollable chain
                var tempHorizontal = currentHorizontal;
                while(tempHorizontal){
                    if(tempHorizontal.scrollWidth > tempHorizontal.clientWidth){
                        var beforeX = tempHorizontal.scrollLeft;
                        tempHorizontal.scrollLeft -= remainingX;
                        var afterX = tempHorizontal.scrollLeft;
                        var usedX = beforeX - afterX;
                        remainingX -= usedX;
                        if(Math.abs(remainingX) < 0.01) break;
                    }
                    tempHorizontal = findScrollable(tempHorizontal.parentNode, true);
                }
                
                if(Math.abs(remainingX) > 0.01){
                    var root = getScrollRoot();
                    root.scrollLeft -= remainingX;
                }
                
                // Decay velocity
                DragScroll._velocityX = velX * momentumDecay;
                changed = true;
            } else {
                DragScroll._velocityX = 0;
            }
            
            // Apply vertical momentum
            if(enableY && Math.abs(velY) >= momentumMinVel){
                var remainingY = velY;
                var currentVertical = DragScroll._activeScrollVertical;
                
                var tempVertical = currentVertical;
                while(tempVertical){
                    if(tempVertical.scrollHeight > tempVertical.clientHeight){
                        var beforeY = tempVertical.scrollTop;
                        tempVertical.scrollTop -= remainingY;
                        var afterY = tempVertical.scrollTop;
                        var usedY = beforeY - afterY;
                        remainingY -= usedY;
                        if(Math.abs(remainingY) < 0.01) break;
                    }
                    tempVertical = findScrollable(tempVertical.parentNode, false);
                }
                
                if(Math.abs(remainingY) > 0.01){
                    var root = getScrollRoot();
                    root.scrollTop -= remainingY;
                }
                
                DragScroll._velocityY = velY * momentumDecay;
                changed = true;
            } else {
                DragScroll._velocityY = 0;
            }
            
            // Continue or stop
            if(changed && (Math.abs(DragScroll._velocityX) >= momentumMinVel || Math.abs(DragScroll._velocityY) >= momentumMinVel)){
                DragScroll._momentumFrame = requestAnimationFrame(applyMomentum);
            } else {
                DragScroll._momentumActive = false;
                DragScroll._momentumFrame = null;
                DragScroll._velocityX = 0;
                DragScroll._velocityY = 0;
            }
        }
        
        DragScroll._momentumFrame = requestAnimationFrame(applyMomentum);
    }
    
    /* =========================
       STATE VARIABLES
    ========================= */
    var dragging = false;
    var moved = false;
    var startX = 0;
    var startY = 0;
    var lastX = 0;
    var lastY = 0;
    var lastTime = 0;
    var activeScrollVertical = null;
    var activeScrollHorizontal = null;
    
    // Store for momentum
    DragScroll._activeScrollVertical = null;
    DragScroll._activeScrollHorizontal = null;
    
    /* =========================
       MOUSEDOWN
    ========================= */
    function down(e){
        if(!DragScroll._enabled) return;
        
        e = e || window.event;
        var btn = e.which || e.button;
        if(btn != 1) return;
        
        var target = e.target || e.srcElement;
        
        // Stop any ongoing momentum
        if(DragScroll._momentumFrame){
            cancelAnimationFrame(DragScroll._momentumFrame);
            DragScroll._momentumFrame = null;
            DragScroll._momentumActive = false;
            DragScroll._velocityX = 0;
            DragScroll._velocityY = 0;
        }
        
        // IGNORE FORM ELEMENTS AND SLIDERS - let them work normally
        if(isFormElement(target)) return;
        
        // Ignore if clicking on scrollbar
        if(isScrollbarClick(e, target)) return;
        
        // Ignore html and body elements
        if(target === document.documentElement || target === document.body) return;
        
        // Find scrollable elements
        if(enableY){
            activeScrollVertical = findScrollable(target, false);
            if(!activeScrollVertical) activeScrollVertical = getScrollRoot();
        } else {
            activeScrollVertical = null;
        }
        
        if(enableX){
            activeScrollHorizontal = findScrollable(target, true);
            if(!activeScrollHorizontal) activeScrollHorizontal = getScrollRoot();
        } else {
            activeScrollHorizontal = null;
        }
        
        // Store for momentum
        DragScroll._activeScrollVertical = activeScrollVertical;
        DragScroll._activeScrollHorizontal = activeScrollHorizontal;
        
        dragging = true;
        moved = false;
        window.DRAG_SCROLL_DRAGGING = false;
        
        startX = e.clientX;
        startY = e.clientY;
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = Date.now();
        
        // Add dragging class to body
        document.body.classList.add("drag-scrolling");
        document.documentElement.style.cursor = "move";
        document.body.style.cursor = "move";
        
        if(e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }
    
    // Check if click is on scrollbar
    function isScrollbarClick(e, el) {
        if(!el || !e) return false;
        var rect = null;
        if(el.getBoundingClientRect){
            rect = el.getBoundingClientRect();
        } else {
            return false;
        }
        var threshold = 18;
        var style = null;
        if(window.getComputedStyle){
            style = window.getComputedStyle(el);
        } else if(el.currentStyle){
            style = el.currentStyle;
        }
        var overflowX = 'visible';
        var overflowY = 'visible';
        if(style){
            overflowX = style.overflowX || style.overflow || 'visible';
            overflowY = style.overflowY || style.overflow || 'visible';
        }
        var hasVerticalScroll = (overflowY === 'scroll' || overflowY === 'auto') && el.scrollHeight > el.clientHeight;
        var hasHorizontalScroll = (overflowX === 'scroll' || overflowX === 'auto') && el.scrollWidth > el.clientWidth;
        
        var isRTL = false;
        if(el.dir === "rtl") isRTL = true;
        else if(document.dir === "rtl") isRTL = true;
        
        if(hasVerticalScroll){
            if(isRTL){
                if(e.clientX >= rect.left && e.clientX <= rect.left + threshold) return true;
            } else {
                if(e.clientX >= rect.right - threshold && e.clientX <= rect.right) return true;
            }
        }
        if(hasHorizontalScroll){
            if(e.clientY >= rect.bottom - threshold && e.clientY <= rect.bottom) return true;
        }
        return false;
    }
    
    /* =========================
       MOUSEMOVE with velocity tracking
    ========================= */
    function move(e){
        if(!dragging) return;
        if(!DragScroll._enabled) return;
        
        e = e || window.event;
        var now = Date.now();
        var dt = Math.max(1, now - lastTime);
        
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        
        // Calculate velocity (pixels per second)
        var velX = (dx / dt) * 16; // normalize to ~frame time
        var velY = (dy / dt) * 16;
        
        // Cap max velocity
        if(Math.abs(velX) > maxVelocity) velX = (velX > 0 ? maxVelocity : -maxVelocity);
        if(Math.abs(velY) > maxVelocity) velY = (velY > 0 ? maxVelocity : -maxVelocity);
        
        if(Math.abs(e.clientX - startX) > 4 || Math.abs(e.clientY - startY) > 4){
            moved = true;
            window.DRAG_SCROLL_DRAGGING = true;
            createOverlay();
        }
        
        // Handle horizontal scrolling
        if(enableX){
            var remainingX = dx;
            var currentHorizontal = activeScrollHorizontal;
            while(currentHorizontal){
                if(currentHorizontal.scrollWidth > currentHorizontal.clientWidth){
                    var beforeX = currentHorizontal.scrollLeft;
                    currentHorizontal.scrollLeft -= remainingX;
                    var afterX = currentHorizontal.scrollLeft;
                    var usedX = beforeX - afterX;
                    remainingX -= usedX;
                    if(remainingX === 0) break;
                }
                currentHorizontal = findScrollable(currentHorizontal.parentNode, true);
            }
            if(remainingX !== 0){
                var root = getScrollRoot();
                root.scrollLeft -= remainingX;
            }
        }
        
        // Handle vertical scrolling
        if(enableY){
            var remainingY = dy;
            var currentVertical = activeScrollVertical;
            while(currentVertical){
                if(currentVertical.scrollHeight > currentVertical.clientHeight){
                    var beforeY = currentVertical.scrollTop;
                    currentVertical.scrollTop -= remainingY;
                    var afterY = currentVertical.scrollTop;
                    var usedY = beforeY - afterY;
                    remainingY -= usedY;
                    if(remainingY === 0) break;
                }
                currentVertical = findScrollable(currentVertical.parentNode, false);
            }
            if(remainingY !== 0){
                var root = getScrollRoot();
                root.scrollTop -= remainingY;
            }
        }
        
        // Store velocity for momentum
        if(enableMomentum){
            DragScroll._velocityX = velX;
            DragScroll._velocityY = velY;
        }
        
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
        
        if(e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }
    
    /* =========================
       MOUSEUP - start momentum
    ========================= */
    function up(e){
        if(!dragging) return;
        
        dragging = false;
        removeOverlay();
        
        // Start momentum scrolling with captured velocity
        if(enableMomentum && moved){
            startMomentum(DragScroll._velocityX, DragScroll._velocityY);
        }
        
        setTimeout(function(){
            window.DRAG_SCROLL_DRAGGING = false;
            document.body.classList.remove("drag-scrolling");
        }, 50);
        
        document.documentElement.style.cursor = "default";
        document.body.style.cursor = "default";
    }
    
    function isIgnoredButton(el){
        while(el && el !== document){
            if(el.className && typeof el.className === "string"){
                var cls = " " + el.className + " ";
                if(cls.indexOf(" postBtnCopy ") !== -1 ||
                   cls.indexOf(" quote_button ") !== -1 ||
                   cls.indexOf(" panel-minimize ") !== -1 ||
                   cls.indexOf(" quote-con-close ") !== -1 ||
                   cls.indexOf(" quote-copy-all ") !== -1 ||
                   cls.indexOf(" copy_post ") !== -1){
                    return true;
                }
            }
            el = el.parentNode;
        }
        return false;
    }
    
    /* =========================
       GLOBAL CLICK BLOCKER - MODIFIED
    ========================= */
    function globalClickBlocker(e){
        // Only block if we're actually dragging and moved
        if(window.DRAG_SCROLL_DRAGGING === true){
            var target = e.target || e.srcElement;
            // Don't block if it's a form element
            if(!isFormElement(target)){
                stop(e);
                return false;
            }
        }
        return true;
    }
    
    function clickBlock(e){
        if(!DragScroll._enabled) return;
        
        // Only block if we actually dragged (not just clicked)
        if(window.DRAG_SCROLL_DRAGGING){
            var target = e.target || e.srcElement;
            // Don't block form elements
            if(!isFormElement(target)){
                stop(e);
                return;
            }
        }
        
        e = e || window.event;
        var target = e.target || e.srcElement;
        if(isSliderElement(target)) return;
        if(isIgnoredButton(target)) return;
        // Only clear selection if we're dragging
        if(window.DRAG_SCROLL_DRAGGING){
            clearSelection();
        }
    }
    
    // Helper for slider detection (kept for compatibility)
    function isSliderElement(el) {
        return isFormElement(el);
    }
    
    // Capture phase click blocker - modified to not block form elements
    if(document.addEventListener){
        document.addEventListener("click", function(e){
            if(window.DRAG_SCROLL_DRAGGING){
                var target = e.target || e.srcElement;
                if(!isFormElement(target)){
                    stop(e);
                }
            }
        }, true);
    }
    
    // Add event listeners
    add(document, "mousedown", down);
    add(document, "mousemove", move);
    add(document, "mouseup", up);
    add(document, "click", clickBlock);
}
/* ============================================
   USAGE EXAMPLES:
   
   // Enable with momentum (default)
   DragScroll(true, "xy", { momentum: true, momentumDecay: 0.92, momentumMinVel: 0.5 });
   
   // Disable momentum (classic behavior)
   DragScroll(true, "xy", { momentum: false });
   
   // Lighter momentum (slides further)
   DragScroll(true, "xy", { momentumDecay: 0.96, maxVelocity: 3000 });
   
   // Quick stop (higher decay)
   DragScroll(true, "xy", { momentumDecay: 0.85 });
   
   // Vertical only with momentum
   DragScroll(true, "y", { momentum: true });
   
   // Disable drag scrolling
   DragScroll(false);
   
============================================ */


function convertToLowercase(inputString) {
    return inputString.toLowerCase();
}






function getByClass(cls)
{
    var all = document.getElementsByTagName("*");

    for (var i = 0; i < all.length; i++)
    {
        if ((" " + all[i].className + " ").indexOf(" " + cls + " ") > -1)
        {
            return all[i];
        }
    }

    return null;
}






function getParams() {
    var params = {}, hash = window.location.hash.substring(1), parts;
    if (hash) {
        // Remove leading & if exists
        if (hash.charAt(0) === '&') hash = hash.substring(1);
        parts = hash.split('&');
        for (var i = 0; i < parts.length; i++) {
            var kv = parts[i].split('=');
            if (kv[0]) params[kv[0]] = decodeURIComponent(kv[1] || '');
        }
    }
    return params;
}



// =====================================
// SHOW / HIDE NAVIGATION BUTTONS
// =====================================

function applyNavigationButtons(data)
{
	

	if (!data || !data.buttons)
	{
		return;
	}

	// =====================================
	// ELEMENTS
	// =====================================

	var firstWrap =
		document.getElementById("searchfirst");

	var prevWrap =
		document.getElementById("searchprev");

	var nextWrap =
		document.getElementById("searchnext");

	var lastWrap =
		document.getElementById("searchlast");

	var endWrap =
		document.getElementById("wSearchEnd");

	// =====================================
	// SHOW / HIDE
	// =====================================

	if (firstWrap)
	{
		

		firstWrap.parentNode.style.display =
			data.buttons.first
				? ""
				: "none";
	}

	if (prevWrap)
	{
		prevWrap.parentNode.style.display =
			data.buttons.prev
				? ""
				: "none";
	}

	if (nextWrap)
	{
		nextWrap.parentNode.style.display =
			data.buttons.next
				? ""
				: "none";
	}

	if (lastWrap)
	{
		lastWrap.parentNode.style.display =
			data.buttons.last
				? ""
				: "none";
	}

	if (endWrap)
	{
		endWrap.style.display =
			data.buttons.searchEnd
				? ""
				: "none";
	}
}

var lastSearch = null;
var prevRhsearch = getParams().rhsearch; // Store once at start

function onReceive(data,e) {
    var iframe = document.getElementById("resultsFrame");
	var iframe_con = document.getElementById("iframe_con");
  
    if (!data) return;



    // 🔥 مهم جدًا (IE6 + fallback)
    if (typeof data === "string") {
        try { 
            // Try unescaping first
            var unescaped = unescape(data);
            data = JSON.parse(unescaped);
        } catch (e) {
            try {
                data = JSON.parse(data);
            } catch(e2) {}
        }
    }

    if (!data || !data.type) return;



}










function sendToParent(data) {

    if (!window.parent || window.parent === window) {
        return;
    }

    var msg =
        typeof data === "string"
            ? data
            : JSON.stringify(data);

    // =============================================
    // MODERN BROWSERS
    // =============================================

    if (window.postMessage) {

        window.parent.postMessage(
            msg,
            "*"
        );
    }

    // =============================================
    // IE6 / IE7
    // =============================================

    else {

        jQuery.pm = jQuery.pm || {};

        jQuery.pm.poll_time = 50;

        jQuery.pm.iframe_url = "postmessage.htm";

        if (
            window.jQuery &&
            $.postMessage
        ) {

            $.postMessage(
                msg,
                "*",
                window.parent
            );
        }

    }
}



function sendToChild(data,iframe) {


    if (!iframe || !iframe.contentWindow) {
        return;
    }

    var msg =
        typeof data === "string"
            ? data
            : JSON.stringify(data);

    // =============================================
    // MODERN BROWSERS
    // =============================================

    if (window.postMessage) {

        iframe.contentWindow.postMessage(
            msg,
            "*"
        );
    }

    // =============================================
    // old
    // =============================================

    else {

        jQuery.pm = jQuery.pm || {};

        jQuery.pm.poll_time = 50;

        jQuery.pm.iframe_url = "postmessage.htm";

        if (
            window.jQuery &&
            $.postMessage
        ) {

            $.postMessage(
                msg,
                "*",
                iframe.contentWindow
            );
        }

    }
}











