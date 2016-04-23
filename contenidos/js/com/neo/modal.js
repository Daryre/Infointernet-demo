/* 	
----------
NeoLabels
modal.js
Created Jan 2011 
Modified Jan 2011
----------
*/

var ModalBox = new Class({

	layer : null,
	bg : null,
	contentHolder : null,
	closer : null,
	
	initialize : function(){},
	
	setup : function(){
		this.layer = new Element("div",{"class":"modalLayer"});
		this.layer.addClass("invisible");
		
		this.bg = new Element("div",{"class":"bg"});		
		this.contentHolder = new Element("div",{"class":"contentHolder"});
		this.closer = new Element("div",{"class":"closer"});
		
		
		var closeImage = new Element("img",{"src":"contenidos/img/btCloseModal.gif"});
		closeImage.inject(this.closer);
		
		this.closer.inject(this.layer);
		this.bg.inject(this.layer);
		this.contentHolder.inject(this.layer);
		
		//var divModal = document.getElementById('cuerpo');
		var divModal = document.getElementById('mainContent');
		
		//this.layer.inject($(document.body),"top");
		this.layer.inject(divModal,"top");
		
		//Events		
		this.closer.addEvent("click",this.hide.bind(this));
	},
	
	show : function(contentPath){
		this.layer.setStyle("opacity",0);
		this.layer.removeClass("invisible");
		
		this.tween(this.layer,700,"opacity",1).chain(function(){this.addContent(contentPath);}.bind(this));
		
	},
	
	hide : function(){
		if(herramientaGaleriaTM==true){
			closeGallery();
		}
		vmodal = false;
		this.contentHolder.empty();
		this.tween(this.layer,700,"opacity",0).chain(function(){this.layer.addClass("invisible");}.bind(this));
	},
	
	addContent : function(contentPath){
		this.contentHolder.empty();
		
		//var content = new Element("iframe",{"src":contentPath,"width":"100%","height":"100%","frameborder":"0", "marginwidth":"0", "marginheight":"0"});
		var content = new Element("iframe",{"id":"mod","src":contentPath,"width":"100%","height":"100%","frameborder":"0", "marginwidth":"0", "allowfullscreen":"true", "webkitallowfullscreen":"true", "mozallowfullscreen":"true"});
		//var content = new Element("iframe",{"src":contentPath,"width":"100%","height":"100%"});
		
		
		content.inject(this.contentHolder);

		$("#mod").load(function () {
		
			if((ie)||(user_navegador =="firefox")){
				if(dataconte=="sim"){
					$('.modalLayer').find('.contentHolder').css('width','925px');
					$('.modalLayer').find('.bg').css({
						'background-color' : '#fff',
						'width' : '986px',
						'height' : '600px'
					});
				} else if(dataconte!=undefined){
					$('.modalLayer').find('.contentHolder').css('width','986px');
					if(tipoconte=="foto"){
						$(this.contentDocument).find('#galeria_fotos_modal').attr('name',dataconte);
						$(this)[0].contentWindow.parseXMLFotos();
					} else if(tipoconte=="video"){
						$(this.contentDocument).find('#video_modal').attr('name',dataconte);
						$(this)[0].contentWindow.parseXMLVideo();
						
					}
				} else if(dataconte==undefined){
					$('.modalLayer').find('.contentHolder').css('width','986px');
				}
			} else {
				$('.modalLayer').find('.contentHolder').css('width','986px');
				if(dataconte!=undefined){
					if(tipoconte=="foto"){
						$(this.contentDocument).find('#galeria_fotos_modal').attr('name',dataconte);
						$(this)[0].contentWindow.parseXMLFotos();
					} else if(tipoconte=="video"){
						$(this.contentDocument).find('#video_modal').attr('name',dataconte);
						$(this)[0].contentWindow.parseXMLVideo();
						
					}
				}
			}
			
		});

	},
	
	tween : function(element, time, property, value, transition){
		if(transition == undefined)
			var effect = Fx.Transitions.Quad.easeOut;
		else
			var effect = transition;
			 
		element.set("tween",{duration: time, transition: effect});
		element.tween(property, value);
		
		return element.get("tween");
	}
});

var dataconte;
var tipoconte;
function showModal(contentPath, conte, tipo){
	vmodal = true;
	dataconte = conte;
	tipoconte = tipo;
	mb.show(contentPath);	
}


function hideModal(){
	mb.hide();	
}



var mb = new ModalBox();
window.addEvent("domready",mb.setup.bind(mb));