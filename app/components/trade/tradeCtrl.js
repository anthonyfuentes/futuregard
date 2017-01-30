
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

      $scope.funds = portfolioService.getFunds();

      var _updateData = function() {
        _updateDate();
        _updateStocks();
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
        $scope.transaction.date = $scope.date;
        $scope.transaction.stockPrice = $scope.allStocks[$scope.symbol].price;
        $scope.transaction.total = $scope.transaction.stockPrice * $scope.transaction.quantity;
        $scope.transaction.valid = transactionService.isValid($scope.transaction);
      };

      $scope.$watch('transaction.stock', function() {
        _updateTransaction();
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

    }

]);
