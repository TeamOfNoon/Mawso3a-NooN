// LanguageService class
function LanguageService() {
    this.getNormalizedOrg = function(a_strOrg, a_Result) {
        var strUpper = a_strOrg.toUpperCase();
        var strLower = a_strOrg.toLowerCase();

        if (utf8Compare(strUpper, strLower) == 0 || utf8Compare(strUpper, a_strOrg) != 0) {
            a_Result.strNormalizedOrg = strLower;
            a_Result.bUpperCase = false;
        } else {
            a_Result.strNormalizedOrg = strUpper;
            a_Result.bUpperCase = true;
        }
    }
    this.stemWith = function(a_strWord, a_strSuffix) {
        var s = a_strSuffix.split(",");
        var strSuffix = s[0];
        var bRemoveOnly = (s[1] == '1');

        var ss = a_strWord.match("^..+" + strSuffix + "$");
        if (ss == null)
            return null;

        var nLenRest = a_strWord.length - strSuffix.length;
        var bAddE = false;
        if (!bRemoveOnly) {
            if (!this.isVowel(a_strWord.charAt(nLenRest - 1))) {
                if (a_strWord.charAt(nLenRest - 1) == a_strWord.charAt(nLenRest - 2))
                    nLenRest--;
                else
                    bAddE = true;
            }
        }

        var strStem = a_strWord.substr(0, nLenRest);

        if (strStem.length < 2 || ((strStem.length == 2) && !bAddE))
            return null;

        return strStem;
    }
    this.helStem = function(a_Result) {
        var strWord = a_Result.strNormalizedOrg.toLowerCase();

        var nSuffixNum = g_RunesHelSuffixes.length;
        var nStemFound = 0;
        var strStem = null;
        for (var i = 0; i < nSuffixNum; i++) {
            strStem = this.stemWith(strWord, g_RunesHelSuffixes[i]);
            if (strStem != null) {
                nStemFound = i + 1;
                break;
            }
        }
        if (strStem == null)
            strStem = strWord;

        a_Result.strHelStem = strStem;
        a_Result.nHelWordShape = a_Result.bUpperCase ? nStemFound * 2 + 1 : nStemFound * 2;
    }
    this.isVowel = function(a_ch) {
        return g_RunesVowels.indexOf(a_ch) >= 0;
    }
    this.isWordBreak = function(a_ch) {
        return (!this.isQuote(a_ch) && g_RunesWordBreaks.indexOf(a_ch) >= 0);
    }
    this.isWhiteSpace = function(a_ch) {
        return (g_RunesWhiteSpaces.indexOf(a_ch) >= 0);
    }
    this.isSpecialBreak = function(a_ch) {
        return (g_RunesSpecialBreaks.indexOf(a_ch) >= 0);
    }
    this.isCJKCodePoint = function(a_ch) {
        if ((typeof(a_ch) == "undefined") || (a_ch == ""))
            return false;
        var val = a_ch.charCodeAt(0);
        return (((0x2E80 <= val) && (val <= 0x9FFF)) ||
            ((0xF900 <= val) && (val <= 0xFAFF)) ||
            ((0xFE30 <= val) && (val <= 0xFE4F)) ||
            ((0xFF00 <= val) && (val <= 0xFFEF)));
    }
    this.isQuote = function(a_ch) {
        return (a_ch == g_RunesQuote);
    }
    this.isAND = function(a_strOp) { return (a_strOp == "and"); }
    this.isOR = function(a_strOp) { return (a_strOp == "or"); }
    this.isNOT = function(a_strOp) { return (a_strOp == "not"); }
    this.isOperator = function(strOp) {
        if (strOp == "and" ||
            strOp == "or" ||
            strOp == "not")
            return true;
    }
}