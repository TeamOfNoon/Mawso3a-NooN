


var regexSymbolWithCombiningMarks = XRegExp('[\\p{L}]', "ig");

function countSymbolsIgnoringCombiningMarks(string) {
    // Remove any combining marks, leaving only the symbols they belong to:
    var stripped = string.replace(regexSymbolWithCombiningMarks, function($0, symbol, combiningMarks) {
        return symbol;
    });
    // Account for astral symbols / surrogates, just like we did before:
    return stripped.length;
}






// var o = $('<div></div>');
//var regexSymbolWithCombiningMarks = XRegExp('\\p{Mn}', "ig");
/*var regexSymbolWithCombiningMarks = XRegExp('[\\p{L}]', "ig");

function countSymbolsIgnoringCombiningMarks(string) {
    // Remove any combining marks, leaving only the symbols they belong to:
   // var stripped = string.replace(regexSymbolWithCombiningMarks,"").replace(/href=".+"/g,"")
    //stripped = strip_tags(stripped);
    var stripped = string.replace(/href=".+"/g,"").replace(regexSymbolWithCombiningMarks, function($0, symbol, combiningMarks) {
        return symbol;
    });


//console.log(calculateLines(stripped));
//stripped = get_tex_size(stripped, "30px Arial")


//return elem_width(stripped,null,null);
//return strip_And_Normlize(stripped).length;
//return stripped['width'];

//return $(stripped).textWidth();
return stripped.length;


}*/



