var xml;

$(document).ready(function(){

});


function config_dataDrag(){
	// desactivo la posibilidad de escala en tablets
	$('body').bind('touchmove', function(e){
		e.preventDefault();
	});
	// construimos DOM
	$('#config_drag').append('<div id="contenedores"></div>');
	$('#config_drag').append('<div id="elementos"></div>');
	$('#config_drag').append('<div id="feedback"></div>');
	$('#config_drag').append('<div id="feedback_individual"></div>');
	
	parseXML_Ex_Drag();
}

//************************** CARGA XML ******************************
var xhttpExercise_Drag;
var dataXmlEx_Drag;
var $xmlEx_Drag;
var nEx_Drag;


function parseXML_Ex_Drag(){
	var dataTest = $('#config_drag').attr('name');
	var nombreTest = 'xml'+dataTest.slice(0,dataTest.indexOf('.'));
	
	if(window.location.protocol == 'file:') {
		var response;
			if (window.DOMParser)
			{
				parser=new DOMParser();
				response=parser.parseFromString(myObj[nombreTest],"text/xml");
				//response=parser.parseFromString("data_drag.xml","text/xml");

			}
			else // Internet Explorer
			{
				response=new ActiveXObject("Microsoft.XMLDOM");
				response.async=false;
				response.loadXML(myObj[nombreTest]); 
			}
			
			$xmlEx_Drag = $(response);
	
	} else {
		dataXmlEx_Drag = 'contenidos/recursos/'+dataTest;
		xhttpExercise_Drag=new XMLHttpRequest();
		xhttpExercise_Drag.open("GET",dataXmlEx_Drag,false);
		xhttpExercise_Drag.setRequestHeader('Content-Type', 'text/xml');
		xhttpExercise_Drag.send("");
		$xmlEx_Drag = $(xhttpExercise_Drag.responseXML);
	}
	
	// elementos  a colocar
	nEx_Drag = $xmlEx_Drag.find('element').length;
	config_multi_drag();
}

var titulo_feedback_right;
var texto_feedback_right;
var titulo_feedback_wrong;
var texto_feedback_wrong;
var w_feed;
var h_feed;
var top_feed;
var left_feed;

var posx_contenedor;
var posy_contenedor;
var w_contenedor;
var h_contenedor;


var element;
var content_box;
var posx_element;
var posy_element;
var posoriginx_element;
var posoriginy_element;
var originw_element;
var originh_element;

var element_drag;

var entra_box;

var nItems_box_v;
var nItems_box_h;

var coloca_todas_cajas;
var coloca_cajas_ar;
var elementos_sin_cajas_ar;


