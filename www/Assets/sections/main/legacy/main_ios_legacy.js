var cover = ''
+ '<div id="cover" style="display:none;">'
+ '</div>';


var MenuMainHeaderHTML = ''
+ '<div id="Main_Menu_Header" class="Main_Menu_Header" style="display:none;">'
+ '  <a href="javascript:void(0);"><i class="demo-icon icon-login"></i>' + window.MAIN_LANG.login_lbl + '</a>'
+ '  <a href="javascript:void(0);"><i class="demo-icon icon-eye-off-1"></i>' + window.MAIN_LANG.hide_lbl + '</a>'
+ '</div>';





var moreMenuFooterHTML = ''
+ '<div id="More_Menu_Footer" class="More_Menu_Footer" style="display: none;">'
+ '  <a id="login_butt2" class ="tab_switch_butt"  href="#"><i class="demo-icon icon-login"></i>'+window.MAIN_LANG.login_lbl+'</a>'
+ '  <a id="hide_butt2"  class ="tab_switch_butt"  href="#"><i class="demo-icon icon-eye-off-1"></i>'+window.MAIN_LANG.hide_lbl+'</a>'
+ '</div>';





var footerBarHTML =
'<div class="tab-bar">' +
//'  <a href="#" class="tab-item active">' +
//'    <i class="demo-icon icon-home-outline"></i>' +
//'    Home' +
//'  </a>' +

'<button class="tab_switch_butt home_butt" data-tab="0">'+
             '<img id="home-image" class="home-image" src="Assets/images/generic/noon.png" alt="icon">'+
'</button>'+


'  <a href="#" class="tab_switch_butt tab-item" data-tab="1">' +
'    <i class="demo-icon icon-search-8"></i>' +
window.MAIN_LANG.search_lbl +
'  </a>' +
'  <a href="#" class="tab_switch_butt tab-item" data-tab="2">' +
'    <i class="demo-icon icon-bookmark-empty"></i>' +
window.MAIN_LANG.fav_lbl +
'  </a>' +

'  <a  id="login_butt1" class="tab_switch_butt tab-item" style="" href="#"><i class="demo-icon icon-login"></i>'+window.MAIN_LANG.login_lbl+'</a>'+
'  <a  id="hide_butt1" class="tab_switch_butt tab-item"  style="" href="#"><i class="demo-icon icon-eye-off-1"></i>'+window.MAIN_LANG.hide_lbl+'</a>'+


'  <a href="#" id="More_Menu_Footer2" class="tab-item" style="display:none;" onclick="toggleMoreMenu(); return false;">' +
'    <i class="demo-icon icon-ellipsis-v-icon"></i>' +
window.MAIN_LANG.more_lbl +
'  </a>' +
'</div>' +
moreMenuFooterHTML+
'';


  /* =====================================================
     IFRAME HTML
  ===================================================== */
  var IFRAME_HTML =
    '<iframe ' +
	  'id="iframe_con"' +
      'src="index.php.htm" ' +
      'width="100%" ' +
      'height="100%" ' +
      'frameborder="0" ' +
      'scrolling="auto">' +
    '</iframe>';











var iosHeaderHTML = ''

// ================= MAIN HEADER =================
+ '<div class="ios-header" id="mainHeader">'
+ '  <table class="ios-table"><tr>'

+ '      <td class="ios-left" id="btnMenu" style="width:100px;">'
+ '        <i class="demo-icon icon-menu"></i>القائمة'
+ '      </td>'

+ '      <td class="ios-mid"></td>'

+ '      <td class="ios-right">'
+ '        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>'

+ (
    window.MAIN_LANG.dir == "ltr"

    ?

    '           <td align="center" id="btnPrev" style="padding:0 8px; cursor:pointer;">'
+ '              <i class="demo-icon icon-angle-double-left"></i>'
+ '              <div class="nav-label">'+window.MAIN_LANG.prev_lbl+'</div>'
+ '            </td>'

+ '            <td align="center" id="btnNext" style="padding:0 8px; cursor:pointer;">'
+ '              <i class="demo-icon icon-angle-double-right"></i>'
+ '              <div class="nav-label">'+window.MAIN_LANG.next_lbl+'</div>'
+ '            </td>'

    :





  '            <td align="center" id="btnPrev" style="padding:0 8px; cursor:pointer;">'
+ '              <i class="demo-icon icon-angle-double-right"></i>'
+ '              <div class="nav-label">'+window.MAIN_LANG.prev_lbl+'</div>'
+ '            </td>'

+ '            <td align="center" id="btnNext" style="padding:0 8px; cursor:pointer;">'
+ '              <i class="demo-icon icon-angle-double-left"></i>'
+ '              <div class="nav-label">'+window.MAIN_LANG.next_lbl+'</div>'
+ '            </td>'


)



+ '        </tr></table>'
+ '      </td>'

+ '  </tr></table>'
+ '</div>'


// ================= SEARCH HEADER =================
+ '<div class="ios-header" id="searchHeader" style="display:none;">'
+ '  <table class="ios-table"><tr>'

+ '    <td class="ios-search-btn">'
+ '      <button onclick="searchHelp(null, \'searchBox\')" style="all: unset;">'
+ '          <i class="demo-icon icon-search-4"></i><div class="dosearch-label">'+window.MAIN_LANG.do_search_lbl+'</div>'
+ '      </button>'
+ '    </td>'

+ '    <td class="ios-search-box">'
+ '       <div class="search-wrapper">'
+ '           <input id="searchBox" class="wSearchField" placeholder="'+window.MAIN_LANG.enter_search_text_lbl+'" />'
+ '           <span class="nav-btn clear-btn" id="clearSearch">'
+ '               <i class="demo-icon icon-cancel"></i>'
+ '           </span>'
+ '       </div>'
+ '    </td>'

+ '    <td class="ios-right">'
+ '      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>'

+ '        <td align="center" class="nav-btn" id="btnDownSearch" style="padding:0 8px; cursor:pointer;">'
+ '          <i class="demo-icon icon-down-big"></i>'
+ '          <div class="nav-label">'+window.MAIN_LANG.down_lbl+'</div>'
+ '        </td>'

+ '        <td align="center" class="nav-btn" id="btnUpSearch" style="padding:0 8px; cursor:pointer;">'
+ '          <i class="demo-icon icon-up-big"></i>'
+ '          <div class="nav-label">'+window.MAIN_LANG.up_lbl+'</div>'
+ '        </td>'

+ '      </tr></table>'
+ '    </td>'

+ '  </tr></table>'
+ '</div>'


// ================= FAV HEADER =================
+ '<div class="ios-header" id="favHeader" style="display:none;">'
+ '  <table class="ios-table"><tr>'

