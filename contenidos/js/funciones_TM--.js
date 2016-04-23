var ie; 
var user_android;
var user_ipad;
var user_iphone;

var ie11;
var ie10;
var ie9;
var ie8;

var navega_div_flotante;
var clickEvent;


$(document).ready(function(){
	var navegador=navigator.userAgent;
	if((navegador.indexOf('MSIE') != -1)||(navegador.indexOf('Trident') != -1)) {
		ie=true;
		if( navigator.appVersion.indexOf("MSIE 10")!=-1){
			ie10 = true;
		} else	if( navigator.appVersion.indexOf("MSIE 9")!=-1){
			ie9 = true;
		} else if( navigator.appVersion.indexOf("MSIE 8")!=-1){
			ie8 = true;
			/*$('#lasherramientas').css({
				'top' : '-25px'
			});*/
		} else {
			ie11 = true;
		}
		
	}
	
	if(navegador.indexOf('Android') != -1) {
		user_android=true;
	}
	if(navegador.indexOf('iPad') != -1) {
		user_ipad=true;
	}
	if(navegador.indexOf('iPhone') != -1) {
		user_iphone=true;
	}
	
	// estilos radiobutton
	$(".radio").dgStyle();
	
	if(user_mobile){
		clickEvent = "touchstart";
	} else {
		clickEvent = "click";
	}
	/*$('body').bind('touchmove', function() {
		event.preventDefault();
	});*/

});


//////////////////////////////////////////////////////////////////////////////
// parsea XML
//////////////////////////////////////////////////////////////////////////////
var $data_enlaces
var xhttpData
var $xmlEnlaza;
var nEnlaces;
function parseXMLEnlaces(){
	var dataUrl = $('#area_imagen').attr('name');
	dataXmlEvalua = 'contenidos/recursos/'+dataUrl;
		xhttpData=new XMLHttpRequest();
		xhttpData.open("GET",dataXmlEvalua,false);
		xhttpData.setRequestHeader('Content-Type', 'text/xml');
		xhttpData.send("");
		$xmlEnlaza = $(xhttpData.responseXML);
		configEnlaces();
}

function configEnlaces(){
	var ruta="contenidos/recursos/"
	var borde;
	var direccion;
	var clase_dir;
	var enlaces_ar = new Array();
	var anchos_ar = new Array();
	var tipo_enlace_ar = new Array();
	var datos_enlace_ar = new Array();
	$xmlEnlaza.find('areas_enlace').each(function(){
		borde = $(this).attr('borde');
		direccion = $(this).attr('orientacion');
	});
	$xmlEnlaza.find('area').each(function(s){
		anchos_ar.push($(this).find('ancho').text());
		tipo_enlace_ar.push($(this).find('tipo_enlace').text());
		datos_enlace_ar.push($(this).find('enlace').text());
	});
	/////////////////////////////////////////////////////////////////////
	if(direccion == "v"){
		clase_dir = "divide_vertical";
	} else if(direccion == "h"){
		clase_dir = "divide_horizontal";
	} 
	/////////////////////////////////////////////////////////////////////
	tipo_enlace_ar.each(function(indice,valor) {
		if(indice == "popup"){
			$('#area_imagen').append('<a id="enlace_'+valor+'" class='+clase_dir+' href=javascript:abrepopup("'+datos_enlace_ar[valor]+'")><div  class="area_imagen_a"></div></a>');
		} else if(indice == "modal"){
			$('#area_imagen').append('<a id="enlace_'+valor+'" class='+clase_dir+' href=javascript:openModal("'+datos_enlace_ar[valor]+'");><div  class="area_imagen_a"></div></a>');
		} else if(indice == "url"){
			$('#area_imagen').append('<a id="enlace_'+valor+'" class='+clase_dir+' href="'+datos_enlace_ar[valor]+'" target="_blank"><div  class="area_imagen_a"></div></a>');
		} else if(indice == "pdf"){
			$('#area_imagen').append('<a id="enlace_'+valor+'" class='+clase_dir+' href="'+ruta+datos_enlace_ar[valor]+'" target="_blank"><div  class="area_imagen_a"></div></a>');
		} else if(indice == "vacio"){
			$('#area_imagen').append('<a id="enlace_'+valor+'" class='+clase_dir+'><div  class="area_imagen_a"></div></a>');
				$('#area_imagen').find('#enlace_'+valor).each(function (){
					$(this).removeAttr("href");
				});
		}
	});
	if(borde == "si"){
			$('#area_imagen').find('.area_imagen_a').each(function(s){
				$(this).addClass('area_con_borde');
			});
		} else {
			$('#area_imagen').find('.area_imagen_a').each(function(s){
				$(this).addClass('area_sin_borde');
			});
		}
		if(direccion == "v"){
			$('#imagen').find('.area_imagen_a').each(function(s){
				$(this).css({
						'width': anchos_ar[s]+'px',
						'height' : '478px'
				});			
			});
		} else if(direccion == "h"){
			$('#imagen').find('.area_imagen_a').each(function(s){
				$(this).css({
						'width': '722px',
						'height' : anchos_ar[s]+'px'
				});			
			});
		} 

}

