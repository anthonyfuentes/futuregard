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
      template: 'This is the portfolio section'
    })
    .state('main.trade', {
      url: '/trade',
      template: 'This is the trade section'
    })
    .state('main.transactions', {
      url: '/transactions',
      template: 'This is the transactions section'
    })

})
