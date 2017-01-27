FG.factory('stockService',
  ['$http',

    function($http) {

      var stocks = {};

      var all = function all() {
        return $http({
          method: 'GET',
          url: '/assets/data/stocks.json'
        })
        .then(function(response){
          var data = response.data.query.results.quote;
          _scrub(data);
          console.log(stocks);
          return stocks;
        });
      };

      var _scrub = function _scrub(data) {
        for (var i = 0; i < data.length; i++) {
          var stock = data[i];
          if (!stocks[stock['Date']]) {
            stocks[stock['Date']] = {};
          }
          stocks[stock['Date']][stock['Symbol']] = parseFloat(stock['Close']);
        }
      };

      return {
        all: all
      };
    }

]);
