// SUPER SIMPLE - Parent page logic (no JSON polyfill needed)
// MERGED with JSON polyfill, CHM detection, and URL priority loading

/* ===============================
   JSON POLYFILL
================================ */

if (typeof JSON !== 'object') {
    window.JSON = {
        parse: function(s){ try{return eval('('+s+')')}catch(e){return{}} },
        stringify: function(o){
            var t=typeof o,i,a=[],k,v;
            if(o===null)return'null';
            if(t==='string')return'"'+o.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
            if(t==='number'||t==='boolean')return String(o);
            if(t==='undefined')return'null';
            if(Object.prototype.toString.call(o)==='[object Array]'){
                for(i=0;i<o.length;i++)a.push(JSON.stringify(o[i]));
                return'['+a.join(',')+']';
            }
            if(t==='object'){
                for(k in o)if(o.hasOwnProperty(k)){
                    v=JSON.stringify(o[k]);
                    a.push('"'+k+'":'+v);
                }
                return'{'+a.join(',')+'}';
            }
            return'null';
        }
    };
}

function isCHM(){
  return location.protocol==="ms-its:" ||
         location.protocol==="its:" ||
         location.href.indexOf(".chm::")!=-1;
}

function ver(u){
    return u + "?v=" + (+new Date());
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

// =============================================
// GLOBALS
// =============================================
window.search_per_page = 5;
window.highlightSearch = true;
window.highlightpartsearch = false;
window.search_type = "exact";
window.search_match = "normal";
window.mn33_sec=true;
window.all_ar_sec=false;
window.all_en_sec=false;
window.custom_sec=false;
window.lang = 'ar';
window.style = 'ios';
window.color = 'gold';
window.loaded = false;
window.storageReady = false;
window.pendingUrl = null;
window.messageReceived = false;

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

// =============================================
// REQUEST URL FROM STORAGE IMMEDIATELY
// =============================================
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
			'custom_sec'
			
			] 
        } 
    });
    
    if (window.postMessage) {
        iframe.contentWindow.postMessage(msg, '*');
    } else if (iframe.contentWindow.name) {
        iframe.contentWindow.name = msg;
    }
}

