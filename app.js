/* eslint-disable operator-linebreak */
/* eslint-disable no-tabs */

const testingText =
	'Lorem ipsum dolor sit amet, AAPL consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation $BES ullamco laboris nisi ut aliquip ex ea commodo RTAGA consequat. Duis aute irure dolor in reprehenderit in T voluptate CM velit esse cillum dolore eu fugiat nulla pariatur. $TSLA Excepteur sint occaecat cupidatat non proident, $BB sunt in culpa qui officia deserunt mollit anim MSFT id est laborum';

// tickers that SHOULD be found:
// AAPL, $BES, T, CM, $TSLA, $BB, MSFT

// tickers that should NOT be found:
// RTAGA

// stock ticker regex:
// start with $ symbol (optional)
// followed by 1-4 letters, all uppercase

const stockTickerRegex = /\$?\b[A-Z]{1,4}\b/g;

const matches = testingText.match(stockTickerRegex);

console.log('TICKERS FOUND: ', matches);
