/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $('form').submit(function (event) {
    event.preventDefault()
    const form = $(this)
    const text = form.serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: text
    })
      .then((res) => {
        const tweetVal = createTweetElement(res);
  $('.tweet-main-container').prepend(tweetVal)
      })
  })

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      data: "data"
    })
      .done(function (data) {
        console.log(data)
        renderTweets(data)
      });
  }

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
for (const tweet of tweets) {
  const tweetVal = createTweetElement(tweet);
  $('.tweet-main-container').append(tweetVal)
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
  <p class="date-of-tweet">${timeago.format(tweet.created_at)}</p>
  <div class="icons">
    <i class="flag fa-solid fa-flag"></i>
    <i class="retweet fa-solid fa-retweet"></i>
    <i class="heart fa-solid fa-heart"></i>
  </div>
</footer>
</article>`
return $tweet;
};

loadTweets();
});