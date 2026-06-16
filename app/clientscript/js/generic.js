




function checkURL(relativeURL) {
  var xhr = new XMLHttpRequest();
  var currentPageURL = window.location.href;
  var currentFolderPath = currentPageURL.substring(0, currentPageURL.lastIndexOf('/'));
  var absoluteURL = currentFolderPath + '/' + relativeURL;
  xhr.open('HEAD', absoluteURL, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
	
      } 
	  else 
	  {		
        
      }
    }
  };
  xhr.send();
}




function isNullOrEmptyOrWhitespace(str) {
    return !str || !str.trim();
}





function select_domain() {
    index = read_Setting("domaintype", "0", "all");
    
	if (index == 0) {
        return "https://www.nasser-alyamani.org";
    }else if (index == 1) {
        
        return "https://*www*.nasser-alyamani*.org";
    }
	
	
	if (index == 2) {
        return "https://www.mahdialumma.com";
    }else if (index == 3) {
        
        return "https://*www*.mahdialumma*.com";
    }
    
    else if (index == 4) {
        return "https://www.mahdialumma.org";
    }else if (index == 5) {
        return "https://*www*.mahdialumma*.org";
    }
    
    else if (index == 6) {
        return "https://www.mahdialumma.net";
    }else if (index == 7) {
        return "https://*www*.mahdialumma*.net";
    }
    
    
    else if (index == 8) {
        return "https://www.albushra-islamia.com";
    }
    else if (index == 9) {
        return "https://*www*.albushra-islamia*.com";
    }
    
    
    
    else if (index == 10) {
        return "https://www.albushra-islamia.org";
    }else if (index == 11) {
        return "https://*www*.albushra-islamia*.org";
    }
    
    
    
    
    else if (index == 12) {
        return "https://www.albushra-islamia.net";
    }
    else if (index == 13) {
        return "https://*www*.albushra-islamia*.net";
    }
    
    
    
    
    
    
    else if (index == 14) {
        return "https://www.mahdi-alumma.com";
    }
    else if (index == 15) {
        return "https://*www*.mahdi-alumma*.com";
    }
    
    
    
    
    
    else if (index == 16) {
        return "https://www.mahdialumma.xyz";
    }
    else if (index == 17) {
        return "https://*www*.mahdialumma*.xyz";
    }
    
    
    
    
    else if (index == 18) {
        return "https://www.mahdialumma.online";
    }
    else if (index == 19) {
        return "https://*www*.mahdialumma*.online";
    }
    
   
    
    
    else if (index == 20) {
        return "https://www.bushra-islamia.com";
    }
    else if (index == 21) {
        return "https://*www*.bushra-islamia*.com";
    }
    
    
    
    else if (index == 22) {
        return "https://www.awaited-mahdi.com";
    }
    else if (index == 23) {
        return "https://*www*.awaited-mahdi*.com";
    }
    
    
}

function save_Setting(name, value, type) {
	if(type == "all") {
		if(typeof Androidd !== 'undefined') {
			Androidd.setSharP(name, value);
		} else
		if(typeof ios !== 'undefined') {
			alert("ios");
		} else
		if(localStorage) {
		
			localStorage.setItem(name, value);
		}
	} else if(type == "andro") {
		if(typeof Androidd !== 'undefined') {
			Androidd.setSharP(name, value);
		}
	} else if(type == "ios") {
		if(typeof ios !== 'undefined') {
			alert("ios");
		}
	} else if(type == "web") {
		if(localStorage) {
			
			localStorage.setItem(name, value);
		}
	}
}

function read_Setting(name, Default, type) {
	
	//console.log(name);
	if(type == "all") {
		if(typeof Androidd !== 'undefined') {
			return Androidd.getSharP(name, Default);
		} else
		if(typeof ios !== 'undefined') {
			return null;
		} else
		if(localStorage) {
		
			return localStorage.getItem(name) || Default;
		}
	} else if(type == "andro") {
		if(typeof Androidd !== 'undefined') {
			return Androidd.getSharP(name, Default);
		}
	} else if(type == "ios") {
		if(typeof ios !== 'undefined') {
			return null;
		}
	} else if(type == "web") {
		if(localStorage) {
		
			return localStorage.getItem(name) || Default;
		}
	}
}


 function getFormattedTime() {
        var today = new Date();
        var y = today.getFullYear();
        // JavaScript months are 0-based.
        var m = today.getMonth() + 1;
        var d = today.getDate();
        var h = today.getHours();
        var mi = today.getMinutes();
        var s = today.getSeconds();
        return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
    }



function unicodeToChar(text) {
   return text.replace(/\\u[\dA-F]{4}/gi, 
          function (match) {
               return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          });
}



 function elem_width(stripped,font,oo) {
  var f = font || '12px arial',o = $('<div></div>');
      o.text(stripped)
            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
            .appendTo($('body')),
      w = o.width();

  o.remove();

  return w;
}







function getSelectionTextAndContainerElement() {
	
	   var savedScrollTop = $("#iscroll").scrollTop();

	
        $('.page_nav,.posttop,#navbar,.padd.thread_title,.selectFontFamily,#selectFontFamily,.disableselect.dropdown,.hashtag,.select_all_butt,.footer.disableselect,.show_post_list,.show_post_link').hide();
		
	    var element = $(".randomnumber.random_hidden,.postnumber,.move.mup");
        element.hide();


    

		
		
	$('div,img').each(function() {
  var element = $(this);

  // Check if the element is visible
  if (element.is(':visible')) {
    // Remove the class if visible
    element.removeClass("all_hidden");
  } else {
    // Add the class if hidden
    element.addClass("all_hidden");
  }
});
		
		
		var text = "",
		html="",lement
            containerElement = null;
        if (typeof window.getSelection != "undefined") {

            var sel = window.getSelection();
            if (sel.rangeCount) {
                var node = sel.getRangeAt(0).commonAncestorContainer;
                containerElement = node.nodeType == 1 ? node : node.parentNode;
                text = sel.toString();
             
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
				
				//console.log(sel.getRangeAt(i).cloneContents());
            }
           
			
			html = container.innerHTML;
                   
            }
        } else if (typeof document.selection != "undefined" &&
            document.selection.type != "Control") {
            var textRange = document.selection.createRange();
            containerElement = textRange.parentElement();
            text = textRange.text;
            
			
			html = textRange.htmlText;
        }
        
		$('.page_nav,.posttop,#navbar,.padd.thread_title,.selectFontFamily,#selectFontFamily,.disableselect.dropdown,.hashtag,.select_all_butt,.footer.disableselect,.show_post_list,.show_post_link').css("display", "");
		
           element.css("display", "");
        
