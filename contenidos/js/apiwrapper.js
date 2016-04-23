var API = null;

function LMSInitialize() {
	var result = "false";
	var theAPI = getAPI("No se puede ejecutar LMSInitialize()");
	if (theAPI != null) {
		result = theAPI.LMSInitialize("").toString();
	}
//if (result != "true") alert("LMSInitialize() error: " + LMSGetErrorString(LMSGetLastError()));
	return result;
}

function LMSFinish() {
	var result = "false";
	var theAPI = getAPI();
	if (theAPI != null) {
		result = theAPI.LMSFinish("").toString();
	}
//if (result != "true") alert("LMSFinish() error: " + LMSGetErrorString(LMSGetLastError()));
	return result;
}

function LMSGetValue(element) {
	var result = "false";
	var theAPI = getAPI();
	if (theAPI != null) {
		result = theAPI.LMSGetValue(element).toString();
//		var error = LMSGetLastError().toString();
//		if (error != "0") alert("LMSGetValue("+element+") error: " + LMSGetErrorString(LMSGetLastError()));
	}
	return result;
}

function LMSSetValue(element, value) {
	var result = "false";
	var theAPI = getAPI();
	if (theAPI != null) {
		result = theAPI.LMSSetValue(element, value).toString();
	}
	if(element == "cmi.core.score.raw"){
		//alert("score: "+value)
	}
	
//if (result != "true") alert("LMSSetValue("+element+") error: " + LMSGetErrorString(LMSGetLastError()));
	return result;
}

function LMSCommit() {
	var result = "false";
	var theAPI = getAPI();
	if (theAPI != null) {
		result = theAPI.LMSCommit("").toString();
	}
//if (result != "true") alert("LMSCommit() error: " + LMSGetErrorString(LMSGetLastError()));
	return result;
}

function LMSGetLastError() {
	var result = "false";
	var theAPI = getAPI();
	if (theAPI != null) {
		result = theAPI.LMSGetLastError().toString();
	}
	return result;
}

function LMSGetErrorString(errorCode) {
	var result = "false";
	var theAPI = getAPI();
	if (theAPI != null) {
		result = theAPI.LMSGetErrorString(errorCode).toString();
	}
	return result;
}

function getAPI(errorMessage) {
	if (API == null) {
		API = findAPI(window);
		if (API == null && errorMessage != null) {
			//window.alert(errorMessage);
		}
	}
	return API;
}

// Busca el adaptador del API a partir de la ventana indicada
function findAPI(win)
{
	// Variable donde se guardará la referencia al adaptador del API
	var theAPI = null;

	// Si la ventana actual lo tiene
	if (win.API != null  ||win.API_1484_11 !=null ) { 
		if (win.API != null)
		{
		theAPI = win.API;
		}
		else
		{
			theAPI = win.API_1484_11;
		}
	// Si tiene un marco superior buscaremos en él
	} else if (win.parent != null && win.parent != win) {
		theAPI = findAPI(win.parent);
	// Si tiene una ventana que la abierto buscaremos en ella
	} else if (win.opener != null && typeof(win.opener) != "undefined") {
		theAPI = findAPI(win.opener);
	} else {
		//window.alert("No se encuentra el adaptador del API");
	}
	return theAPI;
}
