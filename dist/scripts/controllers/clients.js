define(["controllers/controllers","config"],function(e,t){e.controller("clientCtrl",["$rootScope","$scope","$location","Clients","data","$route","$routeParams","Store","Dater","$filter","$modal","TeamUp",function(e,n,r,i,s,o,u,a,f,l,c,h){function w(e){angular.forEach(s.clientGroups,function(t){t.id==e&&(n.clientGroup=t)}),n.clients=s.clients[e],n.current=e,n.views.reports&&(n.currentCLient="0",n.currentMonth="0",b())}e.fixStyles(),s.clientId&&(s.clientGroups=a("app").get("ClientGroups"),s.clients={},angular.forEach(s.clientGroups,function(e){s.clients[e.id]=a("app").get(e.id),angular.forEach(s.clients[e.id],function(e){e.uuid==s.clientId&&(n.client=e,n.contacts=e.contacts,e.birthDate=l("nicelyDate")(e.birthDate),n.clientmeta=e)})})),n.imgHost=t.app.host,n.ns=t.app.namespace,n.clients=s.clients,n.clientGroups=s.clientGroups;var p=f.getMonthTimeStamps();n.Months=[],angular.forEach(p,function(e,t){n.Months[t]={number:t,name:t,start:e.first.timeStamp,end:e.last.timeStamp}}),n.Months[0]={number:0,name:e.ui.teamup.selectMonth};var d=r.search();n.search={query:""},n.selection={},n.data=s;var v,m;!d.uuid&&!r.hash()?(v=s.clientGroups[0].id,m="client",r.search({uuid:s.clientGroups[0].id}).hash("client")):d.uuid?(v=d.uuid,typeof v=="undefined"&&(v=n.client.clientGroupUuid),m=r.hash()):(v=s.clientGroups[0].id,m=r.hash(),r.search({uuid:s.clientGroups[0].id})),n.views={client:!0,newClientGroup:!1,newClient:!1,reports:!1,editClientGroup:!1,editClient:!1,viewClient:!1,editImg:!1};var g=function(e){n.views={client:!1,newClientGroup:!1,newClient:!1,reports:!1,editImg:!1},e=="viewClient"&&y(),e=="reports"&&b(),n.views[e]=!0},y=function(){e.statusBar.display(e.ui.teamup.loadingReports),h._("clientReportsQuery",{second:n.client.uuid},null,{success:function(e){a("app").save("reports_"+n.client.uuid,e)}}).then(function(t){e.statusBar.off(),n.reports=n.processReports(t)},function(e){console.log(e)})},b=function(){e.statusBar.display(e.ui.teamup.loadingReports),h._("clientGroupReportsQuery",{second:n.clientGroup.id}).then(function(t){e.statusBar.off(),n.groupReports=n.processReports(t),n.currentCLient!=0&&n.requestReportsByFilter()},function(e){console.log(e)})};g(m),w(v),n.requestClientGroup=function(e,t){w(e),n.$watch(r.search(),function(){r.search({uuid:e})}),t&&(r.hash()!="client"&&r.hash("client"),g("client"))},n.processReports=function(e){var t=[];return angular.forEach(e,function(e){t.push({uuid:e.uuid,title:e.title,creationTime:e.creationTime,clientUuid:e.clientUuid,body:e.body,author:n.$root.getTeamMemberById(e.authorUuid),client:n.$root.getClientByID(e.clientUuid),filtered:"false"})}),t},n.setViewTo=function(e){n.$watch(e,function(){n.clientGroup||(n.clientGroup=n.clientGroups[0]),(r.hash()=="viewClient"||r.hash()=="editClient"||r.hash()=="editImg")&&e=="client"&&r.path("/client").search({uuid:n.clientGroup.id}),r.hash(e),g(e)})},n.editClientGroup=function(e){n.cGroupEditForm={name:e.name,id:e.id},n.views.editClientGroup=!0},n.cancelClientGroupEdit=function(e){n.cGroupEditForm={name:e.name,id:e.id},n.views.editClientGroup=!1},n.changeClientGroup=function(t){if($.trim(t.name)=="")return;h._("clientGroupUpdate",{second:t.id},t.id).then(function(r){r.error?e.notifier.error(e.ui.teamup.errorSaveClientGroup):(e.statusBar.display(e.ui.teamup.refreshing),i.query(!1).then(function(){e.notifier.success(e.ui.teamup.dataChanged),e.statusBar.off(),n.clientGroup.name=t.name,n.views.editClientGroup=!1}))})};var E=function(t){i.query(!1,t).then(function(i){i.error?console.warn("error ->",i):(e.notifier.success(e.ui.teamup.dataChanged),n.closeTabs(),n.data=i,n.clientGroups=i.clientGroups,n.clients=i.clients,angular.forEach(i.clientGroups,function(e){e.id==t.uuid&&(n.clientGroup=e,n.current=e.id,n.$watch(r.search(),function(){r.search({id:e.id})}))})),e.statusBar.off()})};n.cGroupSubmit=function(t){if(typeof t=="undefined"||$.trim(t.name)==""){e.notifier.error(e.ui.teamup.teamNamePrompt1);return}h._("clientGroupAdd",null,t,{success:function(e){a("app").save(e.id,e)}}).then(function(t){t.error||(e.statusBar.display(e.ui.teamup.refreshing),E({uuid:t.id}))})},n.closeTabs=function(){n.clientGroupForm={},n.clientForm={},g("client")},n.addContacts=function(){if(typeof n.contactForm=="undefined"||n.contactForm.func==""){e.notifier.error(e.ui.teamup.teamNamePrompt2);return}var t={firstName:"",lastName:"","function":"",phone:""};t.firstName=n.contactForm.firstName,t.lastName=n.contactForm.lastName,t.function=n.contactForm.function,t.phone=n.contactForm.phone,typeof n.contacts=="undefined"&&(n.contacts=[]),n.contacts==null&&(n.contacts=[]),n.contacts.push(t)},n.clientSubmit=function(t){if(typeof t=="undefined"||!t.firstName||!t.lastName||!t.phone){e.notifier.error(e.ui.teamup.clinetInfoFill);return}e.statusBar.display(e.ui.teamup.savingClient);try{t.birthDate=f.convert.absolute(t.birthDate,0)}catch(r){e.notifier.error(e.ui.teamup.birthdayError);return}t.clientGroupUuid=n.clientGroup.id,h._("clientAdd",null,t,{success:function(e){a("app").save(e.id,e)}}).then(function(t){t.error?e.notifier.error(e.ui.teamup.clientSubmitError):E({uuid:t.clientGroupUuid})})},n.clientChange=function(t){e.statusBar.display(e.ui.teamup.savingClient);try{t.birthDate=f.convert.absolute(t.birthDate,0)}catch(n){e.notifier.error(e.ui.teamup.birthdayError);return}h._("clientUpdate",{second:t.uuid},t).then(function(t){t.error?e.notifier.error(e.ui.teamup.clientSubmitError):(e.statusBar.display(e.ui.teamup.refreshing),e.notifier.success(e.ui.teamup.dataChanged),E({uuid:t.clientGroupUuid}))})},n.saveContacts=function(t){var r=n.client;try{r.birthDate=f.convert.absolute(r.birthDate,0)}catch(s){e.notifier.error(e.ui.teamup.birthdayError);return}r.contacts=t,e.statusBar.display(e.ui.teamup.savingContacts),h._("clientUpdate",{second:r.uuid},r).then(function(t){t.error?e.notifier.error(e.ui.teamup.clientSubmitError):(e.notifier.success(e.ui.teamup.dataChanged),e.statusBar.off(),i.query(!1,{uuid:t.clientGroupUuid}).then(function(e){})),n.client.birthDate=l("nicelyDate")(n.client.birthDate)})},n.removeContact=function(e){angular.forEach(n.contacts,function(t,r){e.name==t.name&&e.func==t.func&&e.phone==t.phone&&n.contacts.splice(r,1)})},n.deleteClientGroup=function(){window.confirm(e.ui.teamup.delClientGroupConfirm)&&(e.statusBar.display(e.ui.teamup.deletingClientGroup),h._("clientGroupDelete",{second:n.current}).then(function(t){t.id&&i.query(!0,{}).then(function(e){n.requestClientGroup(e[0].id),angular.forEach(n.clientGroups,function(e,r){e.id==t.id&&n.clientGroups.splice(r,1)})},function(e){console.log(e)}),e.notifier.success(e.ui.teamup.dataChanged),e.statusBar.off()},function(e){console.log(e)}))},n.deleteClient=function(t){window.confirm(e.ui.teamup.deleteConfirm)&&(e.statusBar.display(e.ui.teamup.deletingClient),angular.forEach(n.clients,function(e){if(e.uuid==t){var r=e.clientGroupUuid;if(r==null||r=="")r=n.clientGroup.id;var s={},u=[],f=[];u.push(t),s[r]={a:f,r:u},r!=null&&r!=""&&r!=n.clientGroup.id&&(s[n.clientGroup.id]={a:f,r:u}),i.manage(s).then(function(){h._("clientDelete",{second:t}).then(function(){h._("clientsQuery").then(function(e){a("app").save("clients",e),n.views.viewClient==1?n.setViewTo("client"):o.reload()})},function(e){console.log(e)})})}}))},n.requestReportsByFilter=function(){angular.forEach(n.groupReports,function(e){e.clientUuid!=n.currentCLient&&n.currentCLient!="0"?e.filtered="true":e.filtered="false";var t=(new Date(e.creationTime)).getMonth()+1;t!=n.currentMonth&&n.currentMonth!="0"||e.filtered=="true"?e.filtered="true":e.filtered="false"})};var S=function(t,n,r){t.report=r,t.view={editReport:!!r.editMode,viewReport:!r.editMode&&typeof r.uuid!="undefined",newReport:typeof r.uuid=="undefined"},t.close=function(){n.dismiss()},t.saveReport=function(t){console.log(t),t.editMode?h._("clientReportUpdate",{second:t.clientUuid,fourth:t.uuid},{uuid:t.uuid,title:t.title,body:t.body,creationTime:t.creationTime}).then(function(){n.close(t),e.notifier.success(e.ui.teamup.dataChanged)}):h._("clientReportAdd",{second:t.clientUuid},{uuid:t.uuid,title:t.title,body:t.body,creationTime:t.creationTime}).then(function(){n.close(t),e.notifier.success(e.ui.teamup.dataChanged)})}};S.$inject=["$scope","$modalInstance","report"],n.openReport=function(e){n.report=e,n.report.editMode=!1,c.open({templateUrl:"./views/reportTemplate.html",controller:S,resolve:{report:function(){return n.report}}})},n.newReport=function(){if(n.currentCLient==0){e.notifier.error(e.ui.teamup.selectClient);return}n.report={title:e.ui.teamupnewReport,creationTime:(new Date).getTime(),clientUuid:n.currentCLient,body:null,author:n.$root.getTeamMemberById(e.app.resources.uuid),client:n.$root.getClientByID(n.currentCLient),editMode:!1};var t=c.open({templateUrl:"views/reportTemplate.html",controller:S,resolve:{report:function(){return n.report},editMode:!1}});t.result.then(function(){b()},function(){console.log("Modal dismissed at: "+new Date)})},n.editReport=function(e){n.report=e,n.report.editMode=!0,c.open({templateUrl:"./views/reportTemplate.html",controller:S,resolve:{report:function(){return n.report}}})},n.removeReport=function(t){window.confirm(e.ui.teamup.deleteConfirm)&&(e.statusBar.display(e.ui.teamup.loading),h._("clientReportDelete",{second:t.clientUuid,reportId:t.uuid}).then(function(t){t.result=="ok"?(e.notifier.success(e.ui.teamup.dataChanged),b(),n.views.viewClient==1&&y()):e.notifier.error(t.error)},function(e){console.log(e)}))},n.editImg=function(){n.uploadURL=n.imgHost+n.ns+"/client/"+n.client.uuid+"/photo?square=true",n.setViewTo("editImg")}}])});