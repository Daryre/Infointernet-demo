$(document).ready(function(){
	//parseXML_Ex();
});
 
//////////////////////////////////////////////////////////////////////////////
// parsea XML
//////////////////////////////////////////////////////////////////////////////

function configSelect_Drag(){
	// desactivo la posibilidad de escala en tablets
	$('body').bind('touchmove', function(e){
		e.preventDefault();
	});
	// construyo el DOM
	$('#elcuerpo').prepend('<div id="imagen" class="contenido_imagen"><img src="contenidos/img/fondo_drag.jpg"/></div>');
	$('#select_drag').addClass('contenido_imagen');	
	$('#select_drag').append('<div id="tapa"></div>');
	$('#select_drag').append('<div id="instrucciones"></div>');
	$('#select_drag').append('<div id="selecciona"></div>');
	$('#select_drag').append('<div id="arrastra"></div>');
	// parseo XML
	parseXML_Ex();
}

var xhttpExercise;
var dataXmlEx;
var $xmlEx;
var nEx;
 
var n_area;
var total_area;
var n_selecciona;
var total_selecciona;
var total_ex;
var n_ex;
var enunciado;

var time_feed;

function parseXML_Ex(){
	var dataTest = $('#select_drag').attr('name');
	enunciado = $('#select_drag').attr('rel');
	var nombreTest = 'xml'+dataTest.slice(0,dataTest.indexOf('.'));
	if(window.location.protocol == 'file:') {
		var response;
			if (window.DOMParser)
			{
				parser=new DOMParser();
				response=parser.parseFromString(myObj[nombreTest],"text/xml");

			}
			else // Internet Explorer
			{
				response=new ActiveXObject("Microsoft.XMLDOM");
				response.async=false;
				response.loadXML(myObj[nombreTest]); 
			}
			
			$xmlEx = $(response);
	
	} else {
		dataXmlEx = 'contenidos/recursos/'+dataTest;
		xhttpExercise=new XMLHttpRequest();
		xhttpExercise.open("GET",dataXmlEx,false);
		xhttpExercise.setRequestHeader('Content-Type', 'text/xml');
		xhttpExercise.send("");
		$xmlEx = $(xhttpExercise.responseXML);
	}

	nEx = $xmlEx.find('target').length;
	config_secciones();
}

//////////////////////////////////////////////////////////////////////////////

var select_ar;
var acierta_target;
var ntarget_seleccionadas;
var ntarjetas_total_select;
var nGraficos;
var graficos_ar;
var idgraficos_ar;
var nseccion;

var secciones_ar;

var feed_obj={};
var coord_obj={};

var data_obj={};
 
