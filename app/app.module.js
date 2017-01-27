states
  default -> ''
  portfolio -> '/portfolio'
    content ui view
    portfolio template
  trade -> '/trade'
    content ui view
    trade form template
  transactions -> '/transactions'
    content ui view
    transactions template


states
  'parent' state ''
    parent.portfolio '/portfolio'
      - target ui-view='content'
      - templateUrl
    parent.trade '/trade'
      - target ui-view='content'
      - templateUrl
    parent.transactions '/transactions'
      - target ui-view='content'
      - templateUrl
