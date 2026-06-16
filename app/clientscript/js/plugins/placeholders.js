function placeholderIsSupported() {
	var test = document.createElement('input');
	return ('placeholder' in test);
}



	$.fn.placeHolder = function(gSearchString,clear) {
		var input = this;
		var has_text = null;
		var placeholder = input.attr('placeholder'); // make sure you have your placeholder attributes completed for each input field
		var  initial_value = placeholder;

		input.parent().parent().children(".td_clear").children(clear).click(function() {
			
							
			hide_clear(input,clear);
			
		
			
			if(!placeholderIsSupported()) {
				input.val(placeholder).css({
					color: '#909090'
				});
				
				input.removeClass("not_empty");
				input.selectRange(0, 0);
				
				input.blur();
			} else {
				input.val("");
			}
		});
		
		

  
               /*input.on("change input", function() {
           
              if(!input.hasClass("not_empty")) {
               
                  show_clear(input,clear);
                  }
               
               });*/
  
  
            if(!placeholderIsSupported()) {
			
		     input.focus(function() {
				
				if(!input.hasClass("not_empty")) {	
					input.removeClass("not_empty");
					
					hide_clear(input,clear);
					
					input.selectRange(0, 0).one('keydown', function(e) {
						
						
					
						
						if(!input.hasClass("not_empty")) {
						input.val("").css({
							color: 'black'
						});
						
						input.addClass("not_empty");
						
						show_clear(input,clear);
						
						}
						
						
						
					});
					
					
				}
			});
		
			input.keyup(function() {
				
				
				if(input.val() == "") {
			
		
					hide_clear(input,clear);
					
					input.removeClass("not_empty");
					input.val(placeholder).css({
						color: '#909090'
					});
				
				        input.selectRange(0, 0).one('keydown', function(e) {
				        
				   
                                       
                                       if(!input.hasClass("not_empty")) {//empty
					
						input.val("").css({
							color: 'black'
						});
						
					
						show_clear(input,clear);
						
						
						input.addClass("not_empty");
						
					}
					
                                       
				        
						
						
					});
					
				}	
					
				
			});
			input.mouseup(function() {
				if(input.val() === placeholder) input.selectRange(0, 0);
			});
			
			input.blur(function() {
				/*if(input.val() == "" || input.val() === placeholder) input.val(text).css({
					color: 'grey'
				});*/
			});
			
			input.on("paste", function(e) {
				if(input.hasClass("not_empty")) {
					input.css({
						color: 'black'
					});
				} else {
					input.val("").css({
						color: 'black'
					});
					
					input.addClass("not_empty");
				}
					show_clear(input,clear);
				

			});
		} else {
		

			var has_text = null;
			var text = input.attr('placeholder'); // make sure you have your placeholder attributes completed for each input field
			if(text) {
				has_text = input.val();
				if(has_text) {
				

					input.addClass("not_empty");
					//show_clear(input,clear);
				} else {
					//input.val(text);
				}
			}
			input.focus(function() {
				if(input.val()) {
				
					show_clear(input,clear);
				}
			});
			input.blur(function() {
				//if (input.val() == "" || input.val() === text) input.val(text).css({ color:'grey' }); 
			});
			input.keyup(function() {
		
				
				if(input.val() == "") {
				
				
					hide_clear(input,clear)
				} else {
				
					show_clear(input,clear);
				}
			});
			input.mouseup(function() {
				//if(input.val() === text) input.selectRange(0, 0);
			});
			input.bind("paste", function(e) {
				show_clear(input,clear);
			
			});
			
		}
	};
	$.fn.selectRange = function(start, end) {
		return this.each(function() {
			if(this.setSelectionRange) {
				this.setSelectionRange(start, end);
			} else if(this.createTextRange) {
				var range = this.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			}
		});
	};
	
	
	
	function show_clear(input,clear){
	
					$(clear).show();
				
		
					$(clear).parent().css({
						width: '2.5em'
					}).show();
					
					
					
					
	
	
	}
	
	
	function hide_clear(input,clear){
	
		
					$(clear).hide();
					$(clear).parent().css({
						width: '0.8em'
					});
	
	
	}

