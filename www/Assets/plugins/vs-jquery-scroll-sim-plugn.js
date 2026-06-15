// ======== VIRTUAL SCROLL PLUGIN - CLEAN STRUCTURE ========
(function ($) {

  // ========================================
  // CONSTRUCTOR
  // ========================================
  var VirtualScrollPro = function (element, options) {
    this.$element = $(element);
    this.element = element;
    this.options = options;

    this.initialized = false;

    this.isRTL = (this.options.dir === 'rtl');
    this.isHorizontal = (this.options.scroll_dir === 'horizontal');

    this.widget = this.$element;
    this.vs = this.widget[0];

    // Width & height detection
    this.wStr = (this.options.width + "").toLowerCase().replace(/\s+/g, '');
    this.hStr = (this.options.height + "").toLowerCase().replace(/\s+/g, '');

    var wEmpty = (!this.options.width || this.options.width === "");
    var hEmpty = (!this.options.height || this.options.height === "");

    if ((wEmpty && hEmpty) || (this.wStr === "100%" && this.hStr === "100%")) {
      this.options.type = "full";
    }

    this.isFull = (this.options.type === 'full');

    // Instance-specific variables (not shared between widgets)
    this.ROW_H = 0;
    this.ROW_W = 0;

	
this.data = this.options.data || null;
this.useCustomData = !!this.data;

// If no custom data provided, use default rows
if (!this.useCustomData) {
    // Set default total
    this.total = 100000000000000;
} else {
    // Use the length of provided data array
    this.total = this.data.length;
}
	
	

	
	
	//this.total = 1;
    this.$iscroll = null;
    this.$bar = null;
    this.$thumb = null;
    this.max = 0;
    this.offset = 0;
    this.useA = true;
    this.$rowsA = null;
    this.$rowsB = null;
    this.$info = null;
    this.sc = null;
    this.isOldIE = false;
    this.isIE11 = false;
    this.isLegacy = false;
    this.resizeTimer = null;
    this.rowsA = null;
    this.rowsB = null;
    this.vHeader = null;
    this.vFooter = null;
	this.$vHeader = null;
    this.$vFooter = null;
    
    // Scroll-related instance variables
    this.SEGMENT = 40;   // 🔥 huge improvement
this.BUFFER = 5;
    this.lastDraw = 0;
    
    // Drag-related instance variables
    this.dragging = false;
    this.dragMode = null; // Changed from 'mode' to avoid conflict
    this.startPos = 0;
    this.startThumbPos = 0;
    this.lastPos = 0;
    this.velocity = 0;
    this.isDrag = false;
    this.thumbDrag = false;
    this.lastTime = 0;
    this.fric = 0.93;
    this.maxSpeed = 90;
    	this.dragThreshold = 2;
    // Event handler references for cleanup
    this._boundHandlers = {};
	

	
	
  };

  // ========================================
  // PROTOTYPE (NO RETURN HERE!)
  // ========================================
  VirtualScrollPro.prototype = {

    // ---------- INIT ----------
    init: function () {
      var self = this;

      // Apply directional classes
      if (this.isRTL && this.isHorizontal) this.vs.className += " rtl-horizontal";
      else if (!this.isRTL && this.isHorizontal) this.vs.className += " ltr-horizontal";
      else if (this.isRTL && !this.isHorizontal) this.vs.className += " rtl-vertical";
      else this.vs.className += " ltr-vertical";
      this.element.setAttribute('dir', this.options.dir);
      // Apply size
      var $root = this.widget;
      this.vHeader = $root.find(this.options.header)[0];
      this.vFooter = $root.find(this.options.footer)[0];
	  
	  this.$vHeader = $root.find(this.options.header);
      this.$vFooter = $root.find(this.options.footer);
      $root.removeClass('vertical horizontal').addClass(this.options.scroll_dir);
      if (!this.isFull) {
        $root.css({
          position: 'relative',
          width: this.options.width,
          height: this.options.height,
          border: '1px solid #999',
          overflow: 'hidden',
          background: '#fff'
        });
      } else {
        $root.css({
          position: 'relative',
          width: '100%',
          height: '100%',
          border: '1px solid #aaa',
          overflow: 'hidden',
          background: '#fff'
        });
      }

      this.rowsA = $root.find('#rowsA')[0];
      this.rowsB = $root.find('#rowsB')[0];

      // ======================================================
      //  ADD SCROLLBAR + ARROWS + THUMB (IE6 + jQuery SAFE)
      // ======================================================

      // Ensure scrollbar exists
      this.$bar = $root.find('.scrollbar');
      if (!this.$bar.length) {
        $root.append('<div class="scrollbar"></div>');
        this.$bar = $root.find('.scrollbar');
      }

      // Build arrows HTML
      /*var arrowsHtml =
        '<div id="arrows">' +
        '<div id="arrow-up" class="scroll-arrow vertical-arrow-up" style="display:none;">' +
        '<i class="demo-icon icon-up-dir">&#xe801;</i>' +
        '</div>' +
        '<div id="arrow-down" class="scroll-arrow vertical-arrow-down" style="display:none;">' +
        '<i class="demo-icon icon-down-dir">&#xe802;</i>' +
        '</div>' +
        '<div id="arrow-left" class="scroll-arrow horizontal-arrow-left" style="display:none;">' +
        '<i class="demo-icon icon-left-dir">&#xe803;</i>' +
        '</div>' +
        '<div id="arrow-right" class="scroll-arrow horizontal-arrow-right" style="display:none;">' +
        '<i class="demo-icon icon-right-dir">&#xe804;</i>' +
        '</div>' +
        '</div>';
*/




// Build arrows HTML (PNG – IE6 + CHM + modern SAFE)
var arrowsHtml =
  '<div id="arrows">' +

    '<div id="arrow-up" class="scroll-arrow vertical-arrow-up" style="display:none;"></div>' +
    '<div id="arrow-down" class="scroll-arrow vertical-arrow-down" style="display:none;"></div>' +
    '<div id="arrow-left" class="scroll-arrow horizontal-arrow-left" style="display:none;"></div>' +
    '<div id="arrow-right" class="scroll-arrow horizontal-arrow-right" style="display:none;"></div>' +

  '</div>';









      // Append arrows only if not already created
      if (!this.$bar.find('#arrows').length) {
        this.$bar.append(arrowsHtml);
      }

      // Append thumb only if missing
      if (!this.$bar.find('#thumb').length) {
        this.$bar.append('<div id="thumb" class="thumb"></div>');
      }

      // Now jQuery can find them
      var $arrowUp = $root.find("#arrow-up");
      var $arrowDown = $root.find("#arrow-down");
      var $arrowLeft = $root.find("#arrow-left");
      var $arrowRight = $root.find("#arrow-right");

      // Show arrows based on scroll direction
      if (this.isHorizontal) {
        $arrowLeft.show();
        $arrowRight.show();
      } else {
        $arrowUp.show();
        $arrowDown.show();
      }

      this.$thumb = $root.find('#thumb');
      this.$iscroll = $root.find('#iscroll');
      if (!this.$thumb.length) {
        this.$bar.html('<div id="thumb" class="thumb"></div>');
        this.$thumb = $root.find('#thumb');
      }

      // --- IE6 explicit height fix ---
      var isIE6 = document.all && !window.addEventListener && !window.getComputedStyle;

      this.$rowsA = $root.find('#rowsA');
      this.$rowsB = $root.find('#rowsB');
      this.$info = $root.find('#info');
      this.sc = this.$iscroll[0];
      this.isOldIE = (document.all && !window.addEventListener);
      this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
      this.isLegacy = this.isOldIE || this.isIE11;

      var $tmp = $('<div class="row">Temp</div>').css({
        position: "absolute",
        visibility: "hidden"
      }).appendTo($root.find('#viewport'));

      this.ROW_H = $tmp.outerHeight() || 40;
      this.ROW_W = $tmp.outerWidth() || 0;

      $tmp.remove();

      // NEW: Scrollbar positioning based on direction
      if (this.isHorizontal) {
        // Horizontal scrollbar at bottom
        this.$bar.css({
          top: 'auto',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%'
        });
       // this.$iscroll.css({ right: 0, left: 0 });
      } else {
        // Vertical scrollbar on side
        if (this.isRTL) {
          this.$bar.css({ left: 'auto', right: 0 });
        } else {
          this.$bar.css({ right: 'auto', left: 0 });
        }
      }

      this.max = this.maxOff();
      var ratio = this.offset / this.max;
      if (ratio < 0) ratio = 0;
      if (ratio > 1) ratio = 1;
      this.updateThumb(ratio);
      this.scrollTo(5555);
      this.initialized = true;
      this.render();

      // --- Legacy drag ---
     if (this.isLegacy) {
    var self = this;

    // ===== ES3 SAFE HANDLERS =====
    this._boundHandlers.legacyMouseDown = function (e) {
        e = e || window.event;
        return self._handleLegacyMouseDown(e);
    };

    this._boundHandlers.legacyMouseMove = function (e) {
        e = e || window.event;
        return self._handleLegacyMouseMove(e);
    };

    this._boundHandlers.legacyMouseUp = function (e) {
        e = e || window.event;
        return self._handleLegacyMouseUp(e);
    };

    this._boundHandlers.legacyMouseWheel = function (e) {
        e = e || window.event;
        return self._handleLegacyMouseWheel(e);
    };

    this._boundHandlers.legacyBlur = function () {
        return self._handleLegacyBlur();
    };

    // ===== DOCUMENT EVENTS =====
    $(document)
        .on('mousedown', this._boundHandlers.legacyMouseDown)
        .on('mousemove', this._boundHandlers.legacyMouseMove)
        .on('mouseup', this._boundHandlers.legacyMouseUp);

    // ===== IE6 MOUSEWHEEL =====
    this.sc.onmousewheel = this._boundHandlers.legacyMouseWheel;

    // ===== WINDOW BLUR (IE6) =====
    if (window.attachEvent) {
        window.attachEvent('onblur', this._boundHandlers.legacyBlur);
    }
}
 else {
        // --- Modern ---
        this._boundHandlers.modernPointerDown = this._handleModernPointerDown.bind(this);
        this._boundHandlers.modernPointerMove = this._handleModernPointerMove.bind(this);
        this._boundHandlers.modernPointerUp = this._handleModernPointerUp.bind(this);
        this._boundHandlers.modernWheel = this._handleModernWheel.bind(this);
        this._boundHandlers.modernMouseDown = this._handleModernMouseDown.bind(this);
        this._boundHandlers.modernMouseMove = this._handleModernMouseMove.bind(this);
        this._boundHandlers.modernMouseUp = this._handleModernMouseUp.bind(this);
        this._boundHandlers.modernThumbMouseDown = this._handleModernThumbMouseDown.bind(this);

        if (window.PointerEvent) {
          this.sc.addEventListener('pointerdown', this._boundHandlers.modernPointerDown);
          window.addEventListener('pointermove', this._boundHandlers.modernPointerMove);
          window.addEventListener('pointerup', this._boundHandlers.modernPointerUp);
          this.$thumb[0].addEventListener('pointerdown', this._boundHandlers.modernThumbMouseDown);
        } else {
          $(document)
            .on('mousedown', this._boundHandlers.modernMouseDown)
            .on('mousemove', this._boundHandlers.modernMouseMove)
            .on('mouseup', this._boundHandlers.modernMouseUp);
            
          this.$thumb[0].onmousedown = this._boundHandlers.modernThumbMouseDown;
        }

        this.sc.onwheel = this._boundHandlers.modernWheel;
        
        // Start animation loop
        this._animationLoop();
      }










var pressTimer = null;
var pressInterval = null;



  var self = this;
  var timer = null;
  var speed = 15;   // px per tick
  var delay =15;   // ms

  function startContinuousScroll(dir) {
    stopContinuousScroll();

    timer = setInterval(function () {
      self.offset += dir * speed;

      if (self.offset < 0) self.offset = 0;
      if (self.offset > self.maxOff()) self.offset = self.maxOff();

      self.render();
    }, delay);
  }

  function stopContinuousScroll() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function bindArrow($el, dir) {
    if (!$el || !$el.length) return;

    $el
      .on("mousedown touchstart", function (e) {
        e.preventDefault();
        startContinuousScroll(dir);
      })
      .on("mouseup mouseleave touchend touchcancel", function () {
        stopContinuousScroll();
      });
  }

  // ===============================
  // ATTACH BY DIRECTION
  // ===============================
  if (self.isHorizontal) {

    if (self.isRTL) {
      // RTL horizontal → inverted
      bindArrow(self.$bar.find("#arrow-left"),  +1);
      bindArrow(self.$bar.find("#arrow-right"), -1);
    } else {
      // LTR horizontal → natural
      bindArrow(self.$bar.find("#arrow-left"),  -1);
      bindArrow(self.$bar.find("#arrow-right"), +1);
    }

  } else {
    bindArrow(self.$bar.find("#arrow-up"),   -1);
    bindArrow(self.$bar.find("#arrow-down"), +1);
  }



  var self  = this;
  var $track = this.$bar;
  var $thumb = this.$thumb;

  if (!$track.length) return;

  // === MOUSE ===
  $track.on("mousedown", function (e) {

    var $target = $(e.target);

    // ignore thumb
    if ($target.is($thumb)) return;

    // ignore arrows
    if (
      $target.attr("id") && $target.attr("id").indexOf("arrow-") === 0 ||
      $target.parent().attr("id") && $target.parent().attr("id").indexOf("arrow-") === 0
    ) {
      return;
    }

    e.preventDefault();
    self.jumpToClick(e.clientX, e.clientY);
  });

  // === TOUCH ===
  $track.on("touchstart", function (e) {

    var $target = $(e.target);

    if ($target.is($thumb)) return;

    if (
      $target.attr("id") && $target.attr("id").indexOf("arrow-") === 0 ||
      $target.parent().attr("id") && $target.parent().attr("id").indexOf("arrow-") === 0
    ) {
      return;
    }

    var t = e.originalEvent.touches[0];
    if (t) {
      self.jumpToClick(t.clientX, t.clientY);
    }

    e.preventDefault();
  });
















      $(window).on("resize." + this.widget.attr('id'), function () {
        self.checkScrollNeed();
      });

      return this;
    },
	
	// Add this method to the prototype (anywhere after the constructor)
updateData: function(newData) {
    this.data = newData || null;
    this.useCustomData = !!this.data;
    
    if (this.useCustomData) {
        this.total = this.data.length;
    } else {
        thiمحمدs.total = 100000000000000;
    }
    
    this.render();
    return this;
},





resize: function () {
    var self = this;
    
    // Recalculate row dimensions
    var $tmp = $('<div class="row">Temp</div>').css({
        position: "absolute",
        visibility: "hidden"
    }).appendTo(this.widget.find('#viewport'));
    
    this.ROW_H = $tmp.outerHeight() || 40;
    this.ROW_W = $tmp.outerWidth() || 0;
    $tmp.remove();
    
    // Recalculate max offset
    this.max = this.maxOff();
    
    // Clamp current offset to new max
    if (this.offset > this.max) {
        this.offset = this.max;
    }
    if (this.offset < 0) {
        this.offset = 0;
    }
    
    // Update scrollbar visibility
    this.updateScrollbarVisibility();
    
    // Update thumb position
    var ratio = this.max > 0 ? this.offset / this.max : 0;
    this.updateThumb(ratio);
    
    // Re-render everything
    this.render();
    
    return this;
},






	scrollToindex: function (i) {

    if (isNaN(i)) return;
    if (i < 1) i = 1;

    var newOffset;

    if (this.isHorizontal) {
        newOffset = (i - 1) * this.ROW_W;
    } else {
        newOffset = (i - 1) * this.ROW_H;
    }

    // clamp base
    var max = this.maxOff();
    if (newOffset < 0) newOffset = 0;
    if (newOffset > max) newOffset = max;

    // ===========================
    // COMPENSATION #1 — BUFFER
    // ===========================
    var bufferShift = this.BUFFER * (this.isHorizontal ? this.ROW_W : this.ROW_H);
    //newOffset -= bufferShift;
    if (newOffset < 0) newOffset = 0;

    // ===========================
    // COMPENSATION #2 — HEADER
    // ===========================
    if (this.isHorizontal) {
        newOffset += this.getHeaderWidth();
    } else {
        newOffset += this.getHeaderHeight();
    }

    // Final clamp
    if (newOffset > max) newOffset = max;

    this.offset = newOffset;

    this.render();
    this.updateThumb(this.offset / max);


    },
   jumpToClick: function(x, y) {

   var track = this.$bar[0];

    if (!track) return; // Safety check
    
    var rect = track.getBoundingClientRect();

    if (!this.isHorizontal) {
        // ==== VERTICAL ====
        var clickY = y - rect.top;

        var trackHeight = this.$bar.height();
        var thumbHeight = this.$thumb[0].offsetHeight;
        var travel = trackHeight - thumbHeight;
        
        if (travel <= 0) return; // Prevent division by zero

        // Clamp position
        var newThumbTop = Math.max(0, Math.min(clickY - thumbHeight / 2, travel));

        // ratio
        var ratio = newThumbTop / travel;
        this.offset = ratio * this.maxOff();
    } 
    else {
        // ==== HORIZONTAL ====
        var clickX = x - rect.left;

        var trackWidth = this.$bar.width();
        var thumbWidth = this.$thumb[0].offsetWidth;
        var travel = trackWidth - thumbWidth;
        
        if (travel <= 0) return; // Prevent division by zero

        // Compute thumb new position
        var newThumbLeft = clickX - thumbWidth / 2;

        // Clamp
        newThumbLeft = Math.max(0, Math.min(newThumbLeft, travel));

        // RTL flips the direction
        var ratio = this.isRTL ? (1 - newThumbLeft / travel) : (newThumbLeft / travel);

        this.offset = ratio * this.maxOff();
    }

    this.render();
    this.updateThumb(this.offset / this.maxOff());
}
,
    // ========================================
    // LEGACY DRAG HANDLERS (Instance methods)
    // ========================================
    _getPos: function(e) {
      return this.isHorizontal ? e.clientX : e.clientY;
    },

    _handleLegacyMouseDown: function(e) {
      e = e || window.event;
      var src = e.target || e.srcElement;
      
      // Check if this event belongs to our widget
      if (!this._isEventInWidget(e)) {
        return;
      }
      
      var pos = this._getPos(e);
      if (src.id === 'thumb') {
        this.dragMode = 'thumb';
        this.startPos = pos;
        this.startThumbPos = this.isHorizontal ?
          (parseInt(this.$thumb.css('left')) || 0) :
          (parseInt(this.$thumb.css('top')) || 0);
      } else {
        this.dragMode = 'content';
        this.startPos = pos;
        this.lastPos = pos;
      }
      this.dragging = true;
      
      if (src && src.setCapture) src.setCapture(); 
      else if (document.body.setCapture) document.body.setCapture();
      
      document.onselectstart = function () { return false; };
      if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
    },

    _handleLegacyMouseMove: function(e) {
      if (!this.dragging) return;
      e = e || window.event;
      
      var now = Date.now();
      if (now - this.lastDraw < 16) return;
      this.lastDraw = now;
      
      var pos = this._getPos(e);
      
      if (this.dragMode === 'content') {
        var delta = pos - this.lastPos;
        // RTL adjustment for horizontal dragging
        if (this.isHorizontal && this.isRTL) {
          this.offset += delta;
        } else {
          this.offset -= delta;
        }
        this.lastPos = pos;
        this.render();
      } else if (this.dragMode === 'thumb') {
        var containerSize = this.isHorizontal ? this.$bar.width() : this.$bar.height();
        var thumbSize = this.isHorizontal ? this.$thumb[0].offsetWidth : this.$thumb[0].offsetHeight;
        var travel = containerSize - thumbSize;
        var newThumbPos = this.startThumbPos + (pos - this.startPos);
        if (newThumbPos < 0) newThumbPos = 0;
        if (newThumbPos > travel) newThumbPos = travel;

        if (this.isHorizontal) {
          this.$thumb[0].style.left = newThumbPos + 'px';
        } else {
          this.$thumb[0].style.top = newThumbPos + 'px';
        }

        // RTL adjustment for thumb dragging
        var ratio;
        if (this.isHorizontal && this.isRTL) {
          ratio = 1 - (newThumbPos / travel);
        } else {
          ratio = newThumbPos / travel;
        }

        this.offset = ratio * this.maxOff();
        this.render();
      }
    },

    _handleLegacyMouseUp: function() {
      this.dragging = false;
      this.dragMode = null;
      document.onselectstart = null;
      try {
        if (document.releaseCapture) document.releaseCapture();
        if (this.$thumb[0].releaseCapture) this.$thumb[0].releaseCapture();
      } catch (e) { }
    },

    _handleLegacyMouseWheel: function(e) {
      e = e || window.event;
      var delta = e.wheelDelta ? -e.wheelDelta / 5 : e.detail * 8;
      
      // RTL adjustment for mouse wheel
      if (this.isHorizontal && this.isRTL) {
        this.offset -= delta * 3;
      } else {
        this.offset += this.isHorizontal ? delta * 3 : delta;
      }
      
      if (this.offset < 0) this.offset = 0;
      if (this.offset > this.maxOff()) this.offset = this.maxOff();
      
      this.render();
      if (e.preventDefault) e.preventDefault();
      return false;
    },

    _handleLegacyBlur: function() {
      this.dragging = false;
      this.dragMode = null;
    },

    // ========================================
    // MODERN DRAG HANDLERS (Instance methods)
    // ========================================
    _handleModernPointerDown: function(e) {
      if (!this._isEventInWidget(e)) return;
      this._sDrag(this._getPos(e));
      e.preventDefault();
    },

    _handleModernPointerMove: function(e) {
      if (this.isDrag) this._mDrag(this._getPos(e));
      if (this.thumbDrag) this._mThumb(this._getPos(e));
    },

    _handleModernPointerUp: function() {
      this._eDrag();
      this._eThumb();
    },

    _handleModernWheel: function(e) {
      e = e || window.event;
      var delta = e.wheelDelta ? -e.wheelDelta / 5 : e.detail * 8;
      
      // RTL adjustment for mouse wheel
      if (this.isHorizontal && this.isRTL) {
        this.offset -= delta * 3;
      } else {
        this.offset += this.isHorizontal ? delta * 3 : delta;
      }
      
      if (this.offset < 0) this.offset = 0;
      if (this.offset > this.maxOff()) this.offset = this.maxOff();
      
      this.render();
      if (e.preventDefault) e.preventDefault();
      return false;
    },

    _handleModernMouseDown: function(e) {
      if (!this._isEventInWidget(e)) return;
      if (e.target.id === 'thumb') return;
      this._sDrag(this._getPos(e));
      return false;
    },

    _handleModernMouseMove: function(e) {
      this._mDrag(this._getPos(e));
      this._mThumb(this._getPos(e));
    },

    _handleModernMouseUp: function() {
      this._eDrag();
      this._eThumb();
    },

    _handleModernThumbMouseDown: function(e) {
      this._sThumb(this._getPos(e));
      e.preventDefault();
      e.stopPropagation();
      return false;
    },

  _sDrag: function(pos) {
  this.isDrag = true;
  window.DRAG_SCROLL_DRAGGING = false; // لا تمنع click الآن

  this.velocity = 0;
  this.lastPos = pos;
  this.lastTime = Date.now();
  this.dragMoved = false;
},

_mDrag: function(pos) {
  var now, delta, dt, raw;
  
  if (!this.isDrag) return;
  
  now = Date.now();
  delta = pos - this.lastPos;
  
 if (Math.abs(delta) > this.dragThreshold) {
  this.dragMoved = true;
  window.DRAG_SCROLL_DRAGGING = true;
}

  if (this.isHorizontal && this.isRTL) {
    this.offset += delta;
  } else {
    this.offset -= delta;
  }
  
  dt = now - this.lastTime;
  if (dt > 0) {
    if (this.isHorizontal && this.isRTL) {
      raw = (delta / dt) * 16;
    } else {
      raw = (-delta / dt) * 16;
    }
    this.velocity = Math.max(-this.maxSpeed, Math.min(raw, this.maxSpeed));
  }
  
  this.lastPos = pos;
  this.lastTime = now;
  
  if (this.isDrag) {
    this._renderPositionOnly();
  } else {
    this.render();
  }
},

_eDrag: function() {

  var wasDrag = this.dragMoved;

  this.isDrag = false;

  if (wasDrag) {
    window.DRAG_SCROLL_DRAGGING = true;

    setTimeout(function () {
      window.DRAG_SCROLL_DRAGGING = false;
    }, 150);
  } else {
    window.DRAG_SCROLL_DRAGGING = false;
  }

  this.dragMoved = false;
},

    _sThumb: function(pos) {
      this.thumbDrag = true;
      this.startPos = pos;
      this.startThumbPos = this.isHorizontal ?
        (parseInt(this.$thumb[0].style.left) || 0) :
        (parseInt(this.$thumb[0].style.top) || 0);
    },

    _mThumb: function(pos) {
      if (!this.thumbDrag) return;
      var containerSize = this.isHorizontal ? this.$bar.width() : this.$bar.height();
      var thumbSize = this.isHorizontal ? this.$thumb.width() : this.$thumb.height();
      var travel = containerSize - thumbSize;
      var newThumbPos = this.startThumbPos + (pos - this.startPos);
      if (newThumbPos < 0) newThumbPos = 0;
      if (newThumbPos > travel) newThumbPos = travel;

      // RTL adjustment for thumb dragging
      var ratio;
      if (this.isHorizontal && this.isRTL) {
        ratio = 1 - (newThumbPos / travel);
      } else {
        ratio = newThumbPos / travel;
      }

      this.offset = ratio * this.maxOff();
      this.velocity = 0;
      this.render();
    },

    _eThumb: function() {
      this.thumbDrag = false;
    },

    _animationLoop: function() {
	
      var self = this;
      function loop() {
		  
	
		
        if (!self.isDrag && !self.thumbDrag) {
          if (Math.abs(self.velocity) > 0.02) {
            self.offset += self.velocity;
            self.velocity *= self.fric;
            if (self.offset <= 0) { self.offset = 0; self.velocity = 0; }
            else if (self.offset >= self.maxOff()) { self.offset = self.maxOff(); self.velocity = 0; }
            self.render();
          }
        }
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    },

    _isEventInWidget: function(e) {
      // Check if the event target is within our widget
      var target = e.target || e.srcElement;
      return $(target).closest(this.widget).length > 0;
    },
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
_renderPositionOnly: function() {
  var maxOff = this.maxOff();
  var clampedOffset = Math.max(0, Math.min(this.offset, maxOff));
  var headerW = this.getHeaderWidth();
  var headerH = this.getHeaderHeight();
  var itemSize = this.isHorizontal ? this.ROW_W : this.ROW_H;
  var visibleContainer, startIndex, xPos, yPos;
  
  visibleContainer = this.useA ? this.$rowsA : this.$rowsB;
  if (!visibleContainer || !visibleContainer[0]) return;
  
  startIndex = parseInt(visibleContainer.attr('data-start'), 10);
  if (isNaN(startIndex)) {
    startIndex = Math.max(0, Math.floor(clampedOffset / itemSize) - this.BUFFER);
  }
  
  if (this.isHorizontal) {
    xPos = (startIndex * this.ROW_W) - clampedOffset + headerW;
    if (this.isRTL) xPos = -xPos;
    
    if (this.isLegacy) {
      visibleContainer[0].style.left = xPos + 'px';
    } else {
      visibleContainer.css('transform', 'translate3d(' + xPos + 'px, 0px, 0px)');
    }
  } else {
    yPos = (startIndex * this.ROW_H) - clampedOffset + headerH;
    if (this.isLegacy) {
      visibleContainer[0].style.top = yPos + 'px';
    } else {
      visibleContainer.css('transform', 'translate3d(0px, ' + yPos + 'px, 0px)');
    }
  }
  
  this.updateThumb(clampedOffset / maxOff);
},















  // ========================================
    // PUBLIC METHODS
    // ========================================
   updateScrollbarVisibility: function () {
      var needsScrollbar = this.isHorizontal ?
        (this.tW() > this.cW() + 1) :
        (this.tH() > this.cH() + 1);

      if (needsScrollbar) {
        this.$bar.show();
	      
		  this.$iscroll.css({ right: "", left: "", bottom: "" })
		
      } else {
        this.$bar.hide();
        this.$iscroll.css({ right: 0, left: 0 , bottom:0});
		
		this.$vFooter.css(
                       this.isRTL
                         ? { left: 0, right: 'auto' }
                         : { right: 0, left: 'auto' }
                         );
		
		
        
		
		this.offset = 0;
      }
    },

    updateThumb: function (r) {
  if (!this.$thumb[0]) return;

  var arrowGap = 20;

  if (this.isHorizontal) {

    var cWid     = this.$bar.width() || this.widget.width();
    var visible  = this.cW();
    var contentW = this.tW();

    var availableWid = cWid - (arrowGap * 2);

    // thumb width (مثل th في vertical)
    var tw = Math.max(40, availableWid * (visible / contentW));
    if (tw > availableWid * 0.8) tw = availableWid * 0.8;

    var travel = availableWid - tw;

    var left = this.isRTL
      ? travel * (1 - r)
      : travel * r;

    if (left > travel) left = travel;
    left += arrowGap;

    try {
      this.$thumb[0].style.width = tw + 'px';   // ⭐ المهم
      this.$thumb[0].style.left  = left + 'px';
      this.$thumb[0].style.top   = '0';
    } catch (e) {}

  } else {

    var cHgt     = this.$bar.height() || this.widget.height();
    var visible  = this.cH();
    var contentH = this.tH();

    var availableHgt = cHgt - (arrowGap * 2);

    var th = Math.max(30, availableHgt * (visible / contentH));
    if (th > availableHgt * 0.8) th = availableHgt * 0.8;

    var travel = availableHgt - th;
    var top = travel * r;
    if (top > travel) top = travel;
    top += arrowGap;

    try {
      this.$thumb[0].style.height = th + 'px';
      this.$thumb[0].style.top    = top + 'px';
      this.$thumb[0].style.left   = '0';
    } catch (e) {}
  }
},

render: function () {
  var headerW = this.getHeaderWidth();
  var footerW = this.getFooterWidth();
  var headerH = this.getHeaderHeight();
  var footerH = this.getFooterHeight();
  var isLeg = this.isLegacy;
  var BUFFER_SIZE, SEGMENT_SIZE, ITEM_W;
  var effectiveTW, maxScroll, first, start, end, html, i, content, parts;
  var pos, posX, posY, hx, footX, footY, ratio, global;
  var $front, $back;

  this.updateScrollbarVisibility();

  if (!this.isHorizontal) {
    this.$rowsA.css('margin-bottom', footerH + 'px');
    this.$rowsB.css('margin-bottom', footerH + 'px');
  }

  this.offset = Math.max(0, Math.min(this.offset, this.max));

  BUFFER_SIZE = this.isLegacy ? 20 : this.BUFFER;
  SEGMENT_SIZE = this.isLegacy ? 20 : this.SEGMENT;
  ITEM_W = this.ROW_W;

  start = 0;
  end = 0;
  html = '';

  // Make sure we have data to render
  if (this.total === 0 || (this.useCustomData && (!this.data || this.data.length === 0))) {
    html = '<div class="row">No data available</div>';
    start = 0;
    end = 1;
  } else {
    if (this.isHorizontal) {
      effectiveTW = this.total * ITEM_W + headerW + footerW;
      maxScroll = Math.max(0, effectiveTW - this.cW());
      this.offset = Math.max(0, Math.min(this.offset, maxScroll));

      first = Math.floor(this.offset / ITEM_W);
      start = Math.max(0, first - BUFFER_SIZE);
      end = Math.min(this.total, first + SEGMENT_SIZE + BUFFER_SIZE);

      if (start >= end && this.total > 0) {
        start = 0;
        end = Math.min(this.total, SEGMENT_SIZE);
      }

      html = '';
      for (i = start; i < end; i++) {
        content = (this.useCustomData && this.data && this.data[i])
          ? (this.data[i].html || 'Row #' + (i + 1))
          : 'Row #' + (i + 1);
        
        if (this.isLegacy) {
          html += '<div class="row" data-id="' + (i + 1) + '" style="' + (this.isRTL ? 'right' : 'left') + ':' + ((i - start) * ITEM_W) + 'px">' + content + '</div>';
        } else {
          html += '<div data-id="' + (i + 1) + '" class="row' + (i % 2 ? ' alt' : '') + '">' + content + '</div>';
        }
      }
    } else {
      first = Math.floor(this.offset / this.ROW_H);
      start = Math.max(0, first - BUFFER_SIZE);
      end = Math.min(this.total, first + SEGMENT_SIZE + BUFFER_SIZE);

      if (start >= end && this.total > 0) {
        start = 0;
        end = Math.min(this.total, SEGMENT_SIZE);
      }

      parts = [];
      for (i = start; i < end; i++) {
        content = (this.useCustomData && this.data && this.data[i])
          ? (this.data[i].html || 'Row #' + (i + 1))
          : 'Row #' + (i + 1);
        
        if (this.isLegacy) {
          parts.push('<div class="row" data-id="' + (i + 1) + '">' + content + '</div>');
        } else {
          parts.push('<div data-id="' + (i + 1) + '" class="row' + (i % 2 ? ' alt' : '') + '">' + content + '</div>');
        }
      }
      html = parts.join('');
    }
  }

  // Buffer swap
  if (isLeg) {
    $front = this.useA ? $(this.rowsA) : $(this.rowsB);
    $back = this.useA ? $(this.rowsB) : $(this.rowsA);
    $back[0].innerHTML = html;
    $back[0].setAttribute('data-start', start);
  } else {
    $front = this.useA ? this.$rowsA : this.$rowsB;
    $back = this.useA ? this.$rowsB : this.$rowsA;
    $back.html(html);
	
// ========================================
// RESTORE ACTIVE LINK
// ========================================
if (window.__ACTIVE_HIT_ID__) {

    var links =
        $back[0].getElementsByTagName("a");

    for (var z = 0; z < links.length; z++) {

        var href =
            links[z].getAttribute("href") || "";

        var m =
            href.match(/hitid=(\d+)/);

        if (
            m &&
            parseInt(m[1], 10) ===
            window.__ACTIVE_HIT_ID__
        ) {

            // ====================================
            // REAL ROW ID
            // ====================================

            var row =
                $(links[z]).closest(".row")[0];

            if (row) {

                window.__ACTIVE_ROW_INDEX__ =
                    row.getAttribute(
                        "data-id"
                    );
            }

            if (
                links[z].className.indexOf(
                    "active_hit"
                ) === -1
            ) {

                links[z].className +=
                    " active_hit";
            }

            window.__ACTIVE_HIT_EL__ =
                links[z];

            break;
        }
    }
}
	
	
    $back.attr('data-start', start);
  }

  // Position
  if (this.isHorizontal) {
    pos = this.isRTL ? this.offset - start * ITEM_W : start * ITEM_W - this.offset;
    posX = pos + (this.isRTL ? -headerW : headerW);
    
    if (isLeg) {
      if (this.isRTL) {
        $back[0].style.right = (-posX) + 'px';
      } else {
        $back[0].style.left = posX + 'px';
      }
      $back[0].style.top = '0';
      $back[0].style.width = ((end - start) * ITEM_W + headerW + 100) + 'px';
    } else {
      $back.css('transform', 'translate3d(' + posX + 'px,0,0)');
    }
  } else {
    posY = start * this.ROW_H - this.offset + headerH;
    if (isLeg) {
      $back[0].style.top = posY + 'px';
    } else {
      $back.css('transform', 'translate3d(0,' + posY + 'px,0)');
    }
  }

  if (isLeg) {
    $back[0].style.display = 'block';
    $front[0].style.display = 'none';
  } else {
    $back.show();
    $front.hide();
  }
  this.useA = !this.useA;

  // Header
  if (this.vHeader) {
    if (this.isHorizontal) {
      hx = this.isRTL ? this.offset : -this.offset;
      if (isLeg) {
        this.vHeader.style[this.isRTL ? 'right' : 'left'] = (-this.offset) + 'px';
      } else {
        this.vHeader.style.transform = 'translate3d(' + hx + 'px,0,0)';
      }
    } else {
      if (isLeg) {
        this.vHeader.style.top = (-this.offset) + 'px';
      } else {
        this.vHeader.style.transform = 'translate3d(0,' + (-this.offset) + 'px,0)';
      }
    }
  }

  // Footer
  if (this.vFooter) {
    ratio = this.offset / this.maxOff();
    if (ratio < 0) ratio = 0;
    if (ratio > 1) ratio = 1;
    this.vFooter.style.opacity = ratio;
    
    if (this.isHorizontal) {
      footX = (this.total * this.ROW_W + this.getHeaderWidth() + (this.isRTL ? 5 : 0)) - this.offset;
      if (isLeg) {
        this.vFooter.style[this.isRTL ? 'right' : 'left'] = footX + 'px';
      } else {
        if (this.isRTL) footX = -footX;
        this.vFooter.style.transform = 'translate3d(' + footX + 'px,0,0)';
      }
    } else {
      footY = this.maxOff() - this.offset;
      if (isLeg) {
        this.vFooter.style.bottom = (-footY) + 'px';
      } else {
        this.vFooter.style.transform = 'translate3d(0,' + footY + 'px,0)';
      }
    }
  }

  ratio = this.offset / this.max;
  if (ratio < 0) ratio = 0;
  if (ratio > 1) ratio = 1;
  this.updateThumb(ratio);

  global = Math.floor(ratio * (this.total - 1)) + 1;
  if (global < 1) global = 1;
  
  if (this.$info && this.total > 0) {
    this.$info.text(
      'Row ' + global + ' / ' + this.total + 
      ' (' + (ratio * 100).toFixed(3) + '%) – ' + 
      (this.isHorizontal ? 'Horizontal' : 'Vertical')
    );
  }
},
	  
	  
	  
	  
	  
	  
checkScrollNeed: function () {
    var self = this;
    
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(function () {
        // Recalculate dimensions
        self.max = self.maxOff();
        
        // Clamp offset
        if (self.offset > self.max) {
            self.offset = self.max;
        }
        
        self.updateScrollbarVisibility();
        
        var ratio = self.max > 0 ? self.offset / self.max : 0;
        if (ratio < 0) ratio = 0;
        if (ratio > 1) ratio = 1;
        
        self.updateThumb(ratio);
        self.render();  // Force a full re-render
        
		
		
		
		
    }, 200);
},

    maxOff: function () {
      return this.isHorizontal ?
        Math.max(0, this.tW() - this.cW()) :
        Math.max(0, this.tH() - this.cH());
    },
    cH: function () {
      return this.$iscroll.height();
    },
    cW: function () {
      return this.$iscroll.width();
    },
    tH: function () {
      return this.total * this.ROW_H + this.getHeaderHeight() + this.getFooterHeight();
    },
    tW: function () {
      return this.total * this.ROW_W + this.getHeaderWidth() + this.getFooterWidth();
    },
    getHeaderHeight: function () {
      var h = this.widget.find(this.options.header)[0];
      return h ? h.offsetHeight : 0;
    },

    getHeaderWidth: function () {
      var h = this.widget.find(this.options.header)[0];
      if (!h) return 0;
      return h.offsetWidth || h.clientWidth || 0;
    },

    getFooterHeight: function () {
      var h = this.widget.find(this.options.footer)[0];
      return h ? h.offsetHeight : 0;
    },

    getFooterWidth: function () {
      var h = this.widget.find(this.options.footer)[0];
      if (!h) return 0;
      return h.offsetWidth || h.clientWidth || 0;
    },

    scrollTo: function (position) {
      return this;
    },

    scrollToPercent: function (percent) {
      return this;
    },

    scrollToRow: function (rowNumber) {
      return this;
    },



scrollToTop: function() {
  this.offset = 0;
  this.render();
  this.updateThumb(0);
  
  
  
  return this;
},

// Scroll to bottom instantly
scrollToBottom: function() {
  this.offset = this.maxOff();
  this.render();
  this.updateThumb(1);
  return this;
},




    getOffset: function () { return 0; },
    getMaxOffset: function () { return 1000; },

    refresh: function () {
      return this;
    },






destroy: function () {

  // =========================
  // REMOVE EVENTS
  // =========================
  if (this.isLegacy) {

    $(document)
      .off('mousedown', this._boundHandlers.legacyMouseDown)
      .off('mousemove', this._boundHandlers.legacyMouseMove)
      .off('mouseup', this._boundHandlers.legacyMouseUp);

    if (this.sc) {
      this.sc.onmousewheel = null;
    }

    if (window.attachEvent) {
      window.detachEvent('onblur', this._boundHandlers.legacyBlur);
    }

  } else {

    if (window.PointerEvent) {

      if (this.sc) {
        this.sc.removeEventListener(
          'pointerdown',
          this._boundHandlers.modernPointerDown
        );

        this.sc.removeEventListener(
          'wheel',
          this._boundHandlers.modernWheel
        );
      }

      window.removeEventListener(
        'pointermove',
        this._boundHandlers.modernPointerMove
      );

      window.removeEventListener(
        'pointerup',
        this._boundHandlers.modernPointerUp
      );

      if (this.$thumb[0]) {
        this.$thumb[0].removeEventListener(
          'pointerdown',
          this._boundHandlers.modernThumbMouseDown
        );
      }

    } else {

      $(document)
        .off('mousedown', this._boundHandlers.modernMouseDown)
        .off('mousemove', this._boundHandlers.modernMouseMove)
        .off('mouseup', this._boundHandlers.modernMouseUp);

      if (this.$thumb[0]) {
        this.$thumb[0].onmousedown = null;
      }
    }
  }

  // =========================
  // REMOVE RESIZE
  // =========================
  $(window).off(
    "resize." + this.widget.attr('id')
  );

  // =========================
  // CLEAR LISTS
  // =========================
  if (this.rowsA) {
    this.rowsA.innerHTML = "";
    this.rowsA.style.display = "none";
  }

  if (this.rowsB) {
    this.rowsB.innerHTML = "";
    this.rowsB.style.display = "none";
  }

  // =========================
  // RESET INTERNAL STATE
  // =========================
  this.offset = 0;
  this.total = 0;
  this.data = null;
  this.useCustomData = false;

  this.useA = true;

  // clear thumb
  if (this.$thumb && this.$thumb[0]) {
    this.$thumb[0].style.top = "0px";
    this.$thumb[0].style.left = "0px";
  }

  // clear info
  if (this.$info && this.$info.length) {
    this.$info.html("");
  }

  // remove plugin data
  this.widget.removeData("VirtualScrollPro");

  this.initialized = false;

  return this;
}







 };

  // ========================================
  // jQuery Plugin Wrapper (HERE IS RETURN)
  // ========================================
  $.fn.VirtualScrollPro = function (options, method) {

    // -------- CALL METHOD MODE --------
    if (typeof options === "string") {
      var instance = this.data("VirtualScrollPro");
      var args = Array.prototype.slice.call(arguments, 1);

      if (!instance) {
        console.error("Plugin not initialized!");
        return this;
      }

      if (typeof instance[options] === "function") {
        return instance[options].apply(instance, args); // ✔ return correct
      }

      console.error("Unknown method:", options);
      return this;
    }

    // -------- INITIALIZE MODE --------
    return this.each(function () {   // ✔ THE ONLY CORRECT return this.each
      var $this = $(this);
      var data = $this.data("VirtualScrollPro");

      var opts = $.extend({
        type: "widget",
        scroll_dir: "vertical"
      }, options || {});

      if (!data) {
        data = new VirtualScrollPro(this, opts);
        data.init();                // initialize instance
        $this.data("VirtualScrollPro", data);
      }
    });

  };

})(jQuery);

