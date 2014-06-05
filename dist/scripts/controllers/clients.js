define(["controllers/controllers"],function(e){e.controller("clientCtrl",["$rootScope","$scope","$location","Clients","data","$route","$routeParams","Store","Dater","$filter","$modal","TeamUp",function(e,t,n,r,i,s,o,u,a,f,l,c){function b(e){angular.forEach(i.clientGroups,function(n){n.id==e&&(t.clientGroup=n)}),t.clients=i.clients[e],t.current=e,t.views.reports&&(t.currentCLient="0",t.currentMonth="0",y())}e.fixStyles(),i.clientId&&(i.clientGroups=u("app").get("ClientGroups"),i.clients={},angular.forEach(i.clientGroups,function(e){i.clients[e.id]=u("app").get(e.id),angular.forEach(i.clients[e.id],function(e){e.uuid==i.clientId&&(t.client=e,t.contacts=e.contacts,e.birthDate=f("nicelyDate")(e.birthDate),t.clientmeta=e)})})),t.clients=i.clients,t.clientGroups=i.clientGroups;var h=a.getMonthTimeStamps();t.Months=[],angular.forEach(h,function(e,n){t.Months[n]={number:n,name:n,start:e.first.timeStamp,end:e.last.timeStamp}}),t.Months[0]={number:0,name:e.ui.teamup.selectMonth};var p=n.search();t.search={query:""},t.selection={},t.data=i;var d,v;!p.uuid&&!n.hash()?(d=i.clientGroups[0].id,v="client",n.search({uuid:i.clientGroups[0].id}).hash("client")):p.uuid?(d=p.uuid,typeof d=="undefined"&&(d=t.client.clientGroupUuid),v=n.hash()):(d=i.clientGroups[0].id,v=n.hash(),n.search({uuid:i.clientGroups[0].id})),t.views={client:!0,newClientGroup:!1,newClient:!1,reports:!1,editClientGroup:!1,editClient:!1,viewClient:!1,editImg:!1};var m=function(e){t.views={client:!1,newClientGroup:!1,newClient:!1,reports:!1,editImg:!1},e=="viewClient"&&g(),e=="reports"&&y(),t.views[e]=!0},g=function(){e.statusBar.display(e.ui.teamup.loadingReports),c._("clientReportsQuery",{second:t.client.uuid},null,{success:function(e){u("app").save("reports_"+t.client.uuid,e)}}).then(function(n){e.statusBar.off(),t.reports=t.processReports(n)},function(e){console.log(e)})},y=function(){e.statusBar.display(e.ui.teamup.loadingReports),c._("clientGroupReportsQuery",{second:t.clientGroup.id}).then(function(n){e.statusBar.off(),t.groupReports=t.processReports(n),t.currentCLient!=0&&t.requestReportsByFilter()},function(e){console.log(e)})};m(v),b(d),t.requestClientGroup=function(e,r){b(e),t.$watch(n.search(),function(){n.search({uuid:e})}),r&&(n.hash()!="client"&&n.hash("client"),m("client"))},t.processReports=function(e){var n=[];return angular.forEach(e,function(e){n.push({uuid:e.uuid,title:e.title,creationTime:e.creationTime,clientUuid:e.clientUuid,body:e.body,author:t.$root.getTeamMemberById(e.authorUuid),client:t.$root.getClientByID(e.clientUuid),filtered:"false"})}),n},t.setViewTo=function(e){t.$watch(e,function(){t.clientGroup||(t.clientGroup=t.clientGroups[0]),(n.hash()=="viewClient"||n.hash()=="editClient"||n.hash()=="editImg")&&e=="client"&&n.path("/client").search({uuid:t.clientGroup.id}),n.hash(e),m(e)})},t.editClientGroup=function(e){t.cGroupEditForm={name:e.name,id:e.id},t.views.editClientGroup=!0},t.cancelClientGroupEdit=function(e){t.cGroupEditForm={name:e.name,id:e.id},t.views.editClientGroup=!1},t.changeClientGroup=function(n){if($.trim(n.name)=="")return;c._("clientGroupUpdate",{second:n.id},n.id).then(function(i){i.error?e.notifier.error("Error with saving client Group info"):(e.statusBar.display(e.ui.teamup.refreshing),r.query(!1).then(function(){e.notifier.success(e.ui.teamup.dataChanged),e.statusBar.off(),t.clientGroup.name=n.name,t.views.editClientGroup=!1}))})};var w=function(i){r.query(!1,i).then(function(r){r.error?console.warn("error ->",r):(e.notifier.success(e.ui.teamup.dataChanged),t.closeTabs(),t.data=r,t.clientGroups=r.clientGroups,t.clients=r.clients,angular.forEach(r.clientGroups,function(e){e.id==i.uuid&&(t.clientGroup=e,t.current=e.id,t.$watch(n.search(),function(){n.search({id:e.id})}))})),e.statusBar.off()})};t.cGroupSubmit=function(t){if(typeof t=="undefined"||$.trim(t.name)==""){e.notifier.error(e.ui.teamup.teamNamePrompt1);return}c._("clientGroupAdd",null,t,{success:function(e){u("app").save(e.id,e)}}).then(function(t){t.error||(e.statusBar.display(e.ui.teamup.refreshing),w({uuid:t.id}))})},t.closeTabs=function(){t.clientGroupForm={},t.clientForm={},m("client")},t.addContacts=function(){if(typeof t.contactForm=="undefined"||t.contactForm.func==""){e.notifier.error(e.ui.teamup.teamNamePrompt2);return}var n={firstName:"",lastName:"","function":"",phone:""};n.firstName=t.contactForm.firstName,n.lastName=t.contactForm.lastName,n.function=t.contactForm.function,n.phone=t.contactForm.phone,typeof t.contacts=="undefined"&&(t.contacts=[]),t.contacts==null&&(t.contacts=[]),t.contacts.push(n)},t.clientSubmit=function(n){if(typeof n=="undefined"||!n.firstName||!n.lastName||!n.phone){e.notifier.error(e.ui.teamup.clinetInfoFill);return}e.statusBar.display(e.ui.teamup.savingClient);try{n.birthDate=a.convert.absolute(n.birthDate,0)}catch(r){e.notifier.error(e.ui.teamup.birthdayError);return}n.clientGroupUuid=t.clientGroup.id,c._("clientAdd",null,n,{success:function(e){u("app").save(e.id,e)}}).then(function(t){t.error?e.notifier.error(e.ui.teamup.clientSubmitError):w({uuid:t.clientGroupUuid})})},t.clientChange=function(t){e.statusBar.display(e.ui.teamup.savingClient);try{t.birthDate=a.convert.absolute(t.birthDate,0)}catch(n){e.notifier.error(e.ui.teamup.birthdayError);return}c._("clientUpdate",{second:t.uuid},t).then(function(t){t.error?e.notifier.error(e.ui.teamup.clientSubmitError):(e.statusBar.display(e.ui.teamup.refreshing),e.notifier.success(e.ui.teamup.dataChanged),w({uuid:t.clientGroupUuid}))})},t.saveContacts=function(n){var i=t.client;try{i.birthDate=a.convert.absolute(i.birthDate,0)}catch(s){e.notifier.error(e.ui.teamup.birthdayError);return}i.contacts=n,e.statusBar.display(e.ui.teamup.savingContacts),c._("clientUpdate",{second:i.uuid},i).then(function(n){n.error?e.notifier.error(e.ui.teamup.clientSubmitError):(e.notifier.success(e.ui.teamup.dataChanged),e.statusBar.off(),r.query(!1,{uuid:n.clientGroupUuid}).then(function(e){})),t.client.birthDate=f("nicelyDate")(t.client.birthDate)})},t.removeContact=function(e){angular.forEach(t.contacts,function(n,r){e.name==n.name&&e.func==n.func&&e.phone==n.phone&&t.contacts.splice(r,1)})},t.deleteClientGroup=function(){window.confirm(e.ui.teamup.delClientGroupConfirm)&&(e.statusBar.display(e.ui.teamup.deletingClientGroup),c._("clientGroupDelete",{second:t.current}).then(function(n){n.id&&r.query(!0,{}).then(function(e){t.requestClientGroup(e[0].id),angular.forEach(t.clientGroups,function(e,r){e.id==n.id&&t.clientGroups.splice(r,1)})},function(e){console.log(e)}),e.notifier.success(e.ui.teamup.dataChanged),e.statusBar.off()},function(e){console.log(e)}))},t.deleteClient=function(n){window.confirm(e.ui.teamup.deleteConfirm)&&(e.statusBar.display(e.ui.teamup.deletingClient),angular.forEach(t.clients,function(e){if(e.uuid==n){var i=e.clientGroupUuid;if(i==null||i=="")i=t.clientGroup.id;var o={},a=[],f=[];a.push(n),o[i]={a:f,r:a},i!=null&&i!=""&&i!=t.clientGroup.id&&(o[t.clientGroup.id]={a:f,r:a}),r.manage(o).then(function(){c._("clientDelete",{second:n}).then(function(){c._("clientsQuery").then(function(e){u("app").save("clients",e),t.views.viewClient==1?t.setViewTo("client"):s.reload()})},function(e){console.log(e)})})}}))},t.requestReportsByFilter=function(){angular.forEach(t.groupReports,function(e){e.clientUuid!=t.currentCLient&&t.currentCLient!="0"?e.filtered="true":e.filtered="false";var n=(new Date(e.creationTime)).getMonth()+1;n!=t.currentMonth&&t.currentMonth!="0"||e.filtered=="true"?e.filtered="true":e.filtered="false"})};var E=function(t,n,r){t.report=r,t.view={editReport:!!r.editMode,viewReport:!r.editMode&&typeof r.uuid!="undefined",newReport:typeof r.uuid=="undefined"},t.close=function(){n.dismiss()},t.saveReport=function(t){console.log(t),t.editMode?c._("clientReportUpdate",{second:t.clientUuid,fourth:t.uuid},{uuid:t.uuid,title:t.title,body:t.body,creationTime:t.creationTime}).then(function(){n.close(t),e.notifier.success(e.ui.teamup.dataChanged)}):c._("clientReportAdd",{second:t.clientUuid},{uuid:t.uuid,title:t.title,body:t.body,creationTime:t.creationTime}).then(function(){n.close(t),e.notifier.success(e.ui.teamup.dataChanged)})}};t.openReport=function(e){t.report=e,t.report.editMode=!1,l.open({templateUrl:"./views/reportTemplate.html",controller:E,resolve:{report:function(){return t.report}}})},t.newReport=function(){if(t.currentCLient==0){e.notifier.error(e.ui.teamup.selectClient);return}t.report={title:e.ui.teamupnewReport,creationTime:(new Date).getTime(),clientUuid:t.currentCLient,body:null,author:t.$root.getTeamMemberById(e.app.resources.uuid),client:t.$root.getClientByID(t.currentCLient),editMode:!1};var n=l.open({templateUrl:"views/reportTemplate.html",controller:E,resolve:{report:function(){return t.report},editMode:!1}});n.result.then(function(){y()},function(){console.log("Modal dismissed at: "+new Date)})},t.editReport=function(e){t.report=e,t.report.editMode=!0,l.open({templateUrl:"./views/reportTemplate.html",controller:E,resolve:{report:function(){return t.report}}})},t.removeReport=function(t){window.confirm(e.ui.teamup.deleteConfirm)&&(e.statusBar.display(e.ui.teamup.loading),c._("clientReportDelete",{second:t.clientUuid,reportId:t.uuid}).then(function(t){t.result=="ok"?(e.notifier.success(e.ui.teamup.dataChanged),y()):e.notifier.error(t.error)},function(e){console.log(e)}))}}])});