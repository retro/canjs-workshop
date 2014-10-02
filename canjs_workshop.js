steal(
'./init.stache!',
'can/map',
'can/map/define',
'can/route',
'components/compose',
'components/detail',
'components/list',
'components/menu',
'style/style.less!', function(initView, Map){

	var AppState = Map.extend({
		define : {
			list : {
				value : 'inbox',
				set : function(newList){
					return newList;
				}
			},
			menuItems : {
				value : {
					inbox : 'Inbox',
					important : 'Important',
					sent : 'Sent'
				},
				serialize : false
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
			}
		}
	}));
});