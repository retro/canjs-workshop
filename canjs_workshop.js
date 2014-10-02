steal(
'./init.stache!',
'can/map',
'models',
'can/map/define',
'can/route',
'components/compose',
'components/detail',
'components/list',
'components/menu',
'fixtures',
'style/style.less!', function(initView, Map, Models){

	var AppState = Map.extend({
		define : {
			list : {
				value : 'inbox',
				set : function(newList){
					return newList;
				}
			},
			messages : {
				get : function(){
					var list = this.attr('list'),
						params = {};

					if(list === 'inbox' || list === 'important'){
						params.to = "user@canjs-workshop.com";
					}

					if(list === 'important'){
						params.isImportant = true;
					}

					if(list === 'sent'){
						params.from = "user@canjs-workshop.com";
					}

					return new Models.Message.List(params);

				}
			},
			message : {
				get : function(){
					var messages = this.attr("messages"),
						messageId = this.attr("messageId"),
						loadedMessage;

					if(messages && messages.attr('length') && messageId) {
						var matched = messages.filter(function(message){
							return messageId == message.attr("id");
						});

						if(matched.length === 1){
							return matched[0];
						}

					}

					if(messageId) {
						loadedMessage = can.compute({
							__isPending : true
						});

						Models.Message.findOne({id: messageId}).then(function(message){
							loadedMessage(message);
						}, function(){
							loadedMessage({
								__error : 'There was a problem with the message loading'
							});
						});

						return loadedMessage;
					}
				},
				set : function(val){
					if(val === null){
						this.removeAttr('messageId')
					}
					return val;
				}
			},
			menuItems : {
				value : {
					inbox : 'Inbox',
					important : 'Important',
					sent : 'Sent'
				},
				serialize : false
			},
			composeMessageOpen : {
				value : false,
				set : function(val){
					return val === 'true' || val === true;
				}
			}
		},
		currentListName : function(){
			return this.attr('menuItems.' + this.attr('list'));
		}
	});

	var appState = new AppState();

	can.route.map(appState);
	can.route.ready();

	$('#content').html(initView(appState, {
		urlBuilder : function(type, param){
			type = can.isFunction(type) ? type() : type;
			param = can.isFunction(param) ? param() : param;

			if(type === 'list'){
				return can.route.url({
					list : param
				}, false);
			} else if(type === 'message'){
				return can.route.url({
					messageId : param
				}, true);
			}
		}
	}));
});