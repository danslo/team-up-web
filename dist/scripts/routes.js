define(["app"],function(e){e.config(["$locationProvider","$routeProvider","$httpProvider",function(e,t,n){t.when("/login",{templateUrl:"views/login.html",controller:"login"}).when("/logout",{templateUrl:"views/logout.html"}).when("/tasks",{templateUrl:"views/tasks.html",controller:"tasksCtrl"}).when("/tasks2",{templateUrl:"views/tasks2.html",controller:"tasks2Ctrl"}).when("/upload",{templateUrl:"views/upload.html",controller:"uploadCtrl"}).when("/team",{templateUrl:"views/teams.html",controller:"teamCtrl",reloadOnSearch:!1,resolve:{data:["Teams","$route",function(e,t){return t.current.params.local&&t.current.params.local=="true"?e.queryLocal():e.query(!1,t.current.params)}]}}).when("/client",{templateUrl:"views/clients.html",controller:"clientCtrl",reloadOnSearch:!1,resolve:{data:["Clients","$route",function(e,t){return t.current.params.local&&t.current.params.local=="true"?e.queryLocal():e.query(!1,t.current.params)}]}}).when("/clientProfile/:clientId",{templateUrl:"views/clients.html",controller:"clientCtrl",reloadOnSearch:!1,resolve:{data:["$rootScope","$route",function(e,t){return angular.element(".navbar #clientMenu").addClass("active"),{clientId:t.current.params.clientId}}]}}).when("/manage",{templateUrl:"views/manage.html",controller:"manageCtrl",reloadOnSearch:!1,resolve:{data:["Clients","Teams","$location",function(e,t,n){return n.hash()&&n.hash()=="reload"?{t:t.query(),cg:e.query()}:{local:!0}}]}}).when("/treegrid",{templateUrl:"views/treegrid.html",controller:"treegridCtrl",reloadOnSearch:!1,resolve:{data:["Clients","Teams","$location",function(e,t,n){return n.hash()&&n.hash()=="reload"?{t:t.query(),cg:e.query()}:{local:!0}}]}}).when("/planboard",{templateUrl:"views/planboard.html",controller:"planboard",reloadOnSearch:!1}).when("/messages",{templateUrl:"views/messages.html",controller:"messages",reloadOnSearch:!1}).when("/profile/:userId",{templateUrl:"views/profile.html",controller:"profileCtrl",reloadOnSearch:!1,resolve:{data:["$rootScope","$route","TeamUp","Store",function(e,t,n,r){return n._("profileGet",{third:t.current.params.userId},null,{success:function(n){t.current.params.userId==e.app.resources.uuid&&(e.app.resources=n,r("app").save("resources",n))}})}]}}).when("/profile",{templateUrl:"views/profile.html",controller:"profileCtrl",resolve:{data:["$rootScope","$route","$location",function(e,t,n){(!t.current.params.userId||!n.hash())&&n.path("/profile/"+e.app.resources.uuid).hash("profile")}]}}).when("/vis",{templateUrl:"views/vis.html",controller:"vis",reloadOnSearch:!1}).when("/support",{templateUrl:"views/support.html",controller:"supportCtrl",reloadOnSearch:!1}).otherwise({redirectTo:"/login"}),n.interceptors.push(["$q","Log","$location",function(e,t,n){return{request:function(t){return t||e.when(t)},requestError:function(n){return t.error(n),e.reject(n)},response:function(t){return t||e.when(t)},responseError:function(t){return t.status==403&&(localStorage.setItem("sessionTimeout",""),n.path("/logout"),window.location.href="logout.html"),e.reject(t)}}}])}])});