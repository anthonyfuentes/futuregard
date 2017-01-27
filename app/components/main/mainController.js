FG.controller('MainCtrl', [
  '$scope', 'stocks',
  function($scope, stocks) {
    $scope.stocks = stocks;
  }
]);
