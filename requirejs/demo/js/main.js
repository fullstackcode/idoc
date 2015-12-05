require.config({
  baseUrl:'js',
  paths:{
     jquery : 'jquery-1.11.3.min',
     animate : 'animate',
     treeview : 'treeview',
     tabview : 'tabview'
  }
});

require(['jquery','tabview','treeview'], function($,tab,tree) {
    $('#test').css('background-color','red');
    var tabView = new tab.TabView();
    
});
