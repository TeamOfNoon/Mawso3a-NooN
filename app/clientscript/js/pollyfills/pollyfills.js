








if (!window.getComputedStyle) {
    /**
     * @param {(Element|null)} e
     * @param {(null|string)=} t
     * @return {(CSSStyleDeclaration|null)}
     */
    window.getComputedStyle = function(e, t) {
        return this.el = e, this.getPropertyValue = function(t) {
            /** @type {RegExp} */
            var n = /(\-([a-z]){1})/g;
            return t == "float" && (t = "styleFloat"), n.test(t) && (t = t.replace(n, function() {
                return arguments[2].toUpperCase();
            })), e.currentStyle[t] ? e.currentStyle[t] : null;
        }, this;
    };
}













// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}




if (!Array.prototype.push) {
// Check if not already supported, then only add. No need to check this when you want to Override the method

    // Add method to prototype of array, so that can be directly called on array
    Array.prototype.push = function() {

        // Use loop for multiple/any no. of elements
        for (var i = 0; i < arguments.length; i++) {
            this[this.length] = arguments[i];
        }


        // Return new length of the array
        return this.length;
    };
}












/**
 * trim polyfill
 *
 */
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}





/**
 * Array.filter() polyfill
 */
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

/*
if (!Array.prototype.filter)
  Array.prototype.filter = function(func, thisArg) {
	'use strict';
	if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
		throw new TypeError();

	var len = this.length >>> 0,
		res = new Array(len), // preallocate array
		t = this, c = 0, i = -1;
	if (thisArg === undefined)
	  while (++i !== len)
		// checks to see if the key was set
		if (i in this)
		  if (func(t[i], i, t))
			res[c++] = t[i];
	else
	  while (++i !== len)
		// checks to see if the key was set
		if (i in this)
		  if (func.call(thisArg, t[i], i, t))
			res[c++] = t[i];

	res.length = c; // shrink down array to proper size
	return res;
  };

*/

















/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.2.20171210
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (
	   !("classList" in document.createElement("_")) 
	|| document.createElementNS
	&& !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))
) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "The token must not be empty."
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "The token must not contain space characters."
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	return ~checkTokenAndGetIndex(this, token + "");
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (!~checkTokenAndGetIndex(this, token)) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (~index) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.replace = function (token, replacement_token) {
	var index = checkTokenAndGetIndex(token + "");
	if (~index) {
		this.splice(index, 1, replacement_token);
		this._updateClassName();
	}
}
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
		// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
		if (ex.number === undefined || ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	// replace() polyfill
	if (!("replace" in document.createElement("_").classList)) {
		DOMTokenList.prototype.replace = function (token, replacement_token) {
			var
				  tokens = this.toString().split(" ")
				, index = tokens.indexOf(token + "")
			;
			if (~index) {
				tokens = tokens.slice(index);
				this.remove.apply(this, tokens);
				this.add(replacement_token);
				this.add.apply(this, tokens.slice(1));
			}
		}
	}

	testElement = null;
}());

}
















/**
 * Polyfills the querySelector and querySelectorAll methods.
 * @see https://gist.github.com/Fusselwurm/4673695
 */
