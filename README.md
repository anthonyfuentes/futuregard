
# Futuregard

A gamified stock portfolio implemented as an Angular single-page app.

Step into the shoes of a stock broker and see if you can beat the market.

![screenshot of Futuregard](https://github.com/anthonyfuentes/futuregard/blob/master/assets/img/futuregard.png)

## Using the Deployed Application
1. Visit http://anthonyfuentes.us/futuregard/
2. Attempt to trade your way to the top

### UI Navigation
* Portfolio
  - See a summary of your portfolio
* Trade Action
  - Buy low
  - Sell high
* Trade History
  - Track your trading
* Settings
  - Travel through time or don't

## Technical Higlights
1. UI-Router multi-view states
2. UI-Bootstrap components including pagination
3. Actual stock data retrieved via AJAX from Yahoo historical finance API
4. NoSQL data modeling and thorough data scrubbing
5. Time travel

## Running Futuregard locally
1. Fork this repo
2. Clone the fork to your machine
3. Serve the index page locally
  - `ruby -run -e httpd . -p 3001`
