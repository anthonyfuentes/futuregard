
FG.controller('TransactionCtrl',
  ['$scope', 'transactionService',

    function($scope, transactionService) {

      var allTransactions = (function() {
        var aT = Object.values(transactionService.getTransactions(true));
        aT.sort(function(a, b) {
          return (a.id - b.id) * -1;
        });
        return aT;
      }())

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