(function () {
    var style;
    var select = function (selector, maxCount) {
        var all = document.all,
            l = all.length,
            i,
            resultSet = [];

        style.addRule(selector, "foo:bar");
        for (i = 0; i < l; i += 1) {
            if (all[i].currentStyle.foo === "bar") {
                resultSet.push(all[i]);
                if (resultSet.length > maxCount) {
                    break;
                }
            }
        }
        style.removeRule(0);
        return resultSet;
    };
    if (document.querySelectorAll || document.querySelector) {
        return;
    }
    style = document.createStyleSheet();

    document.querySelectorAll = document.body.querySelectorAll = function (selector) {
        return select(selector, Infinity);
    };
    document.querySelector = document.body.querySelector = function (selector) {
        return select(selector, 1)[0] || null;
    };
}());
(function () {
    'use strict';





    var _slice = Array.prototype.slice;

    try {
        _slice.call(document.documentElement); // Can't be used with DOM elements in IE < 9
    }
    catch (e) { // Fails in IE < 9
    
 
    
    
        Array.prototype.slice = function (begin, end) {
            var i, arrl = this.length, a = [];
            if (this.charAt) { // Although IE < 9 does not fail when applying Array.prototype.slice
                               // to strings, here we do have to duck-type to avoid failing
                               // with IE < 9's lack of support for string indexes
                for (i = 0; i < arrl; i++) {
                    a.push(this.charAt(i));
                }
            }
            else { // This will work for genuine arrays, array-like objects, NamedNodeMap (attributes, entities, notations), NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes), and will not fail on other DOM objects (as do DOM elements in IE < 9)
                for (i = 0; i < this.length; i++) { // IE < 9 (at least IE < 9 mode in IE 10) does not work with node.attributes (NamedNodeMap) without a dynamically checked length here
                    a.push(this[i]);
                }
            }
            return _slice.call(a, begin, end || a.length); // IE < 9 gives errors here if end is allowed as undefined (as opposed to just missing) so we default ourselves
        };
    }




// addEventListener polyfill IE6+
!window.addEventListener && (function (window, document) {
	function Event(e, element) {
		var instance = this;

		for (property in e) {
			instance[property] = e[property];
		}

		instance.currentTarget =  element;
		instance.target = e.srcElement || element;
		instance.timeStamp = +new Date;

		instance.preventDefault = function () {
			e.returnValue = false;
		};
		instance.stopPropagation = function () {
			e.cancelBubble = true;
		};
	}

	function addEventListener(type, listener) {
		var
		element = this,
		listeners = element.listeners = element.listeners || [],
		index = listeners.push([listener, function (e) {
			listener.call(element, new Event(e, element));
		}]) - 1;

		element.attachEvent('on' + type, listeners[index][1]);
	}

	function removeEventListener(type, listener) {
		for (var element = this, listeners = element.listeners || [], length = listeners.length, index = 0; index < length; ++index) {
			if (listeners[index][0] === listener) {
				element.detachEvent('on' + type, listeners[index][1]);
			}
		}
	}

	window.addEventListener = document.addEventListener = addEventListener;
	window.removeEventListener = document.removeEventListener = removeEventListener;

	if ('Element' in window) {
		Element.prototype.addEventListener    = addEventListener;
		Element.prototype.removeEventListener = removeEventListener;
	} else {
		var
		head = document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		head.insertBefore(style, head.firstChild);

		style.styleSheet.cssText = '*{-ms-event-prototype:expression(!this.addEventListener&&(this.addEventListener=addEventListener)&&(this.removeEventListener=removeEventListener))}';
	}
})(window, document) && scrollBy(0, 0);



}());


(function (window, document) {


})(window, document);








/**
 * Array Filter methods
 * Filter method is used to filter the data from an Array.
 * e.x. : We have an numbers array and we want to find all Even Numbers or Odd Numbers or NUmber divisible by 3.
 * 
 * Filter method is supported in all the browsers, but if you still want to support in Legacy browsers like IE8 or IE9
 * Then we can use polyfills library.
 * 
 * Filter takes a predicateFn as an argument.
 * predicateFn = (currentVal, index, arr) => boolean
 * 
 * Filter method always returns a new Array & it won't modify the original array
 */
/*Array.prototype.filter = function(predicateFn, thisArg){

    if(!predicateFn || typeof predicateFn !== 'function') throw TypeError();
    var results = [];
    var size = this.length;
    var that = thisArg || this;
    for(var i = 0; i < size; i++) {
        var retVal = false;
        try {
            retVal = predicateFn.apply(that, [this[i], i, this])
        } catch(e) {
            retVal = false;
        }
        if(!!retVal){
            results.push(this[i]);
        }
    }
    return results;
}
*/










/*
[].filter || (Array.prototype.filter = // Use the native array filter method, if available.
  function(a, //a function to test each value of the array against. Truthy values will be put into the new array and falsy values will be excluded from the new array
    b, // placeholder
    c, // placeholder 
    d, // placeholder
    e // placeholder
  ) {
      c = this; // cache the array
      d = []; // array to hold the new values which match the expression
      for (e in c) // for each value in the array, 
        ~~e + '' == e && e >= 0 && // coerce the array position and if valid,
        a.call(b, c[e], +e, c) && // pass the current value into the expression and if truthy,
        d.push(c[e]); // add it to the new array
      
      return d // give back the new array
  });
*/


/*
if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();
   
    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func(t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
   
    res.length = c; // shrink down array to proper size
    return res;
  };
}*/
