var i_e; 
var i_e8;
$(document).ready(function(){
	var navegador=navigator.userAgent;
	if(navegador.indexOf('MSIE') != -1) {
		i_e=true;
		if( navigator.appVersion.indexOf("MSIE 9")==-1){
			i_e8 = true;	
		}
	}
});




//////////////////////////////////////////////////////////////////////////////
// parsea XML
//////////////////////////////////////////////////////////////////////////////

var xhttpvideo
var $xmlVideo;
var nVideo;

function parseXMLVideo(){
	//alert(i_e8);
	var dataVd = $('#video_modal').attr('name');
	dataxmlVideo = '../recursos/'+dataVd;
		xhttpvideo=new XMLHttpRequest();
		xhttpvideo.open("GET",dataxmlVideo,false);
		xhttpvideo.setRequestHeader('Content-Type', 'text/xml');
		xhttpvideo.send("");
		$xmlVideo = $(xhttpvideo.responseXML);
		configVideo();
}

function configVideo(){
	var ruta="../recursos/";
	var nombreVideo;
	var altoVideo;
	var anchoVideo;
	$xmlVideo.find('video').each(function(s){
		nombreVideo = $(this).find('nombre').text();
		altoVideo = $(this).find('alto').text();
		anchoVideo = $(this).find('ancho').text();
		
		var rnd=Math.ceil(Math.random()*1000);
		
		$('#video_modal').append('<video id="playerVideo'+rnd+'" class="video-js vjs-default-skin" controls preload="auto" width="'+anchoVideo+'" height="'+altoVideo+'" poster="'+ruta+nombreVideo+'.jpg"><source src="'+ruta+nombreVideo+'.mp4" type="video/mp4" /><source src="'+ruta+nombreVideo+'.ogv" type="video/ogg" /> </video>');
		
		
		if(!i_e8){		
			_V_("playerVideo"+rnd).ready(function() {
				var myPlayer = _V_("playerVideo"+rnd);
			});	

			$('#playerVideo'+rnd).find('.vjs-controls').css({
				'position' : 'absolute',
				'width' : $('#playerVideo'+rnd).outerWidth()+'px',
				'top' : ($('#playerVideo'+rnd).outerHeight()-30)+'px'
			});
		}
	
		var posx = Math.round((991-anchoVideo)/2);
		var posy = Math.round((564-altoVideo)-22);
		if(posy<80){
			posy = Math.round((564-altoVideo)/2);
		}
		//posy = 80;
		$('#video_modal').css({
				'position' : 'absolute',
				'left' : posx+'px',
				'top' : posy+'px'
		});
	
		
	});
	if(i_e8){
		load_Video_swf(nombreVideo);
	}
	//creaGaleriaModal();
}

			
			
function load_Video_swf(pathv){
	$('#video_modal').append('<div id="content_flash"></div>');
	$('#content_flash').flash({
		swf: '../img/video/video_modal.swf',
		width: 880,
		height: 500,
		//width: 860,
		//height: 490,
		AllowScriptAccess:	true,
		flashvars: {
			path_video	:	'../../recursos/'+pathv+'.mp4'
		},
		params: {wmode: 'opaque'}
	});
	//alert(pathv);
	$('#content_flash').css({
        'position':'absolute',
		'top': '-30px',
		'left' : '-80px'
        // left: (($(window).width() - (900/2))/2),
        //top: ($(window).height() - (600/2))/2
	});
			
}

