// ================== SIMPLE UNIVERSAL SMOOTH SCROLL ==================
// Works on EVERY browser (Chrome 1+, Firefox 1+, IE 9+, Safari 1+)

(function() {
    // Animation function that works everywhere
    var animate = window.requestAnimationFrame || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame ||
                  function(cb) { setTimeout(cb, 16); };
    
    // Smooth scroll function
    window.smoothScrollTo = function(element, targetY, duration) {
        duration = duration || 400;
        
        var isWindow = (element === window);
        var startY = isWindow ? (window.pageYOffset || document.documentElement.scrollTop) : element.scrollTop;
        var distance = targetY - startY;
        if (Math.abs(distance) < 2) return;
        
        var startTime = null;
        
        function step(now) {
            if (!startTime) startTime = now;
            var elapsed = now - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            var newY = startY + (distance * ease);
            
            isWindow ? window.scrollTo(0, newY) : (element.scrollTop = newY);
            
            if (elapsed < duration) animate(step);
        }
        
        animate(step);
    };
    
    // Main function - scroll element to center
    window.scrollToCenter = function(el) {
        if (!el) return;
        
        // Find scrollable parent
        var parent = el.parentNode;
        while (parent && parent !== document.body && parent !== document.documentElement) {
            if (parent.scrollHeight > parent.clientHeight) {
                var style = window.getComputedStyle(parent);
                if (style.overflowY === 'auto' || style.overflowY === 'scroll') break;
            }
            parent = parent.parentNode;
        }
        
        var isWindow = (!parent || parent === document.body || parent === document.documentElement);
        var container = isWindow ? window : parent;
        
        // Get positions
        var elRect = el.getBoundingClientRect();
        var containerTop = isWindow ? 0 : container.getBoundingClientRect().top;
        var containerHeight = isWindow ? (window.innerHeight || document.documentElement.clientHeight) : container.clientHeight;
        var currentScroll = isWindow ? (window.pageYOffset || document.documentElement.scrollTop) : container.scrollTop;
        
        // Calculate center position
        var targetY = (elRect.top + currentScroll) - containerTop - (containerHeight / 2) + (elRect.height / 2);
        
        // Scroll
        window.smoothScrollTo(container, targetY, 400);
    };
})();

