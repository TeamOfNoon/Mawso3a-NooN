



function disable_grap() {
 
    $("#wrapper").unbind("mousemove").unbind("mousedown").unbind("mouseup");

}

function enable_grap() {
   
    grab("#wrapper", "grab", "y");
}


var mene = '' + 
'<header  id = "help_header" >' + 
'		<nav class="header-nav">' + 
'				<button class="header-nav__button header-nav-js__button" type="button">' + 
'						<span class="header-nav__bar"></span>' + 
'				</button>' + 
'				<div class="backdrop"></div>' + 
'				<div class="logo">' + 
'					' + 
'				</div>' + 
'				<div class="cart">' + 
'						' + 
'				</div>' + 

'				<div class="header-nav__menu">' + 
'				<div class="indent">' + 
'				<br><br><br>' + 
'				</div>' + 
'				<ul class ="ul">' + 
'						<li class="header-nav__menu-item"><a id ="id_list_1" onclick="scrollToElement(\'id_1\', event)" href="#id_1" class="nav-link">'+struct_system+'</a></li>' +
'						<li class="header-nav__menu-item"><a id ="id_list_2" onclick="scrollToElement(\'id_2\', event)" href="#id_2" class="nav-link">'+tool_system+'</a></li>' +
'						<li  class="header-nav__menu-item"><a id ="id_list_3" onclick="scrollToElement(\'id_3\', event)" href="#id_3" class="nav-link">'+search_system+'</a></li>' +
'						<li  class="header-nav__menu-item"><a id ="id_list_4" onclick="scrollToElement(\'id_4\', event)" href="#id_4" class="nav-link">'+bookmark_system+'</a></li>' +
'						<li class="header-nav__menu-item"><a id ="id_list_5" onclick="scrollToElement(\'id_5\', event)" href="#id_5" href="#" class="nav-link">'+part_system+'</a></li>' +
'						<li class="header-nav__menu-item"><a id ="id_list_6" onclick="scrollToElement(\'id_6\', event)" href="#id_6" href="#" class="nav-link">'+hash_system+'</a></li>' +
'						<li class="header-nav__menu-item"><a id ="id_list_7"  onclick="scrollToElement(\'id_7\', event)" href="#id_7" class="nav-link">'+extra_system+'</a></li>' +
'				</ul>' + 

'				</div>' + 

'		</nav>' + 
'</header>' + 
'';



if (typeof header_menue_visible !== 'undefined') {
   
}
else{
	 mene="";
}


 var index_header = '' + 
'<div class="grabbing" id="wrapper" style="width:100%">' + 
'		<table dir="rtl" border="0" width="100%">' + 
'			<tbody>' + 
'				<tr height="42">' + 
'					<td style="background:url(clientscript/images/borders/tr.png) right top no-repeat;" width="0"></td>' + 
'					<td style="background:url(clientscript/images/borders/t.png) top repeat-x;"></td>' + 
'					<td style="background:url(clientscript/images/borders/tl.png) left top no-repeat;" width="0"></td>' + 
'				</tr>' + 
'				<tr valign="baseline">' + 
'					<td style="background:url(clientscript/images/borders/r.png) right center repeat-y;" width="7"></td>' + 
'					<td id="post_message" dir=='+dir+'>' + 



mene+
'					<div id="post_padd">' + 
'						<img id="bsm" class="shadowfilter" src="clientscript/images/generic/bsm.png" width="200px">' + 
'						<br>' + 
'						<br>';




 var index_footer = 
'					</div>' +
'					</td>' + 
'					<td style="background:url(clientscript/images/borders/l.png) left center repeat-y;"></td>' + 
'				</tr>' + 
'				<tr height="42">' + 
'					<td style="background:url(clientscript/images/borders/br.png) right bottom no-repeat;" width="42"></td>' + 
'					<td style="background:url(clientscript/images/borders/b.png) bottom repeat-x;"></td>' + 
'					<td style="background:url(clientscript/images/borders/bl.png) left bottom no-repeat;" width="42"></td>' + 
'				</tr>' + 
'			</tbody>' + 
'		</table>' + 
'	</div>';






