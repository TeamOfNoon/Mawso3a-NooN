const showLoader = () => {
  const loader = document.querySelector(".loader-wrap");
  if (loader) loader.style.display = "flex";
};

const hideLoader = () => {
  const loader = document.querySelector(".loader-wrap");
  if (loader) loader.style.display = "none";
};

const showApp = () => {
  const app = document.getElementById("app");
  if (app) app.style.display = "";
};



var UI_STATE = {};

var isIframeFull = false;

function getcheckedSearchType() {
    var selectedValue = null;
    var radios = document.getElementsByName('searchType');
    
    for(var i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            selectedValue = radios[i].value;
            break;
        }
    }
    
    return selectedValue;
}

function makeifrme_full(){

    function save(el, prop) {
        if (!el) return;
        if (!UI_STATE[el]) UI_STATE[el] = {};
        if (UI_STATE[el][prop] === undefined) {
            UI_STATE[el][prop] = el.style[prop] || "";
        }
    }

    var andholder = document.getElementsByClassName("andholder")[0];
    if (andholder) {
        save(andholder, "display");
        andholder.style.display = "none";
    }

    var msg = document.getElementsByClassName("wSearchMessageSmallScr")[0];
    if (msg) {
        save(msg, "display");
        msg.style.display = "none";
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



function restore_iframe(){

    function restore(el) {
        if (!el || !UI_STATE[el]) return;

        var props = UI_STATE[el];
        for (var p in props) {
            el.style[p] = props[p];
        }
    }

    restore(document.getElementsByClassName("andholder")[0]);
    restore(document.getElementsByClassName("wSearchMessageSmallScr")[0]);
    restore(document.getElementsByClassName("wSearchNavigationSmallScr")[0]);
    restore(document.getElementById("pageList"));
    restore(document.getElementsByClassName("contentholder")[0]);
    restore(document.getElementById("resultsFrame"));
}

function getParams() {
    var params = {}, hash = window.location.hash.substring(1), parts;
    if (hash) {
        // Remove leading & if exists
        if (hash.charAt(0) === '&') hash = hash.substring(1);
        parts = hash.split('&');
        for (var i = 0; i < parts.length; i++) {
            var kv = parts[i].split('=');
            if (kv[0]) params[kv[0]] = decodeURIComponent(kv[1] || '');
        }
    }
    return params;
}

function setParams(updates, silent) {
    var params = {};
    var hash = window.location.hash;
    var hashContent = hash ? hash.substring(1) : '';

    // =========================
    // 🔹 PARSE CURRENT HASH
    // =========================
    if (hashContent) {
        if (hashContent.charAt(0) === '&') {
            hashContent = hashContent.substring(1);
        }

        var pairs = hashContent.split('&');

        for (var i = 0; i < pairs.length; i++) {
            if (!pairs[i]) continue;

            var eq = pairs[i].indexOf('=');

            if (eq !== -1) {
                var key = pairs[i].substring(0, eq);
                var val = pairs[i].substring(eq + 1);

                try {
                    params[key] = decodeURIComponent(val);
                } catch (e) {
                    params[key] = val;
                }
            } else {
                params[pairs[i]] = '';
            }
        }
    }

    // =========================
    // 🔹 APPLY UPDATES
    // =========================
    for (var key in updates) {
        if (!updates.hasOwnProperty(key)) continue;

        var val = updates[key];

        // ✅ REMOVE PARAM
        if (val === null || val === undefined || val === '') {
            delete params[key];
        } else {
            params[key] = val;
        }
    }

    // =========================
    // 🔹 BUILD NEW HASH
    // =========================
    var newPairs = [];

    for (var key in params) {
        if (!params.hasOwnProperty(key)) continue;

        var val = params[key];

        // ✅ SKIP EMPTY / INVALID
        if (val === null || val === undefined || val === '') continue;

        newPairs.push(key + '=' + encodeURIComponent(val));
    }

    var newHash = newPairs.length ? '#&' + newPairs.join('&') : '#';

    // =========================
    // 🔹 APPLY HASH
    // =========================
    var base = window.location.href.split('#')[0];

    if (silent) {
        window.location.replace(base + newHash); // no history
    } else {
        window.location.hash = newHash; // normal
    }
}


function strip_And_Normlize(value) {
	
	hitcount = 0;
	var hh = value;
	var ff = hh;
	//alert(value);	//وَمَا يُلَقَّٮٰهَآ
	//ٰ
	 hh = hh.replace(XRegExp('[^\\s\\p{L}\\p{N}]', 'g'), '');
	
	hh = hh.replace(XRegExp("ٰ", 'gmi'), "").replace(XRegExp("ـٰ", 'gmi'), "ا").replace(XRegExp("ٮٰ", 'gmi'), "ا").replace(XRegExp("[\\p{Mn}\\u0640\\u200C\\u200e\\u06e5]", 'gmi'), '').replace(XRegExp("[\\p{S}\\p{P}\\u06E9\\u06DE{}\"'()\\uFD3F\\uFD3E]", 'gmi'), '').replace(/\s\s+/gmi, ' ').replace(XRegExp("^\\s+|\\s+$", 'gmi'), "").replace(XRegExp("[أاإآٲٳٱ]", 'gmi'), "ا").replace(XRegExp("ة", 'gmi'), "ه").replace(XRegExp("ؤ", 'gmi'), "و").replace(XRegExp("ئ", 'gmi'), "ى").replace(XRegExp("[\u200F]", 'gmi'), "").replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(m) {
		return {
			'٠': '0',
			'١': '1',
			'٢': '2',
			'٣': '3',
			'٤': '4',
			'٥': '5',
			'٦': '6',
			'٧': '7',
			'٨': '8',
			'٩': '9'
		} [m];
	}).replace(/[\ﺀ\ﺁ\ﺂ\ﺃ\ﺄ\ﺅ\ﺆ\ﺇ\ﺈ\ﺉ\ﺊ\ﺋ\ﺌ\ﺍ\ﺎ\ﺏ\ﺐ\ﺑ\ﺒ\ﺓ\ﺔ\ﺕ\ﺖ\ﺗ\ﺘ\ﺙ\ﺚ\ﺛ\ﺜ\ﺝ\ﺞ\ﺟ\ﺠ\ﺡ\ﺢ\ﺣ\ﺤ\ﺥ\ﺦ\ﺧ\ﺨ\ﺩ\ﺪ\ﺫ\ﺬ\ﺭ\ﺮ\ﺯ\ﺰ\ﺱ\ﺲ\ﺳ\ﺴ\ﺵ\ﺶ\ﺷ\ﺸ\ﺹ\ﺺ\ﺻ\ﺼ\ﺽ\ﺾ\ﺿ\ﻀ\ﻁ\ﻂ\ﻃ\ﻄ\ﻅ\ﻆ\ﻇ\ﻈ\ﻉ\ﻊ\ﻋ\ﻌ\ﻍ\ﻎ\ﻏ\ﻐ\ﻑ\ﻒ\ﻓ\ﻔ\ﻕ\ﻖ\ﻗ\ﻘ\ﻙ\ﻚ\ﻛ\ﻜ\ﻝ\ﻞ\ﻟ\ﻠ\ﻡ\ﻢ\ﻣ\ﻤ\ﻥ\ﻦ\ﻧ\ﻨ\ﻱ\ﻲ\ﻳ\ﻴ\ﻩ\ﻪ\ﻫ\ﻬ\ﻭ\ﻮ\ﻯ\ﻰ\ﻵ\ﻶ\ﻷ\ﻸ\ﻹ\ﻺ\ﻻ\ﻼ]/g, function(m) {
		return {
			'ﺀ': 'ء',
			'ﺁ': 'ا',
			'ﺂ': 'ا',
			'ﺃ': 'ا',
			'ﺄ': 'ا',
			'ﺅ': 'و',
			'ﺆ': 'و',
			'ﺇ': 'ا',
			'ﺈ': 'ا',
			'ﺉ': 'ى',
			'ﺊ': 'ى',
			'ﺋ': 'ى',
			'ﺌ': 'ى',
			'ﺍ': 'ا',
			'ﺎ': 'ا',
			'ﺏ': 'ب',
			'ﺐ': 'ب',
			'ﺑ': 'ب',
			'ﺒ': 'ب',
			'ﺓ': 'ه',
			'ﺔ': 'ه',
			'ﺕ': 'ت',
			'ﺖ': 'ت',
			'ﺗ': 'ت',
			'ﺘ': 'ت',
			'ﺙ': 'ث',
			'ﺚ': 'ث',
			'ﺛ': 'ث',
			'ﺜ': 'ث',
			'ﺝ': 'ج',
			'ﺞ': 'ج',
			'ﺟ': 'ج',
			'ﺠ': 'ج',
			'ﺡ': 'ح',
			'ﺢ': 'ح',
			'ﺣ': 'ح',
			'ﺤ': 'ح',
			'ﺥ': 'خ',
			'ﺦ': 'خ',
			'ﺧ': 'خ',
			'ﺨ': 'خ',
			'ﺩ': 'د',
			'ﺪ': 'د',
			'ﺫ': 'ذ',
			'ﺬ': 'ذ',
			'ﺭ': 'ر',
			'ﺮ': 'ر',
			'ﺯ': 'ز',
			'ﺰ': 'ز',
			'ﺱ': 'س',
			'ﺲ': 'س',
			'ﺳ': 'س',
			'ﺴ': 'س',
			'ﺵ': 'ش',
			'ﺶ': 'ش',
			'ﺷ': 'ش',
			'ﺸ': 'ش',
			'ﺹ': 'ص',
			'ﺺ': 'ص',
			'ﺻ': 'ص',
			'ﺼ': 'ص',
			'ﺽ': 'ض',
			'ﺾ': 'ض',
			'ﺿ': 'ض',
			'ﻀ': 'ض',
			'ﻁ': 'ط',
			'ﻂ': 'ط',
			'ﻃ': 'ط',
			'ﻄ': 'ط',
			'ﻅ': 'ظ',
			'ﻆ': 'ظ',
			'ﻇ': 'ظ',
			'ﻈ': 'ظ',
			'ﻉ': 'ع',
			'ﻊ': 'ع',
			'ﻋ': 'ع',
			'ﻌ': 'ع',
			'ﻍ': 'غ',
			'ﻎ': 'غ',
			'ﻏ': 'غ',
			'ﻐ': 'غ',
			'ﻑ': 'ف',
			'ﻒ': 'ف',
			'ﻓ': 'ف',
			'ﻔ': 'ف',
			'ﻕ': 'ق',
			'ﻖ': 'ق',
			'ﻗ': 'ق',
			'ﻘ': 'ق',
			'ﻙ': 'ك',
			'ﻚ': 'ك',
			'ﻛ': 'ك',
			'ﻜ': 'ك',
			'ﻝ': 'ل',
			'ﻞ': 'ل',
			'ﻟ': 'ل',
			'ﻠ': 'ل',
			'ﻡ': 'م',
			'ﻢ': 'م',
			'ﻣ': 'م',
			'ﻤ': 'م',
			'ﻥ': 'ن',
			'ﻦ': 'ن',
			'ﻧ': 'ن',
			'ﻨ': 'ن',
			'ﻱ': 'ي',
			'ﻲ': 'ي',
			'ﻳ': 'ي',
			'ﻴ': 'ي',
			'ﻩ': 'ه',
			'ﻪ': 'ه',
			'ﻫ': 'ه',
			'ﻬ': 'ه',
			'ﻭ': 'و',
			'ﻮ': 'و',
			'ﻯ': 'ى',
			'ﻰ': 'ى',
			'ﻵ': 'لا',
			'ﻶ': 'لا',
			'ﻷ': 'لا',
			'ﻸ': 'لا',
			'ﻹ': 'لا',
			'ﻺ': 'لا',
			'ﻻ': 'لا',
			'ﻼ': 'لا'
		} [m];
	});
	
	return hh = convertToLowercase(hh) ;
	
}
function convertToLowercase(inputString) {
    return inputString.toLowerCase();
}


var FavSystem = function (action, p1, fromMessage, messageUrl, messageTitle) {
    var key = "my_favs";

    function norm(u) {
        if (!u) return "";
        return u
            .replace(/^https?:\/\/[^\/]+/i, "")
            .replace(/^file:\/\/\//i, "")
            .replace(/#.*$/, "")
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

    var list;
    try {
        list = JSON.parse(localStorage.getItem(key) || "[]");
    } catch (e) {
        list = [];
    }

    var url = "", title = "";

    if (fromMessage && messageUrl) {
        url = norm(messageUrl);
        title = messageTitle || "";

        window.lastPageData = { url: url, title: title };

        var existing = findItem(list, url);
        if (existing) title = existing.title || title;

    } else {
        var hash = window.location.hash;
        var last = window.lastPageData;

        if (last && last.url) {
            url = norm(last.url);
            title = last.title || "";
        } else if (hash.indexOf("url=") !== -1) {
            var parts = hash.split("&");
            for (var i = 0; i < parts.length; i++) {
                if (parts[i].indexOf("url=") === 0) {
                    url = norm(decodeURIComponent(parts[i].substring(4)));
                }
            }
        } else {
            url = norm(window.location.href);
        }
    }

    var current = url;

    var input = document.getElementById("favBox");
    var container = document.getElementById("favorites_con");

    // =========================
    // ACTIONS
    // =========================
    if (action === "save") {
        if (exists(list, url)) {
            alert("Already saved!");
            return;
        }

        list.push({
            title: title || (input ? input.value : "Favorite"),
            url: url,
            time: new Date().getTime()
        });

        localStorage.setItem(key, JSON.stringify(list));
    }

    if (action === "delete") {
        list.splice(p1, 1);
        localStorage.setItem(key, JSON.stringify(list));
    }

    if (action === "clear") {
        localStorage.removeItem(key);
        list = [];
    }

    // =========================
    // RENDER
    // =========================
    if (container) {
        var html = "";

        if (!list.length) {
            html = "<div class='fav-empty'>No favorites</div>";
        } else {
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var isActive = norm(item.url) === norm(current);

                html += '<div class="fav-item ' + (isActive ? 'active' : '') + '">';
                html += '<a href="' + item.url + '" class="fav-link" data-idx="' + i + '">';
                html += (isActive ? "🔥 " : "📌 ");
                html += "<strong>" + item.title + "</strong><br>";
                html += "<small>" + item.url + "</small></a>";
                html += '<button class="fav-del" data-idx="' + i + '">✖</button>';
                html += '</div>';
            }
        }

        container.innerHTML = html;

        // =========================
        // SINGLE EVENT (FAST ⚡)
        // =========================
        container.onclick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;

            // delete
            if (target.className.indexOf("fav-del") !== -1) {
                var idx = target.getAttribute("data-idx");
                FavSystem("delete", parseInt(idx));
                setTimeout(function () { FavSystem(); }, 50);
                return;
            }

            // link
            while (target && target !== container) {
                if (target.className && target.className.indexOf("fav-link") !== -1) {
                    if (e.preventDefault) e.preventDefault();

                    var idx = target.getAttribute("data-idx");

                    // hide panel
                    if (window.handleFavButton && window.domElements && domElements.favButton) {
                        var mockEvent = {
                            cancelable: true,
                            preventDefault: function () {},
                            stopPropagation: function () {}
                        };
                        handleFavButton.call(domElements.favButton, mockEvent, false);
                    }

                    if (window.setParams) {
                        setParams({ url: list[idx].url, tab: null }, true);
                    } else {
                        window.location.href = list[idx].url;
                    }

                    return;
                }
                target = target.parentNode;
            }
        };

        // scroll active
        var items = container.getElementsByClassName("active");
        if (items.length) {
            setTimeout(function () {
                items[0].scrollIntoView();
            }, 100);
        }
    }

    // =========================
    // INPUT
    // =========================
    if (input) {
        input.value = title || current;
    }

    return current;
};
// Get all URL parameters






(() => {
  /* ================= WAIT ================= */
  const wait = (fn) => {
    const app = document.getElementById("app");
    if (app) {
      fn(app);
    } else {
      setTimeout(() => wait(fn), 15);
    }
  };

  /* ================= RENDER ================= */
  const render = (app) => {
    let left = "";
    let right = "";
    let pages = "";

/* ================= IFRAME ================= */
const IFRAME_HTML = `
  <iframe 
    id="iframe_con" 
    style="" 
    src="index.php.htm" 
    width="100%" 
    height="100%" 
    frameborder="0" 
    scrolling="auto"
	transform: translateZ(0);
  ></iframe>
`;









const SEARCH_HTML = `
  <div id="search_con" style="display:none;">
    <div class="contentholder">
      <div class="andholder">
        <div class="search-options">
          <input 
            id="highlightsearch" 
            type="checkbox" 
            checked="true" 
            class="wSearchHighlight" 
            onchange="onToggleHighlightSearch()"
          />
          <span class="wSearchHighlight">تسليط الضوء على كلمات البحث ..</span>
        </div>
        <hr>
        <div class="search-type-group">
          <label class="search-type-label">
            <input 
              type="radio" 
              name="searchType" 
              value="exact" 
              class="search-type-radio" 
              
              onchange="onSearchTypeChange('exact')"
            />
            <span>البحث المطابق</span>
          </label>
          
          <label class="search-type-label">
            <input 
              type="radio" 
              name="searchType" 
              value="all" 
              class="search-type-radio"
			  checked="true"
              onchange="onSearchTypeChange('all')"
            />
            <span>البحث كل الكلمات</span>
          </label>
          
          <label class="search-type-label">
            <input 
              type="radio" 
              name="searchType" 
              value="any" 
              class="search-type-radio"
              onchange="onSearchTypeChange('any')"
            />
            <span>البحث أي الكلمات</span>
          </label>
        </div>
        <hr>
        <div class="wSearchResultSettingsSmallScr">
          <div class="wSearchCountComboSmallScr">
            <select 
              class="wSearchCountSmallScr" 
              id="searchResCount" 
              onchange="onMaxPageCountChange(this.value)"
            >
              ${[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
                .map(value => `<option value="${value}">${value}</option>`)
                .join('')}
            </select>
          </div>
          
          <div class="wSearchCountMsgSmallScr" scr="">
            <span class="wSearchCountSmallScr">عدد نتائج البحث لكل صفحة ..</span>
          </div>
        </div>
      </div>

      <div class="wSearchMessageSmallScr">
        <span id="searchMsg" class="wSearchMessageSmallScr">هنا يتم إجراء عمليات البحث !! </span>
      </div>
      <div class="wSearchResultItemsBlockSmallScr">
       
   
	   <div id="searchResList">  



	
  
  
  </div>
  
  
    <iframe id="resultsFrame"
        src="search_results.html"
        style="width:100%;border:none;overflow:hidden;height:0;">
    </iframe>
  
  
  
  
  
      </div>
      <div class="wSearchNavigationSmallScr">
        <div class="wSearchBackSmallScr">
          <a id="searchprev" class="wSearchBackSmallScr">
            <span>Back</span>
            <img 
              src="Assets/template/Android_Phone_Layout/SearchBack.png" 
              alt="" 
              align="left" 
              border="0" 
              style="width:100%; max-width:30px"
            />
          </a>
        </div>
        <div class="wSearchNextSmallScr">
          <a id="searchnext" class="wSearchNextSmallScr">
            <span>Next</span>
            <img 
              src="Assets/template/Android_Phone_Layout/SearchNext.png" 
              alt="" 
              align="right" 
              border="0" 
              style="width:100%; max-width:30px"
            />
          </a>
        </div>
		
		
		
		<div id="wSearchEnd" class="wSearchEnd" style="display:none;">
         نهاية نتائج البحث ..
        </div>
		
		
      </div>
    </div>
  </div>
`;












const FAV_HTML = `
  <div id="favorites_con" style="display:none;">
    fav
  </div>
`;

    for (let i = 1; i <= 20; i++) {
      left += `<div class="sideBox">Left item ${i}</div>`;
      right += `<div class="sideBox">Right item ${i}</div>`;
    }

    for (let i = 1; i <= 5; i++) {
      pages += `<a href="javascript:;" data-p="${i}">${i}</a>`;
    }






const main_bar = `<div id="main_bar" style="">
      <button onclick="" class="jiggly-button red no-touch" style="">
        <i class="demo-icon icon-menu"></i>القائمة
      </button>
     
          <button class="jiggly-button red no-touch" id="scrollTopBtn"><i class="demo-icon icon-angle-double-right"></i>السابق</button>
          <button class="jiggly-button red no-touch" id="scrollBottomBtn"><i class="demo-icon icon-angle-double-left"></i>التالي</button>

    
    </div>`;



    const search_bar = `<div id="search_bar" style="display:none;">
      <button onclick="searchHelp(null, 'searchBox')" class="jiggly-button red no-touch" style="">
        <i class="demo-icon icon-search-4"></i>البحث
      </button>
      <div class="input-container">
        <input id="searchBox" class="wSearchField" type="search" data-placeholder="-Search-" onkeydown="searchHelp(event, 'searchBox')" data-search="true">
      </div>
      <div class="menu-container-header" style="white-space: nowrap;">
        <div id="jellyMenu2" class="jelly-menu hidden firstgone">
          <button class="jiggly-button red no-touch" id="scrollTopBtn"><i class="demo-icon icon-up-big"></i>أعلى</button>
          <button class="jiggly-button red no-touch" id="scrollBottomBtn"><i class="demo-icon icon-down-big"></i>أسفل</button>
        </div>
      </div>
      <button class="jiggly-button no-touch" style="" id="more_butt2">
        <span>⋮ المزيد</span>
      </button>
    </div>`;
	
	
	
	
	
 const fav_bar = `<div id="fav_bar" style="display:none;">
      <button onclick="FavSystem('save')" class="jiggly-button red no-touch" style="">
        <i class="demo-icon icon-bookmark-2"></i>احفظ
      </button>
      <div class="input-container">
        <input id="favBox" class="wSearchField" type="search" data-placeholder="-bookmark-" onkeydown="searchHelp(event)">
      </div>
      <div class="menu-container-header" style="white-space: nowrap;">
        <div id="jellyMenu2" class="jelly-menu hidden firstgone">
          <button class="jiggly-button red no-touch" id="scrollTopBtn"><i class="demo-icon icon-up-big"></i>أعلى</button>
          <button class="jiggly-button red no-touch" id="scrollBottomBtn"><i class="demo-icon icon-down-big"></i>أسفل</button>
        </div>
      </div>
      <button class="jiggly-button no-touch" style="" id="more_butt2">
        <span>⋮ المزيد</span>
      </button>
    </div>`;
	

    const footer_con = `<div class="main-button-wrapper" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap;">
      <div class="left-buttons" style="flex-shrink: 0;">
        <div class="left-button-wrapper" style="position: relative; display: inline-block;">
          <div class="menu-widget-original">
            <button class="sun-button jiggly-button-img menu-toggle-original" id="">
              <img src="Assets/images/generic/noon.png" alt="icon">
            </button>
          </div>
        </div>
      </div>
      <div class="right-buttons" style="display: flex; align-items: center;">
        <button class="jiggly-button blue no-touch" id="search_butt"><i class="demo-icon icon-search-8"></i> البحث</button>
        <button class="jiggly-button green no-touch" id="fav_butt"><i class="demo-icon icon-bookmark-empty"></i> المفضلة</button>
		<div class="menu-wrapper" style="position: relative; display: inline-block;">
          <button class="jiggly-button no-touch" id="more_butt">⋮ المزيد</button>
          <div class="menu-container-footer">
            <div id="jellyMenu" class="jelly-menu hidden firstgone">
              
              <button class="jiggly-button red no-touch" id="hideBtn"><i class="demo-icon icon-eye-off-1"></i>اخفاء</button>
              <button class="jiggly-button red no-touch" id="loginBtn"><i class="demo-icon icon-login"></i>الدخول</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    const html = `<header id="header">${main_bar}${search_bar}${fav_bar}</header>
      <main>
        <aside>${left}</aside>
        <section class="centerbox">
          ${IFRAME_HTML}
          ${SEARCH_HTML}
          ${FAV_HTML}
        </section>
        <aside>${right}</aside>
      </main>
      <nav id="pageList" style="display: none;"><div id="pageNums" class="pageNums"></div></nav>
      <footer>${footer_con}</footer>`;

    app.innerHTML = html;
  };

  /* ================= DOM ELEMENTS REFERENCE ================= */
let domElements = {
    iframe: null,
    searchDiv: null,
    favoritesDiv: null,
    searchBar: null,
    favBar: null,  // Added
    searchInput: null,
    favInput: null,  // Added
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

const showIframe = () => {
    if (domElements.iframe) {
        domElements.iframe.style.visibility = "visible";
        domElements.iframe.style.position = "absolute";
    }
    if (domElements.searchDiv) domElements.searchDiv.style.display = "none";
    if (domElements.favoritesDiv) domElements.favoritesDiv.style.display = "none";
    if (domElements.searchBar) domElements.searchBar.style.display = "none";
    if (domElements.favBar) domElements.favBar.style.display = "none";
};

const showSearch = () => {
    if (domElements.iframe) {
        domElements.iframe.style.visibility = "hidden";
        domElements.iframe.style.position = "absolute";
    }
    if (domElements.searchDiv) domElements.searchDiv.style.display = "block";
    if (domElements.favoritesDiv) domElements.favoritesDiv.style.display = "none";
    if (domElements.searchBar) domElements.searchBar.style.display = "flex";
    if (domElements.favBar) domElements.favBar.style.display = "none";
};

const showFavorites = () => {
    if (domElements.iframe) {
        domElements.iframe.style.visibility = "hidden";
        domElements.iframe.style.position = "absolute";
    }
    if (domElements.searchDiv) domElements.searchDiv.style.display = "none";
    if (domElements.favoritesDiv) domElements.favoritesDiv.style.display = "block";
    if (domElements.searchBar) domElements.searchBar.style.display = "none";
    if (domElements.favBar) domElements.favBar.style.display = "flex";
};


  /* ================= SCROLL FUNCTIONS ================= */
  const scrollToTop = () => {
   
  };

  const scrollToBottom = () => {

  };

  const getActiveView = () => {
    if (domElements.iframe && domElements.iframe.style.display === "block") return "iframe";
    if (domElements.searchDiv && domElements.searchDiv.style.display === "block") return "search";
    if (domElements.favoritesDiv && domElements.favoritesDiv.style.display === "block") return "favorites";
    return "iframe";
  };

  /* ================= STATE MANAGEMENT ================= */
  const activeButtons = {};
  let isTouch = false;
  let currentView = "iframe";

  /* ================= HELPERS ================= */
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  /* ================= EVENT TYPE ================= */
  const TAP = "ontouchstart" in window ? "touchstart" : "click";

  /* ================= SAFE EVENT WRAPPER ================= */
  const safeTap = (handler) => {
    return function(e) {
      if (e.type === "touchstart") {
        isTouch = true;
      } else if (isTouch) {
        return;
      }
      handler.call(this, e);
    };
  };

  /* ================= JIGGLE ANIMATION ================= */
  const jiggle = (element) => {
    if (!element) return;
    element.classList.remove("jiggly");
    void element.offsetWidth;
    element.classList.add("jiggly");
    setTimeout(() => {
      element.classList.remove("jiggly");
    }, 400);
  };

/* ================= MENU 1 CONTROLS (same structure as MENU 2) ================= */
let isAnimating1 = false;
let isAnimating2 = false;

const closeMoreMenu = () => {
  if (domElements.jellyMenu && domElements.moreButton && !isAnimating1) {
    if (activeButtons["more_butt"] === true) {
      isAnimating1 = true;
      domElements.jellyMenu.classList.add("hidden");
      activeButtons["more_butt"] = false;
      domElements.moreButton.classList.remove("active-after");
      setTimeout(() => {
        domElements.jellyMenu.classList.add("firstgone");
        isAnimating1 = false;
      }, 300);
    }
  }
};

const openMoreMenu = () => {
  if (domElements.jellyMenu && domElements.moreButton && !isAnimating1) {
    // Close other menu first to prevent conflicts
    if (activeButtons["more_butt2"] === true) {
      closeMoreMenu2();
    }
    isAnimating1 = true;
    domElements.jellyMenu.classList.remove("firstgone");
    domElements.jellyMenu.classList.remove("hidden");
    activeButtons["more_butt"] = true;
    domElements.moreButton.classList.add("active-after");
    setTimeout(() => {
      isAnimating1 = false;
    }, 300);
  }
};

const toggleMoreMenu = (button, event) => {
  if (event.cancelable) event.preventDefault();
  event.stopPropagation();
  
  // Prevent toggling while animation is running
  if (isAnimating1) return;
  
  jiggle(button);
  
  if (activeButtons["more_butt"]) {
    closeMoreMenu();
  } else {
    openMoreMenu();
  }
};

/* ================= MENU 2 CONTROLS ================= */
const closeMoreMenu2 = () => {
  if (domElements.jellyMenu2 && domElements.moreButton2 && !isAnimating2) {
    if (activeButtons["more_butt2"] === true) {
      isAnimating2 = true;
      domElements.jellyMenu2.classList.add("hidden");
      activeButtons["more_butt2"] = false;
      domElements.moreButton2.classList.remove("active-after");
      setTimeout(() => {
        domElements.jellyMenu2.classList.add("firstgone");
        isAnimating2 = false;
      }, 300);
    }
  }
};

const openMoreMenu2 = () => {
  if (domElements.jellyMenu2 && domElements.moreButton2 && !isAnimating2) {
    // Close other menu first to prevent conflicts
    if (activeButtons["more_butt"] === true) {
      closeMoreMenu();
    }
    isAnimating2 = true;
    domElements.jellyMenu2.classList.remove("firstgone");
    domElements.jellyMenu2.classList.remove("hidden");
    activeButtons["more_butt2"] = true;
    domElements.moreButton2.classList.add("active-after");
    setTimeout(() => {
      isAnimating2 = false;
    }, 300);
  }
};

const toggleMoreMenu2 = (button, event) => {
  if (event.cancelable) event.preventDefault();
  event.stopPropagation();
  
  // Prevent toggling while animation is running
  if (isAnimating2) return;
  
  jiggle(button);
  
  if (activeButtons["more_butt2"]) {
    closeMoreMenu2();
  } else {
    openMoreMenu2();
  }
};





function togglePageList() {
    var pageBar = document.getElementById("pageList");
    var pageNums = document.getElementById("pageNums");
    var searchCon = document.getElementById("search_con");

    if (!pageBar || !pageNums) return;

    // 🔥 🚫 إذا overlay مفتوح → لا تعمل toggle نهائي
    if (window.isIframeFull) {
        pageBar.style.display = "none";
        return;
    }

    // 🚫 search hidden → hide
    if (!searchCon || searchCon.style.display === "none") {
        pageBar.style.display = "none";
        return;
    }

    // 🚫 no pages → hide
    if (pageNums.className.indexOf("no_pages") !== -1) {
        pageBar.style.display = "none";
        return;
    }

    // ✅ show
    pageBar.style.display = "block";
}



let viewToggledBefore = false; // Single variable for both

const handleSearchButton = function(event, forceState) {
    
	

    if (event && event.cancelable) event.preventDefault();
    if (event) event.stopPropagation();

    const buttonId = this.id;
    jiggle(this);

    const shouldActivate = forceState !== undefined ? forceState : !activeButtons[buttonId];

    if (!shouldActivate && activeButtons[buttonId]) {
        // DEACTIVATE - ALWAYS silent
        const useSilent = viewToggledBefore;
		setParams({ tab: null }, true);
        
        if (!viewToggledBefore) {
            viewToggledBefore = true;
        }

        activeButtons[buttonId] = false;
        this.classList.remove("active-after");

        showIframe();
        currentView = "iframe";

        togglePageList(false);
        
        const mainBar = document.getElementById("main_bar");
        if (mainBar) mainBar.style.display = "";

    } else if (shouldActivate && !activeButtons[buttonId]) {

        const useSilent = viewToggledBefore;
        setParams({ tab: 'search' }, useSilent);
        
        if (!viewToggledBefore) {
            viewToggledBefore = true;
        }
        
        if (activeButtons["fav_butt"] && domElements.favButton) {
            activeButtons["fav_butt"] = false;
            domElements.favButton.classList.remove("active-after");
        }

        activeButtons[buttonId] = true;
        this.classList.add("active-after");

        showSearch();
        currentView = "search";

        togglePageList(true);
        
        const mainBar = document.getElementById("main_bar");
        if (mainBar) mainBar.style.display = "none";

        setTimeout(function() {
            if (domElements.searchInput) domElements.searchInput.focus();
        }, 100);

        $$(".jiggly-button").forEach(function(el) {
            if (el !== this && el.id !== "more_butt" && el.id !== "more_butt2") {
                activeButtons[el.id] = false;
                el.classList.remove("active-after");
            }
        }.bind(this));
		
		
		
		
		
		
	document.getElementById("resultsFrame").contentWindow.postMessage({
      type: "do_scroll_to"
    }, "*");
		
		
		
		
		
    }

    closeMoreMenu();
    closeMoreMenu2();
};

const handleFavButton = function(event, forceState) {

	
	if (event && event.cancelable) event.preventDefault();
    if (event) event.stopPropagation();

    const buttonId = this.id;
    jiggle(this);

    const shouldActivate = forceState !== undefined ? forceState : !activeButtons[buttonId];

    const paginationBar = document.getElementById("pageList");
    if (paginationBar) paginationBar.style.display = "none";

    if (!shouldActivate && activeButtons[buttonId]) {
        // DEACTIVATE FAVORITES
        const useSilent = viewToggledBefore;
        setParams({ tab: null }, true);
        if (!viewToggledBefore) {
            viewToggledBefore = true;
        }
        
        activeButtons[buttonId] = false;
        this.classList.remove("active-after");
        showIframe();
        currentView = "iframe";
        
        const mainBar = document.getElementById("main_bar");
        if (mainBar) mainBar.style.display = "";
        
        if (domElements.favBar) domElements.favBar.style.display = "none";
        if (domElements.favoritesDiv) domElements.favoritesDiv.style.display = "none";

    } else if (shouldActivate && !activeButtons[buttonId]) {
        // ACTIVATE FAVORITES
        const useSilent = viewToggledBefore;
        setParams({ tab: "fav" }, useSilent);
        
        if (!viewToggledBefore) {
            viewToggledBefore = true;
        }
        
        if (activeButtons["search_butt"] && domElements.searchButton) {
            activeButtons["search_butt"] = false;
            domElements.searchButton.classList.remove("active-after");
            if (domElements.searchBar) domElements.searchBar.style.display = "none";
            if (domElements.searchDiv) domElements.searchDiv.style.display = "none";
        }
        
        activeButtons[buttonId] = true;
        this.classList.add("active-after");
        showFavorites();
        currentView = "favorites";
        
        const mainBar = document.getElementById("main_bar");
        if (mainBar) mainBar.style.display = "none";
        
        if (domElements.favBar) domElements.favBar.style.display = "flex";
        
        if (typeof FavSystem === 'function') {
            setTimeout(() => FavSystem(), 10);
        }
        
        $$(".jiggly-button").forEach((el) => {
            if (el !== this && el.id !== "more_butt" && el.id !== "more_butt2") {
                activeButtons[el.id] = false;
                el.classList.remove("active-after");
            }
        });
    }

    closeMoreMenu();
    closeMoreMenu2();
};



// Document click handler with animation check
document.addEventListener("click", function(e) {
  // Check if click is outside both menus and their buttons
  const isMenu1Button = e.target.closest("#more_butt");
  const isMenu1 = e.target.closest("#jellyMenu");
  const isMenu2Button = e.target.closest("#more_butt2");
  const isMenu2 = e.target.closest("#jellyMenu2");
  
  if (!isMenu1Button && !isMenu1 && activeButtons["more_butt"] && !isAnimating1) {
    closeMoreMenu();
  }
  
  if (!isMenu2Button && !isMenu2 && activeButtons["more_butt2"] && !isAnimating2) {
    closeMoreMenu2();
  }
});




const handleMoreButton = function(event) {
    if (activeButtons["more_butt2"]) {
      closeMoreMenu2();
    }
    toggleMoreMenu(this, event);
  };

  const handleMoreButton2 = function(event) {
    if (activeButtons["more_butt"]) {
      closeMoreMenu();
    }
    toggleMoreMenu2(this, event);
  };

  const handleScrollTop = function(event) {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    jiggle(this);
    scrollToTop();
    closeMoreMenu2();
  };

  const handleScrollBottom = function(event) {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    jiggle(this);
    scrollToBottom();
    closeMoreMenu2();
  };

  const handleHideButton = function(event) {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    jiggle(this);
    alert("Hide functionality");
    closeMoreMenu();
  };

  const handleLoginButton = function(event) {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    jiggle(this);
    alert("Login functionality");
    closeMoreMenu();
  };

const initDomReferences = () => {
    domElements.iframe = document.getElementById("iframe_con");
    domElements.searchDiv = document.getElementById("search_con");
    domElements.favoritesDiv = document.getElementById("favorites_con");
    domElements.searchBar = document.getElementById("search_bar");
    domElements.favBar = document.getElementById("fav_bar");  // Added
    domElements.searchInput = document.getElementById("searchBox");
    domElements.favInput = document.getElementById("favBox");  // Added
    domElements.searchButton = document.getElementById("search_butt");
    domElements.favButton = document.getElementById("fav_butt");
    domElements.moreButton = document.getElementById("more_butt");
    domElements.moreButton2 = document.getElementById("more_butt2");
    domElements.jellyMenu = document.getElementById("jellyMenu");
    domElements.jellyMenu2 = document.getElementById("jellyMenu2");
    domElements.scrollTopBtn = document.getElementById("scrollTopBtn");
    domElements.scrollBottomBtn = document.getElementById("scrollBottomBtn");
    domElements.hideBtn = document.getElementById("hideBtn");
    domElements.loginBtn = document.getElementById("loginBtn");
};

  /* ================= ATTACH EVENT LISTENERS ================= */
  const attachEventListeners = () => {
    if (domElements.searchButton) {
      domElements.searchButton.addEventListener(TAP, safeTap(handleSearchButton));
    }
    
    if (domElements.favButton) {
      domElements.favButton.addEventListener(TAP, safeTap(handleFavButton));
    }
    
    if (domElements.moreButton) {
      domElements.moreButton.addEventListener(TAP, safeTap(handleMoreButton));
    }
    
    if (domElements.moreButton2) {
      domElements.moreButton2.addEventListener(TAP, safeTap(handleMoreButton2));
    }
    
    if (domElements.scrollTopBtn) {
      domElements.scrollTopBtn.addEventListener(TAP, safeTap(handleScrollTop));
    }
    
    if (domElements.scrollBottomBtn) {
      domElements.scrollBottomBtn.addEventListener(TAP, safeTap(handleScrollBottom));
    }
    
    if (domElements.hideBtn) {
      domElements.hideBtn.addEventListener(TAP, safeTap(handleHideButton));
    }
    
    if (domElements.loginBtn) {
      domElements.loginBtn.addEventListener(TAP, safeTap(handleLoginButton));
    }
    
    if (domElements.jellyMenu) {
      domElements.jellyMenu.addEventListener(TAP, safeTap((e) => {
        e.stopPropagation();
        if (e.target.classList.contains("jiggly-button")) {
          closeMoreMenu();
        }
      }));
    }
    
    if (domElements.jellyMenu2) {
      domElements.jellyMenu2.addEventListener(TAP, safeTap((e) => {
        e.stopPropagation();
        if (e.target.classList.contains("jiggly-button")) {
          closeMoreMenu2();
        }
      }));
    }
    
    document.addEventListener(TAP, safeTap((e) => {
      if (e.target.closest("#more_butt")) return;
      if (e.target.closest("#jellyMenu")) return;
      if (e.target.closest("#more_butt2")) return;
      if (e.target.closest("#jellyMenu2")) return;
      closeMoreMenu();
      closeMoreMenu2();
    }));
  };

  /* ================= PAGE NAVIGATION ================= */
  const initPageNavigation = () => {
    document.addEventListener("click", (e) => {
      const anchor = e.target.closest("nav a");
      if (!anchor) return;
      e.preventDefault();
      alert("Page " + anchor.dataset.p);
    });
  };

  /* ================= BOOTSTRAP ================= */
  showLoader();
  
  
  
  
// Function to wait for iframe to load
const waitForIframeLoad = () => {
  return new Promise((resolve) => {
    const iframe = document.getElementById("iframe_con");
    
    if (!iframe) {
      resolve(false);
      return;
    }
    
    // Check if iframe is already loaded
    try {
      if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.readyState === 'complete') {
        resolve(true);
        return;
      }
    } catch(e) {
      // Cross-origin error, assume loaded
      resolve(true);
      return;
    }
    
    // Wait for load event
    iframe.addEventListener('load', () => {
      resolve(true);
    });
    
    // Timeout after 10 seconds
    setTimeout(() => {
      resolve(false);
    }, 10000);
  });
};
  
  
  
  
// Get path relative to parent's root
const getRelativePath = (fullUrl, parentPath) => {
  // Remove file:// prefix and drive letter
  let cleanUrl = fullUrl.replace(/^file:\/\/\/[A-Z]:\//, '').replace(/^file:\/\/\//, '');
  let cleanParent = parentPath.replace(/^file:\/\/\/[A-Z]:\//, '').replace(/^file:\/\/\//, '');
  
  // Get parent directory
  let parentDir = cleanParent.substring(0, cleanParent.lastIndexOf('/'));
  
  // Remove parent directory from URL
  if (cleanUrl.startsWith(parentDir)) {
    return cleanUrl.substring(parentDir.length + 1);
  }
  
  return cleanUrl;
};















  
wait((app) => {
  render(app);
  setTimeout(async () => {
    hideLoader();
   
    showApp();
    initDomReferences();
    attachEventListeners();
    initPageNavigation();
    showIframe();
    
	
    
if (!window.gbTesting )
{
	if ( window.gbWhUtil && window.gbWhLang && window.gbWhVer )
	{
		addRhLoadCompleteEvent(doSearch);
		gbWhFHost=true;
	}
	else
	{
		document.location.reload();
	}
}
	
	
	
	
	
	
	
	
	
    // Wait for iframe to load completely
    const iframeLoaded = await waitForIframeLoad();
       // Load iframe based on 'url' parameter
const params = getParams();
const urlParam = params.url;
const tabParam = params.tab;
const rhsearchParam = params.rhsearch;





document.querySelector("html").dir = dir;
app && app.classList.replace(app.classList.contains("rtl") ? "rtl" : "ltr", dir);





var lastUrl = "";

if (iframeLoaded) {
  
  // 🔥 تخزين آخر صفحة
  var lastPageData = {
    url: "",
    title: ""
  };

 
 
 
 
 
 // Keep last navigated target to avoid loops / duplicates
var LAST_NAV_URL = "";
 
function normNavUrl(u) {
  return String(u || "").trim();
}
 
// Convert full file:///D:/... to relative path for your setParams({url:...})
function toRelativeIfFile(url) {
  var parentPath = window.location.href;
  return getRelativePath(url, parentPath);
}
 
 
 
 
 function splitClickedUrl(clicked) {
  clicked = String(clicked || "").trim();
  if (!clicked) return null;
 
  // separate path and hash part
  var hashPos = clicked.indexOf("#");
  var path = hashPos === -1 ? clicked : clicked.slice(0, hashPos);
  var hash = hashPos === -1 ? "" : clicked.slice(hashPos + 1); // without #
 
  // accept "#&a=b&c=d" or "#a=b&c=d"
  if (hash.charAt(0) === "&") hash = hash.slice(1);
 
  // parse hash pairs into object (NO double decode)
  var hp = {};
  if (hash) {
    hash.split("&").forEach(function (pair) {
      if (!pair) return;
      var eq = pair.indexOf("=");
      var k = eq === -1 ? pair : pair.slice(0, eq);
      var v = eq === -1 ? ""   : pair.slice(eq + 1);
 
      try { v = decodeURIComponent(v); } catch (e) {}
      hp[k] = v;
    });
  }
 
  return { path: path, hashParams: hp };
}
 
function normPath(p) {
  p = String(p || "").trim();
  p = p.replace(/^\.\//, "");   // remove leading ./
  p = p.replace(/^\//, "");     // remove leading /
  return p;
}
 
 
var skipHitidRemoval = false;  
var prevRhsearch = getParams().rhsearch; // Store once at start
 
window.addEventListener('message', function(e) {

    if (!e || !e.data) return;

    var iframe = document.getElementById("resultsFrame");
    if (!iframe) return;

   

if (e.data.type === "skipHitidRemoval") {

setParams({ hitid: null }, true);	
	
}
else
if (e.data.type === "clicked_url") {
  
  
  
  
  
  
  
 skipHitidRemoval = true; 
  
 var info = splitClickedUrl(e.data.url);
  if (!info) return;

  var relPath = normPath(getRelativePath(info.path, window.location.href));
  var cur = getParams();
  var curUrl = normPath(cur.url || "");
  var newHitId = info.hashParams.hitid || "null";
  var newRhsearch = info.hashParams.rhsearch;

  if (curUrl === relPath && prevRhsearch === newRhsearch) {
    // Same search → update hitid only
    setParams({ hitid: newHitId }, true);
    document.getElementById("iframe_con").contentWindow.postMessage({
      type: "SEARCH_PARAMS",
      rhsearch: cur.rhsearch || "",
      hitid: newHitId
    }, "*");
    handleSearchButton.call(domElements.searchButton, { cancelable: true, preventDefault: function() {}, stopPropagation: function() {} }, false);
    return;
  }

  // Different search → reload
  if (prevRhsearch != newRhsearch) {
  var iframe_con = document.getElementById("iframe_con");
  var newUrl = relPath;
  iframe_con.src = newUrl;
  }
  
  // Full update
  setParams({
    url: relPath,
    tab: null,
    hitid: newHitId,
    rhsearch: newRhsearch || null,
    rhsyns: info.hashParams.rhsyns || null
  }, true);
  
  prevRhsearch = newRhsearch;
  
  
  
  
  
  
  
  
  
  
}





else if (e.data.type === "GET_SEARCH_PARAMS") {

        var params = getParams(); // عندك أصلاً


if(params.hitid){
	 e.source.postMessage({
            type: "SEARCH_PARAMS",
            rhsearch: params.rhsearch || "",
            hitid: params.hitid || ""
        }, "*");
}

       


}
else
	 if (e.data.type === "ifram_full") {
          window.isIframeFull = e.data.full;
	     if(e.data.full== true){
		             
                     makeifrme_full();
			  
			   
	     }
		 else{
		
			 restore_iframe();
			 
		 }
	 }
	
	else
	if (e.data.type === "resize") {

        var newHeight = e.data.height || 0;

        // 🔥 STEP 1: HARD RESET
        iframe.style.height = "0px";
        iframe.style.minHeight = "0px";

        // 🔥 STEP 2: RESET PARENT
        var parent = iframe.parentNode;
        if (parent) {
            parent.style.height = "auto";
            parent.style.minHeight = "0px";
        }

        // 🔥 STEP 3: FORCE REFLOW
        document.body.offsetHeight;
        iframe.offsetHeight;

        // 🔥 STEP 4: APPLY HEIGHT
        iframe.style.height = newHeight + "px";
    }

    // =========================
    // ✅ HANDLE URL UPDATE
    // =========================
    else if (e.data.type === "URL_UPDATE") {

        var url = e.data.url;
        var title = e.data.title || "";

        if (!url) return;

        var parentPath = window.location.href;
        var relativePath = getRelativePath(url, parentPath);

        // 🔥 UPDATE HASH WITHOUT RELOAD
        setParams({ url: relativePath }, false);

        if (typeof lastUrl !== "undefined" && lastUrl === "") {
            lastUrl = relativePath;
        }

        // 🔥 FAVORITES SYSTEM
        if (typeof FavSystem === 'function') {
            FavSystem(null, null, true, relativePath, title);
        }
    }

});
 
 
 
 
 
 
 
 
 
 
 
 
 
 
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




var lastFullHash = "";
var isUpdating = false;

function onHashChange() {
	
    if (isUpdating) return;
    isUpdating = true;
    
    var url = getHashUrl();
    var currentFullHash = window.location.hash;
    
    var isSameHash = (currentFullHash === lastFullHash);
    if (!isSameHash) {
        lastFullHash = currentFullHash;
    }

    if (!url) {
        isUpdating = false;
        return;
    }
    
 
    var base = getBasePath();
    var fullPath = base + url;

    var params = getParams();
    var tabParam = params.tab || "";
    var rhsearchParam = params.rhsearch;
    var isSearchActive = activeButtons && activeButtons['search_butt'];
    var isFavActive = activeButtons && activeButtons['fav_butt'];
    
    // Should views be active?
    var shouldSearchBeActive = (tabParam === 'search');
    var shouldFavBeActive = (tabParam === 'fav');
    
    // ================= HANDLE SEARCH VIEW =================
    if (domElements.searchButton) {
		
        if (shouldSearchBeActive && !isSearchActive) {
            // Activate search from tab parameter
            var mockEvent = { 
                cancelable: true, 
                preventDefault: function() {}, 
                stopPropagation: function() {} 
            };
			
            handleSearchButton.call(domElements.searchButton, mockEvent, true);
            viewToggledBefore = true;
        } else if (!shouldSearchBeActive && isSearchActive) {
            // Deactivate search
            var searchValue = domElements.searchInput ? domElements.searchInput.value : "";
            
            var mockEvent = { 
                cancelable: true, 
                preventDefault: function() {}, 
                stopPropagation: function() {} 
            };
            handleSearchButton.call(domElements.searchButton, mockEvent, false);
            
            // Reset the flag when search is deactivated via navigation
            viewToggledBefore = false;
            
             // Add rhsearch parameter with the search value if not empty
            if (searchValue && searchValue !== "") {
                setTimeout(function() {
                   // setParams({ rhsearch: searchValue }, true);
                }, 10);
            }
        }
        
       
    }
    
    // ================= HANDLE FAVORITES VIEW =================
    if (domElements.favButton) {
	

        if (shouldFavBeActive && !isFavActive) {
            // Activate favorites from tab parameter
            var mockEvent = { 
                cancelable: true, 
                preventDefault: function() {}, 
                stopPropagation: function() {} 
            };
            handleFavButton.call(domElements.favButton, mockEvent, true);
			
			viewToggledBefore = true;
			
        } else if (!shouldFavBeActive && isFavActive) {
            // Deactivate favorites
            var mockEvent = { 
                cancelable: true, 
                preventDefault: function() {}, 
                stopPropagation: function() {} 
            };
            handleFavButton.call(domElements.favButton, mockEvent, false);
        
		
		      viewToggledBefore = false;
	
		
		}
		
		
		
		
		
		
		
		
    }

    // ================= HANDLE IFRAME LOADING =================
    if (domElements.iframe) {
        // Only load iframe when search is NOT active AND URL changed
        // Also don't load if favorites are active
        if (!shouldSearchBeActive && !shouldFavBeActive && url !== lastUrl) {
            lastUrl = url;
			
			if(!skipHitidRemoval){
				setParams({ hitid: null }, true);
			}
			
			domElements.iframe.contentWindow.location.replace(fullPath);
        } else if (!shouldSearchBeActive && !shouldFavBeActive) {
            lastUrl = url;
        } else {
            // Just update lastUrl without reloading
            lastUrl = url;
        }
    }
    
    isUpdating = false;
	
	skipHitidRemoval = false;
}

// Initialize
window.addEventListener('hashchange', onHashChange);









// Run on page load to ensure hash has URL parameter
if (!getHashUrl()) {
    window.location.hash = "&url=index.php.htm";
}

if (urlParam && domElements.iframe) {
  domElements.iframe.contentWindow.location.replace(urlParam);
}





// Call search tab only if tab parameter is 'search'
if (domElements.searchButton && tabParam === 'search') {
  const mockEvent = { cancelable: true, preventDefault: () => {}, stopPropagation: () => {} };
  handleSearchButton.call(domElements.searchButton, mockEvent);

}

	
// Call search tab only if tab parameter is 'search'
if (domElements.favButton && tabParam === 'fav') {
  const mockEvent = { cancelable: true, preventDefault: () => {}, stopPropagation: () => {} };
  handleFavButton.call(domElements.favButton, mockEvent);

}	
	
	
	
  }, 0);
});












})();