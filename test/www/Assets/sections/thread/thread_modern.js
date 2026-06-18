(() => {

/* ================= LOADER ================= */
function showLoader() {
  const el = document.querySelector(".loader-wrap");
  if (el) el.style.display = "block";
}

function hideLoader() {
  const el = document.querySelector(".loader-wrap");
  if (el) el.style.display = "none";
}

function showApp() {
  const el = document.getElementById("app");
  if (el) el.style.display = "block";
}


/* =====================================================
   WAIT FOR EVERYTHING
===================================================== */
function wait(fn) {
  if (
    document.getElementById("app") &&
    window.THREAD &&
    window.THREAD.thread_data &&
    window.THREAD.thread_data.length &&
    window.tpl &&
    window.FORUM_THREAD_NAV_TPL &&
    window.THREAD_TEMPLATES
  ) {
    fn();
  } else {
    setTimeout(() => wait(fn), 15);
  }
}


/* =====================================================
   PATH HELPERS
===================================================== */
function getThreadDirPath() {
  const href = location.href.split("#")[0].split("?")[0];
  return href.replace(/[^\/\\]+$/, "");
}

function getThreadBaseName() {
  return location.href
    .split("#")[0]
    .split("?")[0]
    .replace(/^.*[\/\\]/, "")
    .replace(/_pa_\d+/, "")
    .replace(/\.html$/, "");
}

function getForumTypeFromPath() {
  const path = window.location.pathname;
  if (path.indexOf("forum_mn") !== -1) return "mn";
  if (path.indexOf("forum_vb") !== -1) return "vb";
  return "";
}





/* =====================================================
   DATE FORMAT
===================================================== */
function formatDate(dateline) {
  const d = new Date(dateline * 1000);

  const saudiOffset = 3;
  const localOffset = -d.getTimezoneOffset() / 60;
  d.setHours(d.getHours() + (saudiOffset - localOffset));

  const pad = n => (n < 10 ? "0" + n : n);

  const day   = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year  = d.getFullYear();

  const h24 = d.getHours();
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 || 12;

  return (
    day + "-" + month + "-" + year +
    " - " + pad(h12) + ":" + pad(d.getMinutes()) + " " + ampm
  );
}


/* =====================================================
   CLEAR OLD MARKS
===================================================== */
function clearPostMarks() {
  document.querySelectorAll(".imamCurrent,.hash-hit").forEach(el => {
    el.classList.remove("imamCurrent");
    el.classList.remove("hash-hit");
  });
}



/* =====================================================
   PAGINATION (BAR STYLE – THREAD – PURE ES6)
===================================================== */
function renderPagination(page, pages) {

  const boxes = document.querySelectorAll(".pagination");

  // إخفاء الغلاف كله
  const wraps = [];
  boxes.forEach(box => {
    const w = box.closest(".page_bar");
    if (w && wraps.indexOf(w) === -1) wraps.push(w);
  });

  if (!boxes.length || pages <= 1) {
    boxes.forEach(b => {
      b.innerHTML = "";
      b.style.display = "none";
    });
    wraps.forEach(w => w.style.display = "none");
    return;
  }

  wraps.forEach(w => w.style.display = "");
  boxes.forEach(b => b.style.display = "");

  const STR  = window.THREAD_TEMPLATES.labels;
  const base = getThreadBaseName();

  let nums = "";
  let href;

  if (page < 1) page = 1;

  /* ===== NUMBERS BAR ===== */
  for (let p = 1; p <= pages; p++) {

    if (p === 1) {
      href = base + ".html";
    } else {
      href = base + "_pa_" + p + ".html";
    }

    nums +=
      `<a class="pageBtn${p === page ? " active" : ""}" href="${href}">${p}</a>`;
  }

  /* ===== FIRST / PREV / NEXT / LAST ===== */

  let first = "";
  let prev  = "";
  let next  = "";
  let last  = "";

  /* FIRST */
  if (page > 1) {
    first =
      `<button type="button" class="navBtn firstBtn"
        onclick="location.href='${base}.html'">${STR.first}</button>`;
  }

  /* PREV */
  if (page > 1) {

    if (page === 2) {
      href = base + ".html";
    } else {
      href = base + "_pa_" + (page - 1) + ".html";
    }

    prev =
      `<button type="button" class="navBtn prevBtn"
        onclick="location.href='${href}'">${STR.prev}</button>`;
  }

  /* NEXT */
  if (page < pages) {

    href = base + "_pa_" + (page + 1) + ".html";

    next =
      `<button type="button" class="navBtn nextBtn"
        onclick="location.href='${href}'">${STR.next}</button>`;
  }

  /* LAST */
  if (page < pages) {

    href = base + "_pa_" + pages + ".html";

    last =
      `<button type="button" class="navBtn lastBtn"
        onclick="location.href='${href}'">${STR.last}</button>`;
  }

  /* ===== FINAL HTML ===== */

  const html =
    `<div class="pageNums">
       ${nums}
     </div>
     <div class="pageBar">
       ${first}${prev}${next}${last}
     </div>`;

  boxes.forEach(b => {
    b.innerHTML = html;
  });
}





/* =====================================================
   RENDER IMAM POSTS
===================================================== */
function renderImamPosts(imamposts, dir, threadid, lbl) {

  if (!imamposts || !Array.isArray(imamposts) || !imamposts.length)
    return "";

  const list = imamposts;

  const currentPostId =
    location.hash.replace("#post_", "");

  let html = `
    <div class="bar-wrap no_copy">
      <div class="bar-label">${lbl.labels.imamposts}:</div>
      <div id="imamBar" class="bar imam-bar">
  `;

  for (let j = 0; j < list.length; j++) {

    const p = list[j];

    const href = (p.page && p.page > 1)
      ? `${dir}thread_${threadid}_pa_${p.page}.html#post_${p.postid}`
      : `${dir}thread_${threadid}.html#post_${p.postid}`;

    const isCurrent = String(p.postid) === String(currentPostId);

    let cnt = "";

    /* primary (inside imamposts itself) */
    if (p.postcount != null) {
      cnt = p.postcount;
    }
    /* fallback safety */
    else if (window.THREAD_JSON &&
             THREAD_JSON.postcounts &&
             THREAD_JSON.postcounts[p.postid] != null) {

      cnt = THREAD_JSON.postcounts[p.postid];
    }

    html += `
      <a id="post-${p.postid}"
         href="${href}"
         class="item${isCurrent ? " imamCurrent" : ""}">
        [${cnt}] ${p.postid}
      </a>
    `;

    if (j < list.length - 1) {
      html += `<span class="sep">|</span>`;
    }
  }

  html += `
      </div>
    </div>
  `;

  return html;
}







/* =====================================================
   BOOT
===================================================== */
wait(() => {





    let resizeTimer = null;

            window.addEventListener("resize", () => {

                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(() => {
              
                    handleOrientationBr();

                }, 150);

            });

            // تشغيله أول مرة
            handleOrientationBr();



 

  const LANG = window.THREAD_TEMPLATES;
  document.documentElement.setAttribute("dir", LANG.dir);
  document.getElementById("app").className = LANG.dir;

  const app   = document.getElementById("app");
  const posts = window.THREAD.thread_data;
  let htmlPosts = "";

  for (let i = 0; i < posts.length; i++) {
    htmlPosts += tpl(
      window.THREAD_TEMPLATES.post(),
      {
        postid: posts[i].postid,
        title: posts[i].title,
        username: posts[i].username,
		postcount:posts[i].postcount,
        userid: posts[i].userid,
        usertitle: posts[i].usertitle,
        dateline: formatDate(posts[i].dateline),
        body: posts[i].long_text,
        itemGroup: (THREAD.forum_type == "vb")
    ? ""
    : THREAD_TEMPLATES.buildItemGroup(posts[i], posts[i].postid)
      }
    );
  }

  const imamHtml = renderImamPosts(
    THREAD.imamposts,
    getThreadDirPath(),
    THREAD.thread_id,
    LANG
  );


  app.innerHTML = tpl(
    window.THREAD_TEMPLATES.page(),
    {
      thread_title: THREAD.thread_title,
      posts: htmlPosts,
      forumid: THREAD.forum_id,
      type:  window.THREAD.FORUM_TYPE,
      tpage: window.THREAD.THREAD_PAGE,

      pageWrap:
  (window.THREAD.THREAD_PAGES > 1)
    ? " [" + THREAD_TEMPLATES.labels.pagelbl + window.THREAD.THREAD_PAGE + "]"
    : "",

threadPage:
  (window.THREAD.THREAD_PAGE > 1)
    ? "_pa_" + window.THREAD.THREAD_PAGE
    : "",
		  
	  up_text: window.LANG_COMMON.up,
	  back_text: window.LANG_COMMON.back,

      imamPosts: imamHtml
    }
  );



;

  /* FORCE REPAINT */
  document.body.style.zoom = "100%";
  document.body.style.zoom = "99%";
  document.body.style.zoom = "100%";


  setupBackThreadButton();
  setupUpThreadButton();


  
  
  
  setTimeout(() => {

    showApp();
    hideLoader();
	 renderPagination(
      window.THREAD.thread_page || 1,
      window.THREAD.thread_pages || 1
    );
	
	
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
	
	
	
	
	
	
	
	
	
	


	enableDragScroll(".pageNums");
	enableDragScroll(".imam-bar");

	/* ✅ هنا فقط */
  scrollCurrentItem(".pageNums", ".pageNums a.active");
  scrollCurrentItem(".imam-bar", ".imam-bar a.imamCurrent");
	
  handleCopyPost(".quote-copy-all", ".quote-content");
  handleCopyPost(".postBtnCopy", ".postBody");
  handleCopyPost(".item-copy", ".item-text");
	
  initImamBarHandler();
  handleItemBoxToggle(".item-title");
  
  openMapThread_InfoPanel(".map_button, .map_button *");
  closeMapInfoPanel(".map-con-close, .map-con-close *");
  
  initQuoteButton(".quote_button");
  closeQuoteInfoPanel(".quote-con-close, .quote-con-close *");
  initQuickCopyButton(".quick_copy_button");
  initMinimize();
  
  detectTextSelection(".postBody");
  toggle_drag();
  init_tool_Buttons();
  


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
