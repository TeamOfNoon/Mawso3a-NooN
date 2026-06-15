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


function loadPostContent(){
    if(window.loaded) return;
    window.loaded = true;

    var targetLang   = window.lang;
    var targetPostId = window.postId;

    window.app_lang      = targetLang;
	window.app_style     = window.style;
	window.app_color     = window.color;
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

	
		
		

        loadSeq([
                 ver(base + "Assets/loader.js")
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


function handleChildMessage(data, isFromName) {
   // console.log("handleChildMessage:", data);
    
    if(data.type === 'values' && data.values){
       

	    window.lang = data.values.userLang;
		window.style = data.values.userStyle;
		window.color = data.values.userColor;
		
		
		
        continueLoading();
        return true;
    }
    return false;
}

var startApp = function() {
    var storageFrame = document.getElementById("storageFrame");
    if (!storageFrame) {
        console.error('storageFrame element not found');
        return;
    }
    
    var messageReceived = false;
    
    // Set up message listener BEFORE iframe loads
    if (typeof window.postMessage !== 'undefined' && window.addEventListener) {
        window.addEventListener('message', function(e) {
            try {
                var data = JSON.parse(e.data);
                if (!messageReceived) {
                    handleChildMessage(data);
                    messageReceived = true;
                }
            } catch(err) {}
        }, false);
    } else {
        var last = '';
        setInterval(function() {
            if (!messageReceived && window.name && window.name !== last) {
                try {
                    var data = JSON.parse(window.name);
                    handleChildMessage(data, true);
                    messageReceived = true;
                    last = window.name;
                    window.name = '';
                } catch(e) {
                    window.name = '';
                }
            }
        }, 200);
    }
    
    // Direct check of iframe's contentWindow.name
    var iframeCheck = setInterval(function() {
        if (!messageReceived && storageFrame.contentWindow) {
            try {
                var iframeName = storageFrame.contentWindow.name;
                if (iframeName && iframeName !== '') {
                    var data = JSON.parse(iframeName);
                    handleChildMessage(data, true);
                    messageReceived = true;
                    clearInterval(iframeCheck);
                }
            } catch(e) {}
        }
    }, 100);
    
    // Fallback timeout
    setTimeout(function() {
        if (!messageReceived && !window.loaded) {
            console.log("No message from storage, using default language");
            window.lang = window.lang || 'ar';

            // (اختياري) default style
            window.style = window.style || 'andro';
			
			window.color = window.color || 'gold';
			
			
            if (typeof continueLoading === 'function') {
                continueLoading();
            }
        }
    }, 3000);
    
    // NOW load the iframe (listener is already active)
    storageFrame.src = "./storage_legacy.html";
};
if(window.attachEvent){
    window.attachEvent("onload", startApp);
}else{
    window.addEventListener("load", startApp);
}