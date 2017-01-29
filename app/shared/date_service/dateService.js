
FG.factory('dateService', function(){

  var start = new Date("2015-12-31");
  var current = new Date("2015-12-31");
  var end = new Date("2016-03-31");

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
    return date.toISOString().slice(0, 10);
  };

  return {
    getStart: getStart,
    getCurrent: getCurrent,
    getEnd: getEnd,
    stringify: stringify
  };

});
