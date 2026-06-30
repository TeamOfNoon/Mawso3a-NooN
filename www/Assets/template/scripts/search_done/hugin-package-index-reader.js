// HuginPackageIndexReader
function HuginPackageIndexReader() {
    this.queryWord = null;
    this.strPackageIndexPath = null;
    this.packageInfo = null;
    this.bSucc = true;
    this.strCurQuery = null;
    this.strPackageInfo = null;

    this.prepareQuery = function() {
        this.packageInfo = null;
        this.bSucc = true;
        this.strCurQuery = null;
        this.strPackageInfo = null;
    }

    this.getPackagePath = function(a_strSuffix) {
        var sf = splitPathName(this.strPackageIndexPath);
        return sf.strDir + "package_" + a_strSuffix + sf.strExt;
    }

    this.getTopicTablePath = function(a_strSuffix) {
        var sf = splitPathName(this.strPackageIndexPath);
        return sf.strDir + "topictable_" + a_strSuffix + sf.strExt;
    }

    this.parsePackageInfo = function(a_Context, a_this) {
        if (!theXmlReader.bSucc ||
            !theXmlReader.checkRoot("cki")) {
            a_this.bSucc = false;
            return;
        }
        var nPackageIndex = theXmlReader.getPackageIndex(a_this.strCurQuery);
        if (nPackageIndex == null || nPackageIndex < 0) {
            a_this.packageInfo = null;
            a_this.bSucc = false;
            return;
        }
        a_this.packageInfo = a_this.getPackagePath(nPackageIndex);
        this.bSucc = true;
        return;
    }

    this.parseTopicInfo = function(a_Context, a_this) {
        if (!theXmlReader.bSucc ||
            !theXmlReader.checkRoot("cki")) {
            a_this.bSucc = false;
            return;
        }
        var nPackageIndex = theXmlReader.getPackageIndex(a_this.strCurQuery);
        if (nPackageIndex == null || nPackageIndex < 0) {
            a_this.packageInfo = null;
            a_this.bSucc = false;
            return;
        }
        a_this.packageInfo = a_this.getTopicTablePath(nPackageIndex);
        this.bSucc = true;
        return;
    }

    this.loadFromFile = function(a_Context, a_this, a_funcCallback) {
        theXmlReader.loadFromFile(a_Context, a_funcCallback, false);
    }

    this.queryPackageInfo = function(a_Context, a_this) {
        a_this.bSucc = true;
        theXmlReader.strFilePath = a_this.strPackageIndexPath;
        a_Context.push(a_this.loadFromFile, a_this,
            a_this.parsePackageInfo, a_this);
    }

    this.queryTopicInfo = function(a_Context, a_this) {
        a_this.bSucc = true;
        theXmlReader.strFilePath = a_this.strPackageIndexPath;
        a_Context.push(a_this.loadFromFile, a_this,
            a_this.parseTopicInfo, a_this);
    }
}