// quitamos margenes
function fImagen(){
	var datosImg_ar = new Array();
	
	$('#elcuerpo').css({'padding': '0'});
	
	// areas de enlace 
	
	if($('#imagen').find('#area_imagen').length>0){
		parseXMLEnlaces();
			
	}
}

// ponemos margenes
function fnoImagen(){
	$('#elcuerpo').css({'padding': '14px'});
}

// boton flotante
function fboton_flotante(){
	var datosBoton_ar = new Array();
	var posicionX_ar = new Array();
	var posicionY_ar = new Array();
	var enlace_ar = new Array();
	var tipo_ar = new Array();
	var conte_ar = new Array();
	var tipoconte_ar = new Array();
	var ndatos = new Array();
	$('#elcuerpo').find('.boton_flotante').each(function(s){
		//datosBoton_ar = $(this).attr('name').split(",");
		datosBoton_ar.push($(this).attr('name'));
	});
	
	datosBoton_ar.each(function(indice,valor) {
		ndatos = indice.split(",");
		tipo_ar.push(ndatos[0]);
		enlace_ar.push(ndatos[1]);
		posicionX_ar.push(ndatos[2]);
		posicionY_ar.push(ndatos[3]);
		conte_ar.push(ndatos[4]);
		tipoconte_ar.push(ndatos[5]);
	});

	
	$('#elcuerpo').find('.boton_flotante').each(function(n){
		$(this).css({
				'left': posicionX_ar[n]+'px',
				'top': posicionY_ar[n]+'px'
		});
		
	//	$(this).find('img').click(function(){
		$(this).find('img').bind(clickEvent,function(){
			//alert(enlace_ar[n]);
			if(tipo_ar[n]=="popup"){
				abrepopup(enlace_ar[n]);
			} else if(tipo_ar[n]=="url"){
				// enlaces externos
				openUrl(enlace_ar[n]);
			} else if(tipo_ar[n]=="pdf"){
				// pdf
				openPdf(enlace_ar[n]);
			} else if(tipo_ar[n]=="modal"){
				// modal
				openModal(enlace_ar[n],conte_ar[n],tipoconte_ar[n]);
			} else if(tipo_ar[n]=="div_flotante"){
				// div flotante
				navega_div_flotante = true;
				fveodiv_flotante(enlace_ar[n]);
			}
		});
	});
	
}

// botón popup
function fboton_extra(){
	$('#elcuerpo').find('.boton_extra').each(function(n){
		//$(this).find('img').click(function(){
		$(this).find('img').bind(clickEvent,function(){
			//alert($(this).attr('name'));
			var data_boton = $(this).parent().attr('name').split(',');
			if(data_boton[0]=="popup"){
				abrepopup(data_boton[1]);
			} else if(data_boton[0]=="url"){
				// enlaces externos
				openUrl(data_boton[1]);
			} else if(data_boton[0]=="pdf"){
				// pdf
				openPdf(data_boton[1]);
			} else if(data_boton[0]=="modal"){
				// modal
				openModal(data_boton[1],data_boton[2],data_boton[3]);
			}
		});
		//
		
	});
}


