var paginas=null;
var suspend="";
var startTime;
var valor_score_anterior=0;
var xmlDoc;
var contentPage;
var valorPagActual = 0;
var maxPage = 0;
var pagiActual = "";
var evalua = false;
var envScorm = false;

var pagina_actual;

var npagina;

var pageEvents = new Array();

var loadPage;

	if (document.all){
		$(window).unload( function () { onbunload(); } );
	}


function onbunload()
{
	pasoporAqui(valorPagActual,pagiActual);

    var endTime = new Date();
    var ms = endTime.getTime() - startTime.getTime();
    var h = Math.round(ms/(1000*60*60));
    var m = Math.round((ms-(h*1000*60*60))/(1000*60));
    var segundos = ms-(h*1000*60*60)-(m*1000*60);
    if (segundos < 0)
        segundos = segundos*(-1);

    var s = Math.round(segundos/1000);
    h=((h<10)?"0":"")+Math.abs(h);
    m=((m<10)?"0":"")+Math.abs(m);
    s=((s<10)?"0":"")+Math.abs(s);
    LMSSetValue("cmi.core.session_time", h + ":" + m + ":" + s);
    LMSFinish();
}

var valor_score_inicial;

function onLoadFunction(pagina) {
	fecha = new Date();
    var aleatorio= fecha.getDate()+""+fecha.getHours()+""+fecha.getMinutes()+""+fecha.getSeconds();
    xmlDoc = loadXMLDoc("estructura.xml?nocache="+aleatorio);
    startTime = new Date();
    var result = LMSInitialize();
    if (result == "true") {
        var lessonStatus = LMSGetValue("cmi.core.lesson_status");
        if (lessonStatus == "not attempted") {
            LMSSetValue("cmi.core.lesson_status", "incomplete");
            LMSCommit();
        }
    }
	
	valor_score_inicial = LMSGetValue("cmi.core.score.raw");
	
	
    var pagina_nueva = LMSGetValue("cmi.core.lesson_location");

    if(pagina_nueva !="" && pagina_nueva!=false)
    {
        ////Modificar para generar la pagina inicial
        if(pagina_nueva.indexOf('.htm')>0)
            pagina = pagina_nueva;//Lamamamos a la pagina guardada
    }

    //Ahora  traemos el suspendata para  ver por que paginas hemos pasado.
    suspend=LMSGetValue("cmi.suspend_data");
    if(suspend!=null &&suspend!="")
	{
        paginas=suspend.split(",");
		
		if(paginas.length<numpaginastot)
		{
			cuantasahora=paginas.length;
			for(i=0;i<cuantasahora;i++)
			{
					if(paginas[i]!=0)
					{
						paginas[i]=1;
					}				
			}
		}
		for(i=0;i<numpaginastot;i++)
		{
				if(paginas[i]!=1)
				{
					paginas[i]=0;
				}				
		}
	}
    else
    {
        paginas=new Array();
        for(i=0;i<numpaginastot;i++){
            paginas[i]="0";
        }
        paginas[0]="1";
    }
    cargaPagina(pagina);
	/***************************************************************/
	// WHEN WE HAVE MENU HIDDEN
	/*	
	$('#elmenu').find('#cierraMenu').bind('click',function(){
		showIndex();
	});
*/
	/***************************************************************/
	$.each(paginas,function(i){
		pageEvents[i] = 0;
	});
	
}

function onUnloadFunction() {
    if (!document.all){
			pasoporAqui(valorPagActual,pagiActual);

	    var endTime = new Date();
	    var ms = endTime.getTime() - startTime.getTime();
	    var h = Math.round(ms/(1000*60*60));
	    var m = Math.round((ms-(h*1000*60*60))/(1000*60));
	    var segundos = ms-(h*1000*60*60)-(m*1000*60);
	    if (segundos < 0)
	        segundos = segundos*(-1);
	
	    var s = Math.round(segundos/1000);
	    h=((h<10)?"0":"")+Math.abs(h);
	    m=((m<10)?"0":"")+Math.abs(m);
	    s=((s<10)?"0":"")+Math.abs(s);
	    LMSSetValue("cmi.core.session_time", h + ":" + m + ":" + s);
	    LMSFinish();
    }
    
}

