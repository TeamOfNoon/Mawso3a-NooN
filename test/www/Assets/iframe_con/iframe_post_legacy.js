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

/* ===============================
   UTILITY FUNCTIONS
================================ */
function isCHM(){
    return location.protocol==="ms-its:" ||
           location.protocol==="its:" ||
           location.href.indexOf(".chm::")!=-1;
}

function ver(u){
    return u + "?v=" + (+new Date());
}
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
function waitIframe(iframe, cb){
    if (iframe.addEventListener){
        iframe.addEventListener("load", function onL(){
            iframe.removeEventListener("load", onL);
            cb();
        }, false);
    }
    else if (iframe.attachEvent){
        iframe.attachEvent("onload", function(){
            cb();
        });
    }
    else{
        var t = setInterval(function(){
            try{
                if (iframe.contentWindow){
                    clearInterval(t);
                    cb();
                }
            }catch(e){}
        },50);
    }
}

/* ===============================
   LOADING FUNCTIONS
================================ */
function loadPostContent(){
    if(window.loaded) return;
    window.loaded = true;

    var targetLang   = window.lang;
    var targetPostId = window.postId;

    window.app_lang      = targetLang;
    window.currentPostId = targetPostId;
    window.app_postid    = targetPostId;

    var loaderWrap = document.getElementById("loaderWrap");
    var appDiv     = document.getElementById("app");

    if(loaderWrap) loaderWrap.style.display = "block";
    if(appDiv)     appDiv.style.display     = "none";

    if (typeof loadSeq === "function"){
        if (typeof getHtmlBasePath === "function" && !window.base) {
            window.base = getHtmlBasePath();
        }
        
        var postFile = "js_json/posts/post_" + targetPostId + ".js";
        var loaderJs = base + "Assets/loader.js";

        loadSeq([
            ver(postFile),
            ver(loaderJs)
        ], 0);

    } else {
        setTimeout(loadPostContent, 50);
    }
}

function notifyReady(){
    sendToParent({
        type:"childHello",
        postId:window.postId,
        lang:window.lang
    });
}

function continueLoading(){
    if(!window.loaded){
        notifyReady();
        loadPostContent();
    }
}
var lastSearch;
/* ===============================
   MESSAGE HANDLING
================================ */
function handleChildMessage(data, isFromName) {
    //alert(data.type);
    // Handle SEARCH_PARAMS
    if (data && data.type === "SEARCH_PARAMS") {
        
	
		
		var rhsearch = data.rhsearch;
        var hitid = data.hitid;
	    
		

      
        if (lastSearch === rhsearch) {

            runSearch(rhsearch, hitid, true);
            return;
        }

        // New search
        lastSearch = rhsearch;

        buildIndexAsync(function() {
            runSearch(rhsearch, hitid, false);
        });
    }
    
    // Handle values from storage
    if(data.type === 'values' && data.values){
        window.lang = data.values.userLang;
        continueLoading();
    }
    

    return false;
}

/* ===============================
   MESSAGE LISTENER SETUP
================================ */
function setupModernListener(messageReceived) {
    window.addEventListener("message", function(e) {
        try {
            var data = e.data;
            
            // Firefox may send object
            if (typeof data === "string") {
                data = JSON.parse(data);
            }
            
            if (!messageReceived && data) {
                if (handleChildMessage(data)) {
                    messageReceived = true;
                }
            }
        } catch(err) {}
    }, false);
    
    return messageReceived;
}

function setupLegacyListener(messageReceived) {
    jQuery.pm = jQuery.pm || {};
    jQuery.pm.poll_time = 50;
    jQuery.pm.iframe_url = "postmessage.htm";
    
    if (window.jQuery && $.receiveMessage) {
        $.receiveMessage(function(e){
            try {
                var data = e.data;
                
                if (typeof data === "string") {
                    data = JSON.parse(data);
                }
                
                if (!messageReceived && data) {
                    if (handleChildMessage(data)) {
                        messageReceived = true;
                    }
                }
            } catch(err) {}
        }, "*");
    }
    
    return messageReceived;
}

/* ===============================
   FALLBACK HANDLER
================================ */
function setupFallback(messageReceived) {
    setTimeout(function() {
        if (!messageReceived && !window.loaded) {
            console.log("No message from storage, using default language");
            window.lang = window.lang || "ar";
            
            if (typeof continueLoading === "function") {
                continueLoading();
            }
        }
    }, 3000);
}

/* ===============================
   APPLICATION START
================================ */
var startApp = function() {
    var storageFrame = document.getElementById("storageFrame");
    
    if (!storageFrame) {
        console.error("storageFrame element not found");
        return;
    }
    
    var messageReceived = false;
    
    // Receive message - Modern browsers
    if (window.addEventListener) {
        messageReceived = setupModernListener(messageReceived);
    }
    // Receive message - Old IE6/IE7
    else {
        messageReceived = setupLegacyListener(messageReceived);
    }
    
    // Fallback
    setupFallback(messageReceived);
    
    // Load iframe
    storageFrame.src = "../../storage_legacy.html";
};

/* ===============================
   INITIALIZE
================================ */
if(window.attachEvent){
    window.attachEvent("onload", startApp);
}else{
    window.addEventListener("load", startApp);
}