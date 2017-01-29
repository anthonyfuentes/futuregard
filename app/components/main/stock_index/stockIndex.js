
FG.directive("stockIndex", function(){

  return {
    restrict: "E",
    templateUrl: "app/components/main/stock_index/stockIndex.html",
    scope: {
      stocks: "="
    }
  }

});
