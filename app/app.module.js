var FG = angular.module('FG', ['ui.router']);

FG.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