// popup
var himg;
function creaPopup(){
	himg = false;
	$('#elcuerpo').find('.ventana_popup').each(function(n){
		$(this).append('<div class="fondoPopup"></div>');
		var data_popup = new Array();
		data_popup = [];
		if($(this).attr('name')){
			data_popup = $(this).attr('name').split(',');
		}
		var alto;
		$(this).find('.contenido_popup').each(function(){
			$(this).find('p').each(function(){
				$(this).css({
					'text-align'	:	'left'
				});
			});
			himg = false;
			if($(this).find('img').length>0){
				himg = true;
			}
			$(this).find('img').each(function(s){
					var idVentana2 = $(this).parent().parent().attr('id');
					$(this).attr('id','img_'+idVentana2);
					$(this).attr('class','img_popup');
					var cargaImg = $(this).attr('src');
					
					$(this).load(function(){
					//$(this).attr('src', cargaImg).load(function() {
						var idVentana = $(this).parent().parent().attr('id');
						var idImg = $(this).attr('id');
						var dd = $(this).parent().outerHeight();
						colocaPopup(idImg,dd);
					});
					
			});
			if(!himg){
				alto = $(this).outerHeight()+25;
				//	$(this).parent().hide();
			}
			alto = $(this).outerHeight()+25;
		});	
		
		//if(!himg){	
			$(this).css({
				'height': alto+'px'
			});
			
			if(!himg){
					$(this).hide();
			}


			// ext_popup
			//$(this).append('<img id="ext_popup'+n+'" class="ext_popup" src="contenidos/img/pico.png"/>');
		//	$(this).find('#ext_popup'+n).css({
			//			'top' : (alto-50)+'px'
			//});
			// cerrar
			$(this).append('<img class="boton_cerrar_popup" src="contenidos/img/btCerrarPopup.png"/>');
			//$(this).find('.boton_cerrar_popup').click(function(){$(this).parent().fadeOut(100);});
			$(this).find('.boton_cerrar_popup').bind(clickEvent,function(){$(this).parent().fadeOut(100);});
			
			
		//}
		
		/*******************************************************************/
		if(data_popup.length>0){
			$(this).css({
				'top' : data_popup[1]+'px',
				'left' : data_popup[0]+'px',
				'width' : data_popup[2]+'px',
				'height' : data_popup[3]+'px'
			});
			$(this).find('.contenido_popup').css({
				'width' : Math.round(Number(data_popup[2])-100)+'px'
			});
			$(this).find('.fondoPopup').css({
				'width' : data_popup[2]+'px',
				'height' : data_popup[3]+'px'
			});
			$(this).find('.boton_cerrar_popup').css({
				'left' : Math.round(Number(data_popup[2])-30)+'px'
			});
		}
		/*******************************************************************/
		var data_children = new Array();
		$(this).find('.contenido_popup').children().each(function(){
			data_children = [];
			if($(this).attr('name')){
				data_children = $(this).attr('name').split(',');
				if(($(this).get(0).tagName=="ul")||($(this).get(0).tagName=="UL")){
					$(this).css({
						'margin'	:	'0',
						'padding'	:	'0'
					});
					$(this).find('li').each(function(){
						$(this).css({
							'text-align'	: 'left',
							'margin'	:	'0',
							'padding'	:	'10px 0 0 15px'
						});
					});
				}
				if(data_children[2]){
					$(this).css({
						'position'	:	'absolute',
						'text-align'	: 'left',
						'top'	:	data_children[1]+'px',
						'left'	:	data_children[0]+'px',
						'width'	:	data_children[2]+'px'
					});
				} else {
					$(this).css({
						'position'	:	'absolute',
						'top'	:	Number(data_children[1])+'px',
						'left'	:	Number(data_children[0])+'px'
					});
				}
			}
		});
		
		if(data_popup[4]){	
			$(this).prepend('<img id="bocata_'+(n+1)+'" src="'+data_popup[4]+'"/>');
			//257 - 52
			$(this).find('#bocata_'+(n+1)).css({
				'position'	:	'absolute',
				'top'	:	data_popup[6]+'px',
				'left'	:	data_popup[5]+'px'
			});
		}
	});
}

function colocaPopup(data,dalto){
	var newHeight;
	var idVentana = $('#'+data).parent().parent().attr('id');
	var nVentana = idVentana.slice(idVentana.length-1,idVentana.length);
	$('#'+idVentana).css({
		'height': dalto+'px'
	});
	
	// img
	if(!$('#'+idVentana).find('img').attr('name')){	
		$('#'+idVentana).find('.img_popup').css({
			'position' : 'relative',
			'left' : (($('#'+idVentana).find('.fondoPopup').outerWidth()-$('#'+idVentana).find('.img_popup').outerWidth())/2)-30+'px'
		});
	}

	$('#'+idVentana).hide();

}

