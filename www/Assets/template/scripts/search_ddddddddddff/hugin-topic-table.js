// HuginTopicTableReader
function HuginTopicTableReader() {
    this.nQueryId = null;
    this.strTopicTablePath = null;
    this.lastIndex = -1;
    this.topicInfo = null;
    this.bSucc = true;
    this.strTopicInfo = null;
    this.strTopicContext = null;
    this.topicMap = null;
    this.curTopicIndex = null;

    this.prepareQuery = function() {
        this.bSucc = true;
        this.strTopicInfo = null;
    }

    this.loadFromFile = function(a_Context, a_this, a_funcCallback) {
        theXmlReader.loadFromFile(a_Context, a_funcCallback);
    }

    this.processReaderResult = function(a_Context, a_this) {
        if (!theXmlReader.bSucc ||
            !theXmlReader.checkRoot("ck")) {
            a_this.bSucc = false;
            a_this.bInited = false;
            return;
        }
        var queryId = a_this.nQueryId;
        if (a_this.curTopicIndex > 0)
            queryId = queryId - a_this.topicMap[a_this.curTopicIndex - 1];
        var topicInfo = theXmlReader.getTopicRec(queryId);
        a_this.strTopicInfo = topicInfo.rd;
        a_this.strTopicContext = topicInfo.ct;
    }

    this.parseTopicInfo = function(a_Context, a_this) {
        if (!a_this.bSucc)
            return;
        a_this.topicInfo = new Object();
        var v = a_this.strTopicInfo.split("|");
        if (v.length < 2 || v[0] == "" || v[1] == "") {
            a_this.bSucc == false;
            return;
        }
        a_this.topicInfo.strUrl = v[0];
        a_this.topicInfo.strTitle = v[1];
    }

    this.queryTopicInfo = function(a_Context, a_this) {
        for (var i = 0; i < a_this.topicMap.length; i++) {
            if (a_this.nQueryId < a_this.topicMap[i])
                break;
        }
        if (i >= a_this.topicMap.length) {
            a_this.bSucc == false;
            return;
        }
        a_this.curTopicIndex = i;
        var topictablefilename = "topictable_" + i + ".xml";
        if (i != a_this.lastIndex) {
            a_this.lastIndex = i;
            theXmlReader.strFilePath = getAbsPath(a_this.strTopicTablePath, topictablefilename);
            a_Context.push(a_this.loadFromFile, a_this,
                a_this.processReaderResult, a_this,
                a_this.parseTopicInfo, a_this);
        } else {
            a_Context.push(a_this.processReaderResult, a_this,
                a_this.parseTopicInfo, a_this);
        }
    }

    this.makeIndexMap = function(a_Context, a_this) {
        a_this.topicMap = new Array();
        var prev = 0;
        for (var i = 0; i < theXmlReader.getNumOfNodes(); i++) {
            a_this.topicMap[i] = theXmlReader.getNumOfTopics(i) + prev;
            prev = a_this.topicMap[i];
        }
    }

    this.prepareMap = function(a_Context, a_this) {
        a_this.bSucc = true;
        theXmlReader.strFilePath = a_this.strTopicTablePath;
        a_Context.push(a_this.loadFromFile, a_this,
            a_this.makeIndexMap, a_this);
    }
}