+ '    <td class="ios-fav-btn">'
+ '    <button onclick="FavSystem(\'save\')" style="all: unset;">'
+ '       <i class="demo-icon icon-bookmark-2"></i><div class="dosave-label">'+window.MAIN_LANG.do_save_lbl+'</div>'

+ '    </button>'
+ '    </td>'

+ '    <td class="ios-fav-box">'
+ '       <div class="fav-wrapper">'
+ '           <input type="text" id="favInput" placeholder="'+window.MAIN_LANG.enter_fav_text_lbl+'" />'
+ '           <span class="nav-btn clear-btn" id="clearFav">'
+ '               <i class="demo-icon icon-cancel"></i>'
+ '           </span>'
+ '       </div>'
+ '    </td>'

+ '    <td class="ios-right">'
+ '      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>'

+ '        <td align="center" class="nav-btn" id="btnDownFav" style="padding:0 8px; cursor:pointer;">'
+ '          <i class="demo-icon icon-down-big"></i>'
+ '          <div class="nav-label">'+window.MAIN_LANG.down_lbl+'</div>'
+ '        </td>'

+ '        <td align="center" class="nav-btn" id="btnUpFav" style="padding:0 8px; cursor:pointer;">'
+ '          <i class="demo-icon icon-up-big"></i>'
+ '          <div class="nav-label">'+window.MAIN_LANG.up_lbl+'</div>'
+ '        </td>'

+ '      </tr></table>'
+ '    </td>'

+ '  </tr></table>'
+ '</div>'







+ '<div id="iframSnipit" style="display:none;">'
+ '</div>'

// ================= Snipit HEADER =================
+ '<div class="ios-header" id="SnipitHeader" style="display:none;">'
+ '  <table class="ios-table"><tr>'


+ '    <td class="ios-right">'
+ '      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>'

+ '        <td align="center" class="nav-btn" id="btnDownVs" style="padding:0 8px; cursor:pointer;">'
+ '          <i class="demo-icon icon-down-big"></i>'
+ '          <div class="nav-label">'+window.MAIN_LANG.down_lbl+'</div>'
+ '        </td>'

+ '        <td align="center" class="nav-btn" id="btnUpVs" style="padding:0 8px; cursor:pointer;">'
+ '          <i class="demo-icon icon-up-big"></i>'
+ '          <div class="nav-label">'+window.MAIN_LANG.up_lbl+'</div>'
+ '        </td>'

+ '        <td align="center" id="btnSet" style="padding:0 8px; cursor:pointer;">'
+ '            <i class="demo-icon icon-target"></i>'
+ '            <div class="nav-label">'+window.MAIN_LANG.target_lbl+'</div>'
+ '        </td>'

+ '      </tr></table>'
+ '    </td>'

+ '      <td class="ios-mid"></td>'

+ '  <td class="ios-left" id="btnback">'

+ (
    window.MAIN_LANG.dir == "ltr"

    ?

   window.MAIN_LANG.back_lbl +'<i class="demo-icon icon-right-open"></i>'

    :

    window.MAIN_LANG.back_lbl+'<i class="demo-icon icon-left-open"></i>'
)

+ '      </td>'

+ '  </tr></table>'
+ '</div>'


+ MenuMainHeaderHTML
+ '';

