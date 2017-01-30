
FG.controller('TransactionCtrl',
  ['$scope', 'transactionService',

    function($scope, transactionService) {

      var allTransactions = Object.values(transactionService.getTransactions());

      $scope.transactions = [];

      $scope.pagination = {
        currentPage: 1,
        perPage:  10,
        numPages: allTransactions.length / 10,
        maxSize: 5,
        totalItems: allTransactions.length
      };

      var _updatePagination = function() {
        var pagination = $scope.pagination;
        var startIndex = (pagination.currentPage - 1) * pagination.perPage;
        var endIndex = startIndex + pagination.perPage;
        angular.copy(allTransactions.slice(startIndex, endIndex), $scope.transactions);
      };

      $scope.$watch('pagination.currentPage', function() {
        _updatePagination();
      });

      _updatePagination();

    }

]);