/*function creaPopup(){
	himg = false;
	$('#elcuerpo').find('.ventana_popup').each(function(n){
		$(this).append('<div class="fondoPopup"></div>');
		var alto;

		$(this).find('.contenido_popup').each(function(){
			if($(this).find('img').length>0){
				himg = true;
			}
			$(this).find('img').each(function(s){
					var idVentana2 = $(this).parent().parent().attr('id');
					$(this).attr('id','img_'+idVentana2);
					$(this).attr('class','img_popup');
					var cargaImg = $(this).attr('src');

					$(this).load(function(){
					//$(this).attr('src', cargaImg).load(function() {
						var idVentana = $(this).parent().parent().attr('id');
						var idImg = $(this).attr('id');
						var dd = $(this).parent().outerHeight();
						
						colocaPopup(idImg,dd);
					});
			});
			if(!himg){
				alto = $(this).outerHeight()+25;
			}
			alto = $(this).outerHeight()+25;
		});	
		
		if(!himg){	
			$(this).css({
						'height': alto+'px'
				});


			// ext_popup
			//$(this).append('<img id="ext_popup'+n+'" class="ext_popup" src="contenidos/img/pico.png"/>');
			//$(this).find('#ext_popup'+n).css({
			//			'top' : (alto-50)+'px'
			//});
			// cerrar
			$(this).append('<img class="boton_cerrar_popup" src="contenidos/img/btCerrarPopup.png"/>');
			//$(this).find('.boton_cerrar_popup').click(function(){$(this).parent().fadeOut(100);});
			$(this).find('.boton_cerrar_popup').bind(clickEvent,function(){$(this).parent().fadeOut(100);});
			$(this).hide();
		}
	});
}


function colocaPopup(data,dalto){
	var newHeight;
	var idVentana = $('#'+data).parent().parent().attr('id');
	var nVentana = idVentana.slice(idVentana.length-1,idVentana.length);
	$('#'+idVentana).css({
		'height': dalto+'px'
	});

	// pajarita
	$('#'+idVentana).append('<img id="pajarita'+nVentana+'" class="pajarita" src="contenidos/img/hoja_popup.png"/>');
	$('#'+idVentana).find('#pajarita'+nVentana).css({
			'top' : (dalto-20)+'px'
	});
	// cerrar
	$('#'+idVentana).append('<img class="boton_cerrar_popup" src="contenidos/img/btCerrarPopup.png"/>');
	$('#'+idVentana).find('.boton_cerrar_popup').bind(clickEvent,function(){$(this).parent().fadeOut(100);});
	
	// img
	$('#'+idVentana).find('.img_popup').css({
		'position' : 'relative',
		'left' : (($('#'+idVentana).find('.fondoPopup').outerWidth()-$('#'+idVentana).find('.img_popup').outerWidth())/2)-30+'px'
	});

	$('#'+idVentana).hide();

}*/


function abrepopup(data){
	cierrapoup();
	$('#'+data).fadeIn(200);
}

function cierrapoup(){
	$('#elcuerpo').find('.ventana_popup').each(function(){
		$(this).hide();
	});
}

function openPdf(data){
	var ruta="contenidos/recursos/";
	window.open(ruta+data);
}

function openUrl(data){
	window.open(data);
}

function creaVideoYTB(){
	var ancho_ytb = $('#video').find('iframe').attr('width');
	var alto_ytb = $('#video').find('iframe').attr('height');
	var posx = Math.round((720-ancho_ytb)/2);
	var posy = Math.round((470-alto_ytb)/2);

	$('#video').css({
			'left' : posx+'px',
			'top' : posy+'px'
	});
}

//var archivoVideoSwf;
function creaVideo(){
	var data_video = new Array();
	var data_video = $('#player_video').attr('name').split(',');
	var path_video = data_video[0];
	var ancho_video = data_video[1];
	var alto_video = data_video[2];
	
	var rnd=Math.ceil(Math.random()*1000);
	
	if(user_navegador=="chrome"){
		$('#player_video').append('<video id="playerVideo'+rnd+'" class="video-js vjs-default-skin" controls preload="none" width="'+ancho_video+'" height="'+alto_video+'" poster="contenidos/recursos/'+path_video+'.jpg"><source src="contenidos/recursos/'+path_video+'.webm" type="video/webm" /><source src="contenidos/recursos/'+path_video+'.mp4" type="video/mp4"/><source src="contenidos/recursos/'+path_video+'.ogv" type="video/ogg"/></video>');
	} else {
		$('#player_video').append('<video id="playerVideo'+rnd+'" class="video-js vjs-default-skin" controls preload="auto" width="'+ancho_video+'" height="'+alto_video+'" poster="contenidos/recursos/'+path_video+'.jpg"><source src="contenidos/recursos/'+path_video+'.mp4" type="video/mp4" /><source src="contenidos/recursos/'+path_video+'.ogv" type="video/ogg" /><source src="contenidos/recursos/'+path_video+'.webm" type="video/webm" /></video>');
	}
	


	if(!ie8){		
		vjs("playerVideo"+rnd).ready(function() {
			//var myPlayer = vjs("playerVideo"+rnd);
		});	

		$('#playerVideo'+rnd).find('.vjs-controls').css({
		//////	'position' : 'absolute',
			/////'width' : $('#playerVideo'+rnd).outerWidth()+'px',
			/////'top' : ($('#playerVideo'+rnd).outerHeight()+15)+'px',
			'background-color' : '#00455b'
		});
	}
	
	/****************************************/
	if(ie8){
		loadVideo_swf(path_video);
	}
	/****************************************/
	var posx = Math.round((720-ancho_video)/2);
	var posy = Math.round((470-alto_video)/2);
	$('#player_video').css({
			'left' : posx+'px'
	});
	
	/****************************************/
	//alert($('#player_video').find('.vjs-default-skin .vjs-control-bar ').html());
	$('#player_video').find('.vjs-fullscreen-control').bind(clickEvent,function(){
		if($('#player_video').find('.vjs-control-bar').width()<700){
			// pequeño - grande
			$('#player_video').find('.vjs-default-skin .vjs-control-bar ').css({
				'bottom' : '0px'
			});
		} else {
			// grande - pequeño
			$('#player_video').find('.vjs-default-skin .vjs-control-bar ').css({
				'bottom' : '-40px'
			});
		}
	});
	
}


