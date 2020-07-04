const Discord = require("discord.js");
const key = require("./k.js").key;

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.cache
    .get("728370364828221462")
    .send("Hello here I am ready to go!"); //logged in confirmed
  //returns initialized client object
});

client.on("message", (msg) => {
  if (msg.content === "secret") {
    msg.reply("shhhh"); //for testing purposes
  }
});

client.login(key.botToken);

module.exports.client = client;
