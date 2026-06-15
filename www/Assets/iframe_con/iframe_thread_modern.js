/* ===============================
   JSON POLYFILL (ES6+)
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
            
            if (o === null) return 'null';
            if (type === 'string') {
                return `"${o.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
            }
            if (type === 'number' || type === 'boolean') return String(o);
            if (type === 'undefined') return 'null';
            
            if (Array.isArray(o)) {
                const items = o.map(item => JSON.stringify(item));
                return `[${items.join(',')}]`;
            }
            
            if (type === 'object') {
                const pairs = [];
                for (const [key, value] of Object.entries(o)) {
                    if (o.hasOwnProperty(key)) {
                        pairs.push(`"${key}":${JSON.stringify(value)}`);
                    }
                }
                return `{${pairs.join(',')}}`;
            }
            
            return 'null';
        }
    };
}

/* ===============================
   UTILITY FUNCTIONS (with checks)
================================ */
// Check if functions already exist before declaring
if (typeof window.isCHM === 'undefined') {
    window.isCHM = () => {
        const { protocol, href } = location;
        return protocol === "ms-its:" ||
               protocol === "its:" ||
               href.includes(".chm::");
    };
}

if (typeof window.ver === 'undefined') {
    window.ver = (url) => `${url}?v=${Date.now()}`;
}

if (typeof window.waitIframe === 'undefined') {
    window.waitIframe = (iframe, callback) => {
        if (iframe.addEventListener) {
            iframe.addEventListener("load", function onLoad() {
                iframe.removeEventListener("load", onLoad);
                callback();
            }, false);
        } 
        else if (iframe.attachEvent) {
            iframe.attachEvent("onload", () => callback());
        } 
        else {
            const interval = setInterval(() => {
                try {
                    if (iframe.contentWindow) {
                        clearInterval(interval);
                        callback();
                    }
                } catch(e) {}
            }, 50);
        }
    };
}



/* ===============================
   CORE APPLICATION LOGIC (IIFE to avoid conflicts)
================================ */
(function() {
    // Use IIFE to create private scope
    let loaded = false;

    const loadPostContent = () => {
        if (loaded) return;
        loaded = true;

        const { lang: targetLang, postId: targetPostId, fid: windowFid } = window;
        
        Object.assign(window, {
            app_lang: targetLang,
            currentPostId: targetPostId,
            app_postid: targetPostId
        });

        const loaderWrap = document.getElementById("loaderWrap");
        const appDiv = document.getElementById("app");
        
        if (loaderWrap) loaderWrap.style.display = "block";
        if (appDiv) appDiv.style.display = "none";

        if (typeof loadSeq === "function") {
            if (typeof getHtmlBasePath === "function" && !window.base) {
                window.base = getHtmlBasePath();
            }

           
           loadSeq([
            ver(base + "js_json/threads/thread_"+threadid+"_pa_"+tpage+".js")
          ], 0);




        } else {
            setTimeout(loadPostContent, 50);
        }
    };

    const notifyReady = () => {
        window.sendToParent({
            type: "childHello",
            postId: window.postId,
            lang: window.lang
        });
    };

    const continueLoading = () => {
        if (!loaded) {
            notifyReady();
            loadPostContent();
        }
    };

    const handleChildMessage = (data, isFromName = false) => {
        const { from, type, values, key, value } = data;
        
        if (from === 'child') {
            if (type === 'values' && values?.userLang) {
                window.lang = values.userLang;
                continueLoading();
            }
            else if (type === 'value' && key === 'userLang' && value) {
                window.lang = value;
                continueLoading();
            }
        }
    };

const startApp = () => {
    const storageFrame = document.getElementById("storageFrame");
    if (!storageFrame) {
        console.error('storageFrame element not found');
        return;
    }
    
    // Set up message listener BEFORE iframe loads
    if (typeof window.postMessage !== 'undefined' && window.addEventListener) {
        window.addEventListener('message', (e) => {
            try {
                const data = JSON.parse(e.data);
                handleChildMessage(data);
            } catch(err) {}
        }, false);
    } else {
        let last = '';
        setInterval(() => {
            if (window.name && window.name !== last) {
                try {
                    const data = JSON.parse(window.name);
                    handleChildMessage(data, true);
                    last = window.name;
                    window.name = '';
                } catch(e) {
                    window.name = '';
                }
            }
        }, 200);
    }
    
    // NOW load the iframe (listener is already active)
    storageFrame.src = "../../storage_modern.html";
};

    // Event listener attachment with duplicate check
    const attachLoadEvent = () => {
        if (window._appStarted) return;
        window._appStarted = true;
        
        if (window.attachEvent) {
            window.attachEvent("onload", startApp);
        } else {
            window.addEventListener("load", startApp);
        }
    };
    
    attachLoadEvent();
})();