var SEARCH_HTML = (function () {

    var values = [5,10,15,20,25,30,35,40,45,50];
    var optionsHTML = "";

    for (var i = 0; i < values.length; i++) {

        optionsHTML +=
            '<option value="' + values[i] + '">' +
            values[i] +
            '</option>';
    }

    return '' +

    '<div id="search_con">' +

      '<div class="contentholder">' +

        '<div class="andholder" style="display: none";>' +


          '<div class="search-match-group">' +

    '<div>' + window.MAIN_LANG.word_match_options_lbl + ':</div>' +

    '<label class="custom-control">' +
        '<input type="radio" name="searchMatch" value="normal" id="wordMatchNom" checked="checked"  onchange="onWordMatchChange(this)" />' +
        '<span class="circle"><span class="dot"></span></span>' +
        '<span>' + window.MAIN_LANG.normal_match_lbl + '..</span>' +
    '</label>' +

    '<br>' +

    '<label class="custom-control">' +
        '<input type="radio" name="searchMatch" value="part" id="wordMatchPart" onchange="onWordMatchChange(this)" />' +
        '<span class="circle"><span class="dot"></span></span>' +
        '<span>' + window.MAIN_LANG.partial_match_lbl + '..</span>' +
    '</label>' +

    '<br>' +

    '<label class="custom-control">' +
        '<input type="radio"" name="searchMatch" value="stem" id="wordMatchStem" onchange="onWordMatchChange(this)" />' +
        '<span class="circle"><span class="dot"></span></span>' +
        '<span>' + window.MAIN_LANG.root_match_lbl + '..</span>' +
    '</label>' +

    '</div>'+

    '<hr>'+




          '<div class="search-type-group">' +

            '<label class="search-type-label">' +
              '<input type="radio" name="searchType" value="exact" class="search-type-radio"  checked="checked" onchange="onSearchTypeChange(\'exact\')" />' +
              '&nbsp<span>'+window.MAIN_LANG.exact_matach_lbl+'</span>' +
            '</label>' +
            '<br>' +
            '<label class="search-type-label">' +
              '<input type="radio" name="searchType" value="all" class="search-type-radio" onchange="onSearchTypeChange(\'all\')" />' +
              '&nbsp<span>'+window.MAIN_LANG.all_matach_lbl+'</span>' +
            '</label>' +
            '<br>' +
            '<label class="search-type-label">' +
              '<input type="radio" name="searchType" value="any" class="search-type-radio" onchange="onSearchTypeChange(\'any\')" />' +
              '&nbsp<span>'+window.MAIN_LANG.any_matach_lbl+'</span>' +
            '</label>' +

          '</div>' +

          '<hr>' +




            '<div class="search-options">' +
            '<input id="highlightsearch" type="checkbox"  class="wSearchHighlight" onchange="onToggleHighlightSearch()" />' +
            '&nbsp<span class="wSearchHighlight">'+window.MAIN_LANG.hit_enable_option_lbl+'</span>' +
          '</div>' +



           '<div class="search-options">' +
            '<input id="highlightpartsearch" type="checkbox" checked="checked" onchange="toggleSearchpartHighlight()" />' +
            '&nbsp<span class="wSearchHighlight">'+window.MAIN_LANG.hit_part_enable_option_lbl+'</span>' +
          '</div>' +





          '<hr>' +



'<div class="search-scope">' +
        '<div>' + window.MAIN_LANG.select_section_lbl + ':</div>' +
        '<label class="custom-control">' +
            '<input id="mn33_sec" type="checkbox" checked="checked" onchange="toggleScopeSections(this)" />' +
            //'<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.MAIN_LANG.mn_section_arabic_lbl + '..</span>' +
        '</label>' +

        '<br>' +
		 
		'<label class="custom-control">' +
            '<input id="all_ar_sec" type="checkbox"  onchange="toggleScopeSections(this)" />' +
            //'<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.MAIN_LANG.all_sections_arabic_lbl+ '..</span>' +
        '</label>' +

        '<br>' +

        '<label class="custom-control">' +
            '<input id="all_en_sec" type="checkbox"  onchange="toggleScopeSections(this)" />' +
            //'<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.MAIN_LANG.all_sections_international_lbl + '..</span>' +
        '</label>' +
		
		'<br>' +

        '<label class="custom-control">' +
            '<input id="custom_sec" type="checkbox"  onchange="toggleScopeSections(this)" />' +
            //'<span class="box"><span class="tick"><i class="demo-icon icon-ok"></i></span></span>' +
            '<span>' + window.MAIN_LANG.custom_sections_lbl + '..</span>' +
        '</label>' +

    '</div>' +

'<hr>' +
          '<div class="wSearchResultSettingsSmallScr">' +

            '<div class="wSearchCountComboSmallScr">' +
			
              '<select class="wSearchCountSmallScr" id="searchResCount" onchange="onMaxPageCountChange(this.value)">' +
                optionsHTML +
              '</select>' +
			  
			  '&nbsp;<span class="wSearchCountSmallScr"> '+window.MAIN_LANG.results_per_page_lbl+' </span>' +
            '</div>' +

        

          '</div>' +


        '</div>' +

       

        '<div class="wSearchResultItemsBlockSmallScr ' + window.MAIN_LANG.dir + '">' +
          
          '<iframe id="resultsFrame" class="' + window.MAIN_LANG.dir + '" src="search_results.html" style="width: 100%; height: 100%; border-width: medium; border-style: none; border-color: currentcolor; border-image: initial;"></iframe>' +
        '</div>' +

        '<div class="wSearchNavigationSmallScr ' + window.MAIN_LANG.dir + '" style="display: none;">' +

          '<div id="wSearchEnd" class="wSearchEnd" style="display:none;">' +
            'نهاية نتائج البحث ..' +
          '</div>' +

          (

            window.MAIN_LANG.dir == "ltr"

            ?

            // =========================
            // LTR
            // =========================

            '<div class="wSearchFirstSmallScr ltr">' +
              '<a id="searchfirst" class="wSearchFirstSmallScr">' +
                '<span><i class="demo-icon icon-to-start-alt"></i><br>' +
                window.MAIN_LANG.first_lbl +
                '</span>' +
              '</a>' +
            '</div>' +

            '<div class="wSearchBackSmallScr ltr">' +
              '<a id="searchprev" class="wSearchBackSmallScr">' +
                '<span><i class="demo-icon icon-fast-bw"></i><br>' +
                window.MAIN_LANG.back_lbl +
                '</span>' +
              '</a>' +
            '</div>' +

            '<div class="wSearchNextSmallScr ltr">' +
              '<a id="searchnext" class="wSearchNextSmallScr">' +
                '<span><i class="demo-icon icon-fast-fw"></i><br>' +
                window.MAIN_LANG.next_lbl +
                '</span>' +
              '</a>' +
            '</div>' +

            '<div class="wSearchLastSmallScr ltr">' +
              '<a id="searchlast" class="wSearchLastSmallScr">' +
                '<span><i class="demo-icon icon-to-end-alt"></i><br>' +
                window.MAIN_LANG.last_lbl +
                '</span>' +
              '</a>' +
            '</div>'

            :

            // =========================
            // RTL
            // =========================

            '<div class="wSearchFirstSmallScr rtl">' +
              '<a id="searchfirst" class="wSearchFirstSmallScr">' +
                '<span><i class="demo-icon icon-to-end-alt"></i><br>' +
                window.MAIN_LANG.first_lbl +
                '</span>' +
              '</a>' +
            '</div>' +

            '<div class="wSearchBackSmallScr rtl">' +
              '<a id="searchprev" class="wSearchBackSmallScr">' +
                '<span><i class="demo-icon icon-fast-fw"></i><br>' +
                window.MAIN_LANG.back_lbl +
                '</span>' +
              '</a>' +
            '</div>' +

            '<div class="wSearchNextSmallScr rtl">' +
              '<a id="searchnext" class="wSearchNextSmallScr">' +
                '<span><i class="demo-icon icon-fast-bw"></i><br>' +
                window.MAIN_LANG.next_lbl +
                '</span>' +
              '</a>' +
            '</div>' +

            '<div class="wSearchLastSmallScr rtl">' +
              '<a id="searchlast" class="wSearchLastSmallScr">' +
                '<span><i class="demo-icon icon-to-start-alt"></i><br>' +
                window.MAIN_LANG.last_lbl +
                '</span>' +
              '</a>' +
            '</div>'

          ) +

        '</div>' +

      '</div>' +




        '<div class="wSearchMessageSmallScr" style="">' +
         // '<span id="searchMsg" class="wSearchMessageSmallScr" style="">'+window.MAIN_LANG.search_note_lbl+'</span>' +
        
		'<div id="searchResList" style=""></div>' +
		'</div>' +

        





    '</div>';

})();


var tabsHTML = ''
//+ '<div class="tabs-wrapper">'



+ '  <div class="tabs-container" id="tabsContainer">'
+ '  <div class="tab-scroll" style="width:100%">'


+ '    <div class="tab-content active" style="width:100%">'
+ '      <div class="ios-list">'
+ IFRAME_HTML
+ '      </div>'
+ '    </div>'


+ '    <div class="tab-content" style="display:none;">'
+ '      <div class="ios-list">'
+ '        <div class="ios-list-item">'+SEARCH_HTML+'</div>'
+ '      </div>'
+ '    </div>'

+ '    <div class="tab-content"  id="favorites_con" style="display:none;">'
+ '      <div class="ios-list">'

+ '      </div>'
+ '    </div>'





+ '  </div>'
+ '</div>'

+ cover;





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
          '<td colspan="3"><div id="pageList" style="display: none;"><div id="pageNums" class="pageNums"></div></div></td>' +
        '</tr>' +

        '<tr id="footerRow">' +
          '<td colspan="3">{{footer}}</td>' +
        '</tr>' +

      '</tbody>' +

    '</table>';
























var currentIndex = 0;
var skipHitidRemoval = false;

var isIE6 = !window.XMLHttpRequest;


// Assets/template.legacy.table.js
var domElements = {
    iframe: null,
    searchDiv: null,
    favoritesDiv: null,
    searchBar: null,
    favBar: null,
    searchInput: null,
    favInput: null,
    searchButton: null,
    favButton: null,
    moreButton: null,
    moreButton2: null,
    jellyMenu: null,
    jellyMenu2: null,
    scrollTopBtn: null,
    scrollBottomBtn: null,
    hideBtn: null,
    loginBtn: null
};








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

