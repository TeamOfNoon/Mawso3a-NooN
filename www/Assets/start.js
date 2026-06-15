function supportsES6() {
    try {
      new Function("var f = () => {};");
      new Function("var o = { a: 1, ...{ b: 2 } };");
      return false;
    } catch (e) {
      return false;
    }
}



var isES6 = supportsES6();
if(isES6){
	
}
else{
	
	
document.write('<script src="' + ver(base+"Assets/jquery.js") + '"><\/script>');	 
	
			
document.write('<script src="' + ver(base+"Assets/plugins/json2.js") + '"><\/script>');		


document.write('<script src="' + ver(base+"Assets/demos/jquery.ba-postmessage.js") + '"><\/script>');			

	
	

}



if (typeof ViewType !== "undefined") {

if(ViewType === "search_results_page") { 

var isES6 = supportsES6();
if(isES6){
document.write('<script src="' + ver("./Assets/iframe_con/iframe_search_modern.js") + '"><\/script>');
}
else{
	

 
	
document.write('<script src="' + ver("./Assets/sections/funs_legacy.js") + '"><\/script>');		
document.write('<script src="' + ver("./Assets/iframe_con/iframe_search_legacy.js") + '"><\/script>');
} 
  
}
  




if(ViewType === "main") { 

var isES6 = supportsES6();
if(isES6){
document.write('<script src="' + ver("./Assets/iframe_con/iframe_main_modern.js") + '"><\/script>');
}
else{
	
  
	
document.write('<script src="' + ver("./Assets/sections/funs_legacy.js") + '"><\/script>');		
document.write('<script src="' + ver("./Assets/iframe_con/iframe_main_legacy.js") + '"><\/script>');
} 
  
}
  



if(ViewType === "forum") { 

var isES6 = supportsES6();
if(isES6){
document.write('<script src="' + ver("../../Assets/iframe_con/iframe_forum_modern.js") + '"><\/script>');
}
else{

 

	
document.write('<script src="' + ver(base+"Assets/sections/funs_legacy.js") + '"><\/script>');	
document.write('<script src="' + ver(base+"Assets/iframe_con/iframe_forum_legacy.js") + '"><\/script>');
} 
  
}
  



if(ViewType === "thread") { 

var isES6 = supportsES6();
if(isES6){
document.write('<script src="' + ver("../../Assets/iframe_con/iframe_thread_modern.js") + '"><\/script>');
}
else{
	
	

document.write('<script src="' + ver("../../Assets/sections/funs_legacy.js") + '"><\/script>');		
document.write('<script src="' + ver("../../Assets/iframe_con/iframe_thread_legacy.js") + '"><\/script>');
} 
  
}
  
  


if(ViewType === "post") { 

var isES6 = supportsES6();
if(isES6){
document.write('<script src="' + ver("../../Assets/iframe_con/iframe_post_modern.js") + '"><\/script>');
}
else{

	
document.write('<script src="' + ver("../../Assets/sections/funs_legacy.js") + '"><\/script>');		
document.write('<script src="' + ver("../../Assets/iframe_con/iframe_post_legacy.js") + '"><\/script>');
} 
  
}
  
  
  
 

if(ViewType === "index_php") { 

var isES6 = supportsES6();
if(isES6){
document.write('<script src="' + ver("./Assets/iframe_con/iframe_index_php_modern.js") + '"><\/script>');
}
else{
	
document.write('<script src="' + ver("./Assets/sections/funs_legacy.js") + '"><\/script>');		
document.write('<script src="' + ver("./Assets/iframe_con/iframe_index_php_legacy.js") + '"><\/script>');
} 
  
}
  
  
  
  
if(ViewType === "index_html") { 

var isES6 = supportsES6();
if(isES6){
document.write('<script src="' + ver("./Assets/iframe_con/iframe_index_html_modern.js") + '"><\/script>');
}
else{

	
document.write('<script src="' + ver("./Assets/sections/funs_legacy.js") + '"><\/script>');		
document.write('<script src="' + ver("./Assets/iframe_con/iframe_index_html_legacy.js") + '"><\/script>');
} 
  
}
    
  
  
}