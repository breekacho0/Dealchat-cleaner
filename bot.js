const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');
var request = require("request");
let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.URL + bot.token);
} else {
  bot = new Bot(token, {
    polling: true
  });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
var GameWL = ["Halcyondays", "stereodamage"];
var StickerWL = ["Halcyondays", "rocophena", "sadsama", "vzzzjem", "stereodamage"];
bot.on('message', (msg) => {
var data = msg;
var message = data.text;
var user = data.from;
var chat_id = data.chat.id;
var message_id = data.message_id;
//const name = data.from.first_name;
if (data.hasOwnProperty("text")) {
  if (message.indexOf('/faq') != -1) {
    if (data.hasOwnProperty("reply_to_message")) {
      request.post('https://api.telegram.org/bot' + token + '/sendMessage')
        .form({
          'chat_id': chat_id,
          'text': '[FAQ](http://telegra.ph/Dealchat-FAQ-03-11)',
          'reply_to_message_id': data.reply_to_message.message_id,
          'parse_mode': 'Markdown'
        });
      return 1;
    } else {
      request.post('https://api.telegram.org/bot' + token + '/sendMessage')
        .form({
          'chat_id': chat_id,
          'text': '[FAQ](http://telegra.ph/Dealchat-FAQ-03-11)',
          'parse_mode': 'Markdown'
        });
      return 1;
    }
  }
}
if (data.hasOwnProperty("sticker") && StickerWL.indexOf(data.from.username) == -1) {
  if (data.sticker.set_name.indexOf('katyaserebro') != -1 ||
    data.sticker.set_name.indexOf('katya_kishuk') != -1 ||
    data.sticker.set_name.indexOf('KatyaKishchuk') != -1) {
    request.post('https://api.telegram.org/bot' + token + '/deletemessage')
      .form({
        'chat_id': chat_id,
        'message_id': message_id
      });
    console.log("Sticker from " + user.id + " deleted");
    request.post('https://api.telegram.org/bot' + token + '/sendMessage')
      .form({
        'chat_id': chat_id,
        'text': '[' + user.first_name + '](tg://user?id=' + user.id + ') твой стикер удален. Кищук вип.',
        'parse_mode': 'Markdown'
      });
    return 1;
  }
  if (data.sticker.set_name.indexOf('PopugiandAgurtsy') != -1 ||
    data.sticker.set_name.indexOf('blyadskiepapugi') != -1 ||
    data.sticker.set_name.indexOf('BirbsForMemes') != -1) {
    request.post('https://api.telegram.org/bot' + token + '/deletemessage')
      .form({
        'chat_id': chat_id,
        'message_id': message_id
      });
    console.log("Sticker from " + user.id + " deleted");
    request.post('https://api.telegram.org/bot' + token + '/sendMessage')
      .form({
        'chat_id': chat_id,
        'text': '[' + user.first_name + '](tg://user?id=' + user.id + ') твой стикер удален. удален. Это вип попуги.',
        'parse_mode': 'Markdown'
      });
    return 1;
  }
  if (data.sticker.set_name.indexOf('SpurdoFaces') != -1) {
    request.post('https://api.telegram.org/bot' + token + '/deletemessage')
      .form({
        'chat_id': chat_id,
        'message_id': message_id
      });
    console.log("Sticker from " + user.id + " deleted");
    request.post('https://api.telegram.org/bot' + token + '/sendMessage')
      .form({
        'chat_id': chat_id,
        'text': '[' + user.first_name + '](tg://user?id=' + user.id + ') твой стикер удален. Вип стикер.',
        'parse_mode': 'Markdown'
      });
    return 1;
  }
}
//Check if message contains Game attribute
if (data.hasOwnProperty("game") &&
  GameWL.indexOf(data.from.username) == -1) {
  console.log(GameWL.indexOf(data.from.username));
  request.post('https://api.telegram.org/bot' + token + '/deletemessage')
    .form({
      'chat_id': chat_id,
      'message_id': message_id
    });
  request.post('https://api.telegram.org/bot' + token + '/sendMessage')
    .form({
      'chat_id': chat_id,
      'text': '[' + user.first_name + '](tg://user?id=' + user.id + ') твоя игра унитожена. 🔪🇺🇬🤷🏿‍♂️ Беги, ниггер.'
    });

  //console.log("Game from @" + username + " deleted");
  return 1;
}
if (message.search(/^[/]+\S+/) !== -1 &&
  message.indexOf('/help') == -1 &&
  message.indexOf('/start') == -1 &&
  message.indexOf('/stat') == -1 &&
  message.indexOf('/faq') == -1) {
  request.post('https://api.telegram.org/bot' + token + '/deletemessage')
    .form({
      'chat_id': chat_id,
      'message_id': message_id
    });
  request.post('https://api.telegram.org/bot' + token + '/sendMessage')
    .form({
      'chat_id': chat_id,
      'text': '[' + user.first_name + '](tg://user?id=' + user.id + ') твое сообщение удалено. Не балуйся',
      'parse_mode': 'Markdown'
    });
  //console.log(hook.params.message);
  return 1;
}
//bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(() => {
// reply sent!
});

module.exports = bot;