function config_multi_drag(){	
	/* ************* CONTENEDOR ****************** */
	posx_contenedor = new Array();
	posy_contenedor = new Array();
	w_contenedor = new Array();
	h_contenedor = new Array();
	
	nItems_box_v = {}
	nItems_box_h = {}
	
	coloca_todas_cajas = true;
	coloca_cajas_ar = new Array();
	elementos_sin_cajas_ar = new Array();
	
	if($xmlEx_Drag.find('individual_feedbacks').length>0){
		$('#feedback_individual').append('<div id="back"></div>');
		$('#feedback_individual').append('<div id="tipo_feed_indv" class="feedright"><div id="close_feed"></div><p id="titular_feed_inv" class="titular"></p><p id="texto_feed_inv"></p></div>');
	}

	$xmlEx_Drag.find('feedback').each(function(){
		titulo_feedback_right = $(this).find('feedback_right_title').text();
		texto_feedback_right = $(this).find('feedback_right_text').text();
		titulo_feedback_wrong = $(this).find('feedback_wrong_title').text();
		texto_feedback_wrong = $(this).find('feedback_wrong_text').text();
		w_feed = $(this).attr('width');
		h_feed = $(this).attr('height');
		top_feed = $(this).attr('top');
		left_feed = $(this).attr('left');
		$('#feedback').append('<div id="tipo_feed"></div>');
		if(titulo_feedback_right.length>0){
			$('#tipo_feed').append('<p id="titular_feed"></p>');
		} 
		if(texto_feedback_right.length>0){
			$('#tipo_feed').append('<p id="texto_feed"></p>');
		} 
	});
	
	$xmlEx_Drag.find('content').each(function(s){
		posx_contenedor[s]=$(this).attr('posx');
		posy_contenedor[s]=$(this).attr('posy');
		w_contenedor[s]=$(this).attr('width');
		h_contenedor[s]=$(this).attr('height');
		if($(this).find('data_content').attr('type')=="text"){
			$('#contenedores').append('<div id="'+$(this).attr('id')+'" class="box"><div class="header"><p>'+$(this).find('data_content').text()+'</p></div></div>');
		} else if($(this).find('data_content').attr('type')=="image"){
			$('#contenedores').append('<div id="'+$(this).attr('id')+'" class="box"><div class="header"><img src="contenidos/recursos/'+$(this).find('data_content').text()+'"/></div></div>');
		}
	});

	$xmlEx_Drag.find('element').each(function(d){
		$(this).find('content_box').each(function(){
			$(this).find('box').each(function(){
				if($(this).text().length==0){
					coloca_todas_cajas = false;
					elementos_sin_cajas_ar.push(d);
				}
				if($(this).text().length>0){
					coloca_cajas_ar.push(d);				
				}
			});
		});
	});
	if(!coloca_todas_cajas){
		nEx_Drag = coloca_cajas_ar.length;
	}
	
	
	entra_box = false;
	
	
	$('#contenedores').find('.box').each(function(d){
		$(this).css({
			'top': posy_contenedor[d]+'px',
			'left': posx_contenedor[d]+'px',
			'width' : w_contenedor[d]+'px',
			'height' : h_contenedor[d]+'px'
		});
		
		nItems_box_v[$(this).attr('id')] = 0;
		nItems_box_h[$(this).attr('id')] = 0;
		
		$(this).find('.header').each(function(){
			$(this).css({
				'height' : $(this).find('p').outerHeight()+10+'px'
			});
		});
	
		$(this).droppable({
			drop: function(event, ui) {	
				var id_caja = $(this).attr('id');
				var cajas_ar = new Array();
				cajas_ar=content_box[element_drag].split(",");	
				$.each(cajas_ar,function(indice,valor){
					if(id_caja==valor){
						entra_box = true;
					}
				});
				
				posiciona(id_caja);
			},
			deactivate: function(){
				if(!entra_box){
					$('#elementos').find('#'+element_drag).stop().animate({
						'top': posoriginy_element[element_drag]+'px',
						'left': posoriginx_element[element_drag]+'px'
					},300);
				}
			}
		});
	});

	/* ************* ELEMENTOS ****************** */

	element = {};
	content_box = {};
	posx_element = {};
	posy_element = {};
	posoriginx_element = {};
	posoriginy_element = {};
	originw_element = {};
	originh_element = {};
		
	
	$xmlEx_Drag.find('element').each(function(n){
		element[$(this).attr('id')] = $(this).find('data_element').attr('position')+","+$(this).find('data_element').attr('direction');
		posx_element[$(this).attr('id')] = $(this).find('posContent_x').text();
		posy_element[$(this).attr('id')] = $(this).find('posContent_y').text();
		posoriginx_element[$(this).attr('id')] = $(this).find('posIni_x').text();
		posoriginy_element[$(this).attr('id')] = $(this).find('posIni_y').text();
		originw_element[$(this).attr('id')] = $(this).attr('width');
		originh_element[$(this).attr('id')] = $(this).attr('height');

		if($(this).find('data_element').attr('position')=="dinamic"){
			if($(this).find('data_element').attr('direction')=="v"){
				$('#contenedores').find('.box').each(function(){
					nItems_box_h[$(this).attr('id')] = $(this).position().left+1;
				});
				
			} else if($(this).find('data_element').attr('direction')=="h"){
				$('#contenedores').find('.box').each(function(){
					nItems_box_v[$(this).attr('id')] = $(this).position().top+1;
				});
			} 
		}
		// cajas a las q puede ir cada elemento
		$(this).find('box').each(function(nn){
			if(nn==0){
				content_box[$(this).parent().parent().attr('id')]=$(this).text()+",";
			} else if(nn>0){
				content_box[$(this).parent().parent().attr('id')]+=$(this).text()+",";
			}
		});
		content_box[$(this).attr('id')]	= content_box[$(this).attr('id')].slice(0,content_box[$(this).attr('id')].length-1);
	
		if($(this).find('data_element').attr('type')=="text"){
			$('#elementos').append('<div id="'+$(this).attr('id')+'" class="element"><p>'+$(this).find('content_element').text()+'</p></div>');
		}else if($(this).find('data_element').attr('type')=="image"){
			$('#elementos').append('<div id="'+$(this).attr('id')+'" class="element"><img src="contenidos/recursos/'+$(this).find('content_element').text()+'"/></div>');
		}
	});

	$('#elementos').find('.element').each(function(h){
		$(this).css({
			'top': posoriginy_element[$(this).attr('id')]+'px',
			'left': posoriginx_element[$(this).attr('id')]+'px',
			'width' : originw_element[$(this).attr('id')]+'px',
			'heigth' : originh_element[$(this).attr('id')]+'px'
		});
		

		$(this).draggable({ 
			start: function( event, ui ){
				element_drag = $(this).attr('id');
				
				$(this).css({
					'z-index' : '5'
				});
			},
			stop: function( event, ui ) {
				$(this).css({
					'z-index' : '1'
				});
			}
				
			// alert(ui.item)); //	alert(ui.position.top);	//	alert(ui.helper.attr('id')); //alert(event.target);	//alert($(this).attr('id')); //alert($(this).attr('name'));
		});
	});
	
}

