require.config({
	shim : {
		'bootstrap' : {
			deps : ['jquery']
		},
		'edit_fun' : {
			deps : ['jquery']
		}
	},
	paths : {
		'jquery' : '../lib/jquery.min',
		'bootstrap' : '../lib/bootstrap.min',
		'edit_fun' : 'edit_fun'
	}
});
require(['edit_fun'],function(d){
	console.log(d)
});