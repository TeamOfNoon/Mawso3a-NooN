var gSearchMsgId = "searchMesg";
var gResultsFoundString = window.RH_LANG.result_not;





var gSearchResultHtml = "{%LINK_NAME%}\n				\n				<span  class=\"wSearchURLSmallScr\">{%SEARCH_URL%}</span> \n				 <br />\n				<span  class=\"wSearchContextSmallScr\">{%SEARCH_SUMMARY%}</span>";
var gSearchResClassName = "wSearchResultItemSmallScr";
var gSearchResTitleClassName = "wSearchResultTitleSmallScr";
var gSearchResTitleClassHover = "wSearchResultTitleHoverSmallScr";
var gSearchResStyle = "";
var gSearchResTitleStyle = "";
var gSearchPrevBtnId = "searchprev";
var gSearchNextBtnId = "searchnext";
var gsResultDivID="searchMesg";
var gPageListBarID ="";
var gPageLinkClass = "";
var gPageClass = "";
var gSearchDropdownID = "searchResCount";
var gSearchPageFilePath = "main.html";
var gSearchResultsCount = "5";
var gSearchHighlightControlID = "highlightsearch";
var gbHighLight = 1;
var gTextHighlightColor = "#ffffff";
var gbgHighlightColor = "#02b5bc";
var g_nMaxResult ="";
gRootRelPath = ".";

var gPageRange = 0;
function initSearchCountDropDown() {
    callbackSearchCountCookieRead(gSearchResultsCount);
}

function initHighlightSearchControl() {
    callbackHighlightCookieRead("true");
}
function callbackSearchCountCookieRead(maxValCookie)
{
	var val;
		val = window.search_per_page;
	var dropdown = getElement(gSearchDropdownID);
	if(dropdown)
		dropdown.value = val;
	g_nMaxResult = val;
}
function callbackHighlightCookieRead(highlightFlag)
{
	/*if(highlightFlag == TRUESTR)
		gbHighLight = 1;

	else if(highlightFlag == FALSESTR)
		gbHighLight = 0;

	var highlightElem = document.getElementById(gSearchHighlightControlID);
	if(highlightElem)
	{
		if(gbHighLight)
		{
			highlightElem.checked = true;
			//saveSetting(RHHIGHLIGHT, TRUESTR, true);
		}
		else
		{
			highlightElem.checked = false;
			//saveSetting(RHHIGHLIGHT, FALSESTR, true);
		}
		saveSetting(RHHIGHLIGHTTEXTCOLOR, gTextHighlightColor, true);
		saveSetting(RHHIGHLIGHTBGCOLOR, gbgHighlightColor, true);
	}*/
}

function onToggleHighlightSearch() {

    var chk =
        document.getElementById("highlightsearch");

    if (!chk) {
        return;
    }

   
	
	sendMulti({
    highlightSearch: chk.checked
   });
  
}


function toggleSearchpartHighlight() {

    var chk =
        document.getElementById("highlightpartsearch");

    if (!chk) {
        return;
    }

   
	
	sendMulti({
    highlightpartsearch: chk.checked
   });
  
}



function toggleScopeSections(el){

    var ids = [
        "mn33_sec",
        "all_ar_sec",
        "all_en_sec",
        "custom_sec"
    ];

    var checkedCount = 0;
    var i;
    var chk;

    for(i = 0; i < ids.length; i++){

        chk = document.getElementById(ids[i]);

        if(!chk){
            continue;
        }

        if(chk.checked){
            checkedCount++;
        }
    }

    // لا تسمح بإلغاء آخر خيار
    if(checkedCount === 0){
        el.checked = true;
        checkedCount = 1;
    }

    // احفظ القيم بعد التصحيح النهائي
    for(i = 0; i < ids.length; i++){

        chk = document.getElementById(ids[i]);

        if(!chk){
            continue;
        }

        var obj = {};
        obj[ids[i]] = chk.checked;

        sendMulti(obj);
    }
}





function onWordMatchChange(el) {

    var normal = document.getElementById("wordMatchNom");
    var part   = document.getElementById("wordMatchPart");
    var stem   = document.getElementById("wordMatchStem");

    if (el.checked) {
        normal.checked = false;
        part.checked   = false;
        stem.checked   = false;

        el.checked = true;
    }
}






