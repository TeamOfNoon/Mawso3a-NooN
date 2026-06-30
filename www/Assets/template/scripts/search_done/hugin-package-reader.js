// HuginPackageReader
function HuginStemRecordTopicShape() {
    this.aPositions = null;
}

function HuginStemRecordTopic() {
    this.uEmphasis = null;
    this.aShapes = null;
}

function HuginStemRecord() {
    this.aTopics = null;
}

function HuginPackageReaderResult() {
    this.strNefStem = null;
    this.strRecord = null;
    this.bStopWord = null;
}

function HuginPackageReader() {
    this.strPackagePath = null;
    this.strSynonymPath = null;
    this.recordResult = null;
    this.strQueryWord = null;
    this.bPhraseSearch = false;
    this.bSucc = true;

    this.prepareQuery = function() {
        this.recordResult = null;
        this.bSucc = true;
        this.strQueryWord = null;
        this.bPhraseSearch = false;
    }

    this.loadFromFile = function(a_Context, a_this, a_funcCallback) {
        theXmlReader.loadFromFile(a_Context, a_funcCallback, false);
    }

    this.pickSynonyms = function(a_strStem) {
        return theXmlReader.getSynonyms(a_strStem).split(",");
    }

    this.setSynonymForHighlighting = function(a_Context, a_this) {
        if (!theXmlReader.bSucc) {
            return;
        }
        gstrSyn = "";
        var arySynonyms = a_this.pickSynonyms(a_this.strQueryWord);
        for (var i = 0; i < arySynonyms.length; ++i) {
            gstrSyn += " " + arySynonyms[i];
        }
        if ((gstrSyn == "") || (gstrSyn == " "))
            return;
    }

    this.doQueryWordRecord = function(a_Context, a_this) {
        if (!theXmlReader.bSucc) {
            a_Context.strMsg = gsLoadXmlFailed;
            a_Context.bError = true;
            return;
        }
        if (!a_this.bSucc)
            return;
        a_this.recordResult = new HuginPackageReaderResult();
        var strRecord = theXmlReader.getWordRec(a_this.strQueryWord, a_this.bPhraseSearch);
        if (strRecord == null)
            return;
        a_this.recordResult.bStopWord = false;
        a_this.recordResult.strNefStem = a_this.strQueryWord;
        a_this.recordResult.strRecord = strRecord;
        if (strRecord == "") {
            a_this.bSucc = false;
            return;
        }
        a_this.bSucc = true;
        theXmlReader.strFilePath = a_this.strSynonymPath;
        a_Context.push(a_this.loadFromFile, a_this,
            a_this.setSynonymForHighlighting, a_this);
    }

    this.query = function(a_Context, a_this) {
        a_this.bSucc = true;
        theXmlReader.strFilePath = a_this.strPackagePath;
        a_Context.push(a_this.loadFromFile, a_this,
            a_this.doQueryWordRecord, a_this);
    }
}