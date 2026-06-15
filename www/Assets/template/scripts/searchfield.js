var gSearchPageFilePath = "main.html";
var gbGenerateForSP = 0;
var gSearchString="";
var gSearchString_untsrip="";
var blockiframeValue = false;

gRootRelPath = ".";

addRhLoadCompleteEvent(initSearchFieldSubmit);
	
function searchHelp(e, searchBoxId, cshmode)
{   //searchToggledBefore = false;
	

	
	if(e == null || e.keyCode == 13 || e.type == 'submit')
	{
		if(e != null) 
		{
			if(gbGenerateForSP || (e.type == 'submit' && cshmode == CSHMODE))
				preventEvent(e);
		}
		setParams({ rhsearch: null }, true);
		
		//gSearchString ="";
		var searchBox = document.getElementById(searchBoxId);
		var placeholderText = searchBox.getAttribute(DATAPH);
		
		sendMulti({rhsearch: ""});
		
		if(searchBox == null || searchBox == 'undefined' || trimString(searchBox.value) == "" || (trimString(searchBox.value)==placeholderText && gbIE55 &&!gbIE10))
			return;
		

		gSearchString = searchBox.value;
		
		sendMulti({rhsearch: searchBox.value});
		
		blockiframeValue = true;
	    restore_iframe();
	        var iframe =
             document.getElementById("resultsFrame");
             iframe.style.height = "0px";
			 
			 var el = document.getElementById("pageList");
             el.style.display = "none";
 
		     doSearch();
		
		
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