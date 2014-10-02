steal('can/model', function(Model){
	return Model.extend({
		resource : '/messages',
		newOutbound : function(){
			return new this({
				from : "user@canjs-workshop.com"
			})
		}
	}, {})
})