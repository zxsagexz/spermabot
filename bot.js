const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});


client.on('message', message => {
  if (message.content === `1avatar`) {
    message.delete(message.author.lastMessageID);
    message.reply(message.author.avatarURL);
  }
    if (message.content === '1defaultavatar') {
      message.delete(message.author.lastMessageID);
      message.reply(message.author.defaultAvatarURL);
    }
  if (message.content === '1ping') {
    message.delete(message.author.lastMessageID);
    message.channel.send(`Pong! \nDiscord HeartBeat: ${client.ping} ms`);
  }
    if (message.content === '1infouser') {
    message.delete(message.author.lastMessageID);
    message.channel.send("Requested user: `" + message.author.username + "`\nID: `" + message.author.id + "`\nAvatar: " + message.author.avatarURL);
  }
    if (message.content === `1uptime`) {
    message.delete(message.author.lastMessageID);
    message.channel.send("**My uptime is:**\n" + (Math.round(client.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(client.uptime / 1000) % 60) + " seconds.").catch(e => console.log(e.stack));
  }
  if (message.content === '1status') {
    message.delete(message.author.lastMessageID);
    message.channel.send(`Bot has started\nWith ${client.users.size} users\nIn ${client.channels.size} channels \nOf ${client.guilds.size} guilds.`);
  }
    if (message.content === "1listem") {
      if (!message.guild) return;
      message.delete(message.author.lastMessageID);
        const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
        message.channel.send(emojiList);
      }
  let args = message.content.split(" ").slice(1);
  if (!message.guild) return;
  if (message.content.startsWith("1ch")) {
    message.delete(message.author.lastMessageID);
    message.channel.createWebhook("Sage Webhook", "https://i.imgur.com/N5i2SnY.png")
      .then(webhook => webhook.edit("Sage Webhook", "https://i.imgur.com/N5i2SnY.png")
        .then(wb => message.author.send(`Here is your webhook https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`))
        .catch(console.error))
      .catch(console.error);
  }
  if (message.content === '1typing') {
    message.delete(message.author.lastMessageID);
    message.channel.startTyping();
  }
    if (message.content === '1typingstop') {
      message.delete(message.author.lastMessageID);
      message.channel.stopTyping();
    }
    if(message) {
        message.react("💩")
    }
  if (message.content.startsWith('1username')) {
      message.delete(message.author.lastMessageID);
        client.user.setUsername(message.content.substr(9));
      }
  if (message.content.startsWith('1spam')) {
    let i = 1;
    const start = Date.now();
    while (i <= 20) {
      message.channel.send(`${message.content.substr(6)} ${i} = 20`);
      i++;
    }
    message.channel.send('end.');
  }
     if (message.content === '1help') {
      message.delete(message.author.lastMessageID);
        message.channel.send(
        `__**HELP:**__
        **!avatar** *=>* Исходная аватарка
        **!defaultavatar** *=>* Стандартная аватарка при регистрации 
        **!ping** *=>* Пинг
        **!status** *=>* Информация о боте
        **!listem** *=>*  Список emoji смайликов канала
        **!ch** *=>*  Создать web hook
        **!typing** *=>* AlwaysTyping
        **!typingstop** *=>* Stop AlwaysTyping
        **!username** *=>* Изменить имя пользователя
        **0help** *=>* Помощь`);
      }
});

client.on('ready', () => {
          var timerId = setInterval(function() {
            client.user.setGame(`💩`, 'https://www.twitch.tv/antimamba777');
            }, 15000);
            var timerId = setInterval(function() {
              client.user.setGame(`💎`, 'https://www.twitch.tv/antimamba777');
            }, 30000);        
      });


client.on('message', function(message) {
    if (message.content == "1clear") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }
    }

});

client.login(process.env.BOT_TOKEN);
