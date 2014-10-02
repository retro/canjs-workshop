steal(
'can/component',
'./list.stache!',
'./list.less!',
function(Component, initView){
	return Component.extend({
		tag : 'w-list',
		template : initView,
		scope : {
			
		}
	})
})