function loadVideo_swf(pathv){
	$('#player_video').append('<div id="content_flash"></div>');
			$('#content_flash').flash({
				swf: 'contenidos/img/video/video.swf',
				width: 600,
				height: 340,
				AllowScriptAccess:	true,
				flashvars: {
					path_video	:	'../../recursos/'+pathv+'.mp4'
				},
				params: {wmode: 'opaque'}
			});
			
			$('#content_flash').css({
               position:'absolute'
			});
			
}

/************************************************************/

var nFotos;
var nItem;

var posx_fotosGlobal_ar = new Array();


var diff = 0;
var diff_finger;

function creaGaleria(){
	/********** loading *********************************/
	$('#elcuerpo').prepend('<div id="loading"><img src="contenidos/img/ajax-loader.gif"/></div>');
	$('#loading').css({
		'position':'absolute',
		'width':'100%',
		'height':'100%',
		'display':'block',
		'z-index':'100',
		'left': '50%',
		'top' : '50%'
	});
	//240 / 360
	//alert($('#loading').position().top+" / "+$('#loading').position().left);

	/********************************************************/
	var posx_fotos_ar = new Array();
	var posx2_fotos_ar = new Array();
	var anchoTotal = 723;
	nFotos = $('#galeria_fotos').find('img').length;
	nItem = 0;
	var width = $('#galeria_fotos').outerWidth();
	var left;
	var dif;
	var posIni;
	var posFin;
	posIni = $('#galeria_fotos').css('left');
	$('#galeria_fotos').parent().append('<div id="navegaFotos"><div id="flechaIzq"><img src="contenidos/img/fotos_fcIzq.png"/></div><div id="flechaDch"><img src="contenidos/img/fotos_fcDch.png"/></div></div>');
	$('#galeria_fotos').css({
			'opacity' : '0.3'
	});
	$('#galeria_fotos').find('img').each(function(s){
		posx_fotos_ar[s] = -anchoTotal*s
		posx2_fotos_ar[s] = anchoTotal*s
		var cimg = $(this).attr("src");
		$('#flechaDch').css({
			'opacity':'0.5'
		});
		$(this).bind('load', function() {   
			var anchoFoto = $(this).outerWidth();
			var altoFoto = $(this).outerHeight();
			var margenI;
			var margenD;
			if(anchoFoto<723){
				margenD = Math.round((anchoTotal-anchoFoto)/2);
				margenI = (anchoTotal-anchoFoto-margenD);
			} else {
				margenD = 0;
				margenI = 0;
			}
			
			if(altoFoto>460){
				$('#galeria_fotos').css({
					'top' : '0px'
				});
			}
			
			
			 $(this).css({
					'margin-left' : margenI+'px',
					'margin-right' : margenD+'px',
					'left' : posx2_fotos_ar[s]+'px',
					'display' : 'inline'
			});		
			if(s==(nFotos-1)){
					/************** loading ***************/
					$('#loading').hide();
					/****************************************/
					$(this).parent().css({
						'opacity' : '1'
					});
					$('#flechaDch').css({
						'opacity':'1'
					});
			}			
		}).attr('src', cimg);   
	
	});
	posx_fotosGlobal_ar = new Array();
	posx_fotosGlobal_ar = posx_fotos_ar;

	
	if(user_ipad||user_android||user_iphone){
	/********************** amplia ****************************************/
	/*$('#elcuerpo').prepend('<div id="bt_open"><img src="contenidos/iconos/icoAmplia_img.gif"/></div>');
	$('#elcuerpo').prepend('<canvas id="img_canvas"></canvas>');*/
	/*******************************************************************************/
	//$('#elcuerpo').prepend('<div id="test" style="position:absolute; top:0; left:400px;"><p>test</p></div>');
	
	touchslider.createSlidePanel('#galeria_fotos', 500, 15);		
	
	/********************** amplia ****************************************/
	/*$('#bt_open').bind(clickEvent,function(){
		$('#img_canvas').css({
				'display' : 'block'
		});
	});

		$('body').bind('pinch pinchopen',function(){
			$('#img_canvas').css({
				'display' : 'block'
			});
		});
		
		
		$('#img_canvas').bind('pinchclose',function(){
			$('#img_canvas').css({
				'display' : 'none'
			});
		});*/
	/*******************************************************************************/
	}

	
	fnavega_flechas();
	

	//flechaIzq
	if(user_mobile==true){
		//flechaIzq
		$('#flechaIzq').bind("touchstart",function(){
			if(nItem>0){
				nItem--;				
				touchslider.doSlide($('#galeria_fotos'), posx_fotosGlobal_ar[nItem], '0.5s');
				fnavega_flechas();
			} 
		});
		
		//flechaDch
		$('#flechaDch').bind("touchstart",function(){
			if(nItem<nFotos){
				nItem++;
				touchslider.doSlide($('#galeria_fotos'), posx_fotosGlobal_ar[nItem], '0.5s');
				fnavega_flechas();
			}
		});
	} else {
		//flechaIzq
		$('#flechaIzq').click(function(){
			if(nItem>0){
				nItem--;
				
				$('#galeria_fotos').animate({
					  left: posx_fotos_ar[nItem]
				}, 500, "linear");
				fnavega_flechas();
			} 
		});
		
		//flechaDch
		$('#flechaDch').click(function(){
			if(nItem<nFotos){
				nItem++;
				$('#galeria_fotos').animate({
					 left: posx_fotos_ar[nItem]
				},500, "linear");
				fnavega_flechas();
			}
		});
	}
	
	// android
	if((user_android)&&($(window).height()<500)){
		$('#navegaFotos').css({
			'top' : '10px'
		});
		
		$('#galeria_fotos').css({
			'top' : '65px'
		});
	}
}


