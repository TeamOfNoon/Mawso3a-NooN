/* =====================================================
   THREAD NAV TEMPLATE (ES3 SAFE)
===================================================== */

(function () {

window.FORUM_THREAD_NAV_TPL =
  '<table class="threadNavTbl no_copy" cellspacing="0" cellpadding="0" width="100%">' +
    '<tr>' +
      '<td class="navCell navUp">' +
        '<a class="upBtn" href="#">' +
          '<i class="demo-icon icon-vaxb401"></i>{{up_text}}' +
        '</a>' +
      '</td>' +

      '<td class="navCell navBack">' +
        '<a class="backBtn" href="#">' +
          '<i class="demo-icon icon-reply-outline"></i>{{back_text}}' +
        '</a>' +
      '</td>' +
    '</tr>' +
  '</table>';




window.TOOL_BAR_TPL =
  '<div class="tool_bar no_copy">' +
    '<div class="main_button">' +
     
	 '<span class="move_button"><button><i class="demo-icon icon-move"></i><br class="br">'+window.LANG_COMMON.moves+'</button></span>' +
	 
	 '<span class="quote_button" style="display:none;"><button><i class="demo-icon icon-quote-right"></i><br class="br">'+window.LANG_COMMON.show_quote+'</button></span>' +
     
	 '<span class="quick_copy_button" style="display:none;"><button><i class="demo-icon icon-docs"></i><br class="br">'+window.LANG_COMMON.quick_copy_quote+'</button></span>' +

	 '<span class="tool_button"><button><i class="demo-icon icon-tools"></i><br class="br">'+window.LANG_COMMON.tools+'</button></span>' +

    '</div>' +
	
	'<div class="tool_sec" style="display:none;">' +
	 
	 	 '<span class="read_button"><button><i class="demo-icon icon-read"></i><br class="br">'+window.LANG_COMMON.read+'</button></span>' +
		 '<span class="drag_button" style="display:none;"><button><i class="demo-icon icon-hand-paper-o"></i><br class="br">'+window.LANG_COMMON.drag+'</button></span>' +
		 '<span class="back_button"><button><i class="demo-icon icon-undo"></i><br class="br">'+window.LANG_COMMON.back+'</button></span>' +

	 
	'</div>' +
	
	

     '<div id="controls-horizontal" style="display:none;">' +
           '<div class="inner">'+
             '<span class="ctrl-item" id="speedPanel">' +
        
		     '<div id="speedLabel">(50%)</div>' +
		     '<button id="readBtn" style="display:none;">Start</button>' +
		    '<span id="sliderWrap">' +
            '<span id="sliderTrack"></span>' +
            '<span id="sliderThumb"></span>' +
            '</span>' +
       
            '</span>' +
          '</div>' +
     '</div>' +
	 
	 
	 
	 
	 
	 '<div class="movement_sec" style="display:none;">' +

      
	  '<span class="move_up_button"><button><i class="demo-icon icon-up-big"></i><br class="br">'+window.LANG_COMMON.up+'</button></span>' +

      '<span class="move_down_button"><button><i class="demo-icon icon-down-big"></i><br class="br">'+window.LANG_COMMON.down+'</button></span>' +


      '<span class="back_button"><button><i class="demo-icon icon-undo"></i><br class="br">'+window.LANG_COMMON.back+'</button></span>' +

     '</div>' +
	 
	 
	
	
  '</div>';





window.QUOTE_PANAl =
'<div class="quote-panal">' +
   '<div class="child-post-con-info">' +
      '<button class="panel-minimize no_copy"><i class="demo-icon icon-minus"><i class="demo-icon icon-minus"></i></i><span>'+window.LANG_COMMON.min+'</span></button>'+
	  '<button class="quote-con-close no_copy"><i class="demo-icon icon-cancel"></i>'+ window.LANG_COMMON.close +'</button>' +
      '<button class="quote-copy-all no_copy"><i class="demo-icon icon-docs"></i>'+ window.LANG_COMMON.copy_text+'</button>' +
      '<div class="quote-content"></div>' +   // 👈 هذا المكان للنص

   '</div>' +
'</div>';



window.MENU_BAR_TPL =
  '<div class="mainSection">' +
    '<h2 class="mainTitle">{{menu}}</h2>' +
  '</div>';

window.HEADER_BAR_TPL =
  '<div class="mainSection">' +
    '<h2 class="mainTitle">{{header}}</h2>' +
  '</div>';

window.FOOTER_BAR_TPL =
  '<div class="mainSection">' +
    '<h2 class="mainTitle">{{footer}}</h2>' +
  '</div>';

})();
