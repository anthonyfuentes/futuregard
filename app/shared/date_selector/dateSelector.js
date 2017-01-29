
FG.directive("dateSelector", function(){

  return {
    restrict: "E",
    templateUrl: "app/shared/date_selector/dateSelector.html",
    scope: {
      start: "=",
      current: "=",
      end: "=",
      triggerCallbacks: "&"
    }
  }

});
