FG.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('main', {
      url: '',
      views: {
        '@': {
          templateUrl: 'app/components/main/main.html'
        }
      }
    })
    .state('main.portfolio', {
      url: '/portfolio',
      views: {
        'content@main': {
          templateUrl: 'app/components/portfolio/portfolio.html'
        }
      }
    })
    .state('main.trade', {
      url: '/trade',
      views: {
        'content@main': {
          templateUrl: 'app/components/trade/trade.html'
        }
      }
    })
    .state('main.transactions', {
      url: '/transactions',
      views: {
        'content@main': {
          templateUrl: 'app/components/transactions/transactions.html'
        }
      }
    })

})
