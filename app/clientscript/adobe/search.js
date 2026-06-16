var gSearchMsgId = "searchMsg";
//var gResultsFoundString = "%1 نتيجة (نتائج) تم العثور عليها لـ %2";
var gSearchResultHtml = "{%LINK_NAME%}\n				\n				<span  class=\"wSearchURLSmallScr\">{%SEARCH_URL%}</span> \n				 <br />\n				<span  class=\"wSearchContextSmallScr\">{%SEARCH_SUMMARY%}</span>";
var gSearchResClassName = "wSearchResultItemSmallScr";
var gSearchResTitleClassName = "wSearchResultTitleSmallScr";
var gSearchResTitleClassHover = "wSearchResultTitleHoverSmallScr";
var gSearchResStyle = "";
var gSearchResTitleStyle = "";
var gSearchPrevBtnId = "searchprev";
var gSearchNextBtnId = "searchnext";
var gsResultDivID="searchResList";
var gPageListBarID ="pageList";
var gPageLinkClass = "";
var gPageClass = "wSearchPageNumberSelected";
var gSearchDropdownID = "searchResCount";
var gSearchPageFilePath = "searchresults.htm";
var gSearchResultsCount = "5";
var gSearchHighlightControlID = "highlightsearch";
var gbHighLight = 1;
var gTextHighlightColor = "#ffffff";
var gbgHighlightColor = "#02b5bc";


gRootRelPath = ".";

var gPageRange = 0;
function initSearchCountDropDown()
{
	readSetting(RHSEARCHCOUNT, callbackSearchCountCookieRead);
	
	read_Setting(RHSEARCHCOUNT, "5","all");
}
function initHighlightSearchControl()
{
	readSetting(RHHIGHLIGHT, callbackHighlightCookieRead);
}
function callbackSearchCountCookieRead(maxValCookie)
{
	var val;
	if(maxValCookie != "")
		val = maxValCookie;
	else 
		val = gSearchResultsCount;
	var dropdown = getElement(gSearchDropdownID);
	
	
	val=read_Setting(RHSEARCHCOUNT, "5", "all");
	if(dropdown)
		dropdown.value = val;
	g_nMaxResult = val;
	

       if(style_type == "jq"){
	$('#searchResCount').val(read_Setting(RHSEARCHCOUNT, "5", "all")).selectmenu("refresh", true);
	}
	

}
function callbackHighlightCookieRead(highlightFlag)
{


	if(highlightFlag == TRUESTR)
		gbHighLight = 1;

	else if(highlightFlag == FALSESTR)
		gbHighLight = 0;

	var highlightElem = document.getElementById(gSearchHighlightControlID);
	if(highlightElem)
	{
		if(gbHighLight)
		{
			highlightElem.checked = true;
			saveSetting(RHHIGHLIGHT, TRUESTR, true);
		}
		else
		{
			highlightElem.checked = false;
			saveSetting(RHHIGHLIGHT, FALSESTR, true);
		}
		saveSetting(RHHIGHLIGHTTEXTCOLOR, gTextHighlightColor, true);
		saveSetting(RHHIGHLIGHTBGCOLOR, gbgHighlightColor, true);
	}
}
function onToggleHighlightSearch()
{
	if(gbHighLight)
	{
		gbHighLight = 0;
		saveSetting(RHHIGHLIGHT, FALSESTR, true);
	}
	else
	{
		gbHighLight = 1;
		saveSetting(RHHIGHLIGHT, TRUESTR, true);
	}
}
function onMaxPageCountChange(maxVal)

