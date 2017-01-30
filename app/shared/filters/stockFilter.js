
FG.filter('stockFilter', function() {

  return function(stocks, symbol) {
    if (!symbol || symbol.length === 0) return stocks;
    var filteredStocks = {};
    symbol = symbol.toLowerCase();
    for (var sym in stocks) {
      if (sym.toLowerCase().startsWith(symbol)) {
        filteredStocks[sym] = stocks[sym];
      }
    }
    return filteredStocks;
  };

});
