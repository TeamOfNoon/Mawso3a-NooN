// =========================
// MEDIA CSS ENGINE (IE6+)
// =========================

var MediaCSS = (function () {

    var activeStyles = [];
    var cssText = "";
    var cache = [];
    var emPx = null;

    // -------------------------
    // GET WIDTH
    // -------------------------
    function getWidth() {
        return document.documentElement.clientWidth || document.body.clientWidth;
    }

    // -------------------------
    // EM → PX (real calc like Respond.js)
    // -------------------------
    function getEmPx() {
        if (emPx) return emPx;

        var div = document.createElement("div");
        div.style.cssText = "position:absolute;font-size:1em;width:1em";

        var body = document.body;
        if (!body) {
            body = document.createElement("body");
            document.documentElement.appendChild(body);
        }

        body.appendChild(div);
        emPx = div.offsetWidth || 16;
        body.removeChild(div);

        return emPx;
    }

    // -------------------------
    // CHECK WIDTH
    // -------------------------
    function check(min, max, minU, maxU) {

        var w = getWidth();

        if (min !== null) {
            if (minU === "em") min = min * getEmPx();
            if (w < min) return false;
        }

        if (max !== null) {
            if (maxU === "em") max = max * getEmPx();
            if (w > max) return false;
        }

        return true;
    }

    // -------------------------
    // CLEAR OLD STYLES
    // -------------------------
    function clearStyles() {
        for (var i = 0; i < activeStyles.length; i++) {
            var el = activeStyles[i];
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        }
        activeStyles = [];
    }

    // -------------------------
    // PARSE CSS
    // -------------------------
  function parse(css) {

    cache = [];

    var blocks = css.split("@media");

    for (var i = 1; i < blocks.length; i++) {

        var part = blocks[i];

        var query = part.substring(0, part.indexOf("{"));
        var body  = part.substring(part.indexOf("{") + 1);

        // 🔥 find correct closing }
        var depth = 1, j = 0;
        for (; j < body.length; j++) {
            if (body[j] === "{") depth++;
            if (body[j] === "}") depth--;
            if (depth === 0) break;
        }

        var rules = body.substring(0, j);

        var min = query.match(/min\-width\s*:\s*([0-9\.]+)(px|em)/i);
        var max = query.match(/max\-width\s*:\s*([0-9\.]+)(px|em)/i);

        cache.push({
            rules: rules,
            min: min ? parseFloat(min[1]) : null,
            max: max ? parseFloat(max[1]) : null,
            minU: min ? min[2] : null,
            maxU: max ? max[2] : null
        });
    }
}

    // -------------------------
    // APPLY
    // -------------------------
    function apply() {

        clearStyles();

        for (var i = 0; i < cache.length; i++) {

            var c = cache[i];

            if (check(c.min, c.max, c.minU, c.maxU)) {

                var s = document.createElement("style");
                s.type = "text/css";

                if (s.styleSheet) {
                    s.styleSheet.cssText = c.rules; // IE6
                } else {
                    s.appendChild(document.createTextNode(c.rules));
                }

                document.getElementsByTagName("head")[0].appendChild(s);
                activeStyles.push(s);
            }
        }
    }

    // -------------------------
    // SET CSS
    // -------------------------
    function set(css) {
        cssText = css;
        parse(cssText);
        apply();
    }

    // -------------------------
    // INIT (auto resize)
    // -------------------------
    function init(css) {

        set(css);

        function run() {
            apply();
        }

        if (window.addEventListener) {
            window.addEventListener("resize", run, false);
        } else if (window.attachEvent) {
            window.attachEvent("onresize", run); // IE6
        }
    }

    // -------------------------
    return {
        init: init,
        set: set,
        apply: apply
    };

})();