function fnavega_flechas(){
	$('#flechaIzq').removeClass('flecha_desactivada');
	$('#flechaDch').removeClass('flecha_desactivada');
	$('#flechaIzq').addClass('flecha_activada');
	$('#flechaDch').addClass('flecha_activada');
	
	if(nItem==0){
		$('#flechaIzq').addClass('flecha_desactivada');
		$('#flechaIzq').removeClass('flecha_activada');
	}
	
	if(nItem==(nFotos-1)){
		$('#flechaDch').addClass('flecha_desactivada');
		$('#flechaDch').removeClass('flecha_activada');
	}
}



// ayuda
var nId;
function fayuda(){
	// COLOCA POPUPS
	// INTERFAZ
	var posPopups_ar = new Array();
	
	$('#conteInterfaz').find('.ayd_ico').each(function(s){
		posPopups_ar.push(($(this).position().left)+60);
	});
	//alert($('#conteAyuda').find('.ayd_ico').position().left);
	$('#conteInterfaz').find('.explica_ayuda').each(function(n){
		var posIc = $(this).parent().position().top;
		
		//var nposicion = $(this).parent().position().left+60;
		var nposicion = posPopups_ar[n];
		//alert($(this).height());
		if(nposicion>430){
			nposicion = 433;
		}
		$(this).css({
			'left' : nposicion+'px',
			'top' : Math.round((posIc-$(this).height())-5)+'px'
		});
		$(this).append('<img class="cierre_ayuda" src="contenidos/img/btcierre_ayuda.png"/>');
		
	});
	// NAVEGACION
	$('#conteNavegacion').find('.explica_ayuda').each(function(d){
		$(this).css({
			'left' : '190px',
			'top' : '330px'
		});
		$(this).append('<img class="cierre_ayuda" src="contenidos/img/btcierre_ayuda.png"/>');
	});
	
	
	/////////////////////////
	
	//$('#conteAyuda').find('#ic_ayuda_interfaz').each(function(){
	$('#ayuda').find('#conteAyuda').each(function(){
		$(this).find('.ayd_ico').each(function(){
			//$(this).click(function(){
			$(this).bind(clickEvent,function(){
				if(nId == undefined){
					nId = $(this).attr('id').slice(($(this).attr('id').indexOf('_')+1), $(this).attr('id').length);
					$('#conteAyuda').find('#exp_'+nId).show();
				}
			});
		});

		
		//$('#conteAyuda').find('.explica_ayuda').each(function(s){
		$(this).find('.explica_ayuda').each(function(s){
			//$(this).find('.cierre_ayuda').click(function(){
			$(this).find('.cierre_ayuda').bind(clickEvent,function(){
				$(this).parent().hide();
				nId = undefined;
			});	
		});
	});

	generaAyuda("interfaz");
}

