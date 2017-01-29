
FG.controller('DateSelectorCtrl',
  ['$scope', 'dateService',

    function($scope, dateService) {

      $scope.startDate = dateService.getStart();
      $scope.currentDate = dateService.getCurrent();
      $scope.endDate = dateService.getEnd();

    }

]);
