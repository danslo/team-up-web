define(["controllers/controllers","config"],function(e,t){e.controller("login",["$rootScope","$location","$q","$scope","Session","Teams","Clients","Store","$routeParams","TeamUp","Dater","$filter","MD5","Permission",function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){function w(){f._("teamMemberFree").then(function(e){u("app").save("members",e)})}function E(e){f._("taskMineQuery").then(function(e){u("app").save("myTasks",e)});var t=[];angular.forEach(e,function(e){f._("taskByTeam",{fourth:e.uuid}).then(function(e){angular.forEach(e,function(e){var n=c("getByUuid")(t,e.uuid);n==null&&t.push(e)}),u("app").save("allTasks",t)})})}function S(){var t=u("app").get("resources"),n=_.pluck(r.$root.getTeamsofMembers(t.uuid),"uuid");t.teamUuids=n,e.app.resources=t,u("app").save("resources",t)}function x(){var t=["myTasks","allTasks"];angular.forEach(t,function(t){var n=u("app").get(t);angular.forEach(n,function(t){if(typeof t=="object"){var n=e.getClientByID(t.relatedClientUuid);n!=null&&(t.relatedClientName=n.firstName+" "+n.lastName)}}),u("app").save(t,n)})}function T(){p.getProfile().then(function(n){e.app.domainPermission=n;var r="";_.has(n,"tasks")?r="/tasks2":_.has(n,"teamTelephone")?r="/team-telefoon/status":r="/team",t.path(r)})}var d=function(){angular.element("body").css({backgroundColor:"#1dc8b6",backgroundImage:"none"})};try{localStorage.test="test"}catch(v){var m="http://support.apple.com/nl-nl/ht6366",g="<p>"+e.ui.teamup.checkLocalStorage+"</p>";return g+="<a href='"+m+"'>",g+=m+"</a>",d(),angular.element("#login").html("").append(g),!1}l.registerPeriods(),t.path()=="/logout"&&d(),a.uuid&&a.key?(r.views={changePass:!0},r.changepass={uuid:a.uuid,key:a.key}):r.views={login:!0,forgot:!1},r.alert={login:{display:!1,type:"",message:""},forgot:{display:!1,type:"",message:""}},u("app").get("app")||u("app").save("app","{}"),angular.element(".navbar").hide(),angular.element("#footer").hide(),angular.element("#watermark").hide(),angular.element("body").css({backgroundColor:"#1dc8b6"});var y=u("app").get("loginData");y&&y.remember&&(r.loginData=y),r.login=function(){angular.element("#alertDiv").hide();if(!r.loginData||!r.loginData.username||!r.loginData.password)return r.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_fillfiled}},angular.element("#login button[type=submit]").text(e.ui.login.button_login).removeAttr("disabled"),!1;angular.element("#login button[type=submit]").text(e.ui.login.button_loggingIn).attr("disabled","disabled"),u("app").save("loginData",{username:r.loginData.username,password:r.loginData.password,remember:r.loginData.remember}),b(r.loginData.username,h(r.loginData.password))};var b=function(t,n){f._("login",{uuid:t,pass:n}).then(function(t){var n=0;t.status?n=t.status:t.error&&t.error.status&&(n=t.error.status);if(n==400||n==403||n==404)return r.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_wrongUserPass}},angular.element("#login button[type=submit]").text(e.ui.login.button_login).removeAttr("disabled"),!1;if(t.status==0)return r.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_network}},angular.element("#login button[type=submit]").text(e.ui.login.button_login).removeAttr("disabled"),!1;if(t.error)return r.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_wrongUserPass}},angular.element("#login button[type=submit]").text(e.ui.login.button_login).removeAttr("disabled"),console.log("Pay attention, this might caused by the Log module"),!1;i.set(t["X-SESSION_ID"]),N()})},N=function(){angular.element("#login").hide(),angular.element("#download").hide(),angular.element("#preloader").show(),C(20,e.ui.login.loading_User),f._("user").then(function(t){t.error?console.warn("error ->",t):(e.app.resources=t,u("app").save("resources",e.app.resources),trackGa("send","event","Login",e.app.resources.uuid),C(40,e.ui.login.loading_teams),s.query(!0,{}).then(function(t){w(),E(t),t.error&&console.warn("error ->",t),C(60,e.ui.login.loading_teams),s.queryClientGroups(t).then(function(){C(80,e.ui.login.loading_clientGroups),f._("clientsQuery").then(function(t){u("app").save("clients",t),o.query(!1,{}).then(function(){C(100,e.ui.login.loading_everything),x(),s.query().then(function(){S(),e.showChangedAvatar("team",e.app.resources.uuid),T(),setTimeout(function(){angular.element(".navbar").show(),angular.element("body").css({background:"url(../images/bg.jpg) repeat"}),e.browser.mobile||angular.element("#footer").show()},100)})})})})}))})},C=function(e,t){angular.element("#preloader .progress .bar").css({width:e+"%"}),angular.element("#preloader span").text(t)};localStorage.hasOwnProperty("sessionTimeout")&&(localStorage.removeItem("sessionTimeout"),r.alert={login:{display:!0,type:"alert-error",message:e.ui.teamup.sessionTimeout}})}])});