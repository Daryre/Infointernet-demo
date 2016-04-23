$(document).ready(function(){
	if($('#galeria_fotos_modal').length>0){
		//parseXMLFotos();
	}
	
});

//////////////////////////////////////////////////////////////////////////////
// parsea XML
//////////////////////////////////////////////////////////////////////////////

var xhttpfotos
var $xmlFotos;
var nFotos;

function parseXMLFotos(){
	var dataFt = $('#galeria_fotos_modal').attr('name');
	dataXmlFotos = '../recursos/'+dataFt;
		xhttpfotos=new XMLHttpRequest();
		xhttpfotos.open("GET",dataXmlFotos,false);
		xhttpfotos.setRequestHeader('Content-Type', 'text/xml');
		xhttpfotos.send("");
		$xmlFotos = $(xhttpfotos.responseXML);
		configFotos();
}

function configFotos(){
	var ruta="../recursos/";
	$xmlFotos.find('foto').each(function(s){
		$('#galeria_fotos_modal').append("<div id='foto"+s+"' class='fotogaleria'></div>");
		$(this).find('titulo').each(function(){
			$('#foto'+s).append("<p class='titulofoto'>"+$(this).text()+"</p>");
		});
		$(this).find('img').each(function(){
			$('#foto'+s).append("<img src='"+ruta+$(this).text()+"'/>");
			//alert($(this).text());
		});
		
	});
	
	creaGaleriaModal();
}


var nFotosM;
var nItemM;

function creaGaleriaModal(){
	
	var posx_fotos_ar = new Array();
	var posx2_fotos_ar = new Array();
	$('#galeria_fotos_modal').css({
		'top' : '8px'
	});
	var anchoTotal = 988;
	nFotosM = $('#galeria_fotos_modal').find('img').length;
	nItemM = 0;
	$('#galeria_fotos_modal').find('.fotogaleria').each(function(s){
		posx_fotos_ar[s] = -anchoTotal*s
		posx2_fotos_ar[s] = anchoTotal*s
		$(this).css({
			'display' : 'inline-block'
		});
		
		$(this).find('img').each(function(n){
			var cimg = $(this).attr("src");
			
			$(this).attr('src', cimg).load(function() {  
				//var anchoFoto = $(this).width();
				
				var anchoFoto = $(this).outerWidth();
				
				/*var margen = Math.round(anchoTotal-anchoFoto)/2;
				 $(this).css({
						'margin-left' : margen+'px',
						'margin-right' : margen+'px'
				});*/
				
				var margenI;
				var margenD;
				if(anchoFoto<988){
					margenD = Math.round((anchoTotal-anchoFoto)/2);
					margenI = (anchoTotal-anchoFoto-margenD);
					//alert(margenD+" / "+margenI);
				} else {
					margenD = 0;
					margenI = 0;
				}
				//alert($(this).attr('src'));
				 $(this).css({
					'margin-left' : margenI+'px',
					'margin-right' : margenD+'px',
					//'left' : posx2_fotos_ar[s]+'px'
					//'display' : 'inline'
				});
			//	alert("m:::");
				//alert("m:::"+$(this).css('margin-right'));
				
			});  	
			
			
		});
		
	});
	//alert(posx_fotos_ar);
	fnavega_flechasModal();
	

	
	//flechaIzq
	$('#flechaIzqM').click(function(){
		if(nItemM>0){
			nItemM--;
			$('#galeria_fotos_modal').animate({
				 // left: '+='+anchoTotal
				 left: posx_fotos_ar[nItemM]
			});
			fnavega_flechasModal();
		} 
	});
	
	//flechaDch
	$('#flechaDchM').click(function(){
		if(nItemM<nFotosM){
			nItemM++;
			$('#galeria_fotos_modal').animate({
				// left: '-='+anchoTotal
				left: posx_fotos_ar[nItemM]
			});
			fnavega_flechasModal();
		}
	});
}


function fnavega_flechasModal(){
	$('#flechaIzqM').removeClass('flecha_desactivada');
	$('#flechaDchM').removeClass('flecha_desactivada');
	$('#flechaIzqM').addClass('flecha_activada');
	$('#flechaDchM').addClass('flecha_activada');
	
	if(nItemM==0){
		$('#flechaIzqM').addClass('flecha_desactivada');
		$('#flechaIzqM').removeClass('flecha_activada');
	}
	
	if(nItemM==(nFotosM-1)){
		$('#flechaDchM').addClass('flecha_desactivada');
		$('#flechaDchM').removeClass('flecha_activada');
	}
}