define(["filters/filters","config"],function(e,t){e.filter("escape",[function(){return function(e){return!e||e.indexOf(".")==-1?e:e.replace(".","").replace("@","")}}]),e.filter("stateColor",[function(){return function(e){var n=t.app.stateColors.none,r=_.pluck(e,"value");console.log("states",r);if(r.indexOf("available")>=0){n=t.app.stateColors.availalbe;if(r.indexOf("on_the_phone")>=0||r.indexOf("not_reachable")>=0||r.indexOf("unreachable")>=0)n=t.app.stateColors.busy}else if(r.indexOf("unavailable")>=0||r.indexOf("working")>=0)n=t.app.stateColors.busy;else if(r.indexOf("offline")>=0||r.indexOf("unknown")>=0)n=t.app.stateColors.offline;return n}}]),e.filter("nicelyDate",[function(){return function(e){return typeof e=="string"&&(e=Number(e)),String(e).length==10&&(e*=1e3),(new Date(e)).toString(t.app.formats.date)}}]),e.filter("nicelyTime",[function(){return function(e){return typeof e=="string"&&(e=Number(e)),(new Date(e)).toString(t.app.formats.time)}}]),e.filter("translateRole",[function(){return function(e){var n;return angular.forEach(t.app.roles,function(t){t.id==e&&(n=t.label)}),n}}]),e.filter("translateFunc",[function(){return function(e){var n;return angular.forEach(t.app.mfunctions,function(t){t.id==e&&(n=t.label)}),n}}]),e.filter("stateDataIcon",[function(){return function(e,n){var r;return angular.forEach(t.app.stateIcons,function(t){angular.lowercase(t.name)==angular.lowercase(e)&&(n=="data_icon"?r=t.data_icon:n=="class_name"&&(r=t.class_name))}),r}}]),e.filter("stateValue",[function(){return function(e,t){if(angular.lowercase(e.name)=="location"){var n=e.value,r=n.match(/\((.*?)\)/);return r==null?n:t=="data"?r[1]:n.replace(r[0],"")}return e.value}}]),e.filter("rangeMainFilter",["Dater","$filter",function(e,t){var n=e.getPeriods();return function(r){var i=(new Date(r.start)).getTime(),s=(new Date(r.end)).getTime();s-i==86401e3&&(r.start=(new Date(r.end)).addDays(-1),i=(new Date(r.start)).getTime());var r={start:{real:t("date")(i,"EEEE, MMMM d"),month:t("date")(i,"MMMM"),day:t("date")(i,"d")},end:{real:t("date")(s,"EEEE, MMMM d"),month:t("date")(s,"MMMM"),day:t("date")(s,"d")}},o=t("date")(s,"M")-1;return(Math.round(r.start.day)+1==r.end.day&&r.start.hour==r.end.hour||r.start.day==r.end.day)&&r.start.month==r.end.month?r.start.real+", "+e.getThisYear():r.start.day==1&&r.end.day==n.months[o+1].totalDays?r.start.month+", "+e.getThisYear():r.start.real+" / "+r.end.real+", "+e.getThisYear()}}]),e.filter("rangeMainWeekFilter",["Dater",function(e){return function(t){if(t){var n={start:(new Date(t.start)).toString("dddd, MMMM d"),end:(new Date(t.end)).toString("dddd, MMMM d")};return n.start+" / "+n.end+", "+e.getThisYear()}}}]),e.filter("rangeInfoFilter",["Dater","$rootScope",function(e,t){var n=e.getPeriods();return function(e){var r=(new Date(e.range.end)).getTime()-(new Date(e.range.start)).getTime();if(r>26784e5)return"Total selected days: "+Math.round(r/864e5);if(e.scope.day){var i={start:(new Date(e.range.start)).toString("HH:mm"),end:(new Date(e.range.end)).toString("HH:mm")};return i.end=="00:00"&&(i.end="24:00"),t.ui.planboard.time+i.start+" / "+i.end}if(e.scope.week)return t.ui.planboard.weekNumber+e.current.week;if(e.scope.month)return t.ui.planboard.monthNumber+e.current.month+","+t.ui.planboard.totalDays+n.months[e.current.month].totalDays}}]),e.filter("rangeInfoWeekFilter",[function(){return function(e){if(e)return"Week number: "+e.current.week}}]),e.filter("i18n_spec",["$rootScope",function(e){return function(t,n){var r=n.split("."),i;if(r[1]=="stateValue"){var s=e.ui[r[0]][r[1]];return angular.forEach(s,function(e,n){n==t&&(i=e)}),i}return i=e.ui[r[0]][r[1]].replace("$v",t),typeof i=="undefined"&&(i=t),i}}]),e.filter("stateIcon",[function(){return function(e){switch(e){case"emotion":return"icon-face";case"availability":return"icon-avail";case"location":return"icon-location";case"activity":return"icon-activity";case"reachability":return"icon-reach";default:return"icon-info-sign"}}}]),e.filter("avatar",["Session","Store",function(e,n){return function(r,i,s){var o=e.get();if(o&&r){var u;switch(i){case"team":u="team/member/";break;case"client":u="client/";break;case"avatar":u="images/";break;case"image":u="images/"}var a=function(e){var t=0;return angular.forEach(n("app").get("avatarChangeRecord"),function(n){n==e&&t++}),parseInt(t,10)},f=parseInt(s,10)+parseInt(a(r),10);if(i=="avatar"||i=="image"){var l=t.app.host+u+r+"?sid="+o;return l}return t.app.host+t.app.namespace+u+r+"/photo?width="+f+"&height="+f+"&sid="+o}}}]),e.filter("getObjAttr",["$rootScope",function(e){return function(t,n,r){if(n=="client"){var i=e.getClientByID(t);if(i==null||typeof i=="undefined")return"";if(r=="name")return i.firstName+" "+i.lastName;if(r=="address")return i.address.street+" "+i.address.no+", "+i.address.zip+" "+i.address.city;if(r=="latlong")return typeof i.address.latitude=="undefined"||typeof i.address.longitude=="undefined"||i.address.longitude==0&&i.address.latitude==0?i.address.street+" "+i.address.no+", "+i.address.zip+" ,"+i.address.city:i.address.latitude+","+i.address.longitude}else if(n=="member"){if(t==null)return"";var s=e.getTeamMemberById(t);if(r=="name")return s.firstName+" "+s.lastName;if(r=="states")return s.states}else{if(n!="clientGroup")return"no name";if(t==null)return"";if(r=="name")return e.getClientGroupName(t)}}}]),e.filter("getByUuid",function(){return function(e,t){var n=0,r=e.length;for(;n<r;n++)if(e[n].uuid==t)return e[n];return null}}),e.filter("dateReverse",["$filter",function(e){return function(t,n){var r=(new Date(t)).getTime();return e("date")(r,n)}}]),e.filter("formatTaskState",[function(){return function(e){if(e)return t.app.taskStates[e]}}]),e.filter("interpolate",[function(){return function(e){return e=String(e).replace(/\%RELEASED\%/mg,t.app.released),String(e).replace(/\%VERSION\%/mg,t.app.version)}}]),e.filter("stripHtml",[function(){return function(e){if(e)return e.split(">")[1].split("<")[0]}}]),e.filter("convertUserIdToName",["Store",function(e){var t=e("network").get("unique");return function(e){return t==null||typeof t[e]=="undefined"?e:t[e].resources.firstName+" "+t[e].resources.lastName}}])});