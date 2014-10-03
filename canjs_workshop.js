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

	var Panels = {
		inbox : 'Inbox',
		important : 'Important',
		sent : 'Sent'
	};

	var AppState = Map.extend({
		define : {
			list : {
				value : 'inbox'
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
				},
				serialize : false
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
				},
				serialize : false
			},
			composeMessageOpen : {
				value : false,
				set : function(val){
					return val === 'true' || val === true;
				}
			},
			messageCreated : {
				set : function(val){
					var self = this;

					if(val === true){
						clearTimeout(this.__messageCreatedTimeout);
						this.__messageCreatedTimeout = setTimeout(function(){
							self.attr('messageCreated', false);
						}, 1000);
					}

					return val === 'true' || val === true;
				},
				value : false,
				serialize : false
			}
		},
		init : function(){
			var self = this;
			Models.Message.on('created', function(ev, createdMessage){
				self.attr('messageCreated', true);
				if(self.attr('list') === 'sent'){
					self.attr('messages').push(createdMessage);
				}
			})
		},
		currentListName : function(){
			return Panels[this.attr('list')];
		}
	});

	var appState = new AppState();

	can.route.map(appState);

	can.route(':list', {
		composeMessageOpen : false
	});
	can.route(':list/:messageId', {
		composeMessageOpen : false
	});

	can.route.ready();

	$('#content').html(initView({
		state : appState,
		panels : Panels
	}, {
		urlBuilder : function(type, param){
			var params = can.route.attr();

			type = can.isFunction(type) ? type() : type;
			param = can.isFunction(param) ? param() : param;

			if(type === 'list'){
				delete params.messageId;
				params.list = param;
			} else if(type === 'message'){
				params.messageId = param;
			}

			return can.route.url(params, false);
		}
	}));
});