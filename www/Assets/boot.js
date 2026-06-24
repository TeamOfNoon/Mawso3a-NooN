// ===== SAFE userData =====
var _udEl = null;

function getUserDataEl() {
    if (!_udEl) {
        var el = document.createElement("div");
        el.style.display = "none";

        if (!document.body) return null;

        document.body.appendChild(el);

        if (el.addBehavior) {
            el.addBehavior("#default#userData");
            _udEl = el;
        }
    }
    return _udEl;
}

// ===== SET =====
function setLS(key, value) {
    if (typeof value === "object") {
        value = JSON.stringify(value);
    }

    if (window.localStorage) {
        localStorage.setItem(key, value);
        return;
    }

    var el = getUserDataEl();
    if (!el) return;

    try {
        el.load("lsStore"); // 🔥 load first
        el.setAttribute(key, value);
        el.save("lsStore"); // 🔥 save after
    } catch (e) {}
}

// ===== GET =====
function getLS(key, def) {
    var v = null;

    if (window.localStorage) {
        v = localStorage.getItem(key);
    } else {
        var el = getUserDataEl();
        if (!el) return def;

        try {
            el.load("lsStore"); // 🔥 VERY IMPORTANT
            v = el.getAttribute(key);
        } catch (e) {}
    }

    if (v === null || v === undefined) return def;

    if (v && v.charAt && (v.charAt(0) === "{" || v.charAt(0) === "[")) {
        try {
            return JSON.parse(v);
        } catch (e) {}
    }

    return v;
}






//window.app_lang = getLS("lang", "ar");


//var app_lang  = window.app_lang;





/* ===============================
   HEAD ENSURE (CHM SAFE)
================================ */
function ensureHead() {
  return (
    document.head ||
    document.getElementsByTagName("head")[0] ||
    document.documentElement
  );
}

/* ===============================
   BASE PATH (SAFE)
================================ */
function getHtmlBasePath() {
	

  
  var h = location.href.split("#")[0].split("?")[0];
  return h.substring(0, h.lastIndexOf("/") + 1);
}
/* ===============================
   VERSIONING
================================ */

function ver(u) {
  return u + (isCHM() ? "" : "?v=" + v);
}

/* ===============================
   LOAD CSS
================================ */
function loadCSS(href) {
  var l = document.createElement("link");
  l.rel = "stylesheet";
  l.type = "text/css";
  l.href = href;
  ensureHead().appendChild(l);
}

/* ===============================
   LOAD JS (IE6+ SAFE)
================================ */
function loadJS(src, cb) {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = src;

  s.onload = s.onreadystatechange = function () {
    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
      s.onload = s.onreadystatechange = null;
      if (cb) cb();
    }
  };

  ensureHead().appendChild(s);
}

/* ===============================
   LOAD JS SEQUENTIALLY
================================ */
function loadSeq(list, i, done) {
  if (i >= list.length) {
    if (done) done();
    return;
  }

  loadJS(list[i], function () {
    loadSeq(list, i + 1, done);
  });
}


function loadAll(list, done) {
    var left = list.length;

    function finish() {
        left--;
        if (left === 0 && done) {
            done();
        }
    }

    for (var i = 0; i < list.length; i++) {
        loadJS(list[i], finish);
    }
}
 
