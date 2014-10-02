(function () {
	// taking from HTML5 Shiv v3.6.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
	var supportsUnknownElements = false;

	(function () {
		try {
			var a = document.createElement('a');
			a.innerHTML = '<xyz></xyz>';

			supportsUnknownElements = a.childNodes.length == 1 || (function () {
				// assign a false positive if unable to shiv
				(document.createElement)('a');
				var frag = document.createDocumentFragment();
				return (
					typeof frag.cloneNode == 'undefined' ||
					typeof frag.createDocumentFragment == 'undefined' ||
					typeof frag.createElement == 'undefined'
					);
			}());
		} catch (e) {
			// assign a false positive if detection fails => unable to shiv
			supportsUnknownElements = true;
		}
	}());


	System.config({
		map: {
			"can/util/util": "can/util/jquery/jquery",
			"jquery/jquery": "jquery",
			"apitizer/apitizer" : "apitizer",
			"faker/faker" : "faker"
		},
		paths: {
			"jquery": "bower_components/jquery/dist/jquery.js",
			"can/*": "bower_components/canjs/*.js",
			"apitizer" : "bower_components/apitizer/dist/apitizer.js",
			"faker" : "bower_components/faker/build/build/faker.js"
		},
		meta: {
			jquery: {
				exports: "jQuery",
				deps: supportsUnknownElements ? undefined : ["can/lib/html5shiv.js"]
			}
		},
		ext: {
			ejs: "can/view/ejs/system",
			mustache: "can/view/mustache/system",
			stache: "can/view/stache/system"
		}
	});
})();

var oldConfig = steal.config;

steal.config = function(){
	if(arguments.length === 0){
		return {
			root : {
				mapJoin : function(){
					return {
						toString: function(){
							return ""
						}
					}
				}
			}
		}
	}
	return oldConfig.apply(this, arguments)
}


System.buildConfig = {map: {"can/util/util" : "can/util/domless/domless"}};
