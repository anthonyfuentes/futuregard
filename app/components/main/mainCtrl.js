
FG.controller('MainCtrl',
  ['$scope', 'allStocks', 'dateService', 'settingService', 'portfolioService',

    function($scope, allStocks, dateService, settingService, portfolioService) {

      $scope.allStocks = allStocks;
      $scope.currentStocks = [];
      $scope.settings = settingService.getSettings();
      $scope.stats = {};

      $scope.updateData = function() {
        $scope.updateStocks();
        $scope.updateDate();
        $scope.updateStats();
      };

      $scope.updateStocks = function() {
        var currentDate = dateService.getCurrent();
        var dateKey = dateService.stringify(currentDate);
        var stocksForDate = Object.values(allStocks[dateKey]);
        angular.copy(stocksForDate, $scope.currentStocks);
      };

      $scope.updateDate = function() {
        $scope.atEnd = dateService.atEnd();
        $scope.atStart = dateService.atStart();
      };

      $scope.updateStats = function() {
        $scope.stats.currentCash = portfolioService.getFunds();
        $scope.stats.daysRemaining = dateService.getDaysRemaining();
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

      $scope.$on('trade', function() {
        $scope.updateStats();
      });

    }

]);
