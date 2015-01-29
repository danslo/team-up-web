define(["app"],function(e){e.config(["$locationProvider","$routeProvider","$httpProvider",function(e,t,n){t.when("/login",{templateUrl:"views/login.html",controller:"login"}).when("/logout",{templateUrl:"views/logout.html",resolve:{data:["$rootScope","$route",function(e){e.logout()}]}}).when("/tasks",{templateUrl:"views/tasks.html",controller:"tasksCtrl"}).when("/tasks2",{templateUrl:"views/tasks2.html",controller:"tasks2Ctrl"}).when("/admin",{templateUrl:"views/admin.html",controller:"adminCtrl"}).when("/scenarios",{templateUrl:"views/scenarios.html",controller:"adminCtrl"}).when("/team",{templateUrl:"views/teams.html",controller:"teamCtrl",reloadOnSearch:!1,resolve:{data:["Teams","$route",function(e,t){return t.current.params.local&&t.current.params.local=="true"?e.queryLocal():e.query(!1,t.current.params)}]}}).when("/client",{templateUrl:"views/clients.html",controller:"clientCtrl",reloadOnSearch:!1,resolve:{data:["Clients","$route",function(e,t){return t.current.params.local&&t.current.params.local=="true"?e.queryLocal():e.query(!1,t.current.params)}]}}).when("/editTask/:taskId",{templateUrl:"views/tasks2.html",controller:"tasks2Ctrl",reloadOnSearch:!1,resolve:{}}).when("/clientProfile/:clientId",{templateUrl:"views/clients.html",controller:"clientCtrl",reloadOnSearch:!1,resolve:{data:["$rootScope","$route",function(e,t){return angular.element(".navbar #clientMenu").addClass("active"),{clientId:t.current.params.clientId}}]}}).when("/manage",{templateUrl:"views/manage.html",controller:"manageCtrl",reloadOnSearch:!1,resolve:{data:["Clients","Teams","$location",function(e,t,n){return n.hash()&&n.hash()=="reload"?{t:t.query(),cg:e.query()}:{local:!0}}]}}).when("/treegrid",{templateUrl:"views/treegrid.html",controller:"treegridCtrl",reloadOnSearch:!1,resolve:{data:["Clients","Teams","$location",function(e,t,n){return n.hash()&&n.hash()=="reload"?{t:t.query(),cg:e.query()}:{local:!0}}]}}).when("/team-telefoon/agenda/:userId?",{templateUrl:"views/team-telephone/agenda.html",controller:"agenda",resolve:{data:["$route","Slots","Storage","Dater","Store","TeamUp","$q","$rootScope","$location",function(e,t,n,i,s,o,u,a,f){var l=s("app").get("periods"),c=s("app").get("teams"),h=s("app").get("currentTeamClientGroup"),p=!_.isUndefined(h)&&h.team?h.team:c[0].uuid,d=function(){f.path("/team-telefoon/agenda/"+a.app.resources.uuid)};_.isUndefined(e.current.params.userId)&&d();var v=a.getTeamsofMembers(e.current.params.userId);if(a.app.resources.role>1){var m=_.where(v,{uuid:p});_.isEmpty(m)&&d()}else p=v[0].uuid;r(".teamMenu");var g=u.defer(),y=function(e){return t.all({groupId:p,stamps:i.current.today()>360?{start:l.days[358].last.timeStamp,end:l.days[365].last.timeStamp}:{start:l.days[i.current.today()-1].last.timeStamp,end:l.days[i.current.today()+6].last.timeStamp},month:i.current.month(),layouts:{user:!0,group:!0,members:!1},user:e})};return o._("profileGet",{third:e.current.params.userId},null,{success:function(e){y(e.uuid).then(function(t){g.resolve({timelineData:t,userData:e})})}}),g.promise}]},reloadOnSearch:!1}).when("/team-telefoon/logs",{templateUrl:"views/team-telephone/logs.html",controller:"logs",resolve:{data:["Logs",function(e){return r(".teamMenu"),e.fetch({end:(new Date.now).getTime(),start:(new Date.today).addDays(-7).getTime()})}]},reloadOnSearch:!1}).when("/team-telefoon",{redirectTo:function(e,t,n){return t+"/agenda"}}).when("/tasks2/planboard",{templateUrl:"views/planboard.html",controller:"planboard",reloadOnSearch:!1}).when("/team-telefoon/status",{templateUrl:"views/team-telephone/status.html",controller:"status",reloadOnSearch:!1,resolve:{data:["Teams","Slots","$route",function(e,t,n){return r(".teamMenu"),n.current.params.local&&n.current.params.local=="true"?e.queryLocal():e.query(!1,n.current.params)}]}}).when("/team-telefoon/order",{templateUrl:"views/team-telephone/order.html",controller:"order",resolve:{data:function(){r(".teamMenu")}},reloadOnSearch:!1}).when("/messages",{templateUrl:"views/messages.html",controller:"messages",reloadOnSearch:!1}).when("/profile/:userId?",{templateUrl:"views/profile.html",controller:"profileCtrl",reloadOnSearch:!1,resolve:{data:["$rootScope","$route","Profile","$location",function(e,t,n,r){return t.current.params.userId||r.path("/profile/"+e.app.resources.uuid).hash("profile"),n.fetchUserData(t.current.params.userId)}]}}).when("/vis",{templateUrl:"views/vis.html",controller:"vis",reloadOnSearch:!1}).when("/support",{templateUrl:"views/support.html",controller:"supportCtrl",reloadOnSearch:!1}).otherwise({redirectTo:"/login"}),n.interceptors.push(["$q","Log","$location",function(e,t,n){return{request:function(t){return t||e.when(t)},requestError:function(n){return t.error(n),e.reject(n)},response:function(t){return t||e.when(t)},responseError:function(t){return t.status==403&&(localStorage.setItem("sessionTimeout",""),n.path("/logout"),window.location.href="logout.html"),e.reject(t)}}}]);var r=function(e){angular.element(e).removeClass("active")}}])});