// =============================================
// HANDLE CHILD MESSAGES (PRIORITY: URL FIRST)
// =============================================
function handleChildMessage(data, isFromName) {

    // =========================================
    // VALUES FROM STORAGE - PROCESS URL FIRST!
    // =========================================
    if (data.type === 'values' && data.values) {
        
        
        //alert(data.values.highlightpartsearch);
        // Apply other settings after URL is set
        if (data.values.userLang !== undefined) window.lang = data.values.userLang;
        if (data.values.userStyle !== undefined) window.style = data.values.userStyle;
        if (data.values.userColor !== undefined) window.color = data.values.userColor;
        if (data.values.searchPerPage !== undefined) window.search_per_page = parseInt(data.values.searchPerPage, 10) || 5;
        if (data.values.highlightSearch !== undefined) window.highlightSearch = data.values.highlightSearch === true || data.values.highlightSearch === 'true';
        
		
		if (data.values.highlightpartsearch !== undefined) {
					window.highlightpartsearch = data.values.highlightpartsearch === true || data.values.highlightpartsearch === 'true';
	
		}
			
        
		if (data.values.mn33_sec !== undefined) {
			
		
			window.mn33_sec = data.values.mn33_sec === true || data.values.mn33_sec === 'true';
			
			
		}
        if (data.values.all_ar_sec !== undefined) window.all_ar_sec = data.values.all_ar_sec === true || data.values.all_ar_sec === 'true';
        if (data.values.all_en_sec !== undefined) window.all_en_sec = data.values.all_en_sec === true || data.values.all_en_sec === 'true';
        if (data.values.custom_sec !== undefined) window.custom_sec = data.values.custom_sec === true || data.values.custom_sec === 'true';

		
		
		
		if (data.values.search_type !== undefined) window.search_type = data.values.search_type;
		if (data.values.search_match !== undefined){window.search_match = data.values.search_match;}
        
        // Handle favorites
        if (data.values.favorites !== undefined) {
            var favs = data.values.favorites;
            if (typeof favs === "string") {
                try { favs = JSON.parse(favs); } catch (e) { favs = []; }
            }
            window._favsCache = favs || [];
            if (typeof FavSystem === 'function') FavSystem();
        }
        
        window.app_lang = window.lang;
        window.app_style = window.style;
        window.app_color = window.color;
		
		
		
		window.rhsearch = data.values.rhsearch;
		//console.log(window.rhsearch);
		window.url =  data.values.url;
        
        window.storageReady = true;
        window.messageReceived = true;
        
        // Continue loading now that URL and settings are ready
        continueLoading();
        return true;
    }
    
    // =========================================
    // Highlight search
    // =========================================
    if (data.highlightSearch !== undefined) {
		//alert(data.highlightSearch);
        window.highlightSearch = data.highlightSearch;
        var highlightCheckbox = document.getElementById("highlightsearch");
        if (highlightCheckbox) highlightCheckbox.checked = window.highlightSearch;
    }
	

	if (data.highlightpartsearch !== undefined) {
		window.highlightpartsearch = data.highlightpartsearch;
        var highlightpartsearchCheckbox = document.getElementById("highlightpartsearch");
        if (highlightpartsearchCheckbox) highlightpartsearchCheckbox.checked = window.highlightpartsearch;
    }
	
	if (data.mn33_sec !== undefined) {

		window.mn33_sec = data.mn33_sec;
        var mn33_sec = document.getElementById("mn33_sec");
        if (mn33_sec) mn33_sec.checked = window.mn33_sec;
    }
	
	if (data.all_ar_sec !== undefined) {
		window.all_ar_sec = data.all_ar_sec;
        var all_ar_sec = document.getElementById("all_ar_sec");
        if (all_ar_sec) all_ar_sec.checked = window.all_ar_sec;
    }
	
	if (data.all_en_sec !== undefined) {
		window.all_en_sec = data.all_en_sec;
        var all_en_sec = document.getElementById("all_en_sec");
        if (all_en_sec) all_en_sec.checked = window.all_en_sec;
    }
	
	if (data.custom_sec !== undefined) {
		window.custom_sec = data.custom_sec;
        var custom_sec = document.getElementById("custom_sec");
        if (custom_sec) custom_sec.checked = window.custom_sec;
    }
	
	

    // Search type
    if (data.type === 'search_type') {
	
        window.search_type = data.value;
        if (typeof onSearchTypeChange === 'function') onSearchTypeChange(data.value);
        if (typeof updateSearchTypeRadio === 'function') updateSearchTypeRadio();
    }
	
	
	 // Search type
    if (data.type === 'search_match') {
		
        window.search_match = data.value;
        if (typeof onSearchMatchChange === 'function') onSearchMatchChange(data.value);
        if (typeof updateSearchMatchRadio === 'function') updateSearchMatchRadio();
    }
	
	
	
	
	
	
	
	
	

    // Search settings values
    if (data.type === 'search_sett_values') {
        if (data.search_type !== undefined) window.search_type = data.search_type;
		if (data.search_match !== undefined) window.search_match = data.search_match;
		if (data.mn33_sec !== undefined) window.mn33_sec = data.mn33_sec;
		if (data.all_ar_sec !== undefined) window.all_ar_sec = data.all_ar_sec;
		if (data.all_en_sec !== undefined) window.all_en_sec = data.all_en_sec;
		if (data.custom_sec !== undefined) window.custom_sec = data.custom_sec;
        if (data.search_per_page !== undefined) {
            var newPerPage = parseInt(data.search_per_page, 10) || 5;
            if (newPerPage !== window.search_per_page) {
                window.search_per_page = newPerPage;
                if (typeof callbackSearchCountCookieRead === 'function') callbackSearchCountCookieRead(window.search_per_page);
                if (typeof onMaxPageCountChange === 'function') onMaxPageCountChange(window.search_per_page);
            }
        }
    }

    // GET_SEARCH_PARAMS
    if (data.type === "GET_SEARCH_PARAMS") {
		
        if (window.highlightSearch && typeof getParams === 'function') {
            var params = getParams();
            if (params.hitid && typeof sendToChild === 'function') {
                var iframe_con = document.getElementById('iframe_con');
				
				sendToChild({
                    type: "SEARCH_PARAMS",
                    rhsearch: params.rhsearch || "",
                    hitid: params.hitid || ""
                }, iframe_con);
            }
        }
    }

    // clicked_url
    if (data.type === "clicked_url") {
        if (typeof skipHitidRemoval !== 'undefined') skipHitidRemoval = true;
        
        var a = document.createElement("a");
        a.href = data.url;
        
        var hash = a.hash || "";
        hash = hash.replace(/^#/, "");
        
        var hashParams = {};
        var hashParts = hash.split("&");
        
        for (var i = 0; i < hashParts.length; i++) {
            var part = hashParts[i];
            if (!part) continue;
            var kv = part.split("=");
            var k = decodeURIComponent(kv[0] || "");
            var v = decodeURIComponent(kv[1] || "");
            hashParams[k] = v;
        }
        
        var relPath = a.pathname || "";
        relPath = relPath.replace(/^\/[A-Za-z]:/, "");
        var pos = relPath.indexOf("/index.php/");
        if (pos !== -1) relPath = relPath.substring(pos);
        relPath = relPath.replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/+/, "").replace(/\/$/, "");
        
        if (typeof getParams === 'function') {
            var cur = getParams();
            var curUrl = (cur.url || "").replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/$/, "");
            var newHitId = hashParams.hitid || "null";
            var newRhsearch = hashParams.rhsearch || null;
      
            if (curUrl === relPath && window.prevRhsearch === newRhsearch) {
				
			
                if (window.highlightSearch && typeof sendToChild === 'function') {
					var iframe_con = document.getElementById('iframe_con');
                    sendToChild({ type: "SEARCH_PARAMS", rhsearch: cur.rhsearch || "", hitid: newHitId }, iframe_con);
                
				    
				}
                if (typeof setParams === 'function') {
                    setParams({ url: relPath, tab: null, hitid: newHitId, rhsearch: newRhsearch, rhsyns: hashParams.rhsyns || null }, false, false);
                }
            } else {
				 //alert(window.prevRhsearch +" === "+ newRhsearch);
                if (typeof setParams === 'function') {
                    setParams({ url: relPath, tab: null, hitid: newHitId, rhsearch: newRhsearch, rhsyns: hashParams.rhsyns || null }, false,true);
                }
            }
            window.prevRhsearch = newRhsearch;
        }
    }

    // Navigation click
    if (data.type === "navigation_click") {
        if (typeof g_CurPage !== 'undefined' && typeof nNumPages !== 'undefined' && typeof onClickPrevNext === 'function') {
            var currentPage = parseInt(g_CurPage, 10) || 1;
            var totalPages = parseInt(nNumPages, 10) || 1;
            var targetPage = currentPage;
            var targetBtn = null;
            
            if (data.button === "page") {
                targetBtn = document.getElementById("pageNums");
                targetPage = data.curr;
            }
            if (data.button === "first") {
                targetPage = 1;
                targetBtn = document.getElementById("searchfirst");
            } else if (data.button === "prev") {
                targetPage = currentPage - 1;
                targetBtn = document.getElementById("searchprev");
            } else if (data.button === "next") {
                targetPage = currentPage + 1;
                targetBtn = document.getElementById("searchnext");
            } else if (data.button === "last") {
                targetPage = totalPages;
                targetBtn = document.getElementById("searchlast");
            }
            
            if (targetPage < 1) targetPage = 1;
            if (targetPage > totalPages) targetPage = totalPages;
            g_CurPage = targetPage;
            
            if (targetBtn) onClickPrevNext(targetBtn, targetPage.toString());
        }
    }
    
   // URL UPDATE
