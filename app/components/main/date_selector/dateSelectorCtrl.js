
FG.controller('DateSelectorCtrl',
  ['$scope', 'dateService', 'settingService',

    function($scope, dateService, settingService) {

      $scope.startDate = dateService.getStart();
      $scope.currentDate = dateService.getCurrent();
      $scope.endDate = dateService.getEnd();
      $scope.settings = settingService.getSettings();

      $scope.dateOptions = {
        minDate: $scope.startDate,
        maxDate: $scope.endDate,
        initDate: $scope.currentDate
      };

      $scope.toggleOpened = function() {
        $scope.opened = !$scope.opened;
      };

      $scope.changeDate = function(date) {
        var date = new Date(date);
        dateService.setDate(date);
      };

      $scope.$on('dateChange', function() {
        $scope.currentDate = dateService.getCurrent();
      });

    }

]);
