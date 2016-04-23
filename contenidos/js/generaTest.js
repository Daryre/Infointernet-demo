var $xmlEvalua;
var dataXmlEvalua;
var nQuestion; // nº total preguntas
var nSelect; // nº preguntas a mostrar
var scoreQuestion; // minima puntuacion para aprobar
var $totalQuestion_ar;
var $totalId_ar;
var $selectQuestion_ar;
var $selectId_ar;
var seccion;
var nPregunta;
var activo;
var puntua;
var porcentajeTest;

var feedBack_right;
var feedBack_wrong;
var feedBack_;
var feedBack_R;
var feedBack_W;
var enviaScorm;

var ie; 
var isChrome ;
var isFirefox;
var isIphone;
var isIpad;
var isAndroid;
var navegador=navigator.userAgent;

var lastQuestion;


$(document).ready(function(){

/*  ------------XML ------------------ */
	$totalQuestion_ar = new Array();
	$selectQuestion_ar = new Array();
	$totalId_ar = new Array();
	$selectId_ar = new Array();
	
	if(navegador.indexOf('MSIE') != -1) {
		ie=true;
	}
	if(navegador.indexOf('Chrome') != -1) {
		isChrome=true;
	}
	if(navegador.indexOf('Firefox') != -1) {
		isFirefox=true;
	}
	
	if(navegador.indexOf('iPhone') != -1) {
		isIphone=true;
	}
	
	if(navegador.indexOf('iPad') != -1) {
		isIpad=true;
	}
	
	
});


//////////////////////////////////////////////////////////////////////////////
// parsea XML
//////////////////////////////////////////////////////////////////////////////
var $test
var xhttpTest
function parseXML(){
	var dataTest = $('#autoevaluacion').attr('name');
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
			
			$xmlEvalua = $(response);
	
	} else {
		dataXmlEvalua = 'contenidos/recursos/'+dataTest;
		xhttpTest=new XMLHttpRequest();
		xhttpTest.open("GET",dataXmlEvalua,false);
		xhttpTest.setRequestHeader('Content-Type', 'text/xml');
		xhttpTest.send("");
		$xmlEvalua = $(xhttpTest.responseXML);
	}
	nQuestion = $xmlEvalua.find('question').length;
	configContent();
}

var hayIntro;
var hayIntro_txt;
var control_feed;

function configContent(){
	lastQuestion = false;
	$totalQuestion_ar = new Array();
	$totalId_ar = new Array();
	$selectId_ar = new Array();
	$selectQuestion_ar = new Array();
	$('#autoevaluacion').append('<div id="contenido_test"></div>');
	$('#autoevaluacion').append('<div id="fondo_test"></div>');
	$('#fondo_test').append('<div id="img_intro"><img src="contenidos/img/fondo_test.jpg"/></div>');
	if($xmlEvalua.find('titular_pagina').length>0){
		var posxTit = $xmlEvalua.find('titular_pagina').attr('posx');
		var posyTit = $xmlEvalua.find('titular_pagina').attr('posy');
		var posxText = $xmlEvalua.find('texto_pagina').attr('posx');
		var posyText = $xmlEvalua.find('texto_pagina').attr('posy');
		$('#fondo_test').prepend('<div id="titular_pagina"><h1>'+$xmlEvalua.find('titular_pagina').text()+'</h1></div>');
		$('#fondo_test').prepend('<div id="texto_pagina"><p>'+$xmlEvalua.find('texto_pagina').text()+'</p></div>');
		$('#img_intro').find('img').css({
			'position'	:	'absolute',
			'top'		:	'0px',
			'left'		:	'0px',
			'z-index'	:	'1'
		});
		$('#titular_pagina').css({
			'position'	:	'absolute',
			'top'		:	posyTit+'px',
			'left'		:	posxTit+'px',
			'z-index'	:	'2'
		});
		$('#texto_pagina').css({
			'position'	:	'absolute',
			'top'		:	posyText+'px',
			'left'		:	posxText+'px',
			'z-index'	:	'2'
		});
	}
	$xmlEvalua.find('content').each(function(s){
		//hayIntro = $xmlEvalua.find('introduction').attr('intro');
		hayIntro_txt = $xmlEvalua.find('introduction').attr('intro');
		if(hayIntro_txt=="true"){
			hayIntro = true;
		} else {
			hayIntro = false;
		}
		// INTRO
		
		if(hayIntro){
			$('#contenido_test').append('<div id="introduccion"></div>');
			$xmlEvalua.find('introduction').each(function(){
				if($(this).find('title').text().length>0){
					$('#introduccion').append('<div id="titulo"><h1>'+$(this).find('title').text()+'</h1></div>');
				}	
				if($(this).find('subtitle').text().length>0){
					$('#introduccion').append('<div id="subtitulo"><h3>'+$(this).find('subtitle').text()+'</h3></div>');
				}
				if($(this).find('description').text().length>0){
					$('#introduccion').append('<div id="descripcion"><p>'+$(this).find('description').text()+'</p></div>');
				}
			});
		}
		
		// FEEDBACK GLOBAL
		$(this).find('feedback_final_right').each(function(){
			if($(this).find('feedr_titular').text().length>0){
				feedBack_right = $(this).find('feedr_titular').text();
			}
			feedBack_R = $(this).find('feedr_texto').text();
		});
		
		$(this).find('feedback_final_wrong').each(function(){
			if($(this).find('feedw_titular').text().length>0){
				feedBack_wrong = $(this).find('feedw_titular').text();
			}
			feedBack_W = $(this).find('feedw_texto').text();
		});		
	});


	if(hayIntro){
		$('#contenido_test').append('<div id="bt_comenzar"><img id="btIni" src="contenidos/img/bt_test_comenzar.png"/></div>');
	}

	
	$xmlEvalua.find('test').each(function(i){
		nSelect = $(this).attr('numberQuestion');
		scoreQuestion = $(this).attr('score');
		enviaScorm = $(this).attr('enviaSCORM');
		control_feed = $(this).attr('feedback');
		evalua = true;
		if(enviaScorm=="true"){
			envScorm = true;
		}
		$('#contenido_test').append('<div id="test"></div>');
	});

	calculaRandom();
}

