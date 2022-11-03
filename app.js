// packages
import cheerio from "cheerio";
import fetch from "node-fetch";
import prompt from "prompt";

// api
import BASE_URL from "./api/api";

// data
import ERROR_MESSAGE from "./data/errorMessage";
import invalidTickers from "./data/invalidTickers";

// functions
import getPostHtml from "./functions/getPostHtml";

const scrapeReddit = async () => {
  // start user prompt/input
  prompt.start();

  // get userInput
  const { subreddit, numberOfResults } = await prompt.get(["subreddit", "numberOfResults"]);

  try {
    // fetch subreddit page html
    const response = await fetch(`${BASE_URL}/r/${subreddit}/`);
    const html = await response.text();

    // initialize cheerio
    const $ = cheerio.load(html);

    // grab all hrefs
    const hrefs = [];
    $(".thing .entry .top-matter .title a.title").each((i, el) => {
      hrefs[i] = $(el).attr("href");
    });

    // filter the hrefs - only get hrefs that include the subreddit name (avoids links for ads)
    const filteredHrefs = hrefs.filter((href) => href.includes(`/r/${subreddit}`));

    // call the getPostHtml fn
    const parsedHtml = await getPostHtml(filteredHrefs);

    // ticker regex
    const regex = /\$?\b[A-Z]{1,4}\b/g;

    // extract all tickers matching the regex
    // this is including duplicates, as we want to count them later
    const tickers = parsedHtml
      .match(regex)
      .sort()
      .map((ticker) => ticker.replace("$", ""))
      .filter((ticker) => invalidTickers.indexOf(ticker) < 0);

    // object structure {stock: "TICKER_NAME_HERE", timesCounted: 1 }
    const countedTickers = [];

    tickers.forEach((ticker) => {
      // if not found...
      if (!countedTickers.filter((match) => match.stock === ticker).length) {
        // add it to array
        countedTickers.push({ stock: ticker, timesCounted: 1 });
      } else {
        // if already in the array, just increase timesCounted by 1
        countedTickers.find((dupe) => dupe.stock === ticker).timesCounted += 1;
      }
    });

    // sort tickers by timesCounted (highest to lowest)
    const sortedTickers = countedTickers.sort((tickerA, tickerB) =>
      tickerA.timesCounted < tickerB.timesCounted ? 1 : -1
    );

    // grab the top tickers, based on user input
    const topTickers = sortedTickers.splice(0, +numberOfResults);

    // display final output to the user
    console.log(`Top ${+numberOfResults} Mentioned Tickers from /r/${subreddit}: `, topTickers);
  } catch (error) {
    if (error) console.log(ERROR_MESSAGE);
  }
};

scrapeReddit();

/*
	--- stock/investing/trading subreddits ---
	CanadianInvestor (CA)
	investing (US)
	stocks (US)
	wallstreetbets (US)

	Canadapennystocks (CA)
	pennystocks (US)
*/
