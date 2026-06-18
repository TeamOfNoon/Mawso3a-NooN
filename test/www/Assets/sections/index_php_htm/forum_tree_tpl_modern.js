/* =====================================================
   FORUM TREE TEMPLATES
   ES6
===================================================== */

/* toolbar fallback */
const TOOL_NAV = window["TOOL_BAR_TPL"] || "";

window.FORUM_TREE_TPL = {

  /* ================= ROOT ================= */

  root: (containersHTML, L) => {

    return `
      <div class="navagation">
        <a href="index.php.htm">
          <i class="demo-icon icon-home-outline"></i> ${L.home}
        </a>${L.icon_open}
      </div>

      <div class="forumsRoot">
        <div id="forums_mn"></div>
        <hr id="forums_sep" />
        <div id="forums_vb"></div>

        ${containersHTML}

      </div> <br><br>

      ${TOOL_NAV}
    `;
  },

  /* ================= LIST ================= */

  UL_TMPL:
    `<ul class="child_forum level{{level}}">
      {{items}}
     </ul>`,

  /* ================= ROOT ITEM ================= */

  LEVEL1_TMPL:
    `<li class="subforum level1" id="{{id}}">
        <div class="box">
          <div class="subforum_bar">
            <span class="toggleBtn">{{toggle}}</span>{{title}}
          </div>
          {{children}}
        </div>
     </li>`,

  /* ================= CHILD ITEM ================= */

  ITEM_TMPL:
    `<li class="subforum level{{level}}" id="{{id}}">
        <a href="{{url}}">{{title}}</a>
        {{meta}}
        {{children}}
     </li>`,

  /* ================= META ================= */

  META_TMPL:
    `<div class="N_replyes">
        {{threadsLabel}}: {{threads}} — {{repliesLabel}}: {{replies}}
     </div>`

};