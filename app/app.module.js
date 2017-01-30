
var FG = angular.module('FG', ['ui.router', 'ui.bootstrap']);

FG.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
