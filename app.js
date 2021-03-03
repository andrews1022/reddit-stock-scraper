import cheerio from 'cheerio';
import fetch from 'node-fetch';

const scrapeReddit = async (subreddit) => {
	const BASE_URL = 'https://old.reddit.com';
	let htmlToParse = '';

	try {
		const response = await fetch(`${BASE_URL}/r/${subreddit}/`);
		const html = await response.text();

		const $ = cheerio.load(html);

		// grab all hrefs
		const hrefs = [];
		$('.thing .entry .top-matter .title a.title').each((i, el) => {
			hrefs[i] = $(el).attr('href');
		});

		// filter the hrefs
		// only get hrefs that include the subreddit name
		const filteredHrefs = hrefs.filter((href) => href.includes(`/r/${subreddit}`));

		const getPostHtml = async () => {
			for (const href of filteredHrefs) {
				try {
					const postResponse = await fetch(`${BASE_URL}${href}`);
					const postHTML = await postResponse.text();
					htmlToParse += postHTML;

					// ticker regex/pattern
					const regex = /\$\b[A-Z]{1,4}\b/g;

					// extract all tickers matching the regex
					const tickers = htmlToParse.match(regex).sort();

					const countedTickers = [];
					// object structure {stock: 'TICKER_NAME_HERE', timesCounted: 1'}

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

					// sort tickers by timesCounted (highest to lowest)
					const sortedTickers = countedTickers.sort((tickerA, tickerB) =>
						tickerA.timesCounted < tickerB.timesCounted ? 1 : -1
					);

					const topTenTickers = sortedTickers.splice(0, 15);
					console.log(`Top 15 Mentioned Tickers from /r/${subreddit}: `, topTenTickers);
				} catch (error) {
					console.log(error);
				}
			}
		};

		// call the fn
		getPostHtml();
	} catch (error) {
		console.log(error);
	}
};

/*
	--- stock/investing/trading subreddits ---
	stocks (US)
	CanadianInvestor (CA)
	investing (US)
	wallstreetbets (US)

	pennystocks (US)
	Canadapennystocks (CAN)
*/
scrapeReddit('CanadianInvestor');
