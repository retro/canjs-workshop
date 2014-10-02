steal(
'can/component',
'./compose.stache!',
'models',
'./compose.less!',
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
		tag : 'w-compose',
		template : initView,
		scope : {
			define : {
				newMessage : {
					value : function(){
						return Models.Message.newOutbound()
					}
				},
				error : {
					value : null
				}
			},
			isExpanded : false,
			expand : function(){
				this.attr('isExpanded', true);
			},
			collapse : function(){
				this.attr('isExpanded', false);
			},
			sendMessage : function(ctx, el, ev){
				var self = this,
					message = this.attr('newMessage');
				
				if(isValid(message)){
					this.attr('newMessage').save().then(function(){
						self.attr({
							error : null,
							newMessage : Models.Message.newOutbound()
						});
					}, function(){
						self.attr('error', 'There was a problem with the message sending.');
					});
				} else {
					this.attr('error', 'Please fill in all values.');
				}

				ev.preventDefault();
			}
		},
		events : {
			inserted : function(){
				this.toggleExpandedClass();
			},
			"{scope} change" : function(ev, scope, attr){
				if(attr === 'isExpanded'){
					this.toggleExpandedClass();
					this.toggleErrorClass();
				} else if(attr === 'error'){
					this.toggleErrorClass();
				}
			},
			toggleExpandedClass : function(){
				this.element.toggleClass('is-expanded', this.scope.attr('isExpanded'));
			},
			toggleErrorClass : function(){
				this.element.toggleClass('has-errors',
					this.scope.attr('isExpanded') && !!this.scope.attr('error')
				);
			}
		}
	})
})