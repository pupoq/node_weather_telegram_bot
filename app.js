const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')

const token = '5461701015:AAHz8hCEymIIQ6sP2SCU6BIFTzIYfX59By0';
const bot = new TelegramBot(token, {polling: true});

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
      bot.sendMessage(chatId, `
        В ${msg.text} сейчас ${Math.round(response.data.main.temp)} градусов
      Ощущается как ${response.data.main.feels_like}
      Скорость ветра: ${response.data.wind.speed}
      Давление: ${response.data.main.pressure}
      `)

      console.log(response.data)
});