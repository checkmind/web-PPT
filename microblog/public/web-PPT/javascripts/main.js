require.config({
	shim : {
		'bootstrap' : {
			deps : ['jquery']
		},
		'edit_fun' : {
			deps : ['jquery','bootstrap'],
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
		'catchFn' : 'common_module/catchFn',
		'meauList' : 'meau_manager_module/meau_list',
		'PPTlist' : 'ppt_manager_module/PPT_list'
	}
});
require(['edit_fun'],function(){
	
});