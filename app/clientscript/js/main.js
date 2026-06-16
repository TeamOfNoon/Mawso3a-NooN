var search_type = read_Setting("search_type", "exact", "all");
var enable_snipit = read_Setting("snpt_true", "true", "all");
var highlight = read_Setting("hit_true", "true", "all");
var part_highlight = read_Setting("hit2_true", "false", "all");
var is_ignord = read_Setting("is_ignord", "true", "all");
var rootpath = "";
var break_fun = false;
if(search_type == "exact") {
	document.getElementById("checkbox_id1").checked = true;
	document.getElementById("checkbox_id4").disabled = true;
	$("#switch_checkbox_id4").hide();
}
if(search_type == "all") {
	document.getElementById("checkbox_id0").checked = true;
	document.getElementById("checkbox_id4").disabled = false;
	$("#switch_checkbox_id4").show();
}
if(search_type == "any") {
	document.getElementById("checkbox_id2").checked = true;
	document.getElementById("checkbox_id4").disabled = false;
	$("#switch_checkbox_id4").show();
}
if(enable_snipit == "true") {
	document.getElementById("checkbox_id5").checked = true;
	document.getElementById("searchResCount").value = 5;
	$(".wSearchResultSettingsSmallScr").hide();
	document.getElementById("searchResCount").disabled = true;
} else {
	document.getElementById("checkbox_id5").checked = false;
}
if(highlight == "true") {
	document.getElementById("checkbox_id3").checked = true;
} else {
	document.getElementById("checkbox_id3").checked = false;
}
if(part_highlight == "true") {
	document.getElementById("checkbox_id6").checked = true;
} else {
	document.getElementById("checkbox_id6").checked = false;
}
if(is_ignord == "true") {
	document.getElementById("checkbox_id4").checked = false;
} else {
	document.getElementById("checkbox_id4").checked = true;
}
if(document.location.href.indexOf("&ux=search") != -1) {
	show_view(null, "search_view", null);
	if(typeof is_ios_app != 'undefined') {
		var obj = {
			event: "search_view",
			arg: "show"
		};
		window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
	}
} else if(document.location.href.indexOf("&ux=bookmark") != -1) {
	show_view(null, "fav_view", null);
	if(typeof is_ios_app != 'undefined') {
		var obj = {
			event: "fav_view",
			arg: "show"
		};
		window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
	}
}
if(read_Setting('NDmode', "day", 'all') == "night") {
	document.getElementById('NDmode').innerHTML = "<span class =\"number\">&nbsp;2-&nbsp;</span>" + Set_Morning_Browsing;
}
if(read_Setting("lang", "ar", "all") == "en") {
	$("html").addClass("ltr");
} else {
	$("html").addClass("rtl");
}
if(read_Setting('Strip_tashkeel', "off", 'all') == "on") {
	document.getElementById('tashkeel').innerHTML = "<span class =\"number\">&nbsp;10-&nbsp;</span>" + Add_diacritics_to_text;
}
if(read_Setting('full_screen', "off", 'web') == "on") {
	if(document.getElementById('FullS')) document.getElementById('FullS').innerHTML = "<span class =\"number\">&nbsp;3-&nbsp;</span>" + Full_screen_unresize;
	if(document.getElementById('fullscreenid')) document.getElementById('fullscreenid').src = '' + rootpath + 'clientscript/images/tools/fullSoff.png';
	if(typeof is_ios_app != 'undefined') {
		var obj = {
			event: "cell_tag_2",
			arg: "hide_state_bar"
		};
		window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));
	}
} else {
	if(typeof is_ios_app != 'undefined') {
		var obj = {
			event: "cell_tag_2",
			arg: "show_state_bar"
		};
		window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));
	}
}
if(read_Setting('format', "add", 'all') == "removed") {
	document.getElementById('format').innerHTML = "<span class =\"number\">&nbsp;6-&nbsp;</span>" + add_formatting;
}
if(read_Setting('Random_signature', "hidden", 'all') == "showen") {
	document.getElementById('signature').innerHTML = "<span class =\"number\">&nbsp;11-&nbsp;</span>" + hide_random_signature;
}
if(read_Setting('vid_source_link', "showen", 'all') == "hidden") {
	document.getElementById('vid_source').innerHTML = "<span class =\"number\">&nbsp;6-&nbsp;</span>" + Add_vid_source_link;
}
if(read_Setting('aud_source_link', "showen", 'all') == "hidden") {
	document.getElementById('aud_source').innerHTML = "<span class =\"number\">&nbsp;6-&nbsp;</span>" + Add_aud_source_link;
}
if(read_Setting('thread_source_link', "showen", 'all') == "hidden") {
	document.getElementById('thread_source').innerHTML = "<span class =\"number\">&nbsp;7-&nbsp;</span>" + Add_thread_source_link;
}
if(read_Setting('source_of_the_statement', "showen", 'all') == "hidden") {
	document.getElementById('links_source').innerHTML = "<span class =\"number\">&nbsp;8-&nbsp;</span>" + Add_links_to_the_source_of_the_statement;
}
if(read_Setting('links_translations', "showen", 'all') == "hidden") {
	document.getElementById('links_translations').innerHTML = "<span class =\"number\">&nbsp;9-&nbsp;</span>" + Add_links_translations;
}
var quots_icon;
var hash_icon;
if(read_Setting('NDmode', "day", 'all') == "night") {
	quots_icon = rootpath + "clientscript/images/tools/quote_N.png";
	hash_icon = rootpath + "clientscript/images/tools/hash_tag_N.png";
} else {
	quots_icon = rootpath + "clientscript/images/tools/quote.png";
	hash_icon = rootpath + "clientscript/images/tools/hash_tag.png";
}
(function(history) {
	var pushState = history.pushState;
	history.pushState = function(state, value, value2, value3) {
		if(typeof history.onpushstate == "function") {
			history.onpushstate({
				state: state
			});
		}
		setTimeout(function() {
			fireEvents("null");
		}, 0);
		return pushState.apply(history, arguments);
	};
	var replaceState = history.replaceState;
	history.replaceState = function(state, value, value2, value3) {
		if(typeof history.onreplacestate == "function") {
			history.onreplacestate({
				state: state
			});
		}
		setTimeout(function() {
			//if(value3 !="stop"){
			fireEvents("null", value3, null);
			//}
		}, 0);
		return replaceState.apply(history, arguments);
	};
})(window.history);
$(document).ready(function() {
	$(document).on('click', '#search_view,#fav_view', function(event) {
		//event.preventDefault();
		setTimeout(function() {
			$("#searchBox,#favBox").focusout().blur();
		}, 100);
	});
	
	$(document).on('click', '.popover-backdrop', function(event) {
	           event.stopPropagation();
	         $("#pop,.popover,.popover-backdrop").css("display", "none").css("opacity","0");
	});
	
	$(document).on('click', '.popover-open', function(event) {
		event.stopPropagation();
	       $("#pop,.popover,.popover-backdrop").css("display", "block").css("opacity","1");
	});
	
	
	
	
	if(enable_help) {
		$("html").prepend('<img id ="statebar"  src="' + rootpath + 'clientscript/images/help/state_bar.PNG" width="400" height="25"></center>');
		$("#head").css("top", '25px');
	}
	setTimeout(function() {
		$("#searchBox").placeHolder(null, "#clear_search");
	}, 0);
	if(style_type == "jq") {
		$.mobile.ajaxEnabled = false;
		$.mobile.loadingMessage = false;
		$.mobile.hashListeningEnabled = false;
		$.mobile.activeBtnClass = 'unused';
	}
	//window.focus();
	window.focus()
	/*
	window.addEventListener("blur", () => {
	  setTimeout(() => {
	    if (document.activeElement.tagName === "IFRAME") {
	     if(typeof is_ios_app != 'undefined') {  

	 var obj = {event: "hide_menu", arg: "hide"};
	 window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
	    
	}
	    }
	  });
	}, { once: false });*/
	$(window).blur(function() {
		if(typeof is_ios_app != 'undefined') {
			var obj = {
				event: "hide_menu",
				arg: "hide"
			};
			window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
		}
		//if (document.activeElement.tagName === "IFRAME") {
		$("#pop").css("display", "none");
		//}
	});
	$(document).on('keyup focus', ' #searchBox,#favBox', function(event) {
		event.preventDefault();
		$(" #down_td,  #up_td").hide();
		$("#home_td").hide();
		is_input_foces = true;
	});
	$(document).on('input', ' #searchBox,#favBox', function(event) {
		event.preventDefault();
		if($("#searchBox").val() != "") {
			if(!$("#search_view").hasClass("is-hidden")) {
				show_clear($("#searchBox"), "#clear_search");
			}
		}
		if($("#favBox").val() != "") {
			if(!$("#fav_view").hasClass("is-hidden")) {
				show_clear($("#favBox"), "#clear_fav");
			}
		}
	});
	$(document).on('focusout', ' #searchBox,#favBox', function() {
		setTimeout(function() {
			if($("#down_td,  #up_td").css('display') == 'none') {
				$(" #down_td,  #up_td").show();
				$("#home_td").show();
			}
		}, 100);
		setTimeout(function() {
			is_input_foces = false;
		}, 100);
	})
	if(location.hash.indexOf('#t=') != -1) {
		if(window.addEventListener) {
			stop_load_ifram = false;
			fireEvents(null, null, true);
		}
	} else {
		var url = window.location;
		url = url.toString().split('#')[0];
		url = removeParam("time", url);
		setTimeout(function() {
			stop_load_ifram = false;
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if(pageName.indexOf("#t") == -1) {
					if(xhr.readyState === 4) {
						if(xhr.status === 200) {
							try {
								
								var randomVersion = JSON.parse(xhr.responseText)[0];
								main_page = "mn.php";
								main_page_t = "t=mn.php";
								var iframe = document.getElementById('iframe_id');
								iframe.src = main_page;
								//location.hash = main_page_t;
								history.pushState(null, null, "#t=" + main_page);
							} catch (error) {
								main_page = "mn.php.htm";
								main_page_t = "t=mn.php.htm";
								var iframe = document.getElementById('iframe_id');
								iframe.src = main_page;
								// location.hash = main_page;
								history.pushState(null, null, "#t=" + main_page);
							}
						} else {

							main_page = "mn.php.htm";
								main_page_t = "t=mn.php.htm";
								var iframe = document.getElementById('iframe_id');
								iframe.src = main_page;
								// location.hash = main_page;
								history.pushState(null, null, "#t=" + main_page);
							
						}
					}
				}
			};
			xhr.onerror = function() {
				console.error('An error occurred during the request.');
				
			};
			xhr.open('GET', rootpath + 'admin/version.php', true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.send();
		}, 0);
	}
	$(document).on('click', ".ui-input-clear", function(e) {
		setTimeout(function() {
			$("#searchBox,#favBox").focusout().blur();
		}, 100);
	});
	$(document).on('click', ".wSearchResultItemSmallScr a.topic,.itemconspit a.hit,.wSearchResultItemSmallScr a.hit,#bookmarksResults a.link", function(e) {
		e.preventDefault();
	});
	$(document).click(function(e) {
		if($(e.target).closest("#pop")[0]) {} else {
			$("#pop").css("display", "none");
			$("#pop_back").css("display", "none");
		}
	});
	$(document).on('click', "#plus", function(event) {
		event.stopPropagation();
		if($("#pop").css("display") == "none") {
			$("#pop").css("display", "");
			$("#pop_back").css("display", "");
			resize_pop();
			window.focus();
		} else {
			$("#pop").css("display", "none");
			$("#pop_back").css("display", "none");
		}
	});
	$(document).on('click', "#toggle_options", function(e) {
		e.preventDefault();
		toggle_settings(null);
	});
	$(document).on('click', "#bookit", function(e) {
		e.preventDefault();
		saveBookmark(e, null);
	});
	$("#page_num,#foot,.contentholder,#snptview,#fav_view").bind('dragstart selectstart', function(e) {
		e.preventDefault();
		return false;
	});
	//dragElement(document.getElementsByClassName("m_con")[0]);
	grab(".m_con", "grab", "x");
	grab(".contentholder", "grab", "y");
	grab("#snptview", "grab", "y");
	grab("#fav_view", "grab", "y");
	grab(".pop", "grab", "y");
	grab(".popover-inner", "grab", "y");
	grab(".sheet-content", "grab", "y");
	fixImage(document.getElementById("search_image"));
	fixImage(document.getElementById("fav_image"));
	$(window).resize(function(e) {
		$('.contentholder').height($(window).height() - search_view_hight);
		if(!e.isTrigger) {
			if(window.myScroll2 || window.myScroll) {
				git = false;
			}
			clearTimeout(resizeId);
			//resizeId = setTimeout(doneResizing, 100);
			resizeId = setTimeout(function() {
				if(_a_QueryResult) {
					doneResizing();
				}
				if($("#pop").is(":visible")) {
					resize_pop();
				}
			}, 0);
		}
	});
	$(window).trigger('resize');
	$(window).on('popstate', function(event) {
		setTimeout(function() {
			stop_load_ifram = false;
			fireEvents("null", "null", true);
		}, 0);
	});
	$("#favBox").placeHolder(null, "#clear_fav");
	/*$(document).on("click", ".onClickPrevNext", function(event) {

	console.log("kkkkkkkkkkkkk");



	});*/
	$(document).on("click", ".close", function(event) {
		event.preventDefault();
		event.stopPropagation();
		$("#show_img").remove();
	});
	$(document).on("click", ".show_img", function(event) {
		event.preventDefault();
		event.stopPropagation();
	});
	$(window).on("message", function(e) {
		if(!e.data) {
			return false;
		}
		var data = JSON.parse(e.data);
		// data = JSON.stringify(data);
		if(data.eventname == 'loader') {
			if(data.hide == "true") {
				$("#loading").hide();
			} else {
				$("#loading").show();
			}
		}
		if(data.eventname == 'passurl') {
			//$("#loading").show();
			setTimeout(function() {
				var myParam = data.url;
				myParam = removeParam("ux", myParam);
				myParam = removeParam("f", myParam);
				myParam = removeParam("p", myParam);
				var curr_hash = "#t=" + set_hash_url(myParam);
				//if(decodeURIComponent(location.hash) != decodeURIComponent(curr_hash)){
				//curr_hash =curr_hash.replace(/html&(.*)/g, 'html$1');
				//curr_hash =curr_hash.replace(/&\%23post/g, '%23post');
				//curr_hash =curr_hash.replace(/&rhsearch/g, '&rhsearch');
				//alert(curr_hash);
				if(decodeURIComponent(curr_hash).indexOf('#post') != -1) {
					if(decodeURIComponent(location.hash).toString().replace("#", "").split(/[&#]/)[0] != decodeURIComponent(curr_hash).toString().replace("#", "").split(/[&#]/)[0]) {
						stop_load_ifram = false;
						history.pushState(null, null, curr_hash);
					} else {
						stop_load_ifram = true;
						history.replaceState(null, null, curr_hash, null);
					}
					setTimeout(function() {
						//$("#loading").hide();
					}, 100);
				} else {
					history.pushState(null, null, curr_hash);
					stop_load_ifram = false;
				}
			}, 0);
		}
		if(data.eventname == 'send_page_info') {
			fav_title = b64_to_utf8(data.title);
			fav_url = "." + get_iframe_current_relative_url(decodeURIComponent(b64_to_utf8(data.url)));
			fetchBookmarks();
			document.title = b64_to_utf8(data.title);
		}
		if(data.eventname == 'quots_view') {
			var quots_html = b64_to_utf8(data.html);
			if(quots_html) {
				var el_html = $('<div></div>');
				el_html.html(quots_html);
				$(el_html).find('.max').attr('src', quots_icon);
				$("#quots_con").html(el_html);
				$('#quots_con').css('z-index', '101');
				setTimeout(function() {
					show_hide_star_note();
				}, 0);
			}
			setTimeout(function() {
				$(".window").focus();
			}, 100);
		}
		if(data.eventname == 'hashtag_view') {
			var hashtag_html = b64_to_utf8(data.html);
			if(hashtag_html) {
				var el_html = $('<div></div>');
				el_html.html(hashtag_html);
				$(el_html).find('.max').attr('src', hash_icon);
				// el_html.appendTo("#quots_con");
				$("#quots_con").html(el_html);
				$('#quots_con').css('z-index', '101');
			}
			setTimeout(function() {
				$(".window").focus();
			}, 100);
		}
		if(data.eventname == 'share_view') {
			var share_html = b64_to_utf8(data.html);
			if(share_html) {
				$("html").append(share_html);
			}
		}
		if(data.eventname === 'nwjs') {
			if(typeof require === 'function' && typeof require('nw.gui') !== 'undefined') {
				showContextMenu(event, data.x, data.y);
			}
		}
		if(data.eventname == 'show_img') {
			$("#quots_con").html(' <div id="show_img" class="show_img"><a class="down" onclick="down()"></a><span class="close"></span><div class="modal-content"><img id="img01" alt="" name="img01" draggable="false" src=' + data.url + '></div></div>');
		}
		if(data.eventname == 'is_window_visible') {
			if($(".window").length != 0) {
				$.postMessage('{"eventname":"is_window_visible_respond", "visible":"yes"}', // The message to send (string)
					"*", // The host of the target window (i.e. http://www.vistaprint.com)
					window.frames["iframe_name"] // A reference to the target window
				);
			} else {
				$.postMessage('{"eventname":"is_window_visible_respond", "visible":"no"}', // The message to send (string)
					"*", // The host of the target window (i.e. http://www.vistaprint.com)
					window.frames["iframe_name"] // A reference to the target window
				);
			}
		}
		if(data.eventname == 'redirect') {
			window.location = b64_to_utf8(data.url);
		}
		if(data.eventname == 'currPATH') {
			// alert(window.location.toString().split('app/').pop());
			save_Setting("currPATH", window.location.toString().split('app/').pop(), "all");
			if(typeof is_ios_app != 'undefined') {
				var obj = {
					event: "NSURLConnection",
					arg: window.location.toString()
				};
				window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
			}
		}
		if(data.eventname == 'hide_menu') {
			if(typeof is_ios_app != 'undefined') {
				var obj = {
					event: "hide_menu",
					arg: "hide"
				};
				window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
			}
		}
	});
});
window.addEventListener('message', function(event) {
	// Parse the JSON message
	var data;
	try {
		data = JSON.parse(event.data);
	} catch (error) {
		console.error('Error parsing JSON message:', error);
		return;
	}
	// Check the event name and take appropriate actions
	if(data.eventname === 'loader' && data.hide === 'false') {
		setTimeout(function() {
			$("#loading").hide();
		}, 100);
	}
	// Add more conditions as needed for other events
});