{
	g_nMaxResult = maxVal;
	if(gSearchString != "")
		onClickPage(null, 1);
	//saveSetting(RHSEARCHCOUNT, maxVal, true);
	
	save_Setting(RHSEARCHCOUNT, maxVal, "all");
	

	$('.sheet-backdrop').removeClass("backdrop-in");
      $('.sheet-modal').addClass("modal-out");
    
   setTimeout(function() {
                $('.sheet-modal').removeClass("modal-out");
				$('.sheet-modal').removeClass("modal-in");
            	$('.sheet-modal').hide();
          }, 1000);
	
}
function onClickPrevNext( btn, a_nPageNumber )
{    
   // btn.stopPropagation();


   	//console.log(is_grabbing);

   if(is_grabbing  == true) return false;
	
	

	onClickPage(a_nPageNumber);	
	

            	//$("#pageList").scrollCenter(".wSearchPageNumberSelected", 0);
          
}






function updateNavigationPagesBar(nCurPage, nNumPages)
{
	
		
	
	var pageListBarDiv = document.getElementById(gPageListBarID);
	if(pageListBarDiv == null || pageListBarDiv == 'undefined'){
		return;
	}
	
	
		
	
	if(nNumPages == 1) {
	
        $("#page_num").hide();
        $("#end_ResList").show();
        
        
     
         if(style_type == "jq"){
		//search_view_hight = 165;
	
		search_view_hight =10+$("#foot").outerHeight()+$("#head_jq").outerHeight();
	}
	else if(style_type == "adobe"){


	       search_view_hight = 10+$("#foot").outerHeight()+$("#head").outerHeight();
	}
	else if(style_type == "ios"){

	       search_view_hight = 13+$(".toolbar").outerHeight()+$(".navbar").outerHeight();
		   
		   
		 
	}
	
	else if(style_type == "andro"){


	       search_view_hight = 13+$(".toolbar").outerHeight()+$(".navbar").outerHeight();
		   
		     
		   
	}
	
	
if(typeof is_ios_app != 'undefined') {
if(read_Setting('mode_type', "native", 'all')== "native"){
		       
			search_view_hight = 0;

}	
}

	



        $(window).trigger('resize')
        
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
	
	//pageListBarDiv.innerHTML = '';
	//for(var i=1; i<=nNumPages; i++)
	//for(var i=startPage; i<=endPage; i++)
	//for(var i=nNumPages; i>=1; i--)


if(read_Setting("lang", "ar", "all")=="ar"){



for(var i=nNumPages; i>=1; i--)
	{
		if(i == nCurPage)
			//sHTML += "<a class='" + gPageClass + "' style=''>" + i.toString() + "</a>";
			sHTML += "<a href= 'javascript: void(0)' class='" + gPageClass + "' style=''>" + i.toString() + "</a>";
		
		else
			sHTML += "<a  href= 'javascript: void(0)' onclick=\"onClickPrevNext(event,'" + i.toString() + "')\" >" + i.toString() + "</a>";
	}


}

else{
 

for(var i=1; i<=nNumPages; i++)

	{
		if(i == nCurPage)
			//sHTML += "<a class='" + gPageClass + "' style=''>" + i.toString() + "</a>";
			sHTML += "<a  href= 'javascript: void(0)'class='" + gPageClass + "' style=''>" + i.toString() + "</a>";
		
		else
sHTML += "<a href= 'javascript: void(0)'  onclick=\"onClickPrevNext(event,'" + i.toString() + "')\" >" + i.toString() + "</a>";          
	}
}


	pageListBarDiv.innerHTML = sHTML;
	
	
	if(nNumPages>0){
	

	
	
	  
	
	
	$("#page_num").hide().show(0);
	
	

	
	    //setTimeout(function() {

            	$(".m_con").scrollCenter(".wSearchPageNumberSelected", 0);
          //  }, 0);

       
      
	
	if(style_type == "jq"){
		//search_view_hight = 165;
	
		search_view_hight = 60+$("#page_num").outerHeight()+$("#foot").outerHeight();+$("#head_jq").outerHeight();
		
	}
	
	
	else if(style_type == "adobe"){


	       search_view_hight = 8+$("#page_num").outerHeight()+$("#foot").outerHeight()+$("#head").outerHeight();
		   
		     
		   
	}
	else if(style_type == "ios"){


	       search_view_hight = 13+$("#page_num").height()+$(".toolbar").outerHeight()+$(".navbar").outerHeight();
		   
		     
		 
	}
	
	else if(style_type == "andro"){


	       search_view_hight = 13+$("#page_num").height()+$(".toolbar").outerHeight()+$(".navbar").outerHeight();
		   
	
		   
	}
	
if(typeof is_ios_app != 'undefined') {
if(read_Setting('mode_type', "native", 'all')== "native"){
		       
			search_view_hight = $("#page_num").height();

}
else{
	     
		 if(style_type == "jq"){
		//search_view_hight = 165;
		
		search_view_hight = $("#page_num").height()+$("#foot").height()+$("#head_jq").height();
	}
	else if(style_type == "adobe"){


	       search_view_hight = $("#page_num").height()+$("#foot").outerHeight()+$("#head").outerHeight();
	}
	else if(style_type == "ios"){


	       search_view_hight = $("#page_num").height()+$(".toolbar").outerHeight()+$(".navbar").outerHeight();
		   
		     
		  
	}
	
	else if(style_type == "andro"){


	       search_view_hight = $("#page_num").height()+$(".toolbar").outerHeight()+$(".navbar").outerHeight();
		   
		     
		   
	}
	
		 
		 
		 
	
}	
}

	
	
	
	
	 setTimeout(function() {

            	$(".m_con").scrollCenter(".wSearchPageNumberSelected", 0);
           }, 0);
	
	$(window).trigger('resize');
	}
	
        if(nNumPages==nCurPage){
          $("#end_ResList").show();
        }
        else{
             $("#end_ResList").hide();
        }
	
}
function updatePrevNextButtons(nCurPage, nNumPages)
{

  
  
	var prevBtn = document.getElementById(gSearchPrevBtnId);
	var nextBtn = document.getElementById(gSearchNextBtnId);
	var isPrevBtn = false;
	var isNextBtn = false;
	if(prevBtn != null && prevBtn != 'undefined')
		isPrevBtn = true;
	if(nextBtn != null && nextBtn != 'undefined')
		isNextBtn = true;
	if (nNumPages > 1)
	{
		if(nCurPage > 1)
		{
			if(isPrevBtn)
			{
				//prevBtn.style.width = "2.9em";
				prevBtn.style.display = "";
				//prevBtn.onclick = function(){onClickPrevNext(prevBtn, (parseInt(nCurPage)-1).toString());};
				prevBtn.onclick = function(){onClickPrevNext(prevBtn, (1).toString());};
			}
		}
		else if(isPrevBtn)
				prevBtn.style.display = "none";
				//prevBtn.style.width = "0.1px";
		if(nCurPage < nNumPages)
		{
			if(isNextBtn)
			{
				//nextBtn.style.width = "2.9em";
				nextBtn.style.display = "";
				//nextBtn.onclick = function(){onClickPrevNext(nextBtn, (parseInt(nCurPage)+1).toString());};
				nextBtn.onclick = function(){onClickPrevNext(nextBtn, (nNumPages).toString());};
			}
		}
		else if(isNextBtn)
				nextBtn.style.display = "none";
				//nextBtn.style.width = "0.1px";
	}
	else
	{
		if(isPrevBtn)

			prevBtn.style.display = "none";
		if(isNextBtn)
			nextBtn.style.display = "none";
	}
}



function initSearchPage()
{
	initSearchCountDropDown();
	initHighlightSearchControl();
	updatePrevNextButtons(0,0);
}

function writeResult( count,a_strUrl, a_strTitle, a_nIndex, a_sSummary )
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
	
	
	var url_a_strUrl = a_strUrl;

	var myString = url_a_strUrl;
var myRegexp = new RegExp("redirect\\.php\\?f=(.*?)\\&p=(.*?)(\\?)(.*)", "g");
match_redirect = myRegexp.exec(myString);
if(match_redirect != null) {
  // matched text: match[0]
  // match start: match.index
  // capturing group n: match[n]
  //alert(match[1])
  



var numberString = match_redirect[2];
var numberToRemove = match_redirect[1]; // The substring to be removed

var lastIndex = numberString.lastIndexOf(numberToRemove);
var modifiedNumberString = lastIndex !== -1 ? numberString.slice(0, lastIndex) : numberString;

//console.log(modifiedNumberString); // Output: "12345453"



match_redirect[2] = modifiedNumberString;

url_a_strUrl = "admin/redirect.php?f="+match_redirect[1]+"&p="+match_redirect[2]+"&"+match_redirect[4];


var anchorStartTag = "<div class ='hit' id= 'hit_"+(count+1)+"'><a onclick=\"go_iframe(event,this,'search_links_snipit');\" class='topic' href=\"" + url_a_strUrl + "&hit=null\" >";


}
else{
	var anchorStartTag = "<div class ='hit' id= 'hit_"+(count+1)+"'><a onclick=\"go_iframe(event,this,'search_links_snipit');\" class='topic' href=\"" + a_strUrl + "&hit=null\" >";
	
}
	

	

	var title = anchorStartTag +a_nIndex+" "+ _textToHtml_nonbsp(a_strTitle) + "</a></div>";
	
	var html = gSearchResultHtml.replace(LINK_NAME_MACRO, title);
	if(a_sSummary.length > 0)
	{
		var summary = _textToHtml_nonbsp(lTrim(a_sSummary));
		html = html.replace(SEARCH_SUMMARY_MACRO, summary);
	}
	else
		html = html.replace(SEARCH_SUMMARY_MACRO, "");
	
if(match_redirect != null) {
  a_strUrl = "admin/redirect.php?f="+match_redirect[1]+"&p="+match_redirect[2];
}
else{
	
	if(a_strUrl.length > 2 && a_strUrl.charAt(0) == '.' && a_strUrl.charAt(1) == '/')
		a_strUrl = a_strUrl.substring(2, a_strUrl.length);
	var pos = a_strUrl.indexOf("?");
	if(pos != -1)
		a_strUrl = a_strUrl.substring(0, pos);
}
	

	html = html.replace(SEARCH_URL_MACRO, _htmlToText(a_strUrl));
	var strStyle ="";
	
	var snippet = '<div id="wrapper_'+a_nIndex+'"><div class="img_wrapper"></div></div>';
 
 if(match_redirect != null) {
 
 
 
  url_a_strUrl = "admin/showpost.php?f="+match_redirect[1]+"&p="+match_redirect[2]+"&"+match_redirect[4];
  
  

}
var string  =  url_a_strUrl;
       (function(a_nIndex) {





  setTimeout(function(){ 
            
             $.get(string, function(data) {
                                //var words = getParameterByName("rhhlterm", string);
                                
                                var words =striped_Normlized;
                                var alteredURL = removeParam("hit", url_a_strUrl);

                               

                             
                   
                    
                     
                      if (document.getElementById("wrapper_" + a_nIndex)){
					var html_text = get_snpt(data, words, alteredURL, false, true, false);	
	       

 document.getElementById("wrapper_" + a_nIndex).innerHTML =html_text; 
						
					  }
                                   
                     
                     
                     
                           
                                
                                
              });
           
           
        }, 0); 



       })(a_nIndex);



	
	if(gSearchResStyle != "")
		strStyle = "style=\"" + gSearchResStyle + "\" ";
	var	strOutput = "<div class='" + gSearchResClassName + "' " + strStyle + " >" + html +snippet+"</div>";
	
	
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
	var spanNode = document.getElementById(gSearchMsgId);
	if(spanNode != null && spanNode != 'undefined')
		spanNode.innerHTML = msg;
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
