var user_navegador;
var user_mobile;
var ie; 
var user_android;
var user_ipad;
var user_iphone;
var user_chrome;
var user_firefox;
var navegador=navigator.userAgent;
	
$(document).ready(function(){
	config_navigator();

});

function config_navigator(){
	if((navegador.indexOf('MSIE') != -1)||(navegador.indexOf('Trident') != -1)) {
		ie=true;
		user_navegador = "ie";
		user_mobile = false;
		/*if( navigator.appVersion.indexOf("MSIE 10")!=-1){
			ie10 = true;
		} else	if( navigator.appVersion.indexOf("MSIE 9")!=-1){
			ie9 = true;
		} else if( navigator.appVersion.indexOf("MSIE 8")!=-1){
			ie8 = true;
		} else {
			ie11 = true;
		}*/
	}
	if(navegador.indexOf('Android') != -1) {
		user_android=true;
		user_navegador = "android";
		user_mobile = true;
	}
	if(navegador.indexOf('iPad') != -1) {
		user_ipad=true;
		user_navegador = "ipad";
		user_mobile = true;
	}
	if(navegador.indexOf('iPhone') != -1) {
		user_iphone=true;
		user_navegador = "iphone";
		user_mobile = true;
	}
	if(navegador.indexOf('Chrome') != -1) {
		user_chrome = true;
		user_navegador = "chrome";
		user_mobile = false;
	}
	if(navegador.indexOf('Firefox') != -1) {
		user_firefox = true;
		user_navegador = "firefox";	
		user_mobile = false;
	}	
	
	/********* **********************************/
	if(user_android){
		$(window).live("pagebeforehide", function(event, ui){
			onUnloadFunction();
		});
	}
		
	if((!ie)&&(!user_android)&&(!user_ipad)&&(!user_iphone)){
		window.onbeforeunload = function() { onUnloadFunction();}
	}
	if(ie){
		window.onunload = function() { onUnloadFunction();}
	}
	if((user_ipad)||(user_iphone)){
		window.onunload = function() {
			onUnloadFunction();
		}
	}

	function unloadAndroid(event){
		onUnloadFunction();
	}
	
	/********************* ***********************************/
	 /*$(window).bind("orientationchange", function(event){
		 if (event.orientation){
			alert("cambia: "+event.orientation);
		 }
	 });*/

	/*window.addEventListener("orientationchange", function() {
		alert(window.orientation);
	}, false);*/
	
}