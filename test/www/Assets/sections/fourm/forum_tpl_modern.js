/* =====================================================
   Forum Templates (AR) – NO HARD STRINGS
   PURE ES6
===================================================== */

window.FORUM_TEMPLATES = (() => {
  const L = window.FORUM_LANG;
  const L_COMMON = window.LANG_COMMON;
 const TOOL_NAV =  window.TOOL_BAR_TPL ||"";
 
  function mapConHTML() {
    return `
      <div class="map-con-info">
        <div class="child-post-con-info">

          <button class="map-con-close" unselectable="on">X ${L_COMMON.close}</button><br>

          <div class="post-list-button" data-copy>
            <span>${L_COMMON.home}<br></span>
          </div>

          <i class="demo-icon icon-down-big"></i>

          <div class="post-list-button" data-copy>
            <span class="you_here">${L_COMMON.you_here}</span>
            <span>
              ${L_COMMON.forum}: ${FORUM_THREADS.forumtype}${FORUM_THREADS.forumid}<br>
              <span class="copy-text">${FORUM_THREADS.forumtitle}</span>
            </span>
          </div>

          <i class="demo-icon icon-down-big"></i>
          <i class="demo-icon icon-down-big"></i>

          <div class="post-list-button" data-copy>
            <span>${L_COMMON.thread}</span>
          </div>

          <i class="demo-icon icon-down-big"></i>
          <i class="demo-icon icon-down-big"></i>
          <i class="demo-icon icon-down-big"></i>

          <div class="post-list-button" data-copy>
            <span>${L_COMMON.post}</span>
          </div>

        </div>
      </div>
    `;
  }

  return {
    /* =====================================================
       PAGE
    ===================================================== */
    page() {
      const NAV = window.FORUM_THREAD_NAV_TPL || "";
      const HEADER = window.HEADER_BAR_HTML_TPL || "";
      const FOOTER = window.FOOTER_BAR_HTML_TPL || "";
      const MENE = window.MENE_BAR_HTML_TPL || "";

      return `
        <div id="box">

          ${NAV}
          <hr>

          <div class="navagation">
            <a href="../../index.php.htm">
              <i class="demo-icon icon-home-outline"></i> ${L.home}
            </a>
            ${L.icon_open}
            <a href="{{base}}.html"><span>${L.forumDots}</span></a>
          </div>

          <hr>

          <div class="page_bar">
            <div class="bar-label">
              <i class="demo-icon icon-pages-icon"></i>
              ${L.forumPagesLabel}
            </div>
            <div class="pagination" style="margin-top:10px"></div>
          </div>

          <div class="map no_copy">
            <div class="map_button">${L_COMMON.map}</div>
          </div>

          <div class="forumTitle">
            <a href="{{base}}{{forumPage}}.html">
              ${L.forumTitleLabel}
            </a>
            <span>{{forumTitle}}{{pageWrap}}</span>
          </div>

          <hr>

          <div class="forumControls" style="margin:10px 0">
            <span class="orderBtn" data-order="DESC">
              <i class="demo-icon icon-sort-alt-up"></i> ${L.newestFirst}
            </span>
            <span class="orderBtn" data-order="ASC">
              <i class="demo-icon icon-sort-alt-down"></i> ${L.oldestFirst}
            </span>
          </div>

          <div id="stickyTitle">${L.stickyTitle}</div>
          <div id="sticky"></div>

          <div id="nonestickyTitle">${L.normalTitle}</div>
          <div id="list"></div>

          <div class="page_bar">
            <div class="bar-label">
              <i class="demo-icon icon-pages-icon"></i>
              ${L.forumPagesLabel}
            </div>
            <div class="pagination" style="margin-top:10px"></div>
          </div>
          ${TOOL_NAV}
          ${NAV}

        </div> <br><br>
      `;
    },

    /* =====================================================
       MAP
    ===================================================== */
    mapConHTML: mapConHTML(),

    /* =====================================================
       STICKY THREAD
    ===================================================== */
    stickyTpl: `
      <div class="forumSticky">
        <span class="threadIndex">{{index}}</span> -
        <i class="demo-icon icon-pin"></i>
        <a class="threadTitle" id="thread_{{threadid}}"
           href="{{dir}}thread_{{threadid}}.html">{{title}}</a>

        <div class="threadMeta">

          <div class="threadAuthor">
            <i class="demo-icon icon-user-1"></i>{{postusername}}
          </div>

          <div class="dateline">
            <i class="demo-icon icon-calendar"></i>{{dateline}}
          </div>

          <div class="threadReplies">
            <i class="demo-icon icon-comment-1"></i>({{replycount}} ${L.repliesSuffix})
          </div>

        </div>

        {{thread_pages_html}}
        {{imamposts_html}}
      </div>
    `,

    /* =====================================================
       NORMAL THREAD
    ===================================================== */
    threadTpl: `
      <div class="forumThread">
        <span class="threadIndex">{{index}}</span> -
        <a class="threadTitle" id="thread_{{threadid}}"
           href="{{dir}}thread_{{threadid}}.html">{{title}}</a>

        <div class="threadMeta">

          <div class="threadAuthor">
            <i class="demo-icon icon-user-1"></i>{{postusername}}
          </div>

          <div class="dateline">
            <i class="demo-icon icon-calendar"></i>{{dateline}}
          </div>

          <div class="threadReplies">
            <i class="demo-icon icon-comment-1"></i>({{replycount}} ${L.repliesSuffix})
          </div>

        </div>

        {{thread_pages_html}}
        {{imamposts_html}}
      </div>
    `
  };
})();