const client= require('./burgerBotClient.js').client
const twitterStart = require('./burgerBotTwitter.js').twitterStart
const sectorDataStart = require('./sectorData.js').start
const sectorDataStop = require('./sectorData.js').stop

sectorDataStart(client)
twitterStart(client)