$("#iscroll").scrollTop(savedScrollTop);


var containsWrapper = $($.parseHTML(html)).find('#navbar').length > 0;

if (containsWrapper) {
	
    whol_text_selected  = true;
}
				
			
		return {
            html: html,text: text,containerElement: containerElement
        };
    
	
	
	
	}

function htmlToText(html) {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
}



function GetInnerText(el) {
    var sel, range, innerText = "";
    if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
        range = document.body.createTextRange();
        range.moveToElementText(el);
        innerText = range.text;
    } else if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        sel = window.getSelection();
        sel.selectAllChildren(el);
        innerText = "" + sel;
        sel.removeAllRanges();
    }
    return innerText;
}


function randomString(hh) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = hh;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}
var walk_the_DOM = function walk(node, func) {
//func(node);
node = node.lastChild


while (node && !stop) {      
walk(node, func);	

if(func(node)== true){
stop = true;
}
	
  node = node.previousSibling; 
	
}
};

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}



   function clear_slection() {
        if (window.getSelection) {
            if (window.getSelection().empty) { // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) { // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) { // IE?
            document.selection.empty();
        }
    }


 function isEmptyOrSpaces(value) {
        
       
        if (value== null) return true;

    return value.replace(/\s/g, '').length == 0;
    }


function islocal(link) {
	var regExp = new RegExp("//" + location.host + "($|/)");
	var href = link;
	var isLocal = (href.substring(0, 4) === "http") ? regExp.test(href) : true;
	return isLocal;
}

function canonicalize(url) {
	var div = document.createElement('div');
	div.innerHTML = "<a></a>";
	div.firstChild.href = url; // Ensures that the href is properly escaped
	div.innerHTML = div.innerHTML; // Run the current innerHTML back through the parser
	var fullpath = div.firstChild.href;
	div = null;
	return fullpath;
}

function isHTML(str) {
	return /\<a.*\>.*\<\/a\>/i.test(str);
}

function strip_tags(input, allowed) {
	allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
		commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
		return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	});
}

function stripScripts(body) {
	return body.replace(/((<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)|<style[^>]*>.+?<\/style>|<title[^>]*>.+?<\/title>)/ig, '');
}

function remove_htmlcomment(body) {
	var stringWithoutComments = body.replace(/<!--[\s\S]*?-->/g, '');
	//console.log(stringWithoutComments);	
	return stringWithoutComments;
}
var getCleanUrl = function(url) {
	return url.replace(/#.*$/, '').replace(/\?.*$/, '');
};

function isNullOrWhitespace(input) {
	if(typeof input === 'undefined' || input == null) return true;
	return input.replace(/\s/g, '').length < 1;
}



function addParameterToURL(url,param){
    _url = url;
    _url += (_url.split('?')[1] ? '&':'?') + param;
    return _url;
}
function getParameterByName(name, url) {
	if(!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if(!results) return null;
	if(!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}








var mobiletrue =true;

function _isMobile(){
                // if we want a more complete list use this: http://detectmobilebrowsers.com/
                // str.test() is more efficent than str.match()
                // remember str.test is case sensitive
                var check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
                
}






function removeParam(parameter,url) {
    
    url = url.replace(/\\%23thread_title/g, '#thread_title');
	
	url = url
    .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
    .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
	url = url.replace(/\\#thread_title/g, '%23thread_title');

return url ;
    
    
    
}



var d;
var x;
var pos;


function get_scroll_pos_and_width(elem){

var scrollWidth = elem.offsetWidth - elem.clientWidth;

if($('.check_dir').length == 0) {
 d = $("<div></div>");
d.css("overflow-y","scroll");
d.append('<p class ="check_dir"/>');

$('#wrapper').append(d);
x = d.find('p').position().left
d.css('display','none');


}

pos = x < 3 ? "right" : "left";
//console.log(pos);

if(elem.scrollHeight > elem.clientHeight){

if($('#wrapper > #pagebody').length > 0) {





return [pos, scrollWidth];


		
}		


if($('#snptview > #snptviewcon').length > 0) {



return [pos, scrollWidth];



}
}
else{
scrollWidth = 0;
return ["all", scrollWidth];

}

}





/*
function removeParam(name, _url) {
	var reg = new RegExp("((&)" + name + "=([^&]*))", "g");
	//var reg2 = new RegExp("((\\?)" + name + "=([^&]*))", "g");
	var url = _url.replace(reg, '');
	
	
	if(url.indexOf('&') != -1) {
	
	}
	else{
	url = _url.replace("\\?", '');
	}
	
	//alert(url);
	return url;
}*/







function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']);



    return Math.ceil(el.offsetHeight + margin);
}





function supportsLookbehind() {
	try {
		new RegExp("(?<=)");
		return true;
	} catch (err) {
		return false;
	}
}

function setIFrameSrc(idFrame, url) {
	var originalFrame = document.getElementById(idFrame);
	var newFrame = document.createElement("iframe");
	newFrame.id = originalFrame.getAttribute("id");
	newFrame.name = originalFrame.getAttribute("name");
	newFrame.width = originalFrame.getAttribute("width");
	newFrame.height = originalFrame.getAttribute("height");
	newFrame.src = url;
	var parent = originalFrame.parentNode;
	parent.replaceChild(newFrame, originalFrame);
}

function RemoveLastDirectoryPartOf(url) {
	return url.substring(0, url.lastIndexOf('/'));
}

function indexOf(arr, val) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == val) return i;
	}
	return -1;
}
/*

 function filter (arr,func, thisArg) {
	if ( ! ((typeof func === 'Function' || typeof func === 'function') && arr) )
		throw new TypeError();

	var len = arr.length >>> 0,
		res = new Array(len), // preallocate array
		t = arr, c = 0, i = -1;
	if (thisArg === undefined)
	  while (++i !== len)
		// checks to see if the key was set
		if (i in arr)
		  if (func(t[i], i, t))
			res[c++] = t[i];
	else
	  while (++i !== len)
		// checks to see if the key was set
		if (i in arr)
		  if (func.call(thisArg, t[i], i, t))
			res[c++] = t[i];

	res.length = c; // shrink down array to proper size
	return res;
  };

*/
function filter(arr, filterFunc) {
	var filterArr = []; // empty array        
	// loop though array    
	for(var i = 0; i < arr.length; i++) {
		var result = filterFunc(arr[i], i, arr);
		// push the current element if result is true        
		if(result) {
			filterArr.push(arr[i]);
		}
	}
	return filterArr;
}


