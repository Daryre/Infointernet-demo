function fglosario(){
	$('body').bind('touchmove', function(e){
		e.preventDefault();
	});
	// INSERTAMOS MENÚ
	$('#glosario').append('<div id="menu_glos"></div>');
	$('#menu_glos').append('<ul class="listado_menu_glos"></ul>');
	$('#menu_glos').find('.listado_menu_glos').each(function(){
		$(this).append('<li id="a" class="menu_glos">A</li>')
		$(this).append('<li id="b" class="menu_glos">B</li>')
		$(this).append('<li id="c" class="menu_glos">C</li>')
		$(this).append('<li id="d" class="menu_glos">D</li>')
		$(this).append('<li id="e" class="menu_glos">E</li>')
		$(this).append('<li id="f" class="menu_glos">F</li>')
		$(this).append('<li id="g" class="menu_glos">G</li>')
		$(this).append('<li id="h" class="menu_glos">H</li>')
		$(this).append('<li id="i" class="menu_glos">I</li>')
		$(this).append('<li id="j" class="menu_glos">J</li>')
		$(this).append('<li id="k" class="menu_glos">K</li>')
		$(this).append('<li id="l" class="menu_glos">L</li>')
		$(this).append('<li id="m" class="menu_glos">M</li>')
		$(this).append('<li id="n" class="menu_glos">N</li>')
		$(this).append('<li id="gn" class="menu_glos">&Ntilde;</li>')
		$(this).append('<li id="o" class="menu_glos">O</li>')
		$(this).append('<li id="p" class="menu_glos">P</li>')
		$(this).append('<li id="q" class="menu_glos">Q</li>')
		$(this).append('<li id="r" class="menu_glos">R</li>')
		$(this).append('<li id="s" class="menu_glos">S</li>')
		$(this).append('<li id="t" class="menu_glos">T</li>')
		$(this).append('<li id="u" class="menu_glos">U</li>')
		$(this).append('<li id="v" class="menu_glos">V</li>')
		$(this).append('<li id="w" class="menu_glos">W</li>')
		$(this).append('<li id="x" class="menu_glos">X</li>')
		$(this).append('<li id="y" class="menu_glos">Y</li>')
		$(this).append('<li id="z" class="menu_glos">Z</li>')
	});
	
	
	$('#menu_glos').find('.menu_glos').each(function(){
		$(this).mouseover(function(){
			$(this).addClass('menu_glos_activo')
		});	
		$(this).mouseout(function(){
			$(this).removeClass('menu_glos_activo')
		});
	//$(this).click(function(){
		$(this).bind(clickEvent,function(){
			freset_selected();
			$(this).addClass('letra_seleccionada');
			//alert($(this).text());
			infoGlos($(this).text());
		});
	});
	
	parseXMLGlosario();
}

function freset_selected(){
	$('#menu_glos').find('.menu_glos').each(function(){
		$(this).removeClass('letra_seleccionada');
	});
}



//////////////////////////////////////////////////////////////////////////////
// parsea XML
//////////////////////////////////////////////////////////////////////////////
var xhttpData_glos
var $xmlGlosario;
var $xmlLetras;
function parseXMLGlosario(){
	var dataGlos = $('#glosario').attr('name');
	var nombreGlos = 'xml'+dataGlos.slice(0,dataGlos.indexOf('.'));
	//alert(nombreGlos);
	//alert(myObj[nombreGlos]);
	if(window.location.protocol == 'file:') {
		var response;
			if (window.DOMParser)
			{
				parser=new DOMParser();
				response=parser.parseFromString(myObj[nombreGlos],"text/xml");

			}
			else // Internet Explorer
			{
				response=new ActiveXObject("Microsoft.XMLDOM");
				response.async=false;
				response.loadXML(myObj[nombreGlos]); 
			}
			
			$xmlGlosario = $(response);
	
	} else {
		dataXmlGlos = 'contenidos/recursos/'+dataGlos;
		xhttpData_glos=new XMLHttpRequest();
		xhttpData_glos.open("GET",dataXmlGlos,false);
		xhttpData_glos.setRequestHeader('Content-Type', 'text/xml');
		xhttpData_glos.send("");
		$xmlGlosario = $(xhttpData_glos.responseXML);
	}
	configGlos();
}

var letras_desactivadas_ar = new Array();
var letras_activadas_ar = new Array();
function configGlos(){
	$xmlLetras = $xmlGlosario.find('letra');
	$xmlLetras.each(function(){
		if($(this).find('palabra').length>0){
			letras_activadas_ar.push($(this).attr('nombre'));
		} else {
			letras_desactivadas_ar.push($(this).attr('nombre'));
		}
	});
	
	letras_desactivadas_ar.each(function(indice,valor) {
		$('#menu_glos').find('.menu_glos').each(function(){
			if(indice == ($(this).attr('id').toUpperCase())){		
				$(this).unbind('click');
				$(this).unbind(clickEvent);
				$(this).unbind('mouseover');
				$(this).unbind('mouseout');
				$(this).addClass('letra_desactivada');
			}
		});
	});
	configContentGlos();
}

function configContentGlos(){
	$('#glosario').append('<div id="contenido_glos"></div>');
	$('#contenido_glos').append('<div id="fondo_glos"></div>');
	$('#contenido_glos').append('<div id="content_words"></div>');
	$('#content_words').append('<div id="contennido_words"></div>');

	activaPrimera();
}

function activaPrimera(){
	if(letras_activadas_ar.length>0){
		$('#menu_glos').find('.menu_glos').each(function(){
			if(letras_activadas_ar[0] == ($(this).attr('id').toUpperCase())){	
				$(this).addClass('letra_seleccionada');
				infoGlos($(this).text());
			}
		});
	}
}

function infoGlos(data){

	$xmlGlosario.find('letra').each(function(){
		if($(this).attr('nombre')==data){
			$('#contennido_words').empty();
			
			$(this).find('palabra').each(function(s){
				$('#contennido_words').append('<div class="termino"><p>'+$(this).find('termino').text()+'</p></div>');
				$('#contennido_words').append('<div class="descripcion"><p>'+$(this).find('descripcion').text()+'</p></div>');
			});
			if(!ie){
				$('#content_words').jScrollPane({showArrows: true});
			} /*else {
				$('#content_words').jScrollPane({showArrows: true});
			}*/
			//
			
		}
	});
}