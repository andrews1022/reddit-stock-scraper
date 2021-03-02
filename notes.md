# Reddit Stock Scraper

- Store list of finance/stock subreddits in an array
- For each subreddit

  - Go to that subreddit, and go to /hot
  - Scan it and count number of times each ticker is mentioned (post title, post description, comments in each post)
  - Keep track in array of objects like this:
    [
    { ticker: GME, numberOfTimesMentioned: 20},
    { ticker: APL, numberOfTimesMentioned: 15},
    { ticker: TSLA, numberOfTimesMentioned: 10},
    ]
  - grab top 5, or 10 (decide amount later)
  - save in another object like so
    {
    subreddit1: [ ticker1, ticker2, ticker3, ticker4, ticker5 ],
    subreddit2: [ ticker1, ticker2, ticker3, ticker4, ticker5 ],
    subreddit3: [ ticker1, ticker2, ticker3, ticker4, ticker5 ],
    }
  - display data in console

- do own DD after that!
