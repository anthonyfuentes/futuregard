
FG.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('main', {
      url: '',
      views: {
        '@': {
          templateUrl: 'app/components/main/main.html',
          controller: 'MainCtrl'
        },
        'dateSelector@main': {
          templateUrl: 'app/components/main/date_selector/dateSelector.html',
          controller: 'DateSelectorCtrl'
        }
      },
      resolve: {
        allStocks: function(stockService) {
          return stockService.all();
        }
      }
    })
    .state('main.portfolio', {
      url: '/portfolio',
      views: {
        'content@main': {
          templateUrl: 'app/components/portfolio/portfolio.html',
          controller: 'PortfolioCtrl'
        }
      },
      controller: 'MainCtrl'
    })
    .state('main.transactions', {
      url: '/transactions',
      views: {
        'content@main': {
          templateUrl: 'app/components/transactions/transactions.html'
        }
      }
    })
    .state('main.trade', {
      url: '/trade',
      params: { symbol: '' },
      views: {
        'content@main': {
          templateUrl: 'app/components/trade/trade.html',
          controller: 'TradeCtrl'
        }
      }
    });

});

