/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault()
    const form = $(this)
    const text = form.serialize();
    $.ajax ({
      method: 'POST',
      url: '/tweets',
      data: text
    })
    .then(x => console.log(x))
    // console.log(this)
    // console.log("sucess");
  })


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
for (const tweet of tweets) {
  const tweetVal = createTweetElement(tweet);
  $('.tweet-container').append(tweetVal)
}
};

const createTweetElement = function(tweet) {
let $tweet = `<article class="tweet-container">
<header class="tweet">
  <div class="top-row-tweet-container">
    <div>
      <img src="${tweet.user.avatars}" ></img>
      <p>${tweet.user.name}</p>
    </div>
    <p class="user-handle">${tweet.user.handle}</p>
  </div>
</header>
<p class="tweet-content">${tweet.content.text}</p>
<footer>
  <p class="date-of-tweet">${tweet.content.created_at}</p>
  <div class="icons">
    <i class="flag fa-solid fa-flag"></i>
    <i class="retweet fa-solid fa-retweet"></i>
    <i class="heart fa-solid fa-heart"></i>
  </div>
</footer>
</article>`
return $tweet;
};

renderTweets(data);
});