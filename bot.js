const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

let prefix = ">";

client.on('message', message => {
  if (message.content.startsWith(prefix + `info`)) {
    let uptime = secondsToString(process.uptime()).toString()  
    let version = `${process.version.toString()}`
    let users = ` ${client.users.size.toLocaleString()}`
    let servers = `${client.guilds.size.toLocaleString()}`
    let channel = `${client.channels.size.toLocaleString()}`
    let ping = `${client.ping.toFixed(1)}ms`
    message.delete();
    message.channel.send('', {
      embed: {
        type: 'rich',
        description: '[This message will self-destruct in 10 seconds.](https://vk.com/waffen)',
        color: 7506394,
        fields: [
          { name: '❯ Used Memory', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true },
          { name: '❯ Free Memory', value: `${((require('util').inspect(require('os').freemem())) / 1024 / 1024 / 1024).toLocaleString()}GB`, inline: true },
          { name: '❯ Total Memory', value: `${((require('util').inspect(require('os').totalmem())) / 1024 / 1024 / 1024).toLocaleString()}GB`, inline: true },
          { name: '❯ Version Nodejs', value: version, inline: true },
          { name: '❯ Users Online', value: users, inline: true },
          { name: '❯ Servers', value: servers, inline: true },
          { name: '❯ Channels', value: channel, inline: true },
          { name: '❯ Ping', value: ping, inline: true },
        ],
        thumbnail: { url: 'https://i.imgur.com/onpsTBU.png' },
        footer: { text: `Uptime: ${uptime}` }
      }
    }).then(message => message.delete(10000));
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
    message.channel.send(`Ping?`).then(msg => msg.edit(`Pong! (${client.ping.toFixed(1)}ms)`));
    } 
    if (message.content.startsWith(prefix +  'senddm')) {
    message.author.send('oh, hi there!').catch(e => console.log(e.stack));
  }  

  if (message.content.startsWith(prefix + `members`)) {
    if (!message.guild) return;
    message.channel.send('', {
      embed: {
        type: 'rich',
        "author": {
          "name": `${message.guild.name} (ID: ${message.guild.id})`,
          "icon_url": `${message.guild.iconURL ? message.guild.iconURL : `https://i.imgur.com/onpsTBU.png`}`  // Если нет аваратки
        },
        color: 7506394,
        fields: [
          { name: 'Member Count:', value: `**${message.guild.memberCount}**`, inline: true },
          { name: 'Region:', value: `**${message.guild.region}**`, inline: true },
          { name: 'Bots:', value: `**${message.guild.members.filter(u => u.user.bot).size} (${Math.floor(message.guild.members.filter(u => u.user.bot).size / message.guild.members.size * 100)}%)**`, inline: true },
          { name: 'Humans:', value: `**${message.guild.members.filter(u => !u.user.bot).size} (${Math.floor(message.guild.members.filter(u => !u.user.bot).size / message.guild.members.size * 100)}%)**`, inline: true },
          { name: 'Owner:', value: `**${message.guild.owner}**`, inline: true },
          { name: 'Created at:', value: `**${message.guild.createdAt.toLocaleString()}**`, inline: true },
        ],
        thumbnail: { url: 'https://i.imgur.com/onpsTBU.png' },
        footer: { text: `Now: ${new Date()}` }
      }
    })
  }
  if (message.content.startsWith(prefix +  'defaultavatar')) {
    message.delete(message.author.lastMessageID);
    message.channel.send({
      "embed": {
        "color": 7506394,
        "title": "Avatar URL link",
        "url": message.author.defaultAvatarURL,
        timestamp: new Date(),
       "footer": {
        },
        "image": {
          "url": message.author.defaultAvatarURL
        }
      }
    })
  }
    if (message.content.startsWith(prefix +  'guildavatar')) {
      if (!message.guild) return;
    message.delete(message.author.lastMessageID);
    message.channel.send({
      "embed": {
        "color": 7506394,
        "title": "Avatar URL link",
        "url": message.guild.iconURL,
        timestamp: new Date(),
       "footer": {
        },
        "image": {
          "url": message.guild.iconURL ? message.guild.iconURL : `https://i.imgur.com/HpldFUv.gif`
        }
      }
    })
  }
    if (message.content.startsWith(prefix +  'avatar')) {
      message.delete(message.author.lastMessageID);
      message.channel.send({
        "embed": {
          "color": 7506394,
          "title": "Avatar URL link",
          "url": message.author.avatarURL,
          timestamp: new Date(),
         "footer": {
          },
          "image": {
            "url": message.author.avatarURL
            
          }
        }
      })
    }
    if (message.content.startsWith(prefix + 'setstream')) {
      message.delete(message.author.lastMessageID);
        client.user.setGame(message.content.substr(10), 'https://www.twitch.tv/antimamba777');
      }
    if (message.content.startsWith(prefix +  `listem`)) {
      if (!message.guild) return;
      message.delete(message.author.lastMessageID);
        const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
        message.channel.send(emojiList ?emojiList : `On this server there is not one smiley 😩`);
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
  if (message.content.startsWith(prefix + 'typing')) {
    message.delete(message.author.lastMessageID);
    message.channel.startTyping();
  }
  if (message.content.startsWith(prefix + 'stoptyping')) {
    message.delete(message.author.lastMessageID);
    message.channel.stopTyping();
  }
   if (message.content.startsWith(prefix + 'spam')) {
    let i = 1;
    const start = Date.now();
    while (i <= 20) {
      message.channel.send(`${message.content.substr(5)} ${i} = 20`);
      i++;
    }
    message.channel.send('end.');
  }
  if (message.content.startsWith(prefix + "clear")) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }
    }
  if (message.content.startsWith(prefix + 'halp')) {
      message.delete(message.author.lastMessageID);
      let me = 'Loading.....';
        message.channel.send(me).then(msg => msg.edit(`= HELP =
•` + prefix + `avatar :: => Исходная аватарка
•` + prefix + `defaultavatar :: => Стандартная аватарка при регистрации 
•` + prefix + `guildavatar :: => Аватарка сервера
•` + prefix + `clear :: => Удалить последние сообщения (!)
•` + prefix + `ping :: => Пинг
•` + prefix + `listem :: =>  Список emoji смайликов канала
•` + prefix + `uptime :: =>  Время работы
•` + prefix + `typing :: => AlwaysTyping
•` + prefix + `typingstop :: => Stop AlwaysTyping
•` + prefix + `username :: => Изменить имя пользователя (!)
•` + prefix + `setstream :: => Изменить статус 
•` + prefix + `info :: => Информация о боте
•` + prefix + `members :: => Информация про сервер
•` + prefix + `userinfo :: => Информацию о пользователе
•` + prefix + `spam :: => Спам сообщениями (20)
•` + prefix + `halp :: => Помощь\n
(!1)Команда предназначена для бота (Если seflbot) Либо "You can only bulk delete messages that are under 14 days old.".\n(!2) Имя пользователя можно менять только 2 раза за 1 час.
`, {code: "asciidoc"}));
      }  
});



/*
client.on("ready", function () {
  setInterval(function() {    
  games = [`Work on ${client.guilds.size} servers!💩`, `Users online ${client.users.size} `]
  randGame = Math.floor(Math.random() * games.length);
  client.user.setGame(games[randGame], 'https://www.twitch.tv/antimamba777');     
}, 10000);
});
*/


client.login(process.env.BOT_TOKEN);


