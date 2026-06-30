// String utilities
function splitPathName(a_strPath) {
    var rslt = new Object();
    rslt.strDir = "";
    rslt.strFile = "";
    rslt.strExt = "";
    var rg1 = /^(.*[\\\/])?([^\\\/]+)(\.[^\\\/\.]*)$/;
    var rg2 = /^(.*[\\\/])?([^\\\/.]+)$/;
    var v = a_strPath.match(rg1);
    if (v != null) {
        rslt.strDir = v[1];
        rslt.strFile = v[2];
        rslt.strExt = v[3];
    } else {
        v = a_strPath.match(rg2);
        rslt.strDir = v[1];
        rslt.strFile = v[2];
        rslt.strExt = "";
    }
    return rslt;
}

function getAbsPath(a_strBasePath, a_strRelPath) {
    var sf = splitPathName(a_strBasePath);
    return sf.strDir + a_strRelPath;
}

function utf8Compare(strText1, strText2) {
    var strt1 = strText1;
    var strt2 = strText2;
    try {
        strt1 = strText1.toLowerCase();
    } catch (er) {}
    try {
        strt2 = strText2.toLowerCase();
    } catch (er) {}
    if (strt1 < strt2) return -1;
    if (strt1 > strt2) return 1;
    return 0;
}