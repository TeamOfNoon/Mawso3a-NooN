// XML Reader - Modified to support range/pagination
var theXmlReader = new XmlReader();

function XmlNode() {
    this.strTagName = null;
    this.aAttrs = new Array();
}

function XmlData() {
    this.strFilePath = null;
    this.strRoot = null;
    this.aNodes = new Array();
}


function updateSearchPageSize() {
	
	//console.log(window.search_per_page+"hhhh");
    theXmlReader.nPageSize = window.search_per_page;
    theXmlReader.nMaxResults = window.search_per_page * 2;
}






function XmlReader() {
    this.strFilePath = null;
    this.funcCallback = null;
    this.bSucceed = false;
    this.xmlDoc = null;
    this.aCache = new Array();
    this.bCache = false;
    this.curData = null;
	console.log(window.search_per_page);
    this.nMaxResults = (window.search_per_page)*2;
    this.nStartIndex = 0; // Starting index for pagination
    this.nPageSize = window.search_per_page; // Results per page

    this.loadFromCache = function() {
	
        for (var i = 0; i < this.aCache.length; i++) {
            if (this.aCache[i].strFilePath == this.strFilePath) {
                this.curData = this.aCache[i];
                return true;
            }
        }
        return false;
    }

    this.loadFromFile = function(a_Context, a_funcCallback, a_bCache) {
        this.bSucc = false;
        this.funcCallback = a_funcCallback;
        this.bCache = (a_bCache == true) ? true : false;
        if (this.loadFromCache()) {
            this.funcCallback();
            return;
        }
        var sCurrentDocPath = _getPath(document.location.href);
        var sdocPath = _getFullPath(sCurrentDocPath, this.strFilePath);
        var fileName = _getRelativeFileName(sCurrentDocPath, sdocPath);

        a_Context.pause();
        xmlJsReader.loadFile(fileName, function(a_xmlDoc, args) {
            if (a_xmlDoc != null)
                putDataXML(a_xmlDoc, sdocPath);
            else {
                onLoadXMLError();
            }
            setTimeout("context.resume()", 1);
        });
    }

    this.receiveDom = function(a_XmlDoc) {
        this.curData = null;
        if (a_XmlDoc.documentElement == null)
            return;
        this.curData = new XmlData();
        this.curData.strFilePath = this.strFilePath;
        with(a_XmlDoc.documentElement) {
            this.curData.strRoot = tagName;
            for (var i = 0; i < childNodes.length; i++) {
                with(a_XmlDoc.documentElement.childNodes.item(i)) {
                    if (nodeType == 3)
                        continue;
                    var nLen = this.curData.aNodes.length;
                    this.curData.aNodes[nLen] = new XmlNode();
                    this.curData.aNodes[nLen].strTagName = tagName;
                    for (var j = 0; j < attributes.length; j++) {
                        this.curData.aNodes[nLen].aAttrs[attributes.item(j).name] = attributes.item(j).value;
                    }
                }
            }
        }
        if (this.bCache) {
            this.aCache[this.aCache.length] = this.curData;
        }
    }

    this.getNumOfNodes = function() {
        return this.curData.aNodes.length;
    }

    this.getNumOfTopics = function(i) {
        with(this.curData) {
            if (i < aNodes.length) {
                var num;
                try {
                    num = parseInt(aNodes[i].aAttrs["num"]);
                } catch (e) {
                    return 0;
                }
                return num;
            } else
                return 0;
        }
    }

    this.checkRoot = function(a_strRootName) {
        return this.curData.strRoot == a_strRootName;
    }

    this.getSynonyms = function(a_strQuery) {
        if (gsSubstrSrch) {
            var synonyms = "";
            with(this.curData) {
                for (var i = 0; i < aNodes.length; i++) {
                    if (aNodes[i].aAttrs["nm"].indexOf(a_strQuery) != -1)
                        synonyms += "," + aNodes[i].aAttrs["sy"];
                }
            }
            return synonyms;
        } else {
            return this.getAttr("wd", "nm", a_strQuery, "sy");
        }
    }

    // NEW: Get topics in a range (start to end)
    this.getRangeTopics = function(a_strRecord, a_nStart, a_nEnd) {
        if (!a_strRecord || a_strRecord == "")
            return "";
        
        var aTopics = a_strRecord.split("|");
        var aRangeTopics = new Array();
        
        var nStart = Math.max(0, a_nStart);
        var nEnd = Math.min(aTopics.length, a_nEnd);
        
        for (var i = nStart; i < nEnd; i++) {
            aRangeTopics[aRangeTopics.length] = aTopics[i];
        }
        
        return aRangeTopics.join("|");
    }

    // NEW: Get paginated results
    this.getPaginatedTopics = function(a_strRecord, a_nPageNumber) {
        if (!a_strRecord || a_strRecord == "")
            return "";
        
        var aTopics = a_strRecord.split("|");
        var nStart = a_nPageNumber * this.nPageSize;
        var nEnd = Math.min(nStart + this.nPageSize, aTopics.length);
        
        if (nStart >= aTopics.length) {
            return "";
        }
        
        var aPageTopics = new Array();
        for (var i = nStart; i < nEnd; i++) {
            aPageTopics[aPageTopics.length] = aTopics[i];
        }
        
        return aPageTopics.join("|");
    }









    this.getWordRec = function(a_strQuery, bPhraseSearch) {
        var begin = 0;
        var end = this.curData.aNodes.length;
        var mid = Math.floor((end - begin) / 2);
        while (mid > 0) {
            mid = mid + begin;
            var term = this.curData.aNodes[mid].aAttrs["nm"];
            if (a_strQuery < term)
                end = mid;
            else if (a_strQuery > term)
                begin = mid;
            else
                break;
            mid = Math.floor((end - begin) / 2);
        }
        if (((end - begin) == 1) && (!this.matchPrefix(a_strQuery, this.curData.aNodes[mid].aAttrs["nm"]))) {
            mid = end;
        }
        if (mid < this.curData.aNodes.length) {
            if (!bPhraseSearch && gsSubstrSrch) {
                var arrTopicRecs = new Array();
                while (mid < this.curData.aNodes.length) {
                    if (this.curData.aNodes[mid].aAttrs["sp"]) {
                        mid++;
                        continue;
                    } else if (this.matchPrefix(a_strQuery, this.curData.aNodes[mid].aAttrs["nm"])) {
                        arrTopicRecs[arrTopicRecs.length] = this.curData.aNodes[mid].aAttrs["rd"];
                        mid++;
                    } else
                        break;
                }
                if (arrTopicRecs.length == 0)
                    return "";
                var mergedRec = arrTopicRecs[0];
                for (var i = 1; i < arrTopicRecs.length; i++) {
                    mergedRec = mergeTopicRec(mergedRec, arrTopicRecs[i]);
                }
                return mergedRec;
            } else {
                if ((this.curData.aNodes[mid].aAttrs["nm"]) == a_strQuery) {
                    if (bPhraseSearch || gsSubstrSrch)
                        return this.curData.aNodes[mid].aAttrs["rd"];
                    else {
                        if (this.curData.aNodes[mid].aAttrs["sp"])
                            return "";
                        else
                            return this.curData.aNodes[mid].aAttrs["rd"];
                    }
                } else
                    return "";
            }
        }
    }








  // NEW: Get next page
    this.getNextPage = function()
{
    this.nStartIndex += this.nPageSize;

    return this.getRangeTopics(
        this.lastRankedRecord,
        this.nStartIndex,
        this.nStartIndex + this.nMaxResults
    );
}

this.getPreviousPage = function()
{
    this.nStartIndex = Math.max(0, this.nStartIndex - this.nPageSize);

    return this.getRangeTopics(
        this.lastRankedRecord,
        this.nStartIndex,
        this.nStartIndex + this.nMaxResults
    );
}

    this.goToPage = function(a_nPageNumber)
{
    this.nStartIndex = a_nPageNumber * this.nPageSize;

    return this.getRangeTopics(
        this.lastRankedRecord,
        this.nStartIndex,
        this.nStartIndex + this.nMaxResults
    );
}

    // NEW: Get total number of topics in record
    this.getTotalTopics = function(a_strRecord) {
        if (!a_strRecord || a_strRecord == "")
            return 0;
        return a_strRecord.split("|").length;
    }

    // NEW: Get total pages
    this.getTotalPages = function(a_strRecord) {
        var nTotal = this.getTotalTopics(a_strRecord);
        if (nTotal === 0) return 0;
        return Math.ceil(nTotal / this.nPageSize);
    }

    this.getTopicRec = function(a_nTopicId) {
        if ((a_nTopicId >= 0) && (a_nTopicId < this.curData.aNodes.length)) {
            var objResult = new Object();
            objResult.rd = this.curData.aNodes[a_nTopicId].aAttrs["rd"];
            objResult.ct = this.curData.aNodes[a_nTopicId].aAttrs["ct"];
            return objResult;
        } else
            return null;
    }

    this.getPackageIndex = function(a_strQuery) {
        var begin = 0;
        var end = this.curData.aNodes.length - 1;
        var mid;
        while (begin <= end) {
            mid = Math.floor((begin + end) / 2);
            var startWord = this.curData.aNodes[mid].aAttrs["fm"];
            var endWord = this.curData.aNodes[mid].aAttrs["to"];
            if (end == begin) {
                if ((a_strQuery >= startWord) && (a_strQuery <= endWord))
                    return mid;
                else
                    return -1;
            }
            if (a_strQuery < startWord)
                end = mid - 1;
            else if (a_strQuery > endWord)
                begin = mid + 1;
            else
                return mid;
        }
        return -1;
    }

    this.matchPrefix = function(a_strQuery, a_strTerm) {
        if (a_strQuery.length > a_strTerm.length)
            return false;
        var bPrefix = true;
        var i;
        for (i = 0; i < a_strQuery.length; i++) {
            if (a_strQuery.charAt(i) != a_strTerm.charAt(i)) {
                bPrefix = false;
                break;
            }
        }
        return bPrefix;
    }

    this.getAttr = function(a_strTagName) {
        var nArgsNum = this.getAttr.arguments.length;
        if (nArgsNum < 2 || nArgsNum % 2 != 0)
            return "";
        with(this.curData) {
            for (var i = 0; i < aNodes.length; i++) {
                if (utf8Compare(aNodes[i].strTagName, a_strTagName) != 0)
                    continue;
                for (var j = 1; j + 1 < nArgsNum - 1; j += 2) {
                    if (utf8Compare(aNodes[i].aAttrs[this.getAttr.arguments[j]], this.getAttr.arguments[j + 1]) != 0)
                        break;
                }
                if (j + 1 < nArgsNum - 1)
                    continue;
                if (aNodes[i].aAttrs[this.getAttr.arguments[j]])
                    return aNodes[i].aAttrs[this.getAttr.arguments[j]];
                else
                    continue;
            }
            return "";
        }
    }

    this.checkAttr = function(a_strTagName) {
        var nArgsNum = this.checkAttr.arguments.length;
        if (nArgsNum < 1 || nArgsNum % 2 == 0)
            return false;
        with(this.curData) {
            for (var i = 0; i < aNodes.length; i++) {
                if (utf8Compare(aNodes[i].strTagName, a_strTagName) != 0)
                    continue;
                for (var j = 1; j < nArgsNum - 1; j += 2) {
                    if (utf8Compare(aNodes[i].aAttrs[this.checkAttr.arguments[j]], this.checkAttr.arguments[j + 1]) != 0)
                        break;
                }
                if (j < nArgsNum - 1)
                    continue;
                return true;
            }
            return false;
        }
    }
}