var prevent_click = false;



 var res ,pageName; 
	 
     if(read_Setting("lang", "null", "all")=="null")
      {
      
       change_lang();
      
      }
      else if(read_Setting("permission_alert", "null", "all")=="null")
      {
          if(typeof is_ios_app != 'undefined') {
      
          var obj = {event: "permission", arg: "null"};
           window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));
           
           save_Setting('permission_alert', "done", 'all');
		   }else{
		    append_index();
		   }
		  
          
      }
      else{
        
              
                    append_index();


      }


	 
	 
	
	 
	 $(document).ready(function() {
	
	
	
	$(window).unload(function() {
 setTimeout(function() {

        document.getElementById("loading").style.display = "none";
    }, 0);
});
            

    
        
    	$("html,body").bind('dragstart selectstart', function(e) {
		e.preventDefault();
		return false;
	});
	
        grab("#wrapper", "grab", "y");
	 
	 
	 
        
       $(document).on("click", function(event){
       
       if(is_grabbing == true) return false;
        var $trigger = $(".dropdown");

        if($trigger !== event.target && !$trigger.has(event.target).length){
           $("#myDropdown").removeClass("show");
        }            
    });
	 
	 
	   $(document).on("click",".dropdown",function(event){
   
           if(is_grabbing == true) return false;
           event.stopPropagation();
             $(this).find("#myDropdown").toggleClass( "show" );
          if($(this).find("#myDropdown").hasClass( "show" )){
                
              document.getElementById("dropdown").scrollIntoView();
          }
           
        });
    
    
    
   if(location.href.indexOf("http://localhost:"+location.port) !=-1){
 
      $("#onlineEn").addClass("hide");
      }
      else if(location.href.indexOf("file:") !=-1){

       
        $("#onlineEn").addClass("hide");
      }
      else if(location.href.indexOf("http://") !=-1){

         $("#offlineEn").addClass("hide");
      }
      else if(location.href.indexOf("https://") !=-1){


          $("#offlineEn").addClass("hide");
      }
       
    
    
    
    	 
	    if (typeof Androidd !== 'undefined'){
      
      var Btype= Androidd.getSharP("SP_WEBVIEW_TYPE","null");
      if( document.getElementById("wvB")){
      document.getElementById("wvB").style.display = "inline-block";
	  }
      
      
      
      if(Androidd.get_api_level()>= 29){
        // document.getElementById("change_webview").style.display = "none";
      }
      
      if(Androidd.get_api_level()<19 && Btype =="nocross"){
         document.getElementById("choss").style.display = "none";
         document.getElementById("dropbtn").style.display = "none";
         document.getElementById("enter").style.display = "block";
      
      }
      
      
   
      
      
      if(Btype =="cross"){
      
      
      
      
	  if(document.getElementById("Btype")){
		document.getElementById("Btype").innerHTML = you_are_using_cross_browser;
	  }
      
	  
      }
      else{
      if(document.getElementById("Btype")){
		document.getElementById("Btype").innerHTML = you_are_using_native_browser;  
	  }
      
      
      }
      
       if(document.getElementById("Atype")){
          document.getElementById("Atype").innerHTML = andro_version+" "+Androidd.GoAver(null);	
	   }
      
      
	   if(document.getElementById("Ctype")){
         document.getElementById("Ctype").innerHTML = cpu_device+" "+Androidd.GoArch(null);
	   }
      
      
      }

                        $("html").toggle().hide().show(0);

      
                        save_Setting("currPATH", window.location.toString().split('app/').pop(), "all");  
        
     setTimeout(function() {

        document.getElementById("loading").style.display = "none";
    }, 0);    
  
  
  
if (read_Setting("lamp", "off", "all") == "on") {
	
	lamp_active = "lamp_active";
	
   $("#lamp").addClass(lamp_active);
   $("#lamp img").attr("src", rootpath + "clientscript/images/tools/lamp_on.png");
}
else{
	

	$("#lamp").removeClass(lamp_active);
	$("#lamp img").attr("src", rootpath + "clientscript/images/tools/lamp_off.png");
}

  
  
  
  
  
  
  
  }); 
	 
	
	 

    
 
      
      function change_wv(){
      if(is_grabbing == true) return false;
       Androidd.change_WV();
      
      }
      
      function go(string){
       pageName =  window.location.toString();
      if(is_grabbing == true) return false;
      document.getElementById("loading").style.display = 'block';
      var param = window.location.toString().split('index.html').pop()


  if (pageName.indexOf("#t") !== -1){
  
  }
  else{
   param="";
  }
      

if(string=="help"){
window.location = "help.html"+param;
}

if(string=="down"){
window.location = "download.html"+param;
}
if(string=="privacy"){
window.location = "privacy.html"+param;
}

if(string=="sett"){
window.location = "settings.html"+param;
}
      




return false;
      }
      	 
	   function go_ext(link){
      
      if(is_grabbing == true) return false;
      if (typeof Androidd !== 'undefined') {
      
      var href = link.href;
      //alert( href);
      
      Androidd.go_ext(href, "null");
      
      return false;
      }
      
      } 
	 
      
      
      function go_extract(){
      if(is_grabbing == true) return false;
          Androidd.go_extract();
      }
      
      
    
	 
	 function select_lang(lang){
	 var url_string =window.location.toString();
	 if(is_grabbing == true) return false;

 document.getElementById("loading").style.display = "block";
	 save_Setting("lang", lang, "all");


setTimeout(function () {
		
		
		if(url_string.indexOf('show_lang') !== -1){
		   
		   
		   Redirect("3");
		}
		else{
		location.reload();
		}

		
	
			}, 100)

	
	 }
	 
