var successful = false;
var temp_text = "";
var post_num ="";
var tempInput="";


function copy_all(event) {
hide_elements();
 //whol_text_selected  = true;
 event.preventDefault();
 event.stopPropagation();
    select_all_and_copy(document.getElementById("wrapper"),"select_all",null);


}


function select_all_and_copy(el, code, nocopy) {
    
	
	
	if (_isMobile() != mobiletrue){
    if($("#hand img").attr("src") == rootpath + 'clientscript/images/tools/hand2.png'){
 
        $("img,a,html").unbind( "dragstart selectstart" );

    }
    }
  
  
        $('em').contents().unwrap();
	
	
	
	
	
   if($(el).attr("id")){
	   post_num = $(el).attr("id").replace("p=", "");
   }
   
   tempInput="";

    if (printin_prosses === false) {
        printin_prosses = true;





        if(code=="select_img_link"){

		 select_range(el);
		 
		 
		if (!nocopy) {
            show_tooltip(el, code);
        }
	   
	   }


       if(code=="text_code_quote"){

		 select_range(el);
		 
		 
		if (!nocopy) {
            show_tooltip(el, code);
        }
	   
	   }
	   

       if(code=="text_code_hash"){

		 select_range(el);
		 
		 
		if (!nocopy) {
            show_tooltip(el, code);
        }
	   
	   }




      if(code=="select_text_link"){

		 select_range(el);
		 
		 
		if (!nocopy) {
            show_tooltip(el, code);
        }
	   
	   }
	   
	   

      if(code=="select_all"){

		
		 select_range(el);
		
		
		
		if (!nocopy) {
            show_tooltip(el, code);
        }
	   
	   }




       if(code=="select_post"){

		
		 select_range(el);
		
		
		
		if (!nocopy) {
            show_tooltip(el, code);
        }
	   
	   }




        if(code=="post_link"){

        create_temp_text_input();
        tempInput.value = $(el).attr("href");

        document.body.appendChild(tempInput);
		
		tempInput.select();
		
		if (!nocopy) {
            show_tooltip(el, code);
        }
	   
	   }



       if(code=="post_num"){

        create_temp_text_input();
        tempInput.value = post_num;

        document.body.appendChild(tempInput);
		
		tempInput.select();
		
		if (!nocopy) {
            show_tooltip(el, code);
        }
	   
	   }



       if(code=="post_code"){
	
	    post_num = "======== اقتباس =========\n[SHOWPOST]" + post_num + "[/SHOWPOST]";

        create_temp_text_input();
        tempInput.value = post_num;

        document.body.appendChild(tempInput);
		
		tempInput.select();
		
		if (!nocopy) {
            show_tooltip(el, code);
        }
	   
	   }
	   
	   
	     setTimeout(function () {
                
       


      
  if (_isMobile() != mobiletrue){      
                 if($("#hand img").attr("src") == rootpath + 'clientscript/images/tools/hand2.png'){
          $("img,a,html").bind('dragstart selectstart', function(e) {
		e.preventDefault();
		return false;
	}); 

    }
   
   
   }
   
   
  
             
 }, 150);

 
       
    }
	
	
	 setTimeout(function () {
		
 		 if(tempInput){
			 document.body.removeChild(tempInput); 
		 }
          
        }, 0);




 setTimeout(function () {
	 
	  $("#wrapper").css("marginTop", ""); 
	  $("#wrapper").css("paddingBottom", "");

		}, 500);
	 
	 
	 
 if(code=="select_all" || code=="select_text_link" || code=="select_post"){
	 
	$("#iscroll").scrollTop($(el).parent().position().top + $("#iscroll").scrollTop());
 }	
	






}



