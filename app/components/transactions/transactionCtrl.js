
FG.controller('TransactionCtrl',
  ['$scope', 'transactionService',

    function($scope, transactionService) {

      var transactionHistory = transactionService.getTransactions();

      $scope.transactions = Object.values(transactionHistory);

    }

]);
