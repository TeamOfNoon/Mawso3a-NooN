/* ===============================
   JSON POLYFILL
================================ */
if (typeof JSON !== 'object') {
    window.JSON = {
        parse: (s) => {
            try {
                return eval(`(${s})`);
            } catch(e) {
                return {};
            }
        },
        stringify: (o) => {
            const type = typeof o;
            const arr = [];
            let key, value;
            
            if (o === null) return 'null';
            if (type === 'string') return `"${o.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
            if (type === 'number' || type === 'boolean') return String(o);
            if (type === 'undefined') return 'null';
            
            if (Object.prototype.toString.call(o) === '[object Array]') {
                for (let i = 0; i < o.length; i++) {
                    arr.push(JSON.stringify(o[i]));
                }
                return `[${arr.join(',')}]`;
            }
            
            if (type === 'object') {
                for (key in o) {
                    if (o.hasOwnProperty(key)) {
                        value = JSON.stringify(o[key]);
                        arr.push(`"${key}":${value}`);
                    }
                }
                return `{${arr.join(',')}}`;
            }
            
            return 'null';
        }
    };
}

// Wrap everything in an IIFE to avoid global scope pollution and redeclaration
(function() {
    // Check if already initialized
    if (window.__appInitialized) return;
    window.__appInitialized = true;
    
    const isCHM = () => {
        return location.protocol === "ms-its:" ||
               location.protocol === "its:" ||
               location.href.includes(".chm::");
    };
    
    const ver = (u) => `${u}?v=${+new Date()}`;
    
    const waitIframe = (iframe, cb) => {
        if (iframe.addEventListener) {
            iframe.addEventListener("load", function onL() {
                iframe.removeEventListener("load", onL);
                cb();
            }, false);
        } else if (iframe.attachEvent) {
            iframe.attachEvent("onload", () => cb());
        } else {
            const timer = setInterval(() => {
                try {
                    if (iframe.contentWindow) {
                        clearInterval(timer);
                        cb();
                    }
                } catch(e) {}
            }, 50);
        }
    };
    

    
    const loadPostContent = () => {
        if (window.loaded) return;
        window.loaded = true;
    
        const targetLang = window.lang;
        const targetPostId = window.postId;
    
        window.app_lang = targetLang;
        window.currentPostId = targetPostId;
        window.app_postid = targetPostId;
    
        const loaderWrap = document.getElementById("loaderWrap");
        const appDiv = document.getElementById("app");
    
        if (loaderWrap) loaderWrap.style.display = "block";
        if (appDiv) appDiv.style.display = "none";
    
        if (typeof loadSeq === "function") {
            if (typeof getHtmlBasePath === "function" && !window.base) {
                window.base = getHtmlBasePath();
            }
    
            loadSeq([
                ver(base + "index.php/index_mn.js"),
                ver(base + "index.php/index_vb.js"),
                ver(base + "Assets/loader.js")
            ], 0);
        } else {
            setTimeout(loadPostContent, 50);
        }
    };
    
    const notifyReady = () => {
        sendToParent({
            type: "childHello",
            postId: window.postId,
            lang: window.lang
        });
    };
    
    const continueLoading = () => {
        if (!window.loaded) {
            notifyReady();
            loadPostContent();
        }
    };
    
    const handleChildMessage = (data, isFromName = false) => {
        if (data.type === 'values' && data.values) {
            window.lang = data.values.userLang;
            continueLoading();
            return true;
        }
        return false;
    };
    
    const startApp = () => {
        const storageFrame = document.getElementById("storageFrame");
        if (!storageFrame) {
            console.error('storageFrame element not found');
            return;
        }
        
        let messageReceived = false;
        
        // Set up message listener BEFORE iframe loads
        if (typeof window.postMessage !== 'undefined' && window.addEventListener) {
            window.addEventListener('message', (e) => {
                try {
                    const data = JSON.parse(e.data);
                    if (!messageReceived) {
                        handleChildMessage(data);
                        messageReceived = true;
                    }
                } catch(err) {}
            }, false);
        } else {
            let last = '';
            setInterval(() => {
                if (!messageReceived && window.name && window.name !== last) {
                    try {
                        const data = JSON.parse(window.name);
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
        const iframeCheck = setInterval(() => {
            if (!messageReceived && storageFrame.contentWindow) {
                try {
                    const iframeName = storageFrame.contentWindow.name;
                    if (iframeName && iframeName !== '') {
                        const data = JSON.parse(iframeName);
                        handleChildMessage(data, true);
                        messageReceived = true;
                        clearInterval(iframeCheck);
                    }
                } catch(e) {}
            }
        }, 100);
        
        // Fallback timeout
        setTimeout(() => {
            if (!messageReceived && !window.loaded) {
                console.log("No message from storage, using default language");
                window.lang = window.lang || 'ar';
                if (typeof continueLoading === 'function') {
                    continueLoading();
                }
            }
        }, 3000);
        
        // NOW load the iframe (listener is already active)
        storageFrame.src = "./storage_modern.html";
    };
    
    // Event listener attachment
    if (window.attachEvent) {
        window.attachEvent("onload", startApp);
    } else {
        window.addEventListener("load", startApp);
    }
})();