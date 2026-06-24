/* =========================================
   GLOBAL MONITOR ENGINE (ES6)
========================================= */

window.Global_FUN = true;


const GLOBAL_MONITOR = (() => {

    let callbacks = [];
    let intervalId = null;
    let delay = 250;   // default speed

    const run = () => {
        callbacks.forEach(fn => {
            try {
                fn();
            } catch (e) {
                // silent
            }
        });
    };

    const start = () => {
        if (!intervalId) {
            intervalId = setInterval(run, delay);
        }
    };

    const stopIfEmpty = () => {
        if (callbacks.length === 0 && intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    return {

        add(fn) {
            if (typeof fn !== "function") return;

            // prevent duplicate
            if (callbacks.includes(fn)) return;

            callbacks.push(fn);
            start();
        },

        remove(fn) {
            callbacks = callbacks.filter(cb => cb !== fn);
            stopIfEmpty();
        },

        clearAll() {
            callbacks = [];
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        },

        setDelay(ms) {
            if (typeof ms !== "number" || ms <= 0) return;

            delay = ms;

            if (intervalId) {
                clearInterval(intervalId);
                intervalId = setInterval(run, delay);
            }
        }

    };

})();
		

// Get all URL parameters
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

function setParams(updates, silent) {
    var params = {};
    var hash = window.location.hash;
    var hashContent = hash ? hash.substring(1) : '';

    // =========================
    // 🔹 PARSE CURRENT HASH
    // =========================
    if (hashContent) {
        if (hashContent.charAt(0) === '&') {
            hashContent = hashContent.substring(1);
        }

        var pairs = hashContent.split('&');

        for (var i = 0; i < pairs.length; i++) {
            if (!pairs[i]) continue;

            var eq = pairs[i].indexOf('=');

            if (eq !== -1) {
                var key = pairs[i].substring(0, eq);
                var val = pairs[i].substring(eq + 1);

                try {
                    params[key] = decodeURIComponent(val);
                } catch (e) {
                    params[key] = val;
                }
            } else {
                params[pairs[i]] = '';
            }
        }
    }

    // =========================
    // 🔹 APPLY UPDATES
    // =========================
    for (var key in updates) {
        if (!updates.hasOwnProperty(key)) continue;

        var val = updates[key];

        // ✅ REMOVE PARAM
        if (val === null || val === undefined || val === '') {
            delete params[key];
        } else {
            params[key] = val;
        }
    }

    // =========================
    // 🔹 BUILD NEW HASH
    // =========================
    var newPairs = [];

    for (var key in params) {
        if (!params.hasOwnProperty(key)) continue;

        var val = params[key];

        // ✅ SKIP EMPTY / INVALID
        if (val === null || val === undefined || val === '') continue;

        newPairs.push(key + '=' + encodeURIComponent(val));
    }

    var newHash = newPairs.length ? '#&' + newPairs.join('&') : '#';

    // =========================
    // 🔹 APPLY HASH
    // =========================
    var base = window.location.href.split('#')[0];

    if (silent) {
        window.location.replace(base + newHash); // no history
    } else {
        window.location.hash = newHash; // normal
    }
}



const detectDesktop = () => {

    let isDesktop = false;
    let isTouch = false;

    // width check
    if (screen.width >= 1024) {
        isDesktop = true;
    }

    // touch check
    try {
        if ('ontouchstart' in window) {
            isTouch = true;
        }
    } catch (e) {}

    return (isDesktop && !isTouch);
};



const initSelectionBlocker = (config = {}) => {

    const allowed = typeof config.allowed === "string"
        ? [config.allowed]
        : (config.allowed || []);

    const namespace = config.namespace || ("selBlock" + Date.now());

    if (!document._selBlockers) {
        document._selBlockers = {};
    }

    /* remove previous */
    if (document._selBlockers[namespace]) {
        document.removeEventListener("selectstart", document._selBlockers[namespace]);
        document.removeEventListener("dragstart", document._selBlockers[namespace]);
    }

    /* =========================
       selector matcher
    ========================= */

    const matchesSelector = (el, selector) => {

        if (!el || el.nodeType !== 1) return false;

        const fn =
            el.matches ||
            el.matchesSelector ||
            el.msMatchesSelector ||
            el.webkitMatchesSelector ||
            el.mozMatchesSelector;

        if (fn) {
            try {
                return fn.call(el, selector);
            } catch (e) {}
        }

        /* fallback */
        if (selector.startsWith(".")) {
            const cls = selector.slice(1);
            return (" " + el.className + " ").includes(" " + cls + " ");
        }

        if (selector.startsWith("#")) {
            return el.id === selector.slice(1);
        }

        return el.tagName &&
               el.tagName.toLowerCase() === selector.toLowerCase();
    };

    const isAllowed = (el) => {

        while (el && el !== document) {

            for (const selector of allowed) {
                if (matchesSelector(el, selector)) {
                    return true;
                }
            }

            el = el.parentNode;
        }

        return false;
    };

    /* =========================
       main handler
    ========================= */

    const handler = (e) => {

        let el = e.target || e.srcElement;

        /* text node fix */
        if (el && el.nodeType === 3) {
            el = el.parentNode;
        }

        if (isAllowed(el)) return true;

        e.preventDefault?.();
        e.returnValue = false;

        return false;
    };

    document.addEventListener("selectstart", handler);
    document.addEventListener("dragstart", handler);

    document._selBlockers[namespace] = handler;

    return {
        stop: () => {
            document.removeEventListener("selectstart", handler);
            document.removeEventListener("dragstart", handler);
            delete document._selBlockers[namespace];
        }
    };
};
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

    const temp = document.createElement("div");
    temp.innerHTML = htmlString;

    // احذف كل div
    const divs = temp.querySelectorAll("div,br");
    divs.forEach(d => {
        const parent = d.parentNode;
        while (d.firstChild) {
            parent.insertBefore(d.firstChild, d);
        }
        parent.removeChild(d);
    });

    return temp.innerHTML;
}
function buildQuoteHTML() {

    /* ===============================
       1️⃣ الحصول على HTML التحديد
    =============================== */

    const selectedHTML = getSavedSelectionHTML();
    if (!selectedHTML) return "";

    /* ===============================
       2️⃣ إزالة itemGroup من التحديد
    =============================== */

    const temp = document.createElement("div");
    temp.innerHTML = selectedHTML;

    temp.querySelectorAll(".itemGroup").forEach(el => el.remove());

    let cleanMainHTML = temp.innerHTML;

    /* ===============================
       3️⃣ تنظيف HTML
    =============================== */

    const container = document.createElement("div");
    container.innerHTML = cleanMainHTML;

    getDef(container, "+");
    getDef(container, "-");

    // إزالة font
    container.querySelectorAll("font").forEach(el => {
        el.replaceWith(...el.childNodes);
    });

    // إزالة a
    container.querySelectorAll("a").forEach(el => {
        el.replaceWith(...el.childNodes);
    });

    // إزالة style من span
    container.querySelectorAll("span").forEach(el => {
        el.removeAttribute("style");
    });

    cleanMainHTML = container.innerHTML;

    /* ===============================
       4️⃣ جلب itemGroup من نفس البوست فقط
    =============================== */

    let groupsHTML = "";
    let node = null;

    const sel = window.getSelection?.();
    if (sel && sel.rangeCount > 0) {
        node = sel.getRangeAt(0).startContainer;
    }

    if (!node) {
        return `<div>${cleanMainHTML}</div>`;
    }

    if (node.nodeType === 3) {
        node = node.parentNode;
    }

    // 🔥 أقرب .postBody
    const postBody = node.closest?.(".postBody");

    if (postBody) {
        postBody.querySelectorAll(".itemGroup").forEach(el => {
            groupsHTML += el.outerHTML;
        });
    }

    /* ===============================
       5️⃣ بناء HTML النهائي
    =============================== */

    return `<div>${cleanMainHTML}</div>${groupsHTML}`;
}

/* =====================================================
   GET SAVED TEXT (RESTORES SELECTION)
===================================================== */
const getSavedSelectionHTML = () => {

    /* ===== MODERN ===== */
    if (window.SAVED_MODERN_RANGE) {
        try {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(SAVED_MODERN_RANGE);

            const container = document.createElement("div");
            container.appendChild(SAVED_MODERN_RANGE.cloneContents());

            return container.innerHTML;

        } catch (err) {
            return "";
        }
    }

    /* ===== IE6–8 ===== */
    if (window.SAVED_IE_RANGE) {
        try {
            SAVED_IE_RANGE.select();
            return SAVED_IE_RANGE.htmlText;
        } catch (err) {
            return "";
        }
    }

    return "";
};


const getDef = (elem, dir) => {

    if (!elem) return;

    const isEmptyText = node =>
        node.nodeType === 3 &&
        node.nodeValue.trim() === "";

    const isZoom = node =>
        node.nodeType === 1 &&
        node.classList &&
        node.classList.contains("zoom");

    const isBr = node =>
        node.nodeType === 1 &&
        node.tagName === "BR";

    const cleanBottom = node => {

        while (node.lastChild) {

            const child = node.lastChild;

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
    };

    const cleanTop = node => {

        while (node.firstChild) {

            const child = node.firstChild;

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
    };

    if (dir === "+") cleanTop(elem);
    if (dir === "-") cleanBottom(elem);
};



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
	
/* =========================================
   DATE FORMAT (ORIGINAL LOGIC) – ES6
========================================= */

const formatDate = (dateline) => {

    const d = new Date(dateline * 1000);

    const saudiOffset = 3;
    const localOffset = -d.getTimezoneOffset() / 60;

    d.setHours(d.getHours() + (saudiOffset - localOffset));

    const pad = (n) => (n < 10 ? "0" + n : n);

    const day   = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year  = d.getFullYear();

    const hours24 = d.getHours();
    const ampm = (hours24 >= 12) ? "PM" : "AM";

    let hours12 = hours24 % 12;
    if (hours12 === 0) hours12 = 12;

    const minutes = pad(d.getMinutes());

    return (
        day + "-" + month + "-" + year +
        " - " + pad(hours12) + ":" + minutes + " " + ampm
    );
};



/* =========================================
   GET FORUM TYPE FROM PATH – ES6
========================================= */

const getForumTypeFromPath = () => {

    const path = window.location.pathname;

    if (path.indexOf("forum_mn") !== -1) return "mn";
    if (path.indexOf("forum_vb") !== -1) return "vb";

    return "";
};






/* =====================================================
   GET POST ID FROM HASH
===================================================== */
function getPostIdFromHash() {
  if (!location.hash) return null;
  const m = location.hash.match(/^#post_(\d+)$/);
  return m ? m[1] : null;
}



function enableDragScroll(selector) {

    const wraps = document.querySelectorAll(selector);
    if (!wraps.length) return;

    wraps.forEach(wrap => {

        let down = false;
        let moved = false;
        let startX = 0;
        let startScroll = 0;

        wrap._dragMoved = false;

        /* ===== MOUSE DOWN ===== */
        wrap.addEventListener("mousedown", function (e) {

            const rect = wrap.getBoundingClientRect();

            const offsetY = e.clientY - rect.top;

            /* scrollbar area */
            if (offsetY > wrap.clientHeight) return;

            down = true;
            moved = false;
            wrap._dragMoved = false;

            startX = e.clientX;
            startScroll = wrap.scrollLeft;

            wrap.style.cursor = "move";

            /* prevent selection while dragging */
            document.body.style.userSelect = "none";

            e.preventDefault();
        });

        /* ===== MOUSE MOVE ===== */
        document.addEventListener("mousemove", function (e) {

            if (!down) return;

            const dx = e.clientX - startX;

            if (dx > 3 || dx < -3) {
                moved = true;
                wrap._dragMoved = true;
            }

            wrap.scrollLeft = startScroll - dx;
        });

        /* ===== MOUSE UP ===== */
        document.addEventListener("mouseup", function () {

            if (!down) return;

            down = false;
            wrap.style.cursor = "default";

            document.body.style.userSelect = "";
        });

        /* ===== prevent link open after drag ===== */
        wrap.addEventListener("click", function (e) {

            const a = e.target.closest("a");
            if (!a) return;

            if (wrap._dragMoved) {

                e.preventDefault();
                e.stopPropagation();

                wrap._dragMoved = false;
            }

        }, true); // capture → safer
    });
}


function scrollCurrentItem(barSelector, currentSelector){

  const bars = document.querySelectorAll(barSelector);
  const currents = document.querySelectorAll(currentSelector);

  bars.forEach(function(wrap){

    let cur = null;

    for (let i = 0; i < currents.length; i++) {
      if (wrap.contains(currents[i])) {
        cur = currents[i];
        break;
      }
    }

    if (!cur) return;

    if (cur.offsetParent === null) return;

    let wrapRect, curRect;

    try{
      wrapRect = wrap.getBoundingClientRect();
      curRect  = cur.getBoundingClientRect();
    }catch(e){
      wrapRect = { left: wrap.offsetLeft };
      curRect  = { left: cur.offsetLeft };
    }

    const wrapWidth = wrap.offsetWidth;
    const curWidth  = cur.offsetWidth;

    const offset =
      (curRect.left - wrapRect.left)
      - (wrapWidth / 2)
      + (curWidth / 2);

    wrap.scrollLeft = wrap.scrollLeft + offset;

  });

}



function DragScroll(enable = false) {

    /* =========================
       STATIC STORAGE
    ========================= */
    if (typeof DragScroll._init === "undefined") {
        DragScroll._init = false;
        DragScroll._enabled = false;
    }

    if (typeof window.DRAG_SCROLL_DRAGGING === "undefined") {
        window.DRAG_SCROLL_DRAGGING = false;
    }

    DragScroll._enabled = enable === true;

    /* 🔥 FULL HARD DISABLE SELECTION */
    document.onselectstart = DragScroll._enabled
        ? () => false
        : null;

    if (DragScroll._init) return;
    DragScroll._init = true;

    /* =========================
       HELPERS
    ========================= */

    const add = (el, type, fn) => {
        if (!el) return;
        el.addEventListener(type, fn, false);
    };

    const stop = e => {
        if (!e) return;
        e.preventDefault();
        e.stopPropagation();
    };

    const clearSelection = () => {
        setTimeout(() => {
            const sel = window.getSelection?.();
            if (sel && sel.rangeCount && !sel.isCollapsed) {
                sel.removeAllRanges();
            }
			
			document.onselectstart = function(){ return false; };
			
        }, 0);
    };

    const findScrollable = el => {
        while (el && el !== document) {
            if (el.scrollHeight > el.clientHeight && el.clientHeight > 0) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    };

    const getScrollRoot = () =>
        document.scrollingElement ||
        (document.compatMode === "CSS1Compat"
            ? document.documentElement
            : document.body);

    /* =========================
       STATE
    ========================= */

    let dragging = false;
    let moved = false;
    let startY = 0;
    let lastY = 0;
    let activeScroll = null;

    /* =========================
       MOUSEDOWN
    ========================= */

    const down = e => {

        if (!DragScroll._enabled) return;
        if (e.button !== 0) return;

        const target = e.target;

        if (target === document.documentElement ||
            target === document.body) {
            return;
        }

        activeScroll = findScrollable(target) || getScrollRoot();

        dragging = true;
        moved = false;
        window.DRAG_SCROLL_DRAGGING = false;

        startY = lastY = e.clientY;

        document.documentElement.style.cursor = "move";
        document.body.style.cursor = "move";

        e.preventDefault();
    };

    /* =========================
       MOUSEMOVE
    ========================= */

    const move = e => {

        if (!dragging || !DragScroll._enabled) return;

        const dy = e.clientY - lastY;

        if (Math.abs(e.clientY - startY) > 4) {
            moved = true;
            window.DRAG_SCROLL_DRAGGING = true;
        }

        lastY = e.clientY;

        let remaining = dy;
        let current = activeScroll;

        while (current) {

            if (current.scrollHeight > current.clientHeight) {

                const before = current.scrollTop;
                current.scrollTop -= remaining;
                const after = current.scrollTop;

                const used = before - after;
                remaining -= used;

                if (remaining === 0) break;
            }

            current = findScrollable(current.parentNode);
        }

        if (remaining !== 0) {
            getScrollRoot().scrollTop -= remaining;
        }

        e.preventDefault();
    };

    /* =========================
       MOUSEUP
    ========================= */

    const up = () => {

        if (!dragging) return;

        dragging = false;

        document.documentElement.style.cursor = "default";
        document.body.style.cursor = "default";
    };

    /* =========================
       IGNORE BUTTONS
    ========================= */

    const isIgnoredButton = el => {

        while (el && el !== document) {

            if (el.classList) {
                if (
                    el.classList.contains("postBtnCopy") ||
                    el.classList.contains("quote_button") ||
                    el.classList.contains("panel-minimize") ||
                    el.classList.contains("quote-con-close") ||
                    el.classList.contains("quote-copy-all")
                ) {
                    return true;
                }
            }

            el = el.parentNode;
        }

        return false;
    };

    /* =========================
       CLICK BLOCK
    ========================= */

    const clickBlock = e => {

        if (!DragScroll._enabled) return;

        if (isIgnoredButton(e.target)) return;

        clearSelection();

        if (window.DRAG_SCROLL_DRAGGING) {

            stop(e);

            setTimeout(() => {
                window.DRAG_SCROLL_DRAGGING = false;
            }, 0);
        }
    };

    /* =========================
       BIND EVENTS
    ========================= */

    add(document, "mousedown", down);
    add(document, "mousemove", move);
    add(document, "mouseup", up);
    add(document, "click", clickBlock);
}
















const toggleDragScroll = () => {

    if (typeof DragScroll !== "undefined") {

        const isEnabled = DragScroll._enabled === true;

        // toggle state
        DragScroll(!isEnabled);

        const icons = document.querySelectorAll('.drag_button i');

        icons.forEach(icon => {

            if (DragScroll._enabled) {

                icon.classList.remove('icon-hand-paper-o');
                icon.classList.add('icon-hand-grab-o');
                icon.innerHTML = '';

            } else {

                icon.classList.remove('icon-hand-grab-o');
                icon.classList.add('icon-hand-paper-o');
                icon.innerHTML = '';
            }

        });

        return !isEnabled;
    }

    return false;
};





const toggle_drag = () => {

    const buttons = document.querySelectorAll('.drag_button');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDragScroll();
        });
    });

};










function scrollCurrentItem(barSelector, currentSelector) {

    const bars = document.querySelectorAll(barSelector);
    const currents = document.querySelectorAll(currentSelector);

    if (!bars.length || !currents.length) return;

    bars.forEach(function (wrap) {

        let cur = null;

        /* find first current element inside this wrap */
        for (let i = 0; i < currents.length; i++) {
            if (wrap.contains(currents[i])) {
                cur = currents[i];
                break;
            }
        }

        if (!cur) return;

        /* hidden */
        if (cur.offsetParent === null) return;

        let wrapRect, curRect;

        try {
            wrapRect = wrap.getBoundingClientRect();
            curRect  = cur.getBoundingClientRect();
        } catch (e) {
            wrapRect = { left: wrap.offsetLeft };
            curRect  = { left: cur.offsetLeft };
        }

        const wrapWidth = wrap.offsetWidth;
        const curWidth  = cur.offsetWidth;

        const offset =
            (curRect.left - wrapRect.left) -
            (wrapWidth / 2) +
            (curWidth / 2);

        wrap.scrollLeft = wrap.scrollLeft + offset;
    });
}

/* generate simple random code (ES6) */
const genRandomCode = (len) => {

    let s = "";
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    for (let i = 0; i < len; i++) {
        s += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return s;
};

const forceOverlayResize = () => {

    const el = document.querySelector(".post-con-info");
    if (!el) return;

    /* force reflow (IE6 trick kept as-is) */
    el.style.display = "none";
    void el.offsetHeight;   // force reflow
    el.style.display = "block";

    /* extra IE6 zoom toggle */
    el.style.zoom = el.style.zoom === "1" ? "1.001" : "1";
};


const renderPostConHTML = (postid, postcount) => {

    if (!window.POST_TEMPLATES?.postConHTML) {
        return "";
    }

    return window.POST_TEMPLATES.postConHTML
        .replace(/{{postid}}/g, postid)
        .replace(/{{postcount}}/g, postcount);
};
















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
            el.scrollIntoView(true);
        } catch (e) {}

        if ((" " + el.className + " ").indexOf(" hash-hit ") === -1) {
            el.className += " hash-hit";
        }

    })();
}

