
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


function convertToLowercase(inputString) {
    return inputString.toLowerCase();
}











const slideToggle = (el) => {
    if (!el) return;

    const isOpen = getComputedStyle(el).display === "block";

    isOpen ? slideUp(el) : slideDown(el);
};

const slideDown = (el) => {
    if (el._sliding) return;
    el._sliding = true;

    el.style.display = "block";
    el.style.overflow = "hidden";
    el.style.height = "0px";

    const full = el.scrollHeight;
    let h = 0;

    const step = () => {
        h += 10;

        if (h >= full) {
            el.style.height = "";
            el.style.overflow = "";
            el._sliding = false;
        } else {
            el.style.height = h + "px";
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};

const slideUp = (el) => {
    if (el._sliding) return;
    el._sliding = true;

    el.style.overflow = "hidden";

    let h = el.offsetHeight;

    const step = () => {
        h -= 10;

        if (h <= 0) {
            el.style.display = "none";
            el.style.height = "";
            el.style.overflow = "";
            el._sliding = false;
        } else {
            el.style.height = h + "px";
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};



// ================= RECEIVE =================

window.addEventListener("message", (e) => {
    try {
        const data = JSON.parse(e.data);

        if (data?.from === "child" && data?.key === "userLang") {
            location.reload();
        }

    } catch (err) {
        // ignore invalid JSON
    }
});

(() => {

    const welcome = window.INDEX_LANG?.welcome ?? "";
	const app_name = window.INDEX_LANG.app_name;
	
	const menu_btt_lbl =  window.INDEX_LANG?.menu_btt_lbl ?? "";
	const sett = window.INDEX_LANG?.sett ?? "";
	const navagte_links =  window.INDEX_LANG?.navagte_links ?? "";
    const app = document.getElementById("app");
    const { dir } = window.INDEX_LANG || {};
	if (!app) return;
    

// 🔥 احسب الأيقونات مرة وحدة (أفضل للأداء)
const isRTL = dir === "rtl";



const navigate_links = `
<a href="privacy.html" class="no-link">
(( ${window.INDEX_LANG.privacy} ))
</a><br>

<a href="help.html" class="no-link">
(( ${window.INDEX_LANG.help} ))
</a><br>

<a href="download.html" class="no-link">
(( ${window.INDEX_LANG.downloads} ))
</a><br><br>

${window.INDEX_LANG.online_app}
<br>

<a href="https://noon-team.org/app" target='_blank' class="no-link">
https://noon-team.org/app
</a><br><br>

${window.INDEX_LANG.contact}
<br>

<a href="mailto:noon@noon-team.org" target='_blank' class="no-link">
noon@noon-team.org
</a>
`;



const menu = `
<div class="menu-btn" id="menuBtn">
${
  window.INDEX_LANG?.dir === "rtl"
    ? `<i class="demo-icon icon-left-hand"></i>${menu_btt_lbl}<i class="demo-icon icon-right-hand"></i>`
    : `<i class="demo-icon icon-right-hand"></i>${menu_btt_lbl}<i class="demo-icon icon-left-hand"></i>`
}
</div>

<ul id="menuList" class="menu-list" style="display:none;">
    <li>Home</li>
    <li>Search</li>
    <li>About</li>
    <li>Contact</li>
</ul>
`;







const langMenu = `
<div class="menu-btn" id="langBtn">
${
  window.INDEX_LANG?.dir === "rtl"
    ? `اختر اللغة<br>Choose Language`
    : `اختر اللغة<br>Choose Language`
}
</div>

<ul id="langList" class="menu-list" style="display:none;">
    <li data-lang="ar">العربية</li>
    <li data-lang="en">English</li>
</ul>
`;









    const html = `
    <table class="border-frame" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tbody>

        <tr height="20">
          <td class="corner-tl" width="20"></td>
          <td class="top-mid"></td>
          <td class="corner-tr" width="20"></td>
        </tr>

        <tr>
          <td class="left-mid" width="20"></td>
          <td class="content-cell">
            <div class="content">

                


                <div class="trans">
				
           <img id="bsm"  src="./Assets/images/generic/bsm.png" width="200" height="40" ><br>
           <a id="index_butt" class="no-link" href="index.html"><img id="logo" src="./Assets/images/generic/noon.png" width="150"></a><br>


				${app_name}
				
				
				${welcome}
				
				
				
				
				
				</div>
				
				<br>

                ${menu}


                  <br>

                 ${langMenu} 

                <br>

				<a id="sett" href="settings.html" class="menu-btn no-link">${sett}</a>


                
				 
                <br>
				
                <div class="trans">



               ${navigate_links}
			   

                </div>



            </div>
          </td>
          <td class="right-mid" width="20"></td>
        </tr>

        <tr height="20">
          <td class="corner-bl"></td>
          <td class="bottom-mid"></td>
          <td class="corner-br"></td>
        </tr>

      </tbody>
    </table>`;







if (dir) {
    document.documentElement.setAttribute("dir", dir);
    
    const app = document.getElementById("app");
    if (app) {
        app.classList.remove("rtl", "ltr");
        app.classList.add(dir);
    }
}






    app.insertAdjacentHTML("beforeend", html);

    // ===== GET ELEMENTS =====
    const btn = app.querySelector(".menu-btn");
    const list = app.querySelector("#menuList");

const langBtn = document.getElementById("langBtn");
const langList = document.getElementById("langList");

if (btn) {
    btn.onclick = function () {
        if (window.DRAG_SCROLL_DRAGGING) return;
        var isOpen = list.style.display === "block";

        // 🔥 toggle first
        slideToggle(list);

        // ✅ ONLY scroll when opening
        if (!isOpen) {

            setTimeout(function () {

                // 🔥 manual absolute position (IE6 safe)
                var y = 0;
                var el = btn;

                while (el) {
                    y += el.offsetTop || 0;
                    el = el.offsetParent;
                }

                // 🔥 force scroll (ALL cases)
                document.documentElement.scrollTop = y;
                document.body.scrollTop = y;

                var appEl = document.getElementById("app");
                if (appEl) appEl.scrollTop = y;

            }, 200); // match slideToggle duration
        }
    };
}


if (langBtn) {
    langBtn.onclick = function () {

        if (window.DRAG_SCROLL_DRAGGING) return;

        var isOpen = langList.style.display === "block";

        // فتح / إغلاق
        slideToggle(langList);

        // 🔥 scroll فقط عند الفتح
        if (!isOpen) {

            setTimeout(function () {

                var appEl = document.getElementById("app");

                if (appEl) {

                    var y = 0;
                    var el = langBtn;

                    while (el && el !== appEl) {
                        y += el.offsetTop || 0;
                        el = el.offsetParent;
                    }

                    appEl.scrollTop = y;
                }

            }, 200); // نفس مدة slide
        }
    };
}



if (langList) {
    langList.onclick = (e) => {

        if (window.DRAG_SCROLL_DRAGGING) return;
        showLoader();
        const target = e.target;

        const lang = target?.getAttribute("data-lang");
        if (!lang) return;

        // 🔥 message
        const msg = JSON.stringify({
            from: "parent",
            msg: {
                type: "setValue",
                key: "userLang",
                value: lang
            }
        });

        const storageFrame = document.getElementById("storageFrame");

        if (storageFrame?.contentWindow) {

            if (window.postMessage) {
                storageFrame.contentWindow.postMessage(msg, "*");
            } else {
                storageFrame.contentWindow.name = msg;
            }
        }

    
    };
}

DragScroll(true);



	setTimeout(function () {
     hideLoader();
	 showApp();
    }, 0); // 500 = نصف ثانية
	
	
})();