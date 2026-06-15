/* =====================================================
   THREAD / POST ITEM TEMPLATES
   PURE ES6
   all labels from THREAD_LANG
===================================================== */

window.THREAD_TEMPLATES = (() => {

    const L = window.THREAD_LANG;
    const common = window.LANG_COMMON;
    /* =====================================================
       ITEM BOX HELPERS
    ===================================================== */





const mapConHTML = (THREAD) => `
<div class="map-con-info">
  <div class="child-post-con-info">

    <button class="map-con-close" unselectable="on">
      X ${common.close}
    </button><br>

    <div class="post-list-button" data-copy>
      <span>${common.home}<br></span>
    </div>

    <i class="demo-icon icon-down-big"></i>

    <div class="post-list-button" data-copy>
      <span>
        ${common.forum}: ${THREAD.forum_type}${THREAD.forum_id}<br>
        <span class="copy-text">${THREAD.forum_title}</span>
      </span>
    </div>

    <i class="demo-icon icon-down-big"></i>
    <i class="demo-icon icon-down-big"></i>

    <div class="post-list-button" data-copy>
      <span class="you_here">${common.you_here}</span>
      <span>
        ${common.thread}: ${THREAD.thread_id}<br>
        <span class="copy-text">${THREAD.thread_title}</span>
      </span>
    </div>

    <i class="demo-icon icon-down-big"></i>
    <i class="demo-icon icon-down-big"></i>
    <i class="demo-icon icon-down-big"></i>

    <div class="post-list-button" data-copy>
      <span>${common.post}</span>
    </div>

  </div>
</div>
`;





    const buildSimpleBox = (type, title, url) => (
        `<br class="${type}"><div class="item-box newline" data-type="${type}">
            <div class="item-title">
                <span class="toggle-sign no_copy">[-]</span> ${title}
                <span class="no_copy">&nbsp;&nbsp;&nbsp;</span><br>
            </div>
            <span class="item-body"><hr>
                <span class="item-text">${url}</span>
                <a class="item-go no_copy" href="${url}" target="_blank">${L.go_to_link}</a>
                <a class="item-copy no_copy" href="javascript:void(0);">${L.copy_link}</a>
            </span>
        </div>`
    );


    const buildCodeBox = (type, title, html) => (
        `<br class="${type}"><div class="item-box newline" data-type="${type}">
            <div class="item-title">
                <span class="toggle-sign no_copy">[-]</span> ${title}
                <span>&nbsp;&nbsp;&nbsp;</span><br>
            </div>
            <span class="item-body"><hr>
                <span class="item-text">${html}</span>
                <a class="item-copy no_copy" href="javascript:void(0);">${L.copy_link}</a>
            </span>
        </div>`
    );


    const buildItemGroup = (RAW_JSON, postId) => {

        if (!RAW_JSON && window.RAW_JSON)
		{
            RAW_JSON = window.RAW_JSON;
        }

        let html = "";

        /* ---------------- ORIGINAL THREAD ---------------- */

        let tid = null;







if (RAW_JSON?.long_text) {

    const header = getStringBetween(RAW_JSON.long_text);

    if (header) {

        let rows = "";

        // Require REAL DATE (Hijri OR Gregorian)
        const hasRealDate = header.higri || header.meladi;

        if (hasRealDate) {


            if (header.imam)
                rows += `${header.imam}<br>`;
			
            if (header.label)
                rows += `${header.label}<br>`;

            if (header.higri)
                rows += `${header.higri}<br>`;

            if (header.meladi)
                rows += `${header.meladi}<br>`;

            if (header.time)
                rows += `${header.time}<br>`;

            if (header.note)
                rows += `${header.note}`;
        }
         
		 
        if (rows) {
            //rows = stripDivFromHTML(rows);
            html += `
                <br class="date">
                <div class="item-box newline" data-type="date">
                    <div class="item-title">
                        <span class="toggle-sign no_copy">[-]</span>
                        ${L.date_src}
                        <span class="no_copy">&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                    </div>
                    <span class="item-body">
                        <hr class="no_copy">
                        <span class="item-text">${rows}</span>
                    </span>
                </div>
            `;

        } else {

            html += `
                <br class="date no_copy">
                <div class="item-box newline no_copy no_info" data-type="date">
                    <div class="item-title">
                        <span class="toggle-sign no_copy">[-]</span>
                        ${L.date_src}
                        <span class="no_copy">&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                    </div>
                    <span class="item-body">
                        <hr class="no_copy">
                        <span class="item-text">--${L.nothing}--</span>
                    </span>
                </div>
            `;
        }
    }
}






       

        /* ---------------- ORIGINAL POST ---------------- */

        if (RAW_JSON?.postid || postId) {

            const pid = RAW_JSON?.postid || postId;
            const po  = `https://nasser-alyamani.org/showthread.php?p=${pid}`;

            html += buildSimpleBox("post", L.org_post, po);
        }





        if (RAW_JSON?.threadid) {
            tid = RAW_JSON.threadid;
        } else if (window.THREAD_JSON?.threadid) {
            tid = window.THREAD_JSON.threadid;
        }

        if (tid) {
            const th = `https://nasser-alyamani.org/showthread.php?t=${tid}`;
            html += buildSimpleBox("thread", L.org_thread, th);
        }



               /* video */
        if (RAW_JSON?.video) {
            html += buildSimpleBox("video", L.video, RAW_JSON.video);
        }
		else {

    html += `
        <br class="video no_copy">
        <div class="item-box newline no_copy no_info" data-type="video">
            <div class="item-title">
                <span class="toggle-sign no_copy">[-]</span>
                ${L.video}
                <span class="no_copy">&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
            </div>
            <span class="item-body">
                <hr class="no_copy">
                <span class="item-text">--${L.nothing}--</span>
            </span>
        </div>
    `;

}


        /* audio */
        if (RAW_JSON?.audio) {
            html += buildSimpleBox("audio", L.audio, RAW_JSON.audio);
        }
		else {

    html += `
        <br class="audio no_copy">
        <div class="item-box newline no_copy no_info" data-type="audio">
            <div class="item-title">
                <span class="toggle-sign no_copy">[-]</span>
                ${L.audio}
                <span class="no_copy">&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
            </div>
            <span class="item-body">
                <hr class="no_copy">
                <span class="item-text">--${L.nothing}--</span>
            </span>
        </div>
    `;

}

     
	 
	 /* langs */
        if (RAW_JSON && RAW_JSON.langs) {

            let list = null;

            try {
                list = JSON.parse(RAW_JSON.langs);
            } catch (e) {}

            if (Array.isArray(list) && list.length) {

                let rows = "";

                list.forEach(it => {

                    if (!it || !it.postId) return;

                    const lp = `https://nasser-alyamani.org/showthread.php?p=${it.postId}`;

                    rows += `
                <br><div class="item-row">
                    <div class="item-title">${it.title}<br></div>
                    <span class="item-text">${lp}</span>
                    <a class="item-go no_copy" href="${lp}" target="_blank">${L.go_to_link}</a>
                    <a class="item-copy no_copy" href="javascript:void(0);">${L.copy_link}</a>
                </div>
            `;
                });

                if (rows) {

                    html += `
                <br class="lang"><div class="item-box newline" data-type="lang">
                    <div class="item-title">
                        <span class="toggle-sign no_copy">[-]</span>${L.lang}
                        <span class ="no_copy">&nbsp;&nbsp;&nbsp;</span>
                    </div>
                    <span class="item-body hide"><hr class ="no_copy">
                        ${rows}
                    </span>
                </div>
            `;
                }
            }
        }
		else {

    html += `
        <br class="lang no_copy">
        <div class="item-box newline no_copy no_info" data-type="lang">
            <div class="item-title">
                <span class="toggle-sign no_copy">[-]</span>
                ${L.lang}
                <span class="no_copy">&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
            </div>
            <span class="item-body">
                <hr class="no_copy">
                <span class="item-text">--${L.nothing}--</span>
            </span>
        </div>
    `;
}

	 
		
		/* ---------------- RANDOM CODE ---------------- */

        if (typeof genRandomCode === "function") {

            const rnd = genRandomCode(10);

            html +=
                `<br class="code"><div class="item-box newline" data-type="code">
                    <div class="item-title">
                        <span class="toggle-sign no_copy">[-]</span> ${L.random_code}
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                    </div>
                    <span class="item-body"><hr>
                        <span class="item-text">${rnd}</span>
                    </span>
                </div>`;
        }

        /* ---------------- QUOTE CODE ---------------- */

        if (postId) {

            const qc =
                `======== ${L.quote_title} =========\n` +
                `[SHOWPOST]${postId}[/SHOWPOST]`;

            html += buildCodeBox(
                "quote",
                L.quote_code,
                qc.replace(/\n/g, "<br>")
            );
        }

        if (!html) return "";

        return `
            <div style="width:100%;text-align:center;">
                ${html}
            </div>
        `;
    };


    /* =====================================================
       PAGE TEMPLATE
    ===================================================== */

    const page = () => {

        const NAV = window[`FORUM_THREAD_NAV_TPL`] || "";
		

const THREAD = window.THREAD || {};

const FORUM_ID   = THREAD.forum_id   || "";
const FORUM_TYPE = THREAD.forum_type || "";
const THREAD_ID  = THREAD.thread_id  || "";
	  
	  
	  
        const TOOL_NAV =  window.TOOL_BAR_TPL ||"";
		
        return `
            <div id="box">

                ${NAV}
                <hr class="no_copy">

                <div class="navagation no_copy">

                    <a class="homeBtn" href="../../index.php.htm">
                        <i class="demo-icon icon-home-outline">&#xe802;</i>
                        ${L.home}
                    </a>

                    ${L.icon_open}

                    <a class="forum_nav" href="forum_${FORUM_TYPE}${FORUM_ID}.html">
                        ${L.forum}
                    </a>

                    ${L.icon_open}

                    <a class="thread_nav" href="thread_${THREAD_ID}.html">
                        ${L.thread}
                    </a>
					
					 ${L.icon_open}

                </div>

                <hr class="no_copy">

                {{imamPosts}}
				
				

                <div class="page_bar no_copy">
                    <div class="bar-label">
                        <i class="demo-icon icon-pages-icon"></i>
                        ${L.pages}
                    </div>
                    <div class="pagination" style="margin-top:10px"></div>
                </div>

               
			   <div class="map no_copy"><div class="map_button"> ${L.map}</div></div>


                <div class="threadTitle">
                    <a class="no_copy" href="thread_${THREAD_ID}{{threadPage}}.html">
                        ${L.thread_title}
                    </a>
                    <span>{{thread_title}}{{pageWrap}}</span>
                </div>

                {{posts}}

                <div class="page_bar no_copy">
                    <div class="bar-label">
                        <i class="demo-icon icon-pages-icon"></i>
                        ${L.pages}
                    </div>
                    <div class="pagination" style="margin-top:10px"></div>
                </div>
                ${TOOL_NAV}
                ${NAV}

            </div><br><br>
        `;
    };


    /* =====================================================
       POST TEMPLATE
    ===================================================== */

    const post = () => `
        <div class="threadPost">

            <div class="postBtncon no_copy">
                <a class="postBtn" href="./post_{{postid}}.html">
                    <i class="demo-icon icon-page-file-icon"></i>
                    ${L.show_post}
                </a>
                <a class="postBtnCopy" href="javascript:void(0)">
                    <i class="demo-icon icon-docs"></i>
                    ${L.copy_post}
                </a>
            </div>

            <br><span class="zoom"></span>

            <div class="postcon">

                <div class="postTitle" id="post_{{postid}}">
                    <span class="counter_butt no_copy">{{postcount}}</span>
                    {{title}}
                </div>
                 
				<br class="hide-br"><span class="zoom"></span>

                <div id="username" class="username_{{userid}}">
                    <i class="demo-icon icon-user-1 no_copy"></i>
                    {{username}}
                </div>

                <div id="usertitle" class="usertitle_{{userid}}">{{usertitle}}</div>

                <div id="time_date">
                    <i class="demo-icon icon-calendar no_copy"></i> {{dateline}}
                </div>
                
				
				<br class="hide-br"><span class="zoom"></span>

                <hr class="no_copy">

                <div class="postBody">{{body}}<div class="itemGroup">{{itemGroup}}</div></div>

            </div>

        </div>
    `;


    /* =====================================================
       PUBLIC API
    ===================================================== */

    return {
        dir   : L.dir,
        labels: L,
		mapConHTML:mapConHTML(window.THREAD),
        page,
        post,
        buildItemGroup
    };

})();