const setupBackForumButton = () => {
    document.querySelectorAll(".backBtn").forEach(btn => 
        btn.setAttribute("href", "../../index.php.htm")
    );
};

const setupBackThreadButton = () => {
    const type = getForumTypeFromPath();
    if (type) {
        const targetUrl = `./forum_${type}${THREAD.forum_id}.html`;
        document.querySelectorAll(".backBtn").forEach(btn => 
            btn.setAttribute("href", targetUrl)
        );
    }
};

const setupBackPostButton = () => {
    if (window.RAW_JSON?.threadid) {
        const targetUrl = `./thread_${window.RAW_JSON.threadid}.html`;
        document.querySelectorAll(".backBtn").forEach(btn => 
            btn.setAttribute("href", targetUrl)
        );
    }
};

const setupUpForumButton = () => {
    const targetUrl = `../../index.php.htm#${getForumBaseName()}`;
    document.querySelectorAll(".upBtn").forEach(btn => 
        btn.setAttribute("href", targetUrl)
    );
};

const setupUpThreadButton = () => {
    const upLink = window.THREAD?.thread_up_link_desc || window.THREAD?.thread_up_link_asc;
    if (upLink) {
        document.querySelectorAll(".upBtn").forEach(btn => 
            btn.setAttribute("href", upLink)
        );
    }
};

const setupUpPostButton = () => {
    if (window.RAW_JSON?.up_link) {
        document.querySelectorAll(".upBtn").forEach(btn => 
            btn.setAttribute("href", window.RAW_JSON.up_link)
        );
    }
};



/* =====================================================
   CLEAR OLD MARKS
===================================================== */
function clearPostMarks() {

    var list1 = document.getElementsByClassName("imamCurrent");
    var list2 = document.getElementsByClassName("hash-hit");

    var i;

    /* لأن getElementsByClassName حيّة (live),
       نزيل دائمًا أول عنصر */
    while (list1.length) {
        list1[0].className =
            (" " + list1[0].className + " ")
                .replace(" imamCurrent ", " ")
                .replace(/^\s+|\s+$/g, "");
    }

    while (list2.length) {
        list2[0].className =
            (" " + list2[0].className + " ")
                .replace(" hash-hit ", " ")
                .replace(/^\s+|\s+$/g, "");
    }
}























const toggleMoreMenu = (selector) => {

    if (typeof selector !== "string") return;

    document.addEventListener("click", (e) => {

        const btn = e.target.closest(selector);

        /* ===== Click on button ===== */
        if (btn) {

            e.preventDefault();
            e.stopImmediatePropagation();

            const wrapper = btn.closest(".menu-wrapper");
            if (!wrapper) return;

            const isOpen = wrapper.classList.contains("open");

            // close all
            document.querySelectorAll(".menu-wrapper.open")
                .forEach(el => el.classList.remove("open"));

            if (!isOpen) {
                wrapper.classList.add("open");
            }

            return;
        }

        /* ===== Click outside ===== */
        if (!e.target.closest(".menu-wrapper")) {
            document.querySelectorAll(".menu-wrapper.open")
                .forEach(el => el.classList.remove("open"));
        }

    }, { capture: true });
};