function onMaxPageCountChange(maxVal)
{
	g_nMaxResult = maxVal;
	if(gSearchString != "")
		onClickPage(null, 1);
	//saveSetting(RHSEARCHCOUNT, maxVal, true);
	

	sendMulti({searchPerPage: maxVal,action: "searchPerPage"});
	
	
}
function onClickPrevNext( btn, a_nPageNumber )
{
	onClickPage(a_nPageNumber);	
}
function updateNavigationPagesBar(nCurPage, nNumPages)
{
	/*var pageListBarDiv = document.getElementById(gPageListBarID);
	if(pageListBarDiv == null || pageListBarDiv == 'undefined'){
		return;
	}
	if(nNumPages == 1) {
		pageListBarDiv.innerHTML = '';
		return;
	}	
		
	var resDiv = document.getElementById(gsResultDivID);
	if(gPageRange == 0)
		gPageRange = Math.floor(resDiv.offsetWidth/SEARCHPAGEWIDTHRATIO);
	var startPage = nCurPage - Math.floor(gPageRange/2);
	var endPage = 0;
	if(startPage < 1)
		startPage = 1;
	endPage = startPage + gPageRange -1;
	if(endPage > nNumPages)
	{
		endPage = nNumPages;
		startPage = endPage - gPageRange + 1;
		if(startPage < 1)
			startPage = 1;
	}
	var sHTML = "";
	sHTML += "<ul style='margin: 0px; padding: 0px;'>";
	for(var i=startPage; i<=endPage; i++)
	{
		if(i == nCurPage)
			sHTML += "<li class='" + gPageClass + "' style='display:inline;'>" + i.toString() + "</li>";
		else
			sHTML += "<li class='" + gPageLinkClass + " " + HLISTCLASS + " " + HANDCURSORCLASS + "' onclick=\"onClickPrevNext(this,'" + i.toString() + "')\" >" + i.toString() + "</li>";
	}
	sHTML += "</ul>";
	pageListBarDiv.innerHTML = sHTML;*/
}

function isRTL() {
    var d = document.documentElement.getAttribute("dir");
    return d && d.toLowerCase() === "rtl";
}


function hasClass(el, cls){
  return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
}

function contains(parent, child){
  while (child){
    if (child === parent) return true;
    child = child.parentNode;
  }
  return false;
}



function isRTL() {
    const appElement = document.querySelector('#app');
    if (appElement) {
        const computedStyle = window.getComputedStyle(appElement);
        const direction = computedStyle.direction;
        return direction === 'rtl';
    }
    // Fallback to document direction
    return (document.documentElement.dir || document.body.dir || "").toLowerCase() === "rtl";
}






function buildPagination(nCurPage, nNumPages) {
    var container = document.getElementById("pageNums");
    if (!container) return;

    var rtl = isRTL();
    var html = "";
    var i;

    // 🔥 CHECK VISIBILITY (IE6 SAFE)
    var isHidden = false;

    if (window.getComputedStyle) {
        isHidden = window.getComputedStyle(container, null).display === "none";
    } else {
        isHidden = container.currentStyle.display === "none";
    }

    // 🚫 NO PAGES OR HIDDEN
    if (!nNumPages || nNumPages <= 1) {
        container.innerHTML = "";
        container.className = "pageNums no_pages";
        return;
    }

    // ✅ HAS PAGES
    //container.className = "pageNums";

    for (i = 1; i <= nNumPages; i++) {
        html += '<a href="javascript:void(0)" class="pageBtn' +
            (i === nCurPage ? ' active' : '') +
            '" data-page="' + i + '" draggable="false" style="user-select: none;">' + i + '</a>';
    }

    container.innerHTML = html;
    container.style.direction = rtl ? "rtl" : "ltr";

   var links = container.getElementsByTagName("a");

for (i = 0; i < links.length; i++) {

    links[i].onclick = function(e) {

        e = e || window.event;

        // 🔥 BLOCK CLICK AFTER DRAG
        if (container._dragMoved) {

            if (e.preventDefault) {
                e.preventDefault();
            }

            e.returnValue = false;
            e.cancelBubble = true;

            return false;
        }

        onClickPrevNext(
            this,
            this.getAttribute("data-page")
        );

        return false;
    };
}

    // scroll to active
    var currentBtn = null;
    for (i = 0; i < links.length; i++) {
        if (parseInt(links[i].getAttribute("data-page"), 10) === parseInt(nCurPage, 10)) {
            currentBtn = links[i];
            break;
        }
    }

    if (currentBtn) {
        if (rtl) {
            container.scrollLeft = currentBtn.offsetLeft;
        } else {
            container.scrollLeft = currentBtn.offsetLeft - Math.floor(container.offsetWidth / 2);
        }
    }
}






