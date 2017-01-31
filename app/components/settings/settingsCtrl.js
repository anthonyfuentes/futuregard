
FG.controller('SettingsCtrl',
  ['$scope', 'settingService',

    function($scope, settingService) {

      $scope.settings = settingService.getSettings();

      $scope.timeTravel = $scope.settings.timeTravel;

      $scope.updateTimeTravel = function() {
        settingService.setTimeTravel($scope.timeTravel);
      };

    }

]);
