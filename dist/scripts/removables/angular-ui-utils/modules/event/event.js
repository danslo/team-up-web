angular.module("ui.event",[]).directive("uiEvent",["$parse",function(e){return function(t,n,r){var i=t.$eval(r.uiEvent);angular.forEach(i,function(r,i){var s=e(r);n.bind(i,function(e){var n=Array.prototype.slice.call(arguments);n=n.splice(1),s(t,{$event:e,$params:n}),t.$$phase||t.$apply()})})}}]);