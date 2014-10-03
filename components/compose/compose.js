steal(
'can/component',
'./compose.stache!',
'models',
'./compose.less!',
'can/map/define',
'components/message-form',
function(Component, initView, Models){


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
				},
				modelClass : {
					value : function(){
						return Models.Message
					}
				}
			},
			isExpanded : false,
			expand : function(){
				this.attr('isExpanded', true);
			},
			collapse : function(){
				this.attr('isExpanded', false);
			},
			resetForm : function(){
				this.attr({
					newMessage : Models.Message.newOutbound(),
					error : null
				})
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
			},
			"{scope.modelClass} created" : function(){
				this.scope.resetForm();
			}
		}
	})
})