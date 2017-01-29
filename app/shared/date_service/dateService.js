
FG.factory('dateService',
  ['$rootScope',

    function($rootScope){

      var start = new Date("2015/12/31");
      var current = new Date("2015/12/31");
      var end = new Date("2016/03/31");

      var getStart = function() {
        return start;
      };

      var getCurrent = function() {
        return current;
      };

      var getEnd = function() {
        return end;
      };

      var stringify = function(date) {
        var string = date.toISOString().slice(0, 10).replace(/-/g, '/');
        return string;
      };

      var setDate = function(date) {
        current = date;
        $rootScope.$broadcast('dateChange', current);
      };

      var timeTravel = function(date, days) {
        var newDay = new Date(date.getTime());
        newDay.setDate(date.getDate() + days);
        return stringify(newDay);
      };

      return {
        getStart: getStart,
        getCurrent: getCurrent,
        getEnd: getEnd,
        stringify: stringify,
        setDate: setDate,
        timeTravel: timeTravel
      };

    }

]);

