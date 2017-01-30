
FG.factory('portfolioService',

  function() {

    var funds = 1000;
    var stocks = {};

    var getFunds = function() {
      return funds;
    };

    var getStockQuantity = function(stockSymbol) {
      var holding = stocks[stockSymbol];
      return holding ? holding.quantity : 0;
    };

    var processTransaction = function(transaction) {
      if (transaction.type === 'buy') {
        _processStockPurchase(transaction);
      } else {
        _processStockSale(transaction);
      }
    };

    var _processStockPurchase = function(transaction) {
      var holding = stocks[transaction.stock];
      if (!holding) holding = _newHoldingFor(transaction.stock);
      holding.quantity += transaction.quantity;
      holding.cost += transaction.total;
      funds -= transaction.total;
    };

    var _newHoldingFor = function(stock) {
      var holding = stocks[stock] = {};
      holding.stock = stock;
      holding.quantity = 0;
      holding.cost = 0;
      return holding;
    };

    var _processStockSale = function(transaction) {
      var holding = stocks[transaction.stock];
      funds += transaction.total;
      holding.quantity -= transaction.quantity;
      if (holding.quantity === 0) delete stocks[transaction.stock];
    };

    return {
      getFunds: getFunds,
      getStockQuantity: getStockQuantity,
      processTransaction: processTransaction
    };

  }

);