function show_tooltip(el, code) {
  
  selected_dom = getSelectionTextAndContainerElement();  

    try {
        successful = document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy text to clipboard', err);
    }

    if (successful) {
       
	   
	   
	   
	   if(code=="text_code_quote"){

		 temp_text =The_quote_text_has_been_copied;
	   
	   }
	   

       if(code=="text_code_hash"){

		 temp_text =The_hashtag_text_has_been_copied;
	   
	   }
	   
	   if(code=="select_img_link"){
		   
		  temp_text =Link_copied;
		   
	   }
	   
	   
	   if(code=="select_text_link"){
		   
		  temp_text =Link_copied;
		   
	   }


	   
	   if(code=="select_all"){
		 
          temp_text =Page_text_copied;
		 
	   }
	   
 
	   
	   if(code=="select_post"){
		  
            temp_text =The_text_of_the_requested_statement_has_been_copied;
       
		  
	   }
	   

	   
       if(code=="post_link"){
		    
			temp_text =Link_copied;
       
			
	   }

       if(code=="post_num"){

            temp_text =post_num_copied;
        
	   
	   }



	   if (code == "post_code") {
            temp_text =copy_post_code_done;
            
        }
        
		
		
		tooltip(null, temp_text);



        setTimeout(function () {
            tooltip("remove", null);
        }, 3000);
    }
	else{
		


             if (typeof Androidd !== 'undefined') {
                setTimeout(function() {
			
 
						   var post_num = "";
						   var post_link = $(el).attr("href");
						 
			if($(el).attr("id")){

                  post_num =  $(el).attr("id").replace("p=", "");
				  
			}				
							 
	  if(code=="text_code_quote"){

		        Androidd.copy_text(selected_dom.text,selected_dom.html);
	   
	   }
	   

       if(code=="text_code_hash"){

		         Androidd.copy_text(selected_dom.text,selected_dom.html);
	   
	   }
	   
	  
	   
	   
	   if(code=="select_text_link"){
		   
		          Androidd.copy_text(selected_dom.text,selected_dom.html);
		   
	   }


	   
	   if(code=="select_all"){
		 
                  Androidd.copy_text(selected_dom.text,selected_dom.html);
		 
	   }
	   
 
	   
	   if(code=="select_post"){
		  
                    Androidd.copy_text(selected_dom.text,selected_dom.html);
       
		  
	   }
	   

	   
       if(code== "post_link"){
								   Androidd.copy_text(post_link,""); 
		}
							 
							 
							 

       if(code=="post_num"){

           
		   Androidd.copy_text(post_num,""); 
        
	   
	   }



	   if (code == "post_code") {
           var post_code=  "======== اقتباس =========\n[SHOWPOST]" + post_num + "[/SHOWPOST]";
           Androidd.copy_text(post_code,"");
            
        } 
							 
							 
							 
							 
							 
							 
							 
                   

					printin_prosses = false;
                }, 300);
            }
			else{
				
			tooltip(null, Your_browser_does_not_support_the_copy_function);	
				
			}





           

            setTimeout(function() {
                tooltip("remove", null);
            }, 3000);
       
	}
	

}



function tooltip(el, message) {

    var element = document.getElementById('copy_tooltip');
    var tooltip;

    if (el == null) {

        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //var x = parseInt(el.getBoundingClientRect().left) + scrollLeft + 400;
        //var y = parseInt(el.getBoundingClientRect().top) + scrollTop + 100;



        //alert(element);
        if (typeof(element) == 'undefined' || element == null)
        //if (!document.getElementById("copy_tooltip"))
        {

            tooltip = document.createElement('div');
            tooltip.id = "copy_tooltip";
            tooltip.style.display = "block";
            //tooltip.style.position = "fixed";
            //tooltip.style.position = "absolute"; 
            //tooltip.style.border = "1px solid black";
            //tooltip.style.background = "#dbdb00";
            //tooltip.style.opacity = 1;
            //tooltip.style.width = "100px";
            //tooltip.style.height = "auto";
            //tooltip.style.marginLeft = "-50px";
            //tooltip.style.marginTop = "-50px";
            //tooltip.style.textAlign= "center";
            //tooltip.style.padding= "4px";
            //tooltip.style.zIndex = "9"; 




            document.body.appendChild(tooltip);


        }
      if(tooltip){
		   tooltip.innerHTML = message;
	  }
       
    } else {

        if (document.getElementById('copy_tooltip')) {
            document.getElementById('copy_tooltip').outerHTML = "";
            delete document.getElementById('copy_tooltip');
            printin_prosses = false;

        }

    }

}









function select_range(el){
	
node = el;
        var range;
        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(node);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            //console.warn("Could not select text in node: Unsupported browser.");
        }
}




function create_temp_text_input(){
	
tempInput = document.createElement("textarea");
tempInput.setAttribute('readonly', true);
tempInput.style.position = 'fixed';
tempInput.style.top = '-100000000px';
tempInput.style.left = '-100000000px'; 
tempInput.style.width = '2em';
tempInput.style.height = '2em'; 
tempInput.style.padding = '0';  
tempInput.style.border = 'none';
tempInput.style.outline = 'none';
tempInput.style.boxShadow = 'none';   
tempInput.style.background = 'transparent';
tempInput.setAttribute('contenteditable', true);
//tempInput.style.display = 'none';	
	
}