
FG.controller('PortfolioCtrl',
  ['$scope', 'portfolioService', 'transactionService',

    function($scope, portfolioService, transactionService){

      $scope.stocks = {};
      angular.copy(portfolioService.getStocksWithSummary(), $scope.stocks);

      $scope.portfolio = {};

      $scope.startingFunds = portfolioService.getStartingFunds();
      $scope.funds = portfolioService.getFunds()

      var _updatePortfolio = function(portfolio, stocks) {
        var holding;
        _resetPortfolio(portfolio);
        for (var stock in stocks) {
          holding = stocks[stock];
          _incorporateHoldingData(portfolio, holding);
        }
      };

      var _resetPortfolio = function(portfolio) {
        portfolio.costBasis = 0;
        portfolio.value = 0;
        portfolio.profit = transactionService.getLifetimeProfit();
        portfolio.oneDay = 0;
        portfolio.week = 0;
        portfolio.month = 0;
      };

      var _incorporateHoldingData = function(portfolio, holding) {
        portfolio.costBasis += holding.cost;
        portfolio.value += holding.summary.value;
        portfolio.profit += holding.summary.value;
        portfolio.oneDay += holding.summary.performance.oneDay;
        portfolio.week += holding.summary.performance.week;
        portfolio.month += holding.summary.performance.month;
      };

      _updatePortfolio($scope.portfolio, $scope.stocks);

      $scope.$on('dateChange', function() {
        angular.copy(portfolioService.getStocksWithSummary(), $scope.stocks);
        _updatePortfolio($scope.portfolio, $scope.stocks);
      });
    }

  ]);
