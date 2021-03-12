# Update Log

## Update #3 - March 11, 2021

- Just added a few more invalid tickers
- Tried a different approach for fetching/parsing text from each post, but found there was little to no difference in performance, and less results were retrieved

## Update #2 - March 3, 2021

- Created separate api file + folder to house api endpoint
- Created functions folder to house certain functions in their own file
- Restructured main scrapeReddit function in app.js
- Created list of invalid tickers to help filter out unwanted results
- Added user input to get dynamic results
- Adjusted stock ticker regex
- Updated map/filter on tickers array
- Separated error message into own file

## Update #1 - March 2, 2021

- Basic scraping
- No user input
- Must modify app.js
- Stock ticker MUST use $ symbol
