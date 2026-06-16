var globaltime = 45;
var current_date_and_time = "01_06_2024 <br> v"+globaltime;

var main_page = "mn.php.htm";
var Update_time_date;
var ajaxRequests = [];
var enable_help = false;
var disable_all_loading = false;
var donthide = false;
var currsize = 1;
var gRootRelPath = "";
var gCommonRootRelPath = "";
var gTopicId = "";
//var time = "1";
//if (window.location != window.parent.location) {
//var time = "?time=" + (new Date().getTime());
//var time = "?time=" + 1;
//}
var url = "";
var is_grabbing = false;
var is_input_foces = false;
var search_type = "";
var is_snipit_enabled = "";
var _frag = document.createDocumentFragment(); // Reusable documentFragment
var striped_Normlized = "";
var iframe = null;
var search_view_hight = "";
var resizeId;
var resizeDone = false;
var current_select = "";
var current_mark = null;
var curr_index = "";
var git = true;
var part_hit = false;
var fav_title = "";
var fav_url = "";
var stop_load_ifram = false;
var previous_hash = null;
var next_hash = null;
/*higlhight*/
var highlight;
var part_hit;
var part_match = null;
var pattern;
var remove_repeated;
var words_array = new Array();
var hit_id;
var apply_mark = true;
var vValue = "";
var printin_prosses = false;
var style_type = "kk";
var CHversion = "";
// Check if the browser is Chrome
if(window.navigator.userAgent.indexOf("Chrome") !== -1) {
	// Extract the Chrome version from the user agent string
	var userAgent = window.navigator.userAgent;
	var chromeVersion = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
	if(chromeVersion) {
		// Extracted Chrome version
		CHversion = chromeVersion[1];
		console.log("Chrome Version: " + CHversion);
	} else {
		// Chrome version not found
		console.log("Chrome version information not available.");
	}
} else {
	// Not using Chrome
	console.log("You are not using Google Chrome.");
}

function compareVersion(versionA, versionB) {
	var partsA = versionA.split('.').map(Number);
	var partsB = versionB.split('.').map(Number);
	for(var i = 0; i < Math.max(partsA.length, partsB.length); i++) {
		var a = partsA[i] || 0;
		var b = partsB[i] || 0;
		if(a < b) {
			return -1; // Version A is less than Version B
		} else if(a > b) {
			return 1; // Version A is greater than Version B
		}
	}
	return 0; // Versions are equal
}

function checkURL(relativeURL) {
	var xhr = new XMLHttpRequest();
	var currentPageURL = window.location.href;
	var currentFolderPath = currentPageURL.substring(0, currentPageURL.lastIndexOf('/'));
	var absoluteURL = relativeURL;
	xhr.open('HEAD', absoluteURL, true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				main_page = "mn.php.htm";
				//console.log('URL found!');
				time = "?time=" + (new Date().getTime());
			} else {
				main_page = "mn.php";
				//console.log('URL not found.');
			}
		}
	};
	xhr.send();
}
// Usage example
var relativeURLToCheck = rootpath + "mn.php.htm";
//checkURL(relativeURLToCheck);
var currentURL = window.location.href;
if(currentURL.indexOf("main.html") != -1 || (currentURL.indexOf("index.html") != -1)) {
	currentURL = currentURL.replace(/\#thread_title/g, '%23thread_title');
	currentURL = currentURL.replace(/\#post/g, '%23post');
}
var baseURL = currentURL.split('#')[0];
var hashPart = currentURL.split('#')[1] || '';
var flag;

function redirectToNewPage(newUrl) {
	window.location.replace(newUrl);
}

function getQueryParam(paramName) {
	var regex = new RegExp('[?&]' + paramName + '=([^&#]*)');
	var results = regex.exec(window.location.href);
	if(results === null) {
		return null;
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, ' '));
	}
}

function changeQueryParam(paramName, newValue) {
	var currentUrl = window.location.href;
	var regex = new RegExp('(' + paramName + '=)([^&#?]*)', 'gm');
	if(currentUrl.match(regex)) {
		var newUrl = currentUrl.replace(regex, '$1' + newValue);
		window.location.replace(newUrl);
	}
}

function get_index() {
	var is404 = false;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				try {
					var randomVersion = JSON.parse(xhr.responseText)[0];
					main_page = "mn.php";
					if(currentURL.indexOf('time=') == -1) {
						if(hashPart) {
							var newURL = baseURL + flag + 'time=' + randomVersion + "#" + hashPart;
						} else {
							var newURL = baseURL + flag + 'time=' + randomVersion;
						}
						redirectToNewPage(newURL);
					} else {
						if(getQueryParam('time') != randomVersion) {
							changeQueryParam('time', randomVersion);
						} else {}
					}
					// alert("try");
				} catch (error) {
					var randomVersion = 1;
					main_page = "mn.php.htm";
					if(currentURL.indexOf('time=') == -1) {
						if(hashPart) {
							var newURL = baseURL + flag + 'time=' + randomVersion + "#" + hashPart;
						} else {
							var newURL = baseURL + flag + 'time=' + randomVersion;
						}
						redirectToNewPage(newURL);
					} else {
						if(getQueryParam('time') != randomVersion) {
							changeQueryParam('time', randomVersion);
						}
					}
					//alert("ctach");
				}
			} else {
				var randomVersion = globaltime;
				main_page = "mn.php.htm";
				if(currentURL.indexOf('time=') == -1) {
					if(hashPart) {
						var newURL = baseURL + flag + 'time=' + randomVersion + "#" + hashPart;
					} else {
						var newURL = baseURL + flag + 'time=' + randomVersion;
					}
					redirectToNewPage(newURL);
				} else {
					if(getQueryParam('time') != randomVersion) {
						changeQueryParam('time', randomVersion);
					}
				}
				//alert("404");
				is404 = true;
			}
		}
	};
	xhr.onerror = function() {
		// console.error('An error occurred during the request.');
		if(is404 == false) {
			var randomVersion = 1;
			main_page = "mn.php.htm";
			if(currentURL.indexOf('time=') == -1) {
				if(hashPart) {
					var newURL = baseURL + flag + 'time=' + randomVersion + "#" + hashPart;
				} else {
					var newURL = baseURL + flag + 'time=' + randomVersion;
				}
				redirectToNewPage(newURL);
			} else {
				if(getQueryParam('time') != randomVersion) {
					changeQueryParam('time', randomVersion);
				}
			}
			alert("error");
		}
	};
	xhr.open('GET', rootpath + 'admin/version.php', true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send();
}
// Handle the case where there might not be a hash
if(window.location.href.indexOf('html?') != -1 || window.location.href.indexOf('mn.php?') != -1) {
	flag = "&";
} else {
	flag = "?";
}


 if (typeof Androidd != 'undefined') {
	vValue = globaltime;
 }
 else{
	if(window.location.href.indexOf('time=') == -1) {
	window.stop();
}

get_index(); 

 }



vValue = getQueryParam('time');



//alert(vValue);
time = "?time=" + vValue;
var ver = "v" + vValue;
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/jquery_lib/jquery-1.12.4.min.js?' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/nw.js?' + ver + '\'><\/script>');
//alert(time);
document.write('<script data-cfasync="false"  type=\"text/javascript\" src=\'' + rootpath + 'clientscript/loader.js?' + ver + '\'><\/script>');