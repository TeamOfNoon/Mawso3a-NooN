// ======================================================
//  MINI-$ SHIM  —  drop-in jQuery replacement for the plugin
//  No dependencies. Supports the exact API surface used internally.
// ======================================================

const $ = (function () {

  // ── Core wrapper ──────────────────────────────────────
  class MiniQuery {
    constructor(selector, context) {
      this._els = [];

      if (!selector) {
        // nothing

      } else if (selector instanceof MiniQuery) {
        this._els = selector._els.slice();

      } else if (selector instanceof Element || selector instanceof Document || selector instanceof Window) {
        this._els = [selector];

      } else if (Array.isArray(selector)) {
        this._els = selector.filter(Boolean);

      } else if (typeof selector === 'string') {
        selector = selector.trim();

        if (selector[0] === '<') {
          // HTML creation  e.g.  $('<div class="row">Temp</div>')
          const tpl = document.createElement('div');
          tpl.innerHTML = selector;
          this._els = Array.from(tpl.childNodes).filter(n => n.nodeType === 1);
        } else {
          const root = (context instanceof MiniQuery ? context._els[0] : context) || document;
          try {
            this._els = Array.from(root.querySelectorAll(selector));
          } catch (_) {
            this._els = [];
          }
        }

      } else if (typeof selector === 'function') {
        // $(fn)  →  DOMContentLoaded shorthand
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', selector);
        } else {
          selector();
        }
      }

      // Index access  e.g.  $el[0]
      this._els.forEach((el, i) => { this[i] = el; });
      this.length = this._els.length;
    }

    // ── Iteration helpers ──────────────────────────────
    [Symbol.iterator]() { return this._els[Symbol.iterator](); }

    each(fn) {
      this._els.forEach((el, i) => fn.call(el, i, el));
      return this;
    }

    get(i) { return this._els[i]; }

    // ── DOM traversal ──────────────────────────────────
    find(sel) {
      const found = [];
      this._els.forEach(el => {
        try { found.push(...el.querySelectorAll(sel)); } catch (_) {}
      });
      return new MiniQuery(found);
    }

    closest(sel) {
      const found = [];
      this._els.forEach(el => {
        const c = el.closest?.(sel);
        if (c) found.push(c);
      });
      return new MiniQuery(found);
    }

    parent() {
      const found = [];
      this._els.forEach(el => { if (el.parentElement) found.push(el.parentElement); });
      return new MiniQuery(found);
    }

    is(other) {
      // is(MiniQuery), is(Element), is(selector string)
      if (!this._els.length) return false;
      if (other instanceof MiniQuery) {
        return this._els.some(el => other._els.includes(el));
      }
      if (other instanceof Element) {
        return this._els.includes(other);
      }
      if (typeof other === 'string') {
        return this._els.some(el => el.matches?.(other));
      }
      return false;
    }

    // ── CSS / style ────────────────────────────────────
    css(prop, value) {
      if (typeof prop === 'object') {
        // css({ key: val, … })
        this._els.forEach(el => {
          Object.entries(prop).forEach(([k, v]) => {
            el.style[_camelize(k)] = v == null ? '' : v;
          });
        });
        return this;
      }

      if (value === undefined) {
        // getter
        if (!this._els[0]) return '';
        const computed = getComputedStyle(this._els[0])[_camelize(prop)];
        return this._els[0].style[_camelize(prop)] || computed || '';
      }

      // setter
      this._els.forEach(el => {
        el.style[_camelize(prop)] = value == null ? '' : value;
      });
      return this;
    }

    // ── Classes ────────────────────────────────────────
    addClass(cls) {
      cls.trim().split(/\s+/).forEach(c => {
        this._els.forEach(el => el.classList.add(c));
      });
      return this;
    }

    removeClass(cls) {
      cls.trim().split(/\s+/).forEach(c => {
        this._els.forEach(el => el.classList.remove(c));
      });
      return this;
    }

    hasClass(cls) {
      return this._els.some(el => el.classList.contains(cls));
    }

    // ── Attributes ─────────────────────────────────────
    attr(name, value) {
      if (value === undefined) {
        return this._els[0]?.getAttribute(name) ?? undefined;
      }
      this._els.forEach(el => el.setAttribute(name, value));
      return this;
    }

    // ── Data store (mimics $.data on element) ──────────
    data(key, value) {
      if (!this._els[0]) return value === undefined ? undefined : this;

      const el = this._els[0];
      el.__mqData = el.__mqData || {};

      if (value === undefined) {
        return el.__mqData[key];
      }
      el.__mqData[key] = value;
      return this;
    }

    // ── DOM content ────────────────────────────────────
    html(content) {
      if (content === undefined) {
        return this._els[0]?.innerHTML ?? '';
      }
      this._els.forEach(el => { el.innerHTML = content; });
      return this;
    }

    text(content) {
      if (content === undefined) {
        return this._els[0]?.textContent ?? '';
      }
      this._els.forEach(el => { el.textContent = content; });
      return this;
    }

    append(content) {
      this._els.forEach(el => {
        if (typeof content === 'string') {
          el.insertAdjacentHTML('beforeend', content);
        } else if (content instanceof MiniQuery) {
          content._els.forEach(c => el.appendChild(c));
        } else if (content instanceof Element) {
          el.appendChild(content);
        }
      });
      return this;
    }

    appendTo(target) {
      const dest = target instanceof MiniQuery ? target._els[0] : target;
      if (dest) this._els.forEach(el => dest.appendChild(el));
      return this;
    }

    remove() {
      this._els.forEach(el => el.parentNode?.removeChild(el));
      return this;
    }

    // ── Visibility ─────────────────────────────────────
    show() {
      this._els.forEach(el => {
        if (el.style.display === 'none') el.style.display = '';
        if (getComputedStyle(el).display === 'none') el.style.display = 'block';
      });
      return this;
    }

    hide() {
      this._els.forEach(el => { el.style.display = 'none'; });
      return this;
    }

    // ── Dimensions ─────────────────────────────────────
    width(value) {
      if (value !== undefined) {
        this._els.forEach(el => { el.style.width = typeof value === 'number' ? value + 'px' : value; });
        return this;
      }
      if (!this._els[0]) return 0;
      const el = this._els[0];
      if (el === window) return window.innerWidth;
      if (el === document) return document.documentElement.scrollWidth;
      return el.getBoundingClientRect().width;
    }

    height(value) {
      if (value !== undefined) {
        this._els.forEach(el => { el.style.height = typeof value === 'number' ? value + 'px' : value; });
        return this;
      }
      if (!this._els[0]) return 0;
      const el = this._els[0];
      if (el === window) return window.innerHeight;
      if (el === document) return document.documentElement.scrollHeight;
      return el.getBoundingClientRect().height;
    }

    outerWidth(includeMargin = false) {
      if (!this._els[0]) return 0;
      const el = this._els[0];
      let w = el.offsetWidth;
      if (includeMargin) {
        const s = getComputedStyle(el);
        w += parseFloat(s.marginLeft) + parseFloat(s.marginRight);
      }
      return w;
    }

    outerHeight(includeMargin = false) {
      if (!this._els[0]) return 0;
      const el = this._els[0];
      let h = el.offsetHeight;
      if (includeMargin) {
        const s = getComputedStyle(el);
        h += parseFloat(s.marginTop) + parseFloat(s.marginBottom);
      }
      return h;
    }

    // ── Events ─────────────────────────────────────────
    on(events, selectorOrFn, fn) {
      const useDelegate = typeof selectorOrFn === 'string';
      const handler     = useDelegate ? fn : selectorOrFn;
      const delegateSel = useDelegate ? selectorOrFn : null;

      events.trim().split(/\s+/).forEach(evt => {
        // Namespaced events  e.g.  'resize.myId'
        const [type] = evt.split('.');

        this._els.forEach(el => {
          el.__mqHandlers = el.__mqHandlers || {};
          el.__mqHandlers[evt] = el.__mqHandlers[evt] || [];

          const wrapped = (e) => {
            if (delegateSel) {
              // delegation
              const target = e.target?.closest?.(delegateSel);
              if (target && el.contains(target)) handler.call(target, _wrapEvent(e));
            } else {
              handler.call(el, _wrapEvent(e));
            }
          };

          el.__mqHandlers[evt].push({ original: handler, wrapped });
          el.addEventListener(type, wrapped, false);
        });
      });

      return this;
    }

    off(events, fn) {
      events.trim().split(/\s+/).forEach(evt => {
        const [type] = evt.split('.');

        this._els.forEach(el => {
          if (!el.__mqHandlers?.[evt]) return;

          el.__mqHandlers[evt] = el.__mqHandlers[evt].filter(entry => {
            if (!fn || entry.original === fn) {
              el.removeEventListener(type, entry.wrapped, false);
              return false; // remove
            }
            return true;    // keep
          });
        });
      });

      return this;
    }

    trigger(event) {
      this._els.forEach(el => el.dispatchEvent(new Event(event.split('.')[0])));
      return this;
    }
  }

  // ── Helpers ───────────────────────────────────────────
  function _camelize(str) {
    return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  }

  // Wrap native event to add jQuery-like .originalEvent, .preventDefault etc.
  function _wrapEvent(e) {
    if (e._mqWrapped) return e;

    const wrap = Object.create(e);
    wrap._mqWrapped   = true;
    wrap.originalEvent = e;

    wrap.preventDefault  = () => e.preventDefault();
    wrap.stopPropagation = () => e.stopPropagation();

    // jQuery compat shorthands
    Object.defineProperty(wrap, 'target',  { get: () => e.target  });
    Object.defineProperty(wrap, 'clientX', { get: () => e.clientX });
    Object.defineProperty(wrap, 'clientY', { get: () => e.clientY });
    Object.defineProperty(wrap, 'which',   { get: () => e.which   });
    Object.defineProperty(wrap, 'touches', { get: () => e.touches });

    return wrap;
  }

  // ── Factory function  $( … ) ──────────────────────────
  function $(selector, context) {
    return new MiniQuery(selector, context);
  }

  // ── Static helpers on $ ───────────────────────────────
  $.fn      = MiniQuery.prototype;   // plugin attachment point
  $.extend  = (target, ...sources) => Object.assign(target, ...sources);
  $.noop    = () => {};

  // $(document) / $(window) convenience
  Object.defineProperty($, 'document', { get: () => $(document) });
  Object.defineProperty($, 'window',   { get: () => $(window)   });

  return $;
})();


