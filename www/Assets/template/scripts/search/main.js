// Main search logic
var context = new HuginContext();
var goOdinHunter = null;
theXmlReader.nSliceResults = true;
function registListener(a_Context, a_this) {}

function loadFts_context() {
    var ftsProjDirArr = new Array;
    ftsProjDirArr[0] = gRootRelPath;
    
	
	ftsContextLoaded(ftsProjDirArr);
}

function ftsContextLoaded(ftsProjDirArr) {
    goOdinHunter = new HuginHunter();
    goOdinHunter.aProjPathes = new Array();
    
	var len = ftsProjDirArr.length;
    
	
	for (var i = 0; i < len; i++) {
        
		goOdinHunter.aProjPathes[i] = new Object();
        goOdinHunter.aProjPathes[i].strProjDir = ftsProjDirArr[i] + "/";
		//./whxdata/whfts.xml
		goOdinHunter.aProjPathes[i].strOdbPath = ftsProjDirArr[i] + "/" + gSearchDataFolderName + "/" + gFtsFileName;
    }
    context = new HuginContext();
    context.reset();
    context.push(goOdinHunter.init, goOdinHunter,
        registListener, this);
    context.resume();
    goOdinHunter.strQuery = gSearchString;
    Query();
}

function isValidType(obj) {
    return ((typeof(obj) != 'undefined') && (obj != null));
}

function Query() {
    if (goOdinHunter.bInited == false) {
        setTimeout("Query();", 10);
        return;
    }
    g_CurPage = 1;
    if (isValidType(context) && isValidType(context.aTasks)) {
        while (context.aTasks.length > 0) {
            context.resume();
        }
    }
    context = new HuginContext();
    context.reset();
    context.push(goOdinHunter.query, goOdinHunter,
        processHunterResult, null);
    context.resume();
}

function changeResultView(a_strHTML) {
    var resultDiv = getElement(gsResultDivID);
    if (resultDiv) {
        var resultDivParent = getParentNode(resultDiv);
        if (!resultDivParent)
            return;
        resultDiv.innerHTML = a_strHTML;
    }
}

var nNumPages = 0;

function displayTopics(a_QueryResult) {

    document.getElementById("searchMesg").style.display = "none";
	updateSearchPageSize();
	var sHTML = "";
    var sLine = "";
    var szSearchStrings = gSearchString_untsrip;
    var sHighlight = "CLRF=" + gsHLColorFront +
        ",CLRB=" + gsHLColorBackground + ",HL=";

    var itemsToSend = [];
    var i = 0;
  
	
	if (g_CurPage < 1)
        g_CurPage = 1;

    if (a_QueryResult != null) {
        var strParams = "?" + RHSEARCHSTR + "=" + encodeURIComponent(szSearchStrings) + "&" + RHSYNSTR + "=" + encodeURIComponent(gstrSyn);

        if (a_QueryResult.aTopics.length > 0)
            setResultsStringHTML(a_QueryResult.aTopics.length, _textToHtml_nonbsp(szSearchStrings));

        var bShowAll = false;
        if (g_nMaxResult == -1) {
            i = 0;
            bShowAll = true;
            nNumPages = 1;
        } else {
            i = (g_CurPage - 1) * g_nMaxResult;
           

		   var topicCheck = a_QueryResult.aTopics[i];

if (topicCheck && topicCheck.fake)
{
    loadMissingSearchPage(i);
    return;
}
			
			nNumPages = Math.ceil(a_QueryResult.aTopics.length / g_nMaxResult);
        }

        for (; (i < a_QueryResult.aTopics.length); i++) {
            if (bShowAll == false && i >= (g_CurPage * g_nMaxResult))
                break;

            var topic = a_QueryResult.aTopics[i];
            var szTopicURL = topic.strUrl;
            if (!_isRemoteUrl(szTopicURL)) {
                szTopicURL += strParams;
            }

            sLine += writeResult(
                szTopicURL,
                topic.strTitle,
                topic.nIndex,
                topic.strSummary
            );

            itemsToSend.push({
                url: szTopicURL,
                title: topic.strTitle,
                index: topic.nIndex,
                summary: topic.strSummary
            });

            if (i & 0xF == 0) {
                sHTML += sLine;
                sLine = "";
            }
        }

        if (sLine.length > 0)
            sHTML += sLine;

        updateNavigationPagesBar(g_CurPage, nNumPages);
        updatePrevNextButtons(g_CurPage, nNumPages);
    }

    if (a_QueryResult.aTopics.length == 0)
        displayMsg(gsNoTopics);

    var iframe = document.getElementById("resultsFrame");
    iframe.style.height = "100%";
    var msg = {
        type: "batch_all",
        reset: true,
        page_dir: dir,
        searchStr: _textToHtml_nonbsp(Clean_SearchString),
        results_no: a_QueryResult.aTopics.length,
        result_info: gResultsFoundString,
        g_CurPage: g_CurPage,
        nNumPages: nNumPages,
        data: itemsToSend
    };
    sendToChild(msg, iframe);
    sendNavigationButtons();
    blockiframeValue = false;

    changeResultView("");
	
}

