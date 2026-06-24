
//var app_lang = getLS("lang", "ar"); // default


//alert(app_lang+"ssss");

function setBg(color) {
  document.body.style.backgroundColor = color || '';
}


/* ===============================
   IE DETECTION (IE6 → IE11)
=============================== */
function isIE() {
  return !!(window.ActiveXObject || "ActiveXObject" in window);
}

function isIE8OrLess() {
  return document.documentMode && document.documentMode <= 8;
}

// Assets/loader.es3.js
(function () {



  /* ===============================
     WAIT FOR BODY
  =============================== */
  function waitForBody(fn) {
    if (document.body) {
      fn();
      setBg('#f6f1df');
    } else {
      setTimeout(function () {
        waitForBody(fn);
      }, 10);
    }
  }

  /* ===============================
     BODY ID DETECTION
  =============================== */
  function getViewType() {
    var body = document.body;
    if (!body) return "post";

    if (body.id === "thread_view") return "thread";
    if (body.id === "post_view") return "post";
    if (body.id === "forum_view") return "forum";
    if (body.id === "main_view") return "main";
    if (body.id === "index_php_htm_view") return "index_php_htm";
	if (body.id === "search_results_page") return "search_results_page";
    if (body.id === "index_view") return "index_view";


    return "post";
  }

  /* ===============================
     BOOT
  =============================== */
  

  

  var isES6 = supportsES6();

  waitForBody(function () {

    var view = getViewType();






if (view === "forum" || view === "thread" || view === "post") { 
	
	


	
	   /* ===== ICONS ===== */
    if (isIE()) {
      loadCSS(ver(base + "Assets/icons_ie.css"));
    } else {
      loadCSS(ver(base + "Assets/icons_not_ie.css"));
    }

	
}
else{
	
	

	
   /* ===== ICONS ===== */
    if (isIE()) {
      loadCSS(ver(base + "Assets/icons_ie.css"));
    } else {
      loadCSS(ver(base + "Assets/icons_not_ie.css"));
    }


}	



/* ===============================
  CORE DEPENDENCIES (SEQUENTIAL)
=============================== */
function loadCore(next) {

    var isDeep = (view === "forum" || view === "thread" || view === "post");


    if (isES6) {

        loadJS(
            ver(base + "sections/tpl_modern.js"),
            next
        );

    } else {

  
       
                loadJS(
                    ver(base + "Assets/sections/tpl_legacy.js"),
                    
					
					
					next
                );
          
       

    }
}






function loadMain() {

    if (isES6) {
        /* ================= MODERN ================= */
        loadCSS(ver(base + "Assets/sections/main/main_modern.css"));
        
        loadAll([
            ver(base + "Assets/sections/main/" + app_lang + "_main_modern.js"),
            ver(base + "Assets/sections/main/main_modern.js")
        ]); // No callback needed - they load in parallel

    } else {
        /* ================= LEGACY ================= */
        loadCSS(
            ver(
                base +
                "Assets/sections/main/legacy/main_" +
                app_style +
                "_legacy.css"
            )
        );

        /* ==========================================
           STAGE 1 : INDEPENDENT FILES (PARALLEL)
        ========================================== */
        loadAll([
            ver(base + "Assets/sections/global_legacy.js"),
            ver(base + "Assets/plugins/respond.js"),
            ver(base + "Assets/template/rh_lang_" + app_lang + ".js"),
            ver(base + "Assets/plugins/xregexp-all-1.5.1.js"),
            ver(base + "Assets/sections/main/main_lang_" + app_lang + ".js")
        ], function () {

            /* ==========================================
               STAGE 2 : ROBOHELP CORE (PARALLEL)
            ========================================== */
            loadAll([
			    
                ver(base + "Assets/template/scripts/constants.js"),
                ver(base + "Assets/template/scripts/utils.js"),
                ver(base + "Assets/template/scripts/mhutils.js"),
                ver(base + "Assets/template/scripts/mhlang.js"),
                ver(base + "Assets/template/scripts/mhver.js"),
				ver(base + "Assets/template/scripts/loadprojdata.js"),
                ver(base + "Assets/template/scripts/settings.js"),
                
                ver(base + "Assets/template/scripts/loadscreen.js"),
                ver(base + "Assets/template/scripts/loadcsh.js"),
                ver(base + "Assets/template/scripts/loadparentdata.js"),
                
                ver(base + "Assets/template/scripts/showhidecontrols.js"),
                ver(base + "Assets/template/scripts/pageloader.js"),
                ver(base + "Assets/template/scripts/mhfhost.js"),
                ver(base + "Assets/template/scripts/search.js"),
                ver(base + "Assets/template/scripts/searchfield.js")
				
            ], function () {

                /* ==========================================
                   STAGE 3 : MAIN APP (PARALLEL)
                ========================================== */
                loadAll([
                    ver(base + "Assets/template/scripts/XmlJsReader.js"),
					ver(base + "Assets/template/ehlpdhtm.js"),
                    ver(
                        base +
                        "Assets/sections/main/legacy/main_" +
                        app_style +
                        "_legacy.js"
                    )
                ]);

            });

        });

    }
}	
function loadIndexPHP() {

    if (isES6) {

        loadCSS(ver(base + "Assets/sections/common_modern.css"));
        loadCSS(ver(base + "Assets/sections/index_php_htm/forum_tree_modern.css"));

        /* ===== STAGE 1 ===== */

        loadAll([

            ver(base + "Assets/sections/common_" + app_lang + ".js"),
            ver(base + "Assets/sections/index_php_htm/forum_tree_lang_" + app_lang + ".js")

        ], function () {

            /* ===== STAGE 2 ===== */

            loadAll([

                ver(base + "Assets/sections/common_tpl_modern.js"),
                ver(base + "Assets/sections/global_modern.js"),
                ver(base + "Assets/sections/index_php_htm/forum_tree_tpl_modern.js")

            ], function () {

                /* ===== STAGE 3 ===== */

                loadAll([

                    ver(base + "Assets/sections/index_php_htm/forum_tree_modern.js")

                ]);

            });

        });

    } else {

        loadCSS(ver(base + "Assets/sections/common_legacy.css"));
        loadCSS(ver(base + "Assets/sections/index_php_htm/forum_tree_legacy.css"));

        /* ===== STAGE 1 ===== */

        loadAll([

            ver(base + "Assets/sections/common_" + app_lang + ".js"),
            ver(base + "Assets/sections/index_php_htm/forum_tree_lang_" + app_lang + ".js")

        ], function () {

            /* ===== STAGE 2 ===== */

            loadAll([

                ver(base + "Assets/sections/common_tpl_legacy.js"),
                ver(base + "Assets/sections/global_legacy.js"),
                ver(base + "Assets/sections/index_php_htm/forum_tree_tpl_legacy.js")

            ], function () {

                /* ===== STAGE 3 ===== */

                loadAll([

                    ver(base + "Assets/sections/index_php_htm/forum_tree_legacy.js")

                ]);

            });

        });

    }
}

	
function loadForum() {

    if (isES6) {

        loadCSS(ver(base + "Assets/sections/common_modern.css"));
        loadCSS(ver(base + "Assets/sections/fourm/forum_modern.css"));

        /* ===== STAGE 1 ===== */

        loadAll([

            ver(base + "Assets/sections/common_" + app_lang + ".js"),
            ver(base + "Assets/sections/fourm/forum_lang_" + app_lang + ".js")

        ], function () {

            /* ===== STAGE 2 ===== */

            loadAll([

                ver(base + "Assets/sections/common_tpl_modern.js"),
                ver(base + "Assets/sections/global_modern.js"),
                ver(base + "Assets/sections/fourm/forum_fun_modern.js"),
                ver(base + "Assets/sections/fourm/forum_tpl_modern.js")

            ], function () {

                /* ===== STAGE 3 ===== */

                loadAll([

                    ver(base + "Assets/sections/fourm/forum_modern.js")

                ]);

            });

        });

    } else {

        loadCSS(ver(base + "Assets/sections/common_legacy.css"));
        loadCSS(ver(base + "Assets/sections/fourm/forum_legacy.css"));

        /* ===== STAGE 1 ===== */

        loadAll([

            ver(base + "Assets/sections/common_" + app_lang + ".js"),
            ver(base + "Assets/sections/fourm/forum_lang_" + app_lang + ".js")

        ], function () {

            /* ===== STAGE 2 ===== */

            loadAll([

                ver(base + "Assets/sections/common_tpl_legacy.js"),
                ver(base + "Assets/sections/global_legacy.js"),
                ver(base + "Assets/sections/fourm/forum_fun_legacy.js"),
                ver(base + "Assets/sections/fourm/forum_tpl_legacy.js")

            ], function () {

                /* ===== STAGE 3 ===== */

                loadAll([

                    ver(base + "Assets/sections/fourm/forum_legacy.js")

                ]);

            });

        });

    }
}

function loadThread() {

    if (isES6) {

        loadCSS(ver(base + "Assets/sections/common_modern.css"));
        loadCSS(ver(base + "Assets/sections/thread/thread_modern.css"));

        /* ===== STAGE 1 : LANG FILES ===== */

        loadAll([

            ver(base + "Assets/sections/common_" + app_lang + ".js"),
            ver(base + "Assets/sections/thread/thread_lang_" + app_lang + ".js")

        ], function () {

            /* ===== STAGE 2 : TEMPLATE / FUN ===== */

            loadAll([

                ver(base + "Assets/sections/common_tpl_modern.js"),
                ver(base + "Assets/sections/global_modern.js"),
                ver(base + "Assets/sections/thread/thread_fun_modern.js"),
                ver(base + "Assets/sections/thread/thread_tpl_modern.js")

            ], function () {

                /* ===== STAGE 3 : MAIN ===== */

                loadAll([

                    ver(base + "Assets/sections/thread/thread_modern.js")

                ]);

            });

        });

    } else {

        loadCSS(ver(base + "Assets/sections/common_legacy.css"));
        loadCSS(ver(base + "Assets/sections/thread/thread_legacy.css"));

        /* ===== STAGE 1 : LANG FILES ===== */

        loadAll([

            ver(base + "Assets/sections/common_" + app_lang + ".js"),
            ver(base + "Assets/sections/thread/thread_lang_" + app_lang + ".js")

        ], function () {

            /* ===== STAGE 2 : TEMPLATE / FUN ===== */

            loadAll([

                ver(base + "Assets/sections/common_tpl_legacy.js"),
                ver(base + "Assets/sections/global_legacy.js"),
                ver(base + "Assets/sections/thread/thread_fun_legacy.js"),
                ver(base + "Assets/sections/thread/thread_tpl_legacy.js")

            ], function () {

                /* ===== STAGE 3 : MAIN ===== */

                loadAll([

                    ver(base + "Assets/sections/thread/thread_legacy.js")

                ]);

            });

        });

    }
}
function loadPost() {

    if (isES6) {

        loadCSS(ver(base + "Assets/sections/common_modern.css"));
        loadCSS(ver(base + "Assets/sections/post/post_modern.css"));

        /* ===== STAGE 1 ===== */

        loadAll([

            ver(base + "Assets/sections/post/post_lang_" + app_lang + ".js"),
            ver(base + "Assets/sections/common_" + app_lang + ".js")

        ], function () {

            /* ===== STAGE 2 ===== */

            loadAll([

                ver(base + "Assets/sections/common_tpl_modern.js"),
                ver(base + "Assets/sections/global_modern.js"),
                ver(base + "Assets/sections/post/post_fun_modern.js"),
                ver(base + "Assets/sections/post/post_tpl_modern.js"),
                ver(base + "Assets/sections/index_and_hit_modern.js")

            ], function () {

                /* ===== STAGE 3 ===== */

                loadAll([

                    ver(base + "Assets/sections/post/post_modern.js")

                ]);

            });

        });

    } else {

        loadCSS(ver(base + "Assets/sections/common_legacy.css"));
        loadCSS(ver(base + "Assets/sections/post/post_legacy.css"));

        /* ===== STAGE 1 ===== */

        loadAll([

            ver(base + "Assets/sections/post/post_lang_" + app_lang + ".js"),
            ver(base + "Assets/sections/common_" + app_lang + ".js")

        ], function () {

            /* ===== STAGE 2 ===== */

            loadAll([

                ver(base + "Assets/sections/common_tpl_legacy.js"),
                ver(base + "Assets/sections/global_legacy.js"),
                ver(base + "Assets/plugins/scrollIntoView_polyfil.js"),
                ver(base + "Assets/sections/post/post_fun_legacy.js"),
                ver(base + "Assets/sections/index_and_hit_legacy.js"),
                ver(base + "Assets/sections/post/post_tpl_legacy.js")

            ], function () {

                /* ===== STAGE 3 ===== */

                loadAll([

                    ver(base + "Assets/sections/post/post_legacy.js")

                ]);

            });

        });

    }
}




function search_results_page() {

    if (isES6) {

        loadCSS(ver(base + "Assets/plugins/vs-es6-scroll-sim-plugn.css"));
        loadCSS(ver(base + "Assets/sections/search_result/search_result_modern.css"));

        loadAll([

            ver(base + "Assets/plugins/vs-es6-scroll-sim-plugn.js")

        ], function () {

            loadAll([

                ver(base + "Assets/sections/search_result/search_result_modern.js")

            ]);

        });

    } else {

        loadCSS(ver(base + "Assets/plugins/vs-jquery-scroll-sim-plugn.css"));
        loadCSS(ver(base + "Assets/sections/search_result/search_result_legacy.css"));

        if (isIE8OrLess()) {
            loadCSS(ver(base + "Assets/plugins/vs-ie-scroll-sim.css"));
        }

        /* ===== STAGE 1 ===== */

        loadAll([

            ver(base + "Assets/sections/funs_legacy.js"),
            ver(base + "Assets/sections/search_result/search_result_" + app_lang + ".js")

        ], function () {

            /* ===== STAGE 2 ===== */

            loadAll([

                ver(base + "Assets/plugins/vs-jquery-scroll-sim-plugn.js"),
                ver(base + "Assets/sections/search_result/search_result_legacy.js")

            ]);

        });

    }
}







function load_index_view() {

    if (isES6) {

        loadCSS(ver(base + "Assets/sections/index/index_modern.css"));

        /* ===== STAGE 1 ===== */

        loadAll([

            ver(base + "Assets/sections/index/index_lang_" + app_lang + ".js"),
            ver(base + "Assets/sections/global_modern.js")

        ], function () {

            /* ===== STAGE 2 ===== */

            loadAll([

                ver(base + "Assets/sections/index/index_modern.js")

            ]);

        });

    } else {

        loadCSS(ver(base + "Assets/sections/index/index_legacy.css"));

        /* ===== STAGE 1 ===== */

        loadAll([

            ver(base + "Assets/sections/index/index_lang_" + app_lang + ".js"),
            ver(base + "Assets/sections/global_legacy.js")

        ], function () {

            /* ===== STAGE 2 ===== */

            loadAll([

                ver(base + "Assets/sections/index/index_legacy.js")

            ]);

        });

    }
}







  
/* ===============================
 EXECUTION PIPELINE
=============================== */
loadCore(function () {

	  ;
      if (view === "forum") {
        loadForum();
      } else if (view === "thread") {
        loadThread();
      } else if (view === "post") {
        loadPost();
      } else if (view === "main") {
        loadMain();
      } else if (view === "index_php_htm") {
        loadIndexPHP();
      } else if(view ===  "search_results_page"){
		  search_results_page();
	  }else if(view ===  "index_view"){
		
		  load_index_view();
	  }
});
  
  
  
});
})();



