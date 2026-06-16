//var gSearchPageFilePath = "searchresults.htm";
var gbGenerateForSP = 0;

gRootRelPath = ".";

addRhLoadCompleteEvent(initSearchFieldSubmit);
	
function searchHelp(e, searchBoxId, cshmode,value)
{


	if(e == null || e.keyCode == 13 || e.type == 'submit')
	{
		if(e != null) 
		{
			if(gbGenerateForSP || (e.type == 'submit' && cshmode == CSHMODE))
				preventEvent(e);
		}
			
		var searchBox = document.getElementById(searchBoxId);
		var placeholderText = searchBox.getAttribute(DATAPH);
		
		if(value){
                
				
		}
        else{
            value = searchBox.value;
		}
		
		if( searchBox == 'undefined' || trimString(value) == "" || (trimString(value)==placeholderText && gbIE55 &&!gbIE10))
		{
	      return;
		}			
		
	
	

		
		doSearch(value);	
		

var hash = document.location.hash.toString();
 hash = hash.replace( /^#+/, '' );
 
    var hash2 = hash.split('%23')[1];
	
	if(hash2){
	  hash2 = "%23"+hash2;
	}
	else{
	
	  hash2 = "";
	}
	hash = hash.split('%23')[0];

hash= removeParam("rhsearch", hash.toString());


stop_load_ifram = true;
history.replaceState( undefined, undefined, "#"+hash + "&" + RHSEARCHSTR + "=" + encodeURIComponent(value)+hash2);
		
		//document.location = gRootRelPath + "/" + gSearchPageFilePath + "?" + RHSEARCHSTR + "=" + encodeURIComponent(searchBox.value);
	
	
	
	
	
	
	}
}
function initSearchFieldSubmit()
{
	if(gbIE5)
		readSetting(RHCSHMODE, callbackSearchFieldSubmit);
}
function callbackSearchFieldSubmit(cshmode)
{
	if(cshmode == CSHMODE && !gbPreviewMode)
	{
		var inputs = document.getElementsByTagName('input');
		for(var i=0; i<inputs.length; i++)
		{
			var searchAttr = inputs[i].getAttribute('data-search');
			if(searchAttr != null && searchAttr != 'undefined' && searchAttr == 'true')
			{
				var input = inputs[i];
				var id = input.getAttribute('id');
				patchInputForSubmit(input, function(){searchHelp(event, id, cshmode );});
			}
		}
	}
}
