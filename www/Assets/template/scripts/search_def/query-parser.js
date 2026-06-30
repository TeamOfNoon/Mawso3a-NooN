// Query parser - RunesService and related classes
var ESNT_AND = 1;
var ESNT_OR = 2;
var ESNT_NOT = 3;
var ESNT_DEFAULT = 4;
var ESNT_PHRASE = 5;

function RunesContext(a_strSrc) {
    this.strSrc = a_strSrc;
    this.nCur = 0;
    this.bFailed = false;
    this.bNot = false;
    this.nWordIndex = 0;

    this.getCurChar = function() {
        return this.strSrc.charAt(this.nCur);
    }
    this.getChar = function(i) {
        return this.strSrc.charAt(i);
    }
    this.reachEnd = function() {
        return this.nCur >= this.strSrc.length;
    }
}

function DolWord(a_strWord, a_nPosition) {
    this.strWord = a_strWord;
    this.nPosition = a_nPosition;
}

function SolNode() {}

function RunesService() {
    this.langSev = new LanguageService();

    this.isOperator = function(a_str, a_nFrom) {
        var strOp = this.getWord(a_str, a_nFrom).toLowerCase();
        if (this.langSev.isOperator(strOp))
            return true;
        return false;
    }

    this.getLengthOfWordBreak = function(a_str, a_nFrom) {
        var i = a_nFrom,
            nLen = a_str.length;
        while (i < nLen && this.langSev.isWordBreak(a_str.charAt(i)))
            i++;
        return i - a_nFrom;
    }

    this.getLengthOfCJKWordBreak = function(a_str, a_nFrom) {
        var i = a_nFrom,
            nLen = a_str.length;
        while (i < nLen && (this.langSev.isWordBreak(a_str.charAt(i)) || this.langSev.isCJKCodePoint(a_str.charAt(i))))
            i++;
        return i - a_nFrom;
    }

    this.getLengthOfWord = function(a_str, a_nFrom) {
        var i = a_nFrom,
            nLen = a_str.length;
        while (i < nLen &&
            !this.langSev.isWordBreak(a_str.charAt(i)) &&
            !this.langSev.isQuote(a_str.charAt(i)))
            ++i;
        return i - a_nFrom;
    }

    this.getNonCJKWord = function(a_str, a_nFrom) {
        var i = a_nFrom,
            nLen = a_str.length;
        while (i < nLen &&
            !this.langSev.isWordBreak(a_str.charAt(i)) &&
            !this.langSev.isCJKCodePoint(a_str.charAt(i)) &&
            !this.langSev.isQuote(a_str.charAt(i)))
            ++i;
        var nLen = i - a_nFrom;
        return a_str.substr(a_nFrom, nLen);
    }

    this.getWord = function(a_str, a_nFrom) {
        var nLen = this.getLengthOfWord(a_str, a_nFrom);
        return a_str.substr(a_nFrom, nLen);
    }

    this.getTerm = function(a_Context, a_Rslt) {
        if (this.langSev.isQuote(a_Context.getCurChar())) {
            a_Context.nCur++;
            var nLen = this.getLengthOfPhrase(a_Context.strSrc, a_Context.nCur);
            if (nLen <= 0)
                return false;
            a_Rslt.eType = ESNT_PHRASE;
            a_Rslt.strTerm = a_Context.strSrc.substr(a_Context.nCur, nLen);
            a_Context.nCur += nLen + 1;
        } else {
            var nLen = this.getLengthOfDefault(a_Context.strSrc, a_Context.nCur);
            if (nLen <= 0)
                return false;
            a_Rslt.eType = ESNT_DEFAULT;
            a_Rslt.strTerm = a_Context.strSrc.substr(a_Context.nCur, nLen);
            a_Context.nCur += nLen;
        }
        return true;
    }

    this.getOperator = function(a_Context, a_Rslt) {
        if (a_Context.reachEnd())
            return false;
        var strOp = this.getWord(a_Context.strSrc, a_Context.nCur).toLowerCase();
        if (this.langSev.isAND(strOp)) {
            a_Rslt.eType = ESNT_AND;
            a_Context.nCur += strOp.length;
        } else if (this.langSev.isOR(strOp)) {
            a_Rslt.eType = ESNT_OR;
            a_Context.nCur += strOp.length;
        } else if (this.langSev.isNOT(strOp)) {
            a_Rslt.eType = ESNT_NOT;
            a_Context.nCur += strOp.length;
        } else {
            a_Rslt.eType = ESNT_OR;
        }
        return true;
    }

    this.getLengthOfPhrase = function(a_str, a_nFrom) {
        var i = a_nFrom,
            nLen = a_str.length;
        while (i < nLen) {
            if (this.langSev.isQuote(a_str.charAt(i)))
                return i - a_nFrom;
            ++i;
        }
        return -1;
    }

    this.getLengthOfDefault = function(a_str, a_nFrom) {
        var i = a_nFrom,
            nLen = a_str.length;
        while (i < nLen &&
            !this.isOperator(a_str, i) &&
            !this.langSev.isQuote(a_str.charAt(i))) {
            i += this.getLengthOfWord(a_str, i);
            i += this.getLengthOfWordBreak(a_str, i);
        }
        return i - a_nFrom;
    }

    this.parseOperator = function(a_Context, a_Result, a_bNotAllowed) {
        a_Context.nCur += this.getLengthOfWordBreak(a_Context.strSrc, a_Context.nCur);
        var rslt = new Object;
        if (!this.getOperator(a_Context, rslt))
            return false;
        if (rslt.eType == ESNT_NOT) {
            if (a_bNotAllowed) {
                if (a_Context.bNOT) {
                    rslt.eType = ESNT_OR;
                } else {
                    a_Context.bNOT = true;
                }
            } else {
                a_Context.bFailed = true;
                return false;
            }
        }
        a_Result.eType = rslt.eType;
        a_Result.right = new SolNode();
        if (!this.parseTerm(a_Context, a_Result.right))
            return false;
        return true;
    }

    this.parseTerm = function(a_Context, a_Result) {
        a_Context.nCur += this.getLengthOfWordBreak(a_Context.strSrc, a_Context.nCur);
        var rslt = new Object;
        if (!this.getTerm(a_Context, rslt)) {
            if ((this.parseOperator(a_Context, rslt, true)) && (rslt.eType == ESNT_NOT)) {
                a_Result.eType = rslt.eType;
                if (rslt.right.eType == ESNT_DEFAULT) {
                    a_Result.strTerm = rslt.right.strTerm;
                    return true;
                } else {
                    a_Context.bFailed = true;
                    return false;
                }
            } else {
                a_Context.bFailed = true;
                return false;
            }
        }
        if (this.parseOperator(a_Context, a_Result, false)) {
            a_Result.left = new SolNode();
            a_Result.left.eType = rslt.eType;
            a_Result.left.strTerm = rslt.strTerm;
        } else {
            a_Result.eType = rslt.eType;
            a_Result.strTerm = rslt.strTerm;
        }
        return true;
    }

    this.extractTerm = function(a_Context, a_Term) {
        a_Term.aWords = new Array();
        this.dolSegment(a_Term);
        if (a_Term.aWords.length == 0)
            return false;
        for (var i = 0; i < a_Term.aWords.length; i++) {
            a_Term.aWords[i].nWordId = a_Term.aWords[i].nPosition + a_Context.nWordIndex;
        }
        a_Context.nWordIndex = a_Term.aWords[a_Term.aWords.length - 1].nWordId + 1;
        return true;
    }

    this.parsePhraseAndDefault = function(a_Context, a_Node) {
        if (a_Node.eType == ESNT_PHRASE || a_Node.eType == ESNT_DEFAULT || a_Node.eType == ESNT_NOT) {
            if (!this.extractTerm(a_Context, a_Node) &&
                a_Node.eType == ESNT_PHRASE)
                a_Context.bFailed = true;
        } else {
            this.parsePhraseAndDefault(a_Context, a_Node.left);
            this.parsePhraseAndDefault(a_Context, a_Node.right);
        }
    }

    this.helStem = function(a_strOrg, a_Result) {
        this.langSev.getNormalizedOrg(a_strOrg, a_Result);
        this.langSev.helStem(a_Result);
    }

    this.parseBreakCharacters = function(a_Term, a_positions) {
        var a_strSrc = a_Term.strTerm;
        var a_Result = a_Term.aWords;
        var nLen = a_strSrc.length;
        var nCur = a_positions["cur"];
        var nPosition = a_positions["pos"];
        var bCJKTerm = false;
        var bCJKBreak = false;
        while (nCur < nLen && (this.langSev.isWordBreak(a_strSrc.charAt(nCur)) || this.langSev.isCJKCodePoint(a_strSrc.charAt(nCur)))) {
            if (this.langSev.isSpecialBreak(a_strSrc.charAt(nCur)) || (bCJKBreak = this.langSev.isCJKCodePoint(a_strSrc.charAt(nCur)))) {
                a_Result[a_Result.length] = new DolWord(a_strSrc.charAt(nCur), nPosition);
                nPosition++;
                if (!bCJKTerm && bCJKBreak)
                    bCJKTerm = true;
            }
            nCur++;
        }
        a_positions["cur"] = nCur;
        a_positions["pos"] = nPosition;
        if (bCJKTerm)
            a_Term.eType = ESNT_PHRASE;
    }

    this.dolSegment = function(a_Term) {
        var a_strSrc = a_Term.strTerm;
        var a_Result = a_Term.aWords;
        var nLen = a_strSrc.length;
        var strWord = "";
        var positions = new Array();
        positions["cur"] = 0;
        positions["pos"] = 1;
        this.parseBreakCharacters(a_Term, positions);
        while (positions["cur"] < nLen) {
            strWord = this.getNonCJKWord(a_strSrc, positions["cur"]);
            a_Result[a_Result.length] = new DolWord(strWord, positions["pos"]);
            positions["cur"] += strWord.length;
            positions["pos"]++;
            this.parseBreakCharacters(a_Term, positions);
        }
    }

    this.solParse = function(a_strSrc, a_Result) {
        var context = new RunesContext(a_strSrc);
        this.parseTerm(context, a_Result);
        if (context.bFailed)
            return false;
        this.parsePhraseAndDefault(context, a_Result);
        if (context.bFailed)
            return false;
        return true;
    }
}

function _helStemNode(a_Runes, a_Node) {
    with(a_Node) {
        if (eType == ESNT_PHRASE || eType == ESNT_DEFAULT || eType == ESNT_NOT) {
            for (var i = 0; i < aWords.length; i++) {
                a_Runes.helStem(aWords[i].strWord, aWords[i]);
            }
        } else {
            _helStemNode(a_Runes, left);
            _helStemNode(a_Runes, right);
        }
    }
}

function parseQueryExpression(a_strQuery) {
    var runes = new RunesService();
    var expression = new SolNode();
    if (!runes.solParse(a_strQuery, expression))
        return null;
    _helStemNode(runes, expression);
    return expression;
}