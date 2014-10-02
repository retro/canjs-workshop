steal(
'can/component',
'./detail.stache!',
'./detail.less!',
function(Component, initView){
	return Component.extend({
		tag : 'w-detail',
		template : initView,
		scope : {
			
		}
	})
})