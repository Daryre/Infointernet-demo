jQuery(document).ready(function($) {
	$("#jquery_jplayer_audio_1").jPlayer({
		ready: function(event) {
			$(this).jPlayer("setMedia", {
				title: "Miaow - Hidden",
				mp3: "http://jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
				oga: "http://jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
			});
		},
		play: function() { // Avoid multiple jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		timeFormat: {
			padMin: false
		},
		swfPath: "js",
		supplied: "mp3,oga",
		cssSelectorAncestor: "#jp_container_audio_1",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		remainingDuration: true,
		keyEnabled: true,
		keyBindings: {
			// Disable some of the default key controls
			loop: null,
			muted: null,
			volumeUp: null,
			volumeDown: null
		},
		wmode: "window"
	});
});
/*
    $("#jquery_jplayer_1").jPlayer({
      ready: function () {
        $(this).jPlayer("setMedia", {
          mp3: "contenidos/recursos/1_2_bienvenida.mp3",
        }).jPlayer("play");
      },
      swfPath: "contenidos/js/jplayer/dist/jplayer",
      supplied: "mp3"
  });
  
  
  
     $('#reproducir').show();        
    $('#spoiler').hide();       
    $('#reproducir').click(function () {      
     $('#reproducir').hide();
     $('#spoiler').fadeIn();      
     
     loadSound();



     $("#player").bind("ended", function(){        
      $('#spoiler').hide();         
      $('#reproducir').fadeIn();              
    });    
   });  

  function loadSound() {

  }

 
  
  
  */