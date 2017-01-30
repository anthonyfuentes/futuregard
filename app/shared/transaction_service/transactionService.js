
FG.factory('transactionService',
  ['portfolioService',

    function(portfolioService) {

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

      return {
        isValid: isValid
      };

    }

]);
