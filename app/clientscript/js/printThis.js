  function hidePrint(mode) {
  

              if(window.location == window.parent.location) {

			$('#loading').show()

		} else {


			$.postMessage(
				'{"eventname":"loader", "hide":"false"}', // The message to send (string)
				"*", // The host of the target window (i.e. http://www.vistaprint.com)
				parent // A reference to the target window
			);
		}
  
  
  
  
  
 
		        setTimeout(function() {
                          
                                       $("#overlay_print").remove();
  
                                        $(".post").show();
					 $(".header_topic").show();
					 $(".page-break").show();
					 
					
					  
					 
	       if(window.location == window.parent.location) {

			$('#loading').hide()

		} else {


			$.postMessage(
				'{"eventname":"loader", "hide":"true"}', // The message to send (string)
				"*", // The host of the target window (i.e. http://www.vistaprint.com)
				parent // A reference to the target window
			);
		}
  
					 
				//location.reload();	 
					 
					 
					 
                   
                        }, 100)
  
  }
 
 
 
 function afterPrint(mode) {
    


   if(document.getElementById('text')){
	


    if (typeof Androidd !== 'undefined') {

	  if(Androidd.get_api_level()>=19){

	      document.getElementById('text').innerHTML=printing_done+"<br><div class =\"dot\">x<\/div>";

      }else{

          document.getElementById('text').innerHTML=Your_browser_or_device_does_not_support_printing+"<br><div class =\"dot\">x<\/div>";

      }
    }else{

    document.getElementById('text').innerHTML=printing_done+"<br><div class =\"dot\">x<\/div>";

    }

	

            if(document.getElementById('night'))
            document.getElementById('night').disabled = false;


$('#overlay_print').attr('onclick', 'hidePrint()');
}




  

   };

 
 
 
 
 
 
 
function print_this(type){
	

 if (typeof Androidd != 'undefined') {



           //if(parseFloat(Android.GoAver(null))>=4.4){
           if(Androidd.get_api_level()>=19){

                var movies = [
                $("#wrapper").html(),
                $('.posttext > div,.posttext > span ,.posttext > font').css("line-height"),
                $('.posttext').css('font-size'),
                $('#wrapper').css("font-family")
                ];
             
                
                save_Setting('quentinTarantino', JSON.stringify(movies), "andro");
                
				
				//alert(JSON.stringify(movies));
				Androidd.goPrintWebView();


           }else{

               Androidd.goTost(Printing_is_not_available_for_Android_device,null);
               afterPrint();

           }

       }
     //else if (typeof window.webkit.messageHandlers.observer.postMessage('print') !== undefined){
     else if(typeof is_ios_app != 'undefined') {   
		
		
       var movies = [
       $("#wrapper").html(),
       $('.posttext > div,.posttext > span ,.posttext > font').css("line-height"),
       $('.posttext').css('font-size'),
       $('#wrapper').css("font-family")
       ];
    
       
       save_Setting('quentinTarantino', JSON.stringify(movies), "all");
       
       
       window.focus();
         var obj = {event: "print", arg: "null"};
          window.print = function() { window.webkit.messageHandlers.observer.postMessage(JSON.stringify(obj))
          }
          
          
      setTimeout(function() {
		  
		    window.print();
   
	  
	   setTimeout(function() {
		  
	
      afterPrint(); 
		  
	  }, 500);
	  
		  
	  }, 0);



	  

    }
    
    
       else{
    
        if(document.getElementById('night'))
            document.getElementById('night').disabled = true;

        window.focus();
      
    window.print();
       afterPrint();
           
     //window.webkit.messageHandlers.print.postMessage('print') ;
           
           
           
       }




}
    
		

 
