const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')

const token = '5461701015:AAHz8hCEymIIQ6sP2SCU6BIFTzIYfX59By0';
const bot = new TelegramBot(token, {polling: true});

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
  
//     console.log(msg.text)

//     if(msg.text.toLowerCase().includes('иди')){
//         bot.sendMessage(chatId, 'сам пашел!');
//     } else {
//         bot.sendMessage(chatId, 'Я очень люблю кушот!');
//     }

//   });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const cityName = msg.text;
  
    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {q: cityName, units: "metric"},
        headers: {
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
          'X-RapidAPI-Key': 'c15c756a7emshd9689e77d7ead2dp1c54e5jsn4401105ea3c1'
        }
      };

      const response = await axios.request(options)
      bot.sendMessage(chatId, `В ${msg.text} сейчас ${Math.round(response.data.main.temp)} градусов`)
      
      
      console.log(response.data)
});