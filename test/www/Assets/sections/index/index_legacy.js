


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








// ================= PNG FIX =================
function fixPNG(el, src) {
    if (!el || !el.filters) return;

    el.style.zoom = 1;
    el.style.filter =
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
        src +
        "', sizingMethod='scale')";

    el.style.background = "none";
}






// ================= RECEIVE =================

// modern
if (window.addEventListener) {

    window.addEventListener("message", function (e) {
        try {
            var data = JSON.parse(e.data);





		if (data.values.action === "style") {
            location.href = "main.html";
        }

        if (data.values.action === "lang") {
             location.reload();
        }

	

        } catch (err) {}
    }, false);

} else {

    // 🔥 IE6 fallback (window.name polling)
    var lastMsg = "";

    setInterval(function () {

        if (window.name && window.name !== lastMsg) {

            try {
                var data = JSON.parse(window.name);

            if (data.values.action === "style") {
    location.href = "./main.html";
}

if (data.values.action === "lang") {
    location.reload();
}


                lastMsg = window.name;
                window.name = ""; // clear

            } catch (e) {
                window.name = "";
            }
        }

    }, 200); // ⏱ polling
}







// ================= INIT =================
$(function () {











    var welcome = (window.INDEX_LANG && window.INDEX_LANG.welcome)
        ? window.INDEX_LANG.welcome
        : "Welcome";

    var app_name = window.INDEX_LANG.app_name;
    var menu_btt_lbl = window.INDEX_LANG.menu_btt_lbl;
    var navagte_links = window.INDEX_LANG.navagte_links;
    var sett = window.INDEX_LANG.sett;
 





var navigate_links = ""
+ "<a href='privacy.html' class='no-link'>"
+ "(( "+window.INDEX_LANG.privacy+" ))"
+ "</a><br>"

+ "<a href='help.html' class='no-link'>"
+ "(( "+window.INDEX_LANG.help+" ))"
+ "</a><br>"

+ "<a href='download.html' class='no-link'>"
+ "(( "+window.INDEX_LANG.downloads+" ))"
+ "</a><br><br>"

+ window.INDEX_LANG.online_app
+ "<br>"

+ "<a href='https://noon-team.org/app' target='_blank'  class='no-link'>"
+ "https://noon-team.org/app"
+ "</a><br><br>"

+ window.INDEX_LANG.contact
+ "<br>"

+ "<a href='mailto:noon@noon-team.org' target='_blank' class='no-link'>"
+ "noon@noon-team.org"
+ "</a>";








var menu = ''

+ '<div class="menu-btn" id="menuBtn">'
+ (window.INDEX_LANG.dir === "rtl"
    ? '<i class="demo-icon icon-left-hand"></i>' + menu_btt_lbl + '<i class="demo-icon icon-right-hand"></i>'
    : '<i class="demo-icon icon-right-hand"></i>' + menu_btt_lbl + '<i class="demo-icon icon-left-hand"></i>')
+ '</div>'

+ '<ul id="menuList" class="menu-list">'

+ '  <li class="color-options">'
+ '  <div>' + window.INDEX_LANG.choose_color_lbl + ':</div>'

+ '      <span data-color = "dark" class="color-dark">' + window.INDEX_LANG.color_dark+ '</span>'
+ '      <span data-color = "pink" class="color-pink">' + window.INDEX_LANG.color_pink+ '</span>'
+ '      <span data-color = "gold" class="color-gold">' + window.INDEX_LANG.color_gold+ '</span>'
+ '      <span data-color = "silver" class="color-silver">' + window.INDEX_LANG.color_silver+ '</span>'
+ '  </li>'

+ '  <li data-page="andro">' + window.INDEX_LANG.style_android+ '</li>'
+ '  <li data-page="ios">' + window.INDEX_LANG.style_ios + '</li>'
+ '  <li data-page="orga">' + window.INDEX_LANG.style_organic + '</li>'
+ '  <li data-page="techna">' + window.INDEX_LANG.style_tech + '</li>'
+ '</ul>';




var langMenu = ''
+ '<div class="menu-btn" id="langBtn">'
+ (window.INDEX_LANG.dir === "rtl"
    ? 'اختر اللغة<br>Choose Language'
    : 'Choose Language<br>اختر اللغة')
+ '</div>'

+ '<ul id="langList" class="menu-list" style="display:none;">'
+ '  <li data-lang="ar">العربية</li>'
+ '  <li data-lang="en">English</li>'
+ '</ul>';










    var html = ''
    + '<table class="border-frame" cellpadding="0" cellspacing="0" border="0" width="100%">'
    + '  <tbody>'

    + '    <tr height="20">'
    + '      <td class="corner-tl" width="20">&nbsp;</td>'
    + '      <td class="top-mid">&nbsp;</td>'
    + '      <td class="corner-tr" width="20">&nbsp;</td>'
    + '    </tr>'

    + '    <tr>'
    + '      <td class="left-mid" width="20">&nbsp;</td>'
    + '      <td class="content-cell" width="100%">'
    + '        <div class="content">'

    // ===== BOX 1 =====
    + '<div class="trans">'
	
    +   '<div class="trans-content">'
    +     '<img id="bsm" src="./Assets/images/generic/bsm.png" width="200" height="40"><br>'
    +     '<a id="index_butt" class="no-link" href="index.html"><img id="logo" src="./Assets/images/generic/noon.png" width="150"></a><br>'
    +     app_name + '<br>' + welcome
    
	
	+   '</div>'
	
	+     '<div class="png-bg"></div>'
	
	
    + '</div>'

    + '<br>'
    + menu
    + '<br>'
    + langMenu
    + '<br>'
	+ '<a id="sett" href="settings.html" class="menu-btn no-link">'+sett+'</a>'
	+ '<br>'
	
    // ===== BOX 2 =====
    + '<div class="trans">'
    +   '<div class="trans-content">'
    
	
    +     navigate_links
	

    +   '</div>'
	
	+    '<div class="png-bg"></div>'
	
	
    + '</div>'

    + '        </div>'
    + '      </td>'
    + '      <td class="right-mid" width="20">&nbsp;</td>'
    + '    </tr>'

    + '    <tr height="20">'
    + '      <td class="corner-bl" width="20">&nbsp;</td>'
    + '      <td class="bottom-mid">&nbsp;</td>'
    + '      <td class="corner-br" width="20">&nbsp;</td>'
    + '    </tr>'

    + '  </tbody>'
    + '</table>';




   var LANG = window.INDEX_LANG;

    $("html").attr("dir", LANG.dir)
    $("#app")
            .removeClass("rtl ltr")
            .addClass(LANG.dir);



    $("#app").append(html);
	
	
   

    // ================= SIZE FIX =================
function sizePngBg() {
    $(".trans").each(function () {

        var bg = $(this).children(".png-bg")[0];
        if (!bg) return;

        // 🔥 الصحيح
        var w = this.offsetWidth;
        var h = this.offsetHeight;

        bg.style.width  = w + "px";
        bg.style.height = h + "px";
    });
}

   

 

    // ===== DISABLE SELECT (IE SAFE) =====
    document.onselectstart = function () { return false; };

function sendMulti(values) {
    var msg = JSON.stringify({
        from: "parent",
        msg: {
            type: "setValues",
            values: values
        }
    });

    var frame = document.getElementById("storageFrame");

    if (frame && frame.contentWindow) {
        if (window.postMessage) {
            frame.contentWindow.postMessage(msg, "*");
        } else {
            frame.contentWindow.name = msg; // IE6
        }
    }
}




var bsm = document.getElementById("bsm");

if (bsm && bsm.filters && !window.XMLHttpRequest) { // IE6 only

    var src = bsm.src;

    bsm.style.width  = "150px";
    bsm.style.height = "40px";
    bsm.style.zoom = 1;

    bsm.style.filter =
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
        src +
        "', sizingMethod='scale')";

    bsm.src = "./Assets/images/generic/transparent.gif"; // 1x1 gif
}


var logo = document.getElementById("logo");

if (logo && logo.filters && !window.XMLHttpRequest) { // IE6 only

    var src = logo.src;

    logo.style.width  = "150px";
    logo.style.height = "150px";
    logo.style.zoom = 1;

    logo.style.filter =
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
        src +
        "', sizingMethod='scale')";

    logo.src = "./Assets/images/generic/transparent.gif"; // 1x1 gif
}

$("#menuBtn").click(function () {
    if (window.DRAG_SCROLL_DRAGGING) return;

    var $list = $("#menuList");
    var isOpen = $list.is(":visible");

    $list.stop(true, true).slideToggle(200, function () {

        if (!isOpen) {

            var btn = document.getElementById("menuBtn");
            var appEl = document.getElementById("app");

            var y = 0;
            var el = btn;

            while (el && el !== appEl) {
                y += el.offsetTop || 0;
                el = el.offsetParent;
            }

            document.documentElement.scrollTop = y;
            document.body.scrollTop = y;

            if (appEl) {
                appEl.scrollTop = y;
            }
        }
    });
});



$("#menuList li").click(function () {

    if (window.DRAG_SCROLL_DRAGGING) return;

    var page = $(this).attr("data-page");
    if (!page) return;

    // 🔥 احصل على اللون النشط
    var activeColor = $("#menuList span.active").attr("data-color");





sendMulti({
    userStyle: page,
    userColor: activeColor,
    action: "style"
});

});

	 function applyActiveColor() {
    if (!window.color) return;

    var spans = $("#menuList span");

    for (var i = 0; i < spans.length; i++) {
        var el = spans[i];

        if ($(el).attr("data-color") === window.color) {
            el.className += " active";
        }
    }
}
	

$("#menuList span").click(function () {

    var spans = $("#menuList span");
    for (var i = 0; i < spans.length; i++) {
        spans[i].className = spans[i].className
    .replace(/\bactive\b/g, "")
    .replace(/\s+/g, " ")
    .replace(/^\s+|\s+$/g, "");
    }

    this.className += " active"; // ✅ مهم المسافة

});

$("#langBtn").click(function () {
    if (window.DRAG_SCROLL_DRAGGING) return;

    var $list = $("#langList");
    var isOpen = $list.is(":visible");

    $list.stop(true, true).slideToggle(200, function () {

        if (!isOpen) {

            var btn = document.getElementById("langBtn");
            var appEl = document.getElementById("app");

            var y = 0;
            var el = btn;

            while (el && el !== appEl) {
                y += el.offsetTop || 0;
                el = el.offsetParent;
            }

            document.documentElement.scrollTop = y;
            document.body.scrollTop = y;

            if (appEl) {
                appEl.scrollTop = y;
            }
        }
    });
});

$("#langList li").click(function () {

    if (window.DRAG_SCROLL_DRAGGING) return;
     showLoader();
    var lang = $(this).attr("data-lang");
    if (!lang) return;




sendMulti({
    userLang: lang,
	  action: "lang"
});
   

});

DragScroll(true);

	setTimeout(function () {
     hideLoader();
	 
	 showApp();
	 
	 
	 applyActiveColor();
 
	     // run once
   sizePngBg();

    // resize
    $(window).resize(sizePngBg);
	 
	 
	  // apply PNG fix
    $(".png-bg").each(function () {
        if (this.filters) {
            fixPNG(this, "./Assets/images/generic/bg_transparent.png");
        }
    });

	 
	 
    }, 0); // 500 = نصف ثانية
	
	

});