function change_lang(){

if(is_grabbing == true) return false;
      var model_lang =  '<div id="show_img" class="show_img"><div class="modal-content">'+

'                                              <div style="font-size:20px; color:white" dir ="rtl">اختر لغة التطبيق :</div>'+
'                                              <div style="font-size:20px; color:white" dir ="ltr">Choose the language of the app :</div>'+	
'	                                       <div style="font-size:20px" class="dropdown" id="dropdown">' + 

'							<button style="font-size:20px" id="dropbtn" class="dropbtnn">اختيار Select</button>' + 
'							<div style="font-size:20px" id="myDropdown" class="lang dropdown-content">' + 
'								<a onclick="select_lang(\'ar\')">اللغة العربية</a>' + 
'								<a onclick="select_lang(\'en\')">English language</a>' + 
'							</div>' + 
'						</div>' + 
'                           </div>';

	
	  
	    if (typeof Androidd !== 'undefined'){
	    
	              Androidd.lang_dailog();
	    
	    }
		else if(typeof is_ios_app != 'undefined') {

          var obj = {event: "lang_change", arg: null};
	      window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));


        }
		else{
	    	  $(model_lang).appendTo('body');
	    }
	  
	  
	  
	  
	  
	  
	  
	  
}	 
	 



function change_mode(){

if(typeof is_ios_app != 'undefined') {

          var obj = {event: "mode_type", arg: null};
	      window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));

}


}

function go_port(){
if(typeof is_ios_app != 'undefined') {

          var obj = {event: "go_port", arg: null};
	      window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));

}
}






         
         	
 
         
         function Redirect(value){
         //if(is_grabbing == true) return false;
         pageName =  window.location.toString();
         pageName = pageName.replace("&show_lang", '');
		 //alert(pageName);
         if (value === "0"){
         document.getElementById("loading").style.display = 'block';
         if (pageName.indexOf("#t") !== -1){
         res = removeParam("time", pageName);
         
		res =  decodeURIComponent(res.replace("index.html", "").replace("#t=", "").replace("&", "?"));
		 window.location = res;
         }
         else{

         res = decodeURIComponent(main_page);
         window.location = res;

         }
        
        }
         if (value === "1"){
        pageName = removeParam('time', pageName.replace("%23thread_", "#thread_").replace("%23post", "#post")).replace("#thread_", "%23thread_").replace("#post", "%23post");

         document.getElementById("loading").style.display = 'block';
          save_Setting("style_type", "ios", "all");
         if (pageName.indexOf("#t") !== -1){
         
         res = pageName.replace("index.html", "main.html");
         window.location = res;
         }
         else{

         res = "main.html#t="+main_page;
        window.location = res;

         }
        
         
         
         
         }
         else if(value === "2"){
         save_Setting("style_type", "andro", "all");
         pageName = removeParam('time', pageName.replace("%23thread_", "#thread_").replace("%23post", "#post")).replace("#thread_", "%23thread_").replace("#post", "%23post");
         document.getElementById("loading").style.display = 'block';

         
         if (pageName.indexOf("#t") !== -1){
         
         res = pageName.replace("index.html", "main.html");
        window.location = res;
         }
         else{


         res = "main.html#t="+main_page;
        window.location = res;

         }
         
         
         
         
         }
		 
		   else if(value === "3"){
         save_Setting("style_type", "jq", "all");
         pageName = removeParam('time', pageName.replace("%23thread_", "#thread_").replace("%23post", "#post")).replace("#thread_", "%23thread_").replace("#post", "%23post");
         document.getElementById("loading").style.display = 'block';

         
         if (pageName.indexOf("#t") !== -1){
         
         res = pageName.replace("index.html", "main.html");
        window.location = res;
         }
         else{


         res = "main.html#t="+main_page;
        window.location = res;

         } 
         }
          
		     else if(value === "4"){
         save_Setting("style_type", "adobe", "all");
         pageName = removeParam('time', pageName.replace("%23thread_", "#thread_").replace("%23post", "#post")).replace("#thread_", "%23thread_").replace("#post", "%23post");
         document.getElementById("loading").style.display = 'block';

         
         if (pageName.indexOf("#t") !== -1){
         
         res = pageName.replace("index.html", "main.html");
        window.location = res;
         }
         else{


         res = "main.html#t="+main_page;
        window.location = res;

         } 
         }

       
       
         }
         
       


  function go_index(){
      
      if(is_grabbing == true) return false;
      
       pageName =  window.location.toString();
       
      document.getElementById("loading").style.display = 'block';
     // var param = window.location.toString().split('/help\.html/').pop();
	  
	  var param = pageName .split(/help\.html|download\.html|privacy\.html|settings\.html/);
var param = param.pop();

  if (pageName.indexOf("#t") !== -1){
  
  }
  else{
   param="";
  }
      window.location.href = "index.html"+param;
      return false;
      }
      	 

	 
