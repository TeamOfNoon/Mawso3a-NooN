/* =====================================================
   FORUM TREE RENDERER – jQuery + ES3
   IE6 / CHM SAFE – fixed parent toggle
===================================================== */

/* ================= LOADER ================= */


/* ================= LOADER ================= */
function showLoader() {
    $(".loader-wrap").show();
}

function hideLoader() {
    $(".loader-wrap").hide();
}

function showApp() {
    $("#app").show();
}


/* ================= WAIT ================= */

function wait(fn) {

    if (
        document.body &&
        typeof window.tpl === "function" &&
        window.INDEX_MN &&
        window.INDEX_VB &&
        window.FORUM_TREE_TPL &&
        window.FORUM_TREE_LANG &&
		window.Global_FUN &&
        window.jQuery
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

    var $app = $("#app");
    if (!$app.length) $app = $("body");

    if (!$("#forums_root").length) {

        var containersHTML =
            '<div id="forums_mn"></div>' +
            '<hr id="forums_sep" />' +
            '<div id="forums_vb"></div>';

        var rootHTML = FORUM_TREE_TPL.root(containersHTML, L);

        var $root = $("<div></div>");
        $root.attr("id", "forums_root");
        $root.html(rootHTML);

        $app.append($root);
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
            if (el.scrollIntoView) el.scrollIntoView(true);
        } catch (e) {}

        if ((" " + el.className + " ").indexOf(" hash-hit ") === -1) {
            el.className += " hash-hit";
        }

    })();
}


/* =====================================================
   TREE RENDERER
===================================================== */

function renderTree(DATA, ROOT_ID, urlBuilder, SOURCE, L) {

    var $ROOT = $("#" + ROOT_ID);
    if (!$ROOT.length) return;

    var visibleChildrenCount = {};
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

    $ROOT.html(build(-1, 1));
}


/* ================= ROOT TOGGLE (FIXED) ================= */

function enableRootToggle(L) {

    $("li.subforum.level1").each(function () {

        var $root = $(this);

        var $bar = $root.find("div.subforum_bar").eq(0);
        if (!$bar.length) return;

        /* IMPORTANT FIX:
           do NOT use children("ul")
        */
        var $ul = $root.find("ul").eq(0);
        if (!$ul.length) return;

        var $span = $bar.find("span").eq(0);

        $bar.unbind("click.forumTree");

        $bar.bind("click.forumTree", function () {

            var cls = $root.attr("class") || "";

            if ((" " + cls + " ").indexOf(" collapsed ") !== -1) {

                cls = cls.replace(/\s*collapsed\b/, "");
                $root.attr("class", cls);

                if ($span.length) $span.html(L.showforum);

            } else {

                $root.attr("class", cls + " collapsed");

                if ($span.length) $span.html(L.hideforum);
            }

            /* same repaint trick as your working code */
            $ul[0].style.display = $ul[0].style.display;

            document.body.style.zoom = "100%";
            document.body.style.zoom = "99%";
            document.body.style.zoom = "100%";
        });
    });
}


/* ================= BOOT ================= */

wait(function () {

    var L = window.FORUM_TREE_LANG || {};
    var dir = L.dir || "rtl";

  var $html = $("html");
var $app = $("#app");

// Set dir attribute on html tag
$html.attr("dir", dir);

// Remove existing direction classes from html
$html.removeClass("rtl ltr");

// Add direction class to #app element
$app
    .removeClass("rtl ltr")
    .addClass(dir);

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

        showApp();
        hideLoader();






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
 
 
 
 
 
 
 
 
            handleOrientationBr();

            var lastWidth = 0;
            var zoomTimer = null;
            var zoomDelay = 700; // smoother delay (ms)

            GLOBAL_MONITOR.add(function() {

                var w = document.documentElement.clientWidth ||
                    document.body.clientWidth;

                if (!lastWidth) {
                    lastWidth = w;
                    return;
                }

                if (w !== lastWidth) {

                    lastWidth = w;

                    // ًں”¥ debounce (wait until zoom stops)
                    if (zoomTimer) {
                        clearTimeout(zoomTimer);
                    }

                    zoomTimer = setTimeout(function() {

                        if (isIE()) {
                            scrollTopThenBack();

                        }
                     handleOrientationBr();
                    }, zoomDelay);
                }

            });
 
 
 
 
 
 
 
 
 
toggle_drag();
$('.pz-bottom, .pz-top').remove();

if(detectDesktop()){
 $('.drag_button').show();
}



  if (isInIframe()) {
                      
					  sendUrl(window.location.href, document.title,true);
	
             }else{
				


		             sendMulti({
                                 url: window.location.href
                     });


				
			 } 


init_tool_Buttons();

initAutoHideBar();

if (window.fixHashJump) {
            fixHashJump();
}

    }, 200);

});
