function show_snipt(url,check) {

//setTimeout(function(){ $("#head table").css("border-collapse","collapse");  }, 0);  


if(is_grabbing  == true) return false;
if(is_input_foces == true) return false;
 $("#loading").show();
 $("#snpt").removeClass("is-hidden");
 
$("#sett_search,#butt_search").hide();
$("#butt_baack").show();



if(typeof show_search != 'undefined') {  
   show_search(this,'hide');
}

 
$(".td_search_butt,.td_search_input").hide();
$("#plus_td,  #next_td, #prev_td,.td_fav_input,.clear_fav,#clear_fav,.td_save_fav_butt").hide();
$("#clear_search,.clear_search").hide();
$("#home_td").show();
$("#down_td").css("width","2.5em");
$("#up_td").css("width","2.5em");
//$(".tr_header").css("border","1px solid transparent");   
$("#close_td").show();
$("#close_td").css("width",""); 
$(".adobe .tr_header").removeClass("add_white_tr_back");

 //$("#snpt,#snptviewcon").removeClass("is-hidden");

    if (document.getElementById("sample"))
        document.getElementById("sample").style.display = "block";



   document.getElementById("snptviewcon").innerHTML = "";
   
   
   
    show_all = true;

        current_select = null;
        curr_index = null;
        _a_QueryResult =null;
        current_mark =null;
        
      if (window.myScroll2) {
        window.myScroll2.destroy();
        window.myScroll2 =null;
      }
      
        if (window.myScroll) {
        window.myScroll.destroy();
        window.myScroll =null;
      }
      
   
   
   
     setTimeout(function(){  
     
     
         var string = url;


        $.get(string, function(data) {
            //var words = getParameterByName("rhhlterm", string);
            
            var words =striped_Normlized;
            
            var alteredURL = removeParam("hit", string);

            if (document.getElementById("snptviewcon")) {


                var snpit_array = get_snpt(data, words, alteredURL, true, false, true);
                _a_QueryResult= snpit_array;


                lunch_vlist3(snpit_array, "snptviewcon", "snptview",true);
                document.getElementById("snptviewcon").style.display = "block";

                setTimeout(function(){    $("#loading").hide(); }, 100);


            }


        });
     
     
     
     
     }, 100);
   
  
   
  
      setTimeout(function(){  
     
 /*    
     var dir = get_scroll_pos_and_width($('#snptview')[0]);
if(dir[0] =="right"){
$("#close_snpit").css("right",dir[1] + 'px');
}
else if(dir[0] =="left"){
$("#close_snpit").css("left",dir[1]+ 'px');
}
*/
     
     }, 100);
  
  
if(typeof is_ios_app != 'undefined') {
 var obj = {event: "show_snipt_section", arg: "on"};
 window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));
}	
  
   

   
   
   

 
}





















function hide_snpit() {
     current_select = null;
        curr_index = null;
        _a_QueryResult =null;
        current_mark =null;
        
      if (window.myScroll2) {

        window.myScroll2.destroy();
       
        
        window.myScroll2 =null;
      }
      
         if (window.myScroll) {
        window.myScroll.destroy();
   
        
         window.myScroll =null;
      }
      
    
    show_all = false;
    $("#snpt,#snptviewcon").addClass("is-hidden");
    if (document.getElementById("sample"))
        document.getElementById("sample").style.display = "none";

$("#sett_search,#butt_search").show();
$("#butt_baack").hide();
   
			if($("#searchBox").val()){

$("#clear_search,.clear_search").show();
$(".td_search_input .ui-input-clear").removeClass("ui-input-clear-hidden");
}

$("#close_td").hide();
$(".td_search_butt,.td_search_input").show();
$("#plus_td,  #next_td, #prev_td,.td_fav_input,.clear_fav,#clear_fav,.td_save_fav_butt").hide();

$("#home_td").css("width","2.5em").show();
if(read_Setting('NDmode', "day", 'all')== "night"){
//$(".tr_header").css("border","1px solid white");   
}
$(".adobe .tr_header").addClass("add_white_tr_back");



if(typeof is_ios_app != 'undefined') {
 var obj = {event: "hide_snipt_section", arg: "off"};
 window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));
}





}


function highlight_vl_selected_row(){


		if (document.getElementById("sample").style.display == "block"){
		

		 if($("#snptviewcon  #" + current_mark).get(0)){
		 $("#snptviewcon  #" + current_mark).addClass("mark");
		 }

		}
		else{
		
		$("#" + current_select).addClass("mark");
		
		}
		

}






var pr_text = "";

var pr_text2 = "";

