var posItemMenu_ar = new Array();
var posMenu_ar = new Array();
var nItems;
var nItems_pag = 9;
var nPaginas;
var clickEvent_mux;

/*
var opts = {
  lines: 13, // The number of lines to draw
  length: 7, // The length of each line
  width: 4, // The line thickness
  radius: 10, // The radius of the inner circle
  rotate: 0, // The rotation offset
  color: '#000', // #rgb or #rrggbb
  speed: 1.1, // Rounds per second
  trail: 62, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};


var target;
var spinner;*/

$(document).ready(function(){
	//var clickEventType=((document.ontouchstart!==null)?'click':'touchstart');
	if(user_mobile){
		clickEvent_mux = "touchstart";
	} else {
		clickEvent_mux = "click";
	}
	
	parsexmlGaleria();
	//config_galeriaMux();
	
	
});



//////////////////////////////////////////////////////////////////////////////
// parsea XML
//////////////////////////////////////////////////////////////////////////////
var xhttpData_galeria
var $xmlGaleria;
var dataXmlGaleria;
function parsexmlGaleria(){
	//var dataGaleria = $('#glosario').attr('name');
	var dataGaleria = 'galeria_mux.xml';
	var nombreGaleria = 'xml'+dataGaleria.slice(0,dataGaleria.indexOf('.'));
	if(window.location.protocol == 'file:') {
		var response;
			if (window.DOMParser)
			{
				parser=new DOMParser();
				response=parser.parseFromString(myObj[nombreGaleria],"text/xml");

			}
			else // Internet Explorer
			{
				response=new ActiveXObject("Microsoft.XMLDOM");
				response.async=false;
				response.loadXML(myObj[nombreGaleria]); 
			}
			
			$xmlGaleria = $(response);
	
	} else {
		dataXmlGaleria = '../recursos/'+dataGaleria;
		//dataXmlGaleria = dataGaleria;
		xhttpData_galeria=new XMLHttpRequest();
		xhttpData_galeria.open("GET",dataXmlGaleria,false);
		xhttpData_galeria.setRequestHeader('Content-Type', 'text/xml');
		xhttpData_galeria.send("");
		$xmlGaleria  = $(xhttpData_galeria.responseXML);
		
	}
	config_galeriaMux();
}

var nItem_menu = 0;
var iniItem_ar = new Array();;
function config_galeriaMux(){

	/********** loading *********************************/
	$('body').prepend('<div id="loading"><img src="ajax-loader.gif"/></div>');
	$('#loading').css({
		'position':'absolute',
		'width':'100%',
		'height':'100%',
		'display':'block',
		'z-index':'200',
		//'left': '30%',
		//'top' : '30%'
		'left' : '500px',
		'top' : '200px'
	});
	/*//target = document.getElementById('loading'); // Place in DOM node called "container"
	target = $('#loading');
	spinner = new Spinner(opts).spin(target);
	//spinner = new Spinner(opts).spin($('#loading'));*/
	/*****************************************************/
	//$('#galeria_mux').find('#cabecera').each(function(){
	$('#galeria_mux').find('#contenedor_menu').each(function(){
	$(this).prepend('<div id="menu_mux"></div>');
		$xmlGaleria.find('tarjeta').each(function(s){
			$('#menu_mux').append('<div id="'+$(this).find('nombre').text()+'" class="menu_mux" name="'+s+'"><p>'+$(this).find('nombre').text()+'</p></div>')
			$('#img_mux').append('<img id="img_'+$(this).find('nombre').text()+'" name="'+s+'" src="../recursos/'+$(this).find('imagen').text()+'"/>')
		});
		
		$(this).find('.menu_mux').each(function(s){
			posItemMenu_ar[s] = $(this).position().left;
		});
	});
	nItems = posItemMenu_ar.length;
	var dif_item = nItems%nItems_pag;
	nPaginas = Math.round((nItems-dif_item)/nItems_pag);
	
	
	if(dif_item>0){
		nPaginas++;
	}
	
	for(var i=0; i<nPaginas; i++){
		//posMenu_ar[i] = Number("-"+(673*i));
		posMenu_ar[i] = Number("-"+(755*i));
		iniItem_ar[i] = Math.round(nItems_pag*i);
	}
	/*$.each(posMenu_ar,function(s){
	});*/
	
	config_imgMux();
	fnavega_flechas_menuMux();
	//$('#flchMux_menuIzq').click(function(){
	$('#flchMux_menuIzq').bind(clickEvent_mux,function(){
	//nItem_img
			if(nItem_menu>0){
				nItem_menu--;
				$('#menu_mux').animate({
					  left: posMenu_ar[nItem_menu]
				}, 300, "linear");
				fnavega_flechas_menuMux();
				//factualizaMenu(iniItem_ar[nItem_menu])
				//nItems_pag
				nItem_img = Number(iniItem_ar[nItem_menu]+(nItems_pag-1));
				factualizaMenu(Number(iniItem_ar[nItem_menu]+(nItems_pag-1)));
				
				factualizaImg(Number(iniItem_ar[nItem_menu]+(nItems_pag-1)));
			} 
			
		});
		
		//flechaDch
		//$('#flchMux_menuDch').click(function(){
		$('#flchMux_menuDch').bind(clickEvent_mux,function(){
			if(nItem_menu<nPaginas){
				nItem_menu++;
				$('#menu_mux').animate({
					 left: posMenu_ar[nItem_menu]
				},300, "linear");
				fnavega_flechas_menuMux();
				nItem_img = Number(iniItem_ar[nItem_menu]);
				factualizaMenu(iniItem_ar[nItem_menu]);
				
				factualizaImg(iniItem_ar[nItem_menu]);

			}
		});
}

