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
		'edit_fun' : 'edit_fun'
	}
});
require(['edit_fun'],function(it){
	console.log(it)
});