function isSearchVisible() {

    var el = document.getElementById("search_con");

    if (!el) {
        return false;
    }

    // display:none check
    var isHidden = false;

    if (window.getComputedStyle) {

        isHidden =
            window.getComputedStyle(el, null).display === "none";

    } else if (el.currentStyle) {

        // IE6 fallback
        isHidden =
            el.currentStyle.display === "none";
    }

    if (isHidden) {
        return false;
    }

    // 🔥 CHECK TAB CONTAINER
    var parent = el;

    while (parent) {

        // has tab_content class
        if (
            (" " + parent.className + " ")
            .indexOf(" tab-content ") !== -1
        ) {

            // not active
            if (
                (" " + parent.className + " ")
                .indexOf(" active ") === -1
            ) {

                return false;
            }
        }

        parent = parent.parentNode;
    }

    return true;
}













// =====================================
// GLOBALS
// =====================================

var prevBtn;
var nextBtn;

var firstBtn;
var lastBtn;

var searchEnd;

var pageBar;
var pageNums;

var iframe;

var totalPages = 0;
var hasPages   = false;
var isLastPage = false;

// =====================================
// UPDATE BUTTONS
// =====================================

function updatePrevNextButtons(nCurPage, nNumPages)
{
	prevBtn  =
		document.getElementById("searchprev");

	nextBtn  =
		document.getElementById("searchnext");

	firstBtn =
		document.getElementById("searchfirst");

	lastBtn  =
		document.getElementById("searchlast");

	searchEnd =
		document.getElementById("wSearchEnd");

	pageBar =
		document.getElementById("pageList");

	pageNums =
		document.getElementById("pageNums");

	iframe =
		document.getElementById("resultsFrame");

	var isSearchView =
		isSearchVisible();

	var forceHideBar =
		!isSearchView;

	// =====================================
	// BUILD PAGINATION
	// =====================================

	buildPagination(

		parseInt(nCurPage, 10),

		parseInt(nNumPages, 10)
	);

	// =====================================
	// DETECT REAL PAGES
	// =====================================

	totalPages = 0;
	hasPages   = false;

	if (pageNums)
	{
		var links =
			pageNums.getElementsByTagName("a");

		totalPages =
			links ? links.length : 0;

		hasPages =
			totalPages > 0;
	}

	// =====================================
	// NO PAGES
	// =====================================

	if (!hasPages)
	{
		if (pageNums)
		{
			pageNums.className =
				"pageNums no_pages";
		}

		if (pageBar)
		{
			pageBar.style.display =
				"none";
		}

		if (prevBtn)
		{
			prevBtn.style.display =
				"none";
		}

		if (nextBtn)
		{
			nextBtn.style.display =
				"none";
		}

		if (firstBtn)
		{
			firstBtn.style.display =
				"none";
		}

		if (lastBtn)
		{
			lastBtn.style.display =
				"none";
		}

		if (searchEnd)
		{
			searchEnd.style.display =
				"block";
		}

		//sendNavigationButtons();

		return;
	}

	// =====================================
	// HAS PAGES
	// =====================================

	if (pageNums)
	{
		pageNums.className =
			"pageNums";
	}

	if (pageBar)
	{
		pageBar.style.display =
			forceHideBar
				? "none"
				: "block";
	}

	// =====================================
	// SAFE CURRENT PAGE
	// =====================================

	nCurPage =
		parseInt(nCurPage, 10);

	if (isNaN(nCurPage) || nCurPage < 1)
	{
		nCurPage = 1;
	}

	if (nCurPage > totalPages)
	{
		nCurPage = totalPages;
	}

	// =====================================
	// FIRST BUTTON
	// =====================================

	if (firstBtn)
	{
		firstBtn.style.display =
			nCurPage > 1
				? "block"
				: "none";
	}

	// =====================================
	// PREV BUTTON
	// =====================================

	if (prevBtn)
	{
		prevBtn.style.display =
			nCurPage > 1
				? "block"
				: "none";
	}

	// =====================================
	// LAST PAGE?
	// =====================================

	isLastPage =
		(nCurPage >= totalPages);

	// =====================================
	// NEXT BUTTON
	// =====================================

	if (nextBtn)
	{
		nextBtn.style.display =
			!isLastPage
				? "block"
				: "none";
	}

	// =====================================
	// LAST BUTTON
	// =====================================

	if (lastBtn)
	{
		lastBtn.style.display =
			!isLastPage
				? "block"
				: "none";
	}

	// =====================================
	// SEARCH END
	// =====================================

	if (searchEnd)
	{
		searchEnd.style.display =
			isLastPage
				? "block"
				: "none";
	}

	// =====================================
	// SEARCH HIDDEN
	// =====================================

	if (!isSearchView && pageBar)
	{
		pageBar.style.display =
			"none";
	}

	// =====================================
	// SEND TO CHILD
	// =====================================

	

	// =====================================
	// AUTO SCROLL ACTIVE PAGE
	// =====================================

	scrollCurrentItem(
		".pageNums",
		".pageNums a.active"
	);
}

