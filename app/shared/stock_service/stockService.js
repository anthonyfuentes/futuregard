
FG.factory('stockService',
  ['dateService', 'apiService',

    function(dateService, apiService) {

      var stocks = {};

      var all = function all() {
        if (angular.equals(stocks, {})) {
          return _makeApiCall();
        } else {
          return _resolveStocks();
        }
      };

      var _makeApiCall = function () {
        return  apiService.getApiStockData()
          .then(_successfulGet, _failedGet);
      };

      var _successfulGet = function(response) {
        var data = response.data.query.results.quote;
        _scrub(data);
        return stocks;
      };

      var _failedGet = function() {
        return apiService.getSavedStockData()
          .then(_successfulGet);
      };

      var _resolveStocks = function() {
        return $q(function(resolve, reject) {
          resolve(stocks);
        });
      };

      var stocksForDate = function(dateKey) {
        return stocks[dateKey];
      };

      var currentPrice = function(stock) {
        var dateKey = dateService.stringify(dateService.getCurrent());
        return _priceFor(dateKey, stock);
      };

      var _priceFor = function(dateKey, stock) {
        var stockData = _getStockByDateSymbol(dateKey, stock);
        if (stockData) return stockData.price;
      };

      var performance = function(stock, date) {
        date = date || dateService.stringify(dateService.getCurrent());
        var performance = {
          oneDay: 'N/A',
          week: 'N/A',
          month: 'N/A'
        };
        var stockData = _getStockByDateSymbol(date, stock);
        if (stockData) {
          performance.oneDay = stockData.oneDay;
          performance.week = stockData.week;
          performance.month = stockData.month;
        }
        return performance;
      };

      var getDefaultSymbol = function() {
        return 'RAD';
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
          stock.oneDay = _calculatePriceDiff(stock, date, -1, allStocks);
          stock.week = _calculatePriceDiff(stock, date, -7, allStocks);
          stock.month = _calculatePriceDiff(stock, date, -30, allStocks);
        }
      };

      var _calculatePriceDiff = function(stock, date, dateDelta, allStocks) {
        var date = new Date(date);
        var otherDate = dateService.timeTravel(date, dateDelta);
        var otherStock = _getStockByDateSymbol(otherDate, stock.symbol);
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
        all: all,
        currentPrice: currentPrice,
        getDefaultSymbol: getDefaultSymbol,
        performance: performance,
        stocksForDate: stocksForDate
      };

    }

  ]);

