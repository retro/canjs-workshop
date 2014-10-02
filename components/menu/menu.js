steal(
'can/component',
'./menu.stache!',
'./menu.less!',
function(Component, initView){
	return Component.extend({
		tag : 'w-menu',
		template : initView,
		scope : {
			current : null,
			urlType : 'menu',
			items : {}
		},
		helpers : {
			isActive : function(list, opts){
				list = can.isFunction(list) ? list() : list;

				if(list === this.attr('current')){
					return opts.fn();
				}
			}
		}
	})
})