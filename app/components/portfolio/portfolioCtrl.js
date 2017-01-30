
FG.controller('PortfolioCtrl',
  ['$scope', 'portfolioService',

    function($scope, portfolioService){
      $scope.stocks = {};

      angular.copy(portfolioService.getStocksWithSummary(), $scope.stocks);

      $scope.$on('dateChange', function() {
        angular.copy(portfolioService.getStocksWithSummary(), $scope.stocks);
      });
    }

]);
