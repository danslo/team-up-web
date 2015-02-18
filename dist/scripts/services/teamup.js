define(["services/services","config"],function(e,t){e.factory("TeamUp",["$resource","$q",function(e,n){var r=e(t.app.host+t.app.namespace+":first/:second/:third/:fourth",{},{login:{method:"GET",params:{first:"login",uuid:"",pass:""}},logout:{method:"GET",isArray:!0,params:{first:"logout"}},user:{method:"GET",params:{first:"team",second:"member"}},chats:{method:"GET",params:{first:"team",second:"teamMessage",third:"",since:""},isArray:!0},message:{method:"POST",params:{first:"team",second:"teamMessage"}},profileGet:{method:"GET",params:{first:"team",second:"member"}},profileSave:{method:"PUT",params:{first:"team",third:"member"}},callOrderGet:{method:"GET",params:{first:"network",third:"orderedMembers",isTeam:!0}},callOrderSave:{method:"PUT",params:{first:"network",third:"orderedMembers",isTeam:!0}},tasksAll:{method:"GET",params:{first:"team",second:"tasks"},isArray:!0},taskQuery:{method:"GET",params:{first:"tasks",start:"",end:""},isArray:!0},taskAdd:{method:"POST",params:{first:"tasks"}},taskUpdate:{method:"PUT",params:{first:"tasks"}},taskDelete:{method:"DELETE",params:{first:"tasks"}},taskMineQuery:{method:"GET",params:{first:"tasks",second:"mine"},isArray:!0},taskByTeam:{method:"GET",params:{first:"tasks",second:"team"},isArray:!0},taskById:{method:"GET",params:{first:"tasks"},isArray:!1},clientGroupsQuery:{method:"GET",params:{first:"client",second:"clientGroups"},isArray:!0},clientsByGroupIDQuery:{method:"GET",isArray:!0,params:{first:"client",second:"clientGroup",fourth:"clients"}},clientsByGroupIDAdd:{method:"POST",params:{first:"client",second:"clientGroup",fourth:"clients"}},clientGroupAdd:{method:"POST",params:{first:"clientGroup"}},clientGroupUpdate:{method:"PUT",params:{first:"clientGroup"}},clientGroupDelete:{method:"DELETE",params:{first:"clientGroup"}},clientAdd:{method:"POST",params:{first:"client"}},clientUpdate:{method:"PUT",params:{first:"client"}},clientDelete:{method:"DELETE",params:{first:"client"}},clientsQuery:{method:"GET",isArray:!0,params:{first:"client",second:"clients"}},clientReportsQuery:{method:"GET",isArray:!0,params:{first:"clients",third:"reports"}},clientGroupClientDelete:{method:"PUT",params:{first:"client",second:"clientGroup",fourth:"removeClients"}},clientGroupReportsQuery:{method:"GET",isArray:!0,params:{first:"clientGroup",third:"reports"}},clientGroupTasksQuery:{method:"GET",isArray:!0,params:{first:"clientGroup",third:"tasks",from:"",to:""}},clientReportAdd:{method:"POST",params:{first:"clients",third:"reports"}},clientReportUpdate:{method:"PUT",params:{first:"clients",third:"reports"}},clientReportDelete:{method:"DELETE",params:{first:"clients",third:"reports",reportId:""}},teamQuery:{method:"GET",isArray:!0,params:{first:"team"}},teamAdd:{method:"POST",params:{first:"team",id:""}},teamUpdate:{method:"PUT",params:{first:"team"}},teamDelete:{method:"DELETE",params:{first:"team"}},teamStatusQuery:{method:"GET",isArray:!0,params:{first:"team",second:"status"}},teamMemberAdd:{method:"POST",params:{first:"team",third:"member"}},teamMemberUpdate:{method:"PUT",params:{first:"team",third:"updateMembers"}},teamMemberDelete:{method:"PUT",params:{first:"team",third:"removeMember"}},teamMemberFree:{method:"GET",isArray:!0,params:{first:"team",second:"members"}},teamPhone:{method:"GET",params:{first:"team",third:"phone"}},teamClientGroupQuery:{method:"GET",isArray:!0,params:{first:"team",third:"clientGroups"}},teamClientGroupAdd:{method:"POST",params:{first:"team",third:"clientGroups"}},teamClientGroupUpdate:{method:"PUT",params:{first:"team",third:"updateClientGroups"}},teamClientGroupDelete:{method:"PUT",params:{first:"team",third:"unAssignClientGroups"}},teamTaskQuery:{method:"GET",isArray:!0,params:{first:"team",third:"tasks",from:"",to:""}},teamPhoneNumber:{method:"GET",params:{first:"team",third:"phone"}},memberAdd:{method:"POST",params:{first:"team",second:"member"}},memberDelete:{method:"DELETE",params:{first:"team",second:"member"}},memberPhoto:{method:"GET",params:{first:"team",second:"member",fourth:"photourl",width:40,height:40}}});return r.prototype._=function(e,t,i,s){var o=n.defer();t=t||{};try{r[e](t,i,function(e){s&&s.success&&s.success.call(this,e),o.resolve(e)},function(e){s&&s.error&&s.error.call(this,e),o.resolve({error:e})})}catch(u){}return o.promise},new r}])});