if (data.type === "URL_UPDATE") {
    
    var url = data.url;
    var title = data.title || "";
    if (!url) return;
    
    if (typeof getRelativePath === 'function') {
        var parentPath = window.location.href;
        var relativePath = getRelativePath(url, parentPath);
        
        // Get current URL to check if navigation is to same page
        var isDifferentPage = false;
        if (typeof getParams === 'function') {
            var currentParams = getParams();
            var currentUrl = currentParams.url || "";
            isDifferentPage = (currentUrl !== relativePath);
        }
        
        if (typeof setParams === 'function') {
            if (isDifferentPage) {
				
                // Different page - remove hit and search params
                    setParams({ url: relativePath, hitid: null}, false,false)
            } else {
	
               
				if(!data.save){
					 //alert(data.save);
					setParams({ url: relativePath,hitid: null }, false,true);
				}
				else{
		
				}
				
               
			   
			   // console.log("Same page - Hit preserved");
            }
        }
        
        if (typeof lastUrl !== "undefined" && lastUrl === "") lastUrl = relativePath;
        window._lastIframeUrl = relativePath;
        window._lastIframeTitle = title;
        document.title = title;
        sendMulti({
            url: relativePath
        });
        
        if (typeof FavSystem === 'function') FavSystem(null, null, true, relativePath, title);
    }
}
    // iframe full
    if (data.type === "ifram_full") {
        window.isIframeFull = data.full;
        if (data.full == true) {
            if (typeof makeifrme_full === 'function') makeifrme_full();
        } else {
            if (typeof restore_iframe === 'function') restore_iframe();
            if (typeof $ !== 'undefined') $("#iframSnipit").removeClass("show");
            if (typeof switchTab === 'function') switchTab("search");
        }
    }
    
    // resize
    if (data.type === "resize") {
        if (typeof iframe !== 'undefined' && !iframe) return;
        if (typeof blockiframeValue !== 'undefined' && blockiframeValue) return;
    }
    
    // iframe ready
    if (data && data.type === "iframe_ready") {
        if (typeof startSearchWhenReady === 'function') startSearchWhenReady();
    }
    
    // Values object fallback
    if (!data.values) return false;
    
    // Legacy values handling
    if (data.values.favorites !== undefined) {
        window._favsCache = data.values.favorites || [];
        if (typeof FavSystem === 'function') FavSystem();
    }
    
    if (data.values.userLang !== undefined) window.lang = data.values.userLang;
    if (data.values.userStyle !== undefined) window.style = data.values.userStyle;
    if (data.values.userColor !== undefined) window.color = data.values.userColor;
    if (data.values.searchPerPage !== undefined) window.search_per_page = parseInt(data.values.searchPerPage, 10) || 5;
    if (data.values.highlightSearch !== undefined) window.highlightSearch = data.values.highlightSearch === true || data.values.highlightSearch === 'true';
    
   // window.app_lang = window.lang;
    window.app_style = window.style;
    window.app_color = window.color;
    
    if (!window.loaded && window.storageReady) loadPostContent();
    
    return true;
}