function generaAyuda(data){
	nId = undefined;
	$('#conteAyuda').find('.explica_ayuda').hide();
	$('#navegaAyuda').find('.menu_ayuda').each(function(){
		$(this).removeClass('menuayuda_seleccionado');
		$(this).addClass('menuayuda_activo');		
	});
	fnavegaAyuda();
	
	if(data == "interfaz"){
		//$('#navegaAyuda').find('interfaz_ayuda').removeClass('menuayuda_activo');
		$('#navegaAyuda').find('#interfaz_ayuda').each(function(){
			$(this).removeClass('menuayuda_activo');
			$(this).addClass('menuayuda_seleccionado');
			$(this).unbind('click');
			$(this).unbind('clickEvent');
		});
		
		$('#navegaAyuda').find('#navegacion_ayuda').each(function(){
			//$(this).click(function(){
			$(this).bind(clickEvent,function(){
				generaAyuda('navegacion');
				$(conteInterfaz).hide();
				$(conteNavegacion).fadeIn(200);
			});
		});
	}
	
	if(data == "navegacion"){
		//$('#navegaAyuda').find('interfaz_ayuda').removeClass('menuayuda_activo');
		$('#navegaAyuda').find('#navegacion_ayuda').each(function(){
			$(this).removeClass('menuayuda_activo');
			$(this).addClass('menuayuda_seleccionado');
			$(this).unbind('click');
			$(this).unbind('clickEvent');
		});
		
		$('#navegaAyuda').find('#interfaz_ayuda').each(function(){
			$(this).click(function(){
				generaAyuda('interfaz');
				$(conteInterfaz).fadeIn(200);
				$(conteNavegacion).hide();
			});
		});
	}
}

function fnavegaAyuda(){
	$('#navegaAyuda').find('.menu_ayuda').each(function(){
		$(this).click(function(){
			generaAyuda($(this).attr('id'));
		});
	});
}


/**************** ENLACE LISTADOS ***********************/
function openListado(){
	var datosList_ar = new Array();
	var enlace_ar = new Array();
	var tipo_ar = new Array();
	var ndatos = new Array();
	$('#enlaces_list').find('li').each(function(){
		datosList_ar.push($(this).attr('name'));
	});
	
	datosList_ar.each(function(indice,valor) {
		ndatos = indice.split(",");
		tipo_ar.push(ndatos[0]);
		enlace_ar.push(ndatos[1]);
	});
	
	$('#enlaces_list').find('li').each(function(n){
		$(this).append('<p class="numeracion_listado">'+(n+1)+'</p>');
		$(this).click(function(){	
			if(tipo_ar[n]=="popup"){
				abrepopup(enlace_ar[n]);
			} else if(tipo_ar[n]=="url"){
				// enlaces externos
				openUrl(enlace_ar[n]);
			} else if(tipo_ar[n]=="pdf"){
				// pdf
				openPdf(enlace_ar[n]);
			} else if(tipo_ar[n]=="modal"){
				// modal
				openModal(enlace_ar[n]);
			}
		});
	});
}

/**************** DIV FLOTANTE ***********************/

function fdiv_flotante(){
	navega_div_flotante = false;
	var dataDiv_ar = new Array();
	var ndatos = new Array();
	var posX_ar = new Array();
	var posY_ar = new Array();
	var id_first;
	
	$('#elcuerpo').find('.div_flotante').each(function(){
		dataDiv_ar.push($(this).attr('name'));
	});
	
	dataDiv_ar.each(function(indice,valor) {
		ndatos = indice.split(",");
		posX_ar.push(ndatos[0]);
		posY_ar.push(ndatos[1]);
	});
	
	$('#elcuerpo').find('.div_flotante').each(function(s){
		$(this).css({
			'left' : posX_ar[s]+'px',
			'top' : posY_ar[s]+'px',
			'width' : Math.round(690-posX_ar[s])+'px'
		});
		
	});
	
	id_first = $('#elcuerpo').find('.div_flotante').first().attr('id');
	//fveodiv_flotante(id_first);
}

function fveodiv_flotante(data){
	if(navega_div_flotante){
		$('#elcuerpo').find('#call').fadeOut(200);
	}
	$('#elcuerpo').find('.div_flotante').each(function(){
		$(this).fadeOut(200);
	});
	$('#'+data).delay(200).fadeIn(200);
}

/**************** CALL ***********************/

