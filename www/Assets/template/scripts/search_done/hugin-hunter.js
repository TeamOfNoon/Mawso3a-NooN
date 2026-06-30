// HuginHunter
function arrayRemoveAt(a_ary, a_nIndex) {
    var nLen = a_ary.length;
    for (var i = a_nIndex; i < nLen - 1; i++)
        a_ary[i] = a_ary[i + 1];
    a_ary.length--;
}

function HuginQueryResult() {
    this.aTopics = [];
    this.nTotalResults = 0;
}
function makeFakeTopic(i)
{
    return {
        fake: true,
        nIndex: i + 1,
        strTitle: "",
        strUrl: "",
        strSummary: "",
        fRanking: 0
    };
}
function HuginImageWord() {
    this.uEmphasis = 0;
    this.uFreq = 0;
}

function HuginImageTileWord(a_nWordId, a_nWordForm) {
    this.nWordId = a_nWordId;
    this.nWordForm = a_nWordForm;
}

function HuginImageTile() {
    this.aWords = new Array();
}

function HuginTopicImage(a_nTopicId) {
    this.aWords = new Array();
    this.aTiles = new Array();
}

function HuginHunter() {
    this.aOdbPathes = null;
    this.strOdbPath = null;
    this.strQuery = null;
    this.queryResult = null;
    this.bInited = false;
    this.bSucc = true;
    this.aDatabases = null;
    this.iCurProj = null;
    this.queryExpression = null;
    this.queryWord = null;
    this.curTermNode = null;
    this.aRecordTable = null;
    this.aSuspendTopics = null;
    this.aTopics = null;
    this.iCurTopic = null;
    this.aTopicImages = null;
    this.aNodeStack = null;
    this.iCurTermNodeWord = null;
    this.aPossibleOrgs = null;
    this.aRankedTopics = null;
    this.nWordLoaded = 0;
    this.nWordNum = 0;
    this.nState = 0;
    this.nProgress = 0;

    this.prepareQuery = function() {
        if (theXmlReader.nStartIndex == 0)
        {
           this.queryResult = null;
        }
		
		
		
        this.bSucc = true;
        this.iCurProj = 0;
        this.queryExpression = null;
        this.queryWord = null;
        this.curTermNode = null;
        this.aRecordTable = null;
        this.aSuspendTopics = null;
        this.aTopics = null;
        this.iCurTopic = 0;
        this.aTopicImages = null;
        this.aNodeStack = null;
        this.iCurTermNodeWord = 0;
        this.aPossibleOrgs = null;
        this.aRankedTopics = null;
        this.nWordLoaded = 0;
        this.nWordNum = 0;
        this.nState = 0;
        this.nProgress = 0;
        for (var i in this.aDatabases)
            this.aDatabases[i].prepareQuery();
    }

    this.updateProgress = function() {
        var fProgress = 100 * this.iCurProj / this.aDatabases.length;
        var fBase = 100 / this.aDatabases.length;
        if (this.nState == 1)
            this.nProgress = Math.round(fProgress + (this.nWordLoaded / this.nWordNum) * (fBase / 3));
        else if (this.nState == 2)
            this.nProgress = Math.round(fProgress + fBase / 3 +
                (this.iCurTopic / this.aTopics.length) * (fBase * 2 / 3));
    }

    this.incCurProjForInit = function(a_Context, a_this) {
        a_this.iCurProj++;
        if (a_this.iCurProj < a_this.aDatabases.length) {
            a_Context.push(a_this.aDatabases[a_this.iCurProj].init, a_this.aDatabases[a_this.iCurProj],
                a_this.incCurProjForInit, a_this);
        }
    }

   this.incCurProjForEvaluate = function(a_Context, a_this)
{
    a_this.iCurProj++;

    if (a_this.iCurProj < a_this.aDatabases.length)
    {
        a_this.aRankedTopics[a_this.iCurProj] = [];

        a_Context.push(
            a_this.getRecords, a_this,
            a_this.evaluateTopics, a_this,
            a_this.incCurProjForEvaluate, a_this
        );
    }
    else
    {
        a_Context.push(
            a_this.preparePageTopicInfos, a_this,
            a_this.loadPageTopicInfos, a_this
        );
    }
}


this.preparePageTopicInfos = function(a_Context, a_this)
{
    var all = [];
    var i, j;

    for (i = 0; i < a_this.aRankedTopics.length; i++)
    {
        if (!a_this.aRankedTopics[i])
            continue;

        for (j = 0; j < a_this.aRankedTopics[i].length; j++)
        {
            a_this.aRankedTopics[i][j].nProjIndex = i;
            all[all.length] = a_this.aRankedTopics[i][j];
        }
    }

    all.sort(function(a, b)
    {
        if (b.fRanking != a.fRanking)
            return b.fRanking - a.fRanking;
        return a.nTopicId - b.nTopicId;
    });

    theXmlReader.fullRankedTopics = all;
    theXmlReader.totalResultCount = all.length;

    var start = theXmlReader.nStartIndex || 0;
    
    // Use g_desiredResults for page size
    var size = g_desiredResults || 200;
    var end = Math.min(start + size, all.length);

    a_this.pageRankedTopics = [];

    for (i = start; i < end; i++)
    {
        all[i].nIndex = i + 1;
        a_this.pageRankedTopics[a_this.pageRankedTopics.length] = all[i];
    }

    a_this.pageTopicsByProj = [];

    for (i = 0; i < a_this.aDatabases.length; i++)
        a_this.pageTopicsByProj[i] = [];

    for (i = 0; i < a_this.pageRankedTopics.length; i++)
    {
        var t = a_this.pageRankedTopics[i];
        a_this.pageTopicsByProj[t.nProjIndex].push(t);
    }

    a_this.iCurProj = -1;
}


this.loadPageTopicInfos = function(a_Context, a_this)
{
    a_this.iCurProj++;

    while (a_this.iCurProj < a_this.aDatabases.length &&
           (!a_this.pageTopicsByProj[a_this.iCurProj] ||
            a_this.pageTopicsByProj[a_this.iCurProj].length == 0))
    {
        a_this.iCurProj++;
    }

    if (a_this.iCurProj >= a_this.aDatabases.length)
        return;

    a_this.aDatabases[a_this.iCurProj].aQueryTopics =
        a_this.pageTopicsByProj[a_this.iCurProj];

    a_Context.push(
        a_this.aDatabases[a_this.iCurProj].queryTopicInfos,
        a_this.aDatabases[a_this.iCurProj],
        a_this.loadPageTopicInfos,
        a_this
    );
}

    this.incCurTermNodeWord = function(a_Context, a_this) {
        a_this.nState = 1;
        a_this.iCurTermNodeWord++;
        a_this.nWordLoaded++;
        a_this.updateProgress();
    }

    this.incCurTopic = function(a_Context, a_this) {
        a_this.nState = 2;
        a_this.iCurTopic++;
        a_this.updateProgress();
    }

    this.checkInitSucc = function(a_Context, a_this) {
        var bAllFailed = true;
        var bNotAllDatabaseInited = false;
        a_this.bInited = false;
        for (var i = 0; i < a_this.aDatabases.length; i++) {
            if (!a_this.aDatabases[i].bSucc || !a_this.aDatabases[i].bInited)
                bNotAllDatabaseInited = true;
            else
                bAllFailed = false;
        }
        if (bAllFailed) {
            a_Context.strMsg = gsInitDatabaseFailed;
            g_CurState = ECS_FATALERROR;
            updateResultView();
            return;
        }
        if (bNotAllDatabaseInited) {
            a_Context.strMsg = gsInitDatabaseFailed;
        }
        a_Context.strMsg = "";
        g_CurState = ECS_FTSREADY;
        a_this.bInited = true;
    }

    this.getWordImageToAdd = function(a_nWordId, a_aWords) {
        return a_aWords[a_nWordId] ? a_aWords[a_nWordId] : (a_aWords[a_nWordId] = new HuginImageWord());
    }

    this.getTileImageToAdd = function(a_nPosition, a_aTiles) {
        return a_aTiles[a_nPosition] ? a_aTiles[a_nPosition] : (a_aTiles[a_nPosition] = new HuginImageTile());
    }

    this.addRecordToRecordTable = function(a_nWordId, a_strRecord) {
        if (a_strRecord == "")
            return;
        if (typeof(this.aRecordTable[a_nWordId]) == "undefined")
            this.aRecordTable[a_nWordId] = new Array();
        var aTopics = a_strRecord.split("|");
        for (var iTopic = 0; iTopic < aTopics.length; iTopic++) {
            var topicHead = aTopics[iTopic].match("^(\\d+),(.*)$");
            if (topicHead == null)
                continue;
            this.aRecordTable[a_nWordId][topicHead[1]] = topicHead[2];
            this.aSuspendTopics[topicHead[1]] = true;
        }
    }

    this.processRecordResult = function(a_Context, a_this) {
        if (!a_this.aDatabases[a_this.iCurProj].bSucc)
            return;
        a_this.wordRecord = a_this.aDatabases[a_this.iCurProj].recordResult;
        a_this.addRecordToRecordTable(a_this.queryWord.nWordId, a_this.wordRecord.strRecord);
    }

    this.getRecordOfTermWord = function(a_Context, a_this) {
        if (a_this.iCurTermNodeWord >= a_this.curTermNode.aWords.length)
            return;
        a_this.queryWord = a_this.curTermNode.aWords[a_this.iCurTermNodeWord];
        a_this.aDatabases[a_this.iCurProj].queryWord = a_this.queryWord;
        a_this.aDatabases[a_this.iCurProj].eType = a_this.curTermNode.eType;
        a_this.aDatabases[a_this.iCurProj].bNeedStopWord = a_this.bNeedStopWord;
        a_Context.push(a_this.aDatabases[a_this.iCurProj].queryRecord, a_this.aDatabases[a_this.iCurProj],
            a_this.processRecordResult, a_this,
            a_this.incCurTermNodeWord, a_this,
            a_this.getRecordOfTermWord, a_this);
    }

    this.getRecordOfTermNode = function(a_Context, a_this) {
        a_this.aPossibleOrgs = new Array();
        a_this.bNeedStopWord = (a_this.curTermNode.eType == ESNT_PHRASE);
        a_this.iCurTermNodeWord = 0;
        a_Context.push(a_this.getRecordOfTermWord, a_this);
    }

    this.getRecordOfNode = function(a_Context, a_this) {
        if (a_this.aNodeStack.length == 0)
            return;
        var curNode = a_this.aNodeStack[a_this.aNodeStack.length - 1];
        a_this.aNodeStack.length--;
        if (curNode != null) {
            if (curNode.eType == ESNT_PHRASE || curNode.eType == ESNT_DEFAULT || curNode.eType == ESNT_NOT) {
                a_this.curTermNode = curNode;
                a_Context.push(a_this.getRecordOfTermNode, a_this);
            } else {
                a_this.aNodeStack[a_this.aNodeStack.length] = curNode.right;
                a_this.aNodeStack[a_this.aNodeStack.length] = curNode.left;
                a_Context.push(a_this.getRecordOfNode, a_this,
                    a_this.getRecordOfNode, a_this);
            }
        }
    }

    this.addToTopicImage = function(a_Image, a_nWordId, a_Record) {
        var wordImage = this.getWordImageToAdd(a_nWordId, a_Image.aWords);
        wordImage.uEmphasis |= a_Record.uEmphasis;
        wordImage.uFreq = a_Record.aPositions.length;
        for (var strPosition in a_Record.aPositions) {
            var tileImage = this.getTileImageToAdd(a_Record.aPositions[strPosition],
                a_Image.aTiles);
            tileImage.aWords[tileImage.aWords.length] = new HuginImageTileWord(a_nWordId, 0);
        }
    }

    this.unpackTopicRecord = function(a_strRecord) {
        var aShapes = a_strRecord.split(":");
        if (aShapes.length == 0)
            return null;
        var record = new Object();
        record.uEmphasis = parseInt(aShapes[0]);
        record.aPositions = aShapes[1].split(",");
        if (record.aPositions.length < 1)
            return null;
        return record;
    }

    this.makeTopicImage = function(a_nTopicId) {
        var topicImage = new HuginTopicImage();
        for (var strWordId in this.aRecordTable) {
            if (!this.aRecordTable[strWordId][a_nTopicId])
                continue;
            var record = this.unpackTopicRecord(this.aRecordTable[strWordId][a_nTopicId]);
            this.addToTopicImage(topicImage, parseInt(strWordId), record);
        }
        return topicImage;
    }

    this.calculateRanking = function(a_TopicImage) {
        return calculateRanking(a_TopicImage, this.queryExpression);
    }

    this.calculateWordNum = function(a_Node) {
        if (a_Node.eType == ESNT_PHRASE || a_Node.eType == ESNT_DEFAULT || a_Node.eType == ESNT_NOT) {
            this.nWordNum += a_Node.aWords.length;
        } else {
            this.calculateWordNum(a_Node.right);
            this.calculateWordNum(a_Node.left);
        }
    }

    this.getRecords = function(a_Context, a_this) {
        a_this.aNodeStack = new Array();
        a_this.aNodeStack[a_this.aNodeStack.length] = a_this.queryExpression;
        a_this.aRecordTable = new Array();
        a_this.aSuspendTopics = new Array();
        a_this.nWordLoaded = 0;
        a_this.calculateWordNum(a_this.queryExpression);
        a_Context.push(a_this.getRecordOfNode, a_this);
    }

    this.evaluateTopic = function(a_Context, a_this) {
        if (a_this.iCurTopic >= a_this.aTopics.length)
            return;
        var rankedTopic = new Object();
        rankedTopic.fRanking = a_this.calculateRanking(a_this.makeTopicImage(a_this.aTopics[a_this.iCurTopic]));
        if (rankedTopic.fRanking > 0) {
            rankedTopic.nTopicId = parseInt(a_this.aTopics[a_this.iCurTopic]);
            a_this.aRankedTopics[a_this.iCurProj][a_this.aRankedTopics[a_this.iCurProj].length] = rankedTopic;
        }
        a_Context.push(a_this.incCurTopic, a_this,
            a_this.evaluateTopic, a_this);
    }

   this.evaluateTopics = function(a_Context, a_this)
{
    a_this.aTopics = [];

    for (var i = 0; i < a_this.aSuspendTopics.length; i++)
    {
        if (a_this.aSuspendTopics[i])
            a_this.aTopics.push(i);
    }

    a_this.totalTopics = a_this.aTopics.length;

    a_this.iCurTopic = 0;

    a_Context.push(
        a_this.evaluateTopic,
        a_this
    );
}

    this.calculateRankings = function(a_Context, a_this) {
        a_this.aRankedTopics = new Array();
        for (var strTopicId in a_this.aTopicImages) {
            var rankedTopic = new Object();
            rankedTopic.fRanking = calculateRanking(a_this.aTopicImages[strTopicId], a_this.queryExpression);
            if (rankedTopic.fRanking <= 0)
                continue;
            rankedTopic.nTopicId = parseInt(strTopicId);
            document.writeln("<br>" + rankedTopic.nTopicId + "<br>");
            a_this.aRankedTopics[a_this.aRankedTopics.length] = rankedTopic;
        }
    }

    this.compRankedTopics = function(a_itemA, a_itemB) {
        if (a_itemA.fRanking > a_itemB.fRanking)
            return true;
        else if (a_itemA.fRanking == a_itemB.fRanking) {
            var k = compare(a_itemA.strTitle, a_itemB.strTitle);
            if (k < 0)
                return true;
        }
        return false;
    }

    this.swapRankedTopics = function(a_aTopics, a_nIdx, a_itemNew) {
        a_aTopics[a_nIdx] = a_itemNew;
    }

    this.quickSortRankedTopics = function(a_nLow, a_nHigh) {
        quickSort(this.queryResult.aTopics,
            0, this.queryResult.aTopics.length - 1,
            this.compRankedTopics,
            this.swapRankedTopics);
    }

    this.getTopicInfo = function(a_Context, a_this) {
        a_this.aDatabases[a_this.iCurProj].aQueryTopics = a_this.aRankedTopics[a_this.iCurProj];
        a_Context.push(a_this.aDatabases[a_this.iCurProj].queryTopicInfos, a_this.aDatabases[a_this.iCurProj]);
    }

   this.evaluateExpression = function(a_Context, a_this)
{
    var q = trimString(a_this.strQuery);

    if (gbANDSearch)
    {
        // Do not rewrite again if query already contains operators
        if (!(/\bAND\b|\bOR\b|\bNOT\b/i.test(q)))
        {
            q = q.split(/\s+/).join(" AND ");
        }
    }

    a_this.queryExpression = parseQueryExpression(q);

    if (a_this.queryExpression == null)
    {
        a_Context.strMsg = gsInvalidExpression;
        a_this.bSucc = false;
        return;
    }

    a_this.aRankedTopics = new Array();
    a_this.iCurProj = -1;

    a_Context.push(
        a_this.incCurProjForEvaluate,
        a_this
    );
};

    
	
	



this.makeResult = function(a_Context, a_this)
{
    if (!a_this.bSucc)
        return;

    var total = theXmlReader.totalResultCount || 0;

    if (!a_this.queryResult)
        a_this.queryResult = new HuginQueryResult();

    // Create fake array only once or resize if needed
    if (!a_this.queryResult.aTopics ||
        a_this.queryResult.aTopics.length != total)
    {
        a_this.queryResult.aTopics = new Array(total);

        for (var i = 0; i < total; i++)
            a_this.queryResult.aTopics[i] = makeFakeTopic(i);
    }

    a_this.queryResult.nTotalResults = total;

    var page = a_this.pageRankedTopics || [];
    var start = theXmlReader.nStartIndex || 0;

    for (var i = 0; i < page.length; i++)
    {
        var topic = page[i];

        if (!topic)
            continue;

        var db = topic.nProjIndex;

        if (topic.strUrl &&
            !(_isAbsPath(topic.strUrl) || _isRemoteUrl(topic.strUrl)))
        {
            topic.strUrl =
                a_this.aProjPathes[db].strProjDir + topic.strUrl;
        }

        topic.fake = false;
        topic.nIndex = start + i + 1;

        // Replace only this slot
        a_this.queryResult.aTopics[start + i] = topic;
    }
};














   this.init = function(a_Context, a_this) {
        a_this.bInited = false;
        a_this.aDatabases = new Array();
        for (var i in a_this.aProjPathes) {
            var nLen = a_this.aDatabases.length;
            a_this.aDatabases[nLen] = new HuginDatabase();
            a_this.aDatabases[nLen].strOdbPath = a_this.aProjPathes[i].strOdbPath;
        }
        if (a_this.aDatabases.length == 0)
            return;
        a_this.iCurProj = 0;
        a_Context.push(a_this.aDatabases[a_this.iCurProj].init, a_this.aDatabases[a_this.iCurProj],
            a_this.incCurProjForInit, a_this,
            a_this.checkInitSucc, a_this);
    }

    this.query = function(a_Context, a_this) {
        if (!a_this.bInited) {
            a_this.bSucc = false;
            return;
        }
        a_this.prepareQuery();
        g_CurState = ECS_SEARCHING;
        updateResultView();
        a_this.queryResult = new HuginQueryResult();
        a_Context.push(a_this.evaluateExpression, a_this,
            a_this.makeResult, a_this);
    }
	
this.queryPage = function(a_Context, a_this)
{
    if (!a_this.bInited)
    {
        a_this.bSucc = false;
        return;
    }

    // Keep existing cached results
    a_this.bSucc = true;

    // Clear only temporary search state
    a_this.iCurProj = 0;
    a_this.queryExpression = null;
    a_this.queryWord = null;
    a_this.curTermNode = null;
    a_this.aRecordTable = null;
    a_this.aSuspendTopics = null;
    a_this.aTopics = null;
    a_this.iCurTopic = 0;
    a_this.aTopicImages = null;
    a_this.aNodeStack = null;
    a_this.iCurTermNodeWord = 0;
    a_this.aPossibleOrgs = null;
    a_this.aRankedTopics = null;
    a_this.nWordLoaded = 0;
    a_this.nWordNum = 0;
    a_this.nState = 0;
    a_this.nProgress = 0;

    // IMPORTANT:
    // Do NOT do:
    // a_this.queryResult = new HuginQueryResult();

    g_CurState = ECS_SEARCHING;
    updateResultView();

    a_Context.push(
        a_this.evaluateExpression,
        a_this,
        a_this.makeResult,
        a_this
    );
}
}