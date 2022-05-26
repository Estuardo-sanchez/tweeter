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


    $('.alert').slideUp();
    if (text.length <= 5) {
      $('.alert').slideDown(1000).text("You can't post an empty tweet. Say what's on your mind!")
      return;
    }
    if (text.length > 145) {
      $('.alert').slideDown(1000).text("you exceeded the character amount. Pease keep it under 140 characters.")
      return;
    }

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: text
    })
      .then((res) => {
        const tweetVal = createTweetElement(res);
        const counter = "#tweet-text + div output";
        $('.tweet-main-container').prepend(tweetVal)
        $("#tweet-text").val(""); 
        $(counter).text("140");
    
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


const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
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
${safeHTML}
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