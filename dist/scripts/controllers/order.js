define(["controllers/controllers"],function(e){e.controller("order",["$rootScope","$scope","$location","Store","Teams","TeamUp",function(e,t,n,r,i,s){function c(){t.views={order:!1}}e.fixStyles();var o=r("app").get("teams"),u=i.queryLocal(),a=r("app").get("currentTeamClientGroup"),f,l=[];o.unshift(),t.groups=o,t.current={group:a.team||t.groups[0].uuid},n.hash()?f=n.hash():f="order";var h=function(e){c(),t.views[e]=!0};t.setViewTo=function(e){t.$watch(e,function(){n.hash(e),h(e)})},h(f),t.orderedMembers=[],t.orderType="";var p=function(n){var r=u.members[t.current.group],i=[];_.each(r,function(t){_.each(n,function(n,r){t.uuid===n&&(t.phone&&(e.parsePhoneNumber(t.phone),e.phoneNumberParsed.result===!0&&(t.phoneE164=e.phoneNumberParsed.all.formatting.e164)),t.originalPosition=r,i[r]=t)})}),l=i,t.orderedMembers=i};t.getOrder=function(){var e=t.current.group;e!==""&&s._("callOrderGet",{second:e}).then(function(e){t.orderType=e.sortBy,p(e.order)})},t.getOrder(),t.sortableOptions={animation:150,scroll:!1,draggable:"tr"},t.confirmOrder=function(){var n=t.current.group,r=[],i={};e.statusBar.display(e.ui.teamup.saveTeam),i.sortBy=t.orderType,_.each(l,function(e,t){r[t]=e.uuid}),i.order=r,s._("callOrderSave",{second:n},i).then(function(n){e.notifier.success("Volgorde opgeslagen"),e.statusBar.off(),t.orderType=n.sortBy,p(n.order)})}}])});