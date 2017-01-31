
FG.controller('MainCtrl',
  ['$scope', 'allStocks', 'dateService',

  function($scope, allStocks, dateService) {

    $scope.allStocks = allStocks;
    $scope.currentStocks = {};

    $scope.updateData = function() {
      $scope.updateStocks();
      $scope.updateDate();
    };

    $scope.updateStocks = function() {
      var currentDate = dateService.getCurrent();
      var dateKey = dateService.stringify(currentDate);
      angular.copy(allStocks[dateKey], $scope.currentStocks)
    };

    $scope.updateDate = function() {
      $scope.atEnd = dateService.atEnd();
    };

    $scope.updateData();

    $scope.nextDay = function() {
      dateService.nextDay();
    };

    $scope.$on('dateChange', function() {
      $scope.updateData();
    });

  }

]);
