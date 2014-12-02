define(["services/services"],function(e){e.factory("Clients",["$resource","$q","Store","TeamUp",function(e,t,n,r){var i=e();return i.prototype.query=function(e,i){var s=t.defer();return r._("clientGroupsQuery",null,null,{success:function(o){n("app").save("ClientGroups",o);if(!e){var u=[];angular.forEach(o,function(e){(!i.uuid||i.uuid==e.id)&&u.push(r._("clientsByGroupIDQuery",{third:e.id},null,{success:function(t){n("app").save(e.id,t.length==4&&t[0][0]=="n"&&t[1][0]=="u"?[]:t)}}))}),t.all(u).then(function(e){var t={};t.clients={},t.clientGroups=o,angular.forEach(o,function(r){t.clients[r.id]=[],angular.forEach(e,function(e){i.uuid?t.clients[r.id]=e.id==r.id&&i.uuid==r.id?e.data:n("app").get(r.id):e.id==r.id&&(t.clients[r.id]=e.data)})}),typeof t.clientGroups=="undefined"&&(t.clientGroups={}),s.resolve(t)})}else s.resolve(o)},error:function(e){s.resolve({error:e})}}),s.promise},i.prototype.manage=function(e){var s=t.defer(),o=[];return angular.forEach(e,function(e,t){e.a.length>0&&o.push(r._("clientsByGroupIDAdd",{third:t},{ids:e.a})),e.r.length>0&&o.push(r._("clientGroupClientDelete",{third:t},{ids:e.r}))}),t.all(o).then(function(){var r=[],o={},u=[],a=function(e){var t;return angular.forEach(n("app").get("ClientGroups"),function(r){var i=n("app").get(r.id);angular.forEach(i,function(n){n.uuid==e&&(t=n)})}),t};angular.forEach(e,function(e,t){u.push(t);var n={uuid:t};r.push(i.prototype.query(!1,n))}),t.all(r).then(function(){s.resolve(o)})}),s.promise},i.prototype.queryLocal=function(){var e={};return e.clientGroups=n("app").get("ClientGroups"),e.clients={},angular.forEach(e.clientGroups,function(t){e.clients[t.id]=n("app").get(t.id)}),e},new i}])});