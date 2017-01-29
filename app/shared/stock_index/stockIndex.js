
FG.directive("stockIndex", function(){

  return {
    restrict: "E",
    templateUrl: "app/shared/stock_index/stockIndex.html",
    scope: {
      stocks: "="
    }
  }

});
