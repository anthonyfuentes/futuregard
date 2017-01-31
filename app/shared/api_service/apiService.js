
FG.factory('apiService',
  ['$http',

  function($http) {

    var STOCK_SYMBOLS = ['NFLX', 'TSLA', 'INTC', 'F', 'GOOGL', 'RAD', 'SBUX', 'QCOM'];
    var START_DATE = '2015-11-30';
    var END_DATE = '2016-03-31';

    var getApiStockData = function() {
      var url = _generateUrl(STOCK_SYMBOLS, START_DATE, END_DATE);
      return $http({
        method: 'GET',
        url: url
      })
    };

    var getSavedStockData = function() {
      return $http({
        method: 'GET',
        url: '/assets/data/stocks.json'
      });
    };

    var _generateUrl = function(symbols, startDate, endDate) {
      var symbolsString = "'" + symbols.join("','") + "'";

      return 'http://query.yahooapis.com/v1/public/yql?q=' +
        'select * from yahoo.finance.historicaldata ' +
        'where symbol in (' +
        symbolsString + ') ' +
        'and startDate = "' +
        startDate + '" ' +
        'and endDate = "' +
        endDate + '" ' +
        '&format=json'+
        '&diagnostics=true' +
        '&env=store://datatables.org/alltableswithkeys' +
        '&callback=';
    };

    return {
      getApiStockData: getApiStockData,
      getSavedStockData: getSavedStockData
    };

  }

  ]);
