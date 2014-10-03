steal(
'can/component',
'./reply-message.stache!',
'models',
'./reply-message.less!',
'can/map/define',
'components/message-form',
function(Component, initView, Models){


	return Component.extend({
		tag : 'w-reply-message',
		template : initView,
		scope : {
			define : {
				replyMessage : {
					value : function(){
						return Models.Message.newOutbound()
					}
				},
				modelClass : {
					value : function(){
						return Models.Message
					}
				}
			},

			init : function(){
				this.populateFields();
			},
			
			resetForm : function(){
				this.attr({
					replyMessage : Models.Message.newOutbound(),
				})
				this.populateFields()
			},
			populateFields : function(){
				var message = this.attr('replyMessage'),
					parent = this.attr('parent');

				message.attr({
					to : parent.attr('from'),
					subject: 'RE: ' + parent.attr('subject')
				})
			}
		},
		events : {
			"{scope.modelClass} created" : function(){
				this.scope.resetForm();
			}
		}
	})
})