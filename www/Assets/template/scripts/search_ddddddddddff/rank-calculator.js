// Ranking Calculator
var EWMT_NotMatch = 0;
var EWMT_SynonymMatch = 1;
var EWMT_WordMatch = 2;
var EWMT_ShapeMatch = 3;

var WEIGHT_OF_SHAPE_MATCH = 0.5;
var WEIGHT_OF_SINGLE_WORD_SCORE = 0.5;
var HUGIN_KEYWORD_FLAG = 0x0040;
var HUGIN_TITLE_FLAG = 0x0080;
var WORDSHAPE_SYNONYM = -2;

function _rank_ULaw(a_fX) {
    if (a_fX < 0.0)
        return 0.0;
    return 1.0 - 1.0 / (a_fX + 1.0);
}

function _rank_Weaken(a_fWeight, a_fPercent) {
    var fPercent = (a_fPercent < 0.0) ? 0.0 :
        (a_fPercent > 1.0) ? 1.0 : a_fPercent;
    return 1 - fPercent + a_fWeight * fPercent;
}

function _isKeyWord(a_uEmphasis) {
    return (a_uEmphasis & HUGIN_KEYWORD_FLAG) != 0;
}

function _isTitle(a_uEmphasis) {
    return (a_uEmphasis & HUGIN_TITLE_FLAG) != 0;
}

function _isUpperCaseShape(a_nWordShape) {
    return a_nWordShape % 2 != 0;
}

function _emphasisToScore(a_uEmphasis) {
    var nScore = 0;
    for (var i = 5, nInc = 2; i >= 0; i--, nInc *= 2)
        nScore += nInc * ((a_uEmphasis >> i) & 1);
    return nScore;
}

function _getWordMatchType(a_Word, a_Tile, a_nPosition, a_nOffset) {
    var eRslt = EWMT_NotMatch;
    if (a_nPosition - a_nOffset != a_Word.nWordId)
        return eRslt;
    for (var i = 0; i < a_Tile.aWords.length; i++) {
        var eCur = EWMT_NotMatch;
        if (a_Tile.aWords[i].nWordId == a_Word.nWordId) {
            if (a_Tile.aWords[i].nWordForm == WORDSHAPE_SYNONYM)
                eCur = EWMT_SynonymMatch;
            else {
                if (_isUpperCaseShape(a_Word.nWordShape)) {
                    if (a_Word.nWordShape == a_Tile.aWords[i].nWordForm)
                        eCur = EWMT_ShapeMatch;
                    else
                        eCur = EWMT_NotMatch;
                } else {
                    if (a_Word.nWordShape == a_Tile.aWords[i].nWordForm ||
                        a_Word.nWordShape == a_Tile.aWords[i].nWordForm - 1)
                        eCur = EWMT_ShapeMatch;
                    else
                        eCur = EWMT_WordMatch;
                }
            }
        }
        if (eRslt < eCur)
            eRslt = eCur;
    }
    return eRslt;
}

function _getTermMatchType(a_aTiles, a_nTileFrom, a_aWords, a_nFrom, a_nLen) {
    var eRslt = EWMT_ShapeMatch;
    if (a_nFrom < 0 || a_nLen <= 0 || a_aWords.length < a_nFrom + a_nLen)
        return EWMT_NotMatch;
    var nOffset = a_nTileFrom;
    var j = a_nTileFrom;
    for (var i = a_nFrom; i < a_nFrom + a_nLen; i++) {
        nOffset = nOffset - a_aWords[i].nWordId;
        j = nOffset + a_aWords[i].nWordId;
        if (!a_aTiles[j])
            return EWMT_NotMatch;
        var eCur = _getWordMatchType(a_aWords[i], a_aTiles[j], j, nOffset);
        if (eCur < eRslt)
            eRslt = eCur;
        if (eRslt == EWMT_NotMatch)
            return eRslt;
        nOffset = nOffset + a_aWords[i].strWord.length + a_aWords[i].nWordId;
    }
    return eRslt;
}

function _matchTypeToScore(a_eMatchType) {
    switch (a_eMatchType) {
        case EWMT_NotMatch:
            return 0;
        case EWMT_SynonymMatch:
            return 1;
        case EWMT_WordMatch:
            return 2;
        case EWMT_ShapeMatch:
            return 4;
        default:
            return 0;
    }
}