// =============================================
// LOAD POST CONTENT (WAITS FOR STORAGE)
// =============================================
function loadPostContent() {
    if (window.loaded) return;
    
    // Wait for storage to be ready (URL loaded first)
    if (!window.storageReady) {
        setTimeout(loadPostContent, 50);
        return;
    }
    
    window.loaded = true;
    
    //window.app_lang = window.lang;
    window.app_style = window.style;
    window.app_color = window.color;
    window.search_per_page = parseInt(window.search_per_page, 10) || 5;
    window.highlightSearch = window.highlightSearch !== false;
    
    var loaderWrap = document.getElementById('loaderWrap');
    var appDiv = document.getElementById('app');
    if (loaderWrap) loaderWrap.style.display = 'block';
    if (appDiv) appDiv.style.display = 'none';
    
    if (typeof loadSeq === 'function') {
        if (typeof getHtmlBasePath === 'function' && !window.base) {
            window.base = getHtmlBasePath();
        }
        loadSeq([ver(base + 'Assets/loader.js')], 0);
    } else {
        setTimeout(loadPostContent, 50);
    }
}

function continueLoading() {
    if (!window.loaded && window.storageReady) {
        //sendToParent({ type: 'childHello', postId: window.postId, lang: window.lang });
        loadPostContent();
    } else if (!window.storageReady) {
        setTimeout(continueLoading, 50);
    }
}

function notifyReady() {
    /*sendToParent({
        type: "childHello",
        postId: window.postId,
        lang: window.lang
    });*/
}

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

// =============================================
// START APP - PRIORITIZE URL LOADING
// =============================================
var startApp = function() {
    //window.app_lang = window.lang;
    window.app_style = window.style;
    window.app_color = window.color;
    
    var storageFrame = document.getElementById('storageFrame');
    if (!storageFrame) return;
    
    // Request stored URL as soon as iframe loads
    waitIframe(storageFrame, function() {

        requestStoredUrl();
    });
    
    // Set iframe source
    storageFrame.src = './storage_legacy.html';
    
    // Iframe polling fallback
    /*var iframeCheck = setInterval(function() {
        if (!window.messageReceived && storageFrame.contentWindow) {
            try {
                var iframeName = storageFrame.contentWindow.name;
                if (iframeName && iframeName !== '') {
                    var data = JSON.parse(iframeName);
                    handleChildMessage(data, true);
                    window.messageReceived = true;
                    clearInterval(iframeCheck);
                }
            } catch(e) {}
        }
    }, 100);*/
    
    // Fallback timeout - load anyway after 2 seconds
    /*setTimeout(function() {
        if (!window.messageReceived && !window.loaded) {
            //window.lang = window.lang || 'ar';
            window.style = window.style || 'ios';
            window.color = window.color || 'gold';
            window.app_lang = window.lang;
            window.app_style = window.style;
            window.app_color = window.color;
            window.search_per_page = window.search_per_page || 5;
            window.highlightSearch = window.highlightSearch !== false;
            window.storageReady = true;
            continueLoading();
        }
    }, 2000);*/
};

// Initialize
if (window.attachEvent) {
    window.attachEvent('onload', startApp);
} else {
    window.addEventListener('load', startApp);
}