function handleItemBoxToggle(selector) {

    // إزالة أي listener سابق
    document.removeEventListener("click", window.__itemToggleHandler, true);

    const handler = function (e) {

        const trigger = e.target.closest(selector);
        if (!trigger) return;

        if (window.DRAG_SCROLL_DRAGGING) {
return false;
}

        /* 🔥 stop event completely */
        e.preventDefault();
        e.stopPropagation();

        /* ---------------------------------
           get real .item-title
        --------------------------------- */

        const title = trigger.closest(".item-title");
        if (!title) return;

        const box = title.parentElement;
        if (!box || !box.classList.contains("item-box")) return;

        const type = box.getAttribute("data-type");
        if (!type) return;

        const body = box.querySelector(":scope > .item-body");
        if (!body) return;

        const hide = !body.classList.contains("fake_hide");

        const all = document.querySelectorAll(`.item-box[data-type="${type}"]`);

        all.forEach(itemBox => {

            const isNoInfo = itemBox.closest(".no_info") !== null;

            const b = itemBox.querySelector(":scope > .item-body");
            const s = itemBox.querySelector(":scope > .item-title .toggle-sign");

            const parent = itemBox.parentElement;
            const brs = parent
                ? parent.querySelectorAll(`br.${type}`)
                : [];

            if (!b) return;

            if (hide) {

                b.classList.add("fake_hide");

                if (!isNoInfo) {
                    itemBox.classList.add("no_copy");
                    brs.forEach(br => {
                        br.classList.add("no_copy");
                    });
                }

                if (s) s.innerHTML = "[+]";

            } else {

                b.classList.remove("fake_hide");

                if (!isNoInfo) {
                    itemBox.classList.remove("no_copy");
                    brs.forEach(br => {
                        br.classList.remove("no_copy");
                    });
                }

                if (s) s.innerHTML = "[-]";
            }

        });

        scrollTopThenBack();

        /* scroll into view */
        setTimeout(() => {
            box.scrollIntoView?.({ block: "start" });
        }, 100);
    };

    window.__itemToggleHandler = handler;

    document.addEventListener("click", handler, true);
}











/* ===========================================
   GENERAL – select element text
   Modern (pure ES6)
=========================================== */
const selectTextGeneral = (el) => {

    if (!el) return false;

    if (!window.getSelection || !document.createRange) return false;

    const sel = window.getSelection();
    sel.removeAllRanges();

    const range = document.createRange();
    range.selectNodeContents(el);
    sel.addRange(range);

    return true;
};


/* ===========================================
   GENERAL – copy current selection
   Modern (pure ES6)
=========================================== */
const copySelectedGeneral = () => {

    if (!document.execCommand) return false;

    try {
        return document.execCommand("copy");
    } catch (e) {
        return false;
    }
};


/* ===========================================
   SCROLL TO ELEMENT
   Modern (pure ES6)
=========================================== */
const scrollToElementIE = (el) => {

    if (!el) return;

    let y = 0;
    let n = el;

    while (n) {
        y += n.offsetTop || 0;
        n = n.offsetParent;
    }

    y -= 40;
    if (y < 0) y = 0;

    window.scrollTo(0, y);
};




/* =====================================================
   GET POST ID FROM HASH
===================================================== */
function getPostIdFromHash() {
    if (!location.hash) return null;

    const m = location.hash.match(/^#post_(\d+)$/);
    return m ? m[1] : null;
}




function initImamBarHandler() {

    document.addEventListener("click", function (e) {

        var link = e.target.closest(".imam-bar a");
        if (!link) return;

        var bar = link.closest(".imam-bar");

        /* ==============================
           drag scroll protection
        ============================== */
        if (bar && bar._dragMoved) return;

        var href = link.getAttribute("href");
        if (!href) return;

        var idx = href.indexOf("#");
        if (idx === -1) return;

        var linkPage = href.substring(0, idx);
        var hash     = href.substring(idx);

        var curPage = location.href.split("#")[0];

        /* =================================================
           نفس الصفحة
        ================================================= */
        if (linkPage === "" || linkPage === curPage) {

            e.preventDefault();
            e.stopPropagation();

            location.hash = hash;

            var pid = (function () {
                var h = location.hash;
                if (!h) return null;
                var m = h.match(/\d+/);
                return m ? m[0] : null;
            })();

            if (typeof clearPostMarks === "function") clearPostMarks();
            if (typeof fixHashJump === "function") fixHashJump();

            if (pid) {

                var postEl = document.getElementById("post_" + pid);
                var linkEl = document.getElementById("post-" + pid);

                if (postEl) postEl.classList.add("hash-hit");
                if (linkEl) linkEl.classList.add("imamCurrent");
            }

            if (typeof scrollCurrentItem === "function") {
                scrollCurrentItem(".pageNums", ".pageNums a.active");
                scrollCurrentItem(".imam-bar", ".imam-bar a.imamCurrent");
            }
        }

    }, true);
}



/* ===========================================
   ITEM BOX TOGGLE
   ES6 – delegated router style
=========================================== */
const initItemBoxToggle = () => {

    if (initItemBoxToggle.__bound) return;
    initItemBoxToggle.__bound = true;

    document.addEventListener("click", (e) => {

        const title = e.target.closest(".item-box > .item-title");
        if (!title) return;

        const box = title.closest(".item-box");
        if (!box) return;

        const type = box.dataset.type;
        if (!type) return;

        const all = document.querySelectorAll(
            `.item-box[data-type="${type}"]`
        );

        const body = box.querySelector(":scope > .item-body");
        if (!body) return;

        const isVisible = body.offsetParent !== null;

        all.forEach(item => {

            const b = item.querySelector(":scope > .item-body");
            const s = item.querySelector(":scope > .item-title .toggle-sign");

            if (!b) return;

            if (isVisible) {
                b.style.display = "none";
                s?.replaceChildren(document.createTextNode("[+]"));
            } else {
                b.style.display = "";
                s?.replaceChildren(document.createTextNode("[-]"));
            }

        });

        requestAnimationFrame(() => {
            box.scrollIntoView({ block: "start" });
        });

    });
};

function removeDiacritics(text = "") {
    return text.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");
}





const getStringBetween = (string) => {

    // Strip HTML first
    if (string) {
        string = string.replace(/<[^>]+>/g, "");
    }

    if (!string) return false;

    // More flexible imam pattern
    const imam = 'ال[إاأ]مام.{0,50}اليماني';

    // Better separator pattern
    const slash = '[ـ_]{4,}|(?:\\n\\s*){2,}';

    const pattern = new RegExp(`(${imam})([\\s\\S]*?)(?:(${slash})|$)`, 'i');

    const match = string.match(pattern);

    if (match) {

        const extractedString = match[2] || match[0];

        // ================= PATTERNS =================

        const patternHigri1 = /(\d{1,2}\s*[-–]\s*[^\d\-–]{2,20}?\s*[-–]\s*\d{3,4}\s*[هـه])/;
        const patternHigri2 = /(\d{1,2}\s*[-–]\s*\d{1,2}\s*[-–]\s*\d{3,4}\s*[هـه])/;

        const patternMeladi = /(\d{1,2}\s*[-–]\s*\d{1,2}\s*[-–]\s*\d{4}\s*[مـ])/;

        const patternTime = /(\d{1,2}\s*:\s*\d{1,2}[^\n]*)/;

        const patternNote = /\(([^)]+)\)/;

        // ================= MATCH =================

        const resultH = extractedString.match(patternHigri1) || extractedString.match(patternHigri2);
        const resultM = extractedString.match(patternMeladi);
        const resultT = extractedString.match(patternTime);
        const resultN = extractedString.match(patternNote);

        const calendar = {

            // same as your code
            imam: "الإمام ناصر محمد اليماني"
        };

        if (resultH) {
            let hijri = resultH[1].replace(/\s+/g, ' ');
            hijri = hijri.replace(/[ ]*[-–][ ]*/g, ' - ');
            hijri = hijri.replace(/[هـه]$/, 'هـ').trim();
            calendar.higri = hijri;
        }

        if (resultM) {
            let meladi = resultM[1].replace(/\s+/g, ' ');
            meladi = meladi.replace(/[ ]*[-–][ ]*/g, ' - ');
            meladi = meladi.replace(/[مـ]$/, 'مـ').trim();
            calendar.meladi = meladi;
        }

        if (resultT) {
            const time = resultT[1].replace(/\s+/g, ' ').trim();
            calendar.time = time;
        }

        if (resultN) {
            const note = resultN[0].replace(/\s+/g, ' ').trim();
            calendar.note = note;
        }

        // ES6 cleaner check
        return Object.keys(calendar).length > 0 ? calendar : false;
    }

    return false;
};



function handleOrientationBr() {

    const w = window.innerWidth 
        || document.documentElement.clientWidth 
        || document.body.clientWidth;

    const h = window.innerHeight 
        || document.documentElement.clientHeight 
        || document.body.clientHeight;

    const brs = document.querySelectorAll("br.br");

    if (w > h) {
        brs.forEach(br => br.style.display = "none");
    } else {
        brs.forEach(br => br.style.display = "");
    }
}

function scrollTopThenBack() {

    const getScroll = () =>
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

    const setScroll = (val) => {
        window.scrollTo(0, val);
        document.documentElement.scrollTop = val;
        document.body.scrollTop = val;
    };

    const y = getScroll();

    setScroll(0);

    setTimeout(() => {

        setScroll(y);

        // second pass (confirm restore)
        setTimeout(() => {
            setScroll(y);
        }, 1);

    }, 1);
}

const closeAllMenus = () => {

    document.querySelectorAll(".menu-wrapper.open")
        .forEach(w => w.classList.remove("open"));
};



/* ===============================
   PURE ES6 (let/const, arrow, classList)
   keep same behavior
=============================== */

const detachNoCopy = (root) => {
  const list = [];
  if (!root) return list;

  const all = root.querySelectorAll("*");

  all.forEach((el) => {
    // detect no-copy / no_copy in class list (exact OR embedded)
    const cls = el.className || "";
    const s = String(cls);

    if (s.includes("no-copy") || s.includes("no_copy")) {
      const parent = el.parentNode;
      if (!parent) return;

      // index among parent's childNodes (same as your old loop)
      const children = Array.from(parent.childNodes);
      const index = children.indexOf(el);

      list.push({ node: el, parent, index: index < 0 ? 0 : index });
    }
  });

  // remove reverse
  for (let i = list.length - 1; i >= 0; i--) {
    const rec = list[i];
    try { rec.parent.removeChild(rec.node); } catch (e) {}
  }

  return list;
};

const restoreNoCopy = (list) => {
  if (!Array.isArray(list) || !list.length) return;

  list.forEach((rec) => {
    const { parent, node, index } = rec || {};
    if (!parent || !node) return;

    try {
      if (node.parentNode === parent) return;

      const ref = parent.childNodes[index] || null;

      if (ref) parent.insertBefore(node, ref);
      else parent.appendChild(node);

    } catch (e) {
      try { parent.appendChild(node); } catch (e2) {}
    }
  });
};








