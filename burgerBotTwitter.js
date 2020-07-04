const twitterID = require("./twitterID.js").twitterID;
const twitterMap = twitterID.twitterMap;
const key = require("./k.js").key;
const Twit = require("twit");

//login 
const T = new Twit({
    consumer_key: key.apiKey,
    consumer_secret: key.apiSecretKey,
    access_token: key.accessToken,
    access_token_secret: key.accessTokenSecret,
    tweet_mode: "extended",
});
  
  
const start = (client) => {
    //get users 
    let users = twitterID.twitterAccs;
    
    
    //start the twitter stream 
    let stream = T.stream("statuses/filter", { follow: users });
    
    //get channel
    const getChannel = (id) => {
      let channel = "728233708888522763";
      console.log('twit map')
      console.log(twitterMap[`${id}`]);
      if (typeof twitterMap[`${id}`] != "undefined") {
        channel = twitterMap[`${id}`];
      }
    
      return channel;
    };
    
    //tweet stream
    stream.on("tweet", function (tweet) {
        if (users.indexOf(tweet.user.id_str) > -1) {
          if (
            typeof tweet.retweeted_status != "undefined" &&
            typeof tweet.retweeted_status.extended_tweet != "undefined"
          ) {
            let dataT = `${tweet.created_at} \n${tweet.user.name}: ${tweet.retweeted_status.extended_tweet.full_text}`;
            //set the right channel from the twitter mapping
            let channel = getChannel(tweet.user.id); //handles retweeted extened 
            // console.log(channel);
            client.channels.cache.get(channel).send(dataT);
          } else if (typeof tweet.extended_tweet != "undefined") {  //handles retweeted
            console.log(
              tweet.created_at +
                "\n" +
                tweet.user.name +
                ": " +
                tweet.extended_tweet.full_text
            );
            let dataT = `${tweet.created_at} \n${tweet.user.name}: ${tweet.extended_tweet.full_text}`;
            console.log(tweet.extended_tweet.full_text);
      
            //set the right channel from the twitter mapping
            let channel = getChannel(tweet.user.id);
            console.log(channel);
            client.channels.cache.get(channel).send(dataT);
          } else { //handles direct tweet 
            console.log(
              tweet.created_at + "\n" + tweet.user.name + ": " + tweet.text
            );
            let dataT = `${tweet.created_at} \n${tweet.user.name}: ${tweet.text}`;
      
            let channel = getChannel(tweet.user.id);
            console.log(channel);
            client.channels.cache.get(channel).send(dataT);
          }
    
          console.log(tweet);
        }
      });
      
      client.login(key.botToken);
      
}

module.exports.twitterStart = start