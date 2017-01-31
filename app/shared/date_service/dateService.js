
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

      var getDaysRemaining = function() {
        var millisecondsToEnd = end - current;
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        return millisecondsToEnd / millisecondsPerDay;
      };

      var previousDay = function() {
        if (atStart()) return;
        var previousDay = timeTravel(current, -1);
        setDate(new Date(previousDay));
      };

      var nextDay = function() {
        if (atEnd()) return;
        var nextDay = timeTravel(current, 1);
        setDate(new Date(nextDay));
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

      var toDate = function(dateString) {
        var formattedString = dateString.replace(/-/g, '/');
        return new Date(formattedString);
      };

      var atStart = function() {
        return current <= start;
      };

      var atEnd = function() {
        return current >= end;
      };

      return {
        atStart: atStart,
        atEnd: atEnd,
        getStart: getStart,
        getCurrent: getCurrent,
        getEnd: getEnd,
        getDaysRemaining: getDaysRemaining,
        previousDay: previousDay,
        nextDay: nextDay,
        stringify: stringify,
        setDate: setDate,
        timeTravel: timeTravel,
        toDate: toDate
      };

    }

]);

