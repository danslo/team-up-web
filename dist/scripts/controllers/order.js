define(["controllers/controllers"],function(e){e.controller("order",["$rootScope","$scope","$location","Store","Teams","TeamUp",function(e,t,n,r,i,s){function c(){t.views={order:!1}}e.fixStyles();var o=r("app").get("teams"),u=i.queryLocal(),a,f="",l=[];o.unshift(),t.groups=o,t.current={group:t.groups[0].uuid};if(t.currentTeam==null||typeof t.currentTeam=="undefined")t.currentTeam=u.teams[0].uuid;n.hash()?a=n.hash():a="order";var h=function(e){c(),t.views[e]=!0};t.setViewTo=function(e){t.$watch(e,function(){n.hash(e),h(e)})},h(a),t.orderedMembers=[],t.orderType="";var p=function(n){var r=u.members[t.current.group],i=[];_.each(r,function(t){_.each(n,function(n,r){t.uuid===n&&(t.phone&&(e.parsePhoneNumber(t.phone),e.phoneNumberParsed.result===!0&&(t.phoneE164=e.phoneNumberParsed.all.formatting.e164)),t.originalPosition=r,i[r]=t)})}),l=i,t.orderedMembers=i};t.getOrder=function(){var e=t.current.group;console.log("groupID",e),e!==""&&s._("callOrderGet",{second:e}).then(function(e){t.orderType=e.sortBy,console.log(t.orderType),console.log("",e.order),p(e.order)})},t.orderTypePreview=function(){},t.getOrder(),t.sortableOptions={stop:function(e,n){l=t.orderedMembers},cancel:".unsortable",items:"tr:not(.unsortable)"},t.confirmOrder=function(){var n=t.current.group,r=[],i={};e.statusBar.display(e.ui.teamup.saveTeam),i.sortBy=t.orderType,_.each(l,function(e,t){r[t]=e.uuid}),i.order=r,s._("callOrderSave",{second:n},i).then(function(n){e.notifier.success("Volgorde opgeslagen"),e.statusBar.off(),t.orderType=n.sortBy,p(n.order)})}}])});