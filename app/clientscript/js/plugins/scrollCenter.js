$.fn.scrollCenter = function(elem, speed) {
//alert($.support.rtlScrollType);
		if($.support.rtlScrollType == "default") {
		var active = $(this).find(elem);
		var activeWidth = active.width() / 2;
		var pos = active.position().left + activeWidth;
		var elpos = $(this).scrollLeft();
		var elW = $(this).width();
		pos = pos + elpos - elW / 2;
		$(this).animate({
			scrollLeft: pos - 30
		}, speed == undefined ? 1000 : speed);
		return this;
	} 
	 else if($.support.rtlScrollType == "negative") {
		
		//alert();
		var active = $(this).find(elem);
		var activeWidth = active.width() / 2;
		var pos = active.position().left + activeWidth;
		var elpos = $(this).scrollLeft();
		var elW = $(this).width();
		pos = pos + elpos - elW / 2;
		$(this).animate({
			scrollLeft:  pos - 30
		}, speed == undefined ? 1000 : speed);
		return this;
	}
	
	else if($.support.rtlScrollType == "reverse") {
		
		//alert();
		var active = $(this).find(elem);
		var activeWidth = active.width() / 2;
		var pos = active.position().left + activeWidth;
		var elpos = $(this).scrollLeft();
		var elW = $(this).width();
		pos = pos + elpos - elW / 2;
		$(this).animate({
			scrollLeft:  pos - 30
		}, speed == undefined ? 1000 : speed);
		return this;
	}
};

