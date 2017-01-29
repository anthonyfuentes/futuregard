
FG.controller('MainCtrl',
  ['$scope', 'stocks', 'dateService',

  function($scope, stocks, dateService) {

    $scope.start = dateService.getStart();
    $scope.current = dateService.getCurrent();
    $scope.end = dateService.getEnd();

    $scope.allStocks = stocks;

  }

]);
