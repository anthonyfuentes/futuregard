
FG.factory('stockService',
  ['$http',

    function($http) {

      var stocks = {};

      function all() {
        return $http({
          method: 'GET',
          url: '/assets/data/stocks.json'
        })
        .then(function(response){
          angular.copy(response.data, stocks)
          console.log(stocks);
        });
      }

      all()
      return {
        all: all
      };
    }

]);