function get_prv_text(ii, all_words, first_run) {
    // Initialize pr_text as an empty string if it's the first run
    if (first_run) {
        pr_text = "";
    }

    // Decrement ii by 1
    ii = ii - 1;

    if (all_words[ii]) {
        // Check if the word is HTML and strip tags if necessary
        if (isHTML(all_words[ii])) {
            all_words[ii] = strip_tags(all_words[ii]);
        }

        // Concatenate the current word with pr_text
        pr_text = all_words[ii] + " " + pr_text;

        // Use XRegExp to remove certain characters and calculate the length
        var pr_text_test_length = pr_text.replace(XRegExp("[​\\p{Mn}\\u0640\\u200C\\u200B​]", 'gmi'), "").length;

        // Check if the length is less than 60 characters
        if (pr_text_test_length < 60) {
            // Recursively call the function with first_run set to false
            get_prv_text(ii, all_words, false);
        }
    }

    // Define the regular expression for matching up to 60 characters at the end of the string
    var prev_cut = XRegExp("[^\\S]+(\\P{M}\\p{M}*){0,60}$", "g");

    // Trim pr_text and use the regular expression to match up to 60 characters at the end
    pr_text = pr_text.trim();
    pr_text2 = pr_text.match(prev_cut);

    // Check if pr_text2 is not null before accessing its properties
    if (pr_text2 && pr_text2.length > 0) {
        pr_text2 = pr_text2[0];
    } else {
        // Handle the case where pr_text2 is null or empty
        pr_text2 = "";
    }

    return pr_text2;
}


var ne_text = "";
var ne_text2 = "";

function get_nex_text(ii, all_words, first_run) {

    if (first_run)
        ne_text = "";

    ii = ii + 1;

    if (all_words[ii]) {

        if (isHTML(all_words[ii])) {
            all_words[ii] = strip_tags(all_words[ii]);
        }

        ne_text = ne_text + " " + all_words[ii];

        var ne_text_test_lenth = ne_text.replace(XRegExp("[\\p{Mn}\\u0640\\u200C\\u200B]", 'gmi'), "");


        if (ne_text_test_lenth.length < 60) {

            get_nex_text(ii, all_words, false);
        }



    }


    //var ne_cut = XRegExp("^((\\P{M}\\p{M}*){0,55}[^\\S]+)", "g");
    //var ne_cut2 = XRegExp("", "g");

    ne_text = ne_text.trim();
    var ne_cut = XRegExp("^(.\\p{M}*){0,60}[^\\S]+", "g");
    //ne_text2 = ne_cut.exec(ne_text);
    ne_text2 = ne_text.match(ne_cut);
	
   
	

	 if (ne_text2 && ne_text2.length > 0) {
        ne_text2 = ne_text2[0];
    } else {
        // Handle the case where pr_text2 is null or empty
        ne_text2 = "";
    }
	


    return ne_text2;
}











