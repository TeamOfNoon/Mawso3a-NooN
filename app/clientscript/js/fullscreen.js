
/* Get into full screen */
function GoInFullscreen(element) {
	if(element.requestFullscreen)
		element.requestFullscreen();
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}

/* Get out of full screen */
function GoOutFullscreen() {
	if(document.exitFullscreen)
		document.exitFullscreen();
	else if(document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	else if(document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	else if(document.msExitFullscreen)
		document.msExitFullscreen();
}



function IsFullScreenCurrently() {
	var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
	
	// If no element is in full-screen
	if(full_screen_element === null)
		return false;
	else
		return true;
}


function toggle_full_screen(element){


if (typeof Androidd!= 'undefined') {

            if (Androidd.get_api_level() >= 19) {


                Androidd.toggFull("null");

                if (Androidd.getSharP("fullscreen", "false") == "true") {
                    if (document.getElementById('FullS'))
                        document.getElementById('FullS').innerHTML = "<span class =\"number\">&nbsp;3-&nbsp;</span>"+Full_screen_unresize;
                    if (document.getElementById('fullscreenid'))
                        document.getElementById('fullscreenid').src = '' + rootpath + 'clientscript/images/tools/fullSoff.png';


                } else {
                    if (document.getElementById('FullS'))
                        document.getElementById('FullS').innerHTML = "<span class =\"number\">&nbsp;3-&nbsp;</span>"+Full_screen_resize;
                    if (document.getElementById('fullscreenid'))
                        document.getElementById('fullscreenid').src = '' + rootpath + 'clientscript/images/tools/fullSon.png';
                }



            }

}

else if(typeof is_ios_app != 'undefined') {  

if(read_Setting('full_screen', "off", 'web')== "off"){
	
if (document.getElementById('FullS'))
document.getElementById('FullS').innerHTML = "<span class =\"number\">&nbsp;3-&nbsp;</span>"+Full_screen_unresize;
if (document.getElementById('fullscreenid'))
document.getElementById('fullscreenid').src = '' + rootpath + 'clientscript/images/tools/fullSoff.png';

	
save_Setting('full_screen', "on", 'web');
 var obj = {event: "cell_tag_2", arg: "on"};
 window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));
 
 
 
}
else{

save_Setting('full_screen', "off", 'web');	



if (document.getElementById('FullS'))
document.getElementById('FullS').innerHTML = "<span class =\"number\">&nbsp;3-&nbsp;</span>"+Full_screen_resize;
 if (document.getElementById('fullscreenid'))
document.getElementById('fullscreenid').src = '' + rootpath + 'clientscript/images/tools/fullSon.png';


 var obj = {event: "cell_tag_2", arg: "off"};
 window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj));
}


       
}
else{

if(IsFullScreenCurrently())
		GoOutFullscreen();
	else
		GoInFullscreen($("html").get(0));


}



}




$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
	if(IsFullScreenCurrently()) {
		
		   if (document.getElementById('FullS'))
                        document.getElementById('FullS').innerHTML = "<span class =\"number\">&nbsp;3-&nbsp;</span>"+Full_screen_unresize;
                    if (document.getElementById('fullscreenid'))
                        document.getElementById('fullscreenid').src = '' + rootpath + 'clientscript/images/tools/fullSoff.png';
		
		
	}
	else {
		if (document.getElementById('FullS'))
                        document.getElementById('FullS').innerHTML = "<span class =\"number\">&nbsp;3-&nbsp;</span>"+Full_screen_resize;
                    if (document.getElementById('fullscreenid'))
                        document.getElementById('fullscreenid').src = '' + rootpath + 'clientscript/images/tools/fullSon.png';
                
	}
});



window.onload = function(e) {


    if (typeof Androidd != 'undefined') {

                         if (Androidd.get_api_level() >= 19) {


               // Android.toggFull();


                if (Androidd.getSharP("fullscreen", "false") == "true") {
                
                    if (document.getElementById('FullS'))
                        document.getElementById('FullS').innerHTML = "<span class =\"number\">&nbsp;3-&nbsp;</span>"+Full_screen_unresize;
                   /* if (document.getElementById('fullscreenid'))
                        document.getElementById('fullscreenid').src = '' + rootpath + 'clientscript/images/tools/fullSoff.png';*/


                } else {
                    if (document.getElementById('FullS'))
                        document.getElementById('FullS').innerHTML = "<span class =\"number\">&nbsp;3-&nbsp;</span>"+Full_screen_resize;
                    /*if (document.getElementById('fullscreenid'))
                        document.getElementById('fullscreenid').src = '' + rootpath + 'clientscript/images/tools/fullSon.png';*/
                }



            }

    }
}

