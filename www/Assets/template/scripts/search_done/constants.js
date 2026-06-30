// Character sets and constants
var g_RunesVowels = "\u0061\u0065\u0069\u006F\u0075\u0079";
var g_RunesWordBreaks = "\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u0009\u000A\u000B\u000C\u000D\u000E\u000F\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001A\u001B\u001C\u001D\u001E\u001F\u0022\u005C\u0020\u002E\u002C\u0021\u0040\u0023\u0024\u0025\u005E\u0026\u002A\u0028\u0029\u007E\u0027\u0060\u003A\u003B\u003C\u003E\u003F\u002F\u007B\u007D\u005B\u005D\u007C\u002B\u002D\u003D\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E\u009F\u00A1\u00A9\u00AB\u00AE\u00B7\u00BB\u00BF\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000";
var g_RunesWhiteSpaces = "\u0020\u0009\u000D\u000A\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000";
var g_RunesSpecialBreaks = ",!@#$%^&*()~'`:;<>?/{}[]|+-=";
var g_RunesQuote = '\x22';
var g_RunesHelSuffixes = new Array("ed,0", "ingly,0", "ings,0", "ing,0", "ly,1", "es,1", "s,1", "e,1");







var PAGENODE = "item";
var BOOKNODE = "book";
var URLNODE = "remoteitem";
var PROJNODE = "project";
var INDEXNODE = "index";
var DATANODE = "data";
var CHUNKINFONODE = "chunkinfo";
var KEYNODE = "key";
var TOPICNODE = "topic";
var SCREENSNODE = "screens";
var GLOSSARYNODE = "glossary";
var ENTRYNODE = "entry";
var REMOTENODE = "remote";
var BREADCRUMBSNODE = "breadcrumbs";
var ITEMNODE = "item";
var CSHINFONODE = "csh-info";
var WINDOWLISTNODE = "windowlist";
var WINDOWNODE = "window";
var XCOORD = "x";
var YCOORD = "y";
var WIDTH = "width";
var HEIGHT = "height";
var OPTIONS = "options";

var REF = "ref";
var MASTERPROJECT = "MasterProject";
var CHILDID = "mergedchildid";

var LOADCOMPLETE = "rhloadcomplete";
var COOKIESPAGE = "access_cookies.htm";
var COOKIESPAGEID = "rhcookiereadwrite";

var DEFAULTURL = "defaulturl";
var MINWIDTH = "minwidth";
var MAXWIDTH = "maxwidth";
var MINHEIGHT = "minheight";
var MAXHEIGHT = "maxheight";
var BROWSERAGENT = "browseragent";
var FOLDER = "folder";
var VALUE = "value";
var DEFAULT = "default";
var RHMSWINNAME = "RHMSWINNAME";
var MAPNUM = "mapnum";
var MAPID = "mapid";
var TOPICURL = "topicurl";
var BCID = "#bc-";
var TOCCHILDIDPREFIX = "@";
var IDXLOADINGDIVID = "rhidxloadingdivid";
var GLOLOADINGDIVID = "rhgloloadingdivid";

var CSHMODE = "1";
var NONCSHMODE = "0";
var SHOWINCSHMODE = "CSH";
var SHOWINNONCSHMODE = "NONCSH";

var TRUESTR = "1";
var FALSESTR = "0";

var RHMAPID = "rhmapid";
var RHMAPNO = "rhmapno";
var RHWINDOW = "rhwnd";
var RHCSHMODE = "rhcsh";
var RHNEWWINDOW = "rhnewwnd";
var RHANDSEARCH = "rhandsearch";
var RHSEARCHSTR = "rhsearch";
var RHSYNSTR	= "rhsyns";
var RHHIGHLIGHT = "rhhl";
var RHSEARCHCOUNT = "rhsearchcount";
var RHHIGHLIGHTTEXTCOLOR = "rhhltxtcol";
var RHHIGHLIGHTBGCOLOR = "rhhlbgcol";

var DEFAULTXTHIGHLIGHTCOLOR = "#000000";
var DEFAULTBGHIGHLIGHTCOLOR = "#b2b4bf";

var WINLOCATION=0x01;		/*need location bar?*/
var WINMENUBAR=0x02;		/*need menubar?*/		
var WINRESIZABLE=0x04;	/*resizable window?*/
var WINTOOLBAR=0x08;		/*need toolbar?*/
var WINSTATUS=0x10;		/*need statusbar?*/
var WINSCROLLBARS=0x20;	/*need scrollbars?*/

var NAME = "name";
var URL = "url";
var SRC = "src";
var CHILDNAME = "childname";


