require.config({
	shim : {
		'bootstrap' : {
			deps : ['jquery']
		},
		'edit_fun' : {
			deps : ['jquery'],
			exports : 'ppt'
		}
	},
	paths : {
		'jquery' : '../lib/jquery.min',
		'bootstrap' : '../lib/bootstrap.min',
		'edit_fun' : 'edit_fun',
		/*edit_tool_module*/
		'insert'      : 'edit_tool_module/insert',
		'fontTool'    : 'edit_tool_module/fontTool',
		'borderTool'  : 'edit_tool_module/borderTool',
		'WHTool'      : 'edit_tool_module/WHTool',
		'catchFn' : 'common_module/catchFn'
	}
});
require(['edit_fun'],function(){
	
});