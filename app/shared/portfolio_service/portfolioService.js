
FG.factory('portfolioService',
  ['stockService', 'dateService',

    function(stockService, dateService) {

      var startingFunds = 5000;
      var funds = 5000;
      var stocks = {};

      var getStartingFunds = function() {
        return startingFunds;
      };

      var getFunds = function() {
        return funds;
      };

      var getStocks = function() {
        return stocks;
      };

      var getStocksWithSummary = function() {
        var holding;
        for (var stock in stocks) {
          holding = stocks[stock]
          _summarizeHolding(holding);
        }
        return stocks;
      };

      var _summarizeHolding = function(holding) {
        var summary = holding.summary = {};
        var date = dateService.stringify(dateService.getCurrent());
        var stock = holding.stock;
        var price = stockService.currentPrice(stock);
        summary.value = holding.quantity * price;
        summary.profit = summary.value - holding.cost;
        summary.performance = stockService.performance(stock);
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
        _updateCostPer(holding, transaction);
        funds -= transaction.total;
      };

      var _newHoldingFor = function(stock) {
        var holding = stocks[stock] = {};
        holding.stock = stock;
        holding.quantity = 0;
        holding.cost = 0;
        holding.quantitiesByPrice = {};
        return holding;
      };

      var _updateCostPer = function(holding, transaction) {
        var price = transaction.total / transaction.quantity;
        var quantitiesByPrice = holding.quantitiesByPrice;
        if (quantitiesByPrice[price]) {
          quantitiesByPrice[price] += transaction.quantity;
        } else {
          quantitiesByPrice[price] = transaction.quantity;
        }
      };

      var _processStockSale = function(transaction) {
        var holding = stocks[transaction.stock];
        funds += transaction.total;
        holding.quantity -= transaction.quantity;
        _updateHoldingCost(holding, transaction.quantity);
        if (holding.quantity === 0) delete stocks[transaction.stock];
      };

      var _updateHoldingCost = function(holding, stocksSold) {
        var stocksRemoved = 0;
        var costDifference = 0;
        var quantitiesByPrice = holding.quantitiesByPrice;
        var quantity;
        for (var price in quantitiesByPrice) {
          console.log(price);
          quantity = quantitiesByPrice[price];
          while (quantity >= 0) {
            if (quantity === 0) {
              delete quantitiesByPrice[price];
              break;
            }
            quantitiesByPrice[price]--;
            costDifference += +price;
            stocksRemoved++;
            if (stocksRemoved === stocksSold) break;
          }
          if (stocksRemoved === stocksSold) break;
        }
        holding.cost -= costDifference;
      };

      return {
        getFunds: getFunds,
        getStartingFunds: getStartingFunds,
        getStockQuantity: getStockQuantity,
        getStocks: getStocks,
        getStocksWithSummary: getStocksWithSummary,
        processTransaction: processTransaction
      };

    }

]);