function factualizaImg(nItem){
	$('#img_mux').find('img').each(function(){
		if($(this).attr('name') == nItem){
			//alert($(this).attr('id'));
			$('#img_mux').animate({
				left: posx_fotosMux_ar[nItem]
			},300, "linear");
		}
	});
	/*nItem_img = $(this).attr('name');
				$('#img_mux').animate({
					 left: posx_fotosMux_ar[nItem_img]
				},300, "linear");*/
}


/*function fnavega_mux(){
	$('#menu_mux').find('.menu_mux').each(function(){
		$(this).click(function(){
			freset_selected();
			$(this).addClass('tarjeta_seleccionada');
			//alert($(this).attr('name'));
			nItem_img = $(this).attr('name');
			$('#img_mux').animate({
				 left: posx_fotosMux_ar[nItem_img]
			},300, "linear");
			//fnavega_flechas_mux();
		});
	});
}*/

function fnavega_flechas_menuMux(){
	$('#flchMux_menuIzq').css({
		'display' : 'block'
	});
	$('#flchMux_menuDch').css({
		'display' : 'block'
	});
	if(nItem_menu == 0){
		$('#flchMux_menuIzq').css({
			'display' : 'none'
		});
	}
	if(nItem_menu == (nPaginas-1)){
		$('#flchMux_menuDch').css({
			'display' : 'none'
		});
	}
}