var UI_STATE = {};
var isIframeFull = false;
var __SEARCH_STARTED__ = false;





var myTabs =null;
var currentVisualIndex = 0;



function Tabs(el, o) {
    o = o || {};
    
    var t = this;
    
    t.speed = o.speed || 300;
    t.defaultTab = o.defaultTab;
    
    t.switchTab = function(tabParam) {

        // Prevent multiple simultaneous tab switches
        if (window.isSwitchingTab) {
            return;
        }
        window.isSwitchingTab = true;

        // Store original tab param for after animation
        var targetTab = tabParam;

        var targetIndex =
            tabParam === 'search' ? 1 :
            (tabParam === 'favorite' ? 2 : 0);

        // Don't animate if already on same tab
        if (currentVisualIndex === targetIndex) {
            window.isSwitchingTab = false;
            return;
        }

        // Hide all headers initially
        $("#pageList, .ios-header, #mainHeader, #searchHeader, #favHeader, #SnipitHeader").hide();

        // Show proper header
        if (targetIndex === 0) {

            $("#mainHeader").show();

        } else if (targetIndex === 1) {

            if ($("#iframSnipit").hasClass("show")) {

                $("#SnipitHeader").show();

            } else {

                $("#searchHeader").show();

                if ($("#pageNums .page-item, #pageNums a, #pageNums span").length > 0) {
                    $("#pageList").show();
                    $("#pageList").css("zoom", "1");
                }
            }

        } else if (targetIndex === 2) {

            $("#favHeader").show();
        }

        // Active button
        $(".tab_switch_butt")
            .removeClass("active")
            .eq(targetIndex)
            .addClass("active");

        $(".tab-content")
            .removeClass("active")
            .eq(targetIndex)
            .addClass("active");

        // IE8 repaint
        if (
            typeof isIE6 !== "undefined" &&
            !isIE6 &&
            navigator.userAgent.indexOf("MSIE 8") > -1
        ) {
            $(".tab-content").each(function () {
                $(this).css("zoom", "1");
            });
        }

        var containerWidth = getWidth();

        var isLTR =
            window.MAIN_LANG &&
            window.MAIN_LANG.dir === "ltr";

        // Make all tabs visible during animation
        $(".tab-content").show();

        $(".tab-scroll").css({
            position: "relative",
            width: (containerWidth * 3) + "px"
        });

        $(".tab-content").css({
            display: "",
            width: containerWidth + "px",
            float: isLTR ? "left" : "right"
        });

        // Current visual position
        var startLeft = isLTR
            ? -(currentVisualIndex * containerWidth)
            : (currentVisualIndex * containerWidth);

        // Target visual position
        var endLeft = isLTR
            ? -(targetIndex * containerWidth)
            : (targetIndex * containerWidth);

        $(".tab-scroll").css("left", startLeft + "px");

        $(".tab-scroll")
            .stop(true, true)
            .animate(
                {
                    left: endLeft + "px"
                },
                t.speed,
                function () {

                    // Hide inactive tabs
                    $(".tab-content")
                        .not(".active")
                        .css({
                            display: "none"
                           
                        });

                    // Show active tab
                    $(".tab-content.active").css({
                         display: "",
						 width: "100%"
                    });

                    // Reset slider
                    $(".tab-scroll").css({
                        left: "0",
                        width: "100%"
                    });

                    currentVisualIndex = targetIndex;
                    window.currentIndex = targetIndex;

                    // Update hash silently
                    /*if (typeof setParams === "function") {
                        setParams(
                            { tab: targetTab },
                            true,
                            false
                        );
                    }*/

                    window.isSwitchingTab = false;
                }
            );
    };
    
    // Initialize
    t.switchTab(t.defaultTab);
}








function startSearchWhenReady()
{
	
	
	var params = getParams();
    var tabParam = params.tab || "";
    var rhsearchParam = params.rhsearch;
	
	
	
	
	
    if (__SEARCH_STARTED__) return;

    if (
        window.doSearch &&
        window.initSearchPage &&
        window.callbackAndSearchFlagRead &&
        document.getElementById("search_con") &&
        document.getElementById("resultsFrame")
    ) {
        __SEARCH_STARTED__ = true;

        gbWhFHost = true;
         var iframe =document.getElementById("resultsFrame");

         
        setTimeout(function ()
        {  
		
		     if(rhsearchParam){
				 
				
				 
				iframe.style.height = "0";
		    	doSearch();
		     }
            
        }, 100);

        return;
    }

    setTimeout(startSearchWhenReady, 50);
}








function restore_iframe() {

    function restore($el) {

        if (!$el.length) return;

        var el = $el[0];

        if (!UI_STATE[el]) return;

        var props = UI_STATE[el];

        for (var p in props) {
            el.style[p] = props[p];
        }
    }

    restore($(".andholder"));
    //restore($(".wSearchMessageSmallScr"));
    restore($(".wSearchNavigationSmallScr"));
    restore($("#pageList"));
    //restore($(".contentholder"));
    restore($("#resultsFrame"));
}



function makeifrme_full(){

    function save(el, prop) {
        if (!el) return;
        if (!UI_STATE[el]) UI_STATE[el] = {};
        if (UI_STATE[el][prop] === undefined) {
            UI_STATE[el][prop] = el.style[prop] || "";
        }
    }



    $(".ios-header").hide();

    // =====================================
    // SHOW SNIPPET HEADER
    // =====================================

    $("#SnipitHeader").show();
    $("#iframSnipit").addClass("show");

    var andholder = document.getElementsByClassName("andholder")[0];
    if (andholder) {
        save(andholder, "display");
        andholder.style.display = "none";
    }

    var msg = document.getElementsByClassName("wSearchMessageSmallScr")[0];
    if (msg) {
        save(msg, "display");
        //msg.style.display = "none";
    }

    var nav = document.getElementsByClassName("wSearchNavigationSmallScr")[0];
    if (nav) {
        save(nav, "display");
        nav.style.display = "none";
    }

    var pageList = document.getElementById("pageList");
    if (pageList) {
        save(pageList, "display");
        pageList.style.display = "none";
    }

    var contentholder = document.getElementsByClassName("contentholder")[0];
    if (contentholder) {
        save(contentholder, "overflow");
        contentholder.style.overflow = "hidden";
    }

    var iframe = document.getElementById("resultsFrame");
    if (iframe) {
        save(iframe, "width");
        save(iframe, "height");
        save(iframe, "border");

        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
    }
}