function get_snpt(body, words, url, view_all) {

    part_hit = read_Setting("part_match", "false", "all");

    var hitwords = "";
    var count_match_words = 0;
    var count_all_words = 0;
    var words_array2 = new Array();
    var words_array = new Array();
    var match_array = new Array();
    var sub_match_array = new Array();
    var whole_match_array = new Array();
    var hit_array = new Array();
    var all_array = new Array();
    var inputText = body;
    var pattern;
    var countK = 0;
    var sub_count = 0;
    var whol_count = 0;
    var countall = 0;
    var count_match = 0;
    var word_counter = "";
    var show_all_string = "";
    var words2 = decodeURIComponent(words);
    var term;
    
    var remove_repeated;

    var remove_repeated2;




    words = words.trim();


    body = stripScripts(body);
    //body = strip_tags (body,"<br>,<font>,<a>,<b>");
    body = body.replace(/<!DOCTYPE HTML>/g, '');

    //body = body.replace(/(.*?)(<(?!br)[^>]*>(.*?))/g, '$1㇣$2');

    body = body.trim();
    //body = strip_tags (body,"<br>");
    //body = body.replace(/^((㇣|<br[\s]*\/?\>[\s]*)[\s]*)+|((㇣|<br[\s]*\/?\>[\s]*)[\s]*)+$/g, "");
    //body = body.replace(/(\<br[\s]*\/?\>[\s]*)+/g, " ㇣ ");
    //body = body.replace(/(?:㇣){2,}/g, "㇣");
    //body = body.replace(/(?:㇣\s*){2,}/g, " ㇣ ");

    body = body.replace(/<a\s*.*?>/ig, '<b>');
    body = body.replace(/<\/a>/ig, '</b>');
    body = body.replace(/<br>/ig, ' <br> ');

    body = body.replace(/<\/div>/ig, ' </div> ');
	body = body.replace(XRegExp("[\\u06e5]", 'gmi'), '');


 if (read_Setting('Strip_tashkeel', "off", 'all') == "on") {

            body = body.replace(XRegExp("[\\p{Mn}\\u200C]", 'gmi'), '')

          
            }



    var $jQueryObject2 = $.parseHTML(body);

    words = decodeURIComponent(words);




   // if (words2[0] == "\"" && words2[words2.length - 1] == "\"") {
 if (search_type == "exact") {
		

        words = words.replace(/^"(.+(?="$))"$/, '$1');
        term = words;
        term = createAccentRegexp(words).split(' ').join('(<[^>]+>|[^\\p{L}\\p{N}])*');

    } else {
//words  = strip_And_Normlize(words);
     /*   remove_repeated = filter(words.split(' '), function(item, i, allItems) {
 //return  i == allItems.indexOf(item);
 
 return  i == indexOf(allItems,item);

});*/
 remove_repeated = words.split(' ').filter(function(item, i, allItems) {
            return i == allItems.indexOf(item);
        }).join(' ');


        



        remove_repeated = remove_repeated.split(' ');
        remove_repeated2 = remove_repeated;

        for (var i = 0; i < remove_repeated2.length; i++) {


            words_array2[i] = remove_repeated2[i];


        }

        remove_repeated = remove_repeated.sort(function(a, b) {

            return b.length - a.length || a.localeCompare(b);
        });




        for (var i = 0; i < remove_repeated.length; i++) {

            words_array[i] = createAccentRegexp(remove_repeated[i]);



        }

        remove_repeated = words_array.join("|");
        term = remove_repeated;



    }




    if (part_hit=="true") {
     
        part_match = true;
        pattern = XRegExp("(" + term + ")", "gi");
       
       

    } else {

        part_match = false;

        if (supportsLookbehind() == true) {

            // pattern = XRegExp("(?<=[\\s\\p{P}\\p{S}\u06DA\u200F\u200B]|^)("+term+")(?=[\\s\\p{P}\\p{S}\u06DA\u200F\u200B]|$)", "g");
            pattern = XRegExp("(^|[^ً\\p{L}\\p{N}\\p{Mn}\u200C]|[ۚۗۖۙ])(" + term + ")(?=[^ً\\p{L}\\p{N}\\p{Mn}\u200C]|[ۚۗۖۙ]|$)", "gi");
        } else {

            pattern = XRegExp("(^|[^ً\\p{L}\\p{N}\\p{Mn}\u200C]|[ۚۗۖۙ])(" + term + ")(?=[^ً\\p{L}\\p{N}\\p{Mn}\u200C]|[ۚۗۖۙ]|$)", "gi");
        }

   


    }



    $($jQueryObject2).find('figcaption,.name_of_quote_first').remove();
    apply_highlight($($jQueryObject2).find('.pagebody').get(0),pattern,view_all,url);  





    body = $($jQueryObject2).find('.pagebody').html();
    //body = body.replace(/<br\s*\/?>/gi,' ');

    //body = body.replace(/<br>/gm, " ");
    body = strip_tags(body, "<a>");
    body = body.replace(/(\r\n|\n|\r)/gm, " ");

    body = body.replace(/\&nbsp;+/g, " ");

    body = body.replace(/\s\s+/g, " ");
  

  // data = data.replace("صورة","-----------------");

    var result = body.split(/((?:[^\s<]*<\w[^>]*>[\s\S]*?<\/\w[^>]*>)+[^\s<]*)/);


    //var filtered =filter(result, function(el) {
    
   var filtered = result.filter(function(el) {

        if (el == undefined) {
            return el != null;
        } else {




            if (isNullOrWhitespace(el) == false) {




                if (isHTML(el)) {
                    var reg = new RegExp('/(<[a-zA-Z](.*?[^?])?>)/g');
                    var matches = el.match(XRegExp("<[a-zA-Z](.*?[^?])?>", "g"));


                    if (matches && matches.length) {


                        if (matches.length <= 1) {

                            var striped_string = el.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, "");
                            var reg2 = XRegExp('(?:^|[\\s\\p{P}\\p{S}\\u06DA\\u200F\\u200B])\<a.*\>.*\<\/a\>(?=[\\s\\p{P}\\p{S}\\u06DA\\u200F\\u200B]|$)', "i");
                            //alert(reg2.test(el));


                            if (reg2.test(el)) {

                                whole_match_array[whol_count] = {
                                    'countall': countall,
                                    'keyword': el
                                };
                                whol_count++;


                            } else {

                                sub_match_array[sub_count] = {
                                    'countall': countall,
                                    'keyword': el
                                };
                                sub_count++;

                            }


                        } else {


                            sub_match_array[sub_count] = {
                                'countall': countall,
                                'keyword': el
                            };
                            sub_count++;


                        }


                    }


                    match_array[countK] = {
                        'countall': countall,
                        'keyword': el
                    };

                    countK++;

                }

                countall++;

            }



            return /\S/.test(el);
        }
    })


   if (search_type == "exact") {



        for (var i = 0; i < whole_match_array.length; i++) {

            if (view_all == false) {
                if (i > 2) {
                    break;
                }
            }

            hit_array[count_match] = get_prv_text(whole_match_array[i].countall, filtered, true) + "  " + whole_match_array[i].keyword + " " + get_nex_text(whole_match_array[i].countall, filtered, true);
            hitwords += "<div class='hitwords'><hr>[" + (count_match + 1) + "] ..." + hit_array[count_match] + "...</div>";
            count_match++




        }


        for (var i = 0; i < sub_match_array.length; i++) {

            if (view_all == false) {
                if (i > 2) {
                    break;
                }
            }

            hit_array[count_match] = get_prv_text(sub_match_array[i].countall, filtered, true) + "  " + sub_match_array[i].keyword + " " + get_nex_text(sub_match_array[i].countall, filtered, true);
            hitwords += "<div class='hitwords'><hr>[" + (count_match + 1) + "] ..." + hit_array[count_match] + "...</div>";
            count_match++;




        }

    } else {



        /*
         var counter= 0; 
            var counter2= 0;


        for (var i = 0; i <  match_array.length; i++) {


        if (view_all == false) {      
                   if (counter >0){
                    break;
                   } 
                   }
                    


                            hit_array[count_match]= get_prv_text(match_array[i].countall,filtered,true)+"  "+match_array[i].keyword+" "+get_nex_text(match_array[i].countall,filtered,true);
                            hitwords += "<div><hr>"+(count_match+1)+" ..."+hit_array[count_match]+"...</div>"+""; 
                            counter++;
                            count_match++;


        }*/



        for (var i = 0; i < words_array2.length; i++) {
            var counter = 0;
            var counter2 = 0;
            var s = 0;
            var xx = 0;
            //alert(words_array2[i]);


            for (var x = 0; x < whole_match_array.length; x++) {
                //while ( x < whole_match_array.length) {



                if (whole_match_array[x]) {
                    if (strip_And_Normlize(strip_tags(whole_match_array[x].keyword)).match(XRegExp("(?:^|[\\s\\p{P}\\p{S}\\u06DA\\u200F\\u200B])(" + words_array2[i] + ")(?=[\\s\\p{P}\\p{S}\u06DA\u200F\u200B]|$)", "g"))) {



                        if (view_all == false) {
                            if (counter > 0) {
                                break;
                            }
                        }

                        hit_array[count_match] = get_prv_text(whole_match_array[x].countall, filtered, true) + "  " + whole_match_array[x].keyword + " " + get_nex_text(whole_match_array[x].countall, filtered, true);
                        hitwords += "<div class='hitwords'><hr>[" + (count_match + 1) + "] ..." + hit_array[count_match] + "...</div>" + "";
                        counter++;
                        count_match++;

                        whole_match_array.splice(x, 1);

                        //delete whole_match_array[x];
                        x = x - 1;




                    }
                }


            }




            for (var xx = 0; xx < sub_match_array.length; xx++) {
                //while ( xx < sub_match_array.length) {

                if (view_all == false) {
                    if (counter2 > 0) {
                        break;
                    }
                }

                if (sub_match_array[xx]) {


                    if (strip_And_Normlize(strip_tags(sub_match_array[xx].keyword)).match(XRegExp("(" + words_array2[i] + ")", "g"))) {



                        hit_array[count_match] = get_prv_text(sub_match_array[xx].countall, filtered, true) + "  " + sub_match_array[xx].keyword + " " + get_nex_text(sub_match_array[xx].countall, filtered, true);
                        hitwords += "<div class='hitwords'><hr>[" + (count_match + 1) + "] ..." + hit_array[count_match] + "...</div>" + "";
                        counter2++;
                        count_match++;

                        sub_match_array.splice(xx, 1);

                        // delete sub_match_array[xx];
                        xx = xx - 1;




                    }



                }


                //xx++;
            }




        }


        //alert(whole_match_array.length);


    }


    word_counter = "<div class =\"word_counter\">" + match_array.length +" "+ results_total_found + "</div>";

    if (view_all == false) {
        if (count_match == match_array.length) {
            show_all_string = '';
        } else {




            show_all_string = '<div><a href="javascript:void(0);" onclick=show_snipt("' + url + '",null);>' +show_whole+ '</a></div>';
        }
    }




    if (view_all == false) {
        return "<div class = 'snpit'>" + word_counter + " " + hitwords + show_all_string + "<div>";

    } else {
        //document.getElementsByClassName("loading2")[0].style.display = 'none';
        return hit_array;
    }

}

