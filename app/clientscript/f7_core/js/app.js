// Dom7
//var $ = Dom7;

// Theme
var theme = 'ios';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}


if(style_type == "ios"){
	theme= "ios";
}

if(style_type == "andro"){

	
	theme= "md";
	
}




// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  activeState: false,
  view: {
      animate : false,
  },
   touch: {
        disableContextMenu: false
    }
});


 var popover =  popover = app.popover.create({
    el: '.popover',
    targetEl: '.open-popover',
   });	



function hasNoVerticalScroll(element) {
  return element[0].scrollHeight <= element[0].clientHeight;
}



var previousOrientation = window.orientation;


var checkOrientation = function(){


      
	  if(window.innerHeight > window.innerWidth){
$(".sheet-modal").removeAttr("style");
}else{
	
	   $(".sheet-modal").css("height","100%");
	
}



};



window.addEventListener("resize", checkOrientation, false);
window.addEventListener("orientationchange", checkOrientation, false);

// (optional) Android doesn't always fire orientationChange on 180 degree turns
setInterval(checkOrientation, 1);



$(document).ready(function() {


if(_isMobile()){
if(window.innerHeight > window.innerWidth){
  $(".sheet-modal").removeAttr("style");  
}else{
	$(".sheet-modal").css("height","100%");
}	
}




if(document.location.href.indexOf("&ux=search") != -1) {
			
show_tab(null, "search_view");




} 
else if(document.location.href.indexOf("&ux=bookmark") != -1) {

		
show_tab(null, "fav_view");
	
	
	
	
}
else{


show_tab(null, "home_view");
	
}



$('body').on('popover:open', '.popover', function () {
  // Your code to run when the popover is opened
//  console.log('Popover opened');
  
$(".popover-inner").css("height",($("#home_view").outerHeight())+"px");

	
 if (hasNoVerticalScroll($(".popover-inner"))) {
      $(".popover-inner").css("height","auto");
  } else {
    console.log("Element has vertical scroll.");
  }	
	

  
});



	
	
$(window).resize(function(e) {


$(".popover-inner").css("height",($("#home_view").outerHeight())+"px");

 
	
	
 if (hasNoVerticalScroll($(".popover-inner"))) {
      $(".popover-inner").css("height","auto");
  } else {
    console.log("Element has vertical scroll.");
  }	
	
if
(
(document.location.href.indexOf("&ux=search") != -1) 
|| 
(document.location.href.indexOf("&ux=bookmark") != -1)
) 
{



}



	
	
});	
	
	

	
	
});


/*

var stepFrames = (function() {
  var currentFrame = 0;
  var totalFrames = 0;
  var classesToRemove = 'active-1 active-2 active-3 active-4 active-5';
  var els = {};

  function _updateFrameClasses(i){
    // If already on frame, don't query DOM
    if (currentFrame === i){ return; }
    
    currentFrame = i;
    els.$sections.removeClass('section-active');
    els.$sectionContainer.removeClass(classesToRemove);
    els.$sections.eq(i).addClass('section-active');
    els.$sectionContainer.addClass('active-' + (i + 1));
	
	
	
  }
  function goToFrame(frameIndex) {
    _updateFrameClasses(frameIndex);
    if(frameIndex >= 1) {
   
    } else if (frameIndex === 0) {
     
    }
  }
  function getFrame() {
    return currentFrame;
  }
  function getTotalFrames() {
    return totalFrames;
  }
  
  function init() {
    console.log("initialized!");
    els['$sectionContainer'] = $('.tabs');
    els['$sections'] = els.$sectionContainer.find('.section');
    totalFrames = els.$sections.length;
  }

  // Reveal public pointers to
  // private functions and properties

  return {
    goTo: goToFrame,
    currentFrame: getFrame,
    totalFrames: getTotalFrames,
    init: init
  };
})();

stepFrames.init();


*/









function toggleToolbarPosition(){


var elements = document.querySelectorAll(".toolbar, .tabbar");

// Loop through the NodeList and toggle the class on each element
elements.forEach(function(element) {
  element.classList.toggle("toolbar-bottom-md");
});



}



function hide_all_keep_active(){
var tabs = document.querySelectorAll('.tab');
var tab_active = document.querySelectorAll('.tab-active')[0];		
// Loop through each "tab" element and hide it
for (var i = 0; i < tabs.length; i++) {
  var tab = tabs[i];
 tab.style.visibility = 'hidden';
 // tab.style.position= 'absolute';
}
tab_active.style.visibility = 'visible';
//tab.style.position= 'relative';
}

var tabLinks = document.querySelectorAll('.tabs')[0];


tabLinks.addEventListener('transitionstart', function (event) {


var target = event.target;

//if ((' ' + target.className + ' ').indexOf('tabs') > -1) {

//$("#loading").show();
	
//}


});


tabLinks.addEventListener('transitionend', function () {
console.log('Tab content has finished sliding or transitioning.');
hide_all_keep_active();

if(donthide == false){
setTimeout(function() {
			$("#loading").hide();
			
		}, 100);	


}





});


hide_all_keep_active();
	
