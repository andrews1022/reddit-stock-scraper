# Reddit Stock Scraper

- create function that takes in subreddit name
- go to that subreddit, and go to https://old.reddit.com/r/SUBREDDIT_NAME_HERE/
- get each post, and scan it and count number of times each ticker is mentioned (post title, post description, comments)
- keep track in array of objects like this:
  [
  { stock: APL, timesCounted: 15},
  { stock: GME, timesCounted: 20},
  { stock: TSLA, timesCounted: 10},
  ]
- sort from most to least mentions, and grab top 10
- display data in console
- do own DD on each company after that