var tarjeta;
 
 function config_secciones(){
	
	/***********  INICIA  *************************/
	nseccion = 0;
	n_area = 0;
	n_selecciona = 0;
	n_ex = 0;
	secciones_ar = new Array();
	select_ar = new Array();
	feed_obj={}
	coord_obj={}
	data_obj={}
	time_feed = 2000;
	/********************************************/
	
	$xmlEx.find('drag_selection').each(function(){
		$(this).children().each(function(c){
			if(c>1){
				secciones_ar.push($(this)[0].tagName)
			}
			
		});
		
	});
	total_ex = secciones_ar.length;
	$('#select_drag').append('<div id="botones"><div id="btComprueba_drag"><img src="contenidos/img/bt_comprueba_drag.png"/></div><div id="btSiguiente_drag"><img src="contenidos/img/bt_siguiente_drag.png"/></div></div>');
	$('#select_drag').append('<div id=feedback_select><div id="fondo"></div><div id="popup_drag"><div id="textos_drag"><p id="titulo_popup"></p><p id="texto_popup"></p></div></div></div>');
	
	$xmlEx.find('texto_popups').children().each(function(d){
		feed_obj["feed_tit_"+(d+1)]=$(this).find('titulo_feed').text();
		feed_obj["feed_txt_"+(d+1)]=$(this).find('texto_feed').text();	
	});
	fdefine_seccion(nseccion);
 }
 
 function fdefine_seccion(data){
	if(n_ex < total_ex){
		$('#instrucciones').children().remove();
		$('#selecciona').children().remove();
		$('#arrastra').children().remove();
		if(secciones_ar[data]=="selection"){	
			config_selecciona();
		} else if(secciones_ar[data]=="drag"){	
			config_arrastra();
		}	
	} else{
		$('#titulo_popup').text(feed_obj["feed_tit_5"]);
		$('#texto_popup').text(feed_obj["feed_txt_5"]);
		muestrafeed_final();
	}
 }
 
 /****************************************************************************************************************/
 
 function config_selecciona(){
	total_selecciona = $xmlEx.find('selection').length;
	nseccion++;
	$('#selecciona').addClass("selecciona_drag");

	nGraficos = $xmlEx.find('data_grafico').length;
	ntarget_seleccionadas = 0;
	graficos_ar = new Array();
	idgraficos_ar = new Array();
	acierta_target = false;
	$xmlEx.find('data_grafico').each(function(){
		graficos_ar.push($(this).text());
		idgraficos_ar.push($(this).attr('id'));
	});
	$('#btComprueba_drag').show();

	var nimg_carga;
	$xmlEx.find('selection').each(function(n){
		if(n_selecciona==n){
			ntarjetas_total_select = $(this).attr('ntarjetas');
			$('#instrucciones').append('<div id="instrucciones_select"><div class="numeros"><p>'+enunciado+Number(n_ex+1)+'.</p></div><div class="text_in"><p>'+$(this).find('instrucciones_txt').text()+'</p></div></div>');
			$(this).find('target').each(function(s){
				$('#selecciona').append('<div id="opc_'+s+'" class="opciones"><input type="image" class="noseleccionado" id="tarjeta_"'+s+' value="'+$(this).attr('value')+'" src="'+$(this).find('img_target').text()+'"/></div>');
			});	
			nimg_carga = $('#selecciona').find('input').length;
			$('#selecciona').find('input').each(function(dd){
			
				$(this).bind('load',function(){
					if(dd==Math.round(nimg_carga-1)){
						$('#tapa').animate({
							opacity: '0'
						},300, function(){
							$('#tapa').hide(0);
						});
					}
				});
			});
		}
	});

	
	$xmlEx.find('target').each(function(s){
		$('#selecciona').append('<div id="opc_'+s+'" class="opciones"><input type="image" class="noseleccionado" id="tarjeta_"'+s+' value="'+$(this).attr('value')+'" src="'+$(this).find('img_target').text()+'"/></div>');
	});	

	
	$('#btComprueba_drag').bind(clickEvent,function(){
		if(ntarget_seleccionadas==ntarjetas_total_select){
			acierta_target = true;
			$('#titulo_popup').text(feed_obj["feed_tit_3"]);
			$('#texto_popup').text(feed_obj["feed_txt_3"]);
			$('#selecciona').find('.opciones').each(function(){
				if($(this).find('input').hasClass('seleccionado')){
					if($(this).find('input').attr('value')=="false"){
						acierta_target = false;
						$('#titulo_popup').text(feed_obj["feed_tit_2"]);
						$('#texto_popup').text(feed_obj["feed_txt_2"]);
					} 
				}
			});		
		} else {
			var st=feed_obj["feed_txt_1"];	
			var texto_feed1 = st.replace("numerodetarjetas",ntarjetas_total_select);
			if(ntarjetas_total_select==1){
				texto_feed1 = texto_feed1.substring(0,(texto_feed1.length-1));
			}
			$('#titulo_popup').text(feed_obj["feed_tit_1"]);
			$('#texto_popup').text(texto_feed1);
		}
		
		muestra_feed();
	
	});
	$('#selecciona').css({
		'display' : 'block'
	});
	fselecciona();	
 }
 
 function centra_feed(){
	//alert($('#feedback_select').find('#texto_popup').outerHeight());
	var posYfeedback = Math.round((100-$('#feedback_select').find('#texto_popup').outerHeight())/2);
//	alert(posYfeedback);
	$('#feedback_select').find('#texto_popup').css({
		'margin-top' : posYfeedback+'px'
	});
 }
 
 function muestra_feed(){
	if((n_ex < (total_ex-1))||((n_ex ==(total_ex-1))&&(acierta_target==false))){
		$('#feedback_select').css({
			'opacity' : '0',
			'display' : 'block'
		});
		centra_feed();
		$('#feedback_select').stop().animate({
			opacity: '1'
		},0, function(){
			$(this).delay(time_feed).animate({
				opacity: '0'
			},300, function(){
				$(this).css({
					'display' : 'none'
				});
				if(acierta_target){
					$('#btComprueba_drag').unbind(clickEvent);
					$('#btComprueba_drag').hide();
					n_selecciona++;
					n_ex++;
					$('#tapa').show();
					$('#tapa').animate({
						opacity: '1'
					},0);
					fdefine_seccion(nseccion);
					//config_arrastra();
				}
			});
		});
	} else {
	
			n_selecciona++;
			n_ex++;
			
			fdefine_seccion(nseccion);
	}
 }
 
 
 var obj;
 function fselecciona(){
	$('#selecciona').find('.opciones').each(function(){
		$(this).bind(clickEvent,function(){
			if($(this).find('input').hasClass('noseleccionado')){
				$(this).find('input').removeClass('noseleccionado');
				$(this).find('input').addClass('seleccionado');
				ntarget_seleccionadas++;
			} else {
				$(this).find('input').removeClass('seleccionado');
				$(this).find('input').addClass('noseleccionado');
				ntarget_seleccionadas--;
			}
		});
	});
 }
 
 //////////////////////////////////////////////////////////////////////////////

 
 var posInix;
 var posIniy;
 var posInix2_ar;
 var posInix_ar;
 var posIniy_ar;
 
 function config_arrastra(){
	$('#instrucciones').find('#instrucciones_select').css({
		'display' : 'none'
	});
	$('#selecciona').css({
		'display' : 'none'
	});
	$('#arrastra').css({
		'display' : 'block'
	});

	////////////////// AREA ///////////////////////////////////////
	total_area = $xmlEx.find('drag').length;

	$('#btSiguiente_drag').bind(clickEvent,function(){
		$(this).unbind(clickEvent);
		$(this).hide();
		n_area++;
		n_ex++;
		$('#tapa').show();
					$('#tapa').animate({
						opacity: '1'
					},0);
		fdefine_seccion(nseccion);
	});
	
	farrastra();
 }
 
 var tarjetas_ar;
 var zonas_tarjetas_ar;
 var tarjeta_arrastro;
 var ntarjeta_arrastro;
 var entra_tarjeta = false;
 var numero_tarjetas;
 var numero_tarjetas_colocadas;
 
 var id_area_ar;
 
 var posiIni_img = 80;
 var colocaY;
 var colocaX = 20;
 
 var cord_x_inicial;
 var ancho_total_tarjetas;
 
 
 function farrastra(){
	nseccion++;
	numero_tarjetas_colocadas = 0;

	tarjetas_ar = new Array();
	zonas_tarjetas_ar = new Array();
	id_area_ar = new Array();

	
	////////////////// AREA ///////////////////////////////////////
	
	var posX_ar = new Array();
	var posY_ar = new Array();
	
	//var titulo_feed_individual;
	//var texto_feed_individual;
	
	var id_drag;
	var data_drag="";
	
	
	
	$('#select_drag').find('#instrucciones').children().each(function(){
			if($(this).hasClass('instrucciones_drag_activo')){
				$(this).removeClass('instrucciones_drag_activo');
				$(this).addClass('instrucciones_drag');
			}
		});
	
	$xmlEx.find('drag').each(function(f){
	
		var data_prev_ar = new Array();
		var data_pv = new Array();
		var tarjetas_prev_ar = new Array();
		var posX_prev_ar = new Array();
		var posY_prev_ar = new Array();
		var area_usada_ar = new Array();
		if(f==n_area){
		/********************************************/
			id_drag = $(this).attr('id');
			if(data_obj[id_drag]!=undefined){
				data_drag = data_obj[id_drag];
				$('#arrastra').append('<div id="tarjetas_arrastardas" class="tarjetas_arrastradas"></div>');
				data_prev_ar = data_drag.split("|");
				data_prev_ar.pop();
				$.each(data_prev_ar,function(indice, valor) {
					data_pv = data_prev_ar[indice].split(",");
					tarjetas_prev_ar.push(data_pv[0]);
					posX_prev_ar.push(data_pv[1]);
					posY_prev_ar.push(data_pv[2]);
					area_usada_ar.push(data_pv[3]);
					
					$('#tarjetas_arrastardas').append('<div id=tarjeta_arrastrada_'+indice+'><img src="'+data_pv[0]+'"/></div>');
					$('#tarjetas_arrastardas').find('#tarjeta_arrastrada_'+indice).each(function(){
						$(this).find('img').css({
							'position' : 'absolute',
							'top' : data_pv[2]+'px',
							'left' : data_pv[1]+'px'
						});
					});
				});
			}
			
		/**********************************************/
	
		/**********************************************/
		
			coord_obj={};
			//data_obj["grafico1"]=tarjeta(ruta),posx,posy,area(para desactivar)|tarjeta1,posx,posy,area|
			//buscamos el dato, lo almacenamos en variable y añadimos los nuevos datos cuando se colocan. luego sustituimos el valos del objeto x la variable.
			
			$(this).find('coordenadas').each(function(){
				$(this).find('posiciona').each(function(c){
					coord_obj[$(this).text()]=$(this).attr('positionTarget_x')+','+$(this).attr('positionTarget_y');
				});
			});
			$(this).find('instrucciones').each(function(){
				$('#instrucciones').append('<div id="instrucciones_drag'+f+'" class="instrucciones_drag_activo"><div class="numeros"><p>'+enunciado+Number(n_ex+1)+'.</p></div><div class="text_in"><p>'+$(this).find('instrucciones_txt').text()+'</p></div></div>');
			});
			$('#arrastra').append('<div id="img_background"><img src="'+$(this).find('global_img').text()+'"/></div>');
		
			$(this).find('tarjetas').each(function(){
				$(this).find('img_drag').each(function(){
					zonas_tarjetas_ar.push($(this).attr('id_tarjeta'));
					tarjetas_ar.push($(this).text());
				});
			});
			numero_tarjetas = tarjetas_ar.length;
			
			//id_area_ar
			$(this).find('area').each(function(d){
				id_area_ar[d] = $(this).attr('id_area');
			});
			
			tarjeta = $(this).find('img_drag').text();
			$(this).find('area').each(function(s){
				var areas_drag = new Array();
				$(this).find('add_tarjetas').each(function(){
					$(this).find('add_tarjeta').each(function(){
						areas_drag.push($(this).text());
					});
				});
				/*if(area_usada_ar.length>0){	
					alert(area_usada_ar);	
				}*/
				//$('#arrastra').append('<div id="area'+(s+1)+'" class="drop" name="'+areas_drag+'" value="'+$(this).attr('value')+'"><img src="'+$(this).find('img_area').text()+'"/></div>');
				//$('#arrastra').append('<div id="area'+id_area_ar[s]+'" class="drop" name="'+areas_drag+'" value="'+$(this).attr('value')+'"><img src="'+$(this).find('img_area').text()+'"/></div>');
				$('#arrastra').append('<div id="'+id_area_ar[s]+'" class="drop" name="'+areas_drag+'" value="'+$(this).attr('value')+'"><img src="'+$(this).find('img_area').text()+'"/></div>');
				posX_ar.push($(this).find('position_x').text());
				posY_ar.push($(this).find('position_y').text());
			});
			
			/********* DESACTIVO AREA USADA **************/
			if(area_usada_ar.length>0){	
				//alert(area_usada_ar);
				//alert(posX_ar);
				$.each(area_usada_ar,function(g){
					$('#arrastra').find('.drop').each(function(z){
						if($(this).attr('id')==area_usada_ar[g]){
						//	delete posY_ar[z];
						//	delete posX_ar[z];
							posY_ar.splice(z,1)
							posX_ar.splice(z,1)
						//	alert(z);
						}
					});
					$('#arrastra').find('#'+area_usada_ar[g]).remove();
					//$('#arrastra').find('#'+area_usada_ar[g]).droppable('destroy');
				});
			//	alert(posX_ar);
			}
			/**********************************************/
			//alert(area_usada_ar);
			//alert($(this).find('texto_feed').text());
			/*if($(this).find('texto_feed').text().length>0){
				hayFeed = true;
				titulo_feed_individual = $(this).find('titulo_feed').text();
				texto_feed_individual = $(this).find('texto_feed').text();
			
			}*/
		}
	});
	
	
	$('#img_background').find('img').bind('load', function() {  
	//alert($(this).outerHeight());
		var posicionaImg = Math.round((400-$(this).outerHeight())/2);
		//alert($(this).outerWidth());
		colocaY = Math.round(posiIni_img+posicionaImg);
		if($(this).outerWidth()<500){
			colocaX = Math.round((560-$(this).outerWidth())/2);
			$(this).parent().css({
				'left' : colocaX+'px'
			});
		}
		
	//	alert(posicionaImg);
		$(this).parent().css({
			'top' : colocaY+'px'
		});
		
		$('#arrastra').find('#drag').each(function(){
			$(this).css({
				'top' : Math.round(colocaY+10)+'px'
			});
		});
		
		$('#arrastra').find('#tarjetas_arrastardas').each(function(){
			$(this).css({
				'top' : Math.round(colocaY+10)+'px'
			});
		});
		$('#arrastra').find('.drop').each(function(n){
			$(this).css({
				//'top' : posY_ar[n]+'px',
				'top' : colocaY+'px',
				'left' : posX_ar[n]+'px',
				'display' : 'block'
			});
			//alert($(this).attr('id'));
			$(this).droppable({
				drop: function(event, ui) {		
				//alert(ui.helper.attr('id')); //alert(ui.draggable.attr('name'));
				var data_area = $(this).attr('name').split(',');
				var area_usada = $(this).attr('id');
				var valida_tarjeta = false;
				
				$.each(data_area,function(i) {
					if(data_area[i]==tarjeta_arrastro){
						valida_tarjeta = true;
					}
					
				});
				//alert(coord_obj[$(this).attr('id')]);
				var data_coordenadas = coord_obj[$(this).attr('id')].split(',');
					if($(this).attr('value')=="true"){			
						if(valida_tarjeta){
							entra_tarjeta = true;
							$(this).droppable( "disable" );
							$(this).hide();
							$('#arrastra').find('#drag'+ntarjeta_arrastro).clearQueue();
							$('#arrastra').find('#drag'+ntarjeta_arrastro).stop().animate({
								'top': data_coordenadas[1]+'px',
								'left': data_coordenadas[0]+'px'
							},500, function(){
								numero_tarjetas_colocadas++;
								entra_tarjeta = false;
								$(this).css({
									'z-index' : '0'
								});
								$('#arrastra').find('#drag'+ntarjeta_arrastro).each(function(){
									data_drag+=$(this).find('img').attr('src')+",";
								});
								data_drag+=data_coordenadas[0]+","+data_coordenadas[1]+","+area_usada+"|";
								if(numero_tarjetas_colocadas == numero_tarjetas){
									data_obj[id_drag]=data_drag;
								//	if(n_area<total_area-1){
									if(n_area<total_area){
										$('#titulo_popup').text(feed_obj["feed_tit_4"]);
										$('#texto_popup').text(feed_obj["feed_txt_4"]);
										$('#btSiguiente_drag').show();
									} else {
										
											$('#titulo_popup').text(feed_obj["feed_tit_5"]);
											$('#texto_popup').text(feed_obj["feed_txt_5"]);
										
									}
									
									muestrafeed_individual();
										
								}	
							});
							$('#arrastra').find('#drag'+ntarjeta_arrastro).draggable('disabled');
							valida_tarjeta = false;	 	
						}
					
					} 
				
					
					/**********************************************/
				
					//data_obj["grafico1"]=tarjeta(ruta),posx,posy,area(para desactivar)|tarjeta1,posx,posy,area|
					
				},
				
				deactivate: function(){
					$('#arrastra').find('#drag'+ntarjeta_arrastro).each(function(){
						if(entra_tarjeta==false){
							$(this).clearQueue();
							$(this).stop().animate({
								top: posIniy_ar[ntarjeta_arrastro]+'px',
								left: posInix_ar[ntarjeta_arrastro]+'px'
							});	
						}
					});
				}		
			});
		});
		
	}); 

	

	
	////////////////// DRAG ///////////////////////////////////////

	$('#arrastra').append('<div id="drag"></div>');	
		$.each(tarjetas_ar,function(i) {
			$('#drag').append('<div id="drag'+i+'" class="drag" name="'+zonas_tarjetas_ar[i]+'"><img src="'+tarjetas_ar[i]+'"/></div>');	
		});
		
		ancho_total_tarjetas = 0;
		cord_x_inicial = 0;
		
		posInix2_ar = new Array();
		posInix_ar = new Array();
		posIniy_ar = new Array();
		
		
		$('#drag').find('.drag').each(function(){
			$(this).find('img').bind('load', function() {  
				ancho_total_tarjetas += $(this).outerWidth()+20;
				posInix2_ar.push(ancho_total_tarjetas);
				
				cord_x_inicial = Math.round(710-ancho_total_tarjetas);
				$('#drag').find('.drag').each(function(h){
					if(h==($('#drag').find('.drag').length-1)){
						coloca_tarjetas_predrag();
					}
				});
			});
		});

	$('#arrastra').find('#drag').each(function(){
		$(this).find('.drag').each(function(){
			$(this).draggable({ 
				start: function( event, ui ){
					tarjeta_arrastro = $(this).attr('name');
					ntarjeta_arrastro = $(this).attr('id').slice(($(this).attr('id').length-1));
					$(this).css({
						'z-index' : '4'
					});
				},
				stop: function( event, ui ) {
					$(this).css({
						'z-index' : '0'
					});
					// alert(ui.item)); //	alert(ui.position.top);	//	alert(ui.helper.attr('id')); //alert(event.target);	//alert($(this).attr('id')); //alert($(this).attr('name'));
				}
			});
		});
	});
 }
 
 function coloca_tarjetas_predrag(){
	$('#tapa').animate({
		opacity: '0'
	},300, function(){
		$('#tapa').hide(0);
	});
	
	$('#drag').find('.drag').each(function(h){
		if(h==0){
			$(this).css({
				'left' : cord_x_inicial+'px'
			});
		} else{
			$(this).css({
				'left' : Math.round(cord_x_inicial+posInix2_ar[h-1])+'px'
			});
		}
		posInix_ar[h] = $(this).position().left;
		posIniy_ar[h] = $(this).position().top;
	});

	posInix = $('#arrastra').find('#drag').position().left;
	posIniy = $('#arrastra').find('#drag').position().top;
 }
 
 function muestrafeed_individual(){
	if(n_ex < (total_ex-1)){
	//if(hayFeed){
		$('#feedback_select').css({
			'opacity' : '0',
			'display' : 'block'
			//'z-index' : '10'
		});
		$('#feedback_select').stop().animate({
			opacity: '1'
		},0, function(){
			$(this).delay(time_feed).animate({
				opacity: '0'
			},300, function(){
				$(this).css({
					'display' : 'none'
				});
				
			});
		});
	} else {
	
		/*$('#tapa').show();
		$('#tapa').animate({
			opacity: '1'
		},0);*/
	//	muestrafeed_final();
		n_ex++;
		fdefine_seccion(nseccion);
	}
	//}
 }
 
function muestrafeed_final(){
		$('#feedback_select').css({
			'opacity' : '0',
			'display' : 'block'
			//'z-index' : '10'
		});
		$('#feedback_select').stop().animate({
			opacity: '1'
		},300);
 }
 
 