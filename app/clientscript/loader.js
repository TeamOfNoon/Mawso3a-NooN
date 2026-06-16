


ver ="?"+ver;
var variable = '' + 
'	<link rel="icon" type="image/png" href="'+rootpath+'clientscript/images/generic/noon.png">' + 
'	<meta name="theme-color" content="black">' + 
'	<meta name="msapplication-navbutton-color" content="black">' + 
'	<meta name="apple-mobile-web-app-status-bar-style" content="black">' + 
'';


if(disable_all_loading == false){


document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/common.css' + ver + '\'/>');

//document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/swiper.min.css' + ver + '\'/>');


//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/jquery_lib/jquery-migrate-1.4.1.min.js'  + ver +  '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/generic.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/scroll_plugin.js' + ver + '\'><\/script>');  
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/scrollCenter.js' + ver + '\'><\/script>'); 


//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/swiper.jquery.min.js' + ver + '\'><\/script>'); 







}





if(window.location == window.parent.location) {

document.write('<div id="loading"></div>');

}


document.head.innerHTML = document.head.innerHTML + variable;


function header(url) {



  /*  
    document.write('<link rel=\"icon\" type=\"image/png\" href="'+rootpath+'clientscript/images/generic/noon.png">');
    document.write('<meta name="theme-color" content="black">');
    document.write('<meta name="msapplication-navbutton-color" content="black">');
    document.write('<meta name="apple-mobile-web-app-status-bar-style" content="black">');

document.write('<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />');
document.write('<meta http-equiv="Pragma" content="no-cache" />');
document.write('<meta http-equiv="Expires" content="0" />');
*/





}











function createScript(url) {
if(disable_all_loading){

return false;
}





document.write('  <!--[if lt IE 8]> <link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/archive_IE.css' + ver + '\'/><![endif]-->');

document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/archive.css' + ver + '\'/>');
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/fonts.css' + ver + '\'/>');





if(NDmode== "night"){
document.write('<link id="night" type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/night.css' + ver + '\'/>');
}










if(lang=="ar"){
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/langs/ar.js' + ver + '\'><\/script>');
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/rtl.css' + ver + '\'/>');










}
else if(lang=="en"){

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/langs/en.js' + ver + '\'><\/script>');
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/ltr.css' + ver + '\'/>');
}






document.write('<link type=\"text/css\" media=\"print\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/archive_print.css' + ver + '\'/>');


if(_isMobile() == mobiletrue){

document.write('<link  type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/mobile.css' + ver + '\'/>');



if (compareVersion(CHversion, "74.0.3729.185") < 0) {
    

if(lang=="ar"){
	document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/crosswalk_fix_rtl.css' + ver + '\'/>');	
}
else{
	
	document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/crosswalk_fix_ltr.css' + ver + '\'/>');	
	
}


} else {
    console.log("CHversion is equal or greater than 74.0.3729.185");
}



}






document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/stop_words/stop.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/xregexp/xregexp-all-min.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/pollyfills/pollyfills.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/json2.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/jquery_postmessage/jquery.ba-postmessage.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/findAndReplaceDOMText/findAndReplaceDOMText-0.4.6.js' + ver + '\'><\/script>');  
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/findAndReplaceDOMText/highlighter.js' + ver + '\'><\/script>');              

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/function.js' + ver + '\'><\/script>');


//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/adobe_all.js' + ver + '\'><\/script>');
          
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/constants.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/utils.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/mhutils.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/mhlang.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/mhver.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/settings.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/XmlJsReader.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/loadscreen.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/loadcsh.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/loadparentdata.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/loadprojdata.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/showhidecontrols.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/pageloader.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/mhtopic.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/searchfield.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/ehlpdhtm.js' + ver + '\'><\/script>');  




document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/fullscreen.js' + ver + '\'><\/script>'); 


}






function loadRHscript(url) {
if(disable_all_loading){

return false;
}


}




