const twit = require('twit');
const config = require('./config');

const Twitter = new twit(config);

const retweet = function() {
    const params = {
      q: '#nodejs, #Nodejs',
      result_type: 'recent',
      lang: 'en'    
    } 
    Twitter.get('search/tweets', params, function(err, data) {
        // if there is no errors
          if (!err) {
            // grab ID of tweet to retweet

              const retweetId = data.statuses[0].id_str;
              // Retweet !
              Twitter.post('statuses/retweet/:id', {
                  id: retweetId
              }, function(err, response) {
                  if (response) {
                      console.log('Retweeted!!!');
                  }
                  // if there was an error while tweeting

                  if (err) {
                      console.log('Something went wrong while RETWEETING... Duplication maybe...');
                  }
              });
          }
          // if unable to Search a tweet due to any prob ..
          else {
            console.log('Something went wrong while SEARCHING...');
          }
      });
  }

//  Let start rhe Party .. !!!!
  retweet();

  // The retweet shouldn't be too often .. I'll set a time interval
  setInterval(retweet, 50000);