function scrollContentDiv(scrollTop) {
    var elem = document.getElementById('rh_scrollable_content');
    if (elem) {
        elem.scrollTop = scrollTop;
    }
}

function onClickPage(a_nPageNumber) {

    g_CurPage = a_nPageNumber;
    g_CurState = ECS_FOUND;
    updateResultView();
    scroll(0, 0);
    scrollContentDiv(0);

}

function displaySearchProgressBar(a_nProgress) {
    var pb = getElement('SearchProgressBar');
    var pt = getElement('SearchProgress');
    if (!pb || !pt) {
        var sHTML = "<CENTER><P ID='SearchProgress' CLASS='msg paddingLeft'>" + gsSearching + " " + a_nProgress + "%</P>\n" +
            "<DIV CLASS='pb_out'>\n" +
            "<P ID='SearchProgressBar' CLASS='msg' STYLE='width:" + a_nProgress + "%'></P>\n" +
            "</DIV>\n" +
            "<P CLASS='msg' ontouchstart='context.stop()' ONMOUSEDOWN='context.stop()'>" + gsCancel + "</P></CENTER>\n";
        changeResultView(sHTML);
    } else {
        setInnerHTML(pt, gsSearching + " " + a_nProgress + "%");
        pb.style.width = a_nProgress + "%";
    }
}

function displayErrorMsg(msg) {
    changeResultView("");
    updatePrevNextButtons(0, 0);
    displayMsg(msg);
}

function updateResultView() {
    if (g_CurState == ECS_SEARCHING)
        displaySearchProgressBar(goOdinHunter.nProgress);
    else if (g_CurState == ECS_FOUND)
        displayTopics(goOdinHunter.queryResult);
    else if (g_CurState == ECS_SEARCHFAILED)
        displayErrorMsg(context.strMsg);
    else if (g_CurState == ECS_FATALERROR)
        displayErrorMsg(context.strMsg);
    else if (g_CurState == ECS_CANCELED)
        displayErrorMsg(gsCanceled);
}

function processHunterResult(a_Context) {
    if (a_Context) {
        updateResultView();
        setTimeout("processHunterResult();", 1);
        return;
    }
    if (goOdinHunter == null)
        return;
    if (!goOdinHunter.bSucc) {
        g_CurState = ECS_SEARCHFAILED;
        updateResultView();
        return;
    }
    g_CurState = ECS_FOUND;
    updateResultView();
}

function getcheckedSearchType() {
    var selectedValue = null;
    var radios = document.getElementsByName('searchType');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedValue = radios[i].value;
            break;
        }
    }
    return selectedValue;
}

function updateSearchTypeRadio() {
    var radios = document.getElementsByName("searchType");
    var searchType = window.search_type || "all";
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = (radios[i].value === searchType);
    }
}

function updateSearchMatchRadio() {
    var radios = document.getElementsByName("searchMatch");
    var searchMatch = window.search_match;
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = (radios[i].value === searchMatch);
    }
}

function onSearchTypeChange(mode) {
    search_type = mode;
}