function pasoporAqui(pagina,pag)
{
	npagina = pagina-1;
	
    /*var direccionpadre = self.location.href;//sacamos la direccion de la p�gina contenedora (index.html)
    var direccionhija = self.cuerpo.location.href;//sacamos la direccion de la p�gina actual
    var pos_i = direccionpadre.lastIndexOf('/');
    var direccion = direccionhija.substr(pos_i+1);//eliminamos el m�duloa*/
    //saveLessonLocation(direccion);
    //paginas[pagina-1]="1";
    saveLessonLocation("contenidos"+pag);
    paginas[pagina-1]="1";
    var suspend=paginas.toString();
    LMSSetValue("cmi.suspend_data",suspend);
    cuantaspasadas=0;
    for(j=0;j<paginas.length;j++)
    {
        if(paginas[j]=="1")
            cuantaspasadas++;
    }
	
   // valor_score_anterior= 0;//LMSGetValue("cmi.core.score.raw");
    valor_score_anterior= LMSGetValue("cmi.core.score.raw");
	
    if(valor_score_anterior==""){
        valor_score_anterior=0;
	}
	
    score=Math.ceil(cuantaspasadas*100/paginas.length);
    if(valor_score_anterior<score)
		if(!envScorm){
			LMSSetValue("cmi.core.score.raw", score);
			
		}
	
    if(suspend.lastIndexOf("0")<0)
    {
        lessonStatus = LMSGetValue("cmi.core.lesson_status");
		if(evalua){
		} else {
			 if (lessonStatus != "completed")
			{
				if(!envScorm){
					LMSSetValue("cmi.core.lesson_status","completed");
					LMSSetValue("cmi.core.score.raw", 100);
				}
			}
		} 
    }
    LMSCommit();
}

function saveLessonLocation(value) {
	//alert(value.indexOf("herramientas"));
	if(value.indexOf("herramientas") == -1) {
		var result = LMSSetValue("cmi.core.lesson_location", value);
		//LMSCommit();
	}
}