var random;
function calculaRandom(){
	random = Math.floor(Math.random()*nQuestion);
	$xmlEvalua.find('question').each(function(i){
		$totalQuestion_ar[i] = $(this);
		$totalId_ar[i] = $(this).attr('id');
	});
	addQuestion();
}

function addQuestion(){
	if($.inArray($totalId_ar[random], $selectId_ar)>-1){
		calculaRandom();
	} else {
		$selectId_ar.push($totalId_ar[random]);
		$selectQuestion_ar.push($totalQuestion_ar[random]);
		if($selectQuestion_ar.length<nSelect){
			calculaRandom();
		} else {
			configTest();
		}
	}
}

function configTest(){
	nPregunta = 0;
	seccion = "";
	$('#test').hide();
	// each como un for
		
	$.each($selectQuestion_ar,function(i) {
		$('#test').append('<div id="question'+i+'" class="form_"></div>');
		$('#test').find('#question'+i).each(function(){
			seccion = '<form id="form_'+i+'" name="form_'+i+'">';
			seccion+= '<div class="question"><p>'+(i+1)+'. '+$selectQuestion_ar[i].find('label').text()+'</p></div>';
			$selectQuestion_ar[i].find('option').each(function(s){
				if($(this).attr('correct')=="true"){
					seccion += '<label><input type="radio" id="form_'+i+'_'+s+'" name="form_'+i+'" value="'+$(this).attr('correct')+'"><p class="textoInput">'+$(this).find('option_text').text()+'</p></input><div id="feed_'+i+'_'+s+' "class="feed_n"><div class="imgFeed_true"></div><p>'+$(this).find('feed').text()+'</p><div class="img_siguiente"></div></div></label>';
				} else {
					//seccion += '<label><input type="radio" id="form_'+i+'_'+s+'" name="form_'+i+'" value="'+$(this).attr('correct')+'"><p class="textoInput">'+$(this).find('option_text').text()+'</p></input><div id="feed_'+i+'_'+s+' "class="feed_n"><div class="imgFeed_false"></div><p>'+$(this).find('feed').text()+'</p><div class="img_intenta"></div></div></label>';
					seccion += '<label><input type="radio" id="form_'+i+'_'+s+'" name="form_'+i+'" value="'+$(this).attr('correct')+'"><p class="textoInput">'+$(this).find('option_text').text()+'</p></input><div id="feed_'+i+'_'+s+' "class="feed_n"><div class="imgFeed_false"></div><p>'+$(this).find('feed').text()+'</p></div></label>';
				}
			});
			seccion += '<div id="bt_Siguiente'+i+'"><img id="btNext" class="next_desactivado" src="contenidos/img/bt_test_siguiente.png"/></div>';
			seccion += '</form>';
			$(this).append(seccion);
				
			$(this).hide();
		});
		
	});
	$('#test').find('input').each(function(){
		$(this).click(function(){
			fcheckButton();
		});
	});
	
	fnavega();
	$('#test').show();
	
	config_feed();
	
}

