 init_tool_Buttons();
  


  initAutoHideBar()/* =====================================================
   LOADER
===================================================== */
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
   DIR DETECTION
===================================================== */
const detectDir = () => {

    const html = document.documentElement;

    return (
        html.getAttribute("dir") ||
        html.dir ||
        ((" " + html.className + " ").indexOf(" rtl ") !== -1 ? "rtl" : "ltr")
    ).toLowerCase();
};


/* =====================================================
   MAIN MODULE (PURE ES6)
===================================================== */
(() => {

    /* =====================================================
       WAIT
    ===================================================== */
    const wait = (fn) => {

        if (
            document.getElementById("app") &&
            window.FORUM_LANG &&
            window.FORUM_TEMPLATES &&
            window.STICKY_DESC &&
            window.STICKY_ASC &&
            window.THREADS_DESC &&
            window.THREADS_ASC &&
			window.FORUM_THREAD_NAV_TPL &&
            window.tpl
        ) {
            fn();
        } else {
            setTimeout(() => wait(fn), 15);
        }
    };


    /* =====================================================
       IMAM POSTS
    ===================================================== */
    const renderImamPosts = (imamposts, dir, threadid, LANG) => {

        if (!imamposts) return "";

        let list;

        try {
            list = JSON.parse(imamposts);
        } catch (e) {
            return "";
        }

        if (!list || !list.length) return "";

        let html =
            `<div class="imamPosts"><b>${LANG.imamPosts}</b> `;

        list.forEach((p, i) => {

            const href =
                (p.page && p.page > 1)
                    ? `${dir}thread_${threadid}_pa_${p.page}.html#post_${p.postid}`
                    : `${dir}thread_${threadid}.html#post_${p.postid}`;

            html += `<a href="${href}">${p.postid}</a>`;

            if (i < list.length - 1) html += " | ";
        });

        return html + "</div>";
    };


  /* =====================================================
       PAGINATION (FORUM)
    ===================================================== */
    const renderPagination = (page, pages, LANG) => {

        const boxes = document.querySelectorAll(".pagination");
        if (!boxes.length || pages <= 1) {

            boxes.forEach(b => b.style.display = "none");
            document.querySelectorAll(".page_bar")
                .forEach(w => w.style.display = "none");

            return;
        }

        const wraps = [];
        boxes.forEach(b => {
            const w = b.closest(".page_bar");
            if (w && wraps.indexOf(w) === -1) wraps.push(w);
        });

        wraps.forEach(w => w.style.display = "");
        boxes.forEach(b => b.style.display = "");

        const STR  = LANG;
        const base = getForumBaseName();

        let nums = "";
        let href;

        if (page < 1) page = 1;

        for (let p = 1; p <= pages; p++) {

            href = (p === 1)
                ? `${base}.html`
                : `${base}_pa_${p}.html`;

            nums +=
                `<a class="pageBtn${p === page ? " active" : ""}" href="${href}">${p}</a>`;
        }

        let first = "";
        let prev  = "";
        let next  = "";
        let last  = "";

        if (page > 1) {
            first =
                `<a class="navBtn firstBtn" href="${base}.html">
                ${STR.first}</a>`;
        }

        if (page > 1) {

            href = (page === 2)
                ? `${base}.html`
                : `${base}_pa_${page - 1}.html`;

            prev =
                `<a class="navBtn prevBtn" href="${href}">
                ${STR.prev}</a>`;
        }

        if (page < pages) {

            href = `${base}_pa_${page + 1}.html`;

            next =
                `<a class="navBtn nextBtn" href="${href}">
                ${STR.next}</a>`;
        }

        if (page < pages) {

            href = `${base}_pa_${pages}.html`;

            last =
                `<a class="navBtn lastBtn" href="${href}">
                ${STR.last}</a>`;
        }

        const html = `
            <div class="pageNums">${nums}</div>
            <div class="pageBar">${first}${prev}${next}${last}</div>
        `;

        boxes.forEach(b => b.innerHTML = html);
    };

    /* =====================================================
       THREAD PAGES
    ===================================================== */
    const renderThreadPagination = (thread, dir, LANG) => {

        const PER_PAGE = 10;

        const replies = parseInt(thread.replycount, 10) || 0;
        const pages   = Math.ceil((replies + 1) / PER_PAGE);

        if (pages <= 1) return "";

        let html =
            `<span class="threadPages"><i class="demo-icon icon-pages-icon"></i>`;

        for (let p = 1; p <= pages; p++) {

            const href =
                (p === 1)
                    ? `${dir}thread_${thread.threadid}.html`
                    : `${dir}thread_${thread.threadid}_pa_${p}.html`;

            html += `<a class="threadPageBtn" href="${href}">${p}</a>`;
        }

        return html + "</span>";
    };


    /* =====================================================
       STATE
    ===================================================== */
    const state = { order: "DESC" };
    let renderForum = null;


    /* =====================================================
       ORDER
    ===================================================== */
    const setOrder = (mode, LANG) => {

        state.order = mode || "DESC";

        document.querySelectorAll(".orderBtn").forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.order === state.order
            );
        });

        renderForum(
            state.order === "ASC" ? window.STICKY_ASC  : window.STICKY_DESC,
            state.order === "ASC" ? window.THREADS_ASC : window.THREADS_DESC,
            LANG
        );

        enableDragScroll(".pageNums");
        scrollCurrentItem(".pageNums", ".pageBtn.active");
    };


    /* =====================================================
       BOOT
    ===================================================== */
    wait(() => {

        const LANG = window.FORUM_LANG;
        const TPL  = window.FORUM_TEMPLATES;

        const html = document.documentElement;

        html.setAttribute("dir", LANG.dir);
        html.classList.remove("rtl", "ltr");
        html.classList.add(LANG.dir);

        const app = document.getElementById("app");

        app.innerHTML = tpl(TPL.page(), {
            forumTitle : window.FORUM_THREADS.forumtitle || "",
            forumPage  : window.FORUM_THREADS.page > 1
                            ? "_pa_" + window.FORUM_THREADS.page
                            : "",
            pageWrap   : window.FORUM_THREADS.pages > 1
                            ? " [" + LANG.pagelbl + window.FORUM_THREADS.page + "]"
                            : "",
            base       : getForumBaseName(),
			up_text: window.LANG_COMMON.up,
			back_text: window.LANG_COMMON.back,
        });


        app.querySelectorAll(".orderBtn").forEach(btn => {
            btn.addEventListener("click", () => {
                setOrder(btn.dataset.order, LANG);
            });
        });


        /* =====================================================
           RENDER
        ===================================================== */
        renderForum = (stickyData, threadData, LANG) => {

            const dir = getForumDirPath();
            const PER_PAGE = 20;

            const stickyCount =
                stickyData &&
                stickyData.sticky &&
                threadData.page === 1
                    ? stickyData.sticky.length
                    : 0;

            let pageIndexBase =
                (threadData.page - 1) * PER_PAGE;


            const stickyTitle = document.getElementById("stickyTitle");
            const stickyBox   = document.getElementById("sticky");

            if (threadData.page === 1 && stickyCount > 0) {

                if (stickyTitle) stickyTitle.style.display = "";
                if (stickyBox)   stickyBox.style.display   = "";

                stickyBox.innerHTML =
                    stickyData.sticky.map((t, i) => {

                        return tpl(
                            TPL.stickyTpl,
                            Object.assign({}, t, {
                                dir,
                                index : i + 1,
                                dateline : formatDate(t.dateline),
                                imamposts_html :
                                    renderImamPosts(t.imamposts, dir, t.threadid, LANG),
                                thread_pages_html :
                                    renderThreadPagination(t, dir, LANG)
                            })
                        );

                    }).join("");

            } else {

                if (stickyTitle) stickyTitle.style.display = "none";
                if (stickyBox) {
                    stickyBox.style.display = "none";
                    stickyBox.innerHTML = "";
                }
            }


            pageIndexBase =
                (threadData.page - 1) * PER_PAGE;

            const listBox = document.getElementById("list");

            listBox.innerHTML =
                threadData.threads.map((t, i) => {

                    const idx = pageIndexBase + i + 1;

                    return tpl(
                        TPL.threadTpl,
                        Object.assign({}, t, {
                            dir,
                            index : idx,
                            dateline : formatDate(t.dateline),
                            imamposts_html :
                                renderImamPosts(t.imamposts, dir, t.threadid, LANG),
                            thread_pages_html :
                                renderThreadPagination(t, dir, LANG)
                        })
                    );

                }).join("");


            renderPagination(threadData.page, threadData.pages, LANG);
        };


        renderForum(window.STICKY_DESC, window.THREADS_DESC, LANG);


        document.body.style.zoom = "100%";
        document.body.style.zoom = "99%";
        document.body.style.zoom = "100%";


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
	




    let resizeTimer = null;

            window.addEventListener("resize", () => {

                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(() => {
              
                    handleOrientationBr();

                }, 150);

            });

            // تشغيله أول مرة
            handleOrientationBr();



            enableDragScroll(".pageNums");
            scrollCurrentItem(".pageNums", ".pageBtn.active");

            setOrder("DESC", LANG);

            setupUpForumButton();
            setupBackForumButton();





            openMapForum_InfoPanel(".map_button, .map_button *");
             closeMapInfoPanel(".map-con-close, .map-con-close *");


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







            fixHashJump();

        }, 200);

    });

})();
