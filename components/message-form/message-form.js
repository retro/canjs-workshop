steal(
'can/component',
'./message-form.stache!',
'models',
'./message-form.less!',
'can/map/define',
function(Component, initView, Models){

	var isValid = function(msg){
		var fields = ['subject', 'to', 'body'];

		for(var i = 0; i < fields.length; i++){
			if(!msg.attr(fields[i])){
				return false;
			}
		}
		return true;
	}

	return Component.extend({
		tag : 'w-message-form',
		template : initView,
		helpers : {
			
		},
		scope : {
			sendMessage : function(ctx, el, ev){
				var self = this,
					message = this.attr('formMessage');
				
				if(isValid(message)){
					this.attr('formMessage').save().fail(function(){
						self.attr('error', 'There was a problem with the message sending.');
					});
				} else {
					this.attr('error', 'Please fill in all values.');
				}

				ev.preventDefault();
			}
		}
	})
})