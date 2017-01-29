
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
        _fillIn(data);
        _calculateAllDeltas();
      };

      var _populateDatesWithPrices = function _populateDatesWithPrices(data) {
        var stock, stockData, date, stocksForDate;
        for (var i = 0; i < data.length; i++) {
          stock = {};
          stockData = data[i];
          date = _formatDate(stockData['Date']);
          stocksForDate = stocks[date];
          if (!stocksForDate) stocksForDate = stocks[date] = {};
          stock.price = parseFloat(stockData['Close']);
          stock.symbol = stockData['Symbol'];
          stocksForDate[stockData['Symbol']] = stock;
        }
      };

      var _calculateAllDeltas = function() {
        var dateStocks, date;
        var startDate = dateService.getStart();
        for (var dateString in stocks) {
          dateStocks = stocks[dateString];
          date = new Date(dateString);
          if (date >= startDate) {
            _calculateStockDeltas(date, dateStocks, stocks);
          }
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
        var otherStock = _getStockByDateSymbol(otherDate, stock.symbol);
// TODO: DELETE
if (!otherStock) console.log(date, otherStock);
        var otherStockPrice = otherStock ? otherStock.price : 0;
        return stock.price - otherStockPrice;
      };

      var _getStockByDateSymbol = function(date, symbol) {
        var dateStocks = stocks[date];
        if (dateStocks) return dateStocks[symbol];
      };

      var _fillIn = function(stockData, symbols) {
        var lastDate = dateService.toDate(stockData[stockData.length - 1]['Date']);
        var lastDateString;
        symbols = symbols || ['AAPL', 'BAC', 'DB', 'F']
        for (var i = stockData.length - 2; i >= 0; i--) {
          date = dateService.timeTravel(lastDate, 1);
          stockDataForDate = stocks[date];
          if (!stockDataForDate) {
            lastDateString = dateService.stringify(lastDate);
            stocks[date] = angular.copy(stocks[lastDateString], {});
          }
          lastDate = dateService.toDate(date);
        }
      };

      var _formatDate = function(dateString) {
        return dateString.replace(/-/g, '/');
      };

      return {
        all: all
      };

    }

]);