var tabs_click = document.querySelectorAll('.tab-link');

	
for (var i = 0; i < tabs_click.length; i++) {

var tab_click = tabs_click[i];




tab_click.addEventListener('click', function () {
 

 
if (( this.className).indexOf('tab-link-active') > -1) {
	//alert(this.className);
}

});


}	

$('.tab').on('tab:show', function () {
	 $("#loading").show();
	  if(typeof show_fav != 'undefined') {
				  show_search(null,'hide');
				  show_fav(null,'hide');
			  }
	 
});	






function show_tab(elem, view_name) {
//donthide = false;	
//hide_all_keep_active();


	popover.close();
	//break_fun = true;
	var current_hash = window.location.hash;
	current_hash = current_hash.replace(/^#+/, '');
	var hash2 = current_hash.split('%23')[1];
	
	if(hash2){
	  hash2 = "%23"+hash2;
	}
	else{
	
	  hash2 = "";
	}
	current_hash = removeParam("ux", current_hash);

	current_hash = current_hash.split('%23')[0];
	if(view_name === 'search_view') {
	
	if(elem !=null){
			donthide = false;
			stop_load_ifram = true;
		}
	
	//stepFrames.goTo(1);
    
	    $("#fav_nav").hide();
        $("#search_nav").show();
		$("#home_nav").hide();
     //stop_load_ifram = true;
		
      app.tab.show('#search_view');			
      $(".tab").addClass("is-hidden").removeClass("tab-active");
	  $("#search_view").removeClass("is-hidden").addClass("tab-active");  

        $(".tab-link").removeClass("tab-link-active");
		$("#search_tab").addClass("tab-link-active");	  
		
		
				       //show_search_view();
if((document.location.href.indexOf("&ux=search") == -1)) {
history.replaceState(null, null, "#" + current_hash + "&ux=search"+hash2,null);

} 
	
		
	}else
	if(view_name === 'fav_view') {
	//stepFrames.goTo(2);
	     $("#search_nav").hide();
		$("#home_nav").hide();
		$("#fav_nav").show();
		
		//stop_load_ifram = true;
		
		app.tab.show('#fav_view');
		
	  $(".tab").addClass("is-hidden").removeClass("tab-active");
	  $("#fav_view").removeClass("is-hidden").addClass("tab-active"); 
        $(".tab-link").removeClass("tab-link-active");
		$("#fav_tab").addClass("tab-link-active");	  
		
	fetchBookmarks(fav_title, fav_url);	
	
	   
if((document.location.href.indexOf("&ux=bookmark") == -1)) {
	history.replaceState(undefined, undefined, "#" + current_hash + "&ux=bookmark"+hash2,null);
} 


	   //$(".tabs").addClass("turn_off_flex_tabs");
		
		if(elem !=null){
			donthide = false;
			stop_load_ifram = true;
		}
		
		
		
	}
	else{
		
		 //stepFrames.goTo(0);
        $("#fav_nav").hide();
		$("#search_nav").hide();
		$("#home_nav").show();
		
		if(elem !=null){
			stop_load_ifram = true;
			donthide = false;
		}
		
	    
        app.tab.show('#home_view');
		
		//$(".tabs").addClass("turn_off_flex_tabs");
		
		$(".tab").addClass("is-hidden").removeClass("tab-active");
		
	    $("#home_view").removeClass("is-hidden").addClass("tab-active"); 
        $(".tab-link").removeClass("tab-link-active");
		$("#home_tab").addClass("tab-link-active");  
		
		$("#search_view").hasClass("is-hidden") 

		
if((document.location.href.indexOf("&ux=search") != -1) || (document.location.href.indexOf("&ux=bookmark") != -1)) {
history.replaceState(undefined, undefined, "#" + current_hash+hash2,null); 
} 
/*
$.postMessage('{"eventname":"render"}', // The message to send (string)
				"*", // The host of the target window (i.e. http://www.vistaprint.com)
				window.frames["iframe_name"] // A reference to the target window
			);*/
	
	}
	
	
	

}

function show_search(event,cmd){
	
	
	
	if(cmd == "show"){
			$('#search_bar').addClass("searchbar-enabled");
	}
	
	if(cmd == "hide"){
		$('#search_bar').removeClass("searchbar-enabled");
		 $("#searchBox").blur();
		 $("#favBox").blur();
	}


    
   setTimeout(function() {
	   	        $('.sheet-modal').addClass("modal-out");
                $('.sheet-modal').removeClass("modal-out");
				$('.sheet-modal').removeClass("modal-in");
            	$('.sheet-modal').hide();
          }, 0);
	
}








function show_fav(event,cmd){
	if(cmd == "show"){
			$('#fav_bar').addClass("searchbar-enabled");
	}
	
	if(cmd == "hide"){
		$('#fav_bar').removeClass("searchbar-enabled");
		 $("#searchBox").blur();
		 $("#favBox").blur();
	
	}

	
	
}

 document.getElementById("favBox").addEventListener("keydown", function (e) {
      
	  if (e.key === "Enter") {
	  e.preventDefault(); // Prevent the form from submitting
	  }
  });
  
  
  
/*var elementsWithClass = document.getElementsByClassName('tabs-animated-wrap');

// Loop through the elements and remove the class
for (var i = 0; i < elementsWithClass.length; i++) {
var element = elementsWithClass[i];
  element.style.overflow = 'hidden';
}*/
