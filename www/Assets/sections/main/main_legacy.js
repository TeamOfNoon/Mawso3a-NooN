// Assets/template.legacy.table.js


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




(function () {

  /* =====================================================
     WAIT FOR APP + jQuery
  ===================================================== */
  function wait(fn) {
    var app = document.getElementById('app');
    if (app && window.jQuery && window.$) {
      fn(app, window.jQuery);
    } else {
      setTimeout(function () { wait(fn); }, 15);
    }
  }

  /* =====================================================
     IFRAME HTML
  ===================================================== */
  var IFRAME_HTML =
    '<iframe ' +
      'src="index.php.htm" ' +
      'width="100%" ' +
      'height="100%" ' +
      'frameborder="0" ' +
      'scrolling="auto">' +
    '</iframe>';

  /* =====================================================
     PAGE TEMPLATE (IE6 SAFE)
  ===================================================== */
  var PAGE_TMPL =
    '<table id="pageTable">' +

      '<colgroup>' +
        '<col id="colLeft">' +
        '<col id="colCenter">' +
        '<col id="colRight">' +
      '</colgroup>' +

      '<tbody>' +

        '<tr id="headerRow">' +
          '<td colspan="3">{{header}}</td>' +
        '</tr>' +

        '<tr id="contentRow">' +
          '<td id="leftCol"><div class="scrollBox">{{left}}</div></td>' +
          '<td id="centerCol"><div class="scrollBox centerbox">{{iframe}}</div></td>' +
          '<td id="rightCol"><div class="scrollBox">{{right}}</div></td>' +
        '</tr>' +

        '<tr id="subFooterRow">' +
          '<td colspan="3"><div id="pageList">{{pages}}</div></td>' +
        '</tr>' +

        '<tr id="footerRow">' +
          '<td colspan="3">{{footer}}</td>' +
        '</tr>' +

      '</tbody>' +

    '</table>';

  /* =====================================================
     BOOT
  ===================================================== */
  wait(function (app, $) {

    var i, left = '', right = '', pages = '';

    for (i = 1; i <= 20; i++) {
      left  += '<div class="sideBox">Left item ' + i + '</div>';
      right += '<div class="sideBox">Right item ' + i + '</div>';
    }

    for (i = 1; i <= 5; i++) {
      pages += '<a href="javascript:;" data-p="' + i + '">' + i + '</a>';
    }

    var html = tpl(PAGE_TMPL, {
      header: 'HEADER – widths controlled by COLGROUP',
      footer: 'FOOTER – widths controlled by COLGROUP',
      iframe: IFRAME_HTML,
      left: left,
      right: right,
      pages: pages
    });

    app.innerHTML = html;
    setBg("");

    /* EVENTS */
    $(document).on('click', '#pageList a', function () {
      alert('Page ' + this.getAttribute('data-p'));
    });
	
	setTimeout(function () {
     hideLoader();
	 showApp();
    }, 0); // 500 = نصف ثانية

  });




})();
