var rootpath= "";
var v = '87px.png';
//var time = "?time=" + (new Date().getTime());
var time = "?time=" + "3";
if (typeof vburl !== 'undefined') {

rootpath = vburl.substring(0, vburl.indexOf(v));

}


document.write('<script data-cfasync="false"  type=\"text/javascript\" src=\'' + rootpath + 'clientscript/detection.js' + time+ '\'><\/script>');