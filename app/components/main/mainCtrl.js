
FG.controller('MainCtrl',
  ['$scope', 'allStocks', 'dateService',

  function($scope, allStocks, dateService) {

    $scope.allStocks = allStocks;
    $scope.currentStocks = {};

    $scope.updateStocks = function() {
      var currentDate = dateService.getCurrent();
      var dateKey = dateService.stringify(currentDate);
      angular.copy(allStocks[dateKey], $scope.currentStocks)
    };

    $scope.$on('dateChange', function(e, date) {
      $scope.updateStocks();
    });

    $scope.updateStocks();

  }

]);
