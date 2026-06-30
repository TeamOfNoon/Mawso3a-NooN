// HuginDatabase
function HuginDatabase() {
    this.strOdbPath = "";
    this.queryWord = null;
    this.bNeedStopWord = false;
    this.recordResult = null;
    this.eType = null;
    this.aQueryTopics = null;
    this.bSucc = false;
    this.bInited = false;
    this.strTopicTablePath = null;
    this.strPackageIndexPath = null;
    this.strSynonymPath = null;
    this.packageInfo = null;
    this.iCurTopic = null;
    this.packageIndexReader = new HuginPackageIndexReader();
    this.packageReader = new HuginPackageReader();
    this.topicReader = new HuginTopicTableReader();

    this.prepareQuery = function() {
        this.recordResult = null;
        this.bSucc = true;
        this.packageInfo = null;
        this.iCurTopic = 0;
        this.packageIndexReader.prepareQuery();
        this.packageReader.prepareQuery();
        this.topicReader.prepareQuery();
        this.eType = ESNT_DEFAULT;
    }

    this.getIndexUrl = function(a_strIndexType) {
        var strRelPath = theXmlReader.getAttr("index", "type", a_strIndexType, "url");
        if (strRelPath == "")
            return "";
        return getAbsPath(this.strOdbPath, strRelPath);
    }

    this.readOdbInfo = function(a_Context, a_this) {
        if (!theXmlReader.bSucc ||
            !theXmlReader.checkRoot("odb")) {
            a_this.bSucc = false;
            a_this.bInited = false;
            return;
        }
        a_this.strTopicTablePath = a_this.getIndexUrl("TopicIndex");
        a_this.strPackageIndexPath = a_this.getIndexUrl("PackageIndex");
        a_this.strSynonymPath = a_this.getIndexUrl("Synonym");
        if (a_this.strTopicTablePath == "" || a_this.strPackageIndexPath == "" || a_this.strSynonymPath == "") {
            a_this.bSucc = false;
            a_this.bInited = false;
            return;
        } else {
            a_this.bSucc = true;
            a_this.bInited = true;
        }
    }

    this.loadFromFile = function(a_Context, a_this, a_funcCallback) {
        theXmlReader.loadFromFile(a_Context, a_funcCallback);
    }

    this.queryRecordInPackage = function(a_Context, a_this) {
        if (!a_this.packageIndexReader.bSucc)
            return;
        a_this.packageInfo = a_this.packageIndexReader.packageInfo;
        a_this.packageReader.strPackagePath = a_this.packageInfo;
        a_this.packageReader.strSynonymPath = a_this.strSynonymPath;
        a_this.packageReader.bPhraseSearch = (a_this.eType == ESNT_PHRASE);
        if (gsSubstrSrch)
            a_this.packageReader.strQueryWord = a_this.queryWord.strNormalizedOrg;
        else
            a_this.packageReader.strQueryWord = a_this.queryWord.strHelStem;
        a_Context.push(a_this.packageReader.query, a_this.packageReader);
    }

    this.makeResult = function(a_Context, a_this) {
        if (!a_this.packageIndexReader.bSucc ||
            !a_this.packageReader.bSucc) {
            a_this.bSucc = false;
        }
        a_this.recordResult = a_this.packageReader.recordResult;
        if (a_this.eType == ESNT_NOT) {
            if ((typeof(a_this.recordResult) == 'undefined') || (a_this.recordResult == null)) {
                a_this.bSucc = true;
                a_this.recordResult = a_this.makeDummyResultRec(a_this.queryWord.strNormalizedOrg, a_this.queryWord.strHelStem);
            }
            theXmlReader.strFilePath = a_this.strTopicTablePath;
            a_Context.push(a_this.loadFromFile, a_this,
                a_this.makeNotResult, a_this);
        }
    }

    this.makeDummyResultRec = function(strOrg, strStem) {
        var recordResult = new Object();
        recordResult.strRecord = "";
        recordResult.strNefStem = strStem;
        recordResult.bStopWord = false;
        return recordResult;
    }

    this.makeNotResult = function(a_Context, a_this) {
        var topicRecs = a_this.recordResult.strRecord.split("|");
        var bIncludeAll = (a_this.recordResult.strRecord == "");
        var arrTopicIds = new Array();
        var j;
        for (j = 0; j < topicRecs.length; j++) {
            var pos = topicRecs[j].indexOf(",");
            if (pos != -1)
                arrTopicIds[arrTopicIds.length] = topicRecs[j].substring(0, pos);
        }
        var bCheck = false;
        if (arrTopicIds.length > 0)
            bCheck = true;
        var curIndex = 0;
        var sDummyTopicRec = ",192:0,0,10";
        var i = 0;
        var numTopics = 0;
        for (var k = 0; k < theXmlReader.getNumOfNodes(); k++) {
            numTopics += theXmlReader.getNumOfTopics(k);
        }
        a_this.recordResult.strRecord = '';
        while (i < numTopics) {
            var bIncludeTopic = true;
            if (bCheck && (curIndex < arrTopicIds.length) && (arrTopicIds[curIndex] == i) && (!bIncludeAll)) {
                curIndex++;
                bIncludeTopic = false;
            }
            if (bIncludeTopic) {
                a_this.bSucc = true;
                var topicRec = i + sDummyTopicRec;
                if (a_this.recordResult.strRecord == '')
                    a_this.recordResult.strRecord = topicRec;
                else
                    a_this.recordResult.strRecord += "|" + topicRec;
            }
            i++;
        }
    }

    this.init = function(a_Context, a_this) {
        theXmlReader.strFilePath = a_this.strOdbPath;
        a_Context.push(a_this.loadFromFile, a_this,
            a_this.readOdbInfo, a_this);
    }

    this.queryRecord = function(a_Context, a_this) {
        if (!a_this.bInited) {
            a_this.bSucc = false;
            return;
        }
        a_this.bSucc = true;
        a_this.packageIndexReader.strPackageIndexPath = a_this.strPackageIndexPath;
        if (gsSubstrSrch)
            a_this.packageIndexReader.strCurQuery = a_this.queryWord.strNormalizedOrg;
        else
            a_this.packageIndexReader.strCurQuery = a_this.queryWord.strHelStem;
        a_Context.push(a_this.packageIndexReader.queryPackageInfo, a_this.packageIndexReader,
            a_this.queryRecordInPackage, a_this,
            a_this.makeResult, a_this);
    }

    this.processTopicInfo = function(a_Context, a_this) {
        if (!a_this.topicReader.bSucc) {
            a_this.bSucc = false;
            return;
        }
        a_this.aQueryTopics[a_this.iCurTopic].strUrl = a_this.topicReader.topicInfo.strUrl;
        a_this.aQueryTopics[a_this.iCurTopic].strTitle = a_this.topicReader.topicInfo.strTitle;
        a_this.aQueryTopics[a_this.iCurTopic].strSummary = a_this.topicReader.strTopicContext;
    }

    this.incCurTopic = function(a_Context, a_this) {
        a_this.iCurTopic++;
    }

    this.queryTopicInfo = function(a_Context, a_this) {
        if (a_this.iCurTopic >= a_this.aQueryTopics.length)
            return;
        a_this.topicReader.nQueryId = a_this.aQueryTopics[a_this.iCurTopic].nTopicId;
        a_Context.push(a_this.topicReader.queryTopicInfo, a_this.topicReader,
            a_this.processTopicInfo, a_this,
            a_this.incCurTopic, a_this,
            a_this.queryTopicInfo, a_this);
    }

    this.queryTopicInfos = function(a_Context, a_this) {
        if (!a_this.bInited) {
            a_this.bSucc = false;
            return;
        }
        a_this.bSucc = true;
        a_this.topicReader.strTopicTablePath = a_this.strTopicTablePath;
        a_this.iCurTopic = 0;
        a_this.topicReader.lastIndex = -1;
        a_Context.push(a_this.topicReader.prepareMap, a_this.topicReader,
            a_this.queryTopicInfo, a_this);
    }
}