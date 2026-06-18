/* =====================================================
   POST TEMPLATES – ES6 VERSION
   same output / same classes / same API
===================================================== */

window.POST_TEMPLATES = (() => {

    const L = window.POST_LANG;
    const common = window.LANG_COMMON;


    /* =====================================================
       POST INFO PANEL
    ===================================================== */

    const buildCopyRow = (title, valueHTML) => `
        <div class="post-list-button" data-copy>
            <span>${title}<br>
                <span class="copy-text">${valueHTML}</span>
            </span>
            <a class="copy-btn" unselectable="on">
                <i class="demo-icon icon-docs" unselectable="on"></i>${L.copy_link}
            </a>
        </div>
    `;


    const postConHTML = `
        <div class="post-con-info" style="display:none">
            <div class="child-post-con-info">

                <button class="post-con-close" unselectable="on">
                    X ${L.close}
                </button><br>

                ${buildCopyRow(L.tech_post_id, window.RAW_JSON.postid)}
                ${buildCopyRow(L.short_link, 'https://n-ye.me/'+window.RAW_JSON.postid)}
                ${buildCopyRow(L.post_link, 'https://nasser-alyamani.org/showthread.php?p='+window.RAW_JSON.postid)}
               ${buildCopyRow(
    L.quote_label,
    `${L.quote_title}<br>[SHOWPOST]${window.RAW_JSON.postid}[/SHOWPOST]`
)}

            </div>
        </div>
    `;










const mapConHTML = () => {

    const {
        forum_type = "",
        forum_id = "",
        forum_title = "",
        threadid = "",
        thread_title = "",
        postid = ""
    } = window.RAW_JSON || {};

    const postTitle = window.RAW_JSON?.title || L.no_title;

    return `
    <div class="map-con-info">
      <div class="child-post-con-info">

        <button class="map-con-close" unselectable="on">
          X ${L.close}
        </button><br>

        <div class="post-list-button" data-copy>
          <span>${common.home}<br></span>
        </div>

        <i class="demo-icon icon-down-big"></i>

        <div class="post-list-button" data-copy>
          <span>
            ${common.forum}: ${forum_type}${forum_id}<br>
            <span class="copy-text">${forum_title}</span>
          </span>
        </div>

        <i class="demo-icon icon-down-big"></i>
        <i class="demo-icon icon-down-big"></i>

        <div class="post-list-button" data-copy>
          <span>
            ${common.thread}: ${threadid}<br>
            <span class="copy-text">${thread_title}</span>
          </span>
        </div>

        <i class="demo-icon icon-down-big"></i>
        <i class="demo-icon icon-down-big"></i>
        <i class="demo-icon icon-down-big"></i>

        <div class="post-list-button" data-copy">

          <span class="you_here">${common.you_here}</span>

          <span>
            ${common.post}: ${postid}<br>
            <span class="copy-text">${postTitle}</span>
          </span>

        </div>

      </div>
    </div>
    `;
};






    /* =====================================================
       ITEM BOX HELPERS
    ===================================================== */

    const buildSimpleBox = (type, title, url) => `
        <br class="${type}"><div class="item-box newline" data-type="${type}">
            <div class="item-title">
                <span class="toggle-sign no_copy">[-]</span>${title}
                <span class ="no_copy">&nbsp;&nbsp;&nbsp;</span><br>
            </div>
            <span class="item-body hide"><hr class ="no_copy">
                <span class="item-text">${url}</span>
                <a class="item-go no_copy" href="${url}" target="_blank">${L.go_to_link}</a>
                <a class="item-copy no_copy" href="javascript:void(0);">${L.copy_link}</a>
            </span>
        </div>
    `;


    const buildCodeBox = (type, title, html) => `
        <br class="${type}"><div class="item-box newline" data-type="${type}">
            <div class="item-title">
                <span class="toggle-sign no_copy">[-]</span>${title}
                <span class ="no_copy">&nbsp;&nbsp;&nbsp;</span><br>
            </div>
            <span class="item-body hide"><hr class ="no_copy">
                <span class="item-text">${html}</span>
                <a class="item-copy no_copy" href="javascript:void(0);">${L.copy_link}</a>
            </span>
        </div>
    `;



    /* =====================================================
       PAGE TEMPLATE
    ===================================================== */

    const page = () => {

        const NAV = window[`FORUM_THREAD_NAV_TPL`] || "";
        const TOOL_NAV = window.TOOL_BAR_TPL || "";
        const FORUM_ID = window.RAW_JSON.forum_id || "";
        const FORUM_TYPE = window.RAW_JSON.forum_type || "";
        const THREAD_ID = window.RAW_JSON.threadid || "";

        return `
        <div id="box">


            ${NAV}
			<span id="counter"></span>
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

                <a class="post_nav" href="{{base}}{{post}}">
                    ${L.post}
                </a>
				
				${L.icon_open}

            </div>

            <hr class="no_copy">

            {{imamPosts}}
			
			<div class="map no_copy"><div class="map_button"> ${L.map}</div></div>


            <table class="menu-bar no_copy" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="menu-right" align="right" valign="middle">

                        <span class="menu-wrapper menu-wrapper-info">

                            <button class="more_butt more-info">
                                <i class="demo-icon icon-menu"></i>
                                ${L.post_commands}
                            </button>

                            <div class="menu-container-info">
                                <div class="list-menu">

                                    <div class="post-list-button copy_post">
                                        <i class="demo-icon icon-docs"></i>
                                        ${L.copy_post}
                                    </div>

                                    <div id="more-info" class="post-list-button">
                                        <i class="demo-icon icon-ellipsis-v-icon"></i>
                                        ${L.more}
                                    </div>

                                </div>
                            </div>

                        </span>

                    </td>
                </tr>
            </table>

            <div class="postTitle">
                <span class="counter_butt no_copy">{{postcount}}</span>
                <span class="title-space no_copy">&nbsp;</span>
                <a class ="no_copy" href="{{base}}{{post}}">${L.post_prefix}</a>
                <span>{{title}}</span>
            </div>
            <br class="hide-br"><span class="zoom"></span>
            <div class="PostContent">

                <div id="username" class="username_{{userid}}">
                    <i class="demo-icon icon-user-1 no_copy"></i>{{username}}
                </div>

                <div id="usertitle" class="usertitle_{{userid}}">{{usertitle}}</div>

                <div id="time_date">
                    <i class="demo-icon icon-calendar no_copy"></i> {{dateline}}
                </div>
                <br class="hide-br"><span class="zoom"></span>
                <hr class ="no_copy">

                <div class="postBody"><div id="content">{{content}}</div><div class="itemGroup">{{itemGroup}}</div></div>

            </div>

    

             ${TOOL_NAV}
            ${NAV}
        </div>
		<br><br>
        `;
    };



    /* =====================================================
       ITEM GROUP BUILDER
    ===================================================== */

    const buildItemGroup = (RAW_JSON, postId) => {

        let html = "";
		
		
		
		
		
		
		
		
		/* ---------------- IMAM + DATE (FROM long_text) ---------------- */

if (RAW_JSON && RAW_JSON.long_text) {

    var header = getStringBetween(RAW_JSON.long_text);

    if (header) {

        var rows = "";

        /* Require REAL DATE (Hijri OR Gregorian) */
        var hasRealDate = header.higri || header.meladi;

        if (hasRealDate) {
            if (header.imam)   // use label (from extractor)
                rows += header.imam + "<br>";
			
            if (header.label)   // use label (from extractor)
                rows += header.label + "<br>";

            if (header.higri)
                rows += header.higri + "<br>";

            if (header.meladi)
                rows += header.meladi + "<br>";

            if (header.time)
                rows += header.time + "<br>";

            if (header.note)
                rows += header.note;
        }

        /* Only render if rows has content */
        if (rows) {
             //rows = stripDivFromHTML(rows);
            html +=
                '<br class="date">' +
                '<div class="item-box newline" data-type="date">' +
                  '<div class="item-title">' +
                    '<span class="toggle-sign no_copy">[-]</span>' +
                    L.date_src +
                    '<span class="no_copy">&nbsp;&nbsp;&nbsp;&nbsp;</span><br>' +
                  '</div>' +
                  '<span class="item-body">' +
                    '<hr class="no_copy">' +
                    '<span class="item-text">' + rows + '</span>' +
                  '</span>' +
                '</div>';
        }
		else{
			
			   html +=
                '<br class="date no_copy""><div class="item-box newline no_copy no_info" data-type="date">' +
                  '<div class="item-title">' +
                    '<span class="toggle-sign no_copy">[-]</span>' + 
					L.date_src +
                    '<span class="no_copy">&nbsp;&nbsp;&nbsp;&nbsp;</span><br>' +
                  '</div>' +
                  '<span class="item-body"><hr class ="no_copy">' +
                    '<span class="item-text">--'+L.nothing+'--</span>' +
                  '</span>' +
                '</div>';
			
			
		}
    }
}
		
		
		
		
		
		
		

     
        /* original post */
        if (RAW_JSON?.postid) {
            const po = `https://nasser-alyamani.org/showthread.php?p=${RAW_JSON.postid}`;
            html += buildSimpleBox("post", L.org_post, po);
        }


        /* original thread */
        if (RAW_JSON?.threadid) {
            const th = `https://nasser-alyamani.org/showthread.php?t=${RAW_JSON.threadid}`;
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


        /* random code */
        if (typeof genRandomCode === "function") {

            const rnd = genRandomCode(10);

            html += `
                <br class="code"><div class="item-box newline" data-type="code">
                    <div class="item-title">
                        <span class="toggle-sign no_copy">[-]</span>${L.random_code}
                        <span class ="no_copy">&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                    </div>
                    <span class="item-body hide"><hr class ="no_copy">
                        <span class="item-text">${rnd}</span>
                    </span>
                </div>
            `;
        }

        /* quote code */
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
            <div style="text-align:center;">
                ${html}
            </div>
        `;
    };



    /* =====================================================
       PUBLIC API
    ===================================================== */

    return {

        dir: L.dir,
        labels: L,
        mapConHTML,
        postConHTML,
        page,
        buildItemGroup
    };

})();