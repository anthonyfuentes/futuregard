
FG.factory('settingService',
  ['$rootScope',

    function($rootScope) {

      var settings = {
        timeTravel: false
      };

      var getSettings = function() {
        return settings;
      };

      var setTimeTravel = function(timeTravel) {
        settings.timeTravel = timeTravel;
        _broadcastUpdate();
      };

      return {
        getSettings: getSettings,
        setTimeTravel: setTimeTravel
      };
    }

]);
