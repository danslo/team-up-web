angular.module("ui.indeterminate",[]).directive("uiIndeterminate",[function(){return{compile:function(e,t){return!t.type||t.type.toLowerCase()!=="checkbox"?angular.noop:function(e,t,n){e.$watch(n.uiIndeterminate,function(e){t[0].indeterminate=!!e})}}}}]);