require.config({
  baseUrl:'js',
  paths:{
     jquery : 'jquery-1.11.3.min',
     icbcwindow : 'icbcwindow',
     jqueryui:'jquery-ui.min'
  }
});

require(['jquery','icbcwindow'], function($,w) {
     $("#show").click(function(){
     	 var win = new w.IcbcWindow();
     	 win.alert({width:500,height:150,content:"是否要申请信用卡",handle4confirm:function(){
     	 	alert(1);
     	 },close:true,customSkin:'window_skin_a',buttonText:'确认申请'});

     	 win.on('alert',function(){
     	 	alert("我是第二次弹出来");
     	 })

     	 win.on('close',function(){
     	 	alert("关闭第二次探出");
     	 })
     })
});
