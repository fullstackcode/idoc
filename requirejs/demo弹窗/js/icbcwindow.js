define(['jquery','jqueryui'],function($,$ui){
	function IcbcWindow(){
		this.cfg = {
			width : 500,
			height : 300,
			content:"",
			handler :null,
			title : "系统消息",
			close:false,
			customSkin:null,
			buttonText:"确定",
			modal:true,
			dragHander:'.window_title',
			isDragable:true,
			handle4confirm:null,
			handle4close:null
		};

		this.handlers = {};
	};
	IcbcWindow.prototype = {
		alert : function(cfg){
			var mask = null;
			var CFG = $.extend(this.cfg,cfg);
			var boundingBox = $("<div class='window_boundingbox animated bounceInUp'>"+
										"<div class='window_title'>"+CFG.title+"</div>"+
										"<div class='window_body'>"+CFG.content+"</div>"+
										"<div class='window_footer'><input type='button' value='"+CFG.buttonText+"'/></div></div>");
			that = this;
			if(CFG.modal){
				mask = $('<div class="window_modal"></div>')
				mask.appendTo('body');
			}
			boundingBox.appendTo('body');
			
			var btn = boundingBox.find(".window_footer input");
			btn.appendTo(boundingBox);
			btn.click(function(){
				CFG.handle4confirm && CFG.handle4confirm();
				boundingBox.remove();
				mask && mask.remove();
				that.fire('alert');
			})

			if(CFG.close){
				var closeBtn = $('<span class="window_close">&times;</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function(event) {
					CFG.handle4close && CFG.handle4close();
					boundingBox.remove();
					mask && mask.remove();
					that.fire('close');
				});
			}
			if(CFG.customSkin){
				boundingBox.addClass(CFG.customSkin);
			}
		

			boundingBox.css({
				width : this.cfg.width + 'px',
				height : this.cfg.height + 'px',
				left : (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + "px",
				top : (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + "px"
				
			});
			
			if(CFG.isDragable){
					
					if(CFG.dragHander){
						boundingBox.draggable({handle:CFG.dragHander});
					}else{
						//这样整个窗体都要移动
						boundingBox.draggable();
					}
			}


		},
		prompt:function(){

		},
		confirm:function(){

		},
		on:function(type,handler){
			if(typeof this.handlers[type] == 'undefined'){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);

		},
		fire:function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0;i<handlers.length;i++){
					handlers[i](data);
				}
			}
		}
	}

	return {IcbcWindow:IcbcWindow};
});