(function() {

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
       WAIT FOR EVERYTHING
    ===================================================== */
    function wait(fn) {
        if (
            document.getElementById("app") &&
            window.tpl &&
            window.THREAD_LANG &&
            window.THREAD_TEMPLATES &&
            window.jQuery &&
            window.THREAD &&
            window.THREAD.thread_data &&
            window.THREAD.thread_data.length &&
            window.FORUM_THREAD_NAV_TPL
        ) {
            fn();
        } else {
            setTimeout(function() {
                wait(fn);
            }, 15);
        }
    }



    /* =====================================================
       PATH HELPERS
    ===================================================== */
    function getThreadDirPath() {
        var href = location.href.split("#")[0].split("?")[0];
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
        var path = window.location.pathname;
        if (path.indexOf("forum_mn") !== -1) return "mn";
        if (path.indexOf("forum_vb") !== -1) return "vb";
        return "";
    }


 
    /* =====================================================
       DATE FORMAT
    ===================================================== */
    function formatDate(dateline) {
        var d = new Date(dateline * 1000);

        var saudiOffset = 3;
        var localOffset = -d.getTimezoneOffset() / 60;
        d.setHours(d.getHours() + (saudiOffset - localOffset));

        function pad(n) {
            return n < 10 ? "0" + n : n;
        }

        var day = pad(d.getDate());
        var month = pad(d.getMonth() + 1);
        var year = d.getFullYear();

        var h24 = d.getHours();
        var ampm = h24 >= 12 ? "PM" : "AM";
        var h12 = h24 % 12 || 12;

        return (
            day + "-" + month + "-" + year +
            " - " + pad(h12) + ":" + pad(d.getMinutes()) + " " + ampm
        );
    }


    /* =====================================================
       CLEAR OLD MARKS
    ===================================================== */
    function clearPostMarks() {
        $(".imamCurrent").removeClass("imamCurrent");
        $(".hash-hit").removeClass("hash-hit");
    }




    /* =====================================================
       PAGINATION (BAR STYLE â€“ THREAD â€“ ES3 / JQUERY)
    ===================================================== */
    function renderPagination(page, pages) {

        var $boxes = $(".pagination");
        /* ط§ط®ظپظگ ط§ظ„ط؛ظ„ط§ظپ ظƒظ„ظ‡ */
        var $wraps = $boxes.closest(".page_bar");

        if (!$boxes.length || pages <= 1) {
            $boxes.html("").hide();
            $wraps.hide(); // â†گ ط§ظ„ظ…ظ‡ظ…
            return;
        }

        $wraps.show(); // â†گ ط£ط¹ط¯ ط¥ط¸ظ‡ط§ط±ظ‡ ط¹ظ†ط¯ ظˆط¬ظˆط¯ طµظپط­ط§طھ

        $boxes.show();

        var STR = window.THREAD_TEMPLATES.labels;
        var dirPath = getThreadDirPath();
        var base = getThreadBaseName();

        var nums = "";
        var p, href;

        if (page < 1) page = 1;

        /* ===== NUMBERS BAR ===== */
        for (p = 1; p <= pages; p++) {

            if (p === 1) {
                href = base + ".html";
            } else {
                href = base + "_pa_" + p + ".html";
            }

            nums +=
                '<a class="pageBtn' +
                (p === page ? ' active' : '') +
                '" href="' + href + '">' +
                p +
                '</a>';
        }

        /* ===== FIRST / PREV / NEXT / LAST (REAL BUTTONS) ===== */
        var first = "";
        var prev = "";
        var next = "";
        var last = "";

        /* FIRST */
        if (page > 1) {
            first =
                '<button type="button" class="navBtn firstBtn" ' +
                'onclick="location.href=\'' + base + '.html\'">' +
                STR.first +
                '</button>';
        }

        /* PREV */
        if (page > 1) {

            if (page === 2) {
                href = base + ".html";
            } else {
                href = base + "_pa_" + (page - 1) + ".html";
            }

            prev =
                '<button type="button" class="navBtn prevBtn" ' +
                'onclick="location.href=\'' + href + '\'">' +
                STR.prev +
                '</button>';
        }

        /* NEXT */
        if (page < pages) {

            href = base + "_pa_" + (page + 1) + ".html";

            next =
                '<button type="button" class="navBtn nextBtn" ' +
                'onclick="location.href=\'' + href + '\'">' +
                STR.next +
                '</button>';
        }

        /* LAST */
        if (page < pages) {

            href = base + "_pa_" + pages + ".html";

            last =
                '<button type="button" class="navBtn lastBtn" ' +
                'onclick="location.href=\'' + href + '\'">' +
                STR.last +
                '</button>';
        }

        /* ===== FINAL HTML ===== */
        var html = ''

            +
            '<div class="pageNums">' +
            nums +
            '</div>'

            +
            '<div class="pageBar">' +
            first +
            prev +
            next +
            last +
            '</div>';

        $boxes.html(html);
    }




    function renderImamPosts(imamposts, dir, threadid, lbl) {

        if (!imamposts || !imamposts.length) return "";

        var list = imamposts;

        var currentPostId = window.location.hash.replace('#post_', '');

        var html =
            '<div class="bar-wrap no_copy">' +
            '<div class="bar-label">' + lbl.labels.imamposts + ':</div>' +
            '<div id="imamBar" class="bar imam-bar">';

        for (var j = 0; j < list.length; j++) {

            var p = list[j];

            var href =
                (p.page && p.page > 1) ?
                dir + 'thread_' + threadid + '_pa_' + p.page + '.html#post_' + p.postid :
                dir + 'thread_' + threadid + '.html#post_' + p.postid;

            var isCurrent = (p.postid == currentPostId);

            var cnt = "";

            /* primary: inside imamposts itself */
            if (p.postcount != null) {
                cnt = p.postcount;
            }
            /* fallback (safety) */
            else if (window.THREAD &&
                THREAD.postcounts &&
                THREAD.postcounts[p.postid] != null) {

                cnt =THREAD.postcounts[p.postid];
            }

            html +=
                '<a id="post-' + p.postid + '" ' +
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




    /* =====================================================
       BOOT
    ===================================================== */
    wait(function() {

     THREAD.thread_data.sort(function(a, b) {
      return a.postcount - b.postcount;
     });


        var LANG = window.THREAD_TEMPLATES;
      
		
		
		
		$("html")
            .attr("dir", LANG.dir);
			

		$("#app")
            .removeClass("rtl ltr")
            .addClass(LANG.dir);

        var app = document.getElementById("app");
        var posts = window.THREAD.thread_data;
        var htmlPosts = "";
        var i;


        for (i = 0; i < posts.length; i++) {

            htmlPosts += tpl(
                THREAD_TEMPLATES.post(), {
                    postid: posts[i].postid,
                    title: posts[i].title,
                    postcount: posts[i].postcount,
                    username: posts[i].username,
                    userid: posts[i].userid,
                    usertitle: posts[i].usertitle,
                    dateline: formatDate(posts[i].dateline),
                    body: posts[i].long_text,

                    itemGroup: THREAD.forum_type == "vb"
    ? ""
    : THREAD_TEMPLATES.buildItemGroup(posts[i], posts[i].postid)
                }
            );

        }




        var imamHtml = renderImamPosts(
            THREAD.imamposts,
            getThreadDirPath(),
            THREAD.thread_id,
            LANG
        );


        app.innerHTML = tpl(
            window.THREAD_TEMPLATES.page(), {
                thread_title: THREAD.thread_title,
                posts: htmlPosts,
                forumid: THREAD.forum_id,
                type: getForumTypeFromPath(),
                tpage: window.THREAD.thread_page,
                up_text: window.LANG_COMMON.up,
                back_text: window.LANG_COMMON.back,

                imamPosts: imamHtml
            }
        );




       




        /* FORCE REPAINT */
        document.body.style.zoom = "100%";
        document.body.style.zoom = "99%";
        document.body.style.zoom = "100%";




      



        setTimeout(function() {

            showApp();
            hideLoader();
            
 renderPagination(
             window.THREAD.thread_page || 1,
             window.THREAD.thread_pages || 1
        );

            addZoomSpanAfterBr(document.body);

            



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





           

            scrollCurrentItem(".pageNums", ".pageNums a.active");
            scrollCurrentItem(".imam-bar", ".imam-bar a.imamCurrent");

            setupBackThreadButton();
            setupUpThreadButton();


            initImamBarHandler_jq();
            handleItemBoxToggle_jq(".item-title")




            handleCopyPost_jq(".quote-copy-all", ".quote-content");
            handleCopyPost_jq(".postBtnCopy", ".postBody");
            handleCopyPost_jq(".item-copy", ".item-text");



            enableDragScroll(".pageNums");
            enableDragScroll(".imam-bar");

            toggle_drag();

            openMapThread_InfoPanel_jq(".map_button, .map_button *");
            closeMapInfoPanel_jq(".map-con-close, .map-con-close *");
			
			initQuoteButton_jq(".quote_button");
            closeQuoteInfoPanel_jq(".quote-con-close, .quote-con-close *");
            initQuickCopyButton_jq(".quick_copy_button");
            initMinimize_jq();


            detectTextSelection_jq(".postBody");


            

            initAutoHideBar();















         

            if (!isCopyEventSupported()) {
                 initCustomCopyMenu(document, "#copyMenu");
                //initCustomCopyMenu(".quote-content", "#copyMenu"); 
                interceptPostBodyCtrlC(document);
                //interceptSelectAll(box);


             }

	
	

        

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

                    // ًں”¥ debounce (wait until zoom stops)
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

           








            $(document).on("copy", "html", function(e) {

                var postBody = this;

                if (!postBody) return;


                var removed = detachNoCopy(postBody);

                setTimeout(function() {
                    restoreNoCopy(removed);
                }, 0);

            });
			
			
			
			
			
			
			
			
			

            $('.pz-bottom, .pz-top').remove();




           if(detectDesktop()){
			   
			   
			   $('.drag_button').show();
			   
		   }
		







function handleHash() {

    var hash = location.hash;

    if (!/^#post_\d+$/.test(hash)) {
        return;
    }

    var postId = hash.replace("#post_", "");

    $(".hash-hit").removeClass("hash-hit");

    $(".imamCurrent").removeClass("imamCurrent");

    $("#post_" + postId).addClass("hash-hit"); // عنوان المشاركة

    $("#post-" + postId).addClass("imamCurrent"); // الرابط في القائمة
}

$(window).on("hashchange", handleHash);








		


    if (isInIframe()) {
                      
					  sendUrl(window.location.href, document.title,true);
	
             }else{
				


		             sendMulti({
                                 url: window.location.href
                     });


				
			 } 








             //pageScroll();



            init_tool_Buttons();



          
		  
		     /*must be after window.scrollbar */
            fixHashJump();




      

$(window).on('message', function(e) {
   

  var data = e.originalEvent.data;
    
    // Parse if JSON
    if(typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch(e) {
            // Not JSON, use as is
        }
    }
    
    // Handle different message types
    if(data && data.type === 'set_scroll') {
		//$('#app').scrollTop(7000);
	}
   
   
});

        }, 200);




    });

})();