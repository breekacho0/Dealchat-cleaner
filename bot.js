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
var opts;
var text_message;
console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
var GameWL = ["Halcyondays", "stereodamage"];
var StickerWL = ["Halcyondays", "rocophena", "sadsama", "vzzzjem", "stereodamage"];
bot.on('message', (msg) => {
  var data = msg;
  var message = data.text;
  var user = data.from;
  var chat_id = data.chat.id;
  var message_id = data.message_id;
  if (data.hasOwnProperty("text")) {
    if (message.indexOf('/faq') != -1) {
      if (data.hasOwnProperty("reply_to_message")) {
        opts = {
          reply_to_message_id: data.reply_to_message.message_id,
          parse_mode: 'Markdown'
        };
      } else {
        opts = {
          parse_mode: 'Markdown'
        };
      }
      text_message = '[FAQ](http://telegra.ph/Dealchat-FAQ-03-11)';
      bot.sendMessage(chat_id, text_message, opts);
      console.log("FAQ deleted from " + user.first_name + "|" + user.id);
      bot.deleteMessage(chat_id, message_id);
      return 1;
    }
  }
  if (StickerWL.indexOf(data.from.username) == -1 && data.hasOwnProperty("sticker")) {
    console.log(data.sticker);
    opts = {
      parse_mode: 'Markdown'
    };
    if (data.sticker.set_name.indexOf('katyaserebro') != -1 ||
      data.sticker.set_name.indexOf('katya_kishuk') != -1 ||
      data.sticker.set_name.indexOf('KatyaKishchuk') != -1) {
      text_message = '[' + user.first_name + '](tg://user?id=' + user.id + ') твой стикер удален. Кищук вип.';
      bot.deleteMessage(chat_id, message_id);
      bot.sendMessage(chat_id, text_message, opts);
      console.log("Sticker from " + user.id + " deleted");
      return 1;
    }
    if (data.sticker.set_name.indexOf('PopugiandAgurtsy') != -1 ||
      data.sticker.set_name.indexOf('blyadskiepapugi') != -1 ||
      data.sticker.set_name.indexOf('BirbsForMemes') != -1) {
      text_message = '[' + user.first_name + '](tg://user?id=' + user.id + ') твой стикер удален. удален. Это вип попуги.';
      bot.deleteMessage(chat_id, message_id);
      bot.sendMessage(chat_id, text_message, opts);
      console.log("Sticker from " + user.id + " deleted");
      return 1;
    }
    if (data.sticker.set_name.indexOf('SpurdoFaces') != -1) {
      text_message = '[' + user.first_name + '](tg://user?id=' + user.id + ') твой стикер удален. Вип стикер.';
      bot.deleteMessage(chat_id, message_id);
      bot.sendMessage(chat_id, text_message, opts);
      console.log("Sticker from " + user.id + " deleted");
      return 1;
    }
  }
  //Check if message contains Game attribute
  if (data.hasOwnProperty("game") &&
    GameWL.indexOf(data.from.username) == -1) {
    opts = {
      parse_mode: 'Markdown'
    };
    text_message = '[' + user.first_name + '](tg://user?id=' + user.id + ') твоя игра унитожена. 🔪🇺🇬🤷🏿‍♂️ Беги, ниггер.';
    bot.deleteMessage(chat_id, message_id);
    bot.sendMessage(chat_id, text_message, opts);

    //console.log("Game from @" + username + " deleted");
    return 1;
  }
});
module.exports = bot;