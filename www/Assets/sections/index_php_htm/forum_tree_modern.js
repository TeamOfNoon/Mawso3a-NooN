/* =====================================================
   FORUM TREE RENDERER – pure ES6
   (no jQuery – same behaviour as your ES3 version)
===================================================== */

/* ================= LOADER ================= */

/* ================= LOADER ================= */

const showLoader = () => {
    const el = document.querySelector(".loader-wrap");
    if (el) el.style.display = "";
};

const hideLoader = () => {
    const el = document.querySelector(".loader-wrap");
    if (el) el.style.display = "none";
};

const showApp = () => {
    const el = document.getElementById("app");
    if (el) el.style.display = "";
};



/* ================= WAIT ================= */

function wait(fn) {

    if (
        document.body &&
        typeof window.tpl === "function" &&
        window.INDEX_MN &&
        window.INDEX_VB &&
        window.FORUM_TREE_TPL &&
        window.FORUM_TREE_LANG
    ) {
        fn();
    } else {
        setTimeout(function () {
            wait(fn);
        }, 15);
    }
}


/* ================= ROOT ================= */

function ensureRootOnce(L) {

    var app = document.getElementById("app") || document.body;

    if (!document.getElementById("forums_root")) {

        var containersHTML =
            '<div id="forums_mn"></div>' +
            '<hr id="forums_sep" />' +
            '<div id="forums_vb"></div>';

        var rootHTML = FORUM_TREE_TPL.root(containersHTML, L);

        var root = document.createElement("div");
        root.id = "forums_root";
        root.innerHTML = rootHTML;

        app.appendChild(root);
    }
}


/* ================= HASH JUMP ================= */

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
            el.scrollIntoView({ block: "start" });
        } catch (e) {
            try {
                el.scrollIntoView(true);
            } catch (e2) {}
        }

        if (!el.classList.contains("hash-hit")) {
            el.classList.add("hash-hit");
        }

    })();
}


/* =====================================================
   TREE RENDERER
===================================================== */

function renderTree(DATA, ROOT_ID, urlBuilder, SOURCE, L) {

    var ROOT = document.getElementById(ROOT_ID);
    if (!ROOT) return;

    var visibleChildrenCount = Object.create(null);
    var i, f;

    for (i = 0; i < DATA.length; i++) {

        f = DATA[i];

        if (f.parentid !== -1 && f.visible === 1) {

            if (!visibleChildrenCount[f.parentid]) {
                visibleChildrenCount[f.parentid] = 0;
            }

            visibleChildrenCount[f.parentid]++;
        }
    }

    function build(parentId, level) {

        var html = "";
        var i, f;

        for (i = 0; i < DATA.length; i++) {

            f = DATA[i];

            if (f.parentid !== parentId) continue;
            if (parentId !== -1 && f.visible !== 1) continue;

            if (
                parentId === -1 &&
                !visibleChildrenCount[f.forumid] &&
                !(f.threadcount > 0 || f.replycount > 0)
            ) {
                continue;
            }

            var children = build(f.forumid, level + 1);
            var domId = "forum_" + SOURCE + f.forumid;

            if (parentId === -1) {

                html += window.tpl(FORUM_TREE_TPL.LEVEL1_TMPL, {
                    id       : domId,
                    title    : f.title,
                    toggle   : L.showforum,
                    children : children
                });

            } else {

                html += window.tpl(FORUM_TREE_TPL.ITEM_TMPL, {
                    id    : domId,
                    level : level,
                    title : f.title,
                    url   : urlBuilder(f.forumid),

                    meta  : window.tpl(FORUM_TREE_TPL.META_TMPL, {
                        threadsLabel : L.threads,
                        repliesLabel : L.replies,
                        threads      : f.threadcount || 0,
                        replies      : f.replycount || 0
                    }),

                    children : children
                });
            }
        }

        return html
            ? window.tpl(FORUM_TREE_TPL.UL_TMPL, {
                level : level,
                items : html
            })
            : "";
    }

    ROOT.innerHTML = build(-1, 1);
}


