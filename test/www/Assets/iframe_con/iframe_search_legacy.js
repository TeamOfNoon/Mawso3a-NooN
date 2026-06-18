// =====================================
// SIMPLE PARENT - like storage_legacy logic
// =====================================

window.lang = 'ar';
window.style = 'ios';
window.color = 'gold';
window.search_per_page = 5;
window.highlightSearch = true;
window.highlightpartsearch = false;
window.mn33_sec=true;
window.all_ar_sec=false;
window.all_en_sec=false;
window.custom_sec=false;
window.sniptSearch = true;
window.search_type = "exact";
window.search_match = "normal";
window.loaded = false;

window.sheet_state = "sheet_part";

function sendToParent(data) {
    var msg = JSON.stringify(data);
    if (window.parent && window.parent !== window) {
        if (window.postMessage) window.parent.postMessage(msg, '*');
        else window.parent.name = msg;
    }
}

function sendMulti(values) {
    var iframe = document.getElementById('storageFrame');
    if (!iframe || !iframe.contentWindow) return;
    var msg = JSON.stringify({ from: 'parent', msg: { type: 'setValues', values: values } });
    if (window.postMessage) iframe.contentWindow.postMessage(msg, '*');
    else iframe.contentWindow.name = msg;
}

function loadPostContent(){
    if(window.loaded) return;
    window.loaded = true;
    window.app_lang = window.lang;
    window.app_style = window.style;
    window.app_color = window.color;
    window.app_search_per_page = window.search_per_page;
    window.app_highlight_search = window.highlightSearch;
 
    var loaderWrap = document.getElementById('loaderWrap');
    var appDiv = document.getElementById('app');
    if(loaderWrap) loaderWrap.style.display = 'block';
    if(appDiv) appDiv.style.display = 'none';
     
	 
	 

	 
	  
	 
	 
	 
	 
    if(typeof loadSeq === 'function'){
        if(typeof getHtmlBasePath === 'function' && !window.base) window.base = getHtmlBasePath();
        loadSeq([ver(base + 'Assets/loader.js')], 0);
    } else {
        setTimeout(loadPostContent, 50);
    }
}

function handleChildMessage(data) {


    /*if (!data || !data.values) {
        return false;
    }*/

if (data.type =="hide_sheet")
{

hideBottomSheet();

}








if (data.type === "scroll_search_up")
{
		$(".scrollBox").scrollTop(0);

		
}
	
		
	
if (data.type === "scroll_search_down")
{
	var app =
		$(".scrollBox");

	app.scrollTop(
		app[0].scrollHeight
	);
}


if (data.type === "scroll_snipit_up")
{
		scrollToTop(); 

		
}
	
	
if (data.type === "scroll_snipit_down")
{
		scrollToBottom(); 

		
}
	
	
if (data.type === "scroll_snipit_set")
{
		scrollToindex(); 

		
}
	
   
   

if (data.type ==="navigation_buttons")
{

		applyNavigationButtons(data);
}
   


    var v = data.values;

    if (v.userLang !== undefined) {
        window.lang = v.userLang;
    }

    if (v.userStyle !== undefined) {
        window.style = v.userStyle;
    }

    if (v.userColor !== undefined) {
        window.color = v.userColor;
    }


   if (v.sniptSearch !== undefined) {
        window.sniptSearch =
            (v.sniptSearch === true ||
             v.sniptSearch === "true");
			 	
   }

  if (v.mn33_sec !== undefined) {
        window.mn33_sec =
            (v.mn33_sec === true ||
             v.mn33_sec === "true");

  }
  
  
  if (v.all_ar_sec !== undefined) {
        window.all_ar_sec =
            (v.all_ar_sec === true ||
             v.all_ar_sec === "true");

  }
  
  if (v.all_en_sec !== undefined) {
        window.all_en_sec =
            (v.all_en_sec === true ||
             v.all_en_sec === "true");

  }
  
  if (v.custom_sec !== undefined) {
        window.custom_sec =
            (v.custom_sec === true ||
             v.custom_sec === "true");
			 
  }
  


if 
(
v.search_type !== undefined ||
v.search_match !== undefined ||
v.searchPerPage !== undefined ||
v.highlightSearch !== undefined ||
v.highlightpartsearch !== undefined ||
v.sheet_state !== undefined
) 
{

    if (v.searchPerPage !== undefined) {
        window.search_per_page =
            parseInt(v.searchPerPage, 10) || 5;
    }

    if (v.search_type !== undefined) {
        window.search_type =
            v.search_type;
    }

    if (v.search_match !== undefined) {
        window.search_match =
            v.search_match;
    }


    if (v.highlightSearch !== undefined) {
        window.highlightSearch =
            (v.highlightSearch === true ||
             v.highlightSearch === "true");
    }
   
   if (v.highlightpartsearch !== undefined) {
        window.highlightpartsearch =
            (v.highlightpartsearch === true ||
             v.highlightpartsearch === "true");
    }


if (v.sheet_state !== undefined) {

        window.sheet_state = v.sheet_state;
}



    sendToParent({
        type: "search_sett_values",
        search_per_page: window.search_per_page,
        search_type: window.search_type,
		search_match: window.search_match,
        highlightSearch: window.highlightSearch,
		highlightpartsearch:window.highlightpartsearch,
		mn33_sec:window.mn33_sec,
		all_ar_sec:window.all_ar_sec,
		all_en_sec:window.all_en_sec,
		custom_sec:window.custom_sec
    });
}

   
   
   
      
 

   
   

    if (!window.loaded) {
        loadPostContent();
    }

    return true;
}




