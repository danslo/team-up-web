define(["controllers/controllers","config"],function(e,t){e.controller("messagesCtrl",["$scope","$rootScope","$q","$location","$route","$filter","Teams","TeamUp",function(e,n,r,i,s,o,u,a){var f=2e3,l=5e3,c=6048e5;e.messages=[],e.messagesShow=[],e.teamName="",n.$on("taskFinishLoading",function(t,r){angular.isArray(n.app.resources.teamUuids)&&(e.teamName=n.getTeamName(n.app.resources.teamUuids[0]),e.chatTeamId=n.app.resources.teamUuids[0],e.chatTeamId&&!e.toggleChat&&(clearInterval(e.autoCheckMonitorId),e.autoCheckMonitorId=setInterval(e.checkMessage,l)))}),e.renderMessage=function(){a._("chats",{third:e.chatTeamId}).then(function(t){if(t.error){n.notifier.error(t.error.data);return}if(e.messages.length==t.length){console.log("No new messages.");return}e.messages=[];var r=[];t=o("orderBy")(t,"sendTime"),angular.forEach(t,function(i,s){var u=o("nicelyDate")(parseInt(i.sendTime));s>0&&u==o("nicelyDate")(parseInt(t[s-1].sendTime))&&(u="");var a={date:u,role:"",member:{},senderName:"",sendTime:parseInt(i.sendTime),body:i.body,msgRole:"",senderUuid:i.senderUuid},f=n.getTeamMemberById(i.senderUuid);i.senderUuid==e.$root.app.resources.uuid?(a.role="own",a.msgRole="messageOwn",a.member=e.$root.app.resources,a.senderName=a.member.firstName+" "+a.member.lastName):(a.role="other",a.msgRole="messageOther",a.member=f,a.senderName=f.firstName+" "+f.lastName),e.messages.push(a);var l=new Date;l.getTime()-parseInt(i.sendTime)<=c&&e.messagesShow.push(a),r.indexOf(i.senderUuid)==-1&&r.push(i.senderUuid)}),setTimeout(function(){angular.element("#chat-content #messageField").focus(),angular.element("#chat-content").scrollTop(angular.element("#chat-content")[0].scrollHeight)},1e3)},function(e){console.log(e)})},e.checkMessage=function(){a._("chats",{third:e.chatTeamId}).then(function(t){if(t.error){n.notifier.error(t.error.data);return}if(e.messages.length==t.length){console.log("No new messages.");return}e.newCount=t.length-e.messages.length,e.newCount>0&&(e.newCount="("+e.newCount+")"),e.teamName=e.teamName,$("#chat-btn").animate({"background-color":"yellow"},"slow").animate({"background-color":"#1dc8b6"},"slow")})},e.openChat=function(){e.toggleChat=!e.toggleChat;var t=n.app.resources.teamUuids;e.chatTeamId=t[0],e.chatTeamId?e.toggleChat?(e.renderMessage(),clearInterval(e.autoCheckMonitorId),e.autoCheckMonitorId=setInterval(e.renderMessage,f),e.newCount=""):(clearInterval(e.autoCheckMonitorId),e.autoCheckMonitorId=setInterval(e.checkMessage,l)):console.log("login user doesn't belong to any team.")},e.sendMessage=function(r){if(typeof r=="undefined"||r==""){n.notifier.error(n.ui.message.emptyMessageBody);return}n.statusBar.display(n.ui.message.sending);var i=new Date;a._("message",{},{title:"Van: TeamUp"+i.toString(t.app.formats.date),body:r,sendTime:i.getTime()}).then(function(){e.renderMessage(),n.statusBar.off(),e.newMessage=""},function(e){n.notifier.error(e),n.statusBar.off()})}}])});