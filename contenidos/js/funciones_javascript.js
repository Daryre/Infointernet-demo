function cambia_pestana(idcapa,valor)
{

    // var capasg = getElementsByClassName(document.getElementsByTagName('div'),'capa_extras');
    //Oculta todas las capas de las pesnias y muestra solo la requerida
    $(".capa_extras").each(function(){
        $(this).hide();
    })
   
   //$("#"+idcapa).attr("style", "display:block");
    $("#"+idcapa).attr("style", "display:block; height:"+alto_capas_pestanias+"px");
    //cambia la pestania seleccionada
    $(".lista_extras").each(function(){
        $(this).children().removeClass();
    })
    $("#pestana_"+valor).attr("class", "selected");
    
}


//****** construte autoevalua
function fautoevalua(){
	parseXML();
}

var alto_capas_pestanias=0;
var alto_img = 0;
function creaJavascript()
{

	if((user_android)&&($(window).height()<500)){
		var alto_a = $(window).height() - 40;
		//$('.twoColHybLtHdr').width('30%');
		//$('#container').height('30%');
		$('#cubrecapa').css({
			'z-index' : '40'
		});
		$('#navegacion').css({
			'position' : 'fixed',
			'top' : alto_a+'px',
			'z-index' : '50'
		});
		$('.modalLayer').css({
			'z-index' : '51'
		});
		
	}
	
	
	// *********** activo la posibilidad de escala en tablets
	$('body').unbind('touchmove');
	
	// *********** compruebo si es autoevaluacion
	if($('#elcuerpo').find('#autoevaluacion').length>0){
			fautoevalua();
	}
	
	// *********** compruebo si es glosario
	if($('#elcuerpo').find('#glosario').length>0){
			fglosario();
	}
	
	// *********** compruebo si es material
	if($('#elcuerpo').find('#materiales').length>0){
			fmateriales();
	}

	// *********** compruebo si es ayuda
	if($('#elcuerpo').find('#ayuda').length>0){
			fayuda();
	}

	
	// *********** compruebo si hay imagen a pantalla completa
	if($('#elcuerpo').find('#imagen').length>0){
		fImagen();
		
	} else {
		fnoImagen();
	}
	
	// *********** compruebo si hay texto con imagen
	if($('#elcuerpo').find('.texto_imagen').length>0){
			fTexto_imagen();
	}
	
	// *********** compruebo si hay boton extra
	if($('#elcuerpo').find('.boton_extra').length>0){
			fboton_extra();
	}
	
	// *********** compruebo si hay boton flotante
	if($('#elcuerpo').find('.boton_flotante').length>0){
			fboton_flotante();
	}

	// *********** compruebo si hay acrónimo
	if($('#elcuerpo').find('.acronym').length>0){
			facronym();
	}
	
	// *********** compruebo si hay div flotante
	if($('#elcuerpo').find('.div_flotante').length>0){
			fdiv_flotante();
	}
	
	// *********** compruebo si hay call to action
	if($('#elcuerpo').find('#call').length>0){
			fcall();
	}	
	
	// *********** compruebo si hay footer
	if($('#elcuerpo').find('.footer').length>0){
			ffooter();
	}
	
	// *********** compruebo si hay enlaces de listados
	if($('#elcuerpo').find('#enlaces_list').length>0){
			openListado();
	}
	
	// *********** compruebo si hay popups
	if($('#elcuerpo').find('.ventana_popup').length>0){
			creaPopup();
	}	
	
	// *********** compruebo si hay info
	if($('#elcuerpo').find('.show_info').length>0){
			creaShow_info();
	}
	
	// *********** compruebo si hay galeria de imagenes
	if($('#elcuerpo').find('#galeria_fotos').length>0){
			creaGaleria();
	}
	
	
	// *********** compruebo si hay ejercicio de seleccionar y arrastrar
	if($('#elcuerpo').find('#select_drag').length>0){
			configSelect_Drag();
	}
	
	// *********** compruebo si hay ejercicio de arrastrar
	if($('#elcuerpo').find('#config_drag').length>0){
			config_dataDrag();
	}
	
	
	// *********** compruebo si hay video (youtube)
	if($('#elcuerpo').find('#video').length>0){
			creaVideoYTB();
	}
	
	// *********** compruebo si hay player video 
	if($('#elcuerpo').find('#player_video').length>0){
			creaVideo();
	}

	
	// *********** compruebo si herramienta galería 
	if($('#elcuerpo').find('#herramienta_galeria').length>0){
			activagallery();
	}

    //*****Esto crea el javascript de los desplegables.

    //obtenemos los enlaces que son desplegables
    var arEnlaces2 = getElementsByClassName(document.getElementsByTagName('a'),'selector_tipo2');
    //obtenemos las capas que contienen los desplegables.
    var arDivs2 = getElementsByClassName(document.getElementsByTagName('div'),'desplegable_tipo2');


    for(var z=0;z<arEnlaces2.length;z++)
    {
        //Rellenamos los enlaces añadiendo un id y javascript en el href
        id_enlace = "enlacedesplegable_lat"+z;
        id_capa_oculta="ejemplodesplegable_lat"+z;
        arEnlaces2[z].id=id_enlace;
        arEnlaces2[z].href = "javascript:showhidelayer2('"+id_capa_oculta+"','"+id_enlace+"')";
        //añado a las capas un id y las oculto.
        arDivs2[z].id = id_capa_oculta;
        arDivs2[z].style.display="none";

    }



    //Rediseño de las tablas dinamicas.
    var e_izq = getElementsByClassName(document.getElementsByTagName('div'),'div_izquierda');
    var e_der = getElementsByClassName(document.getElementsByTagName('div'),'div_derecha');
    for(var y=0;y<e_izq.length;y++)
    {
        capaInicio=document.createElement("DIV");
        capaDentro=document.createElement("DIV");
        capaDentro.innerHTML = document.getElementById("ApartIniTabDic").innerHTML;
        capaInicio.appendChild(capaDentro);
        capaInicio.className="desplegable_tipo2";
        capaInicio.id ="capaInicial";
        capaInicio.style.display ="block";
        capaInicio.style.height ="100%";

        e_der[y].appendChild(capaInicio);
        capaDentro.parentNode.style.height = e_izq[y].offsetHeight+"px";
        capaDentro.style.position = "relative";
        capaDentro.style.top = (e_izq[y].offsetHeight/2)-20 +"px";
        //var height2;
        var width2;
        width2 = e_izq[y].offsetWidth;
        e_der[y].style.width = width2+"px";
    }


    //*****Esto crea el javascript de los popups

    //obtenemos los enlaces que lanzan los popups.
    var arEnlacePUP1 = getElementsByClassName(document.getElementsByTagName('a'),'botonpopup1');
    //obtenemos las capas que contienen los popups.
    var arDivsPUP1 = getElementsByClassName(document.getElementsByTagName('div'),'popup1');
    for(var x=0;x<arEnlacePUP1.length;x++)
    {
        //añado a los enlaces la funcion javascript.
        id_capa_popup="divpopup"+arEnlacePUP1[x].id.substr(arEnlacePUP1[x].id.indexOf('_'),arEnlacePUP1[x].id.length);
        arEnlacePUP1[x].href = "javascript:mostrarpopup('"+id_capa_popup+"')";
    }

    for(var u=0;u<arDivsPUP1.length;u++)
    {
        var ancho;
        var posicion;

        if(arDivsPUP1[u].className.indexOf("pequeno")!=-1)
            ancho = "little";
        else if(arDivsPUP1[u].className.indexOf("grande")!=-1)
            ancho = "big";
        else if(arDivsPUP1[u].className.indexOf("auto")!=-1)
            ancho = "auto-size";

        if(arDivsPUP1[u].className.indexOf("centrada")!=-1)
            posicion = "capa_centrada";
        else if(arDivsPUP1[u].className.indexOf("fija")!=-1)
            posicion = "fijada";
        else
            posicion = "";

        iniciarpopup(arDivsPUP1[u].id,ancho,posicion,'popup1');
    }


   //Crea rollover de las palabras del glosario.

    //obtenemos los enlaces que lanzan los rollovers.
    var arEnlaceGlo = getElementsByClassName(document.getElementsByTagName('span'),'palabraglosario');
    //obtenemos las capas que contienen los rollovers.
    for(var fr=0;fr<arEnlaceGlo.length;fr++)
    {

        id_capa_glos="divglos"+arEnlaceGlo[fr].id.substr(arEnlaceGlo[fr].id.indexOf('_'),arEnlaceGlo[fr].id.length);
        arEnlaceGlo[fr].onmouseover = function() {openglos(this.id)};
        arEnlaceGlo[fr].onmouseout = function() {closeglos(this.id)};


        capadedentro=document.createElement("DIV");
        elementosdentro=document.getElementById(id_capa_glos).childNodes;
        while(elementosdentro.length>0)
        {
            capadedentro.appendChild(elementosdentro[0]);
            elementosdentro=document.getElementById(id_capa_glos).childNodes;
        }
        document.getElementById(id_capa_glos).appendChild(capadedentro);
    }

   //Crea pestañas ayuda

   var arEnlacePestanas = getElementsByClassName(document.getElementsByTagName('ul'),'lista_extras');
   var arCapasPestanas = getElementsByClassName(document.getElementsByTagName('div'),'capa_extras');
   var contCap=0;
   

   var alto_li=0; // alto pestaña
   var dif_alto_li=0; // diferencia alto pestaña
   var nn = 0;
   var altoP_ar = new Array();// alto inicial pestañas para centrar contenido
   //  alert(alto_capas_pestanias+" . "+$(arCapasPestanas[v]).height());
   $('#elcuerpo').find('.capa_extras').each(function(s){
		//alert($(this).height());
   });
   for(var p=0;p<arEnlacePestanas.length;p++)
   {
       for(var v=0;v<arCapasPestanas.length;v++)
       {
           arCapasPestanas[v].id = "capa_"+v;
           arCapasPestanas[v].style.display="none";
		  
			
		   if(alto_capas_pestanias<$(arCapasPestanas[v]).height()){
				alto_capas_pestanias = $(arCapasPestanas[v]).height()+10;		
		   }
		  
       }
	   
       var listali = arEnlacePestanas[p].childNodes;
	   
	   for(var h=0;h<listali.length;h++)
       { 
		if(listali[h].tagName=="LI"){
				nn++;
				
		    }
	   }
	   
       for(var q=0;q<listali.length;q++)
       {
           if(listali[q].tagName=="LI")
           {
                enlace_pest=document.createElement("a");

                texto = listali[q].innerHTML;
                listali[q].innerHTML ="";

                listali[q].id = "pestana_"+contCap;
                enlace_pest.innerHTML = texto;
                enlace_pest.href = "javascript:cambia_pestana('capa_"+contCap+"',"+contCap+")";
                listali[q].appendChild(enlace_pest);
				altoP_ar.push($("#lista_pestanias a").height());
				
				///////////////////////////
				if(nn == 5){
					$("#lista_pestanias a").addClass('ancho_pestania5');
					$("#lista_pestanias a:link").addClass('ancho_pestania5');
					$("#lista_pestanias a:visited").addClass('ancho_pestania5');
					/*******************************************************************/
					$("lista_pestanias li.selected a").addClass('ancho_pestania5');
					$("lista_pestanias li.selected a:link").addClass('ancho_pestania5');
					$("lista_pestanias li.selected a:visited").addClass('ancho_pestania5');
				}
				///////////////////////////
				if(nn == 4){
					$("#lista_pestanias a").addClass('ancho_pestania4');
					$("#lista_pestanias a:link").addClass('ancho_pestania4');
					$("#lista_pestanias a:visited").addClass('ancho_pestania4');
					/*******************************************************************/
					$("lista_pestanias li.selected a").addClass('ancho_pestania4');
					$("lista_pestanias li.selected a:link").addClass('ancho_pestania4');
					$("lista_pestanias li.selected a:visited").addClass('ancho_pestania4');
				}
				///////////////////////////
				if(nn == 3){
					$("#lista_pestanias a").addClass('ancho_pestania3');
					$("#lista_pestanias a:link").addClass('ancho_pestania3');
					$("#lista_pestanias a:visited").addClass('ancho_pestania3');
					/*******************************************************************/
					$("lista_pestanias li.selected a").addClass('ancho_pestania3');
					$("lista_pestanias li.selected a:link").addClass('ancho_pestania3');
					$("lista_pestanias li.selected a:visited").addClass('ancho_pestania3');
				}
				///////////////////////////
				if(nn == 2){
					$("#lista_pestanias a").addClass('ancho_pestania2');
					$("#lista_pestanias a:link").addClass('ancho_pestania2');
					$("#lista_pestanias a:visited").addClass('ancho_pestania2');
					/*******************************************************************/
					$("lista_pestanias li.selected a").addClass('ancho_pestania2');
					$("lista_pestanias li.selected a:link").addClass('ancho_pestania2');
					$("lista_pestanias li.selected a:visited").addClass('ancho_pestania2');
				}
				///////////////////////////
				if($("#pestana_"+contCap).height()>alto_li){
					alto_li = $("#pestana_"+contCap).height();
				}
				if(Number(alto_li-$("#pestana_"+contCap).height())>dif_alto_li){
					dif_alto_li = alto_li-$("#pestana_"+contCap).height();
				}
				$("#pestana_"+contCap).css({marginTop: '20'});
                contCap++;
           }
       }
	   
	    $("#lista_pestanias").find("a").each(function(ii){
			if($(this).parent().height()<alto_li){
				var pad = Math.round((alto_li-$(this).parent().height())/2);				
				$(this).css({paddingTop: pad+"px"});
				$(this).css({paddingBottom: (alto_li-($(this).height()+pad))+"px"});
			}
	});
	comprueba_listado_textoImagen();
   }

   var alto_final_pestania = 0;
   

	$("#elcuerpo").find(".capa_extras").each(function(){
		if(ie){
			$(this).find('img').load(function(){
				alto_final_pestania = alto_capas_pestanias+$(this).height();
				alto_capas_pestanias+=$(this).height();
				cambia_pestana('capa_0',0);
			});
		
			if($(this).find('ul').length>0){
				alto_capas_pestanias+=500;
				cambia_pestana('capa_0',0);
			}
		} 
	
	$(this).css({
			'height' : alto_capas_pestanias+'px'
		});			
   });
   
   
  var arListasOrdenadas = document.getElementsByTagName('ol');
   for(var arlo=0;arlo<arListasOrdenadas.length;arlo++)
   {
       var arlistali = arListasOrdenadas[arlo].childNodes;
       for(var t=0;t<arlistali.length;t++)
       {
           if(arlistali[t].tagName=="LI")
           {
                spanintLista=document.createElement("span");

                textoLI = arlistali[t].innerHTML;
                arlistali[t].innerHTML ="";

                spanintLista.innerHTML = textoLI;
                arlistali[t].appendChild(spanintLista);
           }
       }
   }

   //Inicia Glosario
   glosario('a',1);
   //Inicia Pestañas
   cambia_pestana('capa_0',0);
	
   limpiaBullets();
}