function waitIframe(iframe, cb){

    var fired = false;

    function done(){

        if(fired) return;
        fired = true;
        cb();
    }

    iframe.onload = done;

    if(iframe.addEventListener){
        iframe.addEventListener("load", done, false);
    }

    // IMPORTANT: set src AFTER listener
    iframe.src = iframe.getAttribute("data-src");
}


function requestStoredUrl() {
    var iframe = document.getElementById('storageFrame');
    if (!iframe || !iframe.contentWindow) {
        setTimeout(requestStoredUrl, 50);
        return;
    }
    
  var msg = JSON.stringify({ 
        from: 'parent', 
        msg: { 
            type: 'getValues', 
            keys: [
			'url', 
			'rhsearch', 
			'userLang', 
			'userStyle', 
			'userColor', 
			'searchPerPage', 
			'highlightSearch',
			'highlightpartsearch', 
			'search_type', 
			'search_match', 
			'favorites',
			'mn33_sec',
			'all_ar_sec',
			'all_en_sec',
			'custom_sec',
			'sheet_state'
			] 
        } 
    });
    
    if (window.postMessage) {
        iframe.contentWindow.postMessage(msg, '*');
    } else if (iframe.contentWindow.name) {
        iframe.contentWindow.name = msg;
    }
   
   
   
   
   
}





var startApp = function(){
 
	var storageFrame = document.getElementById('storageFrame');
    if (!storageFrame) return;
    
    // Request stored URL as soon as iframe loads
    waitIframe(storageFrame, function() {
        requestStoredUrl();
    });
	
	
	
    storageFrame.src = './storage_legacy.html';
};

if(window.attachEvent) window.attachEvent('onload', startApp);
else window.addEventListener('load', startApp);








// =============================================
// MESSAGE LISTENER SETUP (MODERN + IE6/IE7)
// =============================================
if (window.postMessage) {
    if (window.addEventListener) {
        window.addEventListener("message", function(e) {
            e = e.originalEvent || e;
            try {
                var data = JSON.parse(e.data);
                if (!window.messageReceived) {
                    handleChildMessage(data);
                } else {
                    handleChildMessage(data);
                }
            } catch (err) {}
        }, false);
    }
} else {
    if (window.jQuery && $.receiveMessage) {
        $.receiveMessage(function(e) {
            e = e.originalEvent || e;
            try {
                var data = JSON.parse(e.data);
                handleChildMessage(data);
            } catch (err) {}
        }, "*");
    }
    
    // IE6/IE7 polling fallback
    var last = '';
    setInterval(function() {
        if (!window.messageReceived && window.name && window.name !== last) {
            try {
                var data = JSON.parse(window.name);
                handleChildMessage(data, true);
                window.messageReceived = true;
                last = window.name;
                window.name = '';
            } catch(e) {
                window.name = '';
            }
        }
    }, 200);
}
