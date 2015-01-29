define(["services/services","config"],function(e,t){e.factory("Dater",["$rootScope","Store",function(e,n){return{current:{today:function(){return Date.today().getDayOfYear()+1},week:function(){return Date.today().getWeekOfYear()},month:function(){return(new Date).getMonth()+1},year:function(){return(new Date).toString("yyyy")}},readable:{date:function(e){return(new Date(e)).toString(t.app.formats.date)}},convert:{absolute:function(e,t,n){var r=e.split("-"),i=(new Date(Date.parse(r[2]+"-"+r[1]+"-"+r[0]+" "+t))).getTime();return n?i/1e3:i}},calculate:{diff:function(e){return(new Date(e.end)).getTime()-(new Date(e.start)).getTime()}},getThisYear:function(){return(new Date).toString("yyyy")},getMonthTimeStamps:function(){var e={},t=this.getThisYear();for(var n=0;n<12;n++){var r=(new Date(t,n)).moveToFirstDayOfMonth(),i=(new Date(t,n)).moveToLastDayOfMonth().addDays(1),s={first:{day:r,timeStamp:r.getTime()},last:{day:i,timeStamp:i.getTime()},totalDays:Date.getDaysInMonth(t,n)};e[n+1]=s}return e},getWeekTimeStamps:function(){var e=[],t={},n,r=this.getThisYear(),i=(new Date(r,0)).moveToFirstDayOfMonth(),s=(new Date(r,0)).moveToFirstDayOfMonth().last().sunday().addWeeks(0),o=new Date(s);for(var u=0;u<53;u++)u==0?n=s.addWeeks(1):n=(new Date(e[u-1])).addWeeks(1),e.push(new Date(n));e.unshift(o);var a=new Date(e[51].addWeeks(1));for(var u=0;u<55;u++)t[u+1]={first:{day:e[u],timeStamp:(new Date(e[u])).getTime()},last:{day:e[u+1],timeStamp:(new Date(e[u+1])).getTime()}};return delete t[54],delete t[55],t},getDayTimeStamps:function(){var e,t=[],n={},r=this.getThisYear(),i=(new Date(r,0)).moveToFirstDayOfMonth();for(var s=0;s<366;s++)s==0?e=i:e=(new Date(t[s-1])).addDays(1),t.push(new Date(e));for(var s=0;s<366;s++)n[s+1]={first:{day:t[s],timeStamp:(new Date(t[s])).getTime()},last:{day:t[s+1],timeStamp:(new Date(t[s+1])).getTime()}};return n[366].timeStamp?n.total=366:(delete n[366],n.total=365),n},registerPeriods:function(){var e=n("app").get("periods")||"{}";n("app").save("periods",{months:this.getMonthTimeStamps(),weeks:this.getWeekTimeStamps(),days:this.getDayTimeStamps()})},getPeriods:function(){return n("app").get("periods")},formatDate:function(e){return moment(e).format("DD-MM-YYYY")},formatDateMobile:function(e){return moment(this.convert.absolute(e,0)).format("YYYY-MM-DD")}}}])});