
FG.controller('TradeCtrl',
  ['$scope',
    '$stateParams',
    'dateService',
    'stockService',
    'transactionService',
    'portfolioService',

    function($scope,
      $stateParams,
      dateService,
      stockService,
      transactionService,
      portfolioService) {

        $scope.defaultSymbol = 'AAPL';

        $scope.symbol = $stateParams.symbol || $scope.defaultSymbol;

        $scope.stocks = portfolioService.getStocks();

        var _updateData = function() {
          _updateDate();
          _updateStocks();
          $scope.funds = portfolioService.getFunds();
        };

        var _updateDate = function() {
          $scope.date = dateService.getCurrent();
          $scope.dateKey = dateService.stringify($scope.date);
        };

        var _updateStocks = function() {
          $scope.allStocks = stockService.stocksForDate($scope.dateKey);
          $scope.symbols = Object.keys($scope.allStocks);
        };

        _updateData();

        $scope.transaction = {
          stock: $scope.symbol,
          type: 'buy',
          quantity: 1,
          date: $scope.date,
          stockPrice: $scope.allStocks[$scope.symbol].price,
          total: 0,
          valid: true
        };

        var _updateTransaction = function(){
          var transaction = $scope.transaction;
          transaction.date = $scope.date;
          transaction.stockPrice = $scope.allStocks[transaction.stock].price;
          transaction.total = transaction.stockPrice * transaction.quantity;
          transaction.valid = transactionService.isValid($scope.transaction);
        };

        $scope.$watch('transaction.stock', function() {
          _updateTransaction();
          $scope.transaction.quantity = 1;
        });

        $scope.$watch('transaction.type', function() {
          _updateTransaction();
        });

        $scope.$watch('transaction.quantity', function() {
          _updateTransaction();
        });

        $scope.$on('dateChange', function(e, date) {
          _updateData();
          _updateTransaction();
        });

        $scope.processTransaction = function() {
          if (!$scope.transaction.valid) return;
          transactionService.processTransaction($scope.transaction);
          portfolioService.processTransaction($scope.transaction);
          _updateData();
          _updateTransaction();
        };

      }

]);
