
FG.controller('DateSelectorCtrl',
  ['$scope', 'dateService',

    function($scope, dateService) {

      $scope.startDate = dateService.getStart();
      $scope.currentDate = dateService.getCurrent();
      $scope.endDate = dateService.getEnd();

      $scope.changeDate = function(date) {
        var date = new Date(date);
        dateService.setDate(date);
      };

      $scope.$on('dateChange', function() {
        $scope.currentDate = dateService.getCurrent();
      });

    }

]);
