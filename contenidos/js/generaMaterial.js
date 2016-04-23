function fmateriales(){
	$('body').bind('touchmove', function(e){
		e.preventDefault();
	});
	parseXMLMaterial();
}



//////////////////////////////////////////////////////////////////////////////
// parsea XML
//////////////////////////////////////////////////////////////////////////////
var xhttpData_mat
var $xmlMaterial;
var $xmlContenido;
function parseXMLMaterial(){
	var dataGlos = $('#materiales').attr('name');
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
			
			$xmlMaterial = $(response);
	
	} else {
		dataXmlMat = 'contenidos/recursos/'+dataGlos;
		xhttpData_mat=new XMLHttpRequest();
		xhttpData_mat.open("GET",dataXmlMat,false);
		xhttpData_mat.setRequestHeader('Content-Type', 'text/xml');
		xhttpData_mat.send("");
		$xmlMaterial = $(xhttpData_mat.responseXML);
	}
	configMat();
}

var tipoHeader_ar = new Array(); // tipo de header (texto o imagen)
var conteHeader_ar = new Array(); // contenido de cada header
var identificador_ar = new Array(); // id

function configMat(){
	tipoHeader_ar = new Array(); 
	conteHeader_ar = new Array();
	$xmlMaterial.find('categoria').each(function(){
		identificador_ar.push($(this).attr('id'));
		$(this).find('head').each(function(){
			if($(this).find('nombre_head').text().length>0){
				// tiene texto
				tipoHeader_ar.push("texto");
				conteHeader_ar.push($(this).find('nombre_head').text());
			} else if($(this).find('img_head').text().length>0){
				// tiene imagen
				tipoHeader_ar.push("imagen");
				conteHeader_ar.push($(this).find('img_head').text());
			}
		});
	});
	
	
	// menu
	$('#materiales').empty();
	
	$('#materiales').append("<div id='cabecera'><ul id='lista_cabecera'></ul></div>")
	conteHeader_ar.each(function(indice,valor) {
		if(tipoHeader_ar[valor]=="texto"){
			$('#lista_cabecera').append('<li id="'+identificador_ar[valor]+'" class="menu_material menu_materialTexto">'+indice+'</li>');
		} else if(tipoHeader_ar[valor]=="imagen"){
			$('#lista_cabecera').append('<li id="'+identificador_ar[valor]+'" class="menu_material menu_materialImagen"><img src="'+indice+'"/></li>');
		}
	});

	fnavega_Mat();
	
	$('#materiales').append("<div id='content_mat'><div id='contenido_mat'></div></div>");
	activaPrimera_Mat();
}


function fgeneraLista(data){
	var iconos_ar = new Array();
	var textoMat_ar = new Array();
	var enlaces_ar = new Array();
	$('#contenido_mat').empty();
	$xmlMaterial.find('categoria').each(function(){
		if($(this).attr('id')==data){
			$('#contenido_mat').append('<div class="mat_'+data+'"></div>');
			$(this).find('material').each(function(s){
				/************************************************/
				// depurar esta parte
				$(this).find('enlace').each(function(){
					$('.mat_'+data).append('<li id="listado_'+s+'" class="listado_'+data+'"></li>');
					//enlaces_ar.push($(this).text());
					
					if($(this).text().length>0){
						enlaces_ar.push($(this).text());
					} else {
						enlaces_ar.push("");
					}
					
					if($(this).parent().find('icono').text().length>0){
						iconos_ar.push($(this).parent().find('icono').text());
					} else {
						iconos_ar.push("");
					}
					
					if($(this).parent().find('texto').text().length>0){
						textoMat_ar.push($(this).parent().find('texto').text());
					} else {
						textoMat_ar.push("");
					}
				});
				/************************************************/
			});
		}
	});
	$('.mat_'+data).find('.listado_'+data).each(function(d){
		$(this).append('<a href="'+enlaces_ar[d]+'" target="_blank"></a>')
		if(enlaces_ar[d].length==0){
			$(this).find('a').removeAttr('href');
			$(this).find('a').removeAttr('target');
			//
			$(this).find('a').css({
				'color' : '#665c4e',
				'text-decoration': 'none'
			});
		}
		if(iconos_ar[d].length>0){
			$(this).find('a').append('<img src="'+iconos_ar[d]+'"/>')
		}
		if(textoMat_ar[d].length>0){
			$(this).find('a').append('<p>'+textoMat_ar[d]+'</p>')
		}
	});
	if(!ie){
		$('#content_mat').jScrollPane({showArrows: true});
	} 
	
	$('#cabecera').find('.menu_materialTexto').each(function(){
		$(this).removeClass('menu_materialTexto_seleccionado');
		$(this).addClass('menu_materialTexto_activo');
	});
	
	$('#cabecera').find('.menu_materialImagen').each(function(){
		$(this).removeClass('menu_materialImagen_seleccionado');
	});
	
	fnavega_Mat();
	
	$('#cabecera').find('#'+data).each(function(){
		if($(this).hasClass('menu_materialTexto')){
			$(this).addClass('menu_materialTexto_seleccionado');
			$(this).removeClass('menu_materialTexto_activo');
		} else {
			$(this).addClass('menu_materialImagen_seleccionado');
		}
		$(this).unbind('click');
		$(this).unbind(clickEvent);
	});

}

function fnavega_Mat(){
	$('#materiales').find('.menu_material').each(function(){
		//$(this).click(function(){
		$(this).bind(clickEvent,function(){
			fgeneraLista($(this).attr('id'));
		});
	});
}


function activaPrimera_Mat(){
	var dato = $('#materiales').find('#lista_cabecera li:first').attr('id');
	fgeneraLista(dato);
}