var nFotos_mux;
var nItem_img;
var posx_fotosMux_ar = new Array();
var posx2_fotosMux_ar = new Array();
posx_fotosGlobal_mux_ar = new Array();
function config_imgMux(){
	var anchoTotal = 981;
	nFotos_mux = $('#img_mux').find('img').length;
	nItem_img = 0;
	var width = $('#img_mux').outerWidth();
	var left;
	var dif;
	var posIni;
	var posFin;
	posIni = $('#img_mux').css('left');
//	$('#img_mux').parent().append('<div id="navegaFotos_mux"><div id="flechaIzq_mux"><img src="../img/fotos_fcIzq.png"/></div><div id="flechaDch_mux"><img src="../img/fotos_fcDch.png"/></div></div>');
	$('#img_mux').css({
			'opacity' : '0'
	});
	$('#img_mux').find('img').each(function(s){
		posx_fotosMux_ar[s] = -anchoTotal*s
		posx2_fotosMux_ar[s] = anchoTotal*s
		var cimg = $(this).attr("src");
		$(this).attr('src', cimg).load(function() {  
			var anchoFoto = $(this).outerWidth();
			var altoFoto = $(this).outerHeight();
			var margenI;
			var margenD;
			if(anchoFoto<981){
				margenD = Math.round((anchoTotal-anchoFoto)/2);
				margenI = (anchoTotal-anchoFoto-margenD);
			} else {
				margenD = 0;
				margenI = 0;
			}
			
			if(altoFoto>563){
				$('#img_mux').css({
					'top' : '0px'
				});
			}
			if(s == (nFotos_mux-1)){
				$(this).parent().css({
						'opacity' : '1'
				});
				//spinner.stop();
				$('#loading').hide();
			}
			
			
			 $(this).css({
					'margin-left' : margenI+'px',
					'margin-right' : margenD+'px',
					'left' : posx2_fotosMux_ar[s]+'px',
					'display' : 'inline'
			});			
		}); 
	
	});
	
	posx_fotosGlobal_mux_ar = new Array();
	posx_fotosGlobal_mux_ar = posx_fotosMux_ar;

	if(user_mobile){
		touchslider.createSlidePanel('#img_mux', 560, 615);
	}
	
	$('#menu_mux').find('.menu_mux').first().addClass('tarjeta_seleccionada');
	
	
	//fnavega_flechas_mux();
	
	fnavega_mux();
	
	//alert(user_mobile);
	
	//flechaIzq
	if(user_mobile==true){
		//flechaIzq
		/*$('#flechaIzq_mux').bind("touchstart",function(){
			if(nItem_img>0){
				nItem_img--;				
				touchslider.doSlide($('#img_mux'), posx_fotosGlobal_mux_ar[nItem_img], '0.5s');
				fnavega_flechas_mux();
				factualizaMenu(nItem_img);
			} 
		});
		
		//flechaDch
		$('#flechaDch_mux').bind("touchstart",function(){
			if(nItem_img<nFotos_mux){
				nItem_img++;
				touchslider.doSlide($('#img_mux'), posx_fotosGlobal_mux_ar[nItem_img], '0.5s');
				fnavega_flechas_mux();
				factualizaMenu(nItem_img);
			}
		});*/
	} /*else {
		//flechaIzq
		$('#flechaIzq_mux').click(function(){
			if(nItem_img>0){
				nItem_img--;
				
				$('#img_mux').animate({
					  left: posx_fotosMux_ar[nItem_img]
				}, 500, "linear");
				fnavega_flechas_mux();
				factualizaMenu(nItem_img);
			} 
		});
		
		//flechaDch
		$('#flechaDch_mux').click(function(){
			if(nItem_img<nFotos_mux){
				nItem_img++;
				$('#img_mux').animate({
					 left: posx_fotosMux_ar[nItem_img]
				},500, "linear");
				fnavega_flechas_mux();
				factualizaMenu(nItem_img);
			}
		});
	}*/
	
	// android
	/*if((user_android)&&($(window).height()<500)){
		$('#navegaFotos').css({
			'top' : '10px'
		});
		
		$('#galeria_fotos').css({
			'top' : '65px'
		});
	}*/
}



function freset_selected(){
	$('#menu_mux').find('.menu_mux').each(function(){
		$(this).removeClass('tarjeta_seleccionada');
	});
}

function factualizaMenu(nItem){
	freset_selected();
	$('#menu_mux').find('.menu_mux').each(function(){
		if($(this).attr('name')==nItem){
			$(this).addClass('tarjeta_seleccionada');
		}
	});
	var nn;
//	//alert(iniItem_ar);
	$.each(iniItem_ar,function(s){
		//alert(iniItem_ar[s]);
		//alert(nPaginas);// total páginas
		//alert(nItem_menu);//nº pagina
		
		//contenedor_imagenes
		if(Number(nItem)>=Number(iniItem_ar[s])){
			nn = s;
		}
	});
	//alert(nn);
	nItem_menu = nn;
	$('#menu_mux').animate({
		 left: posMenu_ar[nItem_menu]
	}, 300, "linear");
	fnavega_flechas_menuMux();
}


function fnavega_mux(){
	$('#menu_mux').find('.menu_mux').each(function(){
		//$(this).click(function(){
		$(this).bind(clickEvent_mux,function(){
			freset_selected();
			$(this).addClass('tarjeta_seleccionada');
			//alert($(this).attr('name'));
			nItem_img = $(this).attr('name');
			$('#img_mux').animate({
				 left: posx_fotosMux_ar[nItem_img]
			},300, "linear");
			//fnavega_flechas_mux();
		});
	});
}

/*
function fnavega_flechas_mux(){
	$('#flechaIzq_mux').css({
		'display' : 'block'
	});
	$('#flechaDch_mux').css({
		'display' : 'block'
	});
	if(nItem_img == 0){
		$('#flechaIzq_mux').css({
			'display' : 'none'
		});
	}
	if(nItem_img == (nFotos_mux-1)){
		$('#flechaDch_mux').css({
			'display' : 'none'
		});
	}
}*/