function footer(url) {
if(disable_all_loading){

return false;
}

    rootpath = url.substring(0, url.indexOf(v));

    target = url.replace(/\/$/, '');
    if (target == "") {
        target = ".";
    }

    gRootRelPath = target;
    gCommonRootRelPath = target;
    gTopicId = "";

    if (disable_all_loading == false) {



            document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/printThis.js' + ver + '\'><\/script>');
            document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/copy2clipboard.js' + ver + '\'><\/script>');
            document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/jquery.inview.js' + ver + '\'><\/script>');
            document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/rtlScrollType.js' + ver + '\'><\/script>');
            document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/hash_quts.js' + ver + '\'><\/script>');
            
			document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/scroll_bar/iscroll.js' + ver + '\'><\/script>');
			/*document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/jquery.backDetect.js' + ver + '\'><\/script>');*/
			document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/pollyfills/closest_pollyfill.js' + ver + '\'><\/script>');
			document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/archive.js' + ver + '\'><\/script>');

       

    }
    
    setTimeout(function() {

        //document.getElementById("loading").style.display = "none";
    }, 0);


}






function load_main_script_header(){

style_type = read_Setting("style_type", "jq", "all");

if(disable_all_loading){

return false;
}
/*
 document.write('<link rel=\"icon\" type=\"image/png\" href="'+rootpath+'clientscript/images/generic/noon.png">');
    
document.write('<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />');
document.write('<meta http-equiv="Pragma" content="no-cache" />');
document.write('<meta http-equiv="Expires" content="0" />');

document.write('<meta name="theme-color" content="black">');
    document.write('<meta name="msapplication-navbutton-color" content="black">');
    document.write('<meta name="apple-mobile-web-app-status-bar-style" content="black">');

*/

if(style_type == "jq" || style_type == "adobe")
{
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/main.css' + ver + '\'/>');	
}


if(typeof is_ios_app != 'undefined') {
if(read_Setting('mode_type', "native", 'all')== "native"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/mobile_ios.css' + ver + '\'/>');
}
}



document.write('<!--[if lt IE 8]>');
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/main_less_ie8.css' + ver + '\'/>');
document.write('<![endif]-->');

document.write('<!--[if lt IE 7]>');
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/main_less_ie7.css' + ver + '\'/>');
document.write('<![endif]-->');




if(lang=="ar"){
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/langs/ar.js' + ver + '\'><\/script>');
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/rtl.css' + ver + '\'/>');
}
else if(lang=="en"){

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/langs/en.js' + ver + '\'><\/script>');
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/ltr.css' + ver + '\'/>');
}



if(style_type == "jq"){
if(lang=="en"){

document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/js/jquery_lib/jquery_mobile_1_4_5_ltr/jquery.mobile-1.4.5.min.css' + ver + '\'/>');
}
else if(lang=="ar"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/js/jquery_lib/jquery_mobile_1_4_0_rtl/themes/default/rtl.jquery.mobile-1.4.0.css' + ver + '\'/>');
}
if(lang=="en"){
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/jquery_lib/jquery_mobile_1_4_5_ltr/jquery.mobile-1.4.5.min.js'  + ver +  '\'><\/script>');
}
else if(lang=="ar"){
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/jquery_lib/jquery_mobile_1_4_0_rtl/rtl.jquery.mobile-1.4.0.js'  + ver +  '\'><\/script>');
}

}

if(style_type == "ios"){

document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/fontawesome_free_6_4_2_web/css/all.css' + ver + '\'/>');


if(lang=="en"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/framework7.min.css' + ver + '\'/>');
}
else if(lang=="ar"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/framework7.rtl.min.css' + ver + '\'/>');
}


document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/app.css' + ver + '\'/>');


if(lang=="en"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/app.ltr.css' + ver + '\'/>');
}
else if(lang=="ar"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/app.rtl.css' + ver + '\'/>');
}
	
}


if(style_type == "andro"){

document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/fontawesome_free_6_4_2_web/css/all.css' + ver + '\'/>');



if(lang=="en"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/framework7.min.css' + ver + '\'/>');
}
else if(lang=="ar"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/framework7.rtl.min.css' + ver + '\'/>');
}

document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/app.css' + ver + '\'/>');
if(lang=="en"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/app.ltr.css' + ver + '\'/>');
}
else if(lang=="ar"){
document.write('<link type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/f7_core/css/app.rtl.css' + ver + '\'/>');
}
	
}













if(NDmode== "night"){
document.write('<link id="night" type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/night.css' + ver + '\'/>');
}


if(_isMobile() == mobiletrue){

document.write('<link  type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/mobile.css' + ver + '\'/>');

}




document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/xregexp/xregexp-all-min.js' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/pollyfills/pollyfills.js' + ver + '\'><\/script>');

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/stop_words/stop.js' + ver + '\'><\/script>');

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/function.js' + ver + '\'><\/script>');