function posiciona(id_caja){
	var is_get_unique_element = false;
	//var color_right = #a4a90d;
	//var color_regular = #00a5b7;
	//var color_wrong = #993300;
	
	if(entra_box){
		var config_element_ar = new Array();
		var posiciona_x;
		var posiciona_y;
		var tiempo;
		var tipo_clase;
	config_element_ar = element[element_drag].split(',');
		if(config_element_ar[0]=='fixed'){
			posiciona_x = posx_element[element_drag];
			posiciona_y = posy_element[element_drag];
			tiempo = 300;
		} else if(config_element_ar[0]=='dinamic'){
			if(config_element_ar[1]=='v'){
				posiciona_x = Number(nItems_box_h[id_caja]);
				posiciona_y = Math.round(Number(posy_element[element_drag])+Number(nItems_box_v[id_caja]));
				nItems_box_v[id_caja] = Math.round(nItems_box_v[id_caja]+$('#'+element_drag).find('p').outerHeight()+10);
			} else if(config_element_ar[1]=='h'){
				posiciona_x = Math.round(posx_element[element_drag]+nItems_box_v[id_caja]);
				posiciona_y = Number(nItems_box_v[id_caja]);
				nItems_box_h[id_caja] = Math.round(nItems_box_h[id_caja]+$('#'+element_drag).find('p').outerWidth());
			} 
			tiempo = 300;
			
		} else if(config_element_ar[0]=='origin'){	
			$xmlEx_Drag.find('content').each(function(){
				if($(this).attr('id')==id_caja){
					$(this).find('individual_feedback').each(function(){
						if($(this).attr('feed_element')==element_drag){	
							tipo_clase = $(this).attr('type');
							var clase = $('#feedback_individual').find('#tipo_feed').attr('class');
							var titulo = $(this).find('title').text();
							var texto = $(this).find('texto').text();
							$('#feedback_individual').find('#tipo_feed').removeClass(clase);
							$('#feedback_individual').find('#tipo_feed').addClass(tipo_clase);
							$('#feedback_individual').find('#tipo_feed').each(function(){
								$(this).find('#titular').text(titulo);
								$(this).find('#texto').text(texto);
							});
							$('#feedback_individual').show();
							$('#feedback_individual').find('#close_feed').click(function(e){
								$('#feedback_individual').hide();
							});
							
						}
					});
					
					var color_feed = {};
					color_feed["feedright"] = "#a4a90d";
					color_feed["feedregular"] = "#00a5b7";
					color_feed["feedwrong"] = "#993300";
					
					$('#contenedores').find('#outer_'+id_caja).css({
						'border' : '2px dashed '+color_feed[tipo_clase]
					});
				}
			});
			
			posiciona_x = posoriginx_element[element_drag];
			posiciona_y = posoriginy_element[element_drag];
			tiempo = 0;
			
		} else if(config_element_ar[0]=='get_unique_element'){
			is_get_unique_element = true;
			tiempo = 300;
		}
		if(is_get_unique_element){
			$('#elementos').find('#'+element_drag).stop().animate({
				'opacity' : '0'
			},tiempo,function(){
				//$('#'+id_caja).droppable('disable'); box_disable
				$('#contenedores').find('#'+id_caja).removeClass('box');
				$('#contenedores').find('#'+id_caja).addClass('box_disable');
				$('#contenedores').find('#'+id_caja).droppable('disable');
				entra_box = false;
			});
		} else {
			$('#elementos').find('#'+element_drag).stop().animate({
				'top': posiciona_y+'px',
				'left': posiciona_x+'px'
			},tiempo,function(){
				if(config_element_ar[0]!='origin'){
					$(this).removeClass('element');
					$(this).addClass('element_position');
					$(this).draggable('disable');
					entra_box = false;
					$(this).css({
						'color' : '#000',
						'opacity' : '1'
					});
				}
			});
		}
		
		if(nEx_Drag>0){
			nEx_Drag--;
			if(nEx_Drag==0){
				/***********************************************/
				// Control Events
				nEvents_ar[0] = 1;
				activeEvents();
				/***********************************************/
				//elementos_sin_cajas_ar
				//$('#contenedores').find('#'+id_caja).droppable('disable');
				//$(this).draggable('disable');
				if(config_element_ar[0]=='dinamic'){
					// si es dinamic, siempre sacará el feedback correcto, ya que si es incorecto el elemento vuelve a su posición original
					//$('#feedback').append('<div id="tipo_feed"><p id="titular_feed"></p><p id="texto_feed"></p></div>')
					$('#feedback').find('#tipo_feed').each(function(){
						$(this).parent().css({
							'top' : top_feed+'px',
							'left' : left_feed+'px'
						});
						$(this).css({
							'width' : w_feed+'px',
							'height' : h_feed+'px'
						});
						if(titulo_feedback_right.length>0){
							$(this).find('#titular_feed').html(titulo_feedback_right);
						} 
						if(texto_feedback_right.length>0){
							$(this).find('#texto_feed').html(texto_feedback_right);
						} 	
					});	
					
					$.each(elementos_sin_cajas_ar,function(indice,valor){
						$('#elementos').find('#element'+(valor+1)).draggable('disable');						
					});
					
				}
				// sacamos el feedback final
				$('#feedback').show();
				$('#feedback').delay(tiempo).animate({
					'opacity' : '1'
				},300);
			}
		}


	} else {
		$('#elementos').find('#'+element_drag).stop().animate({
			'top': posoriginy_element[element_drag]+'px',
			'left': posoriginx_element[element_drag]+'px'
		},300);
	}
}