function loadXMLDoc(dname)
{
	
	switch(window.location.protocol) {
		case 'file:':
			var response;
			if (window.DOMParser)
			{
				parser=new DOMParser();
				response=parser.parseFromString(myObj['xmlestructura'],"text/xml");
			}
			else // Internet Explorer
			{
				response=new ActiveXObject("Microsoft.XMLDOM");
				response.async=false;
				response.loadXML(myObj['xmlestructura']); 
			}
			$("body").css("overflow", "visible");
			$("html").css("overflow", "visible");
		break;
		default: 
			if (window.XMLHttpRequest)
			{
				xhttp=new XMLHttpRequest();
			}
			else  // Internet Explorer
			{
				xhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhttp.open("GET",dname,false);
			xhttp.setRequestHeader('Content-Type', 'text/xml');
			xhttp.send("");
		break;
	}
	//alert(xhttp.responseXML);
	if(window.location.protocol == 'file:') {
		return response;
	} else {
		return xhttp.responseXML;
	}
}

function cargaPagina(pagina)
{
	// eliminamos los titulares si están vacíos
	$('body').find('#headDerTitModulo').each(function(){
		if(($(this).find('h5').text()=="standar")){
			$(this).find('h5').text("");
			$(this).find('p').css('margin', '35px 0px 0px 8px');
		}
		if($(this).find('p').text()=="standar"){
			$(this).find('p').text("");
		}
	});
    //creamos listas li del Menu
    $(xmlDoc).find("apartado").each(function(){
        //creamos el item
        var li = $("<li>");
        //creamos el link
        $("<a>").html($(this).attr("nombre")).attr({title:$(this).attr("nombre"), href:"javascript:callpage("+$(this).attr("uniqid")+")",id:$(this).attr("uniqid")}).appendTo(li);
        //#####PATCH LINEAL
		//$("<a>").html($(this).attr("nombre")).attr({title:$(this).attr("nombre"), href:"#",id:$(this).attr("uniqid")}).appendTo(li);
        //aniadimos a la lista
        li.appendTo("#listaMenu");
    });

    //creamos listas li de las Herramientas
    $(xmlDoc).find("herramienta").each(function(i){
        //creamos el item
        var li = $("<li>");
        //creamos el link
        $("<a>").attr({title:$(this).attr("nombre"), href:"javascript:callpage("+$(this).attr("uniqid")+")",id:$(this).attr("uniqid")}).addClass($(this).attr("nombre").toLowerCase()).html("<div class=\"contenedor_extras\"></div>").appendTo(li);
        //aniadimos a la lista
        li.appendTo("#listaHerramientas");
    });

    var padre;
    var salir = false;
    $(xmlDoc).find("apartado").each(function(){
        padre = $(this).attr("uniqid");
        $(this).find("pagina").each(function(){
            pagina = pagina.substr(pagina.indexOf("/apartados"));
            if($(this).attr("pathentero") == pagina){
            	salir = true;}
            if (salir){
          	return false;}
        })
        if (salir){
            return false;}
    });
	
    callpage(padre,pagina);
    cargaHTML(pagina);
	
}

function callpage(id,pagina)
{

	var preValorPagActual = valorPagActual;
	var isHerramienta = false;
	//checks for elements that needs to be disabled
	var res = false;
	maxPage = countPages();
	if(pagina==null || pagina ==""){
        $(xmlDoc).find("apartado").each(function(){
            if($(this).attr("uniqid")==id)
            {
                var pre,next;
                if($(this).find("pagina:first-child").attr("anterior")!=undefined)
                    pre= $(this).find("pagina:first-child").attr("anterior").replace($(this).find("pagina:first-child").attr("nivel"),"");
                else
                    pre = $(this).find("pagina:first-child").attr("anterior");

                if($(this).find("pagina:first-child").attr("siguiente")!=undefined)
                    next= $(this).find("pagina:first-child").attr("siguiente").replace($(this).find("pagina:first-child").attr("nivel"),"");
                else
                    next = $(this).find("pagina:first-child").attr("siguiente");

                valorPagActual = Number($(this).find("pagina:first-child").attr("numpaginadesdeelinicio"));				
				//### PATCH lineal, tests max page
				if(valorPagActual <= maxPage + 1 || maxPage == 0 ) {
					anteriosSiguiente(pre,next,$(this).find("pagina:first-child").attr("numpaginadesdeelinicio"));
				}
                if(pagina==null || pagina==""){
                    pagina = $(this).find("pagina:first-child").attr("pathentero");
                }
            }
        });
        $(xmlDoc).find("herramienta").each(function(){
            if($(this).attr("uniqid")==id)
            {
                isHerramienta = true;
				//anteriosSiguiente(null,null,null);
                if(pagina==null || pagina==""){
                    pagina = $(this).find("pagina:first-child").attr("pathentero");
                }
            }
			//### PATCH lineal, tests max page
			/*if(valorPagActual <= maxPage + 1 || maxPage == 0 ) {
				$("#"+$(this).attr("uniqid")).removeClass("resaltado");
			}*/
        });
		//### PATCH lineal, iterates for the roll overs after actualpage is defined
		$(xmlDoc).find("apartado").each(function(){
			//alert("max:" + maxPage + " act:" + valorPagActual + " " + (valorPagActual <= maxPage + 1) + " " + (maxPage == 0));
			if( (valorPagActual <= maxPage + 1 || maxPage == 0) && !isHerramienta ) {
				$("#"+$(this).attr("uniqid")).removeClass("resaltado");
			}
		});
		//### PATCH lineal, tests max page
		if( (valorPagActual <= maxPage + 1 || maxPage == 0) && !isHerramienta ) {
			$("#"+id).removeClass("desactivado");
			$("#"+id).addClass("resaltado");
		}
    }
    else{
		loadPage = pagina;
        $(xmlDoc).find("apartado").each(function(){
			
			//CALC minpage for each module
			var minpage = Number($(this).find("pagina:first-child").attr("numpaginadesdeelinicio"));
            if($(this).attr("uniqid")==id)
            {
			pagina_actual=pagina;
                $(this).find("pagina").each(function(){
                    if($(this).attr("pathentero") == pagina){
                        var pre,next;
                        if($(this).attr("anterior")!=undefined)
                            pre= $(this).attr("anterior").replace($(this).attr("nivel"),"");
                        else
                            pre = $(this).attr("anterior");

                        if($(this).attr("siguiente")!=undefined)
                            next= $(this).attr("siguiente").replace($(this).attr("nivel"),"");
                        else
                            next = $(this).attr("siguiente");
						valorPagActual = Number($(this).attr("numpaginadesdeelinicio"));
						anteriosSiguiente(pre,next,$(this).attr("numpaginadesdeelinicio"));
                    }
                });
				$("#"+id).removeClass("desactivado");
				$("#"+id).addClass("resaltado");
				res = true;
            } else if(res && minpage > maxPage) {
				$("#"+$(this).attr("uniqid")).removeClass("resaltado");
				$("#"+$(this).attr("uniqid")).addClass("desactivado");
			} else {
				$("#"+$(this).attr("uniqid")).removeClass("resaltado");
				$("#"+$(this).attr("uniqid")).removeClass("desactivado");
			}
			
        });
    }
	//### PATCH lineal, tests max page
	//alert("max:" + maxPage + " act:" + valorPagActual + " " + (maxPage == 0) + " " + (maxPage == valorPagActual - 1) + " " + (maxPage >= valorPagActual));
	if(maxPage == 0 || maxPage == valorPagActual - 1 || maxPage >= valorPagActual) {
		//alert("loadingPage" + valorPagActual);
		$("#cubrecapa").show();
		cargaHTML(pagina);
		maxPage = countPages();
		
	} else {
		valorPagActual = preValorPagActual;
	}
    
}
/*****************************************************************************************************/
	// WHEN WE HAVE MENU HIDDEN
/*
function showIndex() {
	var sidebar = $("#sidebar1");
	if(sidebar.css("display") == "none") {
		sidebar.show();
		$("#elmenu").animate({left : 0}, 300);
	} else
		$("#elmenu").animate({left : "-240px"}, 300, function() { sidebar.hide(); });
}*/
/***********************************************************************************************************/
//### PATCH lineal, updates pages count
function countPages() {
	var tot = 0;
	if(paginas != null) {
		for (var i = 0; i < paginas.length; i++) {
			if(paginas[i]=="1" || paginas[i]==1) {
				tot++;
			}
		}
	} 
	return tot;
}

function callpage2(pagina)
{
    var salir = false;
    var id;
    $(xmlDoc).find("apartado").each(function(){
        id = $(this).attr("uniqid");
        $(this).find("pagina").each(function(){
            if(pagina.indexOf("contenidos")!=-1)
                pagina = pagina.substr(pagina.indexOf("/apartados"));

            if($(this).attr("pathentero") == pagina){
            	salir = true;}
            if (salir){
          	return false;}
        })
        if (salir){
            return false;}
    });
    callpage(id,pagina);
}

var globalPagNext;
function anteriosSiguiente(pagPre,pagNex,numPag)
{	
	globalPagNext = pagNex;
	if(numpaginastot==undefined){
		$('#navDer').hide();
	}
	
    if(pagPre!=undefined && pagPre!=null)
        $("#navAnt").html($("<a>").attr({href:"javascript:callpage2('"+pagPre+"')"}).html($("<div>"))).show(0);
    else
        $("#navAnt").html("").hide(0);

    if(pagNex!=undefined && pagNex!=null)
        $("#navSig").html($("<a>").attr({href:"javascript:callpage2('"+pagNex+"')"}).html($("<div>"))).show(0);
    else
        $("#navSig").html("").hide(0);

    if(numPag!=null)
        $("#navNm").text(numPag+"/"+numpaginastot).addClass("navNm").show(0);
    else
        $("#navNm").hide(0);
}
function cargaHTML(pag)
{
	fecha = new Date();
    var aleatorio;
    pagiActual = pag;
	if(window.location.protocol == 'file:') {
		aleatorio = "";
	} else {
		aleatorio = "?nocache="+ fecha.getDate()+""+fecha.getHours()+""+fecha.getMinutes()+""+fecha.getSeconds();
	}
	//alert("cargaHTML " + "contenidos"+pag+aleatorio);
    $.ajaxSetup({
        'beforeSend' : function(xhr) {
            try{
               // xhr.overrideMimeType('text/html; charset=UTF-8');
			    xhr.overrideMimeType('text/html; charset=iso-8859-1');
            }
            catch(e){}
        }});
    $.ajax({
        url: "contenidos"+pag+aleatorio,
        success: function(data) {
        $('#elcuerpo').html(data);
		/*********************************************************************************/
		if(pag.indexOf('apartados')!=-1){
			fcontrolEvents();
		}
		if(pag.indexOf('herramientas')!=-1){
			 $('#elcuerpo').append('<div id="close_tool"></div>');
			 fcloseTool();
		}
		/*********************************************************************************/
        creaJavascript();
        $("#cubrecapa").fadeOut('slow');
        }
    });

    pasoporAqui(valorPagActual,pag);
	
}

var dataSig;
function activaSig(){
}

function desactivaSig(){
	dataSig = $("#navSig").html();
	//alert(dataSig);
	//$("#navSig").find('a').remove();
	//alert($("#navSig").html());
	//link.removeAttribute ("href");
	//$("#navSig").find('a').removeAttribute("href");
}


