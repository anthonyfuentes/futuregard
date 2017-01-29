
FG.controller('MainCtrl',
  ['$scope', 'allStocks', 'dateService',

  function($scope, allStocks, dateService) {

    $scope.startDate = dateService.getStart();
    $scope.currentDate = dateService.getCurrent();
    $scope.endDate = dateService.getEnd();

    $scope.allStocks = allStocks;
    $scope.currentStocks = {};

    $scope.updateStocks = function() {
      var dateKey = dateService.stringify($scope.currentDate);
      angular.copy(allStocks[dateKey], $scope.currentStocks)
    }

    $scope.updateStocks();

  }

]);
