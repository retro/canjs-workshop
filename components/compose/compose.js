steal(
'can/component',
'./compose.stache!',
'./compose.less!',
function(Component, initView){
	return Component.extend({
		tag : 'w-compose',
		template : initView,
		scope : {
			isExpanded : false,
			expand : function(){
				this.attr('isExpanded', true);
			},
			collapse : function(){
				this.attr('isExpanded', false);
			}
		},
		events : {
			inserted : function(){
				this.toggleExpanded();
			},
			"{scope} change" : 'toggleExpanded',
			toggleExpanded : function(){
				this.element.toggleClass('is-expanded', this.scope.attr('isExpanded'));
			}
		}
	})
})