function handleCopyPost(buttonSelector, bodySelector) {

    if (!buttonSelector || !bodySelector) return;

    document.addEventListener("click", function (e) {

        var target = e.target;
        if (target.nodeType === 3) target = target.parentElement;

        var btn = target.closest(buttonSelector);
        if (!btn) return;

        if (window.DRAG_SCROLL_DRAGGING) return false;

        document.onselectstart = null;

        e.preventDefault();
        e.stopPropagation();

        /* =========================
           SAVE SCROLL POSITION
        ========================== */

        var scrollHide = document.querySelector(".scroll-hide");
        var app = document.getElementById("app");

        var scrollHidePos = scrollHide ? scrollHide.scrollTop : 0;
        var appPos = app ? app.scrollTop : 0;

        var bodyPos =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        if (btn._copied) return false;

        var oldText = btn.innerHTML;
        btn._copied = true;

        var postBody = null;

        /* =========================
           FIX: ONLY SEARCH SAME BLOCK
        ========================== */

        var block = btn.closest(".post-list-button, [data-copy]");

        if (block) {
            postBody = block.querySelector(bodySelector);
        }

        /* =========================
           SAFETY FALLBACK
        ========================== */

        if (!postBody) {

            var node = btn;
            var limit = 0;

            while (node && limit < 20) {

                var found = node.querySelector(bodySelector);

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

            var sel = window.getSelection();
            var range = document.createRange();

            range.selectNodeContents(el);

            sel.removeAllRanges();
            sel.addRange(range);

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

            window.scrollTo(0, bodyPos);
        }

        restoreScroll();
        setTimeout(restoreScroll, 0);
        setTimeout(restoreScroll, 30);

        setTimeout(function () {
            restoreNoCopy(removed);
        }, 0);

        /* =========================
           BUTTON TEXT
        ========================== */

        if (window.LANG_COMMON) {
            btn.innerHTML = window.LANG_COMMON.check_ok + window.LANG_COMMON.copy_done;
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



var quoteBlocker = null;
function initQuoteButton(selector) {

    if (!document._events) document._events = {};

    if (document._events.quoteOpen) {
        document.removeEventListener("click", document._events.quoteOpen);
    }

    const handler = function (e) {

        const target = e.target.closest(selector);
        if (!target) return;

        const finalHTML = buildQuoteHTML();
        if (!finalHTML) return false;

        if (e.preventDefault) e.preventDefault();

        forceOverlayResize();

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        /* 🔥 أوقف القديم أولاً */
        if (quoteBlocker && typeof quoteBlocker.stop === "function") {
            quoteBlocker.stop();
        }

        /* 🔥 أنشئ الجديد */
       /* quoteBlocker = initSelectionBlocker({
            namespace: "quoteBlock",
            allowed: [
               // ".quote-panal",
                ".quote_button",
				".quote-content"
            ]
        });*/

        document.querySelectorAll(".quote-panal")
            .forEach(el => el.remove());

        const box = document.getElementById("box");
        if (box) {
            box.insertAdjacentHTML("beforeend", window.QUOTE_PANAl);
        }

        const content = document.querySelector(".quote-panal .quote-content");

        if (content) {
            content.innerHTML = finalHTML;

            content.querySelectorAll("span.zoom")
                .forEach(el => el.remove());

            addZoomSpanAfterBr(content);
        }

        return false;
    };

    document._events.quoteOpen = handler;
    document.addEventListener("click", handler);
}


function closeQuoteInfoPanel(selector) {

    if (!document._events) document._events = {};

    if (document._events.quoteClose) {
        document.removeEventListener("click", document._events.quoteClose);
    }

    const handler = function (e) {
    
        const target = e.target.closest(selector);
        if (!target) return;

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        const box = target.closest(".quote-panal");
        if (box) box.remove();

        /* 🔥 stop الحقيقي */
        if (quoteBlocker && typeof quoteBlocker.stop === "function") {
            quoteBlocker.stop();
            quoteBlocker = null;
        }

        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";

            document.querySelectorAll(".tool_bar").forEach(function (el) {
    el.style.display = "";
});


        return false;
    };

    document._events.quoteClose = handler;
    document.addEventListener("click", handler);
}

function initQuickCopyButton(selector) {

    if (!document._events) document._events = {};

    if (document._events.quickCopy) {
        document.removeEventListener("click", document._events.quickCopy);
    }

    const handler = function (e) {

        const target = e.target.closest(selector);
        if (!target) return;

        e.preventDefault();
        e.stopPropagation();

        /* ===============================
           حفظ مكان السكروول
        =============================== */

        const doc = document.documentElement;
        const body = document.body;

        const scrollTop =
            window.pageYOffset ||
            doc.scrollTop ||
            body.scrollTop ||
            0;

        const scrollLeft =
            window.pageXOffset ||
            doc.scrollLeft ||
            body.scrollLeft ||
            0;

        /* ===============================
           بناء HTML
        =============================== */

        const finalHTML = buildQuoteHTML();
        if (!finalHTML) return;

        /* ===============================
           إنشاء Panel مخفي
        =============================== */

        document.querySelectorAll(".quote-panal")
            .forEach(el => el.remove());

        const wrapper = document.createElement("div");
        wrapper.innerHTML = window.QUOTE_PANAl;

        const panel = wrapper.firstElementChild;

        panel.style.position = "absolute";
        panel.style.left = "-99999px";
        panel.style.top = "0";
        panel.style.width = "1px";
        panel.style.height = "1px";
        panel.style.overflow = "hidden";

        const box = document.getElementById("box");
        if (!box) return;

        box.appendChild(panel);

        const content = panel.querySelector(".quote-content");
        if (!content) return;

        content.innerHTML = finalHTML;

        const postBody = content;

        /* ===============================
           تجاهل no_copy مؤقتاً
        =============================== */

        const removed = detachNoCopy(postBody);

        /* ===============================
           النسخ
        =============================== */

        try {

            // IE قديم
            if (document.body.createTextRange) {

                if (panel.runtimeStyle) {
                    panel.runtimeStyle.zoom = 1;
                }

                const range = document.body.createTextRange();
                range.moveToElementText(postBody);
                range.select();

                document.execCommand("copy");

                if (document.selection) {
                    document.selection.empty();
                }

            }
            // متصفحات حديثة
            else if (window.getSelection && document.createRange) {

                const sel = window.getSelection();
                const range2 = document.createRange();

                range2.selectNodeContents(postBody);
                sel.removeAllRanges();
                sel.addRange(range2);

                document.execCommand("copy");
                sel.removeAllRanges();
            }

        } catch (ex) {}

        /* ===============================
           استرجاع no_copy + السكروول
        =============================== */

        setTimeout(() => {

            restoreNoCopy(removed);

            panel.remove();

            window.scrollTo(scrollLeft, scrollTop);

        }, 0);
    };

    document._events.quickCopy = handler;
    document.addEventListener("click", handler);
}

function initMinimize() {

    // منع التكرار
    if (initMinimize.__bound) return;
    initMinimize.__bound = true;

    document.addEventListener("click", function (e) {

        var btn = e.target.closest(".panel-minimize");
        if (!btn) return;

        e.preventDefault();
        e.stopPropagation();

        var label = btn.querySelector("span");
        var icon  = btn.querySelector("i.demo-icon");

        var panel = btn.closest(".quote-panal");
        if (!panel) return;

        /* ===============================
           🔁 TOGGLE
        =============================== */

        if (!panel.classList.contains("minimized")) {

            /* ===============================
               ===== MINIMIZE =====
            =============================== */

            panel.classList.add("minimized");

            // 🔹 تغيير النص
            if (label) {
                label.textContent = window.LANG_COMMON.max;
            }

            // 🔹 تغيير الأيقونة
            if (icon) {
                icon.classList.remove("icon-minus");
                icon.classList.add("icon-window-maximize");
                icon.innerHTML = "";
            }

            // إخفاء المحتوى
            panel.querySelectorAll(".quote-content, .quote-copy-all")
                .forEach(el => el.style.display = "none");

            document.querySelectorAll(".tool_bar")
                .forEach(el => el.style.display = "none");

            panel.querySelectorAll(".child-post-con-info")
                .forEach(el => el.style.overflow = "hidden");

            if (window.quoteBlocker && typeof quoteBlocker.stop === "function") {
                quoteBlocker.stop();
                window.quoteBlocker = null;
            }

            panel.style.backgroundColor = "transparent";

            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";

            panel.style.height = "";

        } else {

            /* ===============================
               ===== RESTORE =====
            =============================== */

            panel.classList.remove("minimized");

            // 🔹 تغيير النص
            if (label) {
                label.textContent = window.LANG_COMMON.min;
            }

            // 🔹 تغيير الأيقونة
            if (icon) {
                icon.classList.remove("icon-window-maximize");
                icon.classList.add("icon-minus");
                icon.innerHTML = "";
            }

            panel.querySelectorAll(".quote-content, .quote-copy-all")
                .forEach(el => el.style.display = "");

     

            panel.querySelectorAll(".child-post-con-info")
                .forEach(el => el.style.overflow = "");

            /*window.quoteBlocker = initSelectionBlocker({
                namespace: "quoteBlock",
                allowed: [
                    //".quote-panal",
                    ".quote_button",
					".quote-content"
                ]
            });*/

            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";

            panel.style.backgroundColor = "";
            panel.style.height = "100%";
        }

    });
}





/* =====================================================
   SCROLL CONTROLS (Modern ES6) - محسن
===================================================== */
const scrollControls = (element) => {

    if (!element) return null;

    // متغير لتتبع وقت آخر تمرير يدوي
    let lastManualScrollTime = 0;
    let scrollTimeout = null;

    // مراقبة التمرير اليدوي
    const setupManualScrollDetection = () => {
        const handleManualScroll = () => {
            lastManualScrollTime = Date.now();
            
            // إلغاء أي timeout سابق
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // بعد توقف التمرير اليدوي، يمكن إعادة تشغيل read_scroll
            scrollTimeout = setTimeout(() => {
                // يمكن إضافة كود لإعادة التشغيل هنا إذا أردت
            }, 500);
        };
        
        element.addEventListener('scroll', handleManualScroll, { passive: true });
    };

    // تفعيل المراقبة
    setupManualScrollDetection();

    // دالة التمرير للأسفل
    const scrollToBottom = () => {
        if (!element) return;
        
       
        
        const startPos = element.scrollTop;
        const endPos = element.scrollHeight - element.clientHeight;
        const distance = endPos - startPos;
        
        if (distance <= 0) return; // بالفعل في الأسفل
        
        let startTime = null;
        const duration = 500;
        
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            element.scrollTop = startPos + (distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                
            }
        };
        
        requestAnimationFrame(animate);
    };

    // دالة التمرير للأعلى
    const scrollToTop = () => {
        if (!element) return;
        
       
        
        const startPos = element.scrollTop;
        const distance = -startPos;
        
        if (distance >= 0) return; // بالفعل في الأعلى
        
        let startTime = null;
        const duration = 500;
        
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            element.scrollTop = startPos + (distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } 
        };
        
        requestAnimationFrame(animate);
    };

    return {
        top: scrollToTop,
        bottom: scrollToBottom
    };
};

/* =====================================================
   INIT TOOL BUTTONS
===================================================== */
const init_tool_Buttons = () => {

    const qs  = (sel, ctx = document) => ctx.querySelector(sel);
    const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    const show = sel => qsa(sel).forEach(el => el.style.display = "");
    const hide = sel => qsa(sel).forEach(el => el.style.display = "none");


    /* =========================
       TOOL BUTTON
    ========================= */
    qsa(".tool_button").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            hide(".main_button");
            show(".tool_sec");
        });
    });


    /* =========================
       BACK BUTTON
    ========================= */
    qsa(".back_button").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            show(".main_button");
            hide(".tool_sec");
            hide(".movement_sec");
        });
    });


    /* =========================
       READ BUTTON
    ========================= */
    qsa(".read_button").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            show("#controls-horizontal");
			hide(".tool_sec");
        });
    });


    /* =========================
       MOVE BUTTON
    ========================= */
    qsa(".move_button").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            hide(".main_button");
            show(".movement_sec");
        });
    });


    /* =========================
       SCROLL CONTROLS INIT
    ========================= */
    const controls     = scrollControls(qs("#app"));
    const controls_sub = scrollControls(qs(".scroll-hide"));


    /* =========================
       MOVE UP
    ========================= */
    qsa(".move_up_button").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            controls?.top();
            controls_sub?.top();
        });
    });


    /* =========================
       MOVE DOWN
    ========================= */
    qsa(".move_down_button").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            controls?.bottom();
            controls_sub?.bottom();
        });
    });


    /* ===============================
       TOGGLE CONTROLS ON DOCUMENT DOWN
    ================================= */
    const toggleControls = e => {

        const controls = qs("#controls-horizontal");
        const tools    = qs(".tool_sec");

        if (!controls) return;

        if (e.target.closest("#controls-horizontal")) return;

        const isVisible = getComputedStyle(controls).display !== "none";

        if (isVisible) {
            controls.style.display = "none";
            tools && (tools.style.display = "");
        }
    };

    document.addEventListener("mousedown", toggleControls);
    document.addEventListener("touchstart", toggleControls);
};