//var altoIcTest;
//var margenTest;
function config_feed(){
	$('#test').find('#form_'+nPregunta).each(function(s){	
		$(this).find('.feed_n').each(function(){
			if(enviaScorm=="true"){
				$(this).find('.img_intenta').remove();
			}
			/*altoIcTest = $(this).outerHeight();
			margenTest = Math.floor(altoIcTest/2)-26;*/
			/*$(this).find('div:first').css({
				'margin-bottom' : '-15px',
				'padding-top' : margenTest+'px',
				'padding-bottom' : Number(margenTest+1)+'px'
			});
			if(enviaScorm=="false"){
				$(this).find('.img_intenta').css({
					'margin-top' : Math.round(margenTest-15)+'px'
				});
			}*/
			
		});
	});
}

/*********************** navegacion *********************/
function fnavega(){
$('#cubrecapa').hide();
	if(hayIntro){
		$("#btIni").click(function(){
			fcomienzatest();
		});
	} else {
		fcomienzatest();
	}
	
	$('#test').find('.form_').each(function(){
		$(this).find('#btNext').each(function(){
			$(this).click(function(){
				fevaluaNext($(this));
			});
		});
	});
}



/*********************** comienza test *****************/

function fcomienzatest(){
	puntua = 0;
	if(hayIntro){
		//$('#img_intro').fadeOut(200);
		$('#img_intro').find('img').fadeOut(200);
		//$('#descripcion').fadeOut(200);
		$('#introduccion').fadeOut(200);
		$('#imagen_intro').fadeOut(200);
		$('#bt_comenzar').fadeOut(200,function() {
			$('#bt_comenzar').hide();
			cargaPregunta(nPregunta);
		});
	} else {
		cargaPregunta(nPregunta);
	}

	if(enviaScorm == "true"){
		LMSSetValue("cmi.core.score.raw", valor_score_inicial);
	}	
}

function cargaPregunta(n){
	activo = false;
	$('#test').find('#form_'+n).each(function(){
		$(this).find('#btNext').each(function(){
			$(this).removeClass('next_activado');
			$(this).addClass('next_desactivado');
			
			if(((control_feed=="individual")&&(enviaScorm=="false"))){
			
				$(this).parent().parent().find('.imgFeed_false').css({
					'width'	:	'260px'
				});
				if(nPregunta == (nSelect-1)){
					$(this).css({
						'display' : 'none'
					});
					lastQuestion = true;
					// ancho del ic false a 380px
				} 
			}
		});
	});
	
	if(n==0){
		$('#question'+n).fadeIn(100);
	} else {
	
		$('#question'+n).delay(500).fadeIn(100, function(){
			config_feed();
		});
	}
}

//var altoForm;
//var margen_img_feed;