function getElementsByClassName(node, classname)
{
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node;
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function showhidelayer(capa,enlace)
{
    if(document.getElementById(capa).style.display=="block")
    {
        document.getElementById(capa).style.display="none";
        document.getElementById(enlace).className="selector";
    }
    else
    {
        document.getElementById(capa).style.display="block";
        document.getElementById(enlace).className="selectorseleccionado";
    }
}

function showhidelayer2(capa,enlace)
{
    document.getElementById("capaInicial").style.display="none";
    var elementos = document.getElementsByTagName("div");
	for (i=0;i<=(elementos.length);i++)
	{
            if (document.getElementById("ejemplodesplegable_lat"+i))
            {
                document.getElementById("ejemplodesplegable_lat"+i).style.display="none";
            }
	}
    var elementos_enlace = document.getElementsByTagName("a");
	for (x=0;x<=(elementos_enlace.length);x++)
	{
            if (document.getElementById("enlacedesplegable_lat"+x))
            {
                document.getElementById("enlacedesplegable_lat"+x).className = "selector_tipo2";
            }
	}


    document.getElementById(capa).style.display="block";
    document.getElementById(enlace).className="selectorseleccionado_tipo2";
    
    var HeiDiv = document.getElementById(capa).getElementsByTagName("div")[0].offsetHeight;

    //if(document.getElementById(enlace).parentNode.offsetHeight<document.getElementById(capa).offsetHeight){
		if(document.getElementById(enlace).parentNode.offsetHeight<HeiDiv){
        document.getElementById(capa).parentNode.style.height = document.getElementById(capa).offsetHeight+"px";
        document.getElementById(capa).style.height = "auto";
    }else{
        document.getElementById(capa).parentNode.style.height = document.getElementById(enlace).parentNode.offsetHeight+"px";
        document.getElementById(capa).style.height = "100%";
    }

    document.onmousemove = checkwhere;
    calcSize();
}

function mostrarpopup(capa)
{
    var arrpopups = getElementsByClassName(document.getElementsByTagName('div'),'popup1');
    for(var i=0;i<arrpopups.length;i++)
    {
        var id_capa = arrpopups[i].id;
        document.getElementById(id_capa).style.display = "none";
    }
	var elementos = document.getElementsByTagName("div");
	for (i=0;i<=(elementos.length);i++)
	{
		if (document.getElementById("ejemplopopup"+i))
		{
			document.getElementById("ejemplopopup"+i).style.display="none";
		}
	}
    document.getElementById(capa).style.display="block";
}
function ocultarpopup(event)
{
    var pinchado;
    if(window.event)
    {
        pinchado=window.event.srcElement.parentNode;
    }
    else
    {
        pinchado=event.currentTarget.parentNode;
    }
    pinchado.style.display="none";
}

function iniciarpopup(capa, ancho, posicion, tipo)
{
    botoncerrar_right=document.createElement("A");
    botoncerrar_left=document.createElement("A");
    capadedentro=document.createElement("DIV");

    var capa_p;
    var capa_div;

    if(tipo=="popup1")
    {
        capa_p="saber1";
        capa_div="PopUpContenido1";
    }

    if(ancho!=null&&ancho!="")
    {
        document.getElementById(capa).className = document.getElementById(capa).className + " " + ancho;
    }
    if(posicion!=null&&posicion!="")
    {
        document.getElementById(capa).className = document.getElementById(capa).className + " " + posicion;
    }

    botoncerrar_right.className="barrapopup_azul";
    botoncerrar_left.className="barrapopup";
    elementosdentro=document.getElementById(capa).childNodes;
    document.getElementById(capa).style.padding="0px";
    while(elementosdentro.length>0)
    {
        if(elementosdentro[0].tagName=='P')
            elementosdentro[0].className=capa_p;

        if(elementosdentro[0].tagName=='DIV')
            elementosdentro[0].className=capa_div;

        capadedentro.appendChild(elementosdentro[0]);
        elementosdentro=document.getElementById(capa).childNodes;
    }

	document.getElementById(capa).appendChild(botoncerrar_right);
    document.getElementById(capa).appendChild(botoncerrar_left);
    document.getElementById(capa).appendChild(capadedentro);
    document.getElementById(capa).position="absolute";
    document.getElementById(capa).style.display="none";
    botoncerrar_left.onclick=ocultarpopup;
    botoncerrar_right.onclick=ocultarpopup;
}

function glosario(id_capa,enlace)
{
    var capasg = getElementsByClassName(document.getElementsByTagName('div'),'capa_glosario');
    if(capasg.length>0)
    {
        for(var i=0;i<capasg.length;i++)
        {
            //Ocultamos todas las capas.
            capasg[i].style.display="none";
        }
        document.getElementById(id_capa).style.display ="block";
    }
    var enlacesg = getElementsByClassName(document.getElementsByTagName('a'),'alfa');
    if(enlacesg.length>0)
    {
        for(var x=0;x<enlacesg.length;x++)
        {
            //Ocultamos todas las capas.
            enlacesg[x].className = "alfa"
        }
        document.getElementById(enlace).className = "alfa activo";
    }
}
function limpiaBullets()
{
    var arLista = document.getElementsByTagName('li');
    if(arLista.length>0)
    {
        for(var x=0;x<arLista.length;x++)
        {
            var lista2 = arLista[x].childNodes
            if(lista2.length>0)
            {
                for(var i=0;i<lista2.length;i++)
                {
                    if(lista2.item(i).tagName != undefined && lista2.item(i).tagName.toLowerCase()=="ul")
                    {
                        //arLista[x].style.background = "none";
                        arLista[x].className = "limpia_bullet";
                    }
                    if(lista2.item(i).tagName != undefined && lista2.item(i).tagName.toLowerCase()=="ol")
                    {
                        arLista[x].className = "borrado";
                    }
                }
            }
        }
    }
}
var xCoord;
var yCoord;
var myWidth = 0, myHeight = 0;


function openglos(idGlos){
	var posX_glos;
	var posY_glos;
	// idGlos: id palabra
    var idCapaGlos = "divglos"+idGlos.substr(idGlos.indexOf('_'),idGlos.length);
    document.getElementById(idCapaGlos).style.display="block";
    var sizeY = document.getElementById(idCapaGlos).offsetHeight + 10;
    var sizeX = document.getElementById(idCapaGlos).offsetWidth + 10;

    if(yCoord < sizeY)
        yCoord+=sizeY;
    else
        yCoord-=sizeY;
	
	posX_glos = document.getElementById(idGlos).offsetWidth+document.getElementById(idGlos).offsetLeft;
	posY_glos = document.getElementById(idGlos).offsetHeight+document.getElementById(idGlos).offsetTop;
	
	 if(yCoord < sizeY)
        yCoord+=sizeY;
    else
        yCoord-=sizeY;
	
	
    if((xCoord+sizeX)>myWidth)
        xCoord-=sizeX;
	
	document.getElementById(idCapaGlos).style.left=posX_glos+"px";
    document.getElementById(idCapaGlos).style.top=posY_glos+"px";
	if(posX_glos>550){
		document.getElementById(idCapaGlos).style.left=(posX_glos-165)+"px";
	}
	if(posY_glos>300){
		 document.getElementById(idCapaGlos).style.top=(posY_glos-document.getElementById(idCapaGlos).offsetHeight-20)+"px";
	}
	
	if(ie){
		if(posX_glos>550){
			document.getElementById(idCapaGlos).style.left=(posX_glos-180)+"px";
		}
		if(posY_glos>300){
			 document.getElementById(idCapaGlos).style.top=(posY_glos-document.getElementById(idCapaGlos).offsetHeight-20)+"px";
		}
	}
	
    document.getElementById(idCapaGlos).style.visibility="visible";
	
	
   /* document.getElementById(idCapaGlos).style.left=xCoord+"px";
    document.getElementById(idCapaGlos).style.top=yCoord+"px";
    document.getElementById(idCapaGlos).style.visibility="visible";*/
	
}
function closeglos(idGlos){ 
	var idCapaGlos = "divglos"+idGlos.substr(idGlos.indexOf('_'),idGlos.length);
    document.getElementById(idCapaGlos).style.display="none";
    document.getElementById(idCapaGlos).style.visibility="hidden";
}

function checkwhere(e) {
	if (document.all){
		xCoord = event.x +document.body.scrollLeft;
		yCoord = event.y +document.body.scrollTop;
	}
	else if (document.getElementById && navigator.userAgent.indexOf('Safari')==-1){
		xCoord = e.clientX+ window.scrollX;
		yCoord = e.clientY+ window.scrollY;
	}
	else if (document.getElementById) {
		xCoord = e.clientX;
		yCoord = e.clientY;
	}
}
function calcSize() {
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }

}

function abre_new(ancho, alto, url) {
  window.open(url, 'Flash', 'width='+ancho+',height='+alto+',dependent=yes,resizable=no,location=no,scrollbars=no');
}

document.onmousemove = checkwhere;
calcSize();

function cerrar(){
	onUnloadFunction();
	top.close();
}


/**********  MODAL **************/

function openModal(data, conte, tipo){
	var archivo;
	archivo = "contenidos/recursos/"+data;	
	showModal(archivo, conte, tipo);
}
