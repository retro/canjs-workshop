steal('can/model', function(Model){
	return Model.extend({
		resource : '/messages'
	}, {})
})