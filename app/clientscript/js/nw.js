
var isReloadedInIframe = false;

if (window.top !== window.self) {
  // This page is inside an iframe, set the variable to true
  isReloadedInIframe = true;
}

// Now you can use the isReloadedInIframe variable as needed
//console.log("Reloaded in iframe:", isReloadedInIframe);


if(!isReloadedInIframe){
	


//console.log(require);
if (typeof require === 'function' && typeof require('nw.gui') !== 'undefined') {


 var gui = require('nw.gui');


      function showContextMenu(event,x,y) {
      event.preventDefault();

      var menu = new gui.Menu();


     

if(copySelectedTextTo_Clipboard(event)){
	
	  menu.append(new gui.MenuItem({
        label: 'Copy',
        click: function() {
        
       
		
		copySelectedTextTo_Clipboard2(event);
		
		
	

        }
      }));
	  
	  if (event.target.isContentEditable || (event.target.tagName === 'INPUT')) {
	   menu.append(new gui.MenuItem({
        label: 'Cut',
        click: function() {
       
          document.execCommand('cut');
        }
      }));
	  }
	  
	  
	  
}

    
inputId = event.target.id;



if (event.target.isContentEditable || (event.target.tagName === 'INPUT')) {

if(checkClipboard()){
      menu.append(new gui.MenuItem({
        label: 'Paste',
        click: function() {
       
          document.execCommand('paste');
        }
      }));
	  
}
}



 menu.append(new gui.MenuItem({
        label: 'select All',
        click: function() {
       
         select_all(event);
        }
      }));



if(inputId=="favBox"){
	 var favBox = document.getElementById('favBox');
      favBox.focus();			
			
		inputId ="";
				inputs ="";	
			
			}

if(inputId=="searchBox"){
	 var searchBox = document.getElementById('searchBox');
      searchBox.focus();			
			
		inputId ="";
				inputs ="";	
			
			}


if(inputId=="hash_con"){
	

//var hash_con = document.getElementById('hash_con');
 //hash_con.focus();		


}

if(inputId=="text_con"){
	

//var text_con = document.getElementById('text_con');
//text_con.focus();		


}

if(x){
	
	menu.popup(x, y);
	
}
else{
	
	 
	  menu.popup(event.x, event.y);
}
     
    }

   
   
    var clipboard = require('nw.gui').Clipboard.get();

        // Function to check if there is a value in the clipboard
        function checkClipboard() {
            var clipboardValue = clipboard.get();

            if (clipboardValue) {
               return true;
            } else {
                return false;
            }
        }
   
   
	
	document.addEventListener('DOMContentLoaded', function() {
       // Attach the event listener using JavaScript
    

if(document.body){
	 document.body.addEventListener('contextmenu', showContextMenu);
}
          
     


   });
	
	
	
	
	
}

}