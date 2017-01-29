
FG.controller('MainCtrl',
  ['$scope', 'stocks',

  function($scope, stocks) {

    $scope.allStocks = stocks;

  }

]);
