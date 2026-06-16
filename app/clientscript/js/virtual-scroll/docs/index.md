VScroll
======

**Virtual Scroll Made Simple**

 * Display millions of rows and grids without affecting your website performance
 * Multi-column support
 * Responsive
 * Buffer feature
 * Inspired by Facebook, Twitter and fonts.google.com
 * Cross-browser
 * Supports dynamic data
 * Useful API
 * And more


Installation
============

It doesn't require any external dependency. Just upload production-ready **vscroll.min.js** file from **dist** folder in the package and to somewhere in your website, and then include it like

`<script src="path/to/vscroll.min.js"></script>`

*Make sure to replace path/to with your path*


Usage
=====

Create a container

`<div id="mycontainer"></div>`

Then Initialize it like 

*For more examples, please check out example folder in the package*

```js
// An array of records, could contain anything, not just numbers.
var myData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Template function must return HTML element
var createTemplateFunction = function (item, index, startIndex, endIndex) {
   
     // Create your HTML template of each record,
     // it could be anything, an img, li, div etc.
     var HTMLElement = document.createElement("div");
     HTMLElement.textContent = item;

     return HTMLElement;

};

// Your options Object
var options = {
    container: "#mycontainer",
    data: myData,
    createItem: createTemplateFunction
};

// Initialize VScroll
var myScroll = new VScroll(options);
```

Options
-------

* `container` set vscroll container. <br>
  Type: `StringSelector/HTMLElement`  

* `wrapper` optional custom wrapper. <br>
  Type: `StringSelector/HTMLElement` <br>
  
  *You usually don't need custom wrapper, but you can set custom wrapper to enable virtual scroll on tables. You can check examples folder in the package for more info.*
  
  *This wrapper must be inside container.*

* `itemsWrapper` optional custom items wrapper. This is where items gets inserted. <br>
  Type: `StringSelector/HTMLElement` <br>
  
   *This wrapper must be inside container.*
   
* `scrollParent` optional custom scrollParent. <br>
  Type: `StringSelector/HTMLElement` <br>
  Default: `window`
  
* `data` data array. <br>
  Type: `Array`

* `itemHeight` set item height in pixels. <br>
  Type: `Number` <br>
  Default: `50`
  
  *Items must have fixed known height. We haven't supported custom height for each item, yet.*

* `itemWidth` optional item width in pixels. <br>
  Type: `Number` <br>
  
  *You don't need to set item width unless you want to enable multi-column virtual scroll or responsive virtual scroll.*
  
* `createItem` set your own create item function that returns HTMLElement. This function contains data and indexes for you to do whatever you want. <br>
  Type: `Function` <br>
  Contains: `item`, `index`, `startIndex`, `endIndex`
  

* `buffer` optional items buffer count. You can buffer/prerender items before being visible on the DOM. <br>
  Type: `Number` <br>
  Default: `0`
  
* `smartBuffer` optional smart buffer. <br>
  Type: `Boolean` <br>
  Default: `true`
  
  This is smart buffer and its recommend to keep it `true`, it will bind buffer count to columns. That means if you have a list, it will buffer the next item. And if you have a 4-column grid, it will buffer the next 4 items. This is reccomend for want buffer and responsive to work together.

* `columns` optional columns count. <br>
  Type: `Number` <br>
  Default: `1`
  
* `responsive` optional responsive virtual scroll for multi-columns. <br>
  Type: `Boolean` <br>
  Default: `false` <br>
  
  *It requires fixed known `itemWidth` in pixels*
  
* `offsetBefore` optional offset before virtual scroll in pixels. <br>
  Type: `Number` <br>
  Default: `0`

* `offsetAfter` optional offset after virtual scroll in pixels. <br>
  Type: `Number` <br>
  Default: `0`

* `scrollOffset` optional scroll offset in pixels. <br>
  Type: `Number` <br>
  Default: `0`


API
===

Useful API to notify VScroll of data changes. You don't have to use it.

update
------

```js
var myScroll = new VScroll(options);

myScroll.update();
```

`update()`

Update VScroll.

*It should get called when scrollTop change. It removes and appends data. It's same function that gets called on `scroll` event*


refresh
-------

```js
var myScroll = new VScroll(options);

// Change something in VScroll options
myScroll.itemHeight = 80;

myScroll.refresh();

// Or fast refresh
myScroll.refresh(true);
```

`refresh(fast)`

Refresh VScroll.

* `fast` fast refresh.<br>
   Type: `Boolean`

*There's a time when you should just fast refresh or complete refresh VScroll, it all depends on the options you change.
If you just change pushed new records to data, you should just call fast refresh. If you change smartBuffer or any other options, you should call complete refresh*


destroy
-------

```js
var myScroll = new VScroll(options);

var bool = myScroll.destroy(); 

// Extra: you can check if it's destroyed by checking myScroll.destroyed prop or bool
if (myScroll.destroyed) {
   // Do something
}
```

`destroy()`

Destroy VScroll.


Browser Support
===============

Chrome 4+, FireFox 3.5+, IE 9+, Opera 10+, Safari 3.2+, Edge and others.

*If you wish to support legacy web browsers, you need to include `addEventListener` and `querySelector` polyfills.*