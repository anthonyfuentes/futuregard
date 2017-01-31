
FG.factory('settingService',
  [

    function() {

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
