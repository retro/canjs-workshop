steal(
'can/component',
'./message-form.stache!',
'./message-form.less!',
'can/message-form/promise',
function(Component, initView){
	return Component.extend({
		tag : 'w-message-form',
		template : initView,
		helpers : {
			
		},
		scope : {
			
		}
	})
})