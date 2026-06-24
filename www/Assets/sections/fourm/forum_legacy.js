/* =====================================================
   LOADER
===================================================== */
function showLoader() {
    $(".loader-wrap").show();
}

function hideLoader() {
    $(".loader-wrap").hide();
}

function showApp() {
    $("#app").show();
}

/* =====================================================
   DIR DETECTION
===================================================== */
function detectDir() {
    var html = document.documentElement;
    return (
        html.getAttribute("dir") ||
        html.dir ||
        ((" " + html.className + " ").indexOf(" rtl ") !== -1 ? "rtl" : "ltr")
    ).toLowerCase();
}

/* =====================================================
   MAIN MODULE (ES3 + jQuery SAFE)
===================================================== */
(function() {

    /* =====================================================
       WAIT
    ===================================================== */
    function wait(fn) {
        if (
            document.getElementById("app") &&
			window.LANG_COMMON &&
            window.FORUM_LANG &&
            window.FORUM_TEMPLATES &&
            window.STICKY_DESC &&
            window.STICKY_ASC &&
            window.THREADS_DESC &&
            window.THREADS_ASC &&
            window.jQuery &&
            window.$ &&
			window.FORUM_THREAD_NAV_TPL &&
            window.tpl
        ) {
            fn();
        } else {
            setTimeout(function() {
                wait(fn);
            }, 15);
        }
    }



    /* =====================================================
           IMAM POSTS
    ===================================================== */
    function renderImamPosts(imamposts, dir, threadid, LANG) {

        if (!imamposts) return "";

        var list;
        try {
            list = $.parseJSON(imamposts);
        } catch (e) {
            return "";
        }

        if (!list || !list.length) return "";

        var html =
            '<div class="imamPosts"><b>' +
            LANG.imamPosts +
            '</b> ';

        $.each(list, function(i, p) {

            var href =
                (p.page && p.page > 1) ?
                dir + "thread_" + threadid + "_pa_" + p.page + ".html#post_" + p.postid :
                dir + "thread_" + threadid + ".html#post_" + p.postid;

            html += '<a href="' + href + '">' + p.postid + '</a>';

            if (i < list.length - 1) html += " | ";
        });

        return html + "</div>";
    }



 /* =====================================================
       PAGINATION (FORUM)
    ===================================================== */
    function renderPagination(page, pages, LANG) {

        var $boxes = $(".pagination");
        var $wraps = $boxes.closest(".page_bar");

        if (!$boxes.length || pages <= 1) {
            $boxes.html("").hide();
            $wraps.hide();
            return;
        }

        $wraps.show();
        $boxes.show();

        var STR = LANG;

        var base = getForumBaseName();

        var nums = "";
        var p, href;

        if (page < 1) page = 1;

        for (p = 1; p <= pages; p++) {

            if (p === 1) {
                href = base + ".html";
            } else {
                href = base + "_pa_" + p + ".html";
            }

            nums +=
                '<a class="pageBtn' +
                (p === page ? ' active' : '') +
                '" href="' + href + '">' +
                p +
                '</a>';
        }

        var first = "";
        var prev = "";
        var next = "";
        var last = "";

        if (page > 1) {
            first =
                '<a class="navBtn firstBtn" href="' + base + '.html">' +
                STR.first +
                '</a>';
        }

        if (page > 1) {

            if (page === 2) {
                href = base + ".html";
            } else {
                href = base + "_pa_" + (page - 1) + ".html";
            }

            prev =
                '<a class="navBtn prevBtn" href="' + href + '">' +
                STR.prev +
                '</a>';
        }

        if (page < pages) {

            href = base + "_pa_" + (page + 1) + ".html";

            next =
                '<a class="navBtn nextBtn" href="' + href + '">' +
                STR.next +
                '</a>';
        }

        if (page < pages) {

            href = base + "_pa_" + pages + ".html";

            last =
                '<a class="navBtn lastBtn" href="' + href + '">' +
                STR.last +
                '</a>';
        }

        var html = '' +
            '<div class="pageNums">' +
            nums +
            '</div>' +
            '<div class="pageBar">' +
            first +
            prev +
            next +
            last +
            '</div>';

        $boxes.html(html);
    }

    /* =====================================================
       THREAD PAGES
    ===================================================== */
    function renderThreadPagination(thread, dir, LANG) {

        var PER_PAGE = 10;

        var replies = parseInt(thread.replycount, 10) || 0;
        var pages = Math.ceil((replies + 1) / PER_PAGE);

        if (pages <= 1) return "";

        var html = '<span class="threadPages"><i class="demo-icon icon-pages-icon"></i>';
        var p, href;

        for (p = 1; p <= pages; p++) {

            href =
                (p === 1) ?
                dir + "thread_" + thread.threadid + ".html" :
                dir + "thread_" + thread.threadid + "_pa_" + p + ".html";

            html +=
                '<a class="threadPageBtn" href="' +
                href +
                '">' +
                p +
                '</a>';
        }

        html += '</span>';

        return html;
    }


    /* =====================================================
       STATE
    ===================================================== */
    var state = {
        order: "DESC"
    };
    var renderForum;

    /* =====================================================
       ORDER
    ===================================================== */
   function setOrder(mode, LANG) {
    state.order = mode || "DESC";

    $(".orderBtn").each(function() {
        var $btn = $(this);
        $btn.toggleClass("active", $btn.data("order") === state.order);
    });

    renderForum(
        state.order === "ASC" ? window.STICKY_ASC : window.STICKY_DESC,
        state.order === "ASC" ? window.THREADS_ASC : window.THREADS_DESC,
        LANG
    );

    /* 🔁 إعادة ربط السحب بعد إعادة البناء */
    enableDragScroll(".pageNums");
    scrollCurrentItem(".pageNums", ".pageBtn.active");
}


    /* =====================================================
       BOOT
    ===================================================== */
    wait(function() {

        var LANG = window.FORUM_LANG;
        var TPL = window.FORUM_TEMPLATES;

        $("html")
            .attr("dir", LANG.dir)
            .removeClass("rtl ltr")
            .addClass(LANG.dir);

        var $app = $("#app");

        $app.html(
            tpl(TPL.page(), {
                forumTitle: window.FORUM_THREADS.forumtitle || "",
                forumPage: window.FORUM_THREADS.page > 1 ?
                    "_pa_" + window.FORUM_THREADS.page : "",
                pageWrap: (window.FORUM_THREADS.pages > 1) ?
                    " [" + LANG.pagelbl + window.FORUM_THREADS.page + "]" : "",
					up_text: window.LANG_COMMON.up,
	            back_text: window.LANG_COMMON.back,
                base: getForumBaseName()
            })
        );

        $app.find(".orderBtn").on("click", function() {
            setOrder($(this).data("order"), LANG);
        });


        /* =====================================================
           RENDER
        ===================================================== */
        renderForum = function(stickyData, threadData, LANG) {

            var dir = getForumDirPath();

            var PER_PAGE = 20;

            var stickyCount =
                stickyData && stickyData.sticky && threadData.page === 1 ?
                stickyData.sticky.length :
                0;

            var pageIndexBase =
                (threadData.page - 1) * PER_PAGE;

            if (threadData.page === 1 && stickyCount > 0) {

                $("#stickyTitle").show();
                $("#sticky").show();

                $("#sticky").html(
                    $.map(stickyData.sticky, function(t, i) {
                        return tpl(
                            TPL.stickyTpl,
                            $.extend({}, t, {
                                dir: dir,
                                index: i + 1,
                                dateline: formatDate(t.dateline),
                                imamposts_html: renderImamPosts(t.imamposts, dir, t.threadid, LANG),
                                thread_pages_html: renderThreadPagination(t, dir, LANG)
                            })
                        );
                    }).join("")
                );

            } else {
                $("#stickyTitle").hide();
                $("#sticky").hide().html("");
            }

            pageIndexBase =
                (threadData.page - 1) * PER_PAGE;

            $("#list").html(
                $.map(threadData.threads, function(t, i) {

                    var idx = pageIndexBase + i + 1;

                    return tpl(
                        TPL.threadTpl,
                        $.extend({}, t, {
                            dir: dir,
                            index: idx,
                            dateline: formatDate(t.dateline),
                            imamposts_html: renderImamPosts(t.imamposts, dir, t.threadid, LANG),
                            thread_pages_html: renderThreadPagination(t, dir, LANG)
                        })
                    );
                }).join("")
            );

            renderPagination(threadData.page, threadData.pages, LANG);
        };


        renderForum(window.STICKY_DESC, window.THREADS_DESC, LANG);


        document.body.style.zoom = "100%";
        document.body.style.zoom = "99%";
        document.body.style.zoom = "100%";



			 

			showApp();
	
        setTimeout(function() {

            
            hideLoader();
			
			
			
		 enableDragScroll(".pageNums");
     
			
			
		setOrder("DESC", LANG);
        setupUpForumButton();
        setupBackForumButton();
		













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



       openMapForum_InfoPanel_jq(".map_button, .map_button *");
       closeMapInfoPanel_jq(".map-con-close, .map-con-close *");






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
           init_tool_Buttons();
  
           initAutoHideBar()
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





		fixHashJump();
			
    scrollCurrentItem(".pageNums", ".pageBtn.active");


        }, 10);

    });

})();