var TREEITEMCLASS = "treeitem";
var LISTITEMCLASS = "listitem";
var UNCLICKABLECLASS = "unclickable";
var UNSELECTABLECLASS = "unselectable";
var NOLINKANCHORCLASS = "nolink";
var HLISTCLASS = "hlist";
var HANDCURSORCLASS = "handcursor";


var DATASRC = "data-src";
var DATAURL = "data-url";
var DATAPATH = "data-path";
var DATAROOTPATH = "data-rootpath";
var DATAITEMTYPE = "data-type";
var DATAHOVERIMGSRC = "data-hoverimgsrc";
var DATAIMGSRC = "data-imgsrc";
var DATASELIMGSRC = "data-selimgsrc";
var DATATERM = "data-term";
var DATAPANEID = "data-contentid";
var DATATABBUTTONID = "data-tabid";
var DATACLASS = "data-class";
var DATACLASSHOVER = "data-classhover";
var DATACLASSSEL = "data-classsel";
var DATASHOWIN = "data-showin";
var DATAPH = "data-placeholder";

var BOOKDELIM = ".";
var PAGEDELIM = "_";
var TABBUTTONID = "rhtabbuttonid";
var TOCID = "rhtocid";

var ITEMTYPEBOOKCLOSED	= 0;
var ITEMTYPEBOOKOPEN	= 1;
var ITEMTYPEPAGE		= 2;
var ITEMTYPEURL			= 3;
var ITEMTYPELOADING		= 4;
var ITEMTYPEBOOKCHILDS	= 5;
var ITEMTYPEICON		= 6;
var ITEMTYPEKW			= 7;
var ITEMTYPELINK		= 8;
var ITEMTYPESUBKW		= 9;
var ITEMTYPECATEGORY	= 10;
var ITEMTYPETERM		= 11;
var ITEMTYPEDEF			= 12;
var ITEMTYPEMAPNO		= 13;
var ITEMTYPEMAPID		= 14;

var SCR_NONE		= -1;
var SCR_INIT		= 0;
var SCR_CHILD_TOC	= 1;
var SCR_PARENT_TOC	= 2;
var SCR_CHILD_IDX	= 3;
var SCR_PARENT_IDX	= 4;
var SCR_CHILD_GLO	= 5;
var SCR_PARENT_GLO	= 6;
var SCR_PARENT_BC	= 7;
var SCR_PARENT_FTS	= 8;
var SCR_CHILD_FTS	= 9;
var SCR_PARENT_TOCSYNC = 10;
var SCR_CHILD_CSH	= 11;

var SEARCHPAGEWIDTHRATIO = 70;
var ECS_NONE			= 0;
var ECS_FTSREADY		= 1;
var ECS_SEARCHING		= 2;
var ECS_FATALERROR		= 3;
var ECS_CANCELED		= 4;
var ECS_SEARCHFAILED	= 5;
var ECS_FOUND			= 6;

var READ_REQ			= 1;
var SAVE_REQ			= 2;

var JS_TAGTOKEN			= 1;
var JS_TEXTTOKEN		= 3;

var LINK_NAME_MACRO = "{%LINK_NAME%}";
var LINK_URL_MACRO = "{%LINK_URL%}";
var SEARCH_SUMMARY_MACRO = "{%SEARCH_SUMMARY%}";
var SEARCH_URL_MACRO = "{%SEARCH_URL%}";
var ICON_MACRO = "{%ICON%}";


// Character sets and constants
var g_RunesVowels = "\u0061\u0065\u0069\u006F\u0075\u0079";
var g_RunesWordBreaks = "\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u0009\u000A\u000B\u000C\u000D\u000E\u000F\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001A\u001B\u001C\u001D\u001E\u001F\u0022\u005C\u0020\u002E\u002C\u0021\u0040\u0023\u0024\u0025\u005E\u0026\u002A\u0028\u0029\u007E\u0027\u0060\u003A\u003B\u003C\u003E\u003F\u002F\u007B\u007D\u005B\u005D\u007C\u002B\u002D\u003D\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E\u009F\u00A1\u00A9\u00AB\u00AE\u00B7\u00BB\u00BF\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000";
var g_RunesWhiteSpaces = "\u0020\u0009\u000D\u000A\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000";
var g_RunesSpecialBreaks = ",!@#$%^&*()~'`:;<>?/{}[]|+-=";
var g_RunesQuote = '\x22';
var g_RunesHelSuffixes = new Array("ed,0", "ingly,0", "ings,0", "ing,0", "ly,1", "es,1", "s,1", "e,1");