//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/localStorage/localStorage.js?swfURL=localStorage.swf' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/localStorage/localStorage-debug.js?swfURL=localStorage.swf' + ver + '\'><\/script>');
//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/json2.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/history/history.ielte7.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/jquery_postmessage/jquery.ba-postmessage.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/findAndReplaceDOMText/findAndReplaceDOMText-0.4.6.js' + ver + '\'><\/script>');  
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/findAndReplaceDOMText/highlighter.js' + ver + '\'><\/script>');  
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/placeholders.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/copy2clipboard.js' + ver + '\'><\/script>');

//document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/adobe_all.js' + ver + '\'><\/script>');


document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/constants.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/utils.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/mhutils.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/mhlang.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/mhver.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/settings.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/XmlJsReader.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/loadscreen.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/loadcsh.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/loadparentdata.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/loadprojdata.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/showhidecontrols.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/pageloader.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/mhfhost.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/search.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/searchfield.js' + ver + '\'><\/script>');










document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/virtual-scroll/vscroll_functions.js' + ver + '\'><\/script>'); 
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/virtual-scroll/vscroll.js' + ver + '\'><\/script>'); 
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/snipper.js' + ver + '\'><\/script>'); 
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/fullscreen.js' + ver + '\'><\/script>'); 




}




function load_main_script_body(){
if(disable_all_loading){

return false;
}

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/adobe/ehlpdhtm.js' + ver + '\'><\/script>');


}


function load_main_script_footer(){
if(disable_all_loading){

return false;
}







document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/rtlScrollType.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/hash_quts.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/main.js' + ver + '\'><\/script>');



if(style_type == "ios"){

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/f7_core/js/framework7.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/f7_core/js/routes.js' + ver + '\'><\/script>');

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/f7_core/js/app.js' + ver + '\'><\/script>');


	
}


if(style_type == "andro"){

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/f7_core/js/framework7.js' + ver + '\'><\/script>');

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/f7_core/js/routes.js' + ver + '\'><\/script>');

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/f7_core/js/app.js' + ver + '\'><\/script>');
	
}





if(typeof is_ios_app != 'undefined') {   
          var obj = {event: "button_state", arg: "enabled"};
          window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
}
  
  
    
    


}




function load_index_page_script_header(){
if(disable_all_loading){

return false;
}

/*
 document.write('<link rel=\"icon\" type=\"image/png\" href="'+rootpath+'clientscript/images/generic/noon.png">');
    document.write('<meta name="theme-color" content="black">');
    document.write('<meta name="msapplication-navbutton-color" content="black">');
    document.write('<meta name="apple-mobile-web-app-status-bar-style" content="black">');
document.write('<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />');
document.write('<meta http-equiv="Pragma" content="no-cache" />');
document.write('<meta http-equiv="Expires" content="0" />');*/


document.write('<link  type=\"text/css\" rel=stylesheet href=\'' + rootpath + 'clientscript/css/index.css' + ver + '\'/>');

document.write('<link rel=\"icon\" type=\"image/png\" href="'+rootpath+'clientscript/images/generic/noon.png">');
//document.write('<div id="loading"></div>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/rtlScrollType.js' + ver + '\'><\/script>');






if(lang=="ar"){
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/langs/ar.js' + ver + '\'><\/script>');

}
else if(lang=="en"){

document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/langs/en.js' + ver + '\'><\/script>');

}





}




function load_index_page_script_footer(header_menue_visible){

		document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/plugins/rtlScrollType.js' + ver + '\'><\/script>');

 document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/jquery.inview.js' + ver + '\'><\/script>');
document.write('<script type=\"text/javascript\" src=\'' + rootpath + 'clientscript/js/index.js' + ver + '\'><\/script>');



 setTimeout(function() {

       // document.getElementById("loading").style.display = "none";
		
if(typeof is_ios_app != 'undefined') {   
          var obj = {event: "button_state", arg: "disabled"};
          window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
}	
	

if(typeof is_ios_app != 'undefined') {   
          var obj = {event: "show_webkit_info", arg: "true"};
          window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
}
     
     if(typeof is_ios_app != 'undefined') {

     if(read_Setting('full_screen', "off", 'web')== "on"){
     var obj = {event: "cell_tag_2", arg: "hide_state_bar"};
      window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));
      
      //fullscreen_img ='' + rootpath + 'clientscript/images/tools/fullSoff.png';
     }

     }
	

	
		
    }, 0);
	 

}