function onSearchMatchChange(mode) {
    search_match = mode;
}

function callbackAndSearchFlagRead(andFlag) {
    sendMulti({
        search_match: search_match,
        search_type: search_type
    });
    sendToChild({
        type: "hide_sheet",
        value: true
    }, iframe);
    if (!gSearchString) {
        gSearchString = GetSearchTextFromURL();
    }
    updateSearchTypeRadio();
    updateSearchMatchRadio();
    gSearchString_untsrip = gSearchString;
    Clean_SearchString = gSearchString
        .replace(/\|/g, " ")
        .replace(/"/g, "");
    gSearchString = strip_And_Normlize(
        gSearchString.replace(/\|/g, " ")
    );
    if (!gSearchString) {
        return;
    }
    if (search_type == "all") {
        gbANDSearch = 1;
    } else {
        gbANDSearch = 0;
    }
    if (search_type == "exact") {
        gSearchString = '"' + gSearchString + '"';
        if (window.highlightpartsearch) {
            gSearchString_untsrip =
                gSearchString_untsrip
                .replace(/\|/g, " ")
                .replace(/^"+|"+$/g, "");
        } else {
            gSearchString_untsrip =
                '"' +
                gSearchString_untsrip
                .replace(/\|/g, " ")
                .replace(/^"+|"+$/g, "") +
                '"';
        }
    } else {
        var a = gSearchString_untsrip
            .replace(/\||"/g, " ")
            .split(/\s+/);
        for (var i = 0; i < a.length; i++) {
            if (window.highlightpartsearch) {
                a[i] = a[i] ? '' + a[i] + '' : "";
            } else {
                a[i] = a[i] ? '"' + a[i] + '"' : "";
            }
        }
        gSearchString_untsrip = a
            .join("|")
            .replace(/\|+/g, "|")
            .replace(/^\||\|$/g, "");
    }
    setParams({
        rhsearch: gSearchString_untsrip
    }, true);
    var searchBox = document.getElementById("searchBox");
    if (searchBox) {
        searchBox.value = Clean_SearchString;
    }
    displaySearchProgressBar(0);
    loadFts_context();
}

// Add to main.js - Display partial results while loading
function displayPartialResults(a_PartialResult) {
    if (!a_PartialResult || a_PartialResult.aTopics.length === 0) {
        return;
    }
    
    var sHTML = "";
    var itemsToSend = [];
    
    // Show loading indicator with results count
    var sLoadingMsg = "Loading results... (" + a_PartialResult.aTopics.length + " found so far)";
    sHTML += "<div class='partial-results-info'>" + sLoadingMsg + "</div>";
    
    // Display found results
    for (var i = 0; i < a_PartialResult.aTopics.length; i++) {
        var topic = a_PartialResult.aTopics[i];
        var szTopicURL = topic.strUrl || "#";
        var strTitle = topic.strTitle || "Topic " + topic.nTopicId;
        
        sHTML += "<div class='search-result-item'>";
        sHTML += "<a href='" + szTopicURL + "'>" + strTitle + "</a>";
        sHTML += "</div>";
        
        itemsToSend.push({
            url: szTopicURL,
            title: strTitle,
            index: i + 1,
            summary: topic.strSummary || ""
        });
    }
    
    // Show "loading more" indicator if not complete
    if (!a_PartialResult.bIsComplete) {
        sHTML += "<div class='loading-more'>Loading more results...</div>";
    }
    
    changeResultView("");
}



function doSearch() {
    initSearchPage();
    callbackAndSearchFlagRead();
}

function quickSortResult() {
    var searchResults = getElement("searchResults");
    if (searchResults != null)
        quickSort(searchResults.childNodes, 0, searchResults.childNodes.length - 1, compByRank, swapTableNode);
}


function loadMissingSearchPage(start)
{
    theXmlReader.nStartIndex = start;

    context = new HuginContext();
    context.reset();

    context.push(
        goOdinHunter.queryPage,
        goOdinHunter,
        processHunterResult,
        null
    );

    context.resume();
	
	changeResultView("");
}