(function(global) {

const addEvent = (el, type, fn) => {
    if (!el) return;
    if (el.addEventListener) el.addEventListener(type, fn, false);
    else if (el.attachEvent) el.attachEvent("on" + type, fn);
    else el["on" + type] = fn;
};

const stopEvent = (e) => {
    e = e || window.event;

    // ✅ مهم: لا تحاول cancel إذا الحدث غير قابل للإلغاء
    if (e.cancelable) {
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }

    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    return false;
};

const getStyle = (el, prop) => {
    if (window.getComputedStyle) return window.getComputedStyle(el, null)[prop];
    return el.currentStyle ? el.currentStyle[prop] : "";
};

const getScrollbarWidth = () => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "-9999px";
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.overflow = "scroll";
    document.body.appendChild(div);
    const width = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return width;
};

class CustomScrollbar {
    constructor(container, options) {
        if (typeof container === "string") {
            container = document.getElementById(container.replace("#", ""));
        }
        if (!container) return;

        this.options = options || {};
        this.container = container;

        this.thumbMinHeight = this.options.thumbMinHeight || 40;
        this.scrollbarWidth = this.options.scrollbarWidth || 15;
        this.arrowGap = 0;
        this.dragging = false;

        this._init();
    }

    _init() {
        const c = this.container;
        const isRTL = (getStyle(c, "direction") === "rtl");

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
        setTimeout(() => { this.update(); }, 0);
    }

    // New method to update content width
    _updateContentWidth() {
        const c = this.container;
        const containerWidth = c.clientWidth; // excludes border, correct for layout

        if (!containerWidth) return;

        let newWidth = containerWidth - this.scrollbarWidth;

        if (newWidth < 0) newWidth = 0;

        this.scrollInner.style.width = newWidth + "px";
    }

    _bindEvents() {
        const getClientY = (e) => {
            e = e || window.event;
            if (e.touches) {
                return e.touches[0].clientY;
            }
            return e.clientY;
        };

        const startDrag = (e) => {
            e = e || window.event;
            this.dragging = true;
            this.startY = getClientY(e);
            this.startThumbTop = parseInt(this.thumb.style.top, 10) || 0;

            //if (e.preventDefault) e.preventDefault();
            if (this.thumb.setCapture) this.thumb.setCapture();
            return stopEvent(e);
        };

        const stopDrag = (e) => {
            e = e || window.event;
            if (!this.dragging) return;
            this.dragging = false;
            if (this.thumb.releaseCapture) this.thumb.releaseCapture();
        };

        const onDrag = (e) => {
            e = e || window.event;
            if (!this.dragging) return;
            if (e.preventDefault) e.preventDefault();

            const containerHeight = this.container.clientHeight || this.container.offsetHeight;
            if (!containerHeight) return;

            const thumbH = this.thumb.offsetHeight;
            const maxTop = containerHeight - thumbH - this.arrowGap;
            const minTop = this.arrowGap;

            const currentY = getClientY(e);
            const delta = currentY - this.startY;
            let newTop = this.startThumbTop + delta;

            if (newTop < minTop) newTop = minTop;
            if (newTop > maxTop) newTop = maxTop;

            this.thumb.style.top = newTop + "px";

            const contentHeight = this.scrollInner.scrollHeight;
            const maxScroll = contentHeight - containerHeight;
            if (maxScroll < 1) {
                this.scrollInner.scrollTop = 0;
                return;
            }

            const track = (maxTop - minTop);
            if (track < 1) track = 1;

            const ratio = (newTop - minTop) / track;
            this.scrollInner.scrollTop = Math.round(ratio * maxScroll);

            return stopEvent(e);
        };

        // Mouse events
        addEvent(this.thumb, "mousedown", startDrag.bind(this));
        addEvent(document, "mouseup", stopDrag.bind(this));
        addEvent(document, "mousemove", onDrag.bind(this));

        // Touch events
        addEvent(this.thumb, "touchstart", startDrag.bind(this));
        addEvent(document, "touchend", stopDrag.bind(this));
        addEvent(document, "touchcancel", stopDrag.bind(this));
        addEvent(document, "touchmove", onDrag.bind(this));

        addEvent(this.thumb, "touchstart", (e) => {
            //if (e.preventDefault) e.preventDefault();
        });

        addEvent(this.scrollbar, "touchstart", (e) => {
             if (e.cancelable) e.preventDefault();
        });

        addEvent(this.scrollInner, "scroll", () => {
            this.updateThumbPosition();
        });

        // Fixed resize event handler
        addEvent(window, "resize", () => {
            this._updateContentWidth(); // Update width first
            this.update(); // Then update height/thumb
        });
    }

    updateThumbPosition() {
        const containerHeight = this.container.clientHeight || this.container.offsetHeight;
        if (!containerHeight) return;

        const contentHeight = this.scrollInner.scrollHeight;
        const maxScroll = contentHeight - containerHeight;
        if (maxScroll < 1) {
            this.thumb.style.top = this.arrowGap + "px";
            return;
        }

        const minTop = this.arrowGap;
        const maxTop = containerHeight - this.thumb.offsetHeight - this.arrowGap;
        let track = maxTop - minTop;
        if (track < 1) track = 1;

        const ratio = this.scrollInner.scrollTop / maxScroll;
        const newTop = minTop + Math.round(ratio * track);
        this.thumb.style.top = newTop + "px";
    }

    update() {
        const containerHeight = this.container.clientHeight || this.container.offsetHeight;
        if (!containerHeight) {
            this.scrollbar.style.display = "none";
            return;
        }

        const contentHeight = this.scrollInner.scrollHeight;

        if (contentHeight <= containerHeight) {
            this.scrollbar.style.display = "none";
            this.scrollInner.style.overflowY = "hidden";
            this.scrollInner.scrollTop = 0;
            return;
        }

        this.scrollbar.style.display = "block";
        this.scrollInner.style.overflowY = "scroll";

        const visibleRatio = containerHeight / contentHeight;
        let thumbH = Math.max(Math.round(visibleRatio * containerHeight), this.thumbMinHeight);

        if (thumbH > containerHeight - (2 * this.arrowGap)) thumbH = containerHeight - (2 * this.arrowGap);
        if (thumbH < 10) thumbH = 10;

        this.thumb.style.height = thumbH + "px";
        this.updateThumbPosition();
    }
}

global.CustomScrollbar = CustomScrollbar;

})(window);
















var postInfoBlocker = null;
const openPostInfoPanel = (selector) => {

    if (typeof selector !== "string") return;

    if (!document._events) document._events = {};

    if (document._events.postInfoOpen) {
        document.removeEventListener("click", document._events.postInfoOpen, true);
    }

    const handler = (e) => {

        const target =
            e.target instanceof Element
                ? e.target
                : e.target?.parentElement;

        const infoBtn = target?.closest(selector);
        if (!infoBtn) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        document.querySelectorAll(".menu-wrapper.open")
            .forEach(el => el.classList.remove("open"));

        const html = renderPostConHTML(
            window.RAW_JSON?.postid,
            window.RAW_JSON?.postcount
        );

        document.body.insertAdjacentHTML("beforeend", html);

        forceOverlayResize?.();

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        /* 🔥 أوقف القديم أولاً */
        if (postInfoBlocker && typeof postInfoBlocker.stop === "function") {
            postInfoBlocker.stop();
        }

        /* 🔥 أنشئ الجديد */
        postInfoBlocker = initSelectionBlocker({
            namespace: "postInfoBlock",
            allowed: [".post-con-info"]
        });
    };

    document._events.postInfoOpen = handler;
    document.addEventListener("click", handler, true);
};
const closePostInfoPanel = (selector) => {

    if (typeof selector !== "string") return;

    if (!document._events) document._events = {};

    if (document._events.postInfoClose) {
        document.removeEventListener("click", document._events.postInfoClose, true);
    }

    const handler = (e) => {

        const target =
            e.target instanceof Element
                ? e.target
                : e.target?.parentElement;

        const closeBtn = target?.closest(selector);
        if (!closeBtn) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        const box = closeBtn.closest(".post-con-info");
        box?.remove();

        /* 🔥 stop الحقيقي */
        if (postInfoBlocker && typeof postInfoBlocker.stop === "function") {
            postInfoBlocker.stop();
            postInfoBlocker = null;
        }

        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
    };

    document._events.postInfoClose = handler;
    document.addEventListener("click", handler, true);
};


var mapInfoBlocker = null;


const openMapForum_InfoPanel = (selector) => {

    if (typeof selector !== "string") return;

    if (!document._events) document._events = {};

    if (document._events.mapInfoOpen) {
        document.removeEventListener("click", document._events.mapInfoOpen, true);
    }

    const handler = (e) => {

        const target =
            e.target instanceof Element
                ? e.target
                : e.target?.parentElement;

        const btn = target?.closest(selector);
        if (!btn) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        document.querySelectorAll(".menu-wrapper.open")
            .forEach(w => w.classList.remove("open"));

        document.querySelectorAll(".map-con-info")
            .forEach(el => el.remove());


        const html = window.FORUM_TEMPLATES.mapConHTML;
        document.body.insertAdjacentHTML("beforeend", html);

        const panel = document.querySelector(".map-con-info");

        requestAnimationFrame(() => {
            panel.style.opacity = "0";
            panel.style.display = "block";
            panel.style.transition = "opacity 150ms";
            requestAnimationFrame(() => {
                panel.style.opacity = "1";
            });
        });

        forceOverlayResize?.();

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

      
    };

    document._events.mapInfoOpen = handler;
    document.addEventListener("click", handler, true);
};


const openMapThread_InfoPanel = (selector) => {

    if (typeof selector !== "string") return;

    if (!document._events) document._events = {};

    if (document._events.mapInfoOpen) {
        document.removeEventListener("click", document._events.mapInfoOpen, true);
    }

    const handler = (e) => {

        const target =
            e.target instanceof Element
                ? e.target
                : e.target?.parentElement;

        const btn = target?.closest(selector);
        if (!btn) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        document.querySelectorAll(".menu-wrapper.open")
            .forEach(w => w.classList.remove("open"));

        document.querySelectorAll(".map-con-info")
            .forEach(el => el.remove());


        const html = window.THREAD_TEMPLATES.mapConHTML;
        document.body.insertAdjacentHTML("beforeend", html);

        const panel = document.querySelector(".map-con-info");

        requestAnimationFrame(() => {
            panel.style.opacity = "0";
            panel.style.display = "block";
            panel.style.transition = "opacity 150ms";
            requestAnimationFrame(() => {
                panel.style.opacity = "1";
            });
        });

        forceOverlayResize?.();

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

    };

    document._events.mapInfoOpen = handler;
    document.addEventListener("click", handler, true);
};


const openMapPost_InfoPanel = (selector) => {

    if (typeof selector !== "string") return;

    if (!document._events) document._events = {};

    if (document._events.mapInfoOpen) {
        document.removeEventListener("click", document._events.mapInfoOpen, true);
    }

    const handler = (e) => {

        const target =
            e.target instanceof Element
                ? e.target
                : e.target?.parentElement;

        const btn = target?.closest(selector);
        if (!btn) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        document.querySelectorAll(".menu-wrapper.open")
            .forEach(w => w.classList.remove("open"));

        document.querySelectorAll(".map-con-info")
            .forEach(el => el.remove());


        const html = POST_TEMPLATES.mapConHTML();
        document.body.insertAdjacentHTML("beforeend", html);

        const panel = document.querySelector(".map-con-info");

        requestAnimationFrame(() => {
            panel.style.opacity = "0";
            panel.style.display = "block";
            panel.style.transition = "opacity 150ms";
            requestAnimationFrame(() => {
                panel.style.opacity = "1";
            });
        });

        forceOverlayResize?.();

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

    };

    document._events.mapInfoOpen = handler;
    document.addEventListener("click", handler, true);
};



