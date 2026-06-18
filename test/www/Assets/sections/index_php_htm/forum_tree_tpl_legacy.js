/* =====================================================
   FORUM TREE TEMPLATES
   ES3 SAFE
===================================================== */

var TOOL_NAV = window["TOOL_BAR_TPL"] || "";

window.FORUM_TREE_TPL = {

  /* ================= ROOT ================= */

  root : function (containersHTML, L) {

    return (

      '<div class="navagation">' +
        '<a href="index.php.htm">' +
          '<i class="demo-icon icon-home-outline"></i> ' + L.home +
        '</a>' + L.icon_open+
      '</div>' +

      '<div class="forumsRoot">' +
        '<div id="forums_mn"></div>' +
        '<hr id="forums_sep" />' +
        '<div id="forums_vb"></div>' +

        containersHTML +

      '</div> <br><br>' +

      /* PAGE DOWN TOOLBAR */
      TOOL_NAV
    );
  },

  UL_TMPL :
    '<ul class="child_forum level{{level}}">' +
      '{{items}}' +
    '</ul>',

  LEVEL1_TMPL :
    '<li class="subforum level1" id="{{id}}">' +
      '<div class="box">' +
        '<div class="subforum_bar">' +
          '<span class="toggleBtn">{{toggle}}</span>{{title}}' +
        '</div>' +
        '{{children}}' +
      '</div>' +
    '</li>',

  ITEM_TMPL :
    '<li class="subforum level{{level}}" id="{{id}}">' +
      '<a href="{{url}}">{{title}}</a>' +
      '{{meta}}' +
      '{{children}}' +
    '</li>',

  META_TMPL :
    '<div class="N_replyes">' +
      '{{threadsLabel}}: {{threads}} — {{repliesLabel}}: {{replies}}' +
    '</div>'

};