function fcheckButton(){
	activo = true;
	////////////////
	$('#test').find('#form_'+nPregunta).each(function(){
	//img_intenta
		if(((control_feed=="individual")&&(enviaScorm=="true"))||((control_feed=="individual")&&($(this).find('input:radio[@name=form_'+nPregunta+']:checked').val()=="true"))||(control_feed=="global")){
			var nnn = $(this).find('input:radio[@name=form_'+nPregunta+']:checked').attr('id');
			var nnn_id = nnn.slice(nnn.length-4,nnn.length)
			$(this).find('#btNext').each(function(s){
				$(this).removeClass('next_desactivado');
				$(this).addClass('next_activado');
				/***********************************************/
				// Control Events
				if(lastQuestion){
					nEvents_ar[0] = 1;
					activeEvents();
				}
				/***********************************************/
				
			});
			$(this).find('input').attr('disabled', 'disabled');
			if($(this).find('input:radio[@name=form_'+nPregunta+']:checked').val()=="true"){
				puntua++;
			}
			
		}	
		
		///////////////////
		
		if(control_feed=="individual"){

			$(this).find('input:radio[@name=form_'+nPregunta+']').parent().each(function(){
				$(this).find('.feed_n').css({
					'display' : 'none'
				});
			});
			
			if($(this).find('input:radio[@name=form_'+nPregunta+']:checked').val()=="true"){
				$(this).find('input:radio[@name=form_'+nPregunta+']:checked').parent().each(function(){
					$(this).find('.feed_n').css({
						'display' : 'block'
					});
				});
			
			} else if($(this).find('input:radio[@name=form_'+nPregunta+']:checked').val()=="false"){
				$(this).find('input:radio[@name=form_'+nPregunta+']:checked').parent().each(function(){
					$(this).find('.feed_n').css({
						'display' : 'block'
					});
				});
				
			} 

		}
		
		if(control_feed=="global"){
			// mostrar pantalla feedback final
		}
	});
}

		
var aprueba;
var txt_puntuacion;
function fevaluaNext(e){
	txt_puntuacion = "Tu puntuaci&oacute;n ha sido de "
	if(e.hasClass('next_desactivado')){
		
	} else if(e.hasClass('next_activado')){
		$('#question'+nPregunta).fadeOut();
		if(nPregunta < (nSelect-1)){
			nPregunta++;
			cargaPregunta(nPregunta);
		} else {
			//porcentajeTest = puntua*100/nSelect;
			porcentajeTest = Math.round(puntua*100/nSelect);
			if(porcentajeTest<scoreQuestion){
				// no has aprobado
				aprueba = false;
				//$('#contenido_test').append('<div id="resultado" class="oculta_respuesta"><p><img src="contenidos/img/ico_incorrecto.jpg"/>'+feedBack_wrong+'</p></div>');
				//LMSSetValue("cmi.core.lesson_status","failed");
			} else {
				// has aprobado
				aprueba = true;
				//$('#autoevaluacion').append('<div id="resultado" class="oculta_respuesta"><p><img src="contenidos/img/ico_correcto.jpg"/>'+feedBack_right+'</p></div>');	
			//	$('#autoevaluacion').append('<div id="resultado" class="oculta_respuesta"><p>'+feedBack_right+'</p></div>');	
				//LMSSetValue("cmi.core.lesson_status","passed");
			}
			
			if(aprueba){
				feedBack_ = feedBack_R;
			} else{
				feedBack_ = feedBack_W;
			}
			
			//if(enviaScorm == "true"){
			if(envScorm){
				if(aprueba){
					//$('#contenido_test').append('<div id="porcentaje" class="oculta_respuesta"><p>'+feedBack_right+'</p><p>'+feedBack_+'</p><p class="respuesta">'+txt_puntuacion+porcentajeTest+'%</p></div>');
					$('#contenido_test').append('<div id="porcentaje"><p>'+feedBack_right+'</p><p>'+feedBack_+'</p><p class="respuesta">'+txt_puntuacion+porcentajeTest+'%</p></div>');
				} else {
					//$('#contenido_test').append('<div id="porcentaje" class="oculta_respuesta"><p>'+feedBack_wrong+'</p><p>'+feedBack_+'</p><p class="respuesta">'+txt_puntuacion+porcentajeTest+'%</p></div>');
					$('#contenido_test').append('<div id="porcentaje"><p>'+feedBack_wrong+'</p><p>'+feedBack_+'</p><p class="respuesta">'+txt_puntuacion+porcentajeTest+'%</p></div>');
				}
				/***********************************************/
				// Control Events
				nEvents_ar[0] = 1;
				activeEvents();
				/***********************************************/
				
			} else {
				//$('#contenido_test').append('<div id="porcentaje" class="oculta_respuesta"><p>'+feedBack_+'</p><p class="respuesta">'+txt_puntuacion+porcentajeTest+'%</p></div>');
				$('#contenido_test').append('<div id="porcentaje"><p>'+feedBack_+'</p><p class="respuesta">'+txt_puntuacion+porcentajeTest+'%</p></div>');
				/***********************************************/
				// Control Events
				nEvents_ar[0] = 1;
				activeEvents();
				/***********************************************/
			}

		
			$('#fondo_test').find('#img_intro').fadeIn(200);
			$('#porcentaje').hide();
			$('#porcentaje').delay(800).fadeIn(100);
			var scoreOld =LMSGetValue("cmi.core.score.raw");
			if(scoreOld=""){
				scoreOld = 0;
			}

		//	if(enviaScorm == "true"){
			if(envScorm){
				if(porcentajeTest>valor_score_inicial){
					if(aprueba){
						LMSSetValue("cmi.core.lesson_status","passed");
					} else {
						LMSSetValue("cmi.core.lesson_status","failed");
					}
					LMSSetValue("cmi.core.score.raw", porcentajeTest);
				}
			}
			
			
			LMSCommit();
			
			$('#porcentaje').find('.respuesta').css({
				'font-weight': 'bold',
				'font-size' : '20px',
				'color' : '#35355'
			});
		}
	} 
}