const closeMapInfoPanel = (selector) => {

    if (typeof selector !== "string") return;

    if (!document._events) document._events = {};

    if (document._events.mapInfoClose) {
        document.removeEventListener("click", document._events.mapInfoClose, true);
    }

    const handler = (e) => {

        const target =
            e.target instanceof Element
                ? e.target
                : e.target?.parentElement;

        const btn = target?.closest(selector);
        if (!btn) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        const box = btn.closest(".map-con-info");
        box?.remove();

        /* 🔥 stop الحقيقي */
        if (mapInfoBlocker && typeof mapInfoBlocker.stop === "function") {
            mapInfoBlocker.stop();
            mapInfoBlocker = null;
        }

        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
    };

    document._events.mapInfoClose = handler;
    document.addEventListener("click", handler, true);
};














/* =====================================================
   MAIN FUNCTION
===================================================== */

const detectTextSelection = (rootSelector) => {
    if (!rootSelector) return;

    const roots = document.querySelectorAll(rootSelector);
    if (!roots.length) return;

    const getElement = (selector) => document.querySelector(selector);
    
    const quoteBtn = getElement(".quote_button");
    const quickCopyBtn = getElement(".quick_copy_button");
    const moveBtn = getElement(".move_button");
    const toolBtn = getElement(".tool_button");
    const toolBar = getElement(".tool_bar");

    // Set up toolbar transition if it exists
    if (toolBar) {
        toolBar.style.transition = 'opacity 0.2s ease';
    }

    const fadeIn = (el) => {
        if (!el) return;
        el.style.display = '';
        // Force reflow
        el.offsetHeight;
        el.style.opacity = '1';
    };

    const fadeOut = (el) => {
        if (!el) return;
        el.style.opacity = '0';
        setTimeout(() => {
            if (el.style.opacity === '0') {
                el.style.display = 'none';
            }
        }, 200);
    };

    const show = (el) => { 
        if (el) {
            if (el === toolBar) {
                fadeIn(el);
            } else {
                el.style.display = ''; 
            }
        }
    };
    
    const hide = (el) => { 
        if (el) {
            if (el === toolBar) {
                fadeOut(el);
            } else {
                el.style.display = 'none'; 
            }
        }
    };

    if (quoteBtn) hide(quoteBtn);
    if (quickCopyBtn) hide(quickCopyBtn);

    const isModern = window.getSelection && document.createRange;

    /* =====================================
       MODERN (IE9+, Chrome, Firefox etc)
    ===================================== */

    if (isModern) {
        document.removeEventListener("selectionchange", window._selectionHandler);

        const selectionHandler = () => {
            const sel = window.getSelection();

            if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
                window.SAVED_MODERN_RANGE = null;
                if (quoteBtn) hide(quoteBtn);
                if (quickCopyBtn) hide(quickCopyBtn);
                if (moveBtn) show(moveBtn);
                if (toolBtn) show(toolBtn);
                return;
            }

            /* ===== real character check ===== */

            const txt = sel.toString().replace(/[\s\r\n\t]/g, "");

            if (txt.length < 1) {
                window.SAVED_MODERN_RANGE = null;
                if (quoteBtn) hide(quoteBtn);
                if (quickCopyBtn) hide(quickCopyBtn);
                if (moveBtn) show(moveBtn);
                if (toolBtn) show(toolBtn);
                return;
            }

            const range = sel.getRangeAt(0);

            let startNode = range.startContainer;
            let endNode = range.endContainer;

            if (startNode.nodeType === 3) startNode = startNode.parentNode;
            if (endNode.nodeType === 3) endNode = endNode.parentNode;

            const startPost = startNode?.closest?.(".postBody");
            const endPost = endNode?.closest?.(".postBody");

            /* must be same postBody */

            if (!startPost || !endPost || startPost !== endPost) {
                window.SAVED_MODERN_RANGE = null;
                if (quoteBtn) hide(quoteBtn);
                if (quickCopyBtn) hide(quickCopyBtn);
                if (moveBtn) show(moveBtn);
                if (toolBtn) show(toolBtn);
                return;
            }

            let valid = false;

            for (let root of roots) {
                if (root === startPost) {
                    valid = true;
                    break;
                }
            }

            if (!valid) {
                window.SAVED_MODERN_RANGE = null;
                if (quoteBtn) hide(quoteBtn);
                if (quickCopyBtn) hide(quickCopyBtn);
                if (moveBtn) show(moveBtn);
                if (toolBtn) show(toolBtn);
                return;
            }

            window.SAVED_MODERN_RANGE = range.cloneRange();

            if (quoteBtn) show(quoteBtn);
            if (quickCopyBtn) show(quickCopyBtn);
            if (moveBtn) hide(moveBtn);
            if (toolBtn) hide(toolBtn);

            if (getElement(".quote-panal")) return;

            if (toolBar) show(toolBar);
        };

        window._selectionHandler = selectionHandler;
        document.addEventListener("selectionchange", selectionHandler);

        return;
    }

    /* =====================================
       IE6–8 (TextRange)
    ===================================== */

    const updateUI_IE = () => {
        try {
            if (!document.selection) return;

            const sel = document.selection;

            if (sel.type === "None") {
                window.SAVED_IE_RANGE = null;
                if (quoteBtn) hide(quoteBtn);
                if (quickCopyBtn) hide(quickCopyBtn);
                if (moveBtn) show(moveBtn);
                if (toolBtn) show(toolBtn);
                return;
            }

            const r = sel.createRange();

            if (!r) {
                window.SAVED_IE_RANGE = null;
                if (quoteBtn) hide(quoteBtn);
                if (quickCopyBtn) hide(quickCopyBtn);
                if (moveBtn) show(moveBtn);
                if (toolBtn) show(toolBtn);
                return;
            }

            /* ===== real character check ===== */

            const txt = r.text.replace(/[\s\r\n\t]/g, "");

            if (txt.length < 1) {
                window.SAVED_IE_RANGE = null;
                if (quoteBtn) hide(quoteBtn);
                if (quickCopyBtn) hide(quickCopyBtn);
                if (moveBtn) show(moveBtn);
                if (toolBtn) show(toolBtn);
                return;
            }

            const parent = r.parentElement();
            const postBody = parent?.closest?.(".postBody");

            if (!postBody) {
                if (quoteBtn) hide(quoteBtn);
                if (quickCopyBtn) hide(quickCopyBtn);
                if (moveBtn) show(moveBtn);
                if (toolBtn) show(toolBtn);
                return;
            }

            let valid = false;

            for (let root of roots) {
                if (root === postBody) {
                    valid = true;
                    break;
                }
            }

            if (!valid) {
                if (quoteBtn) hide(quoteBtn);
                if (quickCopyBtn) hide(quickCopyBtn);
                if (moveBtn) show(moveBtn);
                if (toolBtn) show(toolBtn);
                return;
            }

            window.SAVED_IE_RANGE = r.duplicate();

            if (quoteBtn) show(quoteBtn);
            if (quickCopyBtn) show(quickCopyBtn);
            if (moveBtn) hide(moveBtn);
            if (toolBtn) hide(toolBtn);

            if (getElement(".quote-panal")) return;

            if (toolBar) show(toolBar);

        } catch (e) {
            // Silently handle errors
        }
    };

    if (window.GLOBAL_MONITOR?.add) {
        window.GLOBAL_MONITOR.add(updateUI_IE);
    }
};

const initAutoHideBar = () => {
    const bar = document.querySelector(".tool_bar");
    const mainBtn = document.querySelector(".main_button");
    const quoteBtn = document.querySelector(".quote_button");

    if (!bar || !mainBtn || !quoteBtn) return;

    let last = 0;
    let hidden = false;
    const threshold = 8;

    let scrollContainer = Array.from(document.querySelectorAll(".scroll-hide"))
        .find(el => el.scrollHeight > el.clientHeight);

    if (!scrollContainer) {
        scrollContainer = Array.from(document.querySelectorAll("#app"))
            .find(el => el.scrollHeight > el.clientHeight);
    }

    if (!scrollContainer) return;

    let scrollTimer = null;
    
    // Set initial styles for fade transitions
    bar.style.transition = 'opacity 0.2s ease';
    bar.style.opacity = '1';

    const fadeIn = () => {
        bar.style.display = '';
        // Force reflow
        bar.offsetHeight;
        bar.style.opacity = '1';
    };

    const fadeOut = () => {
        bar.style.opacity = '0';
        setTimeout(() => {
            if (bar.style.opacity === '0') {
                bar.style.display = 'none';
            }
        }, 200);
    };

    const handleScroll = function() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(() => {
            /* ===== CONDITIONS BLOCK ===== */
            if (window.read_scroll?.isReading?.()) return;
            if (document.querySelector(".quote-panal")) return;
            if (mainBtn.style.display === "none") return;
            if (quoteBtn.style.display !== "none") return;

            const st = this.scrollTop;
            const maxScroll = this.scrollHeight - this.clientHeight;

            if (st >= maxScroll - 2) {
                if (hidden) {
                    fadeIn();
                    hidden = false;
                }
                last = st;
                return;
            }

            if (this.scrollHeight <= this.clientHeight) {
                fadeIn();
                hidden = false;
                return;
            }

            if (st > last + threshold) {
           
                    fadeOut();
                    hidden = true;
                
                last = st;
            } else if (st < last - threshold) {
               
                    fadeIn();
                    hidden = false;
              
                last = st;
            }

        }, 0);
    };

    scrollContainer.removeEventListener("scroll", handleScroll);
    scrollContainer.addEventListener("scroll", handleScroll);
};



























