



var post_array = $(".posttop");
var anchor = [];
var post_count;
var current_hash = "";
var scrolling = false;
var posttopid;
var fullscreen_img = '' + rootpath + 'clientscript/images/tools/fullSon.png';
var night_day_img = '' + rootpath + 'clientscript/images/tools/mode_N.png';
var tashkeel_img = '' + rootpath + 'clientscript/images/tools/tashkeeloff.png';
var current_hashtag = read_Setting("hashtags", "null", "all");
for (var i = 0; i < post_array.length; i++) {
    anchor.push(post_array[i].id);
}

if (typeof Androidd != 'undefined') {

if (Androidd.getSharP("fullscreen", "false") == "true") {

   fullscreen_img ='' + rootpath + 'clientscript/images/tools/fullSoff.png';
}

}

if(typeof is_ios_app != 'undefined') {

if(read_Setting('full_screen', "off", 'web')== "on"){
var obj = {event: "cell_tag_2", arg: "hide_state_bar"};
 window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));
 
 fullscreen_img ='' + rootpath + 'clientscript/images/tools/fullSoff.png';
}

}




	var domain_list = '' + 
'<ul>' + 
'  <li><a id = "list_0" class="dropdown-item" onclick="update_domain(this)" href="javascript:;">www.nasser-alyamani.org</a></li>' + 


'  <li><a id = "list_1" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.nasser-alyamani*.org</a></li><hr>' + 





'  <li><a id = "list_2"  class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.mahdialumma.com</a></li>' + 



'  <li><a id = "list_3" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.mahdialumma*.com</a></li><hr>' + 



'  <li><a id = "list_4"  class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.mahdialumma.org</a></li>' + 



'  <li><a id = "list_5"  class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.mahdialumma*.org</a></li><hr>' + 


 
'  <li><a  id = "list_6" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.mahdialumma.net</a></li>' + 



'  <li><a  id = "list_7" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.mahdialumma*.net</a></li><hr>' + 




'  <li><a  id = "list_8" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.albushra-islamia.com</a></li>' + 




'  <li><a  id = "list_9" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.albushra-islamia*.com</a></li><hr>' + 





'  <li><a  id = "list_10" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.albushra-islamia.org</a></li>' + 



'  <li><a  id = "list_11" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.albushra-islamia*.org</a></li><hr>' + 





'  <li><a  id = "list_12" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.albushra-islamia.net</a></li>' + 



'  <li><a  id = "list_13" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.albushra-islamia*.net</a></li><hr>' + 





'  <li><a  id = "list_14" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.mahdi-alumma.com</a></li>' + 



'  <li><a  id = "list_15" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.mahdi-alumma*.com</a></li><hr>' + 




'  <li><a  id = "list_16" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.mahdialumma.xyz</a></li>' + 



'  <li><a  id = "list_17" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.mahdialumma*.xyz</a></li><hr>' + 



'  <li><a  id = "list_18" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.mahdialumma.online</a></li>' + 




'  <li><a  id = "list_19" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.mahdialumma*.online</a></li><hr>' + 




'  <li><a  id = "list_20" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.bushra-islamia.com</a></li>' + 




'  <li><a  id = "list_21" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.bushra-islamia*.com</a></li><hr>' + 




'  <li><a  id = "list_22" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">www.awaited-mahdi.com</a></li>' + 




'  <li><a  id = "list_23" class="dropdown-item" onclick="update_domain(this)" href="javascript:void(0)">*www*.awaited-mahdi*.com</a></li>' + 




'</ul>' + 
'' + 
'';

 var domin_div = 
 '<div class="dropdown-con">'+
  '<div class="dropdown-content2">'+
	domain_list+
  '</div>'+
 '</div>';




function doSomething() {}

function font_options(index, selector, strUser) {
    
	
	var wrapper = document.getElementById('wrapper')
    wrapper.style.fontFamily = strUser;
    currsize = read_Setting("currsize", "0", "all");
    currsize = parseInt(currsize);
	
	if (index == 0) {
        wrapper = document.getElementById('wrapper');
        wrapper.style.fontSize = (180 + parseFloat(currsize)) + "%";
    }
    if (index == 1) {
        wrapper = document.getElementById('wrapper');
        wrapper.style.fontSize = (140 + parseFloat(currsize)) + "%";
    }
    if (index == 2) {
        wrapper = document.getElementById('wrapper');
        wrapper.style.fontSize = (115 + parseFloat(currsize)) + "%";
    }
    if (index == 3) {
        wrapper = document.getElementById('wrapper');
        wrapper.style.fontSize = (190 + parseFloat(currsize)) + "%";
    }
    if (index == 4) {
        wrapper = document.getElementById('wrapper');
        wrapper.style.fontSize = (140 + parseFloat(currsize)) + "%";
    }
    fontSize = null;
}

function updateFontFamily(savefont) {
    var selector, fonttype, index, strUser;
    if (savefont == true) {
        selector = document.getElementById('selectFontFamily');
        strUser = selector.options[selector.selectedIndex].value;
        index = selector.selectedIndex;
        selector.selectedIndex = index;
        save_Setting("fonttype", selector.selectedIndex, "all");
        font_options(index, selector, strUser);
    } else {
        index = read_Setting("fonttype", "0", "all");
        selector = document.getElementById('selectFontFamily');
        selector.selectedIndex = index;
        strUser = selector.options[index].value;
        font_options(index, selector, strUser);
        $('.posttext').removeAttr("style");
    }
}


function update_domain(elem,index) {
    
	  var items = document.querySelectorAll('.dropdown-item');
           for (var i = 0; i < items.length; i++) {
                     items[i].classList.remove('active');
					 
                  }
				  
				  
	//var select_domain = document.getElementById('select_domain');
    if (!elem) {
        index = read_Setting("domaintype", "0", "all");

	  
	 $("#list_"+index).addClass('active');
var buttonText = $("#list_"+index).text();
            document.querySelector('.dropdown-button').textContent = buttonText;
        
    } else {
        if (window.location == window.parent.location) {
            $('#loading').show()
        } else {
            $.postMessage('{"eventname":"loader", "hide":"false"}', // The message to send (string)
                "*", // The host of the target window (i.e. http://www.vistaprint.com)
                parent // A reference to the target window
            );
        }
        
		
		
		 

            // Add the "active" class to the selected item
            elem.classList.add('active');
            var domian_index = $(elem).attr('id').replace(/list_/g, '');
            
			
			// Update the button text to the selected item's text
            var buttonText = elem.textContent;
            document.querySelector('.dropdown-button').textContent = buttonText;

            // Close the dropdown
            document.querySelector('.dropdown').classList.remove('active');
			
			run_back();
		
	
		var currentUrl = window.location.href;

// Remove the fragment
var updatedUrl = currentUrl.replace('#show_domain', '');

// Change the URL without reloading the page
window.history.replaceState({}, document.title, updatedUrl);
		
		save_Setting("domaintype", domian_index, "all");
        location.reload();
    }
}


function hide_elements() {
    $("#myDropdown").hide();
    $('.tooltiptext5').hide();
	$('.menue_list').hide();
    $(".selected").unbind("click");
    $(".selected").addClass('selected enableselect');
    $(".tooltiptext_custom").remove();
    $(".extImag").remove();
    $("#tooltiptext_custom").remove();


    $(".extImag").remove();
        $('.image_custom').remove();
        $(".link_img").remove();
        $('.tooltiptext').hide();
        $('.tooltiptext2').hide();
        $('.tooltiptext3').hide();
        $('.tooltiptext4').hide();
        $('.tooltiptext5').hide();
        $('.hide_external_link').hide();
}
var domian = select_domain();










