$(document).ready(function(){
	// *********** 
	if($('#contenido').find('.parte_mux').length>0){
			colocaGraficos();
			colocaGraficosOver();
	}
	
	if($('body').find('.boton_flotante').length>0){
		fboton_flotante();
	}
	if($('body').find('.div_flotante').length>0){
		fdiv_flotante();
	}
	
	if($('body').find('#call').length>0){
			fcall();
	}
	
});

var ancho_body;
var ancho_conte;

var clickEvent;
	
function colocaConte(){
	ancho_body = $('body').outerWidth();
	var posX_conte = Math.round((ancho_body-ancho_conte)/2);
	//alert(ancho_body+" / "+ancho_conte+" / "+posX_conte);
}

function colocaGraficos(){
	var poscall_ar = new Array();
	var ndatoscall_ar = new Array();
	var posX_call;
	var posY_call;
	var w_call;
	
	poscall_ar.push($('#call').attr('name'));
	//alert(poscall_ar);
	$.each(poscall_ar,function(indice,valor) {
		ndatoscall_ar = valor.split(",");
		posX_call = ndatoscall_ar[0];
		posY_call = ndatoscall_ar[1];
		w_call = ndatoscall_ar[2];
	});
	
	$('#call').css({
		'position' : 'absolute',
		'color' : '#848484',
		'font-family' : 'arial',
		'font-size' : '12px',
		'top': posY_call+'px',
		'left' : posX_call+'px',
		'z-index' : '2',
		'width' : w_call+'px'
	});

	
	var datos_ar = new Array();
	var ndatos = new Array();
	var posX_ar = new Array();
	var posY_ar = new Array();
	var div_over;
	$('#contenido').find('.parte_mux').each(function(){
		datos_ar.push($(this).attr('name'));
	});

	$.each(datos_ar,function(indice,valor) {
		ndatos = valor.split(",");
		posX_ar.push(ndatos[0]);
		posY_ar.push(ndatos[1]);
	});
	$('#contenido').find('.parte_mux').each(function(s){
		$(this).css({
			'top' : posY_ar[s]+'px',
			'left' : posX_ar[s]+'px'
		});
		if($(this).attr('id').length>0){
			$(this).click(function(){
				div_over = "on_"+$(this).attr('id');
				$('#'+div_over).show();
				$('#call').hide();
			});
		} else {
			$(this).css({
				'cursor': 'default'
			});
		}
	});
}

function colocaGraficosOver(){
	$('#contenido').find('.parte_mux_on').each(function(s){
		$(this).click(function(){
			$(this).hide();
			$('#call').show();
		});
		
	});
}

/***************************************************************************/
/***************************************************************************/

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
	
	$('body').find('.boton_flotante').each(function(s){
		datosBoton_ar[s] = $(this).attr('name');

	});

	$.each(datosBoton_ar,function(indice, valor) {
		ndatos = datosBoton_ar[indice].split(",");
		tipo_ar.push(ndatos[0]);
		enlace_ar.push(ndatos[1]);
		posicionX_ar.push(ndatos[2]);
		posicionY_ar.push(ndatos[3]);
		conte_ar.push(ndatos[4]);
		tipoconte_ar.push(ndatos[5]);
		
	});

	$('body').find('.boton_flotante').each(function(n){
		$(this).css({
				'left': posicionX_ar[n]+'px',
				'top': posicionY_ar[n]+'px'
		});

	$(this).find('img').click(function(){
			if(tipo_ar[n]=="div_flotante"){
				// div flotante
				navega_div_flotante = true;
				fveodiv_flotante(enlace_ar[n]);
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
	
	$('body').find('.div_flotante').each(function(s){
		dataDiv_ar[s] = $(this).attr('name');
	});
	
	$.each(dataDiv_ar,function(indice, valor) {
		ndatos = dataDiv_ar[indice].split(",");
		posX_ar.push(ndatos[0]);
		posY_ar.push(ndatos[1]);
	});
	
	$('body').find('.div_flotante').each(function(s){
		$(this).css({
			'left' : posX_ar[s]+'px',
			'top' : posY_ar[s]+'px',
			'width' : Math.round(690-posX_ar[s])+'px'
		});
		
	});
	
	id_first = $('body').find('.div_flotante').first().attr('id');
	//fveodiv_flotante(id_first);
}

function fveodiv_flotante(data){
	if(navega_div_flotante){
		$('body').find('#call').fadeOut(200);
	}
	$('body').find('.div_flotante').each(function(){
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
	
	$('body').find('#call').each(function(d){
		dataDiv_ar[d] = $(this).attr('name');
	});

	$.each(dataDiv_ar,function(indice, valor) {
		ndatos = dataDiv_ar[indice].split(",");
		posX_ar.push(ndatos[0]);
		posY_ar.push(ndatos[1]);
	});

	$('body').find('#call').each(function(s){
		$(this).css({
			'left' : posX_ar[s]+'px',
			'top' : posY_ar[s]+'px'
		});
	});
	
}