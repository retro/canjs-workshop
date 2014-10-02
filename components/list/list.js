steal(
'can/component',
'./list.stache!',
'./list.less!',
'can/list/promise',
function(Component, initView){
	return Component.extend({
		tag : 'w-list',
		template : initView,
		scope : {
			
		},
		helpers : {
			isCurrent : function(msg, opts){
				msg = can.isFunction(msg) ? msg() : msg;
				if(msg === this.attr('current')){
					return opts.fn();
				}
			}
		}
	})
})