
FG.factory('portfolioService',

  function() {

    var funds = 1000;

    var getFunds = function() {
      return funds;
    };

    return {
      getFunds: getFunds
    };

  }

);
