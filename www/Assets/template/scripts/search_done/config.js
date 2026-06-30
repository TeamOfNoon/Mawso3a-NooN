// Configuration variables
var gSearchDataFolderName = "whxdata";
var gFtsFileName = "whfts.xml";
var gbANDSearch = 0;
var gstrSyn = "";
var Clean_SearchString;
var gsNoTopics = "No results found";
var gsLoadXmlFailed = "Failed to load XML file";
var gsInitDatabaseFailed = "Failed to initialize database";
var gsInvalidExpression = "The search string you typed is not valid.";
var gsSearching = window.RH_LANG.gsSearching + "...";
var gsCancel = window.RH_LANG.cancel;
var gsCanceled = window.RH_LANG.gsCanceled;
var gsSubstrSrch = 0;
var search_type = "";
var search_match = "";
var gsHLColorFront = "#000000";
var gsHLColorBackground = "#b2b4bf";
var gsResultDivID = "searchResList";
var gbReady = false;
var gbXML = false;
var gbWhFHost = false;
var g_CurState = null;
var g_CurPage = 1;
var g_nMaxPages = 3;
var g_sQuestion = '';
var g_bServerResult = false;