var FavSystem = function (action, p1, fromMessage, messageUrl, messageTitle) {

    // 🔥 المصدر الوحيد
    var list = window._favsCache || [];

    function norm(u) {
        if (!u) return "";
        return u
            .replace(/^https?:\/\/[^\/]+/i, "")
            .replace(/^file:\/\/\//i, "")
            .replace(/^\//, "");
    }

    function findItem(list, url) {
        for (var i = 0; i < list.length; i++) {
            if (norm(list[i].url) === url) return list[i];
        }
        return null;
    }

    function exists(list, url) {
        return findItem(list, url) !== null;
    }

    // ================= URL + TITLE =================
    var url = norm(
        messageUrl ||
        window._lastIframeUrl ||
        window.location.href
    );

    var title =
        messageTitle ||
        window._lastIframeTitle ||
        document.title ||
        "";

    var current = url;

    var $input = $("#favInput");
    var $container = $("#favorites_con");

    // ================= ACTIONS =================
    if (action === "save") {

        if (exists(list, url)) {
            alert(window.MAIN_LANG.already_saved_lbl || "Already saved!");
            return;
        }

        var inputTitle = $input.length ? $.trim($input.val()) : "";

        var finalTitle =
            inputTitle ||
            window._lastIframeTitle ||
            title ||
            "Favorite";

        list.push({
            title: finalTitle,
            url: url,
            time: new Date().getTime()
        });

        // ✅ FIX: Store as JSON string in cache
        window._favsCache = list;
        
        // ✅ FIX: Send as JSON string to storage
        sendMulti({ favorites: JSON.stringify(list) });

        // Clear input after save
        if ($input.length) {
            $input.val("");
        }

        // Re-render to show updated list
        FavSystem(); // This will refresh the display

        return;
    }

    if (action === "delete") {

        list.splice(p1, 1);

        // ✅ FIX: Store as JSON string in cache
        window._favsCache = list;
        
        // ✅ FIX: Send as JSON string to storage
        sendMulti({ favorites: JSON.stringify(list) });

        // Re-render to show updated list
        FavSystem();

        return;
    }

    if (action === "clear") {

        // ✅ FIX: Clear cache and send empty array as JSON string
        window._favsCache = [];
        sendMulti({ favorites: JSON.stringify([]) });

        // Re-render to show empty list
        FavSystem();

        return;
    }

    // ================= RENDER =================
    if ($container.length) {

        var html = "";

        if (!list.length) {
            html = "<div class='fav-empty'>" + (window.MAIN_LANG.no_favorites_lbl || "No favorites yet") + "</div>";
        } else {
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var isActive = norm(item.url) === norm(current);
                var safeUrl = item.url || "#";
                var safeTitle = item.title || "Untitled";
                var safeUrlDisplay = item.url || "";

                html += '<div class="fav-item ' + (isActive ? 'active' : '') + '">';
                html += '<a href="' + safeUrl + '" class="fav-link" data-idx="' + i + '">';
                html += (isActive ? "<i class=\"demo-icon icon-bookmark-3\"></i> " : "<i class=\"demo-icon icon-pin\"></i> ");
                html += "<strong>" + escapeHtml(safeTitle) + "</strong><br>";
                html += "<small>" + escapeHtml(safeUrlDisplay) + "</small></a>";
                html += '<button class="fav-del" data-idx="' + i + '"><i class="demo-icon icon-cancel"></i></button>';
                html += '</div>';
            }
        }

        $container.html(html);

        // ================= EVENTS =================
        $container.off("click").on("click", function (e) {

            var $target = $(e.target);

            var $del = $target.closest(".fav-del");

            if ($del.length) {
                FavSystem("delete", $del.data("idx"));
                return;
            }

            var $link = $target.closest(".fav-link");

            if ($link.length) {
                e.preventDefault();

                var idx = $link.data("idx");
                var targetItem = list[idx];

                if (targetItem && targetItem.url) {
                    if (window.setParams) {
                        setParams({ url: targetItem.url, tab: null }, true);
                    } else {
                        window.location.href = targetItem.url;
                    }
                }
            }
        });

        // Auto-scroll to active favorite
        var $active = $container.find(".active");
        if ($active.length) {
            setTimeout(function() {
                var scrollPos = $active.position().top + $container.scrollTop() - 100;
                $container.stop().animate({
                    scrollTop: scrollPos > 0 ? scrollPos : 0
                }, 200);
            }, 100);
        }
    }

    // ================= UPDATE INPUT =================
    if ($input.length) {
        var currentTitle = title || "";
        if ($input.val() !== currentTitle) {
            $input.val(currentTitle);
        }
    }

    return current;
};

// Helper function to escape HTML (prevents XSS)
function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}










// =========================
// GET CONTAINER WIDTH (SAFE)
// =========================
function getWidth() {
    var el = document.getElementById('tabsContainer');
    return el.clientWidth; // clean width (no border/scroll)
}


// =========================
// FIX LAYOUT
// =========================
function layoutTabs() {

    if (isIE6) {
        return;
    }

    var w = getWidth();

    var tabs = $(".tab-content");
    var count = tabs.length;

    // active tab only
    tabs.not(".active").css({
        display: "none"
    });

    tabs.filter(".active").css({
       display: ""
    });

    // reset strip
    $(".tab-scroll").css({
        left: "0",
        width: "100%"
    });

    currentVisualIndex = window.currentIndex || 0;
}



function closeAllMenus() {
    $('#Main_Menu_Header').hide();
    $('#More_Menu_Footer').hide();
	//$("#subFooterRow").show();
	$("#searchHeader .ios-right").show();
	$("#favHeader .ios-right").show();
	
    $("#cover").hide();
	$('*').css('overflow', ''); // search



		var resultsFrame =
		$("#resultsFrame")[0];
		     var msg = {

            type      : "hide_sheet",

            vlaue     : true
          
        };

	sendToChild(msg,resultsFrame);



}



function toggleMoreMenu() {

    var menu = $("#More_Menu_Footer");

    if (menu.is(":visible")) {
        // 🔴 اغلاق
        menu.hide();
        $("#cover").hide();

        // ✅ رجّع scroll
       $('*').css('overflow', '');
       closeAllMenus();
    } else {
        // 🟢 فتح
        closeAllMenus();
        menu.show();
        $("#cover").show();
        //$("#subFooterRow").hide();
		
        // 🔥 امنع scroll فقط search + favorite
        // 🔥 امنع scroll فقط search + favorite
        $('.scrollBox,.tab-content').scrollTop(0);
		$('.scrollBox,.tab-content').css('overflow', 'hidden'); // search
		

    }
}