function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}	 

function toggle_info() {

  var x = document.getElementById("myinfo");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}	

function  go_intru(){
    
    if(typeof is_ios_app != 'undefined') {

              var obj = {event: "go_intru", arg: null};
              window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));

    }
    
}


function show_webkit_info(value,port){

$('#style_butt').show();
$('#info_butt').show();
$('#port_butt').show();
$('#instru_butt').show();


    
   if(port !="null"){
       document.getElementById("myinfo").innerHTML =
       you_are_using_native_browser+"<br>"+
            cpu_device+"<br>"+value+
            "<br>"+server_state_on+port;
   
   }
   else{
       
       document.getElementById("myinfo").innerHTML =
       you_are_using_native_browser+"<br>"+
            cpu_device+"<br>"+value+
            "<br>"+server_state_off;
            
   }
         
    
     
}







document.addEventListener('DOMContentLoaded', function() {
	'use strict';

	var isActive = false;
	var button = document.getElementsByClassName('header-nav-js__button')[0];
var header = document.getElementsByClassName('header-nav__menu')[0];
	function openMenu() {
		document.body.classList.add('disable-scroll');

		button.classList.add('is-active');
		button.classList.add('is-open');
		
		header.classList.add('is-open');
		
		
		isActive = true;
	}

	function closeMenu() {
		document.body.classList.remove('disable-scroll');

		button.classList.remove('is-open');
		button.classList.add('is-animating');

		document.querySelector('.backdrop').addEventListener(whichTransitionEvent(), closeAnimation, false);

		isActive = false;
		enable_grap();
	}

	function closeAnimation() {
		button.classList.remove('is-animating');
		button.classList.remove('is-active');

		document.querySelector('.backdrop').removeEventListener(whichTransitionEvent(), closeAnimation, false);
	}

	function whichTransitionEvent() {
		var t;
		var el = document.querySelector('.backdrop');
		var transitions = {
			transition: 'transitionend',
			OTransition: 'oTransitionEnd',
			MozTransition: 'transitionend',
			WebkitTransition: 'webkitTransitionEnd'
		};

		for(t in transitions) {
			if (el.style[t] !== undefined) {
					return transitions[t];
			}
		}
	}
if(button){
	button.addEventListener('click', function(event) {
		if (isActive) {
			closeMenu(button);
		
			
		} else {
			if(!prevent_click){
			openMenu(button);
			disable_grap();
			}
			
			
			
		}
	});
	
	document.querySelector('.backdrop').addEventListener('click', closeMenu, false);

$('.header-nav__menu-item').click(function() {

   closeMenu();
  });


   var lastScrollTop = 0;
    var $con = $('#wrapper');
    var $elementToFade = $("#help_header"); // Assuming you have an element with the id 'button'

    $con.scroll(function () {
        var currentScroll = $con.scrollTop();
        if (currentScroll > lastScrollTop && $con.innerHeight() > 100) {
           
           //if (!$elementToFade.is(':animated')) {
			//$elementToFade.addClass("fadout").removeClass("fadein");
		   //}
		  //prevent_click = true;
            //console.log("down");
        } else if (currentScroll < lastScrollTop || currentScroll <= 0) {
          //$elementToFade.addClass("fadein").removeClass("fadout");
            //console.log("up");
			// prevent_click = false;
			
			
        }
        lastScrollTop = currentScroll;
    });

}
	

	
}, false);




view_help_while_scroll();



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






if(dir == "rtl"){
$('body').addClass("rtl"); 
$("body").attr("dir", "rtl");
}

if(dir == "ltr"){
$('body').addClass("ltr"); 

$("body").attr("dir", "ltr");

}












