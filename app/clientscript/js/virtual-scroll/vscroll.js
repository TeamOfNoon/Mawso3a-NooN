(function(window, document) {
	'use strict';
	var _slice = Array.prototype.slice;
	var _frag = document.createDocumentFragment(); // Reusable documentFragment
	function removeArrayOfElements(arr) {
		var l = arr.length;
		while(l--) arr[l].parentNode.removeChild(arr[l]);
	};
	// Get frag of elements from, to
	function getFrag(data, startIndex, endIndex, that) {
		var dataArray = data.slice(startIndex, endIndex);
		var i = 0;
		var len = dataArray.length;
		for(; i < len; i++) {
			var item = that.createItem(dataArray[i], i, startIndex, endIndex);
			if(((i + 1) % that.columns) === 0) item.setAttribute('data-last-column', 'true');
			_frag.appendChild(item);
		};
		return _frag;
	};
	// Get scrollTop and clientHeight of any element or window
	function getUnits(element) {
		var result = {};
		if(element === window) {
			result.scrollTop = element.pageYOffset !== undefined ? element.pageYOffset : (document.documentElement.scrollTop || document.body.scrollTop || 0);
			result.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			//alert(result.clientHeight);   
		} else {
			result.scrollTop = element.scrollTop;
			result.clientHeight = element.clientHeight;
			//alert(result.clientHeight );
		};
		return result;
	};

	function VScroll(options) {
		var that = this;
		that.container = document.querySelector(options.container); // Required
		that.scrollParent = document.querySelector(options.scrollParent);
		// alert(that.container); 
		that.data = options.data; // Required
		that.itemHeight = options.itemHeight|| 50;
		that.itemWidth = options.itemWidth; // Calacute columns using itemWidth
		that.createItem = options.createItem; // Required
		that.buffer = options.buffer || 0;
		that.columns = options.columns || 1;
		that.smartBuffer = options.smartBuffer !== undefined ? options.smartBuffer : true; // Bind buffer and columns;
		that.responsive = options.responsive; // Recalcaute columns using itemWidth on window resize
		that.offsetBefore = options.offsetBefore || 0;
		that.offsetAfter = options.offsetAfter || 0;
		that.scrollOffset = options.scrollOffset || 0;
		that.optionsWrapper = options.wrapper; // To set up wrapper later.
		that.optionsItemsWrapper = options.itemsWrapper; // To set up wrapper later.
		that.lastStartIndex = 0;
		that.lastEndIndex = 0;
		that.wrapper = that.itemsWrapper = that._lastStartIndex = that._lastEndIndex = null; // Will be set in refresh()    
		that.cutNodeN = null;
		that.onetime = true;
		// the update function is optimized and it's ultra fast.
		// Calling an empty function () {} is only 4 times faster than update();
		that._scrollEvent = function() {
			that.update();
		};
		that._resizeEvent = function() {
			that.refresh();
		};
		that.scrollParent.addEventListener('scroll', that._scrollEvent, false);
		if(that.responsive) window.addEventListener('resize', that._resizeEvent, false);
		// Initialize
		that.refresh();
		
		
		return that;
	};
	VScroll.prototype = {
		update: function() {
			var that = this;
			that.scrollOffset = (that.container.offsetTop);
			// alert(longestH);
			// alert(that.itemHeight);
			var units = getUnits(that.scrollParent);
			// Here we calcaute the indexes (start, end)
			var _startIndex = Math.floor((units.scrollTop - that.offsetBefore - that.scrollOffset) / that.itemHeight) * that.columns;
			var _endIndex = Math.ceil(units.clientHeight / that.itemHeight) * that.columns;
			var startIndex = Math.max(_startIndex - that.buffer, 0);
			var endIndex = Math.min(startIndex + _endIndex + (that.buffer * 2), that.data.length); // We must multiply the buffer to make it perfect
			// We mark when data is changed
			var changed;
			var len;
			/*if ($("#search_view").css("display") == "none") 
			 return false;*/
			if(that.onetime) {
				that.cutNodeN = _endIndex + (that.buffer * 2);
				that.temphight = that.container.style.minHeight;
				//if(is_snipit_enabled) {
					if(document.getElementById("sample").style.display == "block") {
						$("#snpt,#snptviewcon").removeClass("is-hidden");
					} else {
						$("#snpt,#snptviewcon").addClass("is-hidden");
					}
				//}
				that.onetime = false;
			}
			if(that.itemsWrapper.childNodes[0]) {

				if(git == true) {
				
				  var curr_index_temp = (Math.floor((that.scrollParent.scrollTop - that.offsetBefore - that.scrollOffset) / that.itemHeight) * that.columns);
				  if (curr_index_temp != null) {
                                       if (curr_index_temp >= 0) {
                                              curr_index = curr_index_temp;
                                              
                                             
				         }
				        
			          }
			        }
			        
		
			  highlight_vl_selected_row();      
			}
			
			
			
			
			// When it comes to endIndex, we append and remove what we calcaute
			if(endIndex > that.lastEndIndex) {
				that.itemsWrapper.appendChild(getFrag(that.data, that.lastEndIndex, endIndex, that));
				that.lastEndIndex = endIndex;
			
			
		
			
			
			
			}
			if(that.lastEndIndex > endIndex) {
				len = that.itemsWrapper.childNodes.length;
				removeArrayOfElements(_slice.call(that.itemsWrapper.childNodes, endIndex - that.lastEndIndex));
				that.lastEndIndex = endIndex;
				
				
				
				
				
				
			};
			// When it comes to startIndex, and here's the smart trick here, we append and remove what we calcaute and taking columns into account.
			var gg = (that.itemsWrapper.childNodes.length - that.cutNodeN);
			if((startIndex - that.lastStartIndex) >= that.columns) {
				removeArrayOfElements(_slice.call(that.itemsWrapper.childNodes, 0, startIndex - that.lastStartIndex));
				changed = true;
			
	
			
			
			} else if(that.lastStartIndex > startIndex) {
				if((that.lastStartIndex - startIndex) >= that.columns) {
					if(that.lastStartIndex - startIndex >= len) {
						if(that.cutNodeN == len) {
							that.lastStartIndex = startIndex + len;
						} else {
							//console.log(that.cutNodeN - len);
							that.lastStartIndex = startIndex + len + (that.cutNodeN - len);
						}
					}
					that.itemsWrapper.insertBefore(getFrag(that.data, startIndex, that.lastStartIndex, that), that.itemsWrapper.firstChild);
					changed = true;
				}
				
			};
			// When startIndex changed, update paddingTop
			if(changed) {
				that.lastStartIndex = startIndex;
				that.wrapper.style.paddingTop = ((startIndex * that.itemHeight / that.columns) + that.offsetBefore) + 'px';
			};
			
			
			
			
			return that;
		},
		_setHeight: function() {
		
		
			var that = this;
			// If odd do this to perfect the height for columns
			var _dataLength = that.data.length;
			var calcHeight = _dataLength * that.itemHeight;
			while(_dataLength % that.columns) {
			
				calcHeight += (that.itemHeight);
				_dataLength++;
			};
			//that.container.style.height = ((calcHeight / that.columns) + that.offsetBefore + that.offsetAfter) + 'px';
                        that.container.style.minHeight = ((calcHeight / that.columns) + that.offsetBefore + that.offsetAfter) + 'px';
			return that;
		},
		refresh: function(fast) {
			var that = this;
			if(fast) return that._setHeight().update();
			if(that.itemWidth) that.columns = Math.floor(that.container.clientWidth / that.itemWidth);
			if(that.smartBuffer) that.buffer = that.columns;
			that._setHeight();
			// Wrapper
			if(that.optionsWrapper) {
				that.wrapper = typeof that.optionsWrapper === 'object' ? that.optionsWrapper : that.container.querySelector(that.optionsWrapper);
			} else {
				if(!that.optionsItemsWrapper) removeArrayOfElements(that.container.childNodes);
				that.wrapper = document.createElement('div');
				that.wrapper.className = 'vscroll-wrapper';
				that.container.appendChild(that.wrapper);
			};
			if(that.optionsItemsWrapper) {
				that.itemsWrapper = typeof that.optionsItemsWrapper === 'object' ? that.optionsItemsWrapper : that.container.querySelector(that.optionsItemsWrapper);
			} else {
				that.itemsWrapper = that.wrapper;
			};
			that.wrapper.setAttribute('data-columns', that.columns);
			removeArrayOfElements(that.itemsWrapper.childNodes);
			if(that.offsetBefore) that.wrapper.style.paddingTop = that.offsetBefore + 'px';
			// Cache
			that.lastStartIndex = 0;
			that.lastEndIndex = 0;
			that.update();
		},
		destroy: function() {
			var that = this;
			if(that.destroyed) return true;
			// Empty container if we set it up, don't damage user selected elements.
			// Just reset to zero.
			if(!that.optionsWrapper && !that.optionsItemsWrapper) {
				removeArrayOfElements(that.container.childNodes);
			} else {
				that.wrapper.style.paddingTop = null;
				that.wrapper.removeAttribute('data-columns');
				removeArrayOfElements(that.itemsWrapper.childNodes);
			};
			that.scrollParent.removeEventListener('scroll', that._scrollEvent, false);
			window.removeEventListener('resize', that._resizeEvent, false);
			// that.container.style.height = null;
			that.container.style.minHeight = null;
			// Clear
			// Note: We do this to perfect everything for checks and all.
			for(var key in that) delete that[key];
			return that.destroyed = true;
		},
		scrollto: function(index) {
			var that = this;
			var gotoindex;
			
				setTimeout(function() {
					
				if(that) {
				
				 if (index == null) {
                       
                       
                                  
				                setTimeout(function(){
					
			                        git= true; 
				                $("#loading").hide(); 
				                
				                
					  
					   }, 200);
				                
				                
				                
				                return  false;
                                        }
			
				
				
				if(that.container) {
				  
			
					  gotoindex = ((((index) * (that.itemHeight)+1) / that.columns)+that.offsetBefore + that.container.offsetTop);
				 }
				         
				         
				         
				          if(that.scrollParent) {
			
						that.scrollParent.scrollTop = gotoindex;
					        /* if($('.mark').get(0)){
					         scrollIntoView($('.mark').get(0), {
											block: 'start'
										});
						 }*/
					
				             	
				           }
				 	
				
				
					setTimeout(function(){
					
			                   highlight_vl_selected_row();
					
					
					  git= true; 
				          $("#loading").hide(); 
					
					
					  
					   }, 200);
				
				
				
				}
				
				
				
						 
				
				
				}, 0);
			
		}
	};
	// Expose
	window.VScroll = VScroll;
})(window, document);
