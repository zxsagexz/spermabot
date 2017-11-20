const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');

client.on('ready', () => {
  console.log('I am ready!');
});

let prefix = "1";

client.on('message', message => {
  if (message.content.startsWith(prefix + `info`)) {
    let uptime = secondsToString(process.uptime()).toString()  
    let version = `${process.version.toString()}`
    let users = ` ${client.users.size.toLocaleString()}`
    let servers = `${client.guilds.size.toLocaleString()}`
    let channel = `${client.channels.size.toLocaleString()}`
    let ping = `${client.ping}ms`
    let memory = `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`
    message.channel.send('', {
      embed: {
        type: 'rich',
        description: '[Author](https://vk.com/waffen)',
        color: 15473237,
        fields: [
          { name: '❯ Ram usage', value: memory, inline: true },
          { name: '❯ Version nodejs', value: version, inline: true },
          { name: '❯ Users online', value: users, inline: true },
          { name: '❯ Servers', value: servers, inline: true },
          { name: '❯ Channels', value: channel, inline: true },
          { name: '❯ Ping', value: ping, inline: true },
        ],
        thumbnail: { url: 'https://i.imgur.com/wmCypwa.jpg' },
        footer: { text: `Uptime: ${uptime}` }
      }
    })
    function secondsToString(seconds) {
      seconds = Math.trunc(seconds)
      let numdays = Math.floor((seconds % 31536000) / 86400)
      let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
      let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
      let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60
      return `${numdays} days ${numhours} hours ${numminutes} minutes ${numseconds} seconds` 
    }
  }
  if (message.content.startsWith(prefix + 'ping')) {
    message.delete()
    message.channel.send(`Ping?`).then(msg => msg.edit(`Pong! (${client.ping}ms)`));
    }
    if (message.content.startsWith(prefix +  'senddm')) {
    message.author.send('oh, hi there!').catch(e => console.log(e.stack));
  }  
  if (message.content.startsWith(prefix +  'infouser')) {
    message.delete(message.author.lastMessageID);
    message.channel.send("Requested user: `" + message.author.username + "`\nID: `" + message.author.id + "`\nAvatar: " + message.author.avatarURL);
  }
  if (message.content.startsWith(prefix +  'defaultavatar')) {
    message.delete(message.author.lastMessageID);
    message.channel.send({
      "embed": {
        "color": 3333335,
        "title": "Avatar URL link",
        "url": message.author.defaultAvatarURL,
       "footer": {
        },
        "image": {
          "url": message.author.defaultAvatarURL
        }
      }
    })
  }
    if (message.content.startsWith(prefix +  'avatar')) {
      message.delete(message.author.lastMessageID);
      message.channel.send({
        "embed": {
          "color": 3333335,
          "title": "Avatar URL link",
          "url": message.author.avatarURL,
         "footer": {
          },
          "image": {
            "url": message.author.avatarURL
          }
        }
      })
    }
    if (message.content.startsWith(prefix +  `listem`)) {
      if (!message.guild) return;
      message.delete(message.author.lastMessageID);
        const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
        message.channel.send(emojiList);
      }
  if (message.content.startsWith(prefix + 'setstream')) {
    message.delete(message.author.lastMessageID);
      client.user.setGame(message.content.substr(10), 'https://www.twitch.tv/antimamba777');
    }
    if (message.content.startsWith(prefix +  'uptime')) {
      let uptime = secondsToString(process.uptime()).toString()
      message.channel.send(`${uptime}`).catch(e => console.log(e.stack));
        function secondsToString(seconds) {
        seconds = Math.trunc(seconds)
        let numdays = Math.floor((seconds % 31536000) / 86400)
        let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
        let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
        let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60
        return `${numdays} days ${numhours} hours ${numminutes} minutes ${numseconds} seconds` 
      }
    }
    if (message.content.startsWith(prefix + 'setgame')) {
    message.delete(message.author.lastMessageID);
      client.user.setGame(message.content.substr(8));
    }
    if (message.content.startsWith(prefix + 'invis')) {
    message.delete(message.author.lastMessageID);
    client.user.setStatus("invisible");
  }
  if (message.content.startsWith(prefix + 'online')) {
    message.delete(message.author.lastMessageID);
    client.user.setStatus("online");
  }
  if (message.content.startsWith(prefix + 'dnd')) {
    message.delete(message.author.lastMessageID);
    client.user.setStatus("dnd");
  }
  if (message.content.startsWith(prefix + 'idle')) {
    message.delete(message.author.lastMessageID);
    client.user.setStatus("idle");
  }
  //
  if (message.content.startsWith(prefix + 'typing')) {
    message.delete(message.author.lastMessageID);
    message.channel.startTyping();
  }
    if (message.content.startsWith(prefix + 'members')) {
      message.delete(message.author.lastMessageID);
      message.channel.send('', {
      embed: {
        title: message.guild.name,
        thumbnail: { url: message.guild.iconURL },
      "author": {
        "name": `${message.author.username}`,
        "icon_url": `${message.author.avatarURL}`,
        "url": "https://vk.com/waffen",
      },
        description: `Member Count: **${message.guild.memberCount}**\nOwner: **${message.guild.owner}**\nRegion: **${message.guild.region}**`,
        footer: { text: `` },
        color: 15473237
      }
    })
  }
    if (message.content.startsWith(prefix + 'spam')) {
    let i = 1;
    const start = Date.now();
    while (i <= 20) {
      message.channel.send(`${message.content.substr(6)} ${i} = 20`);
      i++;
    }
    message.channel.send('end.');
  }
  if (message.content.startsWith(prefix + 'halp')) {
      message.delete(message.author.lastMessageID);
      let me = 'Loading.....';
        message.channel.send(me).then(msg => msg.edit(`= HELP = 
•` + prefix + `avatar :: => Исходная аватарка
•` + prefix + `defaultavatar :: => Стандартная аватарка при регистрации 
•` + prefix + `ping :: => Пинг
•` + prefix + `status :: => Информация о боте
•` + prefix + `listem :: =>  Список emoji смайликов канала
•` + prefix + `uptime :: =>  Время работы
•` + prefix + `typing :: => AlwaysTyping
•` + prefix + `typingstop :: => Stop AlwaysTyping
•` + prefix + `username :: => Изменить имя пользователя
•` + prefix + `info :: => Информация о боте
•` + prefix + `userinfo :: => Информацию о пользователе
•` + prefix + `spam :: => Спам сообщениями (20)
•` + prefix + `members :: => Информация про сервер
•` + prefix + `halp :: => Помощь
`
, {code: "asciidoc"}));

      }  
});
      
client.on('message', function(message) {
  if (message.content.startsWith(prefix + "clear")) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }
    }

});


client.login(process.env.BOT_TOKEN);