// ======================================================
//  VIRTUAL SCROLL PRO  —  ES6 class, zero jQuery
// ======================================================
(($) => {

  class VirtualScrollPro {

    constructor(element, options) {
      this.$element = $(element);
      this.element  = element;
      this.options  = options;

      this.initialized = false;

      this.isRTL        = (this.options.dir        === 'rtl');
      this.isHorizontal = (this.options.scroll_dir  === 'horizontal');

      this.widget = this.$element;
      this.vs     = this.widget[0];

      this.wStr = (this.options.width  + '').toLowerCase().replace(/\s+/g, '');
      this.hStr = (this.options.height + '').toLowerCase().replace(/\s+/g, '');

      const wEmpty = (!this.options.width  || this.options.width  === '');
      const hEmpty = (!this.options.height || this.options.height === '');

      if ((wEmpty && hEmpty) || (this.wStr === '100%' && this.hStr === '100%')) {
        this.options.type = 'full';
      }

      this.isFull = (this.options.type === 'full');

      this.data          = this.options.data || null;
      this.useCustomData = !!this.data;
      this.total         = this.useCustomData ? this.data.length : 100_000_000_000_000;

      this.$iscroll = null;
      this.$bar     = null;
      this.$thumb   = null;
      this.$rowsA   = null;
      this.$rowsB   = null;
      this.$info    = null;
      this.$vHeader = null;
      this.$vFooter = null;
      this.rowsA    = null;
      this.rowsB    = null;
      this.vHeader  = null;
      this.vFooter  = null;
      this.sc       = null;

      this.max         = 0;
      this.offset      = 0;
      this.useA        = true;
      this.ROW_H       = 0;
      this.ROW_W       = 0;
      this.SEGMENT     = 40;
      this.BUFFER      = 5;
      this.lastDraw    = 0;
      this.resizeTimer = null;

      this.isOldIE  = false;
      this.isIE11   = false;
      this.isLegacy = false;

      this.dragging      = false;
      this.dragMode      = null;
      this.startPos      = 0;
      this.startThumbPos = 0;
      this.lastPos       = 0;
      this.velocity      = 0;
      this.isDrag        = false;
      this.thumbDrag     = false;
      this.lastTime      = 0;
      this.fric          = 0.93;
      this.maxSpeed      = 90;
      this.dragMoved     = false;
      this.dragThreshold = 3;

      this._boundHandlers = {};
      this.currentHitId = null;  // Store current highlighted hit ID
    }

    // Public method to set highlighted hit ID
    setHitId(id) {
  //console.log("🔵 setHitId called with:", id);
  //console.log("🔵 Stack trace:", new Error().stack);
  this.currentHitId = id;
  //console.log("🔵 currentHitId set to:", this.currentHitId);
  this.render();
}

    // ──────────────────────────────────────────────────────
    //  INIT
    // ──────────────────────────────────────────────────────
    init() {
      if      (this.isRTL  && this.isHorizontal)  this.vs.className += ' rtl-horizontal';
      else if (!this.isRTL && this.isHorizontal)  this.vs.className += ' ltr-horizontal';
      else if (this.isRTL  && !this.isHorizontal) this.vs.className += ' rtl-vertical';
      else                                         this.vs.className += ' ltr-vertical';

      this.element.setAttribute('dir', this.options.dir);

      const $root = this.widget;
      this.vHeader  = $root.find(this.options.header)[0];
      this.vFooter  = $root.find(this.options.footer)[0];
      this.$vHeader = $root.find(this.options.header);
      this.$vFooter = $root.find(this.options.footer);

      $root.removeClass('vertical horizontal').addClass(this.options.scroll_dir);

      const sizeCSS = this.isFull
        ? { position:'relative', width:'100%', height:'100%', border:'1px solid #aaa', overflow:'hidden', background:'#fff' }
        : { position:'relative', width: this.options.width, height: this.options.height, border:'1px solid #999', overflow:'hidden', background:'#fff' };

      $root.css(sizeCSS);

      this.rowsA = $root.find('#rowsA')[0];
      this.rowsB = $root.find('#rowsB')[0];

      // Scrollbar
      this.$bar = $root.find('.scrollbar');
      if (!this.$bar.length) {
        $root.append('<div class="scrollbar"></div>');
        this.$bar = $root.find('.scrollbar');
      }

      const arrowsHtml = `
        <div id="arrows">
          <div id="arrow-up"    class="scroll-arrow vertical-arrow-up"      style="display:none;"></div>
          <div id="arrow-down"  class="scroll-arrow vertical-arrow-down"    style="display:none;"></div>
          <div id="arrow-left"  class="scroll-arrow horizontal-arrow-left"  style="display:none;"></div>
          <div id="arrow-right" class="scroll-arrow horizontal-arrow-right" style="display:none;"></div>
        </div>`;

      if (!this.$bar.find('#arrows').length) this.$bar.append(arrowsHtml);
      if (!this.$bar.find('#thumb').length)  this.$bar.append('<div id="thumb" class="thumb"></div>');

      const $arrowUp    = $root.find('#arrow-up');
      const $arrowDown  = $root.find('#arrow-down');
      const $arrowLeft  = $root.find('#arrow-left');
      const $arrowRight = $root.find('#arrow-right');

      if (this.isHorizontal) { $arrowLeft.show(); $arrowRight.show(); }
      else                   { $arrowUp.show();   $arrowDown.show();  }

      this.$thumb   = $root.find('#thumb');
      this.$iscroll = $root.find('#iscroll');

      if (!this.$thumb.length) {
        this.$bar.html('<div id="thumb" class="thumb"></div>');
        this.$thumb = $root.find('#thumb');
      }

      this.$rowsA = $root.find('#rowsA');
      this.$rowsB = $root.find('#rowsB');
      this.$info  = $root.find('#info');
      this.sc     = this.$iscroll[0];

      this.isOldIE  = !!(document.all && !window.addEventListener);
      this.isIE11   = !!(window.MSInputMethodContext && document.documentMode);
      this.isLegacy = this.isOldIE || this.isIE11;

      // Measure a temp row
      const $tmp = $('<div class="row">Temp</div>')
        .css({ position:'absolute', visibility:'hidden' })
        .appendTo($root.find('#viewport'));

      this.ROW_H = $tmp.outerHeight() || 40;
      this.ROW_W = $tmp.outerWidth()  || 0;
      $tmp.remove();

      // Scrollbar position
      if (this.isHorizontal) {
        this.$bar.css({ top:'auto', bottom:0, left:0, right:0, width:'100%' });
        this.$iscroll.css({ right:0, left:0 });
      } else {
        this.$bar.css(this.isRTL ? { left:'auto', right:0 } : { right:'auto', left:0 });
      }

      this.max = this.maxOff();
      this.updateThumb(Math.max(0, Math.min(this.offset / this.max, 1)));
      this.scrollTo(5555);
      this.initialized = true;
      this.render();

      if (this.isLegacy) {
        this._bindLegacyEvents();
      } else {
        this._bindModernEvents();
        this._animationLoop();
      }

      this._bindArrows();
      this._bindTrackClick();

      $(window).on(`resize.${this.widget.attr('id')}`, () => this.checkScrollNeed());

      return this;
    }

    // ── Event wiring ──────────────────────────────────────
    _bindLegacyEvents() {
      this._boundHandlers.legacyMouseDown  = (e) => this._handleLegacyMouseDown(e  || window.event);
      this._boundHandlers.legacyMouseMove  = (e) => this._handleLegacyMouseMove(e  || window.event);
      this._boundHandlers.legacyMouseUp    = (e) => this._handleLegacyMouseUp(e    || window.event);
      this._boundHandlers.legacyMouseWheel = (e) => this._handleLegacyMouseWheel(e || window.event);
      this._boundHandlers.legacyBlur       = ()  => this._handleLegacyBlur();

      $(document)
        .on('mousedown', this._boundHandlers.legacyMouseDown)
        .on('mousemove', this._boundHandlers.legacyMouseMove)
        .on('mouseup',   this._boundHandlers.legacyMouseUp);

      this.sc.onmousewheel = this._boundHandlers.legacyMouseWheel;
      if (window.attachEvent) window.attachEvent('onblur', this._boundHandlers.legacyBlur);
    }

    _bindModernEvents() {
      this._boundHandlers.modernPointerDown    = this._handleModernPointerDown.bind(this);
      this._boundHandlers.modernPointerMove    = this._handleModernPointerMove.bind(this);
      this._boundHandlers.modernPointerUp      = this._handleModernPointerUp.bind(this);
      this._boundHandlers.modernWheel          = this._handleModernWheel.bind(this);
      this._boundHandlers.modernMouseDown      = this._handleModernMouseDown.bind(this);
      this._boundHandlers.modernMouseMove      = this._handleModernMouseMove.bind(this);
      this._boundHandlers.modernMouseUp        = this._handleModernMouseUp.bind(this);
      this._boundHandlers.modernThumbMouseDown = this._handleModernThumbMouseDown.bind(this);

      if (window.PointerEvent) {
        this.sc.addEventListener('pointerdown', this._boundHandlers.modernPointerDown);
        window.addEventListener('pointermove',  this._boundHandlers.modernPointerMove);
        window.addEventListener('pointerup',    this._boundHandlers.modernPointerUp);
        this.$thumb[0].addEventListener('pointerdown', this._boundHandlers.modernThumbMouseDown);
      } else {
        $(document)
          .on('mousedown', this._boundHandlers.modernMouseDown)
          .on('mousemove', this._boundHandlers.modernMouseMove)
          .on('mouseup',   this._boundHandlers.modernMouseUp);
        this.$thumb[0].onmousedown = this._boundHandlers.modernThumbMouseDown;
      }

      this.sc.onwheel = this._boundHandlers.modernWheel;
    }

    _bindArrows() {
      const speed = 15, delay = 15;
      let timer = null;

      const startScroll = (dir) => {
        stopScroll();
        timer = setInterval(() => {
          this.offset = Math.max(0, Math.min(this.offset + dir * speed, this.maxOff()));
          this.render();
        }, delay);
      };
      const stopScroll = () => { if (timer) { clearInterval(timer); timer = null; } };

      const bindArrow = ($el, dir) => {
        if (!$el?.length) return;
        $el
          .on('mousedown touchstart', (e) => { e.preventDefault(); startScroll(dir); })
          .on('mouseup mouseleave touchend touchcancel', stopScroll);
      };

      if (this.isHorizontal) {
        if (this.isRTL) {
          bindArrow(this.$bar.find('#arrow-left'),  +1);
          bindArrow(this.$bar.find('#arrow-right'), -1);
        } else {
          bindArrow(this.$bar.find('#arrow-left'),  -1);
          bindArrow(this.$bar.find('#arrow-right'), +1);
        }
      } else {
        bindArrow(this.$bar.find('#arrow-up'),   -1);
        bindArrow(this.$bar.find('#arrow-down'), +1);
      }
    }

    _bindTrackClick() {
      const $track = this.$bar;
      const $thumb = this.$thumb;
      if (!$track.length) return;

      const isArrow = ($t) => {
        const id  = $t.attr('id') || '';
        const pid = ($t.parent().attr('id') || '');
        return id.startsWith('arrow-') || pid.startsWith('arrow-');
      };

      $track.on('mousedown', (e) => {
        const $t = $(e.target);
        if ($t.is($thumb) || isArrow($t)) return;
        e.preventDefault();
        this.jumpToClick(e.clientX, e.clientY);
      });

      $track.on('touchstart', (e) => {
        const $t = $(e.target);
        if ($t.is($thumb) || isArrow($t)) return;
        const touch = e.originalEvent?.touches?.[0];
        if (touch) this.jumpToClick(touch.clientX, touch.clientY);
        e.preventDefault();
      });
    }

    // ── Public API ────────────────────────────────────────
    updateData(newData) {
      this.data          = newData || null;
      this.useCustomData = !!this.data;
      this.total         = this.useCustomData ? this.data.length : 100_000_000_000_000;
      this.render();
      return this;
    }

    scrollToindex(i) {
      if (isNaN(i)) return;
      i = Math.max(1, i);
      let newOffset = this.isHorizontal ? (i - 1) * this.ROW_W : (i - 1) * this.ROW_H;
      const max = this.maxOff();
      newOffset = Math.max(0, Math.min(newOffset, max));
      newOffset += this.isHorizontal ? this.getHeaderWidth() : this.getHeaderHeight();
      this.offset = Math.min(newOffset, max);
      this.render();
      this.updateThumb(this.offset / max);
    }

    jumpToClick(x, y) {
      const track = this.$bar[0];
      if (!track) return;
      const rect = track.getBoundingClientRect();

      if (!this.isHorizontal) {
        const travel = this.$bar.height() - this.$thumb[0].offsetHeight;
        if (travel <= 0) return;
        const newTop = Math.max(0, Math.min(y - rect.top - this.$thumb[0].offsetHeight / 2, travel));
        this.offset  = (newTop / travel) * this.maxOff();
      } else {
        const travel = this.$bar.width() - this.$thumb[0].offsetWidth;
        if (travel <= 0) return;
        const newLeft = Math.max(0, Math.min(x - rect.left - this.$thumb[0].offsetWidth / 2, travel));
        const ratio   = this.isRTL ? 1 - newLeft / travel : newLeft / travel;
        this.offset   = ratio * this.maxOff();
      }

      this.render();
      this.updateThumb(this.offset / this.maxOff());
    }

    checkScrollNeed() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.updateScrollbarVisibility();
        this.updateThumb(Math.max(0, Math.min(this.offset / this.maxOff(), 1)));
      }, 200);
    }

    // ── Legacy handlers ───────────────────────────────────
    _getPos(e) { return this.isHorizontal ? e.clientX : e.clientY; }

    _handleLegacyMouseDown(e) {
      const src = e.target || e.srcElement;
      if (!this._isEventInWidget(e)) return;
      const pos = this._getPos(e);
      if (src.id === 'thumb') {
        this.dragMode      = 'thumb';
        this.startPos      = pos;
        this.startThumbPos = this.isHorizontal
          ? (parseInt(this.$thumb.css('left'), 10) || 0)
          : (parseInt(this.$thumb.css('top'),  10) || 0);
      } else {
        this.dragMode = 'content';
        this.startPos = pos;
        this.lastPos  = pos;
      }
      this.dragging = true;
      if (src?.setCapture) src.setCapture();
      else if (document.body.setCapture) document.body.setCapture();
      document.onselectstart = () => false;
      if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
    }

    _handleLegacyMouseMove(e) {
      if (!this.dragging) return;
      const now = Date.now();
      if (now - this.lastDraw < 16) return;
      this.lastDraw = now;
      const pos = this._getPos(e);

      if (this.dragMode === 'content') {
        const delta = pos - this.lastPos;
        this.offset += (this.isHorizontal && this.isRTL) ? delta : -delta;
        this.lastPos = pos;
        this.render();
      } else if (this.dragMode === 'thumb') {
        const containerSize = this.isHorizontal ? this.$bar.width()  : this.$bar.height();
        const thumbSize     = this.isHorizontal ? this.$thumb[0].offsetWidth : this.$thumb[0].offsetHeight;
        const travel        = containerSize - thumbSize;
        const newThumbPos   = Math.max(0, Math.min(this.startThumbPos + (pos - this.startPos), travel));

        if (this.isHorizontal) this.$thumb[0].style.left = newThumbPos + 'px';
        else                   this.$thumb[0].style.top  = newThumbPos + 'px';

        const ratio = (this.isHorizontal && this.isRTL) ? 1 - newThumbPos / travel : newThumbPos / travel;
        this.offset = ratio * this.maxOff();
        this.render();
      }
    }

    _handleLegacyMouseUp() {
      this.dragging = false; this.dragMode = null;
      document.onselectstart = null;
      try { document.releaseCapture?.(); this.$thumb[0].releaseCapture?.(); } catch (_) {}
    }

    _handleLegacyMouseWheel(e) {
      const delta = e.wheelDelta ? -e.wheelDelta / 5 : e.detail * 8;
      if (this.isHorizontal && this.isRTL) this.offset -= delta * 3;
      else this.offset += this.isHorizontal ? delta * 3 : delta;
      this.offset = Math.max(0, Math.min(this.offset, this.maxOff()));
      this.render();
      if (e.preventDefault) e.preventDefault();
      return false;
    }

    _handleLegacyBlur() { this.dragging = false; this.dragMode = null; }

    // ── Modern handlers ───────────────────────────────────
    _handleModernPointerDown(e) {
      if (!this._isEventInWidget(e)) return;
      this._sDrag(this._getPos(e));
      e.preventDefault();
    }

    _handleModernPointerMove(e) {
      if (this.isDrag)    this._mDrag(this._getPos(e));
      if (this.thumbDrag) this._mThumb(this._getPos(e));
    }

    _handleModernPointerUp()           { this._eDrag(); this._eThumb(); }

    _handleModernWheel(e) {
      const delta = e.wheelDelta ? -e.wheelDelta / 5 : e.detail * 8;
      if (this.isHorizontal && this.isRTL) this.offset -= delta * 3;
      else this.offset += this.isHorizontal ? delta * 3 : delta;
      this.offset = Math.max(0, Math.min(this.offset, this.maxOff()));
      this.render();
      if (e.preventDefault) e.preventDefault();
      return false;
    }

    _handleModernMouseDown(e) {
      if (!this._isEventInWidget(e) || e.target.id === 'thumb') return;
      this._sDrag(this._getPos(e));
      return false;
    }

    _handleModernMouseMove(e) { this._mDrag(this._getPos(e)); this._mThumb(this._getPos(e)); }
    _handleModernMouseUp()    { this._eDrag(); this._eThumb(); }

    _handleModernThumbMouseDown(e) {
      this._sThumb(this._getPos(e));
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    _sDrag(pos) {
      this.isDrag = true; this.velocity = 0;
      this.lastPos = pos; this.lastTime = Date.now(); this.dragMoved = false;
    }

    _mDrag(pos) {
      if (!this.isDrag) return;
      const now = Date.now(), delta = pos - this.lastPos;
      if (Math.abs(delta) > this.dragThreshold) this.dragMoved = true;

      this.offset += (this.isHorizontal && this.isRTL) ? delta : -delta;
      const dt = now - this.lastTime;
      if (dt > 0) {
        const raw = (this.isHorizontal && this.isRTL) ? (delta / dt) * 16 : (-delta / dt) * 16;
        this.velocity = Math.max(-this.maxSpeed, Math.min(raw, this.maxSpeed));
      }
      this.lastPos = pos; this.lastTime = now;
      this.isDrag ? this._renderPositionOnly() : this.render();
    }

    _eDrag()  { this.isDrag    = false; }

    _sThumb(pos) {
      this.thumbDrag = true; this.startPos = pos;
      this.startThumbPos = this.isHorizontal
        ? (parseInt(this.$thumb[0].style.left, 10) || 0)
        : (parseInt(this.$thumb[0].style.top,  10) || 0);
    }

    _mThumb(pos) {
      if (!this.thumbDrag) return;
      const containerSize = this.isHorizontal ? this.$bar.width()  : this.$bar.height();
      const thumbSize     = this.isHorizontal ? this.$thumb.width() : this.$thumb.height();
      const travel        = containerSize - thumbSize;
      const newThumbPos   = Math.max(0, Math.min(this.startThumbPos + (pos - this.startPos), travel));
      const ratio         = (this.isHorizontal && this.isRTL) ? 1 - newThumbPos / travel : newThumbPos / travel;
      this.offset   = ratio * this.maxOff();
      this.velocity = 0;
      this.render();
    }

    _eThumb() { this.thumbDrag = false; }

    _animationLoop() {
      const loop = () => {
        if (!this.isDrag && !this.thumbDrag && Math.abs(this.velocity) > 0.02) {
          this.offset   += this.velocity;
          this.velocity *= this.fric;
          if (this.offset <= 0)             { this.offset = 0;             this.velocity = 0; }
          else if (this.offset >= this.maxOff()) { this.offset = this.maxOff(); this.velocity = 0; }
          this.render();
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    _isEventInWidget(e) {
      const target = e.target || e.srcElement;
      return $(target).closest(`#${this.widget.attr('id')}`).length > 0;
    }

    // ── Scrollbar visibility ──────────────────────────────
    updateScrollbarVisibility() {
      const needs = this.isHorizontal ? this.tW() > this.cW() + 1 : this.tH() > this.cH() + 1;
      if (needs) {
        this.$bar.show();
        if (this.isHorizontal) this.$iscroll.css({ right:0, left:0, bottom:20 });
      } else {
        this.$bar.hide();
        this.$iscroll.css({ right:0, left:0, bottom:0 });
        this.$vFooter.css(this.isRTL ? { left:0, right:'auto' } : { right:0, left:'auto' });
        this.offset = 0;
      }
    }

    // ── Thumb ─────────────────────────────────────────────
    updateThumb(r) {
      if (!this.$thumb[0]) return;
      const gap = 20;
      try {
        if (this.isHorizontal) {
          const avail = (this.$bar.width() || this.widget.width()) - gap * 2;
          let   tw    = Math.max(40, avail * (this.cW() / this.tW()));
          if (tw > avail * 0.8) tw = avail * 0.8;
          const travel = avail - tw;
          let   left   = Math.min(this.isRTL ? travel * (1 - r) : travel * r, travel) + gap;
          this.$thumb[0].style.width = tw   + 'px';
          this.$thumb[0].style.left  = left + 'px';
          this.$thumb[0].style.top   = '0';
        } else {
          const avail = (this.$bar.height() || this.widget.height()) - gap * 2;
          let   th    = Math.max(30, avail * (this.cH() / this.tH()));
          if (th > avail * 0.8) th = avail * 0.8;
          const travel = avail - th;
          let   top    = Math.min(travel * r, travel) + gap;
          this.$thumb[0].style.height = th  + 'px';
          this.$thumb[0].style.top    = top + 'px';
          this.$thumb[0].style.left   = '0';
        }
      } catch (_) {}
    }

    _renderPositionOnly() {
      const maxOff = this.maxOff();
      const clampedOffset = Math.max(0, Math.min(this.offset, maxOff));
      const headerW = this.getHeaderWidth();
      const headerH = this.getHeaderHeight();
      const itemSize = this.isHorizontal ? this.ROW_W : this.ROW_H;
      
      const visibleContainer = this.useA ? this.$rowsA : this.$rowsB;
      if (!visibleContainer || !visibleContainer[0]) return;
      
      // Get stored start index, or calculate if not exists
      let startIndex = parseInt(visibleContainer.attr('data-start'));
      if (isNaN(startIndex) || startIndex < 0) {
        startIndex = Math.max(0, Math.floor(clampedOffset / itemSize) - this.BUFFER);
        visibleContainer.attr('data-start', startIndex);
      }
      
      if (this.isHorizontal) {
        let xPos = (startIndex * this.ROW_W) - clampedOffset + headerW;
        if (this.isRTL) xPos = -xPos;
        
        if (this.isLegacy) {
          visibleContainer[0].style.left = xPos + 'px';
        } else {
          visibleContainer.css('transform', `translate3d(${xPos}px, 0px, 0px)`);
        }
      } else {
        const yPos = (startIndex * this.ROW_H) - clampedOffset + headerH;
        if (this.isLegacy) {
          visibleContainer[0].style.top = yPos + 'px';
        } else {
          visibleContainer.css('transform', `translate3d(0px, ${yPos}px, 0px)`);
        }
      }
      
      this.updateThumb(clampedOffset / maxOff);
    }

    // ── Full render ───────────────────────────────────────
    render() {
      const headerW = this.getHeaderWidth();
      const footerW = this.getFooterWidth();
      const headerH = this.getHeaderHeight();
      const footerH = this.getFooterHeight();

      this.updateScrollbarVisibility();

      if (!this.isHorizontal) {
        this.$rowsA.css('margin-bottom', footerH + 'px');
        this.$rowsB.css('margin-bottom', footerH + 'px');
      }

      this.offset = Math.max(0, Math.min(this.offset, this.max));

      const BUFFER_SIZE = this.isLegacy ? 20 : this.BUFFER;
      const SEGMENT_SIZE = this.isLegacy ? 20 : this.SEGMENT;
      const ITEM_W = this.ROW_W;

      let start, end, html;

      // Make sure we have data to render
      if (this.total === 0 || (this.useCustomData && (!this.data || this.data.length === 0))) {
        // No data, show empty message
        html = '<div class="row">No data available</div>';
        start = 0;
        end = 1;
      } else {















if (this.isHorizontal) {
  const effectiveTW = this.total * ITEM_W + headerW + footerW;
  const maxScroll = Math.max(0, effectiveTW - this.cW());
  this.offset = Math.max(0, Math.min(this.offset, maxScroll));

  const first = Math.floor(this.offset / ITEM_W);
  start = Math.max(0, first - BUFFER_SIZE);
  end = Math.min(this.total, first + SEGMENT_SIZE + BUFFER_SIZE);

  // If start === end (no rows to show), force at least one row
  if (start >= end && this.total > 0) {
    start = 0;
    end = Math.min(this.total, SEGMENT_SIZE);
  }

  html = '';
  for (let i = start; i < end; i++) {
    let content = (this.useCustomData && this.data && this.data[i])
      ? (this.data[i].html || `Row #${i + 1}`) : `Row #${i + 1}`;
    const rowId = i + 1;
    const isHit = (this.currentHitId && String(rowId) === String(this.currentHitId));
    const hitClass = isHit ? ' hit' : '';
    
    // ✅ Add active_hit class to the do_yelow_hit link for horizontal
    if (isHit && content) {
      content = content.replace(
        /class="do_yelow_hit"/,
        'class="do_yelow_hit active_hit"'
      );
    }
    
    html += this.isLegacy
      ? `<div class="row${hitClass}" data-id="${rowId}" style="${this.isRTL?'right':'left'}:${(i-start)*ITEM_W}px">${content}</div>`
      : `<div data-id="${rowId}" class="row${i%2?' alt':''}${hitClass}">${content}</div>`;
  }
} 

else {
  const first = Math.floor(this.offset / this.ROW_H);
  start = Math.max(0, first - BUFFER_SIZE);
  end = Math.min(this.total, first + SEGMENT_SIZE + BUFFER_SIZE);

  if (start >= end && this.total > 0) {
    start = 0;
    end = Math.min(this.total, SEGMENT_SIZE);
  }

  const parts = [];
  for (let i = start; i < end; i++) {
    let content = (this.useCustomData && this.data && this.data[i])
      ? (this.data[i].html || `Row #${i + 1}`) : `Row #${i + 1}`;
    const rowId = i + 1;
    
    // Check if this row should be highlighted
    const isHit = (this.currentHitId && String(rowId) === String(this.currentHitId));
    const hitClass = isHit ? ' hit' : '';
    
    // If this is the hit row, add active_hit class to the do_yelow_hit link
    if (isHit && content) {
      // Add active_hit class to the link
      content = content.replace(
        /class="do_yelow_hit"/,
        'class="do_yelow_hit active_hit"'
      );
    }
    
    parts.push(`<div data-id="${rowId}" class="row${i%2?' alt':''}${hitClass}">${content}</div>`);
  }
  html = parts.join('');
}










	
		
		
		
		
		
		
		
		
		
      }

      // Buffer swap
      const isLeg = this.isLegacy;
      const $front = this.useA ? (isLeg ? this.rowsA : this.$rowsA) : (isLeg ? this.rowsB : this.$rowsB);
      const $back = this.useA ? (isLeg ? this.rowsB : this.$rowsB) : (isLeg ? this.rowsA : this.$rowsA);
      
      if (isLeg) {
        $back.innerHTML = html;
        $back.setAttribute('data-start', start);
      } else {
        $back.html(html);
        $back.attr('data-start', start);
      }

      // Position
      if (this.isHorizontal) {
        const pos = this.isRTL ? this.offset - start * ITEM_W : start * ITEM_W - this.offset;
        const posX = pos + (this.isRTL ? -headerW : headerW);
        if (isLeg) {
          if (this.isRTL) $back.style.right = (-posX) + 'px';
          else $back.style.left = posX + 'px';
          $back.style.top = '0';
          $back.style.width = ((end - start) * ITEM_W + headerW + 100) + 'px';
        } else {
          $back.css('transform', `translate3d(${posX}px,0,0)`);
        }
      } else {
        const posY = start * this.ROW_H - this.offset + headerH;
        if (isLeg) $back.style.top = posY + 'px';
        else $back.css('transform', `translate3d(0,${posY}px,0)`);
      }

      if (isLeg) {
        $back.style.display = 'block';
        $front.style.display = 'none';
      } else {
        $back.show();
        $front.hide();
      }
      this.useA = !this.useA;

      // Header
      if (this.vHeader) {
        if (this.isHorizontal) {
          const hx = this.isRTL ? this.offset : -this.offset;
          if (isLeg) this.vHeader.style[this.isRTL ? 'right' : 'left'] = `${-this.offset}px`;
          else this.vHeader.style.transform = `translate3d(${hx}px,0,0)`;
        } else {
          if (isLeg) this.vHeader.style.top = `${-this.offset}px`;
          else this.vHeader.style.transform = `translate3d(0,${-this.offset}px,0)`;
        }
      }

      // Footer
      if (this.vFooter) {
        this.vFooter.style.opacity = Math.max(0, Math.min(this.offset / this.maxOff(), 1));
        if (this.isHorizontal) {
          const extra = this.isRTL ? 5 : 0;
          let footX = (this.total * this.ROW_W + this.getHeaderWidth() + extra) - this.offset;
          if (isLeg) this.vFooter.style[this.isRTL ? 'right' : 'left'] = footX + 'px';
          else {
            if (this.isRTL) footX = -footX;
            this.vFooter.style.transform = `translate3d(${footX}px,0,0)`;
          }
        } else {
          const footY = this.maxOff() - this.offset;
          if (isLeg) this.vFooter.style.bottom = `${-footY}px`;
          else this.vFooter.style.transform = `translate3d(0,${footY}px,0)`;
        }
      }

      const ratio = Math.max(0, Math.min(this.offset / this.max, 1));
      this.updateThumb(ratio);

      const global = Math.max(1, Math.floor(ratio * (this.total - 1)) + 1);
      if (this.$info && this.total > 0) {
        this.$info.text(
          `Row ${global} / ${this.total} (${(ratio * 100).toFixed(3)}%) – ${this.isHorizontal ? 'Horizontal' : 'Vertical'}`
        );
      }
    }

    // ── Dimension helpers ─────────────────────────────────
    maxOff()         { return this.isHorizontal ? Math.max(0, this.tW()-this.cW()) : Math.max(0, this.tH()-this.cH()); }
    cH()             { return this.$iscroll.height(); }
    cW()             { return this.$iscroll.width();  }
    tH()             { return this.total * this.ROW_H + this.getHeaderHeight() + this.getFooterHeight(); }
    tW()             { return this.total * this.ROW_W + this.getHeaderWidth()  + this.getFooterWidth();  }
    getHeaderHeight(){ const h = this.widget.find(this.options.header)[0]; return h ? h.offsetHeight : 0; }
    getHeaderWidth() { const h = this.widget.find(this.options.header)[0]; return h ? (h.offsetWidth || h.clientWidth || 0) : 0; }
    getFooterHeight(){ const h = this.widget.find(this.options.footer)[0]; return h ? h.offsetHeight : 0; }
    getFooterWidth() { const h = this.widget.find(this.options.footer)[0]; return h ? (h.offsetWidth || h.clientWidth || 0) : 0; }

    // ── Stubs / lifecycle ─────────────────────────────────
    scrollTo()        { return this; }
    scrollToPercent() { return this; }
    scrollToRow()     { alert(); return this; }
    getOffset()       { return 0; }
    getMaxOffset()    { return 1000; }
    refresh()         { return this; }

    destroy() {
      if (this.isLegacy) {
        $(document)
          .off('mousedown', this._boundHandlers.legacyMouseDown)
          .off('mousemove', this._boundHandlers.legacyMouseMove)
          .off('mouseup',   this._boundHandlers.legacyMouseUp);
        if (this.sc) this.sc.onmousewheel = null;
        if (window.attachEvent) window.detachEvent('onblur', this._boundHandlers.legacyBlur);
      } else {
        if (window.PointerEvent) {
          this.sc?.removeEventListener('pointerdown', this._boundHandlers.modernPointerDown);
          this.sc?.removeEventListener('wheel',       this._boundHandlers.modernWheel);
          window.removeEventListener('pointermove',   this._boundHandlers.modernPointerMove);
          window.removeEventListener('pointerup',     this._boundHandlers.modernPointerUp);
          this.$thumb[0]?.removeEventListener('pointerdown', this._boundHandlers.modernThumbMouseDown);
        } else {
          $(document)
            .off('mousedown', this._boundHandlers.modernMouseDown)
            .off('mousemove', this._boundHandlers.modernMouseMove)
            .off('mouseup',   this._boundHandlers.modernMouseUp);
          if (this.$thumb[0]) this.$thumb[0].onmousedown = null;
        }
      }
      $(window).off(`resize.${this.widget.attr('id')}`);
      this.initialized = false;
      return this;
    }
  }

  // ──────────────────────────────────────────────────────
  //  jQuery-style plugin  —  IDENTICAL calling convention
  // ──────────────────────────────────────────────────────
  $.fn.VirtualScrollPro = function (options, ...args) {
    if (typeof options === 'string') {
      // Method-call mode:  $('#x').VirtualScrollPro('updateData', newArr)
      const instance = this.data('VirtualScrollPro');
      if (!instance)                              { console.error('Plugin not initialized!'); return this; }
      if (typeof instance[options] !== 'function'){ console.error('Unknown method:', options); return this; }
      return instance[options](...args);
    }

    // Init mode:  $('#x').VirtualScrollPro({ … })
    this.each(function () {
      const $this = $(`#${this.id}`);          // wrap via our $
      if ($this.data('VirtualScrollPro')) return;

      const opts     = $.extend({ type:'widget', scroll_dir:'vertical' }, options || {});
      const instance = new VirtualScrollPro(this, opts);
      instance.init();
      $this.data('VirtualScrollPro', instance);
    });

    return this;
  };

  // ✅ AFTER — $.fn IS accessible (it's the same object reference)
  $.fn.each = function (fn) {
    this._els.forEach((el, i) => fn.call(el, i, el));
    return this;
  };

})($);