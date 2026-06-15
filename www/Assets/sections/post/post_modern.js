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


/* =====================================================
   POST ENGINE (PURE ES6 – no jQuery)
   same logic / same flow
===================================================== */
(() => {

    /* =========================================
       WAIT FOR jQuery + DATA  (logic kept)
       (still checks window.jQuery exactly like your code)
    ========================================= */
    const wait = (fn) => {

        const app = document.getElementById("app");

        if (
            app &&
            window.RAW_JSON &&
            window.tpl &&
            window.POST_TEMPLATES &&
            window.LANG_COMMON &&
            window.POST_TEMPLATES &&
            window.FORUM_THREAD_NAV_TPL
			
        ) {
            fn(app);
        } else {
            setTimeout(() => wait(fn), 15);
        }
    };



    /* =========================================
       IMAM POSTS BAR
    ========================================= */
    const renderImamPosts = (imamposts, dir, threadid, lbl) => {

        if (!imamposts || !imamposts.length) return "";

        const list = imamposts;

        const currentPostId = window.location.hash ?
            window.location.hash.replace("#post_", "") :
            "";

        let html =
            '<div class="bar-wrap no_copy">' +
            '<div class="bar-label">' + lbl.imamposts + ':</div>' +
            '<div id="imamBar" class="bar imam-bar">';

        for (let j = 0; j < list.length; j++) {

            const p = list[j];

            const href = dir + "post_" + p.postid + ".html";

            const isCurrent = String(p.postid) === String(currentPostId);

            let cnt = "";

            if (p.postcount != null) {
                cnt = p.postcount;
            } else if (
                window.THREAD_JSON &&
                THREAD_JSON.postcounts &&
                THREAD_JSON.postcounts[p.postid] != null
            ) {
                cnt = THREAD_JSON.postcounts[p.postid];
            }

            html +=
                '<a id="post_' + p.postid + '" ' +
                'href="' + href + '" ' +
                'class="item' + (isCurrent ? " imamCurrent" : "") + '">' +
                "[" + cnt + "] " + p.postid +
                "</a>";

            if (j < list.length - 1) {
                html += '<span class="sep">|</span>';
            }
        }

        html +=
            "</div>" +
            "</div>";

        return html;
    };



    /* =========================================
       BOOT
    ========================================= */
    wait((app) => {

        const LANG = window.POST_TEMPLATES;
        const LANG_LBL = window.POST_LANG;

        document.documentElement
            .setAttribute("dir", LANG.dir);

        document.documentElement.classList.remove("rtl", "ltr");
        document.documentElement.classList.add(LANG.dir);



        const imamHtml = renderImamPosts(
            window.RAW_JSON.imamposts,
            getHtmlBasePath(),
            RAW_JSON.threadid,
            LANG_LBL
        );



var itemGroup = "";

if (RAW_JSON.forum_type != "vb") {
    itemGroup = POST_TEMPLATES.buildItemGroup(
        RAW_JSON,
        RAW_JSON.postid
    );
}



        const html = tpl(POST_TEMPLATES.page(), {
            title: RAW_JSON?.title || LANG_LBL.no_title,
            dateline: formatDate(RAW_JSON.dateline),
            content: RAW_JSON.long_text,
            username: RAW_JSON.username,
            userid: RAW_JSON.userid,
            usertitle: RAW_JSON.usertitle,
            postid: window.RAW_JSON.postid,
            threadid: window.RAW_JSON.threadid,
            postcount: RAW_JSON.postcount,
            thread: "thread_" + window.RAW_JSON.threadid + ".html",
            post: "post_" + window.RAW_JSON.postid + ".html",
            imamPosts: imamHtml,
            up: window.POST_UP_LINK || "#",
            itemGroup: itemGroup,
            up_text: window.LANG_COMMON.up,
            back_text: window.LANG_COMMON.back,
        });

        app.innerHTML = html;



        /* FORCE REPAINT (kept exactly) */
        document.body.style.zoom = "100%";
        document.body.style.zoom = "99%";
        document.body.style.zoom = "100%";
        setBg("");


        const cur = document.getElementById("post_" + window.RAW_JSON.postid);
        if (cur) cur.classList.add("imamCurrent");


        setTimeout(() => {

            showApp();
            hideLoader();




				    if(detectDesktop()){
			   
			   
			
	     }
		else{
			 
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
	





            enableDragScroll(".imam-bar");
            scrollCurrentItem(".imam-bar", ".imam-bar a.imamCurrent");
            setupUpPostButton();
            setupBackPostButton();




           handleCopyPost(".quote-copy-all", ".quote-content");
           handleCopyPost(".copy_post", ".postBody");
           handleCopyPost(".item-copy", ".item-text");
		   handleCopyPost(".copy-btn", ".copy-text");

            toggleMoreMenu(".more_butt");
            handleItemBoxToggle(".item-title");

            openPostInfoPanel("#more-info");
            closePostInfoPanel(".post-con-close, .post-con-close *");

            openMapPost_InfoPanel(".map_button, .map_button *");
            closeMapInfoPanel(".map-con-close, .map-con-close *");


            detectTextSelection(".postBody");
			toggle_drag();
            initQuoteButton(".quote_button");
            closeQuoteInfoPanel(".quote-con-close, .quote-con-close *");
            initQuickCopyButton(".quick_copy_button");
            closeAllMenus();
            initMinimize();

            init_tool_Buttons();
			
			
            let resizeTimer = null;

            window.addEventListener("resize", () => {

                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(() => {

                    scrollTopThenBack();
                    handleOrientationBr();

                }, 150);

            });

            // تشغيله أول مرة
            handleOrientationBr();


             initAutoHideBar();

            document.addEventListener("copy", (e) => {

                const postBody = document.documentElement; // <html>

                const removed = detachNoCopy(postBody);

                setTimeout(() => {
                    restoreNoCopy(removed);


                    scrollCurrentItem(".imam-bar", ".imam-bar a.imamCurrent");

    document
                        .querySelectorAll('.pz-bottom, .pz-top')
                        .forEach(el => el.remove());
                }, 0);

            });





    document
                        .querySelectorAll('.pz-bottom, .pz-top')
                        .forEach(el => el.remove());

if (detectDesktop()) {
    document.querySelectorAll('.drag_button')
        .forEach(el => el.style.display = '');
}







// طلب البيانات من parent
window.parent.postMessage({
    type: "GET_SEARCH_PARAMS"
}, "*");





















        }, 200);

    });

})();








var lastSearch = null;

window.addEventListener("message", function(e) {
    var data = e.data;

    if (data && data.type === "SEARCH_PARAMS") {

        var rhsearch = data.rhsearch;
        var hitid = data.hitid;

        // ✅ نفس البحث → فقط hit باستخدام runSearch
        if (lastSearch === rhsearch) {
            
			
			runSearch(rhsearch, hitid); // ← وضع hit فقط
            return;
        }

        // 🔄 بحث جديد
        lastSearch = rhsearch;

        buildIndexAsync(function() {
            runSearch(rhsearch, hitid);
        });
    }
});