// DOM utilities
function getElement(id) {
    return document.getElementById(id);
}

function getParentNode(node) {
    if (node && node.parentNode)
        return node.parentNode;
    return null;
}

function setInnerHTML(a_Node, a_strText) {
    a_Node.innerHTML = a_strText;
}

function getStylePropertyValue(elementTag, styleProp) {
    var y = null;
    if (elementTag.currentStyle)
        y = elementTag.currentStyle[styleProp];
    else if (window.getComputedStyle)
        y = document.defaultView.getComputedStyle(elementTag, null).getPropertyValue(styleProp);
    return y;
}