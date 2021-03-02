/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable operator-linebreak */

const testingText =
	'Lorem ipsum dolor sit amet, AAPL consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim $TSLA veniam, quis nostrud exercitation $BES ullamco laboris nisi ut aliquip ex ea commodo RTAGA consequat. Duis aute irure dolor in reprehenderit in T voluptate CM velit esse cillum dolore eu fugiat nulla pariatur. $TSLA Excepteur sint occaecat cupidatat TSLA non proident, $BB sunt in culpa qui officia deserunt mollit anim MSFT id est laborum AAPL.';

// tickers that SHOULD be found:
// AAPL, $BES, T, CM, $TSLA, $BB, MSFT

// tickers that should NOT be found:
// RTAGA

// stock ticker regex:
// start with $ symbol (optional)
// followed by 1-4 letters, all uppercase
// regex will return valid tickers WITHOUT $ sign
// (finds them if included, but returns without)
const stockTickerRegex = /\b\$?[A-Z]{1,4}\b/g;

// get an array of all found tickers (includes duplicates)
const tickers = testingText.match(stockTickerRegex);

// sort tickers alphabetically
tickers.sort();
// console.log('TICKERS: ', tickers);

// loop through matches
// if element at current ticker is not found in array of objects, add it
// other wise, go to it, and increase 'timesCounted'
const countedTickers = [];
// object structure {stock: 'TICKER_NAME_HERE', timesCounted: 1'}

// loop through
tickers.forEach((ticker) => {
	// if not found...
	if (!countedTickers.filter((match) => match.stock === ticker).length) {
		// add it to array
		countedTickers.push({ stock: ticker, timesCounted: 1 });
	} else {
		// if duplicate, just increase timesCounted by 1
		countedTickers.find((dupe) => dupe.stock === ticker).timesCounted += 1;
	}
});

console.log(countedTickers);

// filter out tickers mentioned X # of times
// const mostMentionedTickers = countedTickers.filter((x) => x.timesCounted > 1);
// console.log(mostMentionedTickers);
