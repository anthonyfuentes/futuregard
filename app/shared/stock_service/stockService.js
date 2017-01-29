
FG.factory('stockService',
  ['$http', 'dateService',

    function($http, dateService) {

      var stocks = {};

      var all = function all() {
        return $http({
          method: 'GET',
          url: '/assets/data/stocks.json'
        })
        .then(function(response){
          var data = response.data.query.results.quote;
          _scrub(data);
          return stocks;
        });
      };

      var _scrub = function _scrub(data) {
        _populateDatesWithPrices(data);
        _calculateAllDeltas(stocks);
      };

      var _populateDatesWithPrices = function _populateDatesWithPrices(data) {
        var stock, stockData, date, stocksForDate;
        for (var i = 0; i < data.length; i++) {
          stock = {};
          stockData = data[i];
          date = stockData['Date'].replace(/-/g, '/');
          stocksForDate = stocks[date];
          if (!stocksForDate) stocksForDate = stocks[date] = {};
          stock.price = parseFloat(stockData['Close']);
          stock.symbol = stockData['Symbol'];
          stocksForDate[stockData['Symbol']] = stock;
        }
      };

      var _calculateAllDeltas = function(stocks) {
        var dateStocks;
        for (var date in stocks) {
          dateStocks = stocks[date];
          _calculateStockDeltas(date, dateStocks, stocks);
        }
      };

      var _calculateStockDeltas = function(date, dateStocks, allStocks) {
        var stock;
        for (var symbol in dateStocks) {
          stock = dateStocks[symbol];
          stock.oneDay = _calculatePriceDiff(stock, date, -2, allStocks);
          stock.week = _calculatePriceDiff(stock, date, -8, allStocks);
          stock.month = _calculatePriceDiff(stock, date, -31, allStocks);
        }
      };

      var _calculatePriceDiff = function(stock, date, dateDelta, allStocks) {
        var date = new Date(date);
        var otherDate = dateService.timeTravel(date, dateDelta);
        var otherStock = _getStockDateSymbol(otherDate, stock.symbol);
        var otherStockPrice = otherStock ? otherStock.price : 0;
        return stock.price - otherStockPrice;
      };

      // TODO verify
      var _getStockDateSymbol = function(date, symbol) {
        var dateStocks = stocks[date];
        if (dateStocks) return dateStocks[symbol];
      };

      return {
        all: all
      };

    }

  ]);

