angular.module("ui.reset",[]).value("uiResetConfig",null).directive("uiReset",["uiResetConfig",function(e){var t=null;return e!==undefined&&(t=e),{require:"ngModel",link:function(e,n,r,i){var s;s=angular.element('<a class="ui-reset" />'),n.wrap('<span class="ui-resetwrap" />').after(s),s.bind("click",function(n){n.preventDefault(),e.$apply(function(){r.uiReset?i.$setViewValue(e.$eval(r.uiReset)):i.$setViewValue(t),i.$render()})})}}}]);