// ==================== ES6 Pure JavaScript (محسن للسحب خارج النطاق) ====================
var ScrollReader = (function() {
    "use strict";
    
    // ===== المتغيرات الأساسية =====
    let topPauseUntil = 0;
    let lastScrollPos = 0;
    let restartingFromTop = false;
    let timer = null;
    let isReading = false;
    let isDragging = false;
    const thumbWidth = 22;
    let currentPercent = 0;
    let readerInstance = null;
    let dragOffsetX = 0;
    let lastScrollTime = 0;
    let scrollAccumulator = 0;
    let animationFrame = null;
    let lastManualScroll = 0;
    let scrollTimeout = null;
    
    // DOM elements
    let wrap = null;
    let track = null;
    let thumb = null;
    let label = null;
    
    // متغيرات خاصة بالسلايدر
    let isPointerDown = false;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let isTouchScroll = false;
    let dragActive = false; // متغير إضافي لتتبع حالة السحب
    
    // كشف المتصفح
    const isIE6 = !!(window.attachEvent && !window.addEventListener);
    const hasRAF = !isIE6 && window.requestAnimationFrame;
    const hasPointerEvents = window.PointerEvent !== undefined;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // مؤشر إذا تمت التهيئة بنجاح
    let isInitialized = false;
    
    // ===== دوال مساعدة =====
    const $ = (selector) => {
        if (selector.startsWith('#')) {
            return document.getElementById(selector.slice(1));
        }
        return document.querySelector(selector);
    };
    
    const getWidth = (element) => {
        if (!element) return 0;
        const style = window.getComputedStyle(element);
        const boxSizing = style.boxSizing;
        
        if (boxSizing === 'border-box') {
            return element.offsetWidth;
        } else {
            const width = element.offsetWidth;
            const borderLeft = parseFloat(style.borderLeftWidth) || 0;
            const borderRight = parseFloat(style.borderRightWidth) || 0;
            const paddingLeft = parseFloat(style.paddingLeft) || 0;
            const paddingRight = parseFloat(style.paddingRight) || 0;
            
            return width - borderLeft - borderRight - paddingLeft - paddingRight;
        }
    };
    
    const hasClass = (element, className) => {
        return element && element.classList.contains(className);
    };
    
    const getOffsetLeft = (element) => {
        let offset = 0;
        while (element) {
            offset += element.offsetLeft || 0;
            element = element.offsetParent;
        }
        return offset;
    };
    
    // ===== الدوال الأساسية =====
    const isRTL = () => {
        return hasClass(document.body, 'rtl') || 
               (document.documentElement && document.documentElement.getAttribute("dir") === "rtl") || 
               (document.body && document.body.getAttribute("dir") === "rtl");
    };
    
    const getCurrentScroll = () => {
        const scrollHide = document.querySelector('.scroll-hide');
        if (scrollHide) return scrollHide.scrollTop || 0;
        
        const app = document.getElementById('app');
        if (app) return app.scrollTop || 0;
        
        return window.pageYOffset || 
               document.documentElement?.scrollTop || 
               document.body?.scrollTop || 0;
    };
    
    const setScrollPosition = (pos) => {
        pos = Math.max(0, Math.min(getMaxScroll(), pos));
        
        const scrollHide = document.querySelector('.scroll-hide');
        if (scrollHide) {
            scrollHide.scrollTop = pos;
            return;
        }
        
        const app = document.getElementById('app');
        if (app) {
            app.scrollTop = pos;
            return;
        }
        
        window.scrollTo(0, pos);
        if (document.documentElement) document.documentElement.scrollTop = pos;
        if (document.body) document.body.scrollTop = pos;
    };
    
    const getMaxScroll = () => {
        const scrollHide = document.querySelector('.scroll-hide');
        if (scrollHide) {
            return Math.max(0, scrollHide.scrollHeight - scrollHide.clientHeight);
        }
        
        const app = document.getElementById('app');
        if (app) {
            return Math.max(0, app.scrollHeight - app.clientHeight);
        }
        
        const docHeight = Math.max(
            document.documentElement?.scrollHeight || 0,
            document.body?.scrollHeight || 0
        );
        const windowHeight = window.innerHeight || 
                            document.documentElement?.clientHeight || 
                            document.body?.clientHeight || 0;
        return Math.max(0, docHeight - windowHeight);
    };
    
    // ===== حساب سرعة التمرير =====
    const getScrollSpeed = () => {
        if (currentPercent < 0.05) return 0.5;
        if (currentPercent < 0.1) return 1;
        if (currentPercent < 0.15) return 1.5;
        if (currentPercent < 0.2) return 2;
        if (currentPercent < 0.25) return 2.5;
        if (currentPercent < 0.3) return 3;
        if (currentPercent < 0.4) return 3.5;
        if (currentPercent < 0.5) return 4;
        if (currentPercent < 0.6) return 4.5;
        if (currentPercent < 0.7) return 5;
        if (currentPercent < 0.8) return 5.5;
        if (currentPercent < 0.9) return 6;
        return 6.5;
    };
    
    const getIntervalTime = () => {
        if (currentPercent < 0.05) return 300;
        if (currentPercent < 0.1) return 280;
        if (currentPercent < 0.15) return 260;
        if (currentPercent < 0.2) return 240;
        if (currentPercent < 0.25) return 220;
        if (currentPercent < 0.3) return 200;
        if (currentPercent < 0.4) return 180;
        if (currentPercent < 0.5) return 160;
        if (currentPercent < 0.6) return 140;
        if (currentPercent < 0.7) return 120;
        if (currentPercent < 0.8) return 100;
        if (currentPercent < 0.9) return 80;
        return 60;
    };
    
    // ===== مراقبة التمرير =====
    const setupScrollMonitoring = () => {
        const handleScroll = () => {
            if (!isReading) return;
            
            if (scrollTimeout) clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                if (isReading && currentPercent > 0) {
                    if (!timer && !animationFrame) {
                        startScrolling();
                    }
                }
            }, 500);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    };
    
    // ===== دالة التمرير السلس =====
    const smoothScroll = () => {
        if (!isReading || currentPercent <= 0) {
            stopScrolling();
            return;
        }
        
        const current = getCurrentScroll();
        const max = getMaxScroll();
        const now = Date.now();
        
        // إعادة التشغيل من الأعلى
        if (current <= 1 && lastScrollPos > 1 && !restartingFromTop) {
            restartingFromTop = true;
            stopScrolling();
            
            setTimeout(() => {
                if (currentPercent > 0) {
                    lastScrollTime = Date.now();
                    scrollAccumulator = 0;
                    startScrolling();
                }
                restartingFromTop = false;
            }, 1000);
            
            return;
        }
        
        // التمرير العادي
        if (current < max) {
            const deltaTime = now - lastScrollTime;
            lastScrollTime = now;
            
            if (deltaTime > 0 && deltaTime < 200) {
                const speedPerMs = getScrollSpeed() / getIntervalTime();
                scrollAccumulator += speedPerMs * deltaTime;
                
                if (scrollAccumulator >= 1) {
                    const scrollAmount = Math.floor(scrollAccumulator);
                    let newPos = current + scrollAmount;
                    
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
            animationFrame = requestAnimationFrame(smoothScroll);
        }
    };
    
    const controlScrollingByPercent = (percent) => {
        if (percent > 0 && !isReading) {
            isReading = true;
            startScrolling();
        } else if (percent <= 0 && isReading) {
            isReading = false;
            stopScrolling();
        }
    };
    
    const startScrolling = () => {
        stopScrolling();
        lastScrollTime = Date.now();
        scrollAccumulator = 0;
        smoothScroll();
    };
    
    const stopScrolling = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
        scrollAccumulator = 0;
    };
    
    const updateLabel = (percent) => {
        if (!label) return;
        
        const p = Math.round(percent * 100);
        const current = getCurrentScroll();
        const max = getMaxScroll();
        
        if (percent <= 0) {
            label.innerHTML = `${window.LANG_COMMON?.stop || 'Stop'} 0%`;
        } else if (current >= max) {
            label.innerHTML = `${window.LANG_COMMON?.speed || 'Speed'} ${p}%`;
        } else {
            label.innerHTML = `${window.LANG_COMMON?.speed || 'Speed'} ${p}%`;
        }
    };
    
    // ===== دالة تحديث السلايدر =====
    const setSliderPosition = (percent) => {
        if (!wrap) return;
        
        const wrapWidth = getWidth(wrap);
        
        if (wrapWidth <= 0) {
            setTimeout(() => setSliderPosition(percent), 50);
            return;
        }
        
        percent = Math.max(0, Math.min(1, percent));
        
        const oldPercent = currentPercent;
        currentPercent = percent;
        
        const rtl = isRTL();
        
        // حساب موقع الإبهام بدقة
        const thumbPos = Math.round(percent * (wrapWidth - thumbWidth));
        
        if (thumb && track) {
            if (rtl) {
                thumb.style.left = 'auto';
                thumb.style.right = thumbPos + 'px';
                track.style.width = Math.round(percent * wrapWidth) + 'px';
                track.style.left = 'auto';
                track.style.right = '0';
            } else {
                thumb.style.left = thumbPos + 'px';
                thumb.style.right = 'auto';
                track.style.width = Math.round(percent * wrapWidth) + 'px';
                track.style.left = '0';
                track.style.right = 'auto';
            }
            
            // إضافة تأثيرات بصرية
            thumb.style.transition = isDragging ? 'none' : 'left 0.1s ease, right 0.1s ease';
        }
        
        if (oldPercent !== percent) {
            controlScrollingByPercent(percent);
        }
        
        updateLabel(percent);
    };
    
    // ===== دوال الماوس واللمس (محسنة للسحب خارج النطاق) =====
    const getPointerX = (e) => {
        e = e || window.event;
        let x = 0;
        
        if (e.pageX !== undefined) {
            x = e.pageX;
        } else if (e.clientX !== undefined) {
            x = e.clientX + (window.pageXOffset || document.documentElement.scrollLeft || 0);
        }
        
        // معالجة أحداث اللمس
        if (e.touches && e.touches.length > 0) {
            x = e.touches[0].pageX || e.touches[0].clientX || 0;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            x = e.changedTouches[0].pageX || e.changedTouches[0].clientX || 0;
        }
        
        return x;
    };
    
    const getPointerY = (e) => {
        e = e || window.event;
        let y = 0;
        
        if (e.pageY !== undefined) {
            y = e.pageY;
        } else if (e.clientY !== undefined) {
            y = e.clientY + (window.pageYOffset || document.documentElement.scrollTop || 0);
        }
        
        if (e.touches && e.touches.length > 0) {
            y = e.touches[0].pageY || e.touches[0].clientY || 0;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            y = e.changedTouches[0].pageY || e.changedTouches[0].clientY || 0;
        }
        
        return y;
    };
    
    const calculateDragOffset = (e) => {
        if (!thumb) return 0;
        const mouseX = getPointerX(e);
        const thumbOffset = getOffsetLeft(thumb);
        return mouseX - thumbOffset;
    };
    
    const updateSliderFromEvent = (e) => {
        if (!wrap || !dragActive) return false; // استخدام dragActive بدلاً من isPointerDown
        
        e.preventDefault();
        e.stopPropagation();
        
        const x = getPointerX(e);
        if (x === 0) return false;
        
        const offset = getOffsetLeft(wrap);
        const wrapWidth = getWidth(wrap);
        const rtl = isRTL();
        
        let relativeX = (x - dragOffsetX) - offset;
        
        // تحديد الموضع ضمن الحدود
        relativeX = Math.max(0, Math.min(wrapWidth - thumbWidth, relativeX));
        
        // حساب النسبة المئوية
        const percent = rtl ? 1 - (relativeX / (wrapWidth - thumbWidth)) : relativeX / (wrapWidth - thumbWidth);
        
        setSliderPosition(percent);
        return false;
    };
    
    // ===== معالجة أحداث الماوس (محسنة) =====
    const handleMouseDown = (e) => {
        e.preventDefault();
        
        // تفعيل السحب
        dragActive = true;
        isPointerDown = true;
        isDragging = true;
        
        // تخزين نقطة البداية
        startX = getPointerX(e);
        startY = getPointerY(e);
        
        // حساب مسافة السحب
        dragOffsetX = calculateDragOffset(e);
        
        // إزالة الانتقال أثناء السحب
        thumb.style.transition = 'none';
        
        // إضافة كلاس للسحب
        document.body.classList.add('dragging-active');
        
        console.log('Mouse down - drag started');
    };
    
    const handleMouseMove = (e) => {
        if (!dragActive) return; // استخدام dragActive
        
        e.preventDefault();
        
        // تحديث position حتى لو كان خارج السلايدر
        updateSliderFromEvent(e);
    };
    
    const handleMouseUp = (e) => {
        if (dragActive) {
            e.preventDefault();
            
            // تحديث نهائي إذا كان المؤشر خارج السلايدر
            if (e) {
                updateSliderFromEvent(e);
            }
            
            // إلغاء تفعيل السحب
            dragActive = false;
            isPointerDown = false;
            isDragging = false;
            dragOffsetX = 0;
            
            // إعادة الانتقال
            thumb.style.transition = '';
            
            // إزالة كلاس السحب
            document.body.classList.remove('dragging-active');
            
            console.log('Mouse up - drag ended');
        }
    };
    
    // ===== معالجة أحداث اللمس (محسنة) =====
    const handleTouchStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const touch = e.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        
        // تفعيل السحب
        dragActive = true;
        isPointerDown = true;
        isDragging = true;
        isTouchScroll = false;
        
        // حساب مسافة السحب
        dragOffsetX = calculateDragOffset(e);
        
        // إزالة الانتقال أثناء السحب
        thumb.style.transition = 'none';
        
        // إضافة كلاس للسحب
        document.body.classList.add('dragging-active');
        
        // منع التمرير الطبيعي للصفحة
        document.body.style.overflow = 'hidden';
        
        console.log('Touch start - drag started');
    };
    
    const handleTouchMove = (e) => {
        if (!dragActive) return; // استخدام dragActive
        
        const touch = e.touches[0];
        const currentX = touch.pageX;
        const currentY = touch.pageY;
        
        // التحقق إذا كان المستخدم يحاول التمرير العمودي
        if (!isTouchScroll) {
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);
            
            // إذا كانت الحركة العمودية أكبر من الأفقية، نعتبرها تمرير عمودي
            if (diffY > diffX && diffY > 10) {
                isTouchScroll = true;
                dragActive = false;
                isPointerDown = false;
                isDragging = false;
                document.body.style.overflow = '';
                document.body.classList.remove('dragging-active');
                return;
            }
        }
        
        if (isTouchScroll) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        // تحديث position حتى لو كان خارج السلايدر
        updateSliderFromEvent(e);
    };
    
    const handleTouchEnd = (e) => {
        if (dragActive) {
            e.preventDefault();
            e.stopPropagation();
            
            // تحديث نهائي إذا كان اللمس خارج السلايدر
            if (e && e.changedTouches && e.changedTouches.length > 0) {
                // إنشاء حدث وهمي للتحديث النهائي
                const fakeEvent = {
                    touches: e.changedTouches,
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };
                updateSliderFromEvent(fakeEvent);
            }
            
            // إلغاء تفعيل السحب
            dragActive = false;
            isPointerDown = false;
            isDragging = false;
            isTouchScroll = false;
            dragOffsetX = 0;
            
            // إعادة الانتقال
            thumb.style.transition = '';
            
            // إزالة كلاس السحب
            document.body.classList.remove('dragging-active');
            
            // إعادة التمرير الطبيعي
            document.body.style.overflow = '';
            
            console.log('Touch end - drag ended');
        }
    };
    
    const handleTouchCancel = (e) => {
        if (dragActive) {
            dragActive = false;
            isPointerDown = false;
            isDragging = false;
            isTouchScroll = false;
            dragOffsetX = 0;
            thumb.style.transition = '';
            document.body.classList.remove('dragging-active');
            document.body.style.overflow = '';
            
            console.log('Touch cancel - drag cancelled');
        }
    };
    
    // ===== معالجة Pointer Events كبديل =====
    const handlePointerDown = (e) => {
        e.preventDefault();
        
        pointerId = e.pointerId;
        
        // تفعيل السحب
        dragActive = true;
        isPointerDown = true;
        isDragging = true;
        
        startX = e.pageX;
        startY = e.pageY;
        
        dragOffsetX = calculateDragOffset(e);
        thumb.style.transition = 'none';
        document.body.classList.add('dragging-active');
        
        try {
            if (thumb) {
                thumb.setPointerCapture(e.pointerId);
            }
        } catch (err) {
            // تجاهل الخطأ
        }
    };
    
    const handlePointerMove = (e) => {
        if (!dragActive) return;
        if (pointerId !== null && e.pointerId !== pointerId) return;
        
        e.preventDefault();
        updateSliderFromEvent(e);
    };
    
    const handlePointerUp = (e) => {
        if (!dragActive) return;
        if (pointerId !== null && e.pointerId !== pointerId) return;
        
        e.preventDefault();
        
        // تحديث نهائي
        updateSliderFromEvent(e);
        
        // إلغاء تفعيل السحب
        dragActive = false;
        isPointerDown = false;
        isDragging = false;
        pointerId = null;
        dragOffsetX = 0;
        
        thumb.style.transition = '';
        document.body.classList.remove('dragging-active');
        
        try {
            if (thumb) {
                thumb.releasePointerCapture(e.pointerId);
            }
        } catch (err) {
            // تجاهل الخطأ
        }
    };
    
    // ===== ربط الأحداث (محسن للسحب خارج النطاق) =====
    const bindEvents = () => {
        if (!thumb || !wrap || !track) {
            console.warn('Elements not ready yet');
            return false;
        }
        
        // تعيين خصائص CSS للمس
        thumb.style.touchAction = 'none';
        thumb.style.userSelect = 'none';
        thumb.style.webkitUserSelect = 'none';
        thumb.style.webkitTouchCallout = 'none';
        
        // منع السلوك الافتراضي للسحب
        thumb.addEventListener('dragstart', (e) => e.preventDefault());
        
        // استخدام Pointer Events إذا كانت متاحة
        if (hasPointerEvents) {
            thumb.addEventListener('pointerdown', handlePointerDown);
            thumb.addEventListener('pointermove', handlePointerMove);
            thumb.addEventListener('pointerup', handlePointerUp);
            thumb.addEventListener('pointercancel', handlePointerUp);
        } else {
            // أحداث الماوس - ربط على المستند وليس فقط على العنصر
            thumb.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            // أحداث اللمس - ربط على المستند أيضاً
            thumb.addEventListener('touchstart', handleTouchStart, { passive: false });
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd, { passive: false });
            document.addEventListener('touchcancel', handleTouchCancel, { passive: false });
        }
        
        // منع القائمة المنبثقة على الموبايل
        thumb.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Click on track
        wrap.addEventListener('click', (e) => {
            if (e.target !== thumb) {
                dragOffsetX = thumbWidth / 2;
                dragActive = true;
                updateSliderFromEvent(e);
                dragActive = false;
            }
        });
        
        // Resize
        window.addEventListener('resize', () => {
            setSliderPosition(currentPercent);
        });
        
        // منع تحديد النص أثناء السحب
        document.addEventListener('selectstart', (e) => {
            if (dragActive) {
                e.preventDefault();
            }
        });
        
        // منع التمرير أثناء السحب على المستند كله
        window.addEventListener('scroll', (e) => {
            if (dragActive) {
                e.preventDefault();
                window.scrollTo(0, getCurrentScroll()); // إعادة التمرير إلى موقعه
            }
        }, { passive: false });
        
        // Initial position
        setTimeout(() => setSliderPosition(0), 100);
        
        //console.log('Events bound successfully');
        return true;
    };
    
    // ===== التهيئة الرئيسية =====
    const initialize = () => {
        // الحصول على العناصر
        wrap = document.getElementById('sliderWrap');
        track = document.getElementById('sliderTrack');
        thumb = document.getElementById('sliderThumb');
        label = document.getElementById('speedLabel');
        
        // التحقق من وجود جميع العناصر
        if (!wrap || !track || !thumb || !label) {
            /*console.warn('Required elements not found:', {
                wrap: !!wrap,
                track: !!track,
                thumb: !!thumb,
                label: !!label
            });*/
            return false;
        }
        
        // ربط الأحداث
        const eventsBound = bindEvents();
        if (!eventsBound) {
            return false;
        }
        
        // إعداد مراقبة التمرير
        setupScrollMonitoring();
        
        // تمت التهيئة بنجاح
        isInitialized = true;
        //console.log('ScrollReader initialized successfully');
        
        return true;
    };
    
    // ===== إنشاء نسخة من الكائن =====
    const createInstance = () => {
        if (!isInitialized) {
            return null;
        }
        
        return {
            setPosition: (percent) => setSliderPosition(percent),
            getPosition: () => currentPercent,
            isReading: () => isReading,
            stop: () => {
                if (isReading) {
                    isReading = false;
                    stopScrolling();
                }
            },
            start: () => {
                if (!isReading && currentPercent > 0) {
                    isReading = true;
                    startScrolling();
                }
            },
            toggle: () => {
                if (isReading) {
                    isReading = false;
                    stopScrolling();
                } else {
                    isReading = true;
                    startScrolling();
                }
            },
            getStatus: () => ({
                isReading,
                currentPercent,
                isAtEnd: getCurrentScroll() >= getMaxScroll(),
                currentScroll: getCurrentScroll(),
                maxScroll: getMaxScroll()
            }),
            getCurrentScroll: () => getCurrentScroll(),
            getMaxScroll: () => getMaxScroll(),
            isAtEnd: () => getCurrentScroll() >= getMaxScroll(),
            reset: () => setSliderPosition(0),
            setReading: (value) => {
                if (value && !isReading) {
                    isReading = true;
                    startScrolling();
                } else if (!value && isReading) {
                    isReading = false;
                    stopScrolling();
                }
            },
            isDragging: () => dragActive // دالة للتحقق من حالة السحب
        };
    };
    
    // ===== التهيئة مع DOMContentLoaded =====
    const initializeWhenReady = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                if (initialize()) {
                    readerInstance = createInstance();
                } else {
                    setTimeout(() => {
                        if (initialize()) {
                            readerInstance = createInstance();
                        }
                    }, 100);
                }
            });
        } else {
            if (initialize()) {
                readerInstance = createInstance();
            } else {
                setTimeout(() => {
                    if (initialize()) {
                        readerInstance = createInstance();
                    }
                }, 100);
            }
        }
    };
    
    // بدء التهيئة
    initializeWhenReady();
    
    // ===== الواجهة العامة =====
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
        },
        isReady: function() {
            return isInitialized && readerInstance !== null;
        },
        isDragging: function() {
            return dragActive;
        }
    };
    
})();

