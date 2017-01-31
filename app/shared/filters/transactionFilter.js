
FG.filter('transactionFilter', function() {

  return function(transactions, symbol) {
    if (!symbol || symbol.length === 0) return transactions;
    symbol = symbol.toLowerCase();
    return transactions.filter(function(transaction) {
      return transaction.stock.toLowerCase().startsWith(symbol);
    });
  };

})
