const Discord = require('discord.js');
const key = require("./k.js").key;
const client = new Discord.Client();

const fs = require("fs")
// const key = require("./k.js").key;
var Twit = require('twit')
var T = new Twit({
    consumer_key:         key.apiKey,
    consumer_secret:      key.apiSecretKey,
    access_token:         key.accessToken,
    access_token_secret:  key.accessTokenSecret,
})


let users = JSON.parse(fs.readFileSync("./twitterID.json")).twitter
console.log(users)
// let users = ["104237736", "1275893363993194496", "20402945","203652149"];
let stream = T.stream('statuses/filter', {follow: users});

// const start = () => {
//     // let data = JSON.parse(fs.readFileSync("./twitterID.json")).twitter
//     // console.log(users)

//     stream.on('tweet', function (tweet) {
//         if (users.indexOf(tweet.user.id_str) > -1) {
//             if(tweet.truncated == true) {
//                 console.log(tweet.created_at + "\n" + tweet.user.name + ": " + tweet.extended_tweet.full_text);
//             }
//             else{
//                 console.log(tweet.created_at + "\n" + tweet.user.name + ": " + tweet.text);
//             }
//             // console.log(tweet)
//         }
//     })
    
// }
// start()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.cache.get('725903080192868402').send('Hello here I am ready to go!')

});
 
client.on('message', msg => {
  if (msg.content === 'secret') {
    msg.reply('shhhh');

  }
});

stream.on('tweet', function (tweet) {
    if (users.indexOf(tweet.user.id_str) > -1) {
        if(tweet.truncated == true) {
            console.log(tweet.created_at + "\n" + tweet.user.name + ": " + tweet.extended_tweet.full_text);
            let dataT = `${tweet.created_at} \n${tweet.user.name}: ${tweet.extended_tweet.full_text}`
            client.channels.cache.get('725903080192868402').send(dataT)

        }
        else{
            console.log(tweet.created_at + "\n" + tweet.user.name + ": " + tweet.text);
            let dataT = `${tweet.created_at} \n${tweet.user.name}: ${tweet.text}`
            client.channels.cache.get('725903080192868402').send(dataT)

        }
        // console.log(tweet)
    }
})

client.login(key.botToken);
