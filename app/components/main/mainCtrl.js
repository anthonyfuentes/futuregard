
FG.controller('MainCtrl',
  ['$scope', 'allStocks', 'dateService', 'settingService',

  function($scope, allStocks, dateService, settingService) {

    $scope.allStocks = allStocks;
    $scope.currentStocks = {};
    $scope.settings = settingService.getSettings();

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
      $scope.atStart = dateService.atStart();
    };

    $scope.updateData();

    $scope.nextDay = function() {
      dateService.nextDay();
    };

    $scope.previousDay = function() {
      dateService.previousDay();
    };

    $scope.$on('dateChange', function() {
      $scope.updateData();
    });

  }

]);
