const key = require("./k.js").key.alphavantage;
const alpha = require("alphavantage")({ key: key });

// let run
let client;

const parseSector = (data) => {
  let text = `Materials:${data.Materials}\nEnergy:${data.Energy}\nIndustrials:${data.Industrials}\nHealth Care:${data["Health Care"]}\nInformation Technology:${data["Information Technology"]}\nConsumer Staples:${data["Consumer Staples"]}\nConsumer Discretionary:${data["Consumer Discretionary"]}\nUtilites ${data.Utilites}\nFinancials ${data.Financials}\nCommunication Services:${data["Communication Services"]}\nReal Estate:${data["Real Estate"]}`;
  return text;
};

const fetchSectors = () => {
  client.on("message", (msg) => {
    if (msg.content === "!sectors") {
      alpha.performance.sector().then((data) => {
        // console.log(data['Rank A: Real-Time Performance']);
        let channel = "728366548913356850";
        let text = parseSector(data["Rank A: Real-Time Performance"]);
        client.channels.cache.get(channel).send(text);
      });
    }
  });

  // if(run == true){
  //     setTimeout(fetchSectors, 1000)
  // }
};

const start = (CLIENT) => {
  client = CLIENT;
  // run = true
  fetchSectors();
};

// const stop = () => {
//     run = false
// }

module.exports.start = start;
// module.exports.stop = stop