/* ================= ROOT TOGGLE ================= */

function enableRootToggle(L) {

    var roots = document.querySelectorAll("li.subforum.level1");
    var i;

    for (i = 0; i < roots.length; i++) {

        (function (root) {

            var bar  = root.querySelector("div.subforum_bar");
            if (!bar) return;

            /* IMPORTANT:
               same fix as jQuery version
            */
            var ul = root.querySelector("ul");
            if (!ul) return;

            var span = bar.querySelector("span");

            function toggle() {

                if (root.classList.contains("collapsed")) {

                    root.classList.remove("collapsed");
                    if (span) span.innerHTML = L.showforum;

                } else {

                    root.classList.add("collapsed");
                    if (span) span.innerHTML = L.hideforum;
                }

                /* repaint trick */
                ul.style.display = ul.style.display;

                document.body.style.zoom = "100%";
                document.body.style.zoom = "99%";
                document.body.style.zoom = "100%";
            }

            bar.addEventListener("click", toggle, false);

        })(roots[i]);
    }
}


/* ================= BOOT ================= */

wait(function () {

    var L = window.FORUM_TREE_LANG || {};
    var dir = L.dir || "rtl";

   
   
const html = document.documentElement;
const app = document.getElementById("app");

html.setAttribute("dir", dir);
html.classList.remove("rtl", "ltr");

app?.classList.remove("rtl", "ltr");
app?.classList.add(dir);
   
   
   
   
   
   
   
   

    ensureRootOnce(L);

    renderTree(
        window.INDEX_MN,
        "forums_mn",
        function (id) {
            return "index.php/forum_mn" + id + "/forum_mn" + id + ".html";
        },
        "mn",
        L
    );

    renderTree(
        window.INDEX_VB,
        "forums_vb",
        function (id) {
            return "index.php/forum_vb" + id + "/forum_vb" + id + ".html";
        },
        "vb",
        L
    );

    enableRootToggle(L);

     /* FORCE REPAINT */
    document.body.style.zoom = "100%";
    document.body.style.zoom = "99%";
    document.body.style.zoom = "100%";
    if (window.setBg) window.setBg("");

    setTimeout(function () {

        hideLoader();

        showApp();






            let resizeTimer = null;

            window.addEventListener("resize", () => {

                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(() => {
              
                    handleOrientationBr();

                }, 150);

            });

            // تشغيله أول مرة
            handleOrientationBr();







if(!detectDesktop()){
			   
			   

var barhex;
var thumhex;
/*if (read_Setting('NDmode', "day", 'all') == "night") {
 barhex= '#202442';
 thumhex = '#20618B';
}
else{
 barhex= '#E8E3C7';
 thumhex = '#888'; 
}
*/

window.scrollbars = window.scrollbars || {};
window.scrollbars['app'] = new CustomScrollbar('#app', {
  thumbMinHeight: 50,        // Minimum height of the scroll thumb
  scrollbarWidth: 15,        // Width of the scrollbar
  scrollbarBg: barhex,    // Background color of the scrollbar track
  thumbBg: thumhex,           // Color of the scroll thumb
  dragContent: false,         // Whether to allow dragging the content
  clickSuppressionDelay: 200,// Delay to suppress clicks after dragging
  arrowSize: 20,             // Size of the arrow buttons (height in pixels)
  scrollStep: 30,            // Reduced from 50 to 30 (smaller steps)
  scrollInterval: 100,       // Increased from 50 to 100ms (slower repetition)
  scrollAcceleration: true,  // New option for progressive speed
  accelerationRate: 1.2      // How much faster it gets over time      // Interval for continuous scrolling (ms)
});
			   
			   
			
}
 
toggle_drag();
           init_tool_Buttons();
  
           initAutoHideBar()




	document
  .querySelectorAll(".pz-bottom, .pz-top")
  .forEach(el => el.remove());
	
	
if (detectDesktop()) {
    document.querySelectorAll('.drag_button')
        .forEach(el => el.style.display = '');
}









        if (window.fixHashJump) {
            fixHashJump();
        }

    }, 200);

});