function fixImage(element) {
	var supported = /MSIE (5\.5|[6])/.test(navigator.userAgent) && navigator.platform == 'Win32';
	var realSrc, realHeight, realWidth;
	var blankSrc = './clientscript/css/pngbehavior/blank.gif';
	var IS_PNG = /\.png$/i;
	if(supported) {
		// set the image to something different
		if(IS_PNG.test(element.src)) {
			if(!$(element).is(":visible")) return false
			if($(element).hasClass("fixed_png")) return false;
			$(element).addClass("fixed_png");
			// element.runtimeStyle.filter = '';
			// fixable PNG
			realSrc = element.src;
			realWidth = element.width;
			realHeight = element.height;
			element.src = blankSrc;
			element.style.width = realWidth + 'px';
			element.style.height = realHeight + 'px';
			element.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + encodeURI(realSrc) + "',sizingMethod='scale')";
		} else {
			// ordinary image - make sure the fix is removed
			if(realSrc) {
				realSrc = null;
				element.runtimeStyle.filter = '';
			}
		}
	}
}



function containsClass(ele, className) {
  var classes = elem.className.split(' ');
  return classes.indexOf(className) !== -1;
}


var stop = false;       
		


function getDef(elem, dir) {

stop =false;


function walkDOM(node, callback) {
   if(stop == false){
	   
 
  if (node.className === "post_title") {
   
   node = node.nextSibling;
  }
  if (node.className === "show_post_link") {
   
   node = node.nextSibling;
  }
  
  if (node.className === "show_post_list") {
   
   node = node.nextSibling;
  }

  callback(node); // Process the current node

    var child 
  
   if(dir=="+"){
       child = node.firstChild;
     }
     else{
     child = node.lastChild; 
     }
  
  /*while (child) {

		walkDOM(child, callback); 
		child = child.nextSibling;
	
	// Recursively walk through each child node
    
  }*/
  
   while (child) {
        walkDOM(child, callback); 
          if(dir=="+"){
            child = child.nextSibling; 
          }
          else{
           child = child.previousSibling; 
          }
    }
}
}





walkDOM(elem, function(node) {
  
if (node.tagName == "BR") {
           $(node).css('display', 'none');
 
}
  
  
if (node.nodeType == 3) {
if (isNullOrWhitespace(node.nodeValue)){


node.nodeValue ="";
}



if (node.nodeValue.replace(/^\s+|\s+$/g, '').replace(/(\r\n\t|\n|\r\t)/gm, "").length !="") {
	
  stop =true;
  //return false;
}
}
  
});

}






function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
    str = str.replace(/\s/g, '');   
    return decodeURIComponent(escape(window.atob( str )));
}