function waitForIframeLoad(callback) {

  var iframe = document.getElementById("iframe_con");

  if (!iframe) {
    callback(false);
    return;
  }

  // =========================
  // 🔹 CHECK ALREADY LOADED
  // =========================
  try {
    if (
      iframe.contentWindow &&
      iframe.contentWindow.document &&
      iframe.contentWindow.document.readyState === 'complete'
    ) {
      callback(true);
      return;
    }
  } catch (e) {
    // cross-origin → assume loaded
    callback(true);
    return;
  }

  // =========================
  // 🔹 WAIT FOR LOAD EVENT
  // =========================
  var done = false;

  function finish(result) {
    if (done) return;
    done = true;
    callback(result);
  }

  // IE6–IE8
  if (iframe.attachEvent) {
    iframe.attachEvent('onload', function () {
      finish(true);
    });
  }
  // modern
  else if (iframe.addEventListener) {
    iframe.addEventListener('load', function () {
      finish(true);
    }, false);
  }

  // =========================
  // 🔹 TIMEOUT (10s)
  // =========================
  setTimeout(function () {
    finish(false);
  }, 10000);
}

function sendMulti(values) {

    var msg = {
        from: "parent",
        msg: {
            type: "setValues",
            values: values
        }
    };

    var iframe = document.getElementById("storageFrame");

    if (!iframe || !iframe.contentWindow) {
        return;
    }

    var isOldIE =
        !window.postMessage ||
        /MSIE 6|MSIE 7/i.test(navigator.userAgent);

    // =============================================
    // MODERN BROWSERS
    // =============================================

    if (!isOldIE) {

        iframe.contentWindow.postMessage(
            JSON.stringify(msg),
            "*"
        );
    }

    // =============================================
    // IE6 / IE7
    // =============================================

    else {

        // =========================================
        // jquery.ba-postmessage fallback
        // =========================================

        jQuery.pm = jQuery.pm || {};

        jQuery.pm.poll_time = 50;

        // SAME DOMAIN PROXY FILE
        jQuery.pm.iframe_url = "postmessage.htm";

        if (
            window.jQuery &&
            $.postMessage
        ) {

            $.postMessage(
                JSON.stringify(msg),
                "*",
                iframe.contentWindow
            );
        }

        // =========================================
        // FINAL FALLBACK
        // =========================================

        else {

            try {
                iframe.contentWindow.name =
                    JSON.stringify(msg);
            } catch (e) {}
        }
    }
}

// =============================================
// CLEAN URL - Extract only the app-relative path
// =============================================
function cleanAppUrl(url) {
   // if (!url) return "index.php.htm";
    
    // Extract hash if exists (both # and %23)
    var hash = '';
    var hashIndex = url.indexOf('#');
    var encodedHashIndex = url.indexOf('%23');
    
    if (hashIndex !== -1) {
        hash = url.substring(hashIndex);
        url = url.substring(0, hashIndex);
    } else if (encodedHashIndex !== -1) {
        hash = url.substring(encodedHashIndex);
        url = url.substring(0, encodedHashIndex);
    }
    
    // If it already starts with "index.php", keep it
    if (url.indexOf("index.php") === 0) {
        return url + hash;
    }
    
    // Look for "index.php/" pattern
    var match = url.match(/index\.php(\/.*)?$/);
    if (match) {
        return match[0] + hash;
    }
    
    // Look for "/index.php/" with leading slash
    var slashMatch = url.match(/\/index\.php(\/.*)?$/);
    if (slashMatch) {
        return slashMatch[0].substring(1) + hash; // Remove leading slash
    }
    
    // If it's just an HTML file
    if (url.indexOf(".html") !== -1 || url.indexOf(".htm") !== -1) {
        var parts = url.split("/");
        var filename = parts[parts.length - 1];
        if (filename === "index.php.htm") {
            return "index.php.htm" + hash;
        }
        return "index.php/forum_mn33/" + filename + hash;
    }
    
    return "index.php.htm" + hash;
}

