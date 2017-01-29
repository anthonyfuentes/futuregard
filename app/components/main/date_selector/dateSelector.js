
FG.directive("dateSelector", function(){

  return {
    restrict: "E",
    templateUrl: "app/components/main/date_selector/dateSelector.html",
    scope: {
      start: "=",
      current: "=",
      end: "=",
      triggerCallbacks: "&"
    }
  }

});