function fcall(){
	var dataDiv_ar = new Array();
	var ndatos = new Array();
	var posX_ar = new Array();
	var posY_ar = new Array();
	
	$('#elcuerpo').find('#call').each(function(){
		dataDiv_ar.push($(this).attr('name'));
	});
	
	dataDiv_ar.each(function(indice,valor) {
		ndatos = indice.split(",");
		posX_ar.push(ndatos[0]);
		posY_ar.push(ndatos[1]);
	});
	
	$('#elcuerpo').find('#call').each(function(s){
		$(this).css({
			'left' : posX_ar[s]+'px',
			'top' : posY_ar[s]+'px'
		});
		
	});
}

/**************** TEXTO CON IMAGEN ***********************/

function fTexto_imagen(){
	var dataDiv_ar = new Array();
	var ndatos = new Array();
	var posX_ar = new Array();
	var posY_ar = new Array();
	var anchoTexto_ar = new Array();
	
	$('#elcuerpo').find('.texto_imagen').each(function(){
		dataDiv_ar.push($(this).attr('name'));
	});
	
	dataDiv_ar.each(function(indice,valor) {
		ndatos = indice.split(",");
		posX_ar.push(ndatos[0]);
		posY_ar.push(ndatos[1]);
		var ancho_texto;
		if(ndatos[2]){
			ancho_texto = ndatos[2];
		} else {
			$.each(posX_ar,function(ind,vlr){
				if(vlr>0){
					ancho_texto = Math.round(690-posX_ar[ind]);
				} else {
					ancho_texto = 690;
				}
			});
		}
		anchoTexto_ar.push(ancho_texto);
	});
	
	$('#elcuerpo').find('.texto_imagen').each(function(s){
		$(this).css({
			'left' : posX_ar[s]+'px',
			'top' : posY_ar[s]+'px',
			'width' : anchoTexto_ar[s]+'px'
		});
		
		if($(this).parent().attr('class') == "div_flotante"){
			var position_div_ar = $(this).parent().attr('name').split(',');
			var dif_width = Number(posX_ar[s])+Number(position_div_ar[0]);
			var ancho_tx = 660 - dif_width;
			$(this).css({
				'margin' : '0px',
				'width' : ancho_tx+'px'
			});
		}
		/*var ancho_texto;
		if(posX_ar[s]>0){
			ancho_texto = Math.round(690-posX_ar[s]);
		} else {
			ancho_texto = 690;
		}
		$(this).css({
			'left' : posX_ar[s]+'px',
			'top' : posY_ar[s]+'px',
			'width' : ancho_texto
		});
		
		if($(this).parent().attr('class') == "div_flotante"){
			var position_div_ar = $(this).parent().attr('name').split(',');
			var dif_width;
			if(posX_ar[s]>=0){
				dif_width = Number(posX_ar[s]-Number(position_div_ar[0]));
			} else {
				dif_width = Number(posX_ar[s])+Number(position_div_ar[0]);
			}

			var ancho_tx;
			if(dif_width>=0){
				ancho_tx = 660-dif_width;
			} else {
				ancho_tx = 660+dif_width;
			}
				
			$(this).css({
				'margin' : '0px',
				'width' : ancho_tx+'px'
			});
		}*/

	});
}


function comprueba_listado_textoImagen(){
	var dataDiv_ar = new Array();
	var ndatos = new Array();
	var posX_ar = new Array();
	var posY_ar = new Array();
	
	$('#elcuerpo').find('.texto_imagen').each(function(){
		dataDiv_ar.push($(this).attr('name'));
	});
	
	dataDiv_ar.each(function(indice,valor) {
		ndatos = indice.split(",");
		posX_ar.push(ndatos[0]);
		posY_ar.push(ndatos[1]);
	});
	
	$('#elcuerpo').find('.texto_imagen').each(function(s){
		var ancho_texto;
		if(posX_ar[s]>0){
			ancho_texto = Math.round(690-posX_ar[s]);
		} else {
			ancho_texto = 690;
		}
		$(this).children().each(function(){
			if($(this).attr('id')=='lista_pestanias'){
				var n_pestanias_tx = $(this).find('li').length;
				var ancho_pestanias_tx;
				ancho_pestanias_tx = ((ancho_texto-40)/n_pestanias_tx)-(n_pestanias_tx*8)
				$(this).find('li').each(function(){			
					$(this).find('a').each(function(){
						$(this).css({
							'width': ancho_pestanias_tx+'px'
						});
					});					
				});
			}
		});
	});
}

/**************** HERRAMIENTA GALERÍA ***********************/

var herramientaGaleriaTM = false;

function activagallery(){
//alert(pagina_actual);
	herramientaGaleriaTM = true;
	openModal("../img/galeria_mux.html");
}

function closeGallery(){
	herramientaGaleriaTM = false;
	callpage2(pagina_actual);
}
