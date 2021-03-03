# Reddit Stock Scraper

This is a simple Node based Reddit scraper for finding which stocks are getting the most mentions. As of Mar 2, 2021, this project uses only the following packages:

- Cheerio (for the scraping)
- ESLint (to enforce code quality)
- ESM (to allow the use of import instead of require)
- Node-Fetch (for fetching the data)

## Usage

`npm install`

In app.js, change the subreddit name inside the `scrapeReddit();` function call at the bottom to your liking

Run `npm run scrape` to get your results!