function _computeSingleWordScore(a_TopicImage, a_nWordId) {
    if (!a_TopicImage.aWords[a_nWordId])
        return 0.0;
    var emphasis = a_TopicImage.aWords[a_nWordId].uEmphasis;
    if (emphasis != 0)
        emphasis = _emphasisToScore(emphasis);
    emphasis += a_TopicImage.aWords[a_nWordId].uFreq;
    var fWeightScore = _rank_Weaken(_rank_ULaw(emphasis), WEIGHT_OF_SINGLE_WORD_SCORE);
    if (_isTitle(a_TopicImage.aWords[a_nWordId].uEmphasis)) {
        return fWeightScore / 3.0 + 2.0 / 3.0;
    }
    if (_isKeyWord(a_TopicImage.aWords[a_nWordId].uEmphasis)) {
        return fWeightScore / 3.0 + 1.0 / 3.0;
    } else {
        return fWeightScore / 3.0;
    }
}

function _computeTermWeight(a_TopicImage, a_Term) {
    var nTermLen = a_Term.aWords.length;
    if (nTermLen == 0)
        return -1.0;
    var fTermScore = 0.0;
    for (i = 0; i < nTermLen; i++)
        fTermScore += _computeSingleWordScore(a_TopicImage, a_Term.aWords[i].nWordId);
    if (a_Term.eType == ESNT_PHRASE) {
        var bPhrase = false;
        var iPosition = 0;
        for (var strPosition in a_TopicImage.aTiles) {
            iPosition = parseInt(strPosition);
            bPhrase = _getPhraseMatch(a_TopicImage.aTiles, iPosition, a_Term.aWords, 0);
            if (bPhrase)
                break;
        }
        if (bPhrase)
            return fTermScore;
        else
            return 0.0;
    } else {
        return fTermScore;
    }
}

function _getPhraseMatch(a_aTiles, iPosition, a_aWords, a_nCurIdx) {
    var nOffset = iPosition;
    if (a_nCurIdx >= a_aWords.length)
        return false;
    if (iPosition >= a_aTiles.length)
        return false;
    var nCurWordId = a_aWords[a_nCurIdx].nWordId;
    if (!a_aTiles[iPosition])
        return false;
    var i;
    for (i = 0; i < a_aTiles[iPosition].aWords.length; i++) {
        var wordAtPos = a_aTiles[iPosition].aWords[i].nWordId;
        if (wordAtPos == nCurWordId) {
            if (a_nCurIdx == (a_aWords.length - 1)) {
                return true;
            } else {
                var wordLen = a_aWords[a_nCurIdx].strWord.length;
                return _getPhraseMatch(a_aTiles, iPosition + wordLen, a_aWords, a_nCurIdx + 1);
            }
        }
    }
    return false;
}

function _removeNegativeWeight(a_fWeight, a_eOpType) {
    if (a_fWeight >= 0.0)
        return a_fWeight;
    switch (a_eOpType) {
        case ESNT_OR:
            return 0.0;
        case ESNT_AND:
            return 1.0;
        case ESNT_NOT:
            return 0.0;
    }
    return 0.0;
}

function _getWeightOfNode(a_TopicImage, a_Node) {
    if (a_Node == null)
        return 0.0;
    if (a_Node.eType == ESNT_DEFAULT || a_Node.eType == ESNT_PHRASE || a_Node.eType == ESNT_NOT) {
        return _computeTermWeight(a_TopicImage, a_Node);
    } else {
        var fWeightRight = _getWeightOfNode(a_TopicImage, a_Node.right) / 2.0;
        var fWeightLeft = _getWeightOfNode(a_TopicImage, a_Node.left);
        if (fWeightRight < 0.0 && fWeightLeft < 0.0)
            return -1.0;
        fWeightRight = _removeNegativeWeight(fWeightRight, a_Node.eType);
        fWeightLeft = _removeNegativeWeight(fWeightLeft, a_Node.eType);
        switch (a_Node.eType) {
            case ESNT_OR:
                return (fWeightLeft + fWeightRight) / 2.0;
            case ESNT_AND:
                return (fWeightLeft * fWeightRight);
            case ESNT_NOT:
                fWeightRight = (fWeightRight == 0.0) ? 1.0 : 0.0;
                return fWeightLeft * fWeightRight;
        }
        return 0.0;
    }
}

function calculateRanking(a_TopicImage, a_Expression) {
    return _getWeightOfNode(a_TopicImage, a_Expression);
}