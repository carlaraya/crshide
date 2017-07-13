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
    if (localStorage.getItem(classCode)) {
      showStuff(this);
      localStorage.setItem(classCode, "");
    } else {
      hideStuff(this);
      localStorage.setItem(classCode, "x");
    }
  }).map(function() {
    var classCode = $(this).html().match(/\d+/)[0];
    if (localStorage.getItem(classCode)) {
      hideStuff(this);
    } else {
      showStuff(this);
    }
  });
  window.crsChecklistAlreadyRun = 1;
}