$(document).ready(function () {





$('.posttext .show_post_link a').each(function () {
    var $this = $(this);
    var href = $this.attr("href");

    var ajaxRequest = $.ajax({
        //url: href + "?short",
		url: href + "",
        method: "GET",
        success: function (response) {
           
		     var content = $(response).find(".post_con").html();
			
			
			$this.parent().parent().find(".show_post_con").html(content);
		   
            if (current_hashtag !== "null") {
               $(".show_post_con .hash_tag").html('<br>ـــــــــــــــــــــــــــ<br>' + read_Setting("hashtags", "null", "all"));
            }
        },
        error: function (xhr, status, error) {
            console.error("Error in AJAX request:", status, error);
        }
    });

    ajaxRequests.push(ajaxRequest);
});




// Execute a function when all AJAX requests have finished
$.when.apply($, ajaxRequests).then(function () {
   
   
   console.log("All AJAX requests have finished.");
    var wrapper =  $("#wrapper");

    $('html').append(domin_div);

    $('#iscroll').append('<img style="display:none;" src="'+rootpath+'clientscript/images/generic/'+img_lost+'" height="200" width="200" alt=""><img style="display:none;" src="'+rootpath+'clientscript/images/generic/loading.gif" height="200" width="200" alt="">');

    if (read_Setting("lang", "null", "all") == "null") {
        Redirect("0");
    }
    if (read_Setting("lang", "null", "all") == "en") {
        $("html").attr("dir", "ltr");
        $("#help_con #help").html(Instructions_for_using_the_application);
        $(".show_post_link a").html(show_post_link);
		$(".show_post_list a").html(show_post_list);
		$("#post_title a").html(post_title);
		
		
	} else {
        $("html").attr("dir", "rtl");
		
		$(".show_post_link a").html(show_post_link);
		$(".show_post_list a").html(show_post_list);
    }
    if (_isMobile() == mobiletrue) {
        //$("html").css("cursor", "pointer");
    }
    $(document).on("click", function (e) {
        if ($(e.target).closest("#myDropdown")[0] || $(e.target).closest(".tooltiptext5")[0]) {} else {
            hide_elements();
        }
	});
	
	
	
	
	 $(document).on('contextmenu', function(event) {
    

      if (window.location == window.parent.location) {
          
        } else {
           
        var mouseX = event.pageX;
        var mouseY = event.pageY;


		   $.postMessage('{"eventname":"nwjs", "x":'+mouseX+', "y":'+mouseY+'}', // The message to send (string)
                "*", // The host of the target window (i.e. http://www.vistaprint.com)
                parent // A reference to the target window
            );
        }
      });
	
	
	
	$(".post_header p").css("font-size", "");
	
	
	

    $('a').each(function () {
        var href = $(this).attr("href");
        if (href) {
            var domian_link = domian.replace(/\*/g, "");
            href = href.replace(/https\:\/\/\*www\*\.mahdialumma\*\.com/g, domian_link);
            $(this).attr("href", href);
        }
    });
    $('#iscroll').each(function () {
        $(this).find('.posttop').each(function () {
            var count = $(this).find(".count")[0].outerHTML;
            var postid = $(this).attr('id');
            postid = postid.replace(/post/g, "");
            $(this).html('<table style="width:100%" class="" unselectable="off">' +
            '    <tbody unselectable="off" class="disableselect">' +
           
 '        <td style="width:0em;" class="menue_plus gold_buttons disableselect" unselectable="off"><img src="'+ rootpath+'clientscript/images/tools/plus_tranz.png" style=""><div style="display:none;"  class="gold_buttons menue_list"><a class="toolsup btn_print disableselect" rel="nofollow" unselectable="off"><b unselectable="off" class="disableselect">' + print_statment +
            '</b></a><hr><a class="toolsup select_txt" rel="nofollow" unselectable="off"><b unselectable="off" class="disableselect">' + copy_statment +
            '</b></a><hr><a class="toolsup select_link" rel="nofollow" unselectable="off"><b unselectable="off" class="disableselect">' + copy_post_link +
            '</b></a><hr><a class="toolsup select_post_num" rel="nofollow" unselectable="off"><b unselectable="off" class="disableselect">' + copy_post_num +
            '</b></a><hr><a class="toolsup select_post_code" rel="nofollow" unselectable="off"><b unselectable="off" class="disableselect">' + copy_post_code +
            '</b></a></div></td>' +
            '        <td class="zoom txt_resize gold_buttons disableselect" style="width:0em;" unselectable="off"><img class="up2  center_stuff disableselect" src="' + rootpath + 'clientscript/images/tools/zoom.png" unselectable="off" alt=""><div class="gold_buttons tooltiptext5 disableselect" style="display:none;" unselectable="off"><a class="increase zoom-buttons disableselect" rel="nofollow" unselectable="off"><b unselectable="off" class="disableselect"><img src="' + rootpath + 'clientscript/images/tools/zoom_in.png" alt="" style="width:100%; max-width:15px" unselectable="off" class="disableselect"></b></a> &nbsp;<a class="decrease zoom-buttons disableselect" rel="nofollow" unselectable="off"><b unselectable="off" class="disableselect"><img src="' + rootpath + 'clientscript/images/tools/zoom_out.png" alt="" style="width:100%; max-width:15px" unselectable="off" class="disableselect"></b></a> &nbsp;<a class="resetMe zoom-buttons disableselect" rel="nofollow" unselectable="off"><b unselectable="off" class="disableselect"><img src="' + rootpath + 'clientscript/images/tools/zoom_reset.png" alt="" style="width:100%; max-width:15px" unselectable="off" class="disableselect"></b></a></div>' +
            '        </td>' + '        <td style="width:100em;" unselectable="off" class="disableselect"></td>' +
            '        <td class="postlink disableselect" style="width:2.5em;" unselectable="off">' + count + '</td>' +
            '        </tr>' +
            '    </tbody>' +
            '</table>');
        });
        $('.quote-right,.bbcode_quote,.quote_container,figure,.curly-quotes').contents().unwrap();
		$('figcaption,.name_of_quote_first').remove();
		
		
		
        //$('.name_of_quote').remove();
        $(this).find(".bbcode_container").replaceWith(function () {
            return "<div class = 'bbcode_container'><div class='gts'>" + quote_var + "</div>" + $(this).each(function (index, elem) {
                getDef(elem, "+");
                getDef(elem, "-");
            }).html() + "<div class='gts'>" + quote_var_end + "</div></div>";
        });
        
        


		


var html = wrapper.html();

        var domian_link = domian.replace(/http(s|)\:\/\//g, "");
        html = html.replace(/\*www\*\.mahdialumma\*\.com/g, domian_link);
        wrapper.html(html);
       

	   wrapper.find('.posttext').each(function () {
            var hh = Math.floor(Math.random() * (parseFloat(20) - parseFloat(3) + 1) + parseFloat(3));
            var number = randomString(parseInt(hh));
            var link = $(this).find(".link_org2").attr('id');
            if (link) {
                link = link.split('p=')[1];
            } else {
                link = "";
            }
            var random_hidden = "";
            if (read_Setting('Random_signature', "hidden", 'all') == "hidden") {
                random_hidden = "random_hidden";
            } else {
                random_hidden = "";
            }
            $(this).find('.page-break').first().before("<div style='text-align:center;' class =' randomnumber " + random_hidden + "'><br>" + random_code_var + "<br>ـ" + number + "ـ<br><br></div><div class ='postnumber' id=" + link + ">" + link + "</div>");
            $(this).prepend(" ");
            

			if (current_hashtag != "null") {
                $(this).find(".hash_tag").html('<br>ـــــــــــــــــــــــــــ<br>' + read_Setting("hashtags", "null", "all"));
            }
            


if (read_Setting('vid_source_link', 'showen', 'all') === 'hidden' &&
    read_Setting('aud_source_link', 'showen', 'all') === 'hidden') {
    $('.media').hide();
	$('.vid_med').hide();
	$('.aud_med').hide();
} else {
    // Check and hide video if needed
    if (read_Setting('vid_source_link', 'showen', 'all') === 'hidden') {
        $('.vid_med').hide();
    }

    // Check and hide audio if needed
    if (read_Setting('aud_source_link', 'showen', 'all') === 'hidden') {
        $('.aud_med').hide();
    }
}
			   
			   

                       if (read_Setting('thread_source_link', "showen", 'all') == "hidden") {
                $('.move:eq(0)').hide();
            }
            if (read_Setting('source_of_the_statement', "showen", 'all') == "hidden") {
                $('.move.md').hide();
            }
            if (read_Setting('links_translations', "showen", 'all') == "hidden") {
                $('.language').hide();
            }

                     
                        show_hide_star_note();
        });






});
        
      
        
        
        
		
		
		 wrapper.find(".posttext").each(function (index, elem) {
	
			getDef(elem, "+");

			$(elem).find('.page-break').first().before("<br>");
			
        });
		
		
        wrapper.find('.alpom2_go').text(go_link);
        wrapper.find('.alpom2_copy').text(copy_link);
        wrapper.find('#up_page a').html('<img src="' + rootpath + page_up_path + '" title="' + up_page_title + '"> ');
        if (read_Setting("lang", "null", "all") == "en") {
            if ($('li > span[style*="color:red"]').length != 0) {
                wrapper.find('li > span[style*="color:red"]').each(function (index, elem) {
                    wrapper.html(wrapper.html().replace("مثبت", " sticky"));
                });
            }
            if ($(".N_replyes").length != 0) {
                wrapper.find(".N_replyes").each(function (index, elem) {
                    wrapper.html(wrapper.html().replace("المشاركات:", "Posts: ").replace("المواضيع:", "Threads:").replace("بيان ..", "Statment .."));
                });
            }
            if ($(".label").length != 0) {
                wrapper.find(".label").each(function (index, elem) {
                    wrapper.html(wrapper.html().replace("الصفحات", "Pages"));
                });
            }
            
            if ($(".link_pic2").length != 0) {
                wrapper.find(".link_pic2").each(function (index, elem) {
                    wrapper.html(wrapper.html().replace("۞رابط صورة۞",imag_link));
                });
            }
            
            
            if ($(".thread_title").length != 0) {
                wrapper.find(".thread_title").html(wrapper.find(".thread_title").html().replace("الموضوع:", "The Topic:"));
            }
            if ($("#fourm_title").length != 0) {
                wrapper.find("#fourm_title").html(wrapper.find("#fourm_title").html().replace("المنتدى:", "The Section:"));
            }
            
            if ($("#post_title").length != 0) {
                wrapper.find("#post_title").html(wrapper.find("#post_title").html().replace("البيان:", "The Post:"));
            }
            
            
        }
        if ($(".label").length != 0) {
            wrapper.find(".label").each(function (index, elem) {
                wrapper.html(wrapper.html().replace("•", ""));
            });
        }
        if (read_Setting('Strip_tashkeel', "off", 'all') == "on") {
            var text = wrapper.html();
            text = text.replace(XRegExp("[\\p{Mn}\\u200C]", 'gmi'), '')
            wrapper.html(text);
            if (window.location != window.parent.location) {
                $.postMessage('{"eventname":"tashkeel", "state":"remove"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            }
        }
    
    
    if ($(".move_pic").length != 0) {
            wrapper.find(".move_pic").each(function (index, elem) {
                wrapper.html(wrapper.html().replace(/(&nbsp;)*/g,""));
            });
        }
    
    
    
    
    
    
    
    
    
    


   if(enable_help){
        $('.language').each(function () {
				    $(this).prepend("<div id =\"tooltip_lang\" class=\"tooltip\"><center>I am a tooltip!</center></div>");

		});
   }		

			
    $('.link_org').each(function () {
    
	
        $(this).find('.post_src').text(post_src);
        $(this).find('.thread_src').text(thread_src);
        $(this).find('.vid').text(vid_src);
		$(this).find('.aud').text(aud_src);
	  	
		
		
		var postsrc =  $(this).find('.post_src').text();
		postsrc = postsrc.replace(/\n/g, "<br>");   
        $(this).find('.post_src').html(postsrc);
		
	    var threadsrc =  $(this).find('.thread_src').text()
		threadsrc = threadsrc.replace(/\n/g, "<br>");   
        $(this).find('.thread_src').html(threadsrc);
		
		$(this).find('.selected').append('<br>');
		
        var link_id = $(this).find('a.link_org2').attr('id');
        var domian_link = domian.replace("*www*.mahdialumma*.com", domian_link);
        domian_link = domian.replace(/\*/g, "");
        $(this).find('a.link_org2').attr("href", domian_link + "/showthread.php?" + link_id);
        $(this).children('span').eq(0).text(domian + "/showthread.php?" + link_id);
        
		
	     var link_id3 = $(this).find('a.link_org3').attr('id');
        $(this).find('a.link_org3').attr("href",link_id3);
		

         var link_id4 = $(this).find('a.link_org4').attr('id');
        $(this).find('a.link_org4').attr("href",link_id4);
	   
	   
        if(link_id3){
	           $(this).children('span').eq(0).text(link_id3);
		}
        


		if(link_id4){
	           $(this).children('span').eq(0).text(link_id4);
		}
		
		
		
		$(this).closest('.move').find("br:nth-child(3)").remove();
        $(this).find('a').prepend("ـــــــــــــــــــــــــــ<br>");
if(enable_help){
					  
        if ($(this).find('.thread_src').length > 0) {
             $(this).prepend("<div id=\"tooltip_thread\" class=\"tooltip\"><center>I am a tooltip!</center></div>");
        }
		if ($(this).find('.post_src').length > 0) {
             $(this).prepend("<div id=\"tooltip_post\" class=\"tooltip\"><center>I am a tooltip!</center></div>");
        }

        if ($(this).find('.aud').length > 0) {
             $(this).prepend("<div id=\"tooltip_aud\" class=\"tooltip\"><center>I am a tooltip!</center></div>");
        }

        if ($(this).find('.vid').length > 0) {
             $(this).prepend("<div id=\"tooltip_vid\" class=\"tooltip\"><center>I am a tooltip!</center></div>");
        }
	}

        $(this).append('<div id="tooltiptext_custom_para"></div>');
		
    });
    
    
    $(".move:first").append("<br>");
    
    
    $(".link_org").click(function (event) {
        if (is_grabbing == true) return false;
        event.preventDefault();
        event.stopPropagation();
        if (!$(event.currentTarget).children(".selected").hasClass("moveoff")) {
            $(".selected").unbind("click");
            $(".selected").addClass('selected enableselect');
            $(event.currentTarget).children(".selected").addClass("class", 'selected moveoff enableselect');
            $(event.currentTarget).children(".selected").unbind('click').bind('click', function (event) {
                event.stopPropagation()
            })
        }
    
 hide_elements();








        if ($(".tooltiptext_custom").length == 0) {
            


//$(event.currentTarget).append('<div class="tooltiptext_custom"><div class="tooltiptext_custom_go linkstyle"><a href="" target="_blank" >' + go_link + '</a></div><br><div class="tooltiptext_custom_copy linkstyle">' + copy_link + '</div></div>');
    
$(event.currentTarget).children("#tooltiptext_custom_para").append('<div class="tooltiptext_custom"><div class="tooltiptext_custom_go linkstyle"><a href="" target="_blank" >' + go_link + '</a></div><br><div class="tooltiptext_custom_copy linkstyle">' + copy_link + '</div></div>');


$(event.currentTarget).children("#tooltiptext_custom_para").children(".tooltiptext_custom").children(".tooltiptext_custom_go").children('a').attr("href", $(event.currentTarget).children('.link_org2').attr('href'));
            
$(event.currentTarget).children("#tooltiptext_custom_para").children(".tooltiptext_custom").children(".tooltiptext_custom_go").children('a').attr("href", $(event.currentTarget).children('.link_org3').attr('href'));
			
$(event.currentTarget).children("#tooltiptext_custom_para").children(".tooltiptext_custom").children(".tooltiptext_custom_go").children('a').attr("href", $(event.currentTarget).children('.link_org4').attr('href'));			
			
			
			$(".tooltiptext_custom").click(function (event) {
                $(".selected").unbind("click");
                $(".selected").addClass('selected enableselect');
                event.stopPropagation();
                $(".tooltiptext_custom").remove();
                stop = !1
            });
            $(".tooltiptext_custom_go > a").click(function (event) {
                if (is_grabbing == true) return false;
                event.stopPropagation();
                if (typeof Androidd !== 'undefined') {
                    event.preventDefault();
                    var href = $(this).attr("href");
                    Androidd.go_ext(href, "null");
                    return false;
                }
            });
            $(".tooltiptext_custom_copy").click(function (event) {
                if (is_grabbing == true) return false;
                event.stopPropagation();
                var c = event.currentTarget.parentNode.parentNode.parentNode.childNodes;
                for (i = 0; i < c.length; i++) {
                    if (c[i].className != null) {

                        if (c[i].className.indexOf("selected enableselect") != -1) {
                            select_all_and_copy(c[i],"select_text_link",null);
                        }
                    }
                }
            })
        }
        $("#iscroll").scrollTop($(this).position().top + $("#iscroll").scrollTop())
    });
   

   if (read_Setting('format', "add", 'all') == "removed") {
        remove_format(wrapper);
    }
    

    
    $(document).on("click", ".link_pic", function (event) {

        if (is_grabbing == true) return false;
        event.preventDefault();
        event.stopPropagation();
        $(".extImag").remove();
        $(".tooltiptext_custom").remove();
        if (!$(event.currentTarget).children(".selected").hasClass("moveoff")) {
            $(".selected").unbind("click");
            $(".selected").addClass('selected enableselect');
            $(event.currentTarget).children(".selected").addClass("class", 'selected moveoff enableselect');
            $(event.currentTarget).children(".selected").unbind('click').bind('click', function (event) {
                event.stopPropagation()
            })
        }
        $(event.currentTarget).parent().append('<div class="extImag"><div class="extImag2"><a class= "img_link" target="_blank" href=""><img class="img2" src="" height="" width="200" alt=""></a></div><br><div class="extImag_go linkstyle"><a href="" target="_blank" >' + go_link + '</a></div><br><div class="extImag_copy linkstyle">' + copy_link + '</div></div>');
        $(event.currentTarget).parent().children(".extImag").children('.extImag2').children('a').attr("href", $(event.currentTarget).children(".NOTselected").children('a').attr('href'));
        var img = new Image();
        $(event.currentTarget).parent().children(".extImag").children('.extImag2').children('a').children('img').attr("src", '../../clientscript/images/generic/loading.gif');
        $(event.currentTarget).parent().children(".extImag").children('.extImag2').children('a').attr("class", 'img_link link_off');
        img.onload = function () {
            $(event.currentTarget).parent().children(".extImag").children('.extImag2').children('a').children('img').attr("src", img.src);
            $(event.currentTarget).parent().children(".extImag").children('.extImag2').children('a').removeClass("link_off");
        }
        img.onerror = img.onabort = function () {

            
if (read_Setting("lang", "ar", "all") == "en") {
                $(event.currentTarget).parent().children(".extImag").children('.extImag2').children('a').children('img').attr("src", 'data:image/jpeg;base64,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');

    }
    else{
    $(event.currentTarget).parent().children(".extImag").children('.extImag2').children('a').children('img').attr("src", 'data:image/jpeg;base64,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');
    }



$(event.currentTarget).parent().children(".extImag").children('.extImag2').children('a').attr("class", 'img_link link_off')
        }
        img.src = $(event.currentTarget).children(".NOTselected").children('a').attr('href');
        $(event.currentTarget).parent().children(".extImag").children('.extImag_go').children('a').attr("href", $(event.currentTarget).children(".NOTselected").children('a').attr('href'));
        
        
        
        $(".extImag_go > a").click(function (event) {
            if (is_grabbing == true) return false;
            event.stopPropagation();
            if (typeof Androidd !== 'undefined') {
                event.preventDefault();
                var href = $(this).attr("href");
                Androidd.go_ext(href, "null");
                return false;
            }
        });
        $(".extImag_copy").click(function (event) {
            if (is_grabbing == true) return false;
            event.stopPropagation();
            var c = event.currentTarget.parentNode.parentNode.childNodes;
            var i;
            for (i = 0; i < c.length; i++) {
                if (c[i].className == "link_pic") {
                    var cc = c[i].childNodes;
                    for (var ii = 0; ii < cc.length; ii++) {
                        if (c[i].className != null) {
                            if (cc[ii].className != null) {
                                if (cc[ii].className.indexOf("selected enableselect class") != -1) {
                                    select_all_and_copy(cc[ii],"select_img_link",null);
                                }
                            }
                        }
                    }
                }
            }
        });
        $("#iscroll").scrollTop($(this).position().top + $("#iscroll").scrollTop())
    });
    $(document).on("click", ".alpom2_copy", function (event) {
        if (is_grabbing == true) return false;
        event.stopPropagation();
        var c = event.currentTarget.parentNode.childNodes;
        var i;
        for (i = 0; i < c.length; i++) {
            if (c[i].className != null) {
                if (c[i].className.indexOf("selected") != -1) {
                    select_all_and_copy(c[i],"select_img_link",null);
                }
            }
        }
    });
    $(document).on("click", ".select_txt", function (event) {
        event.preventDefault();
        event.stopPropagation();
        whol_text_selected = true;
        if (is_grabbing == true) return false;
        $('.tooltiptext').hide();
        $('.tooltiptext2').hide();
        $('.tooltiptext3').hide();
        $('.tooltiptext4').hide();
        $('.tooltiptext5').hide();
        var c = event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes;
        var i;
        for (i = 0; i < c.length; i++) {
            //alert(c[i].className);
            if (c[i].className != null) {
                if (c[i].className.indexOf("posttext") != -1) {
                    select_all_and_copy(c[i],"select_post",null);
                }
            }
        }
    
	$('.menue_list').hide();
	
	});
	
	
	
	
	
	$(document).on("click", ".select_link", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Find the post element
    var post = event.currentTarget.closest('.post');

    // Get the href attribute of the anchor tag within the post
    var hrefValue = $(post).find(".move.md a");

	if(hrefValue){
	select_all_and_copy(hrefValue,"post_link",null);
    }
	
	

    // Hide the menu list
    $('.menue_list').hide();
});

	$(document).on("click", ".select_post_code", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Find the post element
    var post = event.currentTarget.closest('.post');

    // Get the href attribute of the anchor tag within the post
    var hrefValue = $(post).find(".move.md a");

    if(hrefValue){
	select_all_and_copy(hrefValue,"post_code",null);
    }
	
	
	

    // Hide the menu list
    $('.menue_list').hide();
});




	
	$(document).on("click", ".select_post_num", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Find the post element
    var post = event.currentTarget.closest('.post');

    // Get the href attribute of the anchor tag within the post
    var hrefValue = $(post).find(".move.md a");
    if(hrefValue){
	select_all_and_copy(hrefValue,"post_num",null);
    }
	

    // Hide the menu list
    $('.menue_list').hide();
});



	
	
	
	
    $(document).on("click", ".txt_resize", function (event) {
        if (is_grabbing == true) return false;
        event.preventDefault();
        event.stopPropagation();
        $('.tooltiptext5').hide();
		$('.menue_list').hide();
        $("#myDropdown").hide();
        $('.hide_external_link').hide();
        $(event.currentTarget).focus();
        $(event.currentTarget).children('.tooltiptext5').show();
        $(".selected").unbind("click");
        $(".selected").addClass('selected enableselect');
        $(".tooltiptext_custom").remove();
    });
	
	  $(document).on("click", ".menue_plus", function (event) {
        if (is_grabbing == true) return false;
        event.preventDefault();
        event.stopPropagation();
        $('.tooltiptext5').hide();
        $('.menue_list').hide();
       $(event.currentTarget).children('.menue_list').show();
	   
	    $(".selected").unbind("click");
        $(".selected").addClass('selected enableselect');
        $(".tooltiptext_custom").remove();

	 });
	
	
	
    $(document).on("click", ".resetMe", function (event) {
        if (is_grabbing == true) return false;
        fontSize = null;
        $(event.currentTarget).parent().parent().parent().parent().parent().parent().parent().children('.posttext').removeAttr("style")
    });
    $(document).on("click", ".increase", function (event) {
        if (is_grabbing == true) return false;
        posttopid = $(event.currentTarget).parent().parent().parent().parent().parent().children('.posttop').attr('id')
        var posttext = $(event.currentTarget).parent().parent().parent().parent().parent().parent().parent().children('.posttext');
        if (posttext.css('font-size').indexOf("px") !== -1) {
            fontSize = ((parseFloat(posttext.css('font-size')) / parseFloat($('.post').css('font-size'))) * 100)
        } else {
            fontSize = parseFloat(posttext.css('font-size'))
        }
        fontSize = fontSize + 6;
        posttext.css('font-size', fontSize + "%");
    });
    $(document).on("click", ".decrease", function (event) {
        if (is_grabbing == true) return false;
        posttopid = $(event.currentTarget).parent().parent().parent().parent().parent().children('.posttop').attr('id')
        var posttext = $(event.currentTarget).parent().parent().parent().parent().parent().parent().parent().children('.posttext');
        if (posttext.css('font-size').indexOf("px") !== -1) {
            fontSize = ((parseFloat(posttext.css('font-size')) / parseFloat($('.post').css('font-size'))) * 100)
        } else {
            fontSize = parseFloat(posttext.css('font-size'))
        }
        fontSize = fontSize - 6;
        posttext.css('font-size', fontSize + "%");
    });
    $(".alpom2_go").on('click', function (event) {
        if (is_grabbing == true) return false;
        event.stopPropagation();
        $(this).attr("target", "_blank");
        if (typeof Androidd !== 'undefined') {
            event.preventDefault();
            var href = this.href;
            var target = $(this).attr("target");
            var className = $(this).attr("class");
            if (href.indexOf('file:///') > -1) {
                Androidd.go_ext(href, "local");
            } else {
                Androidd.go_ext(href, "null");
            }
        }
    });
    $(document).on("click", ".img_alpom , .img_link", function (event) {
        if ($(this).hasClass("link_off")) return false;
        if (is_grabbing == true) return false;
        event.preventDefault();
        event.stopPropagation();
        if (window.location != window.parent.location) {
            $.postMessage('{"eventname":"show_img", "url":"' + this.href + '"}', // The message to send (string)
                "*", // The host of the target window (i.e. http://www.vistaprint.com)
                parent // A reference to the target window
            );
        } else {
            if ($("#show_img").length == 0) {
                $('body').append(' <div id="show_img" class="show_img"><a class="down" onclick="down()"></a><span class="close"></span><div class="modal-content"><img id="img01" alt="" name="img01" draggable="false" src=' + this.href + '></div></div>');
            }
        }
    });
    $(document).on("click", ".close", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $("#show_img").remove();
    });
    $(document).on("click", ".show_img", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
    $(window).on('hashchange', function (e) {
        //alert(location.hash);
    });
    $(document).on("click", ".btn_print", function (event) {
        if (is_grabbing == true) return false;
        event.preventDefault();
        event.stopPropagation();
        var c = $(event.currentTarget).parent().parent().parent().parent().parent().parent().parent();
        if ($("#overlay_print").length == 0) {
            $("html").append('<div  id="overlay_print" onclick=""><div id="text">' + Printing_in_progress_Please_wait + '</div></div>');
            setTimeout(function () {
                $(".post").hide();
                $(".page-break").hide();
                c.show();
                print_this('part');
            }, 2000)
        }
    
	$('.menue_list').hide();
	
	});
    $(document).on("click", "a", function (event) {
    event.preventDefault();

    var $this= $(this);

   if (is_grabbing == true) return false;

if($this.hasClass("img_alpom") || $(this).hasClass("img_link")|| $(this).hasClass("dropdown-item")){
        return false;
        }
        

            
        if ($this.attr('href') == undefined) {
            return false;
        }
		
		
		
		
		if ( $(this).attr('target') == '_blank') {
           
           //alert($(this).attr('href'));
          // window.open($(this).attr('href'), '_blank');

         if(typeof is_ios_app != 'undefined') {

          var obj = {event: "open_link", arg: $(this).attr('href')};
          window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));

        }


    }
		
		
		
		
		
		
		
		
		

        if ($this.attr('id') == "help") {
        
            event.preventDefault();
            go_help_page($this);
            
            return false;
        }
        





     /*$.postMessage('{"eventname":"loader", "hide":"false"}', // The message to send (string)
                        "*", // The host of the target window (i.e. http://www.vistaprint.com)
                        parent // A reference to the target window
                    );*/
     


setTimeout(function () {







    

var hrefLocation = canonicalize($this.attr('href'));
        

                if(window.location.toString().split(/[?#]/)[0] == hrefLocation.split(/[?#]/)[0] && hrefLocation.indexOf('#post') != -1){
                        event.preventDefault();

                         

                                 $.postMessage('{"eventname":"passurl", "url":"' + hrefLocation + '"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );

window.location.hash  ='#'+hrefLocation.split(/[#]/)[1];

 go_hash(hrefLocation.split(/[#]/)[1]);


        }else
        if (islocal(hrefLocation)) {

$("#loading", window.parent.document).show();
            if (window.location != window.parent.location) {
                

$.postMessage('{"eventname":"passurl", "url":"' + hrefLocation + '"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );






                
            } else {
                if (hrefLocation.indexOf('#post') == -1) {
                    document.getElementById("loading").style.display = 'block';
                }
                var rhsearch = getParameterByName("rhsearch", window.location);
                var time_code = getParameterByName("time", window.location);
                if (!time_code) {
                    time_code = time;
                }
                if (rhsearch) {
                    event.preventDefault();
                    if (hrefLocation.indexOf('#') != -1) {
                        var hrefLocation_before_hash = hrefLocation.split('#')[0];
                        var hrefLocation_after_hash = hrefLocation.split('#')[1];
                        setTimeout(function () {
                            

window.location = hrefLocation_before_hash + "?rhsearch=" + rhsearch + "&time=" + time_code.replace("?time=", "") + "#" + hrefLocation_after_hash;
                        }, 100);
                    } else {
                        setTimeout(function () {
                            window.location = hrefLocation + "?rhsearch=" + rhsearch + time.replace("?", "&");
                        }, 0);
                    }
                } else {
                    event.preventDefault();
                    if (hrefLocation.indexOf('#') != -1) {
                        var hrefLocation_before_hash = hrefLocation.split('#')[0];
                        var hrefLocation_after_hash = hrefLocation.split('#')[1];
  

setTimeout(function () {
                            window.location = hrefLocation_before_hash + "?time=" + time_code.replace("?time=", "") + "#" + hrefLocation_after_hash;
                        }, 0);
                    } else {
                        setTimeout(function () {
                            window.location = hrefLocation + time;
                        }, 0);
                    }
                }
                
                if (hrefLocation.indexOf('#post') != -1) {
                    
              
              setTimeout(function () {
                    
              save_Setting("currPATH", window.location.toString().split('app/').pop(), "all");
                        }, 0);
              
              
                }
                
                
            }
        } else {
    
//$("#loading", window.parent.document).hide();

           if(!$this.hasClass("link_pic2")){
var href = $this.attr("href");
            if (typeof Androidd !== 'undefined') {
                event.preventDefault();
                
                Androidd.go_ext(href, "null");
                return false;
            }
else{
 window.open(href);

}
            







              }
        



}













}, 100);




    });
    
    

	
	
    
   $(".no_teleport_follow")
   .each(function()
   {
       this.href = $(this).get(0).id;
   });
    




    
    $(window).on("message", function (e) {
        if (!e.data) {
            return false;
        }
        var data = JSON.parse(e.data);
        
		if (data.eventname == 'render') {
        
	//var cool = document.documentElement.innerHTML;

// Clear the HTML content of the <html> element
$("#iscroll").css("overflow-y","hidden");
//$("html").hide();
//document.documentElement.innerHTML = "";

// Set the HTML content back after a delay (e.g., 100 milliseconds)
setTimeout(function () {
    //document.documentElement.innerHTML = cool;
	//$("html").show();
	$("#iscroll").css("overflow-y","auto");
}, 0);
        }
		
		if (data.eventname == 'apply_hit') {
            hit_id = data.hit;
            StartHighLightSearch();
        }
        if (data.eventname == 'go_hash') {
            hash = data.hash;
		 go_hash(hash);
        }
        if (data.eventname == 'next_prev') {
            next_prev(data.dir);
        }
        if (data.eventname == 'modify_element') {
            $(data.element).html(b64_to_utf8(data.value));
        }
        if (data.eventname == 'save_Setting') {
            if (data.action == 'hashtags') {
                save_Setting(data.action, b64_to_utf8(data.state), "all");
                $(data.element).html(b64_to_utf8(data.state));
            } else {
                save_Setting(data.action, data.state, "all");
            }
        }
        if (data.eventname == 'is_window_visible_respond') {
            if (data.visible == 'yes') {
                is_window_visible = true;
                whol_text_selected = false;
            } else {
                is_window_visible = false;
                whol_text_selected = false;
            }
        }
        if (data.eventname == 'print') {
            if ($("#overlay_print").length == 0) {
                $("html").append('<div  id="overlay_print" onclick=""><div id="text">' + Printing_in_progress_Please_wait + '</div></div>');
                setTimeout(function () {
                
				if(enable_help){
				$("html").append('<div class ="frt" id="overlay_print"><center><br><br><img  src="'+rootpath+'clientscript/images/help/print.png" width="220" height="220"></center></div>');
				}
				else{
				 print_this('part');

				}


                }, 2000)
            }
        }
        if (data.eventname == 'reload') {
            location.reload();
        }
        if (data.eventname == 'zoomer_text') {
            if (data.state == 'zoon_in') {
                if (currsize <= 300) {
                    var gg = $('#wrapper')[0].style.fontSize;
                    if (gg.indexOf("px") !== -1) {
                        fontSize = ((parseFloat($('#wrapper')[0].style.fontSize) / parseFloat($('.post,.pagebody').css('font-size'))) * 100);
                    } else {
                        fontSize = parseFloat($('#wrapper')[0].style.fontSize);
                    }
                    currsize = currsize + 6;
                    fontSize = fontSize + 6;
                    save_Setting('currsize', currsize, 'all');
                    $('#wrapper').css('font-size', fontSize + "%");
                }
           
checkScrollbarOnResize();
		   }
            if (data.state == 'zoon_out') {
                if (currsize >= -100) {
                    var gg = $('#wrapper')[0].style.fontSize;
                    if (gg.indexOf("px") !== -1) {
                        fontSize = ((parseFloat($('#wrapper')[0].style.fontSize) / parseFloat($('.post,.pagebody').css('font-size'))) * 100);
                    } else {
                        fontSize = parseFloat($('#wrapper')[0].style.fontSize);
                    }
                    currsize = currsize - 6;
                    fontSize = fontSize - 6;
                    save_Setting('currsize', currsize, 'all');
                    $('#wrapper').css('font-size', fontSize + "%");
                }
           checkScrollbarOnResize();

		   }
            if (data.state == 'zoon_RESET') {
                currsize = 0;
                fontSize = 0;
                save_Setting('currsize', currsize, 'all');
                updateFontFamily(false);
				checkScrollbarOnResize();
            }
        }
        if (data.eventname == 'highlight') {
            if (data.state == 'true') {
                StartHighLightSearch(true);
            } else {
                $('em').contents().unwrap();
                $('em:empty').remove();
                setTimeout(function () {
                    $.postMessage('{"eventname":"loader", "hide":"true"}', // The message to send (string)
                        "*", // The host of the target window (i.e. http://www.vistaprint.com)
                        parent // A reference to the target window
                    );
                }, 100)
            }
        }
        if (data.eventname == 'random_signature') {
            if (data.state == 'show') {
                $(".randomnumber").removeClass("random_hidden");
            } else {
                $(".randomnumber").addClass("random_hidden");
            }
            setTimeout(function () {
                $.postMessage('{"eventname":"loader", "hide":"true"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            }, 100)
        }
        
        if (data.eventname == 'vid_source_link') {
            if (data.state == 'show') {
                $('.vid_med').show();
				$('.media').show();
            } else {
              
				
				
				
				if(!enable_help){
					
					
				if (read_Setting('vid_source_link', 'showen', 'all') === 'hidden' &&
    read_Setting('aud_source_link', 'showen', 'all') === 'hidden') {
    $('.media').hide();
	$('.vid_med').hide();
	$('.aud_med').hide();
                }
				else{
					  $('.vid_med').hide();
				}
				
					
				}
				else{
					
					
						     $('#tooltip_vid').hide();
				var vid =  document.getElementsByClassName("vid_med")[0];
				console.log(vid);
				
				var container = document.getElementById("iscroll");
				scroll_to_element(container,vid,"smooth","start");
                 
				  
				        setTimeout(function () {
             
			  $('#tooltip_vid').show();
			   
			   $('#tooltip_vid').css('opacity', 1);
			   


			   $('#tooltip_vid').html("<center>"+vid_remove+"</center>");
                $('.vid_med').css({
  'border-style': 'solid',
  'border-color': 'red'
});

$('.vid_med').css('box-shadow', '0 0 10px 2px red');

			  setTimeout(function () {
              $('#tooltip_vid').css('opacity', 0);
			 setTimeout(function () {
              $('#tooltip_vid').hide();
			
			
			}, 200)
			  setTimeout(function () {
               $('.vid_med').hide();
			       
			
			
			}, 500)
			
			}, 3000)
			
			}, 1000)
				
				
				
				
				}
				
				
				
		
				
				
				
				
				
				
				
            }


//show_hide_star_note();
            setTimeout(function () {
                $.postMessage('{"eventname":"loader", "hide":"true"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            }, 100)
        }
        
		
		 if (data.eventname == 'aud_source_link') {
            
			
			if (data.state == 'show') {
                $('.aud_med').show();
				$('.media').show();
            } else {
               
				
				
				
				
				if(!enable_help){
					if (read_Setting('vid_source_link', 'showen', 'all') === 'hidden' &&
    read_Setting('aud_source_link', 'showen', 'all') === 'hidden') {
    $('.media').hide();
	$('.vid_med').hide();
	$('.aud_med').hide();
                }
				else{
					 $('.aud_med').hide();
				}
				}
				else{
					
					
					
						     $('#tooltip_aud').hide();
				var aud =  document.getElementsByClassName("aud_med")[0];
				console.log(thread);
				
				var container = document.getElementById("iscroll");
				scroll_to_element(container,aud,"smooth","start");
                 
				  
				        setTimeout(function () {
             
			  $('#tooltip_aud').show();
			   
			   $('#tooltip_aud').css('opacity', 1);
			   


			   $('#tooltip_aud').html("<center>"+aud_remove+"</center>");
                $('.aud_med').css({
  'border-style': 'solid',
  'border-color': 'red'
});

$('.aud_med').css('box-shadow', '0 0 10px 2px red');

			  setTimeout(function () {
              $('#tooltip_aud').css('opacity', 0);
			 setTimeout(function () {
              $('#tooltip_aud').hide();
			
			
			}, 200)
			  setTimeout(function () {
               $('.aud_med').hide();
			       
			
			
			}, 500)
			
			}, 3000)
			
			}, 1000)
			
			
			
					
					
					
				}
	
			
			
			}


//show_hide_star_note();
            setTimeout(function () {
                $.postMessage('{"eventname":"loader", "hide":"true"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            }, 100)
        }
		
		
        
        
        if (data.eventname == 'thread_source_link') {
            if (data.state == 'show') {
                $('.move:eq(0)').show();
            } else {
              
				if(!enable_help){
					$('.move:eq(0)').hide();
				
		
				
				
				}else{
				
     $('#tooltip_thread').hide();
				var thread =  document.getElementsByClassName("move")[0];
				console.log(thread);
				
				var container = document.getElementById("iscroll");
				scroll_to_element(container,thread,"smooth","start");
                 
				  
				        setTimeout(function () {
             
			  $('#tooltip_thread').show();
			   
			   $('#tooltip_thread').css('opacity', 1);
			   


			   $('#tooltip_thread').html("<center>"+thead_remove+"</center>");
                $('.move:eq(0)').css({
  'border-style': 'solid',
  'border-color': 'red'
});

$('.move:eq(0)').css('box-shadow', '0 0 10px 2px red');

			  setTimeout(function () {
              $('#tooltip_thread').css('opacity', 0);
			 setTimeout(function () {
              $('#tooltip_thread').hide();
			
			
			}, 200)
			  setTimeout(function () {
               $('.move:eq(0)').hide();
			       
			
			
			}, 500)
			
			}, 3000)
			
			}, 1000)
			

				
				}
				
				
				
				
				
				
				
				
				
            }


show_hide_star_note();
            setTimeout(function () {
                $.postMessage('{"eventname":"loader", "hide":"true"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            }, 100)
        }
        if (data.eventname == 'source_of_the_statement') {
            if (data.state == 'show') {
                $('.move.md').show();
            } else {
               
            
			
			if(!enable_help){
				 $('.move.md').hide();
			
		
			
			}
			else{
				
				
					   $('#tooltip_post').hide();
				var post =  document.getElementsByClassName("md")[0];
				console.log(post);
				
				var container = document.getElementById("iscroll");
				scroll_to_element(container,post,"smooth","start")
                 
				  
				        setTimeout(function () {
             
			  $('#tooltip_post').show();
			   
			   $('#tooltip_post').css('opacity', 1);
			   


			   $('#tooltip_post').html("<center>"+post_remove+"</center>");
                $('.move.md').css({
  'border-style': 'solid',
  'border-color': 'red'
});

$('.move.md').css('box-shadow', '0 0 10px 2px red');

			  setTimeout(function () {
              $('#tooltip_post').css('opacity', 0);
			 setTimeout(function () {
              $('#tooltip_post').hide();
			
			
			}, 200)
			  setTimeout(function () {
               $('.move.md').hide();
			       
			
			
			}, 500)
			
			}, 3000)
			
			}, 1000)
			
			
			
				
				
				
			}
			
		
			
			}
            show_hide_star_note();


setTimeout(function () {
                $.postMessage('{"eventname":"loader", "hide":"true"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            }, 100)
        }
        if (data.eventname == 'links_translations') {
            if (data.state == 'show') {
                $('.language').show();
            } else {
                
				
				if(!enable_help){
					   $('.language').hide();
				}
				else{
					
					
						$('#tooltip_lang').hide();
				var language =  document.getElementsByClassName("language")[0];
				console.log(language);
				
				var container = document.getElementById("iscroll");
				scroll_to_element(container,language,"smooth","start");
                 
				  
				        setTimeout(function () {
             
			  $('#tooltip_lang').show();
			   
			   $('#tooltip_lang').css('opacity', 1);
			   


			   $('#tooltip_lang').html("<center>"+lang_remove+"</center>");
                $('.language').css({
  'border-style': 'solid',
  'border-color': 'red'
});

$('.language').css('box-shadow', '0 0 10px 2px red');

			  setTimeout(function () {
              $('#tooltip_lang').css('opacity', 0);
			 setTimeout(function () {
              $('#tooltip_lang').hide();
			
			
			}, 200)
			  setTimeout(function () {
               $('.language').hide();
			       
			
			
			}, 500)
			
			}, 3000)
			
			}, 1000)
					
					
				}
				
				
				
				
				
			
			
			
			}
            
show_hide_star_note();

                       setTimeout(function () {
                $.postMessage('{"eventname":"loader", "hide":"true"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            }, 100)
        }
        if (data.eventname == 'do_scroll') {
            if (data.dir == 'down') {
                $('#iscroll').scrollTop($("#iscroll")[0].scrollHeight);
            } else {
                $('#iscroll').scrollTop(0);
            }
            setTimeout(function () {
                $.postMessage('{"eventname":"loader", "hide":"true"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            }, 100)
        }
        
        if (data.eventname == 'afterPrint') {
        
                 afterPrint();
        }
        
        
    });
    if (_isMobile() == mobiletrue || (typeof is_ios_app != 'undefined')) {
       var lamp;
	   var lamp_active;
if (read_Setting("lamp", "off", "all") == "on") {
	lamp =  lamp_on_icon;
	lamp_active = "lamp_active";
}
else{
	
	lamp =  lamp_off_icon;
	lamp_active = "";
}

 	   $("html").append('<a title = "' + Move_the_page_for_automatic_reading + '" onclick="read_page(event);" id ="read"><img  width="29px" src="' + read_icon + '"/></a>');
   
	  
if (typeof Androidd !== 'undefined') {
	  $("html").append('<a class ="'+lamp_active+'"title = "' + wakup_mobile + '" onclick="wakeup_page(event);" id ="lamp"><img width="29px" src="' + lamp + '"/></a>');
}
	

	
	} else {
        $("html").append('<a title = "' + Move_the_page_for_automatic_reading + '" onclick="read_page(event);" id ="read"><img  width="29px" src="' + read_icon + '"/></a><a title = "' + Move_the_page_with_the_mouse_cursor + '" onclick="grap_page()" id ="hand"><img  width="29px" src="' + hand_icon + '"/></a>');
        if (read_Setting("grab", "false", "web") == "true") {
            grap_page();
        }
    }
    $("#iscroll").append('<div class="selectFontFamily disableselect" >' + Change_font_type + '<br><select  id="selectFontFamily" name="selectFontFamily" onchange="updateFontFamily(true);"><option>Lateef</option><option>Amiri</option><option>Droid Arabic Naskh</option><option>Scheherazade</option><option>Arial</option></select><div>')
    
    
    $("#iscroll").append('<div class="disableselect dropdown" unselectable="off" onclick="toggleDropdown()">'+ 
	
	'<div class="tit_domain">'+
	Change_the_domain_of_links+ "<br>"+
	'</div>'+
    
	
	' <button class="dropdown-button">' + Change_the_domain_of_links +'</button>'+
    '</div>');
    
    
    
    $("#iscroll").append('<div class ="hashtag" ><button  class="select_all disableselect" onclick="show_hashtag(event);">' + hashtag_settings + '</button></div>');
    $("#iscroll").append('<div class ="select_all_butt" ><button class="select_all disableselect" onclick="copy_all(event);">' + Select_and_copy_the_page + '</button></div>');
    $("#iscroll").append('<div class="footer disableselect" unselectable="off"><span id="copyright" unselectable="off" class="disableselect">' + copy_rights + '</span><br><br></div>')
    
    updateFontFamily(false);
    update_domain(false);
    view_image_while_scroll();
    run_select_text();
    $.postMessage('{"eventname":"is_window_visible"}', // The message to send (string)
        "*", // The host of the target window (i.e. http://www.vistaprint.com)
        parent // A reference to the target window
    );
    var doit;
    window.onresize = function () {
        clearTimeout(doit);
        doit = setTimeout(resizedone, 100);
    };




    if (window.location == window.parent.location) {
        
        
        if(typeof is_ios_app != 'undefined') {
          var obj = {event: "view_state", arg: "hide"};
          window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
        }
        
        
    }



grab(".page_nav", "grab", "x");



checkScrollbarOnResize();


 window.addEventListener('resize', function() {
        checkScrollbarOnResize();
    });




setTimeout(function () {
if($(".page_nav").length!=0){
  $(".page_nav").scrollCenter(".actual", 0);	
}
 

    }, 200);

initTopicLoad();

    });
 









 
//here
$(document).on("click", ".frt", function (event) {
            event.stopPropagation();

		$(this).remove();
		
		afterPrint("");
  
});


});



function resizedone() {
    show_bar();
}

function show_bar() {
    if (window.location == window.parent.location) {
        if ($("#header_topic").length > 0) {
           /* var dir = get_scroll_pos_and_width($('#iscroll')[0]);
            if (dir[0] == "right") {
                $("#header_topic").css("right", dir[1] + 'px');
            } else if (dir[0] == "left") {
                $("#header_topic").css("left", dir[1] + 'px');
            } else {
                scrollWidth = 0;
                $("#header_topic").css("right", dir[1] + 'px');
                $("#header_topic").css("left", dir[1] + 'px');
            }*/
            return false;
        }
        $("#pagebody").addClass("margin-top");
		
		
        var style_list = '' + 
		'<div id="myDropdown" style="display:none;" dir="rtl" class="dropdown-content disableselect show" unselectable="on">' + 
'  <a onclick="Redirect(\'0\')" unselectable="on" class="disableselect">' + Go_to_login_page + '</a>' + 



'  <a onclick="Redirect(\'1\')" unselectable="on" class="disableselect">' + ios_style + '</a>' + 


'  <a onclick="Redirect(\'2\')" unselectable="on" class="disableselect">' + andro_style + '</a>' + 


'  <a onclick="Redirect(\'3\')" unselectable="on" class="disableselect">' + jquery_style + '</a>' + 


'  <a onclick="Redirect(\'4\')" unselectable="on" class="disableselect">' + adobe_style + '</a>' + 

'</div>' + '';
        if (read_Setting('NDmode', "day", 'all') == "night") {
            night_day_img = '' + rootpath + 'clientscript/images/tools/mode_D.png';
        }
        if (read_Setting('NDmode', "day", 'all') == "night") {
            night_day_img = '' + rootpath + 'clientscript/images/tools/mode_D.png';
        }
        if (read_Setting('Strip_tashkeel', "off", 'all') == "on") {
            tashkeel_img = '' + rootpath + 'clientscript/images/tools/tashkeelon.png';
        }
        var header_buttons = '' + '<button  id="dropbtn" class="dropbtn disableselect" unselectable="on"><b>' + choose + '</b></button>' + '<button id="tashkeel" onclick="Remove_diacritics()" title="' + Remove_or_Add_diacritics + '" unselectable="on" class="disableselect">' + '  <img height="13" width="13" src=' + tashkeel_img + ' unselectable="on" class="disableselect">' + '</button>' + '<button id="ndmode" onclick="toggleNDmode()" title="' + Day_or_Night_mode + '"  unselectable="on" class="disableselect">' + '  <img height="13" width="13" src=' + night_day_img + ' unselectable="on" class="disableselect">' + '</button>' + '<button id="fullscreenidcon" onclick="full_screen()" title="' + Full_screen_mode + '"  unselectable="on" class="disableselect">' + '  <img id="fullscreenid" height="13" width="13" src=' + fullscreen_img + ' unselectable="on" class="disableselect">' + '</button><br>' + style_list+'';
        
		
		
		var scrollWidth = $('#iscroll')[0].offsetWidth - $('#iscroll')[0].clientWidth;
        var dir = get_scroll_pos_and_width($('#iscroll')[0]);
       /* if (dir[0] == "right") {
            $("html").append('' + '<div style="right:' + scrollWidth + 'px; left:0px;" class="header_topic disableselect" id="header_topic" unselectable="on">' + '  <img onclick="main_page_index()" class="header_img disableselect" src="' + rootpath + 'clientscript/images/generic/noon.png" height="25" width="25" unselectable="on">' + header_buttons + '</div>\'' + '');
        } else if (dir[0] == "left") {
            $("html").append('' + '<div style="left:' + scrollWidth + 'px; right:0px;" class="header_topic disableselect" id="header_topic" unselectable="on">' + '  <img onclick="main_page_index()" class="header_img disableselect" src="' + rootpath + 'clientscript/images/generic/noon.png" height="25" width="25" unselectable="on">' + header_buttons + '' + '</div>' + '');
        } else {
            scrollWidth = 0;
            $("html").append('' + '<div style="left:' + scrollWidth + 'px; right:0px;" class="header_topic disableselect" id="header_topic" unselectable="on">' + '  <img onclick="main_page_index()" class="header_img disableselect" src="' + rootpath + 'clientscript/images/generic/noon.png" height="25" width="25" unselectable="on">' + header_buttons + '' + '</div>' + '');
        }*/
		
		   $("html").append('' + '<div style="left:15px; right:15px;" class="header_topic disableselect" id="header_topic" unselectable="on">' + '  <img onclick="main_page_index()" class="header_img disableselect" src="' + rootpath + 'clientscript/images/generic/noon.png" height="25" width="25" unselectable="on">' + header_buttons + '' + '</div>' + '');
		
		
        $(document).on("click", "#dropbtn", function (event) {
            event.stopPropagation();
            if (is_grabbing == true) return false;
            $('.tooltiptext5').hide();
			$('.menue_list').hide();
            $("#myDropdown").toggle();
        });
        var previousScroll = $("#iscroll").scrollTop();
        $('#iscroll').scroll(function () {
            var currentScroll = $(this).scrollTop();
			//console.log(currentScroll);
            if (currentScroll > previousScroll && currentScroll > 500) {
                if (!$('.header_topic').is(':animated')) {
                    $("#myDropdown").hide();
                    $('.header_topic').addClass("fadout").removeClass("fadein");
                }
            } else if (currentScroll < previousScroll) {
                //if (!$('.header_topic').is(':animated') || currentScroll <100) {
                if (scrolling == true) {
                    $('.header_topic').addClass("fadein").removeClass("fadout");
                }
            }
            previousScroll = currentScroll;
        });
    }
}
/*
function openNav(){
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("con_bar").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("con_bar").style.width = "27px";
}
   */
function pageScroll() {
    var elemnt = document.getElementById("iscroll");
    elemnt.scrollTop += 1.1;
    scrolldelay = setTimeout('pageScroll()', 60); // scrolls every 100 milliseconds
}

function read_page(e) {
    e.preventDefault();
    if ($("#read").attr('class') == 'read_active') {
        clearTimeout(scrolldelay);
        $("#read").attr("class", '');
    } else {
        $("#read").attr("class", 'read_active');
        pageScroll();
    }
}


function wakeup_page(e) {
    e.preventDefault();
    if ($("#lamp").attr('class') == 'lamp_active') {

        $("#lamp").attr("class", '');

		 save_Setting("lamp", "off", "all");
		 $("#lamp img").attr("src", lamp_off_icon);
		 
		 Androidd.wakeup("false");
		
    } else {
        $("#lamp").attr("class", 'lamp_active');
		save_Setting("lamp", "on", "all");
		$("#lamp img").attr("src", lamp_on_icon);
		
		Androidd.wakeup("true");
     
    }
}




function disable_grap() {
    //$("img,a:not(#read,#hand,#myDropdown a)").attr('draggable',true);
    $("#hand img").attr("src", hand_icon);
    $("img,a,html").unbind("dragstart selectstart");
    $("html").unbind("mousemove").unbind("mousedown").unbind("mouseup");
    $("#iscroll").unbind("mousemove").unbind("mousedown").unbind("mouseup");
    $("#iscroll").removeClass("grabbable");
	
	$(".post_content").unbind("mousemove").unbind("mousedown").unbind("mouseup");
    $(".post_content").removeClass("grabbable");
	
	
    save_Setting("grab", "false", "web");
}

function enable_grap() {
    $("#hand img").attr("src", hand2_icon);
    $("img,a,html").bind('dragstart selectstart', function (e) {
        e.preventDefault();
        return false;
    });
    save_Setting("grab", "true", "web");
    grab2("#iscroll", "grab", "y");
	grab2(".post_content", "grab", "y");
}

function grap_page() {
    if ($("#hand img").attr("src") == hand_icon) {
        enable_grap();
    } else {
        disable_grap();
    }
}

function next_prev(dir) {
    if (post_array.length >= "1") {
        $.postMessage('{"eventname":"loader", "hide":"false"}', // The message to send (string)
            "*", // The host of the target window (i.e. http://www.vistaprint.com)
            parent // A reference to the target window
        );
        var loc = document.location.toString();
        loc = removeParam("random", loc);
        loc = removeParam("rhsearch", loc);
        loc = removeParam("hit", loc);
        loc = removeParam("rhsyns", loc);
        loc = removeParam("rhhlterm", loc);
        loc = removeParam("time", loc);
		loc = removeParam("post_id", loc);
        loc = loc.split('#')[0];
        if (current_hash.indexOf("post") == -1) {
            if (dir == "next") {
                $.postMessage('{"eventname":"passurl", "url":"' + loc + '#' + anchor[0] + '"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            } else {
                var last = anchor.length
                $.postMessage('{"eventname":"passurl", "url":"' + loc + '#' + anchor[last - 1] + '"}', // The message to send (string)
                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                    parent // A reference to the target window
                );
            }
        } else {
            var hash = current_hash;
            for (var i = 0; i < anchor.length; i++) {
                if (anchor[i] == hash) {
                    if (dir == "next") {
                        post_count = i + 1;
                    } else {
                        post_count = i - 1;
                    }
                    if (anchor[post_count] != undefined) {
                        //document.location = loc + '#' + anchor[post_count];
                        $.postMessage('{"eventname":"passurl", "url":"' + loc + '#' + anchor[post_count] + '"}', // The message to send (string)
                            "*", // The host of the target window (i.e. http://www.vistaprint.com)
                            parent // A reference to the target window
                        );
                    } else {
                        if (dir == "next") {
                            $.postMessage('{"eventname":"passurl", "url":"' + loc + '#' + anchor[0] + '"}', // The message to send (string)
                                "*", // The host of the target window (i.e. http://www.vistaprint.com)
                                parent // A reference to the target window
                            );
                        } else {
                            var last = anchor.length
                            if (window.location != window.parent.location) {
                                $.postMessage('{"eventname":"passurl", "url":"' + loc + '#' + anchor[last - 1] + '"}', // The message to send (string)
                                    "*", // The host of the target window (i.e. http://www.vistaprint.com)
                                    parent // A reference to the target window
                                );
                            }
                        }
                    }
                }
            }
        }
    }
}

function go_hash(hash) {
	current_hash = hash;
    $('.posttop').removeClass("sectionH");
    $("#" + hash).addClass("sectionH");

if ($("#" + hash).length > 0) {

style_type = read_Setting("style_type", "jq", "all");
 
if(style_type == "ios"){
var container = document.getElementById("iscroll");
var element = $("#" + hash)[0];

scroll_to_element(container,element,"auto","start");
}
else if(style_type == "andro"){
var container = document.getElementById("iscroll");
var element = $("#" + hash)[0];

scroll_to_element(container,element,"auto","start");	
}
else if(style_type == "jq"){
seamless.polyfill();
seamless.elementScrollIntoView($("#" + hash)[0], {
       behavior: 'auto',
	   block: 'start',
       inline:'end'
    });		
}
else{
seamless.polyfill();
seamless.elementScrollIntoView($("#" + hash)[0], {
       behavior: 'auto',
	   block: 'start',
       inline:'end'
    });	



}


setTimeout(function () {

    $.postMessage('{"eventname":"loader", "hide":"true"}', // The message to send (string)
        "*", // The host of the target window (i.e. http://www.vistaprint.com)
        parent // A reference to the target window
    );
	
	$("#loading").hide();
	
    }, 0);
 

 
}





}

var res, path,pageName;

function Redirect(value) {
    pageName =  window.location.toString();
    
    
    if (value === "0") {
  
 if(document.getElementById("loading"))
             document.getElementById("loading").style.display = 'block';
  
   	
	
  
  if (window.location != window.parent.location) {       


var url_string =  window.parent.location.toString()
		
		
	       var before_hash = "";
	       var hash ="";
	       var path =""; 
	     
	      if(url_string.indexOf('%23') !== -1){
	          before_hash = url_string.substring(0, url_string.indexOf('%23'));
	          hash ="%23" +url_string.split("%23")[1];
	          before_hash =  before_hash.replace("main.html", "index.html");
	         
	          
	          path = before_hash+ hash;
	      }
	      else{
	      
	      
	          
	           url_string =  url_string.replace("main.html", "index.html");
	      	  path = url_string;
	      }
	
				
	

$.postMessage('{"eventname":"redirect" , "url":"' + utf8_to_b64( path+"&show_lang") +'"}', // The message to send (string)
                "*", // The host of the target window (i.e. http://www.vistaprint.com)
                parent // A reference to the target window
            );
        } 
		
		else {
            
			
			pageName = removeParam('time', pageName);
     

		if (pageName.indexOf("?") != -1) {
            res = "&" + pageName.split('?')[1];
        } else if (pageName.indexOf("#") != -1) {
            res = "#" + pageName.split('#')[1];
        } else {
            res = "";
        }
        save_Setting("style_type", "jq", "all");
        if (pageName.indexOf("mn.php.htm") != -1) {
           
        path = "#t=mn.php.htm" + encodeURIComponent(pageName.split('mn.php.htm')[1].replace("?", "&").replace(res, ""));
		
		} else {
             path = "#t=mn.php" + encodeURIComponent(pageName.split('mn.php')[1].replace("?", "&").replace(res, ""));
        }

			window.location = rootpath + "index.html"+path+res;
        }
 
  
  
  
  
  
  
  
  
  

    }
    if (value === "1") {
    pageName = removeParam('time', pageName);
        if(document.getElementById("loading"))
             document.getElementById("loading").style.display = 'block';
        if (pageName.indexOf("?") != -1) {
            res = "&" + pageName.split('?')[1];
        } else if (pageName.indexOf("#") != -1) {
            res = "#" + pageName.split('#')[1];
        } else {
            res = "";
        }
        save_Setting("style_type", "ios", "all");
        if (pageName.indexOf("mn.php.htm") != -1) {
			
			 path = "#t=mn.php.htm" + encodeURIComponent(pageName.split('mn.php.htm')[1].replace("?", "&").replace(res, ""));
        } else {
             path = "#t=mn.php" + encodeURIComponent(pageName.split('mn.php')[1].replace("?", "&").replace(res, ""));
        }
        
        window.location= rootpath + "main.html" + path + res.replace("#", "%23");
    }
    if (value === "2") {
    pageName = removeParam('time', pageName);
        if(document.getElementById("loading"))
             document.getElementById("loading").style.display = 'block';
        if (pageName.indexOf("?") != -1) {
            res = "&" + pageName.split('?')[1];
        } else if (pageName.indexOf("#") != -1) {
            res = "#" + pageName.split('#')[1];
        } else {
            res = "";
        }
        save_Setting("style_type", "andro", "all");
        if (pageName.indexOf("mn.php.htm") != -1) {
			
			 path = "#t=mn.php.htm" + encodeURIComponent(pageName.split('mn.php.htm')[1].replace("?", "&").replace(res, ""));
            
        } else {
           path = "#t=mn.php" + encodeURIComponent(pageName.split('mn.php')[1].replace("?", "&").replace(res, ""));
        }
        
        window.location = rootpath + "main.html" + path + res.replace("#", "%23");;
    }
	
	  if (value === "3") {
    pageName = removeParam('time', pageName);
        if(document.getElementById("loading"))
             document.getElementById("loading").style.display = 'block';
        if (pageName.indexOf("?") != -1) {
            res = "&" + pageName.split('?')[1];
        } else if (pageName.indexOf("#") != -1) {
            res = "#" + pageName.split('#')[1];
        } else {
            res = "";
        }
        save_Setting("style_type", "jq", "all");
        if (pageName.indexOf("mn.php.htm") != -1) {
			
			 path = "#t=mn.php.htm" + encodeURIComponent(pageName.split('mn.php.htm')[1].replace("?", "&").replace(res, ""));
            
        } else {
           path = "#t=mn.php" + encodeURIComponent(pageName.split('mn.php')[1].replace("?", "&").replace(res, ""));
        }
        
        window.location = rootpath + "main.html" + path + res.replace("#", "%23");;
    }
	  if (value === "4") {
    pageName = removeParam('time', pageName);
        if(document.getElementById("loading"))
             document.getElementById("loading").style.display = 'block';
        if (pageName.indexOf("?") != -1) {
            res = "&" + pageName.split('?')[1];
        } else if (pageName.indexOf("#") != -1) {
            res = "#" + pageName.split('#')[1];
        } else {
            res = "";
        }
        save_Setting("style_type", "adobe", "all");
        if (pageName.indexOf("mn.php.htm") != -1) {
			
			 path = "#t=mn.php.htm" + encodeURIComponent(pageName.split('mn.php.htm')[1].replace("?", "&").replace(res, ""));
            
        } else {
           path = "#t=mn.php" + encodeURIComponent(pageName.split('mn.php')[1].replace("?", "&").replace(res, ""));
        }
        
        window.location = rootpath + "main.html" + path + res.replace("#", "%23");;
    }
}







    function go_help_page(elem){
        
            
                
            if (window.location != window.parent.location) {

       $.postMessage('{"eventname":"loader", "hide":"false"}', // The message to send (string)
        "*", // The host of the target window (i.e. http://www.vistaprint.com)
        parent // A reference to the target window
       );
                 
        }
        else{
        if(document.getElementById("loading"))
             document.getElementById("loading").style.display = 'block';
                
        }


        
                
        setTimeout(function () {


    pageName = decodeURIComponent( parent.window.location.toString());
    pageName = removeParam('time', pageName);

        
        if (pageName.indexOf("?") != -1) {
            res = "&" + pageName.split('?')[1];
        } else if (pageName.indexOf("#") != -1) {
            res = "#" + pageName.split('#')[1];
        } else {
            res = "";
        }
        //save_Setting("style_type", "jq", "all");
        if (pageName.indexOf("mn.php.htm") != -1) {
            
			path = "#t=mn.php.htm" + pageName.split('mn.php.htm')[1].replace("?", "&").replace(res, "");
        } else {
            path = "#t=mn.php" + pageName.split('mn.php')[1].replace("?", "&").replace(res, "");
        }
        if (window.location != window.parent.location) {

                    parent.window.location = rootpath + "help.html" + path+time.replace(/\?/, '&');
        }
        else{

                parent.window.location = rootpath + "help.html" + path +time.replace(/\?/, '&')+ res.replace("#", "%23");
        }




    }, 100);
                
                
    
                
                
            
        
        }
        







function Remove_diacritics() {
    $("#loading").show();
    if (read_Setting('Strip_tashkeel', "off", 'all') == "off") {
        save_Setting('Strip_tashkeel', "on", 'all');
    } else {
        save_Setting('Strip_tashkeel', "off", 'all');
    }
    setTimeout(function () {
        location.reload();
    }, 100);
}

function toggleNDmode(elem) {
    $("#loading").show();
    if (read_Setting('NDmode', "day", 'all') == "day") {
        save_Setting('NDmode', "night", 'all');
        
        if(typeof is_ios_app != 'undefined') {

 var obj = {event: "cell_tag_1", arg: "on"};
 window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
       
}
        
        
    } else {
        if(typeof is_ios_app != 'undefined') {

 var obj = {event: "cell_tag_1", arg: "off"};
 window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
       
}
        
        
        save_Setting('NDmode', "day", 'all');
    }
    setTimeout(function () {
        location.reload();
    }, 100);
}

function full_screen() {
    toggle_full_screen($("html").get(0));
}

function remove_format(posttext) {
    $('.posttext u,.posttext b,.posttext font,.posttext i,em,.link_org a').contents().unwrap();
    $( ".posttext a:not(.alpom2 a,.move_pic a,.show_post_link,.show_post_link a,.show_post_list,.show_post_list a)").removeAttr("href").removeAttr("style");

     

    $('.posttext ul,.posttext li').contents().unwrap();
    //$('.selected').removeClass("selected");
        //


 if (read_Setting('NDmode', "day", 'all') == "day") {
         $(".alpom2 a:not(.alpom2_go),.move_pic a").attr('style', 'color: black !important');
                  $('.selected').attr('style', 'color: black !important');
    } else {
            $(".posttext a").addClass('white');
            $(".selected").addClass('white');
    }
    

}

function saveFile(url) {
    var filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0],
        xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
        if (this.status !== 4) {
            // return;
        }
        if (this.status === 200) {
            console.log(this.response);
            var reader = new FileReader();
            reader.onload = function (e) {
                var link = document.createElement('a');
                link.href = e.target.result;
                link.download = "image_" + '_' + getFormattedTime();
                link.click();
            };
            reader.readAsDataURL(this.response);
        } else {
            /*var myImage = document.createElement('img');
            myImage.onerror = (...args) => {console.log(url, 'other type of error', args);}
            myImage.onload = () => {console.log(url, 'image exists but cors blocked');}
            myImage.src = url;*/
            console.log(url, 'Image not found');
        }
    };
    xhr.open('GET', url);
    try {
        xhr.send();
    } catch (err) {
        if (e.toString().startsWith("NetworkError")) {
            //pasre the string to check error code
            //and take appropriate actions
        }
    }
}

function down() {
    var src = document.getElementById("img01").src;
    if (typeof Androidd !== 'undefined') {
        $('#loading').show();
        setTimeout(function () {
            Androidd.DownloadImageURL(src);
        }, 100);
    } else {
        if (src.indexOf("mahdialumma.com") !== -1) {
            alert(It_is_not_available_for_download);
        } else {
            saveFile(src);
        }
    }
}

function main_page_index() {
	
    $("#loading").show();
	//alert(rootpath + main_page);
    window.location.href = rootpath + main_page;
}











var disable_click = false;

var runclick_event = function(e) {


        e = e || window.event;
        var targ = e.target.closest('a') || e.target || e.srcElement || e;
        var show_list = null;


         if (hasClass(targ.closest('.showpost'), 'showpost') || hasClass(targ.closest('.post_note'), 'post_note')) {

           
           // targ.closest('.showpost_con').querySelector(".post_note").style.display = "none";
            targ.closest('.showpost_con').querySelector(".post_content").classList.add("show_post_auto_scroll");

        }
        else{
            if(document.querySelector(".post_note") ||document.querySelector(".post_content")){
            //document.querySelector(".post_note").style.display = "";
            document.querySelector(".post_content").classList.remove("show_post_auto_scroll");
            }
        }
        

$.postMessage('{"eventname":"hide_menu" , "url":""}', // The message to send (string)
                "*", // The host of the target window (i.e. http://www.vistaprint.com)
                parent // A reference to the target window
            );


        
}


document.addEventListener("click", runclick_event);



	
	
        function toggleDropdown() {
             
			
			
			
			var dropdown = document.querySelector('.dropdown');
            dropdown.classList.toggle('active');
			var dropdownContent = document.querySelector('.dropdown-con');
			  dropdownContent.classList.toggle('active');  
			 
			
			 if($('.dropdown-con').hasClass("active")){
			 
			 history.pushState(undefined, undefined, "#show_domain");
			
			 }
			 
			 
        }

    $(document).on("click", ".dropdown-con", function (event) {
		run_back();
		
	});
 
 
 function run_back() {
history.back()

 }


function selectOption(item) {
			
            var items = document.querySelectorAll('.dropdown-item');
           for (var i = 0; i < items.length; i++) {
                     items[i].classList.remove('active');
                  }

            // Add the "active" class to the selected item
            item.classList.add('active');

            // Update the button text to the selected item's text
            var buttonText = item.textContent;
            document.querySelector('.dropdown-button').textContent = buttonText;

            // Close the dropdown
            document.querySelector('.dropdown').classList.remove('active');
			
			run_back();
        }


window.onpopstate = function(event) {
   

 
 if($('.dropdown-con').hasClass("active")){
	  toggleDropdown();  
       //history.replaceState(undefined, undefined, "#"); 
 
 }
 
   
};






