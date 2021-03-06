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

var text_message;
console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
var GameWL = ["Halcyondays", "stereodamage"];
const gachiSP = ["admiralbulldog", "gachisticker", "Gatimuti", "GachiWorld"];
var StickerBL = process.env.STICKERBL.split(' ');
var spEvent = process.env.EVENT;
var FAQ = process.env.FAQ;
if (spEvent.indexOf('gachi') != -1) {
  bot.sendMessage(-1001320202440, 'Here comes the GACHI day. Enjoy the lash of the spanking.');
}
bot.on('message', (msg) => {
  var opts = {
    parse_mode: 'Markdown'
  };
  var data = msg;
  var message = data.text;
  var user = data.from;
  var chat_id = data.chat.id;
  var message_id = data.message_id;
  if (data.hasOwnProperty("sticker")) {
    bot.getChatMember(chat_id, user.id).then(chatMember => {
      console.log(data.sticker);
      if (chatMember.status.indexOf('administrator') === -1 && chatMember.status.indexOf('creator') === -1) {
        if (data.sticker.hasOwnProperty("set_name")) {
          if (spEvent == 'gachi') {
            if (gachiSP.indexOf(data.sticker.set_name) == -1) {
              text_message = `[${user.first_name}](tg://user?id=${user.id}) fuck you, leathermen.`;
              bot.deleteMessage(chat_id, message_id);
              bot.sendMessage(chat_id, text_message, opts);
              console.log("Sticker from " + user.id + " deleted");
              return 1;
            }
          } else {
            if (data.sticker.set_name.indexOf('katyaserebro') != -1 ||
                data.sticker.set_name.indexOf('katya_kishuk') != -1 ||
                data.sticker.set_name.indexOf('KatyaKishchuk') != -1) {
              text_message = `[${user.first_name}](tg://user?id=${user.id}) твой стикер удален. Кищук вип.`;
              bot.deleteMessage(chat_id, message_id);
              bot.sendMessage(chat_id, text_message, opts);
              console.log("Sticker from " + user.id + " deleted");
              return 1;
            }
            if (StickerBL.indexOf(data.sticker.set_name) != -1) {
              text_message = `[${user.first_name}](tg://user?id=${user.id}) пошел ты, кожаный ублюдок.`;
              bot.deleteMessage(chat_id, message_id);
              bot.sendMessage(chat_id, text_message, opts);
              console.log("Sticker from " + user.id + " deleted");
              return 1;
            }
          }
        }
      }
    });
  }

  if (data.hasOwnProperty("text")) {
    if (message.indexOf('/faq') != -1) {
      if (data.hasOwnProperty("reply_to_message")) {
        opts.reply_to_message_id = data.reply_to_message.message_id;
      } else {}
      text_message = `[FAQ](${FAQ})`;
      bot.sendMessage(chat_id, text_message, opts);
      console.log("FAQ deleted from " + user.first_name + "|" + user.id);
      bot.deleteMessage(chat_id, message_id);
      return 1;
    }
  }
  //Check if message contains Game attribute
  if (data.hasOwnProperty("game") &&
    GameWL.indexOf(data.from.username) == -1) {
    text_message = '[' + user.first_name + '](tg://user?id=' + user.id + ') твоя игра унитожена. 🔪🇺🇬🤷🏿‍♂️ Беги, ниггер.';
    bot.deleteMessage(chat_id, message_id);
    bot.sendMessage(chat_id, text_message, opts);

    //console.log("Game from @" + username + " deleted");
    return 1;
  }
});
module.exports = bot;