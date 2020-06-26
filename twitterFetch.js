const fs = require("fs")
const key = require("./k.js").key;
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
// stream.on('tweet', function (tweet) {
//     if (users.indexOf(tweet.user.id_str) > -1) {
//         console.log(tweet.user.name + ": " + tweet.text);
//         T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
//             // console.log(data)
//             console.log(`${data.user.screen_name} ${data.created_at} \n ${data.text}`)
            
//         })
//     }
// })

const start = () => {
    // let data = JSON.parse(fs.readFileSync("./twitterID.json")).twitter
    // console.log(users)

    stream.on('tweet', function (tweet) {
        if (users.indexOf(tweet.user.id_str) > -1) {
            if(tweet.truncated == true) {
                console.log(tweet.created_at + "\n" + tweet.user.name + ": " + tweet.extended_tweet.full_text);
            }
            else{
                console.log(tweet.created_at + "\n" + tweet.user.name + ": " + tweet.text);
            }
            // console.log(tweet)
        }
    })
    
}
start()

module.exports.start = start;