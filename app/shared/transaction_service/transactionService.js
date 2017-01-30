
FG.factory('transactionService',
  ['portfolioService', 'dateService',

    function(portfolioService, dateService) {

      var _id = 0;
      var transactions = {};

      var getTransactions = function() {
        return transactions;
      };

      var getLifetimeProfit = function() {
        if (_id === 0) return 0;
        var profit = 0;
        var transaction;
        var multiplier;
        for (var id in transactions) {
          transaction = transactions[id];
          multiplier = transaction.type === 'buy' ? -1 : 1;
          profit += transaction.total * multiplier;
        };
        return profit;
      };

      var processTransaction = function(transaction) {
        var transactionRecord = {};
        transactionRecord.id = _nextId(true);
        transactionRecord.stock = transaction.stock;
        transactionRecord.type = transaction.type;
        transactionRecord.quantity = transaction.quantity;
        transactionRecord.date = dateService.stringify(transaction.date);
        transactionRecord.stockPrice = transaction.stockPrice;
        transactionRecord.total = transaction.total;
        transactions[transactionRecord.id] = transactionRecord;
      };

      var isValid = function(transaction) {
        if (transaction.type === 'buy') {
          return _isValidBuy(transaction);
        } else {
          return _isValidSell(transaction);
        }
      };

      var _isValidBuy = function(transaction) {
        var availableFunds = portfolioService.getFunds();
        return availableFunds >= transaction.total;
      };

      var _isValidSell = function(transaction) {
        var stock = transaction.stock;
        var availableQuantity = portfolioService.getStockQuantity(stock);
        return availableQuantity >= transaction.quantity;
      };

      var _nextId = function(increment) {
        return increment ? _id++ : _id + 1;
      };

      return {
        getTransactions: getTransactions,
        getLifetimeProfit: getLifetimeProfit,
        processTransaction: processTransaction,
        isValid: isValid
      };

    }

]);