function getRelativePath(fullUrl, parentPath) {

  // Remove file:// prefix and drive letter
  var cleanUrl = fullUrl
    .replace(/^file:\/\/\/[A-Z]:\//, '')
    .replace(/^file:\/\/\//, '');

  var cleanParent = parentPath
    .replace(/^file:\/\/\/[A-Z]:\//, '')
    .replace(/^file:\/\/\//, '');

  // Get parent directory
  var lastSlash = cleanParent.lastIndexOf('/');
  var parentDir = lastSlash !== -1 ? cleanParent.substring(0, lastSlash) : '';

  // startsWith replacement
  if (cleanUrl.indexOf(parentDir) === 0) {
    return cleanUrl.substring(parentDir.length + 1);
  }

  return cleanUrl;
}






var lastUrl = null;
var lastHasHitId = null;

function loadIframe(url) {

    if (!domElements.iframe) {
        return;
    }

    try {

        if (
            domElements.iframe.contentWindow &&
            domElements.iframe.contentWindow.location
        ) {

            domElements.iframe.contentWindow.location.replace(url);

        } else {

            domElements.iframe.src = url;
        }

    } catch (e) {

        domElements.iframe.src = url;
    }
}

function onHashChange() {

    var params = getParams();

    var url =
        cleanAppUrl(
            params.url ||
            "index.php.htm"
        );

    var tabParam =
        params.tab || "";

    if (tabParam === "search") {

        myTabs.switchTab("search");
        return;
    }

    if (tabParam === "favorite") {

        myTabs.switchTab("favorite");
        return;
    }

    var hasHitId =
        ("hitid" in params);

    // first run
    if (lastUrl === null) {

        lastUrl = url;
        lastHasHitId = hasHitId;

        var currentSrc = "";

        try {
            currentSrc =
                domElements.iframe.src || "";
        } catch (e) {}

        // load only if iframe not already on same page
        if (
            currentSrc &&
            currentSrc.indexOf(url) === -1
        ) {
            loadIframe(url);
        }

        myTabs.switchTab(null);

        return;
    }

    var shouldReload = false;

    if (lastUrl !== url) {

        shouldReload = true;
    }

    if (
        lastHasHitId !== hasHitId
    ) {

        shouldReload = true;
    }

    lastUrl = url;
    lastHasHitId = hasHitId;

    if (shouldReload) {

        console.log(
            "LOAD:",
            url,
            "hasHitId:",
            hasHitId
        );

        loadIframe(url);
    }

    var resultsFrame =
        $("#iframe_con")[0];

    var msg = {

        type  : "set_scroll",

        vlaue : true

    };

    sendToChild(
        msg,
        resultsFrame
    );

    myTabs.switchTab(null);
}




function setParams(
    updates,
    silent,
    reload
) {

    var params = getParams();

    $.each(updates, function(key, val) {

        if (
            val === null ||
            val === undefined ||
            val === ""
        ) {

            delete params[key];

        } else {

            params[key] = val;
        }
    });

    var arr = [];

    $.each(params, function(key, val) {

        arr.push(
            key +
            "=" +
            encodeURIComponent(val)
        );
    });

    var newHash =
        arr.length
            ? "#&" + arr.join("&")
            : "#";

    if (reload) {

        lastUrl = "";
    }

    if (window.location.hash !== newHash) {

        window.location.hash =
            newHash;

    } else if (reload) {

        onHashChange();
    }
}




function getParams() {
    var params = {};
    var hash = window.location.hash || "";
    
    // remove "#&" or "#"
    var hashContent = hash.replace(/^#&?/, "");

    if (hashContent) {
        var parts = hashContent.split("&");

        $.each(parts, function (_, part) {
            if (!part) return;

            var kv = part.split("=");
            var key = kv[0];
            var val = kv[1] || "";

            if (key) {
                try {
                    params[key] = decodeURIComponent(val);
                } catch (e) {
                    params[key] = val;
                }
            }
        });
    }

    return params;
}


function getHashUrl() {
    var params = getParams();
    return params.url || "";
}

function getTabParam() {
    var params = getParams();
    return params.tab || "";
}

function getBasePath() {
    return window.location.href.split('#')[0].replace(/[^\/]+$/, '');
}







function initDomReferences() {

    domElements.iframe        = $("#iframe_con")[0];
    domElements.searchDiv     = $("#search_con")[0];
    domElements.favoritesDiv  = $("#favorites_con")[0];

    domElements.searchBar     = $("#search_bar")[0];
    domElements.favBar        = $("#fav_bar")[0];

    domElements.searchInput   = $("#searchBox")[0];
    domElements.favInput      = $("#favBox")[0];

    domElements.searchButton  = $("#search_butt")[0];
    domElements.favButton     = $("#fav_butt")[0];

    domElements.moreButton    = $("#more_butt")[0];
    domElements.moreButton2   = $("#more_butt2")[0];

    domElements.jellyMenu     = $("#jellyMenu")[0];
    domElements.jellyMenu2    = $("#jellyMenu2")[0];

    domElements.scrollTopBtn  = $("#scrollTopBtn")[0];
    domElements.scrollBottomBtn = $("#scrollBottomBtn")[0];

    domElements.hideBtn       = $("#hideBtn")[0];
    domElements.loginBtn      = $("#loginBtn")[0];
}


(function () {

  /* =====================================================
     WAIT FOR APP + jQuery
  ===================================================== */
function wait(fn) {
    var app = document.getElementById('app');

    if (app && window.jQuery && window.$ && window.MAIN_LANG) {
        fn(app, window.jQuery);
    } else {
        setTimeout(function () { wait(fn); }, 15);
    }
}












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
      header: iosHeaderHTML,
      footer: footerBarHTML,
      iframe: tabsHTML,
      left: left,
      right: right,
      pages: pages
    });


    var LANG = window.MAIN_LANG;

    app.innerHTML = html;
    setBg("");


    myTabs = new Tabs(document.getElementById("tabContainer"), {
       animationSpeed: 300,
       dir: LANG.dir
    });

	
    var isTouch = false;

    $(".tab-item").bind("touchstart mousedown touchend mouseup touchcancel mouseleave", function (e) {

        var $el = $(this);

        // ===== TOUCH DETECT =====
        if (e.type === "touchstart") isTouch = true;

        // prevent double fire (touch + mouse)
        if (isTouch && e.type.indexOf("mouse") === 0) return;

        // ===== PRESS =====
        if (e.type === "touchstart" || e.type === "mousedown") {
            $el.addClass("pressed");
        }

        // ===== RELEASE =====
        if (
            e.type === "touchend" ||
            e.type === "mouseup" ||
            e.type === "touchcancel"
        ) {
            $el.removeClass("pressed");

            //$(".tab-item").removeClass("active bounce");

            //$el.addClass("active");

            // force reflow (important for animation replay)
            this.offsetHeight;

            $el.addClass("bounce");

            setTimeout(function () {
                $el.removeClass("bounce");
            }, 350);
        }

    });
	
	
	
	
	setTimeout(function () {
     
	 showApp();
	 
	 
	 hideLoader();
	 
      

     $("body")
            .attr("dir", LANG.dir)
            .removeClass("rtl ltr")
            .addClass(LANG.dir);


	 enableDragScroll(".pageNums");
	 
	 
	 initDomReferences();
	 
	 
	 
	 lastUrl = cleanAppUrl(
    getHashUrl() ||
    "index.php.htm"
);

lastHasHitId =
    ("hitid" in getParams());
	 
	 var params;
	 var urlParam;
	 var tabParam;
	 var rhsearchParam;
	 

	 
	 
	params = getParams();
    urlParam = params.url;
    tabParam = params.tab;
  
	
	rhsearchParam = params.rhsearch;
	 
	 
	 
	 var home_image = document.getElementById("home-image");

if (home_image && home_image.filters && !window.XMLHttpRequest) { // IE6 only

    var src = home_image.src;

    home_image.style.width  = "40px";
    home_image.style.height = "40px";
    home_image.style.zoom = 1;

    home_image.style.filter =
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
        src +
        "', sizingMethod='scale')";

    home_image.src = "./Assets/images/generic/transparent.gif"; // 1x1 gif
}
	 
	 


var css = ""
+ "@media only screen and (max-width:600px){"
+ "#More_Menu_Footer2{display:inline-block !important}"
+ "}"
+ "@media only screen and (min-width:600px){"
+ ".More_Menu_Footer{display:none !important}"
//+ "#cover{display:none!important}"
+ "}"
+ "@media only screen and (max-width:600px){"
+ "#login_butt1,#hide_butt1{display:none !important}"
+ "}";

MediaCSS.init(css);

	 






$('#btnMenu').click(function (e) {
    e = e || window.event;

    var $menu = $('#Main_Menu_Header');

    if ($menu.is(':visible')) {
        // إذا مفتوحة → بس اغلقها
        $menu.hide();
		$("#cover").hide();
		
    } else {
        // إذا مغلقة → اغلق الباقي وافتحها
        closeAllMenus();
		$("#cover").show();
        $menu.show();
		//$("#subFooterRow").hide();
		//$("#iframSnipit").removeClass("show");
    }

    // منع bubbling (IE6)
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
});



$('.tab_switch_butt').click(function (e) {
    e.preventDefault();
    
    var index = parseInt($(this).attr('data-tab'), 10);

    // IE6 safe check
    if (isNaN(index)) return;

    // Toggle to home (index 0)
    if (currentIndex === index) {
        index = 0;
    }


	



    if (index == 0) {

	  params = getParams();

 

 /*     if (typeof params.tab == "undefined") {


      setParams({ url: "index.php.htm" }, false);  


      }
*/
	  setParams({ tab: null }, false);	
		
        //switchTab('search');
    }

    // =========================
    // 🔹 SEARCH TAB
    // =========================
    if (index == 1) {
        setParams({ tab: 'search' }, false);
        //switchTab('search');
		

    }

    // =========================
    // 🔹 FAVORITE TAB
    // =========================
    if (index == 2) {
        setParams({ tab: 'favorite' }, false);
        //switchTab('favorite');
    }

});





$(document).click(function (e) {
    var target = e.target || e.srcElement;

    if (!$(target).closest('#searchBox,#Main_Menu_Header, #btnMenu, #More_Menu_Footer, #More_Menu_Footer2').length) {

      closeAllMenus();
	  
    }
});






// =====================================
// UP BUTTON
// =====================================

$("#btnUpSearch").click(function()
{
	var resultsFrame =
		$("#resultsFrame")[0];

	sendToChild(
	{
		type: "scroll_search_up"
	},
	resultsFrame);
});

// =====================================
// DOWN BUTTON
// =====================================

$("#btnDownSearch").click(function()
{
	var resultsFrame =
		$("#resultsFrame")[0];

	sendToChild(
	{
		type: "scroll_search_down"
	},
	resultsFrame);
});







// From button click
$("#btnDownVs").click(function() {

    var resultsFrame =
		$("#resultsFrame")[0];

	sendToChild(
	{
		type: "scroll_snipit_down"
	},
	resultsFrame);




});
$("#btnUpVs").click(function() { 


var resultsFrame =
		$("#resultsFrame")[0];

	sendToChild(
	{
		type: "scroll_snipit_up"
	},
	resultsFrame);





});



$("#btnSet").click(function() { 


var resultsFrame =
		$("#resultsFrame")[0];

	sendToChild(
	{
		type: "scroll_snipit_set"
	},
	resultsFrame);





});










var resizeTimer = null;

function onResizeSafe() {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(function () {
       layoutTabs();

        closeAllMenus();
		
		
		$('.search-wrapper input').blur();
		$('.fav-wrapper input').blur();
    
		
    }, 100);
}

if (window.attachEvent) {
   // window.attachEvent('onresize', onResizeSafe);
} else {
   // window.onresize = onResizeSafe;
}

//onResizeSafe();


layoutTabs();






// Detect real support
var supportsHashChange = ('onhashchange' in window);

// =========================
// MODERN (IE8+ / browsers)
// =========================
if (supportsHashChange) {
    $(window).on('hashchange', onHashChange);
}

// =========================
// IE6 / IE7 fallback
// =========================
else {
    var lastHash = window.location.hash;

    setInterval(function () {
        var current = window.location.hash;

        if (current !== lastHash) {
            lastHash = current;
            onHashChange();
        }
    }, 150);
}




$("#btnback").click(function () {


var msg = JSON.stringify({

    type: "remove_overlay"

});

var frame =
    document.getElementById("resultsFrame");

if (
    frame &&
    frame.contentWindow
) {

    // MODERN
    if (window.postMessage) {

        frame.contentWindow.postMessage(
            msg,
            "*"
        );
    }

    // IE6 / IE7
    else {

        frame.contentWindow.name = msg;
    }
}

//alert();
   //$(".wSearchMessageSmallScr").show();

   restore_iframe();
   $("#iframSnipit").removeClass("show");
   $("#SnipitHeader").hide();
   $("#searchHeader").show();
   
   
   myTabs.switchTab("search");
   

});




$(document).on('focus', '.search-wrapper input', function () {
    setTimeout(function () {
        $("#cover").show();
		//$("#subFooterRow").hide();
		$("#searchHeader .ios-right").hide();
		
	    $('.scrollBox,.tab-content').scrollTop(0);
		$('.scrollBox,.tab-content').css('overflow', 'hidden'); // search
		
		
		var resultsFrame =
		$("#resultsFrame")[0];
		     var msg = {

            type      : "hide_sheet",

            vlaue     : true
          
        };

	sendToChild(msg,resultsFrame);
		
		
    }, 100); // ⏱️ الوقت بالميلي ثانية (300 = 0.3 ثانية)
});


// jQuery
$("#searchBox").keydown(function(e) {

    // ENTER = 13
    if (e.keyCode === 13) {

        searchHelp(null, 'searchBox');
        closeAllMenus();
		
		
		$('.search-wrapper input').blur();
		$('.fav-wrapper input').blur();
        // optional prevent form submit
        e.preventDefault();
    }
});

$(document).on('click', '#searchHeader .clear-btn', function () {
    $(this).closest('.search-wrapper').find('input').val('');
});






$(document).on('focus', '.fav-wrapper input', function () {
    setTimeout(function () {
        $("#cover").show();
		
		$("#favHeader .ios-right").hide();
		$('.scrollBox,.tab-content').scrollTop(0);
		$('.scrollBox,.tab-content').css('overflow', 'hidden'); // search
		
		
	
	
    }, 100); // ⏱️ الوقت بالميلي ثانية (300 = 0.3 ثانية)
});


$(document).on('click', '#favHeader .clear-btn', function () {
    $(this).closest('.fav-wrapper').find('input').val('');
});


$(document).on('click', '#searchfirst,#searchnext,#searchprev,#searchlast,.pageBtn', function () {
    $('.tab-content').scrollTop(0);
});

$(document).on('click', '#login_butt1,#login_butt2', function () {
    window.location.href="index.html";
});


$(document).on('click', '#hide_butt1,#hide_butt2', function () {
   
alert(window.url);
   window.location.href=window.url;
});


$(document.body).bind("selectstart", function (e) {

    var t = e.target || e.srcElement;

    // allow input + textarea
    if (
        $(t).is("input, textarea") ||
        $(t).closest("input, textarea").length
    ) {
        return true;
    }

    return false;
});






// Run on page load to ensure hash has URL parameter
if (!getHashUrl() && window.url) {
    /*var cleanUrl = cleanAppUrl(window.url);
    var encodedUrl = encodeURIComponent(cleanUrl);
   
	if(window.rhsearch){
		window.rhsearch = "&rhsearch="+window.rhsearch;
	}
	
	window.location.hash = "&url=" + encodedUrl+window.rhsearch;
    */
	
	//window.location.hash = "&url=index.php.htm";
	
	//console.log("Setting initial hash to: &url=" + encodedUrl);
} else if (!getHashUrl()) {
    //window.location.hash = "&url=index.php.htm";
}

// Fix the iframe navigation - use clean URL
if (urlParam && domElements.iframe) {
    var cleanParam = cleanAppUrl(urlParam);
   // console.log("Loading iframe with param:", cleanParam);
    domElements.iframe.contentWindow.location.replace(cleanParam);
}






if (tabParam === 'search') {

setTimeout(function () {
  
  myTabs.switchTab("search");
  
}, 0);


}





if (tabParam === 'favorite') {


setTimeout(function () {
    myTabs.switchTab("favorite");
}, 0);

}






















 
	 
    }, 0); // 500 = نصف ثانية

  });


})();
