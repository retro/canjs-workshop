steal(
'can/component',
'./compose.stache!',
'./compose.less!',
function(Component, initView){
	return Component.extend({
		tag : 'w-compose',
		template : initView,
		scope : {
			
		}
	})
})