function replaceUrlParam(url, paramName, paramValue)
{
    if (paramValue == null) {
        paramValue = '';
    }
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
    if (url.search(pattern)>=0) {
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    url = url.replace(/[?#]$/,'');
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
}



function addEvent(element, callback, presstype) {

    if (element) {
     //element.addEventListener("touchstart", callback, false);
	element.addEventListener(presstype, callback, false);
    }

}

function hasClass(target, className) {
  if(!target){
    return false;
  }
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function _removeClasses(els, class_name) {
    for (var i = 0; i < els.length; i++) {
        els[i].classList.remove(class_name)
    }
}

function strip_And_Normlize(value) {
	hitcount = 0;
	var hh = value;
	var ff = hh;
	//alert(bool2+"bool2");
	//وَمَا يُلَقَّٮٰهَآ
	//ٰ
	
	
	hh = hh.replace(XRegExp("ٰ", 'gmi'), "").replace(XRegExp("ـٰ", 'gmi'), "ا").replace(XRegExp("ی", 'gmi'), "ي").replace(XRegExp("ٮٰ", 'gmi'), "ا").replace(XRegExp("[\\p{Mn}\\u0640\\u200C\\u200e\\u06e5]", 'gmi'), '').replace(XRegExp("[\\p{S}\\p{P}\\u06E9\\u06DE{}\"'()\\uFD3F\\uFD3E]", 'gmi'), ' ').replace(/\s\s+/gmi, ' ').replace(XRegExp("^\\s+|\\s+$", 'gmi'), "").replace(XRegExp("[أاإآٲٳٱ]", 'gmi'), "ا").replace(XRegExp("ة", 'gmi'), "ه").replace(XRegExp("ؤ", 'gmi'), "و").replace(XRegExp("ئ", 'gmi'), "ى").replace(XRegExp("[\u200F]", 'gmi'), "").replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(m) {
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
	return hh;
}

function remove_stopWrods(a_strQuery) {
	if(a_strQuery) {
		var array = JSON.parse(stop_words_array);
		var a_strQuery_array = a_strQuery.split(" ");
		var temp;
		for(var i = 0; i < a_strQuery_array.length; i++) {
			temp = a_strQuery_array[i].replace(/^فف/, 'ف');
			temp = temp.replace(/^ف/, '');
			temp = temp.replace(/^و/, '');
			temp = temp.replace(/^ك/, '');
			var begin = 0;
			var end = array.length;
			var mid = Math.floor((end - begin) / 2);
			var found = false;
			while(mid > 0) {
				mid = mid + begin;
				var term = array[mid];
				if(temp < term) {
					end = mid;
				} else if(temp > term) {
					begin = mid;
				} else {
					found = true;
					break;
				}
				mid = Math.floor((end - begin) / 2);
			}
			if(((end - begin) == 1) && (temp == array[mid])) {
				mid = end;
				a_strQuery_array.splice(i, 1);
				i--;
			} else if(found) {
				a_strQuery_array.splice(i, 1);
				i--;
			}
		}
		return a_strQuery_array.join(" ");
	}
}
/*******************
 * Returns a string in which each accented and lower-case character from the
 * input is replaced with the respective upper-case base character in the A-Z
 * range (e.g. ä->A, è->E, å->A, ë->E). Hence, the return value for
 * "séléction" is "SELECTION".
 *******************/
var charToAccentedCharClassMap = {
	//number
	"0": '(?:0|\u0660)',
	"1": '(?:1|\u0661)',
	"2": '(?:2|\u0662)',
	"3": '(?:3|\u0663)',
	"4": '(?:4|\u0664)',
	"5": '(?:5|\u0665)',
	"6": '(?:6|\u0666)',
	"7": '(?:7|\u0667)',
	"8": '(?:8|\u0668)',
	"9": '(?:9|\u0669)',
	//arabic
	"\u0671": '(?:[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E]\\p{Mn}+|[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E])',
	"\u0623": '(?:[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E]\\p{Mn}+|[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E])',
	"\u0627": '(?:[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E]\\p{Mn}+|[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E])',
	"\u0625": '(?:[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E]\\p{Mn}+|[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E])',
	"\u0622": '(?:[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E]\\p{Mn}+|[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E])',
	"\u0672": '(?:[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E]\\p{Mn}+|[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E])',
	"\u0673": '(?:[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E]\\p{Mn}+|[\u0673\u0672\u0627\u0625\u0622\u0623\u0671\u0670\u066E])',
	"\u06D6": '(?:\u06D6\\p{Mn}+|\u06D6)',
	"\u0628": '(?:\u0628\\p{Mn}+|\u0628)',
	"\u062A": '(?:\u062A\\p{Mn}+|\u062A)',
	"\u062B": '(?:\u062B\\p{Mn}+|\u062B)',
	"\u062C": '(?:\u062C\\p{Mn}+|\u062C)',
	"\u062D": '(?:\u062D\\p{Mn}+|\u062D)',
	"\u062E": '(?:\u062E\\p{Mn}+|\u062E)',
	"\u062F": '(?:\u062F\\p{Mn}+|\u062F)',
	"\u0630": '(?:\u0630\\p{Mn}+|\u0630)',
	"\u0631": '(?:\u0631\\p{Mn}+|\u0631)',
	"\u0632": '(?:\u0632\\p{Mn}+|\u0632)',
	"\u0633": '(?:\u0633\\p{Mn}+|\u0633)',
	"\u0634": '(?:\u0634\\p{Mn}+|\u0634)',
	"\u0635": '(?:\u0635\\p{Mn}+|\u0635)',
	"\u0636": '(?:\u0636\\p{Mn}+|\u0636)',
	"\u0637": '(?:\u0637\\p{Mn}+|\u0637)',
	"\u0638": '(?:\u0638\\p{Mn}+|\u0638)',
	"\u0639": '(?:\u0639\\p{Mn}+|\u0639)',
	"\u063A": '(?:\u063A\\p{Mn}+|\u063A)',
	"\u0641": '(?:\u0641\\p{Mn}+|\u0641)',
	"\u0642": '(?:\u0642\\p{Mn}+|\u0642)',
	"\u0643": '(?:\u0643\\p{Mn}+|\u0643)',
	"\u0644": '(?:\u0644\\p{Mn}+|\u0644)',
	"\u0645": '(?:\u0645\\p{Mn}+|\u0645)',
	"\u0646": '(?:\u0646\\p{Mn}+|\u0646)',
	"\u0647": '(?:[\u0629\u0647]\\p{Mn}+|[\u0629\u0647])',
	"\u06CC": '(?:[\u064A\u06CC]\\p{Mn}+|[\u064A\u06CC])',
	"\u064A": '(?:[\u064A\u06CC]\\p{Mn}+|[\u064A\u06CC])',
	"\u0649": '(?:[\u0649\u0626]\\p{Mn}+|[\u0649\u0626])',
	"\u0626": '(?:[\u0649\u0626]\\p{Mn}+|[\u0649\u0626])',
	"\u0621": '(?:\u0621\\p{Mn}+|\u0621)',
	"\u0629": '(?:[\u0629\u0647]\\p{Mn}+|[\u0629\u0647])',
	"\u0648": '(?:[\u0624\u0648]\\p{Mn}+|[\u0624\u0648])',
	"\u0624": '(?:[\u0624\u0648]\\p{Mn}+|[\u0624\u0648])',
	"\u0640": '(?:[\u0640]\\p{Mn}+|[\u0640])',
	'A': '[Aa\xaa\xc0\xc5\xe0\xe5\u0100\u0105\u01cd\u01ce\u0200\u0203\u0226\u0227\u1d2c\u1d43\u1e00\u1e01\u1e9a\u1ea0\u1ea3\u2090\u2100\u2101\u213b\u249c\u24b6\u24d0\u3371\u3374\u3380\u3384\u3388\u3389\u33a9\u33af\u33c2\u33ca\u33df\u33ff\uff21\uff41]',
	'B': '[Bb\u1d2e\u1d47\u1e02-\u1e07\u212c\u249d\u24b7\u24d1\u3374\u3385-\u3387\u33c3\u33c8\u33d4\u33dd\uff22\uff42]',
	'C': '[Cc\xc7\xe7\u0106-\u010d\u1d9c\u2100\u2102\u2103\u2105\u2106\u212d\u216d\u217d\u249e\u24b8\u24d2\u3376\u3388\u3389\u339d\u33a0\u33a4\u33c4-\u33c7\uff23\uff43]',
	'D': '[Dd\u010e\u010f\u01c4-\u01c6\u01f1-\u01f3\u1d30\u1d48\u1e0a-\u1e13\u2145\u2146\u216e\u217e\u249f\u24b9\u24d3\u32cf\u3372\u3377-\u3379\u3397\u33ad-\u33af\u33c5\u33c8\uff24\uff44]',
	'E': '[Ee\xc8-\xcb\xe8-\xeb\u0112-\u011b\u0204-\u0207\u0228\u0229\u1d31\u1d49\u1e18-\u1e1b\u1eb8-\u1ebd\u2091\u2121\u212f\u2130\u2147\u24a0\u24ba\u24d4\u3250\u32cd\u32ce\uff25\uff45]',
	'F': '[Ff\u1da0\u1e1e\u1e1f\u2109\u2131\u213b\u24a1\u24bb\u24d5\u338a-\u338c\u3399\ufb00-\ufb04\uff26\uff46]',
	'G': '[Gg\u011c-\u0123\u01e6\u01e7\u01f4\u01f5\u1d33\u1d4d\u1e20\u1e21\u210a\u24a2\u24bc\u24d6\u32cc\u32cd\u3387\u338d-\u338f\u3393\u33ac\u33c6\u33c9\u33d2\u33ff\uff27\uff47]',
	'H': '[Hh\u0124\u0125\u021e\u021f\u02b0\u1d34\u1e22-\u1e2b\u1e96\u210b-\u210e\u24a3\u24bd\u24d7\u32cc\u3371\u3390-\u3394\u33ca\u33cb\u33d7\uff28\uff48]',
	'I': '[Ii\xcc-\xcf\xec-\xef\u0128-\u0130\u0132\u0133\u01cf\u01d0\u0208-\u020b\u1d35\u1d62\u1e2c\u1e2d\u1ec8-\u1ecb\u2071\u2110\u2111\u2139\u2148\u2160-\u2163\u2165-\u2168\u216a\u216b\u2170-\u2173\u2175-\u2178\u217a\u217b\u24a4\u24be\u24d8\u337a\u33cc\u33d5\ufb01\ufb03\uff29\uff49]',
	'J': '[Jj\u0132-\u0135\u01c7-\u01cc\u01f0\u02b2\u1d36\u2149\u24a5\u24bf\u24d9\u2c7c\uff2a\uff4a]',
	'K': '[Kk\u0136\u0137\u01e8\u01e9\u1d37\u1d4f\u1e30-\u1e35\u212a\u24a6\u24c0\u24da\u3384\u3385\u3389\u338f\u3391\u3398\u339e\u33a2\u33a6\u33aa\u33b8\u33be\u33c0\u33c6\u33cd-\u33cf\uff2b\uff4b]',
	'L': '[Ll\u0139-\u0140\u01c7-\u01c9\u02e1\u1d38\u1e36\u1e37\u1e3a-\u1e3d\u2112\u2113\u2121\u216c\u217c\u24a7\u24c1\u24db\u32cf\u3388\u3389\u33d0-\u33d3\u33d5\u33d6\u33ff\ufb02\ufb04\uff2c\uff4c]',
	'M': '[Mm\u1d39\u1d50\u1e3e-\u1e43\u2120\u2122\u2133\u216f\u217f\u24a8\u24c2\u24dc\u3377-\u3379\u3383\u3386\u338e\u3392\u3396\u3399-\u33a8\u33ab\u33b3\u33b7\u33b9\u33bd\u33bf\u33c1\u33c2\u33ce\u33d0\u33d4-\u33d6\u33d8\u33d9\u33de\u33df\uff2d\uff4d]',
	'N': '[Nn\xd1\xf1\u0143-\u0149\u01ca-\u01cc\u01f8\u01f9\u1d3a\u1e44-\u1e4b\u207f\u2115\u2116\u24a9\u24c3\u24dd\u3381\u338b\u339a\u33b1\u33b5\u33bb\u33cc\u33d1\uff2e\uff4e]',
	'O': '[Oo\xba\xd2-\xd6\xf2-\xf6\u014c-\u0151\u01a0\u01a1\u01d1\u01d2\u01ea\u01eb\u020c-\u020f\u022e\u022f\u1d3c\u1d52\u1ecc-\u1ecf\u2092\u2105\u2116\u2134\u24aa\u24c4\u24de\u3375\u33c7\u33d2\u33d6\uff2f\uff4f]',
	'P': '[Pp\u1d3e\u1d56\u1e54-\u1e57\u2119\u24ab\u24c5\u24df\u3250\u3371\u3376\u3380\u338a\u33a9-\u33ac\u33b0\u33b4\u33ba\u33cb\u33d7-\u33da\uff30\uff50]',
	'Q': '[Qq\u211a\u24ac\u24c6\u24e0\u33c3\uff31\uff51]',
	'R': '[Rr\u0154-\u0159\u0210-\u0213\u02b3\u1d3f\u1d63\u1e58-\u1e5b\u1e5e\u1e5f\u20a8\u211b-\u211d\u24ad\u24c7\u24e1\u32cd\u3374\u33ad-\u33af\u33da\u33db\uff32\uff52]',
	'S': '[Ss\u015a-\u0161\u017f\u0218\u0219\u02e2\u1e60-\u1e63\u20a8\u2101\u2120\u24ae\u24c8\u24e2\u33a7\u33a8\u33ae-\u33b3\u33db\u33dc\ufb06\uff33\uff53]',
	'T': '[Tt\u0162-\u0165\u021a\u021b\u1d40\u1d57\u1e6a-\u1e71\u1e97\u2121\u2122\u24af\u24c9\u24e3\u3250\u32cf\u3394\u33cf\ufb05\ufb06\uff34\uff54]',
	'U': '[Uu\xd9-\xdc\xf9-\xfc\u0168-\u0173\u01af\u01b0\u01d3\u01d4\u0214-\u0217\u1d41\u1d58\u1d64\u1e72-\u1e77\u1ee4-\u1ee7\u2106\u24b0\u24ca\u24e4\u3373\u337a\uff35\uff55]',
	'V': '[Vv\u1d5b\u1d65\u1e7c-\u1e7f\u2163-\u2167\u2173-\u2177\u24b1\u24cb\u24e5\u2c7d\u32ce\u3375\u33b4-\u33b9\u33dc\u33de\uff36\uff56]',
	'W': '[Ww\u0174\u0175\u02b7\u1d42\u1e80-\u1e89\u1e98\u24b2\u24cc\u24e6\u33ba-\u33bf\u33dd\uff37\uff57]',
	'X': '[Xx\u02e3\u1e8a-\u1e8d\u2093\u213b\u2168-\u216b\u2178-\u217b\u24b3\u24cd\u24e7\u33d3\uff38\uff58]',
	'Y': '[Yy\xdd\xfd\xff\u0176-\u0178\u0232\u0233\u02b8\u1e8e\u1e8f\u1e99\u1ef2-\u1ef9\u24b4\u24ce\u24e8\u33c9\uff39\uff59]',
	'Z': '[Zz\u0179-\u017e\u01f1-\u01f3\u1dbb\u1e90-\u1e95\u2124\u2128\u24b5\u24cf\u24e9\u3390-\u3394\uff3a\uff5a]'
};

function deaccent(accentedString) {
	var result = accentedString;
	for(var key in charToAccentedCharClassMap) {
		result = result.replace(XRegExp(charToAccentedCharClassMap[key], "g"), key);
	}
	//alert(result);
	return result;
}

function createAccentRegexp(characters) {
	//alert(characters);
	// Replaces all accented characters.
	var deaccentedString = deaccent(characters);
	// Escapes all regexp meta characters.
	// alert(deaccentedString);
	var cleanString = deaccentedString;
	//alert(cleanString);
	var accentReplacer = function(character) {
		//alert(character);
		var h = charToAccentedCharClassMap[character] || character;
		//alert(h);
		//return h;
		//u0627 = ا
		// == ٮٰ       
		return h + '([ۗ\u06e5\u0640\u200C\u0670\u200B\u200e㇣]\\p{Mn}+|[ۗ\u06e5\u0640\u200C\u0670\u200B\u200e㇣])*';
		//return h + '([\u200C]\\p{Mn}+|[\u200C])*';
		//return h + '([\u0640]\\p{Mn}+|[\u0640])*';
	};
	// Matches anything *but* a whitespace and replaces it.
	var regexp = cleanString.replace(/\S/g, accentReplacer);
	//alert(regexp);
	return regexp;
	//return XRegExp(regexp, "g");
}
/*
var scrolling = false;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;
	var down = false;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function(e) {
                        if (!el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(
                                e.pageX, e.pageY
                            ) == cont
                        ) {
                            pushed = 1;
							down =true;
                            lastClientX = e.clientX;
                            lastClientY = e.clientY;
                            
                            e.preventDefault();
	
				
							$( ".m_con,#snptview" ).scroll(function() {
                                if (pushed) { 
								//document.getElementsByClassName('m')[0].style.pointerEvents = 'none';
								
								is_grabbing =true;	
								
								}								
								
                            });
						
					
							
                        }
                    }, 0
                );

                _window[addEventListener](
                    mouseup, cont.mu = function() {
						
						document.getElementsByClassName('m_con')[0].style = ''; 
						
						
						pushed = 0;
						setTimeout(function(){ is_grabbing =false; }, 100);
						
						
						
						}, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        
						if (pushed) {  

                            el.classList.add("dragging");
	                        
                         
                             if($.support.rtlScrollType == "default" ||$.support.rtlScrollType == "negative"){
								
                               (scroller = el.scroller||el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX=e.clientX));
                              }
                            else{
								
	                        (scroller = el.scroller||el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX=e.clientX));
                            }
 
 
							
                           


						   scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
             })(dragged[i++]);
        }
    }

      
    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));*/


function grab(elem, cursor, dir) {
	
	
	
	
	//$(elem).css('cursor', cursor);
	$(elem).addClass("grabbable");
	
	//$(elem).addClass("dragscroll");
         //  dragscroll.reset()

	var curDown = false,
		curYPos = 0,
		curXPos = 0;
	var x, y, top, left, down;
	$("body").mousemove(function(e) {
		if(curDown) {
        if(_isMobile() != mobiletrue) {
			//is_grabbing = true;
			var newX = e.pageX;
			var newY = e.pageY;
			if(dir == "both") {
				if($.support.rtlScrollType == "default") {
					$(elem).scrollTop(top - newY + y);
					$(elem).scrollLeft(left - newX + x);	
				} 
				else if($.support.rtlScrollType == "negative") {
					$(elem).scrollLeft(left + newX - x);
				}
				else if($.support.rtlScrollType == "reverse") {
					$(elem).scrollTop(top - newY + y);
					$(elem).scrollLeft(left + newX - x);
				}
			} else if(dir == "x") {
				
		
				
				if($.support.rtlScrollType == "default") {
					$(elem).scrollLeft(left - newX + x);
				} 
				else if($.support.rtlScrollType == "negative") {
					$(elem).scrollLeft(left - newX + x);
				}
			
				else if($.support.rtlScrollType == "reverse") {
					$(elem).scrollLeft(left - newX + x);
				}
			} else if(dir == "y") {
				
				//alert($.support.rtlScrollType);
				if($.support.rtlScrollType == "default") {
					$(elem).scrollTop(top - newY + y);
				} 
				else if($.support.rtlScrollType == "negative") {
					
					$(elem).scrollTop(top - newY + y);
				}
				else if($.support.rtlScrollType == "reverse") {
					$(elem).scrollTop(top - newY + y);
				}
			}
		}
		
		}
	});
	$(elem).mousedown(function(e) {
		 if(_isMobile() != mobiletrue) {
		
	 if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation){
		e.stopPropagation();
	}
		
		x = e.pageX;
		y = e.pageY;
		top = $(this).scrollTop();
		left = $(this).scrollLeft();
		/// curYPos = e.pageY;
		// curXPos = e.pageX;
		curDown = true;
		//return false;
		
			       // $("body").addClass("grabbing");
			       
                }
	
	
	$(elem).scroll(function() {
                                if (curDown) { 
								//document.getElementsByClassName('m')[0].style.pointerEvents = 'none';
								
								is_grabbing =true;	
								
								}								
								
                            });
	
	
	
	
	
	});
	
	
	
	/*$(elem).click(function(e) {
		  //e.stopPropagation();
		 //is_grabbing = false;
		 if (is_grabbing == false){
		console.log("kkkkkkk");
		 }
		
		
	});*/
	
	
	
	$("body,#searchResCount,#favBox ,.page_num").mouseup(function() {
		
		 if(_isMobile() != mobiletrue) {
		curDown = false;
		setTimeout(function() {
			is_grabbing = false;
			curDown = false;
		}, 100);
		
		//$("body").removeClass("grabbing");
		//return false;
		}
	});
	


$("body,#searchResCount,#favBox,.page_num").mouseleave(function() {
		 if(_isMobile() != mobiletrue) {
		
		setTimeout(function() {
			is_grabbing = false;
			curDown = false;
		}, 0);
		//$("body").removeClass("grabbing");
		//curDown = false;
		
		}
	});




}








function grab2(elem, cursor, dir) {
  $(elem).addClass("grabbable");

  var curDown = false,
    curYPos = 0,
    curXPos = 0;
  var x, y, top, left, down;
  var initialScrollTop;
  var go_to_parent = false;
  var smoothScrollInterval;
  var smoothScrollStep = 1; // Adjust this value for the desired smoothness

  function smoothScroll(parent, targetScrollTop) {
    clearInterval(smoothScrollInterval);

    smoothScrollInterval = setInterval(function () {
      var currentScrollTop = parent.scrollTop();
      var distance = targetScrollTop - currentScrollTop;

    
        parent.scrollTop(targetScrollTop);
        clearInterval(smoothScrollInterval);
     
    }, 0);
  }

  $(elem).mousedown(function (e) {
    if (!_isMobile()) {
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      x = e.pageX;
      y = e.pageY;
      top = $(this).scrollTop();
	  
	
	  
      left = $(this).scrollLeft();
      initialScrollTop = $("#iscroll").scrollTop();
ff = true; 
      curDown = true;
    }
  });

  $("body, #searchResCount, #favBox, .page_num,.post_content").mouseup(function () {
    if (!_isMobile()) {
      curDown = false;
      setTimeout(function () {
        is_grabbing = false;
        curDown = false;
      }, 100);
    }
  });

  $("body, #searchResCount, #favBox, .page_num,.post_content").mouseleave(function () {
    if (!_isMobile()) {
      setTimeout(function () {
        is_grabbing = false;
        curDown = false;
      }, 0);
    }
  });
var ff = true;
  $(elem).mousemove(function (e) {
    if (curDown) {
      if (!_isMobile()) {
        var newX = e.pageX;
        var newY = e.pageY;
		
		 is_grabbing = true;
		  var scrollDirection = newY > curYPos ? "down" : "up";


        // Check if the post_content has reached its top or bottom boundaries
        var postContent;
        var isAtTop;
        var isAtBottom;

	if ($(elem).hasClass("post_content")) {
	// Check if the post_content has reached its top or bottom boundaries
        postContent = $(".post_content")[0];
        isAtTop = postContent.scrollTop === 0;
        isAtBottom =
    Math.ceil(postContent.scrollTop + postContent.clientHeight) >=
	      postContent.scrollHeight - 1;
	  }


        if (dir === "y") {
			
			
		if ($(elem).hasClass("post_content")) {
			//go_to_parent =false; 
          if (!isAtTop && !isAtBottom && go_to_parent == false) {
            // If not at the boundaries, do the regular scrolling logic
            postContent.scrollTop = top - newY + y;
          
		  
			
		  }else
		  if(scrollDirection =="up" && isAtTop && go_to_parent == false){
			    postContent.scrollTop = top - newY + y;
				//alert();
		  }
		  else
		   if(scrollDirection =="down" && isAtTop && go_to_parent == false){
			   // postContent.scrollTop = top - newY + y;
				
			var targetScrollTop = initialScrollTop - newY + y;
            $("#iscroll").scrollTop(targetScrollTop);
				
				
		  }
		  else
		  if(scrollDirection =="down" && isAtBottom && go_to_parent == false){
			    postContent.scrollTop = top - newY + y;
				//alert();
		  }
		  else
		   if(scrollDirection =="up" && isAtBottom && go_to_parent == false){
			   // postContent.scrollTop = top - newY + y;
				
			var targetScrollTop = initialScrollTop - newY + y;
            $("#iscroll").scrollTop(targetScrollTop);
	
				
		  }
		 
		
		}
		
		 else{
			var targetScrollTop = initialScrollTop - newY + y;
            
		
			$("#iscroll").scrollTop(targetScrollTop);
            
		
 
		  }
		 
        }
      }
    }
  
  curYPos = newY;
  
  
  });


$(elem).scroll(function () {
        // Detect initial scroll position
        if (!curDown) {
            
        }
    });







}








var lang   = read_Setting("lang", "ar", "all");
var NDmode = read_Setting('NDmode', "day", 'all');









   // Function to copy text to the clipboard
        function copyTextToClipboard(text) {
            // Create a temporary textarea element
            var textarea = document.createElement('textarea');
            textarea.value = text;

            // Append the textarea to the document
            document.body.appendChild(textarea);

            // Select the text in the textarea
            textarea.select();

            // Execute the copy command
            document.execCommand('copy');

            // Remove the textarea from the document
            document.body.removeChild(textarea);
        }

 function select_all(event) {
	
	

	if(event){
	
if (event.type === 'message') {
  
   var iframe = document.getElementById('iframe_id');
   var iframeWindow = iframe.contentWindow;

var node = iframeWindow.document.body; // Assuming you want to select the entire body of the iframe
var range;

if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
} else if (window.getSelection) {
    var selection = iframeWindow.getSelection(); // Use iframeWindow.getSelection() instead of window.getSelection()
    range = iframeWindow.document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
} else {
    console.warn("Could not select text in node: Unsupported browser.");
}
  
  
   
} 

else
if (event.type === 'contextmenu') {
	



	
	

	var targetId = $(event.target).closest('#text_con, #hash_con, #searchBox, #favBox').attr('id');

if (targetId) {
    
if (document.getElementById(targetId)) {
   
   var element = document.getElementById(targetId);
//console.log(element.isContentEditable);

    if (element.tagName.toLowerCase() === 'input') {
		
		element.select();
		
        
    } else if (element.getAttribute('contenteditable') !== null) {
    
	 node = element;
        var range;
        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(node);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            //console.warn("Could not select text in node: Unsupported browser.");
        }
	
 
	  
		
    }


	
	
}
} else{
	var selection = window.getSelection();
var body = document.body;

if (selection.rangeCount > 0) {
    selection.removeAllRanges();
}

var range = document.createRange();
range.selectNodeContents(body);
selection.addRange(range);
}

	
	
	
	
}










else {


	var targetId = $(event.target).closest('#text_con, #hash_con, #searchBox, #favBox').attr('id');

if (targetId) {
    
if (document.getElementById(targetId)) {
   
   var element = document.getElementById(targetId);

//console.log(element.isContentEditable);

    if (element.tagName.toLowerCase() === 'input') {
		
		element.select();
		
        
    } else if (element.getAttribute('contenteditable') !== null) {
    
	 node = element;
        var range;
        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(node);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            //console.warn("Could not select text in node: Unsupported browser.");
        }
	
 
	  
		
    }

	
	
}
} 
  

}	
	
	

	
}


	
	
	
	
 }


 function copySelectedTextTo_Clipboard(event) {
            // Access the content of the iframe
            var iframe = document.getElementById('iframe_id');
            var iframeWindow;
			var selectedText ;


          


if(event){
	
if (event.type === 'message') {
    // It's a message event
  // alert(event.type );
   if(iframe){
	iframeWindow = iframe.contentWindow;

            // Get the selected text within the iframe
         selectedText = iframeWindow.getSelection().toString();
    }
	
	if(selectedText){
			
			return true;
			
    }
   
   
}
if (event.type === 'contextmenu') {
	
	   var selection = window.getSelection();
        var selectedText2 = selection.toString();
   
   if(selectedText2){
			
			return true;
			
    }
	
	
}
 else {


	var targetId = $(event.target).closest('#text_con, #hash_con, #searchBox, #favBox').attr('id');

if (targetId) {
    
if (document.getElementById(targetId)) {
   
   var element = document.getElementById(targetId);

//console.log(element.isContentEditable);

    if (element.tagName.toLowerCase() === 'input') {
		//element.select();
		
		
        var selectionStart = element.selectionStart;
        var selectionEnd = element.selectionEnd;

        if (selectionStart !== undefined && selectionEnd !== undefined && selectionStart !== selectionEnd) {
            var selectedText = element.value.substring(selectionStart, selectionEnd);
            return true;
        }
    } else if (element.getAttribute('contenteditable') !== null) {
        //element.select();
		
		// Handle contenteditable div or other editable elements
        var selection = window.getSelection();
        var selectedText2 = selection.toString();
   
   if(selectedText2){
			
			return true;
			
    }
	  
		
    }

	
	
}
} 
  

}	
	
	

	
}


			
			
        }
	


 function copySelectedTextTo_Clipboard2(event) {
	 

	 var targetId = $(event.target).closest('#text_con, #hash_con, #searchBox, #favBox').attr('id');

if (targetId) {
    
if (document.getElementById(targetId)) {
   
   //var element = document.getElementById(targetId);
   document.execCommand('copy');
}
}
else if (targetId ==undefined) {
	


            // Access the content of the iframe
            var iframe = document.getElementById('iframe_id');
            var iframeWindow;
			var selectedText ;
if(iframe){

iframeWindow = iframe.contentWindow;

            // Get the selected text within the iframe
           // selectedText = iframeWindow.getSelection().toString();			
			selectedText = getIframeSelectionHtml('iframe_id').htmlContent;
			
if(selectedText){
	
				
			
			copyHtmlTo_Clipboard(selectedText);
			
}	
	


}
else{
	

document.execCommand('copy');	 
	 
	 
}
			
			


}   

}







function getIframeSelectionHtml(iframeId) {
    var iframe = document.getElementById(iframeId);
    if (!iframe) {
        console.error("Iframe with id " + iframeId + " not found.");
        return null;
    }

    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    var selectedText = iframeDocument.getSelection().toString();
    var htmlContent = "";

    if (selectedText) {
        var range = iframeDocument.getSelection().getRangeAt(0);
        
        // Check if the range has a common ancestor container
        if (range.commonAncestorContainer) {
            var container = document.createElement("div");
            container.appendChild(range.cloneContents());
            htmlContent = container.innerHTML;
        } else {
            console.error("No common ancestor container found for the selected range.");
        }
    }

    return {
        selectedText: selectedText,
        htmlContent: htmlContent
    };
}






function copyHtmlTo_Clipboard(htmlContent) {
    var div = document.createElement('div');
	div.className = 'temp-div';
    div.innerHTML = htmlContent;

    // Append the div to the document body
    document.body.appendChild(div);

    // Create a range and select the contents of the div
    var range = document.createRange();
    range.selectNodeContents(div);

    // Clear the existing selection and add the new range
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

   // console.log(htmlContent);

    try {
        // Copy the selected content to the clipboard
        document.execCommand('copy');
       // console.log('HTML copied to clipboard successfully.');
    } catch (err) {
        console.error('Unable to copy HTML to clipboard.', err);
    } finally {
        // Remove the appended div from the document body
        document.body.removeChild(div);

        // Clear the selection
        window.getSelection().removeAllRanges();
    }
}

		
		
		   function detectTextSource() {
            var selection = window.getSelection();
            var selectedText = selection.toString();

            if (selection.rangeCount > 0) {
                var range = selection.getRangeAt(0);
                var parentDocument = range.commonAncestorContainer.ownerDocument;

                if (parentDocument === document) {
                    alert('Selected text is from the main window: ' + selectedText);
                } else if (parentDocument === document.getElementById('iframe_id').contentDocument) {
                    alert('Selected text is from the iframe: ' + selectedText);
                } else {
                    alert('Selected text is from an unknown source: ' + selectedText);
                }
            }
        }
		
		
		 var inputs  ;
		var inputId;
				 function handleInputClick(event) {
            // Get the id of the clicked input element
           inputId = event.target.id;

            // Do something with the input id (for example, display it)
			
			if(inputId=="searchBox"){
				
			}else{
			
				
			}
			
			
        }



	

var mouseDownOccurred = false;

        // Function to handle mousedown event
        function handleMouseDown() {
            mouseDownOccurred = true;
        }

        // Function to handle focus event
        function handleFocus(event) {
            // If mousedown occurred, prevent the default focus behavior
            if (mouseDownOccurred) {
                event.preventDefault();
                mouseDownOccurred = false; // Reset the flag
            }
        }



 function moveCursorToPosition(x, y) {
            // Get the range at the mouse position
            var range = document.caretRangeFromPoint(x, y);

            // Create a selection and set the range
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }




	
	document.addEventListener('DOMContentLoaded', function() {
	
    document.addEventListener('mousedown', handleMouseDown);
       inputs = document.querySelectorAll('input[type="text"]');

        // Attach the click event listener to each input element
        for (var i = 0; i < inputs.length; i++) {
        
			                inputs[i].addEventListener('contextmenu', handleInputClick);
        }
   });