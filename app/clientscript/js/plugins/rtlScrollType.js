/* MIT License */
/* global jQuery */
(function ($) {
    'use strict';

    // Create a hidden div for detecting RTL scroll type
    var definer = $('<div style="direction: rtl; visibility: hidden; width: 1px; height: 1px; overflow: hidden;">ABCD</div>').appendTo('body')[0];
    
    // Default scroll type is 'reverse'
    var type = 'reverse';

    // Check different scroll types
    if (definer.scrollLeft > 0) {
        type = 'default';
    } else {
        definer.scrollLeft = 1;
        if (definer.scrollLeft === 0) {
            type = 'negative';
        }
    }

    // Set the RTL scroll type in jQuery support
    $.support.rtlScrollType = type;

    // Remove the temporary div
    $(definer).remove();
}(jQuery));