// ===== الدالة العامة read_scroll =====
window.read_scroll = function(percent) {
    if (typeof ScrollReader !== 'undefined') {
        if (typeof percent === 'number') {
            ScrollReader.setPosition(Math.max(0, Math.min(1, percent)));
            return ScrollReader.getPosition();
        } else if (typeof percent === 'string') {
            switch(percent) {
                case 'status':
                    return ScrollReader.getStatus();
                case 'start':
                    ScrollReader.start();
                    return ScrollReader.isReading();
                case 'stop':
                    ScrollReader.stop();
                    return !ScrollReader.isReading();
                case 'isreading':
                    return ScrollReader.isReading();
                case 'isready':
                    return ScrollReader.isReady ? ScrollReader.isReady() : false;
                case 'isdragging':
                    return ScrollReader.isDragging ? ScrollReader.isDragging() : false;
                default:
                    return ScrollReader.getPosition();
            }
        }
        return ScrollReader.getPosition();
    }
    return 0;
};

// إضافة الأسماء المستعارة
window.read_scroll.isReading = function() {
    return ScrollReader?.isReading() || false;
};

window.read_scroll.start = function() {
    return ScrollReader?.start();
};

window.read_scroll.stop = function() {
    return ScrollReader?.stop();
};

window.read_scroll.getPosition = function() {
    return ScrollReader?.getPosition() || 0;
};

window.read_scroll.getStatus = function() {
    return ScrollReader?.getStatus() || { isReading: false, currentPercent: 0, isAtEnd: false, currentScroll: 0, maxScroll: 0 };
};

window.read_scroll.setPosition = function(percent) {
    return ScrollReader?.setPosition(percent);
};

window.read_scroll.isReady = function() {
    return ScrollReader?.isReady ? ScrollReader.isReady() : false;
};

window.read_scroll.isDragging = function() {
    return ScrollReader?.isDragging ? ScrollReader.isDragging() : false;
};





  function isInIframe() {
    try { return window.self !== window.top; } catch(e) { return true; }
  }

  function sendUrl(url, title) {
    window.parent.postMessage({
      type: 'URL_UPDATE',
      url: url,
      title: title || document.title
    }, '*');
  }

  // Send current URL on load (NO LOOP)
  if (isInIframe()) {
    sendUrl(window.location.href, document.title);
  }

document.body.addEventListener('click', function(e) {

  var link = e.target.closest ? e.target.closest('a') : (function(el) {
    while (el && el.tagName !== 'A') el = el.parentNode;
    return el;
  })(e.target);

  // 🚫 Ignore links with .no_copy


  // Only internal links
  if (link && link.href && link.target !== "_blank") {

    // Ignore same link (prevents loop)
    if (link.href === window.location.href){ 
      
      window.parent.postMessage({
        type: 'skipHitidRemoval',
        skipHitidRemoval: false,
      }, '*');

      return;
    }

    var title = link.textContent || link.innerText || document.title;

    if (isInIframe()) {
      e.preventDefault();

          if (link && link.classList && link.classList.contains('no_copy')) {
    return;
  }

      // Send to parent
      sendUrl(link.href, title);

      return false;
    }
  }
});