function putDataXML(xmlDoc, sdocPath) {
    if (g_bServerResult == true) {
        g_bServerResult = false;
        var cRoot = xmlDoc.lastChild;
        var cResult = new HuginQueryResult();
        var nIndex = 1;
        if (cRoot) {
            var cNode = cRoot.firstChild;
            while (cNode) {
                if (cNode.nodeName == "topic") {
                    var cTopic = new Object();
                    cTopic.nIndex = nIndex;
                    cTopic.strTitle = cNode.getAttribute("name");
                    cTopic.strUrl = cNode.getAttribute("url");
                    cTopic.strSummary = cNode.getAttribute("summary");
                    cTopic.nRank = cNode.getAttribute("rank");
                    cResult.aTopics[cResult.aTopics.length] = cTopic;
                };
                cNode = cNode.nextSibling;
                nIndex = nIndex + 1;
            };
        };
        displayTopics(cResult);
    } else {
        theXmlReader.receiveDom(xmlDoc);
        theXmlReader.bSucc = true;
    }
}

function onLoadXMLError() {
    if (window.gbTesting)
        return;
    theXmlReader.bSucc = false;
}

function mergeTopicRec(a_strParentRec, a_strNewRec) {
    var arrOldRecords = a_strParentRec.split("|");
    var arrNewRecords = a_strNewRec.split("|");
    var mergedRec = "";
    var i = 0;
    var j = 0;
    var arrFinalRec = new Array();
    while (i < arrOldRecords.length && j < arrNewRecords.length) {
        var oldTopicRecord = getTopicDetails(arrOldRecords[i]);
        if (oldTopicRecord == null) {
            i++;
            continue;
        }
        var newTopicRecord = getTopicDetails(arrNewRecords[j]);
        if (newTopicRecord == null) {
            j++;
            continue;
        }
        if (oldTopicRecord.nTopicId < newTopicRecord.nTopicId) {
            arrFinalRec[arrFinalRec.length] = arrOldRecords[i];
            i++;
        } else if (oldTopicRecord.nTopicId > newTopicRecord.nTopicId) {
            arrFinalRec[arrFinalRec.length] = arrNewRecords[j];
            j++;
        } else {
            var temp = arrOldRecords[i].split(":");
            var uEmphasis = (oldTopicRecord.uEmphasis > newTopicRecord.uEmphasis) ? oldTopicRecord.uEmphasis : newTopicRecord.uEmphasis;
            var strRec = oldTopicRecord.nTopicId + "," + uEmphasis + ":" + temp[1];
            arrFinalRec[arrFinalRec.length] = strRec;
            j++;
            i++;
        }
    }
    while (i < arrOldRecords.length) {
        arrFinalRec[arrFinalRec.length] = arrOldRecords[i];
        i++;
    }
    while (j < arrNewRecords.length) {
        arrFinalRec[arrFinalRec.length] = arrNewRecords[j];
        j++;
    }
    if (arrFinalRec.length == 0)
        return a_strParentRec;
    mergedRec = arrFinalRec[0];
    for (i = 1; i < arrFinalRec.length; i++)
        mergedRec += "|" + arrFinalRec[i];
    return mergedRec;
}


