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


/* =====================================================
   POST ENGINE (LEGACY)
   ES3 + jQuery
===================================================== */
(function() {

    /* =========================================
       WAIT FOR jQuery + DATA
    ========================================= */
    function wait(fn) {
        var app = document.getElementById("app");

        if (
            app &&
            window.jQuery &&
            window.$ &&
            window.RAW_JSON &&
            window.tpl &&
			window.LANG_COMMON &&
			window.Global_FUN &&
            window.POST_TEMPLATES &&
			window.TOOL_BAR_TPL &&
            window.FORUM_THREAD_NAV_TPL
        ) {
            fn(app);
        } else {
            setTimeout(function() {
                wait(fn);
            }, 15);
        }
    }




    function renderImamPosts(imamposts, dir, threadid, lbl) {

        if (!imamposts || !imamposts.length) return "";

        var list = imamposts;

        var currentPostId = window.location.hash ?
            window.location.hash.replace('#post_', '') :
            '';

        var html =
            '<div class="bar-wrap no_copy">' +
            '<div class="bar-label">' + lbl.imamposts + ':</div>' +
            '<div id="imamBar" class="bar imam-bar">';

        for (var j = 0; j < list.length; j++) {

            var p = list[j];

            /* link like your previous version */
            var href = dir + 'post_' + p.postid + '.html';

            var isCurrent = (String(p.postid) === String(currentPostId));

            var cnt = "";

            if (p.postcount != null) {
                cnt = p.postcount;
            } else if (window.THREAD_JSON &&
                THREAD_JSON.postcounts &&
                THREAD_JSON.postcounts[p.postid] != null) {

                cnt = THREAD_JSON.postcounts[p.postid];
            }

            html +=
                '<a id="post_' + p.postid + '" ' +
                'href="' + href + '" ' +
                'class="item' + (isCurrent ? ' imamCurrent' : '') + '">' +
                '[' + cnt + '] ' + p.postid +
                '</a>';

            if (j < list.length - 1) {
                html += '<span class="sep">|</span>';
            }
        }

        html +=
            '</div>' +
            '</div>';

        return html;
    }




    /* =========================================
       BOOT
    ========================================= */
    wait(function(app) {



        var LANG = window.POST_TEMPLATES;
        var LANG_LBL = window.POST_LANG;



      $("html")
            .attr("dir", LANG.dir)

        $("#app")
            .removeClass("rtl ltr")
            .addClass(LANG.dir);

        var imamHtml = renderImamPosts(
            window.RAW_JSON.imamposts,
            getHtmlBasePath(),
            RAW_JSON.threadid,
            LANG_LBL
        );




        var itemGroup = "";

if (RAW_JSON.forum_type != "vb") {
    itemGroup = POST_TEMPLATES.buildItemGroup(
        RAW_JSON,
        RAW_JSON.postid
    );
}




        var html = tpl(POST_TEMPLATES.page(), {
            title: (RAW_JSON.title ? RAW_JSON.title : LANG_LBL.no_title),
            dateline: formatDate(RAW_JSON.dateline),
            content: RAW_JSON.long_text,
            username: RAW_JSON.username,
            userid: RAW_JSON.userid,
            usertitle: RAW_JSON.usertitle,
            postid: window.RAW_JSON.postid,
            postcount: RAW_JSON.postcount,
            thread: "thread_" + window.RAW_JSON.threadid + ".html",
            post: "post_" + window.RAW_JSON.postid + ".html",
            imamPosts: imamHtml,
            up: window.RAW_JSON.postid.up_link || "#",
            itemGroup: itemGroup,
            up_text: window.LANG_COMMON.up,
            back_text: window.LANG_COMMON.back

        });

        $(app).html(html);




        /* FORCE REPAINT */
        document.body.style.zoom = "100%";
        document.body.style.zoom = "99%";
        document.body.style.zoom = "100%";
        setBg("");


        $('#post_' + window.RAW_JSON.postid).length && $('#post_' + window.RAW_JSON.postid).addClass("imamCurrent");


        setTimeout(function() {


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
			
			
			
			
			
			
			
			
			
			
			enableDragScroll(".imam-bar");
            scrollCurrentItem(".imam-bar", ".imam-bar a.imamCurrent");

            setupUpPostButton();
            setupBackPostButton();


            addZoomSpanAfterBr(document.body);


           handleOrientationBr();

            var lastWidth = 0;
            var zoomTimer = null;
            var zoomDelay = 700; // smoother delay (ms)

            GLOBAL_MONITOR.add(function() {

                var w = document.documentElement.clientWidth ||
                    document.body.clientWidth;

                if (!lastWidth) {
                    lastWidth = w;
                    return;
                }

                if (w !== lastWidth) {

                    lastWidth = w;

                    // 🔥 debounce (wait until zoom stops)
                    if (zoomTimer) {
                        clearTimeout(zoomTimer);
                    }

                    zoomTimer = setTimeout(function() {

                        if (isIE()) {
                            scrollTopThenBack();

                        }
                     handleOrientationBr();
                    }, zoomDelay);
                }

            });
           




      
	  

           handleCopyPost_jq(".quote-copy-all", ".quote-content");
           handleCopyPost_jq(".copy_post", ".postBody");
           handleCopyPost_jq(".item-copy", ".item-text");
           handleCopyPost_jq(".copy-btn", ".copy-text");

            toggleMoreMenu_jq(".more_butt");
            handleItemBoxToggle_jq(".item-title")


            openPostInfoPanel_jq("#more-info");
            closePostInfoPanel_jq(".post-con-close, .post-con-close *");

            openMapPost_InfoPanel_jq(".map_button, .map_button *");
            closeMapInfoPanel_jq(".map-con-close, .map-con-close *");

            initQuoteButton_jq(".quote_button");
            closeQuoteInfoPanel_jq(".quote-con-close, .quote-con-close *");
            initQuickCopyButton_jq(".quick_copy_button");


            initClearSelectionIfToolBar_jq(".main_tool_buttun, .main_tool_buttun *");
     
	 
	        initMinimize_jq();
           
       

           
		
            init_tool_Buttons();
            initAutoHideBar()
            toggle_drag();
			
			detectTextSelection_jq(".postBody");
 
            $(document).on("copy", function(e) {

                var postBody = this;

                if (!postBody) return;

                var removed = detachNoCopy(postBody);

                setTimeout(function() {
                    restoreNoCopy(removed);
                    scrollCurrentItem(".imam-bar", ".imam-bar a.imamCurrent");
                }, 0);

             });

 
 
 
 



            if (!isCopyEventSupported()) {

                initCustomCopyMenu(document, "#copyMenu");
				
                //initCustomCopyMenu(".quote-content", "#copyMenu"); 
                interceptPostBodyCtrlC(document);
                //interceptSelectAll(box);


            }




             $('.pz-bottom, .pz-top').remove();
            
			
			
		     if(detectDesktop()){
			   
			   
			   $('.drag_button').show();
			   
		     }
		  

             if (isInIframe()) {
                      
					  sendUrl(window.location.href, document.title,true);
					
	
             }else{
				


		             sendMulti({
                                 url: window.location.href
                     });


				
			 } 




		  
		  
             sendToParent({
                     type: "GET_SEARCH_PARAMS"
             });

        }, 200); // 500 = نصف ثانية
    });

})();