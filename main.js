var hideStuff = function(elem) {
  $(elem).parents("tr").children("td:gt(1)").children().css("display", "none");
  $(elem).parents("tr").children("td:nth-child(2)").find("br").css("display", "none");
  $(elem).parents("tr").children("td:nth-child(2)").css("color", "#999");
};

var showStuff = function(elem) {
  $(elem).parents("tr").children("td:gt(1)").children().css("display", "");
  $(elem).parents("tr").children("td:nth-child(2)").find("br").css("display", "");
  $(elem).parents("tr").children("td:nth-child(2)").css("color", "");
};
if (!window.crsChecklistAlreadyRun) {
  !function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(t){function o(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},o.defaults,i),"number"==typeof i.expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}i.expires=i.expires?i.expires.toUTCString():"";try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(s){}r=t.write?t.write(r,n):encodeURIComponent(r+"").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(n+""),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape);var f="";for(var u in i)i[u]&&(f+="; "+u,i[u]!==!0&&(f+="="+i[u]));return document.cookie=n+"="+r+f}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,l=0;l<p.length;l++){var m=p[l].split("="),g=m.slice(1).join("=");'"'===g.charAt(0)&&(g=g.slice(1,-1));try{var C=m[0].replace(d,decodeURIComponent);if(g=t.read?t.read(g,C):t(g,C)||g.replace(d,decodeURIComponent),this.json)try{g=JSON.parse(g)}catch(s){}if(n===C){c=g;break}n||(c[C]=g)}catch(s){}}return c}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(n,t){o(n,"",e(t,{expires:-1}))},o.withConverter=n,o}return n(function(){})});

  var tr_objects = $("#tbl-search tbody tr");
  tr_objects = tr_objects.filter(function() {
    var matches = $(this).children("td:nth-child(1)").html().match(/\d+/);
    return matches && matches[0].length == 5;
  });
  tr_objects.children("td:nth-child(1)").map(function() {
    $(this).html($(this).html().match(/\d+/)[0]);
  });
  tr_objects.children("td:gt(1)").wrapInner("<div></div>");
  tr_objects.children("td:nth-child(1)").wrapInner("<a href='#' onclick='return false;'></a>")
    .children("a").click(function(){
    var classCode = $(this).html().match(/\d+/)[0];
    if (Cookies.get(classCode)) {
      showStuff(this);
      Cookies.set(classCode, "", { expires: 100 });
    } else {
      hideStuff(this);
      Cookies.set(classCode, "x", { expires: 100 });
    }
  }).map(function() {
    var classCode = $(this).html().match(/\d+/)[0];
    if (Cookies.get(classCode)) {
      hideStuff(this);
    } else {
      showStuff(this);
    }
  });
  window.crsChecklistAlreadyRun = 1;
}