// =====================================
// SEND NAVIGATION BUTTONS
// =====================================

function sendNavigationButtons()
{
	sendToChild(
	{
		type: "navigation_buttons",

		buttons:
		{
			first:
				firstBtn &&
				firstBtn.style.display !== "none",

			prev:
				prevBtn &&
				prevBtn.style.display !== "none",

			next:
				nextBtn &&
				nextBtn.style.display !== "none",

			last:
				lastBtn &&
				lastBtn.style.display !== "none",

			searchEnd:
				searchEnd &&
				searchEnd.style.display !== "none"
		}
	},
	iframe
	);
}














function initSearchPage()
{
	
	document.getElementById("searchMesg").style.display = "";
	initSearchCountDropDown();
	//initHighlightSearchControl();
	updatePrevNextButtons(0,0);
}

function writeResult( a_strUrl, a_strTitle, a_nIndex, a_sSummary )
{
	var strTitleStyle = "";
	if(gSearchResTitleStyle != "")
		strTitleStyle = "style=\"" + gSearchResTitleStyle + "\" ";
	var strHoverEvents = "";
	if(isTouchDevice())
	{
		strHoverEvents += " ontouchstart=\"onSearchItemHover(this,'" + gSearchResTitleClassHover + "')\" ";
		strHoverEvents += " ontouchend=\"onSearchItemHoverOut(this,'" + gSearchResTitleClassName + "')\"";
		strHoverEvents += " ontouchmove=\"onSearchItemHoverOut(this,'" + gSearchResTitleClassName + "')\"";
	}
	else
	{
		strHoverEvents += " onmouseover=\"onSearchItemHover(this,'" + gSearchResTitleClassHover + "')\" ";
		strHoverEvents += " onmouseout=\"onSearchItemHoverOut(this,'" + gSearchResTitleClassName + "')\"";
	}
	var anchorStartTag = "<a class='"+ NOLINKANCHORCLASS + "' href=\"" + a_strUrl + "\" >";
	var divStartTag = "<div class='" + gSearchResTitleClassName + "' " + strTitleStyle + strHoverEvents + ">";
	var title = anchorStartTag + divStartTag + _textToHtml_nonbsp(a_strTitle) + "</div></a>";
	
	var html = gSearchResultHtml.replace(LINK_NAME_MACRO, title);
	if(a_sSummary.length > 0)
	{
		var summary = _textToHtml_nonbsp(lTrim(a_sSummary));
		html = html.replace(SEARCH_SUMMARY_MACRO, summary);
	}
	else
		html = html.replace(SEARCH_SUMMARY_MACRO, "");
	if(a_strUrl.length > 2 && a_strUrl.charAt(0) == '.' && a_strUrl.charAt(1) == '/')
		a_strUrl = a_strUrl.substring(2, a_strUrl.length);
	var pos = a_strUrl.indexOf("?");
	if(pos != -1)
		a_strUrl = a_strUrl.substring(0, pos);
	html = html.replace(SEARCH_URL_MACRO, _htmlToText(a_strUrl));
	var strStyle ="";
	if(gSearchResStyle != "")
		strStyle = "style=\"" + gSearchResStyle + "\"";
	var	strOutput = "<div class='" + gSearchResClassName + "'" + strStyle + ">" + html + "</div>";
	return strOutput;
}
function setResultsStringHTML(results_no, searchStr)
{
	var msg = gResultsFoundString;
	msg = msg.replace("%1", results_no);
	msg = msg.replace("%2", "\'" + searchStr + "\'");
	displayMsg(msg);
}
function displayMsg(msg)
{
	/*var spanNode = document.getElementById(gSearchMsgId);
	if(spanNode != null && spanNode != 'undefined')
		spanNode.innerHTML = msg;*/
}
function onSearchItemHover(node, className)
{
	if(className != "")
		node.className = className;
}
function onSearchItemHoverOut(node, className)
{
	if(className != "")
		node.className = className;
}