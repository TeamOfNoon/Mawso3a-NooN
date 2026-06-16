/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
   function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
           
         if(mode == 'CSS1Compat'){
                height = document.documentElement.clientHeight ;
         }
        else{
                 height =  document.body.clientHeight;
        }
             /*height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks*/

  



        }

        return height;
    }




  



function view_image_while_scroll(){

    var pics = [".inview", ".inview2"];
	
	var arrEdited2 = [];
        $('.lozad').each(function(i) {
            $(this).attr('id', 'id_' + (i + 1));
             arrEdited2.push($(this).attr('id'));
        });
	
	 var con;


	 con =  $('#iscroll');
	 //con =   $(window);

	

	
	
	
	
	con.scroll(function () {
		/*var vpH = $('#wrapper').innerHeight(),
            scrolltop = ($('#wrapper').scrollTop()),
            elems = [];*/
			
		  var vpH = getViewportHeight(),
            scrolltop = (con.scrollTop() ?
                con.scrollTop() :
                con.scrollTop()),
            elems = [];
			

	
	
            $.each(arrEdited2, function( i, l ){
              
				var $el = $('#id_'+(i+1)),
					top = $el.offset().top + $("#iscroll").scrollTop()+20,
                    height = $el.height(),
                    inview = $el.data('inview') || false;
					
					 
					
					
					
					if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    
					if (inview) {
                        
						//$el.data('inview', false);
                        //$el.trigger('inview', [ false ]);                        
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
	

if(!$el.attr("src")){
$el.parent().attr("class", 'img_alpom link_off');	

$el.attr("src", '../../clientscript/images/generic/loading.gif');
var img = new Image();
//imag_loading = true;
img.onload = function() {
    $el.parent().attr("class", 'img_alpom');
	
//alert($el.attr('data-src'));
$el.attr('src',$el.attr('data-src').replace(/\*/g, ""));
	
	
	
	//imag_loading = false;
	//alert("loaded successfully");
}
img.onerror = img.onabort = function() {
    //imag_loading = true;
	$el.parent().attr("class", 'img_alpom error link_off');
	
	if (read_Setting("lang", "ar", "all") == "en") {
	$el.attr("src", '../../clientscript/images/generic/linklost_en.jpg');
	}
	else{
	$el.attr("src", '../../clientscript/images/generic/linklost_ar.jpg');
	}
	

	
	$(".link_off").click(function(event) {
			  event.preventDefault();
              event.stopPropagation();	
	});
	
}
// only set .src AFTER event handlers are in place

var dtasrc= $el.attr('data-src').replace(/\*/g, "");

//alert(dtasrc);
img.src = dtasrc;
}						
                    }
                }   
          });

    });

 con.scroll();

}


var offset = 100;
function view_help_while_scroll() {
    var arrEdited2 = [];

    $('.lozad').each(function(i) {
        $(this).attr('id', 'id_' + (i + 1));
        arrEdited2.push($(this).attr('id'));
    });

    var con = $('#wrapper');

    function updateColors() {
        var vpH = getViewportHeight(),
            scrolltop = con.scrollTop(),
            elems = [];

        $.each(arrEdited2, function(i, l) {
            var $el = $('#id_' + (i + 1)),
                top = $el.offset().top + con.scrollTop(),
                height = $el.height(),
                inview = $el.data('inview') || false;

            var $el_list_item = $('.header-nav__menu-item a');
            var $el_list = $('#id_list_' + (i + 1));
           
             if (scrolltop <= top + height-offset && scrolltop >= top-offset) {
            if (!inview) {
                $el_list_item.css('color', "green");
                $el_list.css('color', "red");
            }
        }  else if (scrolltop < top + height) {
                /*if (!inview) {
                    $el_list_item.css('color', "green");
                    $el_list.css('color', "red");
                }
				else{
					
				}*/
            }
        });
    }

    con.scroll(updateColors);

    // Trigger the initial color update
    updateColors();
}

// Helper function to get viewport height
function getViewportHeight() {
    return window.innerHeight || document.documentElement.clientHeight;
}

//cool ();
