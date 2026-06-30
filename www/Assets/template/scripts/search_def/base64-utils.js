// Base64 utilities
var XX = 127;
var s_strBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var s_aAsciiToBase64 = new Array(
    XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX,
    XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX,
    XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, 62, XX, XX, XX, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, XX, XX, XX, XX, XX, XX,
    XX, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, XX, XX, XX, XX, XX,
    XX, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, XX, XX, XX, XX, XX
);
var s_aOdinToAscii = new Array(
    '\0', '0', '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '|', ':', ',', '\0', '\0'
);
var s_aBase64DecodeMap = new Array();

function _decordBase64ToStr(a_nA, a_nB) {
    var uBuf = (s_aAsciiToBase64[a_nA] << 6) + s_aAsciiToBase64[a_nB];
    var strRslt = "";
    var uCur = 0;
    for (var i = 0; i <= 8; i += 4) {
        uCur = uBuf >> (8 - i) & 0x000F;
        if (uCur == 0)
            return strRslt;
        strRslt += s_aOdinToAscii[uCur];
    }
    return strRslt;
}

function decodeBase64ToOdin(a_strBase64) {
    var nLen = a_strBase64.length;
    var strRslt = "";
    var str = 0;
    for (var i = 0; i + 1 < nLen; i += 2) {
        str = s_aBase64DecodeMap[(a_strBase64.charCodeAt(i) << 8) + a_strBase64.charCodeAt(i + 1)];
        if (!str) return strRslt;
        strRslt += str;
    }
    if (i < nLen) {
        str = s_aBase64DecodeMap[(a_strBase64.charCodeAt(i) << 8) + s_strBase64.charCodeAt(0)];
        if (!str) return strRslt;
        strRslt += str;
    }
    return strRslt;
}

function initBase64DecodeMap() {
    var i, j;
    for (i = 0; i < 64; i++)
        for (j = 0; j < 64; j++)
            s_aBase64DecodeMap[(s_strBase64.charCodeAt(i) << 8) + s_strBase64.charCodeAt(j)] = _decordBase64ToStr(s_strBase64.charCodeAt(i), s_strBase64.charCodeAt(j));
    for (i = 0; i < 64; i++)
        s_aBase64DecodeMap[s_strBase64.charCodeAt(i) << 8] = _decordBase64ToStr(s_strBase64.charCodeAt(i), s_strBase64.charCodeAt(0));
}
initBase64DecodeMap();