$.fn.textWidth = function (text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

function get_tex_size(txt, font) {
    this.element = document.createElement('canvas');
    this.context = this.element.getContext("2d");
    this.context.font = font;
    var tsize = {'width':this.context.measureText(txt).width, 'height':parseInt(this.context.font)};
    return tsize;
}
//var tsize = get_tex_size(stripped, "30px Arial")

//alert('Calculated width ' + tsize['width'] + '; Calculated height ' + tsize['height']);


var longestH = 0;
var longest = "";


function test_item_hight(longest) {

    document.getElementById('searchResList').innerHTML = '<div  class="vscroll-wrapper" id="vscroll-wrapper" data-columns="1">' +
        '<div class="wSearchResultItem" style="">' +
        longest +
        '</div>' +
        '</div>';



    longestH = (getAbsoluteHeight(document.getElementById('searchResList')))+15;
    document.getElementById('searchResList').innerHTML = "";

}






  var  longestH2 = 0;
   var  longest2 = "";

function test_item_hight2(longest) {

  document.getElementById('snptviewcon').innerHTML = '<div class="vscroll-wrapper" id="vscroll-wrapper" data-columns="1">' +
        '<div class="snpitResultItem">' +
        longest +
        '</div>' +
        '</div>';


    document.getElementById("snptviewcon").style.display = "block";
    longestH2 = (getAbsoluteHeight(document.getElementById('snptviewcon')))+50;

    document.getElementById('snptviewcon').innerHTML = "";

}



function generate_search_results(a_QueryResult, strParams, i, g_nMaxResult, g_CurPage, bShowAll,scan_width) {
    

    
    

    var maxlen = 0;
    var maxtext = "";
    var lgth = 0;
    var count = 0;

    var array = new Array();

    for (; (i < a_QueryResult.aTopics.length); i++) {


       if (bShowAll == false && i >= (g_CurPage * g_nMaxResult)) {

            break;
        }


        var szTopicURL = a_QueryResult.aTopics[i].strUrl;
 
if (!_isRemoteUrl(szTopicURL)) {
            szTopicURL += strParams;
}
 
	  
var a_strUrl = szTopicURL;
var myString = a_strUrl;
var myRegexp = new RegExp("redirect\\.php\\?f=(.*?)\\&p=(.*?)(\\?)(.*)", "g");
match_redirect = myRegexp.exec(myString);




if(match_redirect != null) {
  
  
var numberString = match_redirect[2];
var numberToRemove = match_redirect[1]; // The substring to be removed

var lastIndex = numberString.lastIndexOf(numberToRemove);
var modifiedNumberString = lastIndex !== -1 ? numberString.slice(0, lastIndex) : numberString; 
  
 match_redirect[2] = modifiedNumberString; 
  
//match_redirect[2] = match_redirect[2].slice(0, -match_redirect[1].length);

a_strUrl = "admin/redirect.php?f="+match_redirect[1]+"&p="+match_redirect[2];
szTopicURL  = "admin/redirect.php?f="+match_redirect[1]+"&p="+match_redirect[2]+"&"+match_redirect[4];
//szTopicURL += strParams;

}
else{
        if(a_strUrl.length > 2 && a_strUrl.charAt(0) == '.' && a_strUrl.charAt(1) == '/')
		a_strUrl = a_strUrl.substring(2, a_strUrl.length);
	var pos = a_strUrl.indexOf("?");
	if(pos != -1)
		a_strUrl = a_strUrl.substring(0, pos);

}
		
	
        array[count] = '<div class="wSearchResultItemSmallScr">'+
	        '<div id= "hit_'+(count+1)+'" class="hit"><a  onclick="go_iframe(event,this,\'search_links_no_snipit\')" href=\"' + szTopicURL + '&hit=null\">'+a_QueryResult.aTopics[i].nIndex+" "+a_QueryResult.aTopics[i].strTitle+'</a></div>'+
	        '<span class="wSearchURLSmallScr">'+a_strUrl+'</span>'+
		'<br>'+
		'<span class="wSearchContextSmallScr">'+a_QueryResult.aTopics[i].strSummary+'</span>'+
		'</div><hr>';




        if ((i + 1) == a_QueryResult.length) {
            //console.log(i+" "+a_QueryResultArray.length);

           //$("#end").show();
            end = true;

        } else {
           // $("#end").hide();
            end = false;

        }



       if(scan_width == true){
        maxtext = (a_QueryResult.aTopics[i].strTitle + a_QueryResult.aTopics[i].strSummary + a_QueryResult.aTopics[i].nIndex);
        //maxtext = strip_And_Normlize(maxtext);
        //unicodeLength(maxtext);
        if (countSymbolsIgnoringCombiningMarks(maxtext) > lgth) {
            var lgth = countSymbolsIgnoringCombiningMarks(maxtext);
            longest = array[count];
        }
       }       

        count++;
    }

   // console.log(longest);

    return array;
}







 

function createArrayOfNumbers2(total, array_spit,scan_width) {

    var array = new Array(total);
    var lgth = 0;
    var i = 0;
    var maxtext = "";

    for (; i < total; i++) {



        array[i] = '<div  id= "'+(i + 1)+'" class = "itemconspit"><div></div>[' + (i + 1) + '] ...' + array_spit[i] + '...' + '<div></div></div>';
        maxtext = (array[i]);


   if(scan_width == true){
        if (countSymbolsIgnoringCombiningMarks(maxtext) > lgth) {
            var lgth = countSymbolsIgnoringCombiningMarks(maxtext);
            longest2 = array[i];
        }
   }

    }

//longest2 = array[7];
 // console.log(longest2);

    return array;

};





var data = true;
var myData;
var myData2;
var curr_index = null;
var current_select = null;
var conoffset = null;
var conoffset2 = null;
var disable_spnit = false;

function lunch_vlist3(a_QueryResult, _container, _scrollParent,scan_width) {




    myData2 = createArrayOfNumbers2(a_QueryResult.length, a_QueryResult,scan_width);


    conoffset2 = document.getElementById(_container).offsetTop;
    test_item_hight2(longest2);



    var createTemplateFunction = function(item, index, startIndex, endIndex) {

        // Create your HTML template of each record, it could be anything, an img, li, div etc.
        var div = document.createElement('div');
        div.className = 'snpitResultItem';

        div.style.minHeight = longestH2 + 'px';
        div.innerHTML = item;

        return div;

    };


    options = {


        container: "#" + _container,
        scrollParent: "#" + _scrollParent,
        data: myData2,
        buffer: 2,
        smartBuffer: false,
        itemHeight: longestH2,
        createItem: createTemplateFunction,
        responsive: false,
        scrollOffset: 100



    };

    disable_spnit = true;
  
  
  
    window.myScroll2 = new VScroll(options);




}







var _i;
var _g_nMaxResult;
var _g_CurPage;
var _bShowAll;
var _a_QueryResult;
var _strParams;

function lunch_vlist2(a_QueryResult, strParams, _container, _scrollParent, i, g_nMaxResult, g_CurPage, bShowAll,scan_width) {

   


    _i = i;
    _g_nMaxResult = g_nMaxResult;
    _g_CurPage = g_CurPage;
    _bShowAll = bShowAll;



        myData = generate_search_results(a_QueryResult, strParams, i, g_nMaxResult, g_CurPage, bShowAll,scan_width);


        conoffset = document.getElementById(_container).offsetTop;
 

    test_item_hight(longest);


    // Template function must return HTML element



    var createTemplateFunction = function(item, index, startIndex, endIndex) {

        // Create your HTML template of each record, it could be anything, an img, li, div etc.
        var div = document.createElement('div');
        div.className = 'wSearchResultItem';
        div.style.minHeight = longestH + 'px';
        div.innerHTML = item;

        return div;

    };

  
    // console.log(_container); 
    options = {
        container: "#" + _container,
        scrollParent: "#" + _scrollParent,
        data: myData,
        buffer: 2,
        smartBuffer: false,
        itemHeight: longestH, // which's the default
        createItem: createTemplateFunction,
        responsive: false,
        scrollOffset: conoffset
        //scrollOffset:230

    };
    //console.log(myData);


  
        window.myScroll = new VScroll(options);
   
}






