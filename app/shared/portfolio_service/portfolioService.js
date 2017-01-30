
FG.factory('portfolioService',

  function() {

    var funds = 1000;
    var stocks = {};

    var getFunds = function() {
      return funds;
    };

    var getStockQuantity = function(stockSymbol) {

    };

    var processTransaction = function(transaction) {
      if (transaction.type === 'buy') {
        _processStockPurchase(transaction);
      } else {
        // TODO
      }
    };

    var _processStockPurchase = function(transaction) {
      var holdings = stocks[transaction.stock];
      if (!holdings) holdings = _newHoldingFor(transaction.stock);
      holdings.quantity += transaction.quantity;
      holdings.cost += transaction.total;
      funds -= transaction.total;
    };

    var _newHoldingFor = function(stock) {
      var holdings = stocks[stock] = {};
      holdings.stock = stock;
      holdings.quantity = 0;
      holdings.cost = 0;
      return holdings;
    };

    return {
      getFunds: getFunds,
      getStockQuantity: getStockQuantity,
      processTransaction: processTransaction
    };

  }

);