function rankTopicRecord(rd)
{
    if (!rd)
        return "";

    if (typeof rd != "string")
    {
        if (rd.join)
            rd = rd.join("|");
        else
            rd = String(rd);
    }

    var arr = rd.split("|");
    var ranked = [];

    for (var i = 0; i < arr.length; i++)
    {
        var rec = arr[i];

        var occ = 0;
        var p = rec.split(":");

        if (p.length > 1 && p[1])
            occ = p[1].split(",").length;

        ranked.push({
            rd: rec,
            occ: occ,
            order: i
        });
    }

    ranked.sort(function(a, b)
    {
        if (b.occ != a.occ)
            return b.occ - a.occ;

        return a.order - b.order;
    });

    arr = [];

    for (i = 0; i < ranked.length; i++)
        arr.push(ranked[i].rd);

    return arr.join("|");
}


function getTopicDetails(a_strRecord) {
    var index = a_strRecord.indexOf(",");
    if (index == -1)
        return null;
    var nTopicId = a_strRecord.substring(0, index);
    var strTopicDetails = a_strRecord.substring(index + 1, a_strRecord.length);
    var aShapes = strTopicDetails.split(":");
    if (aShapes.length == 0)
        return null;
    var record = new Object();
    record.nTopicId = nTopicId;
    record.uEmphasis = parseInt(aShapes[0]);
    return record;
}

// Global functions for pagination control
function setMaxResults(nMax) {
    if (nMax > 0) {
        theXmlReader.nMaxResults = nMax;
    }
}

function setPageSize(nSize) {
    if (nSize > 0) {
        theXmlReader.nPageSize = nSize;
    }
}

function setStartIndex(nStart) {
    if (nStart >= 0) {
        theXmlReader.nStartIndex = nStart;
    }
}

function getNextPage() {
    return theXmlReader.getNextPage();
}

function getPreviousPage() {
    return theXmlReader.getPreviousPage();
}

function goToPage(a_nPageNumber) {
    return theXmlReader.goToPage(a_nPageNumber);
}

function getTotalPages() {
    return theXmlReader.getTotalPages();
}