const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  console.log('I am ready!');
});
let prefix = "s";
client.on('message', message => {
  ////////////////////////////////////////////////////////////////////////////////////////////////
  /*                        purge                                       */
  const args = message.content.slice(prefix.length).split(/\s+/); 
  const command = args.shift().toLowerCase(); 
  /*                       userinfo                                    */
  const millisCreated = new Date().getTime() - message.author.createdAt.getTime(); //How long ago the account was created
  const daysCreated = millisCreated / 1000 / 60 / 60 / 24;
  const millisJoined = new Date().getTime() - message.member.joinedAt.getTime();  //How long about the user joined the server
  const daysJoined = millisJoined / 1000 / 60 / 60 / 24;
  let roles = message.member.roles.array().slice(0).sort((a, b) => a.comparePositionTo(b)).map(role => role); // roles
  /*                      members                                      */
  const verificationLevels = ['**None** \n*(unrestricted)*', '**Low** \n*(must have verified email on account)*', '**Medium** \n*(must be registered on Discord for longer than 5 minutes)*', '**(╯°□°）╯︵ ┻━┻** \n*(must be a member of the server for longer than 10 minutes)*', '**┻━┻ミヽ(ಠ益ಠ)ﾉ彡┻━┻** \n*(must have a verified phone number)*']; 
  const contentFilter = ['Content filter disabled', 'Scan messages of members without a role', 'Scan messages sent by all members', 'Content Filter unknown']; 
  const millis = new Date().getTime() - message.guild.createdAt.getTime();
  const days = millis / 1000 / 60 / 60 / 24;
  /*                    uptime                                        */
  function secondsToString(seconds) {
    seconds = Math.trunc(seconds)
    let numdays = Math.floor((seconds % 31536000) / 86400)
    let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
    let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
    let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60
    return `${numdays} days ${numhours} hours ${numminutes} minutes ${numseconds} seconds` 
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
if (message.content.startsWith(prefix + `userinfo`)) {
  if (!message.mentions.users.size) { 
    return message.channel.send('', {
    embed: {
      type: 'rich',
      "author": {
        "icon_url": `${message.guild.iconURL ? message.guild.iconURL : `https://i.imgur.com/onpsTBU.png`}`  // Если нет аваратки
      },
    "image": {
      "url": `${message.author.displayAvatarURL}`,
    },
      color: 7506394,
      fields: [
        { name: 'User name:', value: `**${message.author.username}**`, inline: false },
        { name: 'Nickname In This Server:', value: `**${message.member.nickname || "None"}**`, inline: true },
        { name: 'ID:', value: `**${message.author.id}**`, inline: false },
        { name: 'Bot:', value: `**${message.author.bot ? 'Yes' : 'No'}**`, inline: false },
        { name: 'Status:', value: `**${message.author.presence.status}**`, inline: false },
        { name: 'Playing:', value: `**${(message.author.presence.game && message.author.presence.game && message.author.presence.game.name) || 'None'}**`, inline: false },
        { name: 'Roles:', value: `**${roles.join(', ')}**`, inline: false },
        { name: 'Account Created:', value: `**${message.author.createdAt.toString().substring(0, 25)}**`, inline: true },
        { name: 'Days Since Creation:', value: `**${daysCreated.toFixed(0)}**`, inline: true },
        { name: 'Joined This Server:', value: `**${message.member.joinedAt.toString().substring(0, 25)}**`, inline: true },
        { name: 'Days Since Joining:', value: `**${daysJoined.toFixed(0)}**`, inline: true },
      ],
      thumbnail: { url: 'https://i.imgur.com/onpsTBU.png' },
      footer: { text: '' }
    }
  })
}
const userinfo = message.mentions.users.map(user => {
  return message.channel.send({
    embed: {
      type: 'rich',
      "author": {
        "icon_url": `https://i.imgur.com/onpsTBU.png`  // Если нет аваратки
      },
    "image": {
      "url": `${user.displayAvatarURL}`,
    },
      color: 7506394,
      fields: [
        { name: 'User name:', value: `**${user.username}**`, inline: false },
        { name: 'ID:', value: `**${user.id}**`, inline: false },
        { name: 'Bot:', value: `**${user.bot ? 'Yes' : 'No'}**`, inline: false },
        { name: 'Status:', value: `**${user.presence.status}**`, inline: false },
        { name: 'Playing:', value: `**${(user.presence.game && user.presence.game && user.presence.game.name) || 'None'}**`, inline: false },
        { name: 'Account Created:', value: `**${user.createdAt.toString().substring(0, 25)}**`, inline: true },
      ],
      thumbnail: { url: 'https://i.imgur.com/onpsTBU.png' },
      footer: { text: '' }
    }
  })
})
}
if (message.content.startsWith(prefix + `members`)) {
  if (!message.guild) return;
  message.channel.send('', {
    embed: {
      color: 7506394,
      fields: [
        { name: 'Name:', value: `**${message.guild.name}**`, inline: false },
        { name: 'ID:', value: `**${message.guild.id}**`, inline: false },
        { name: 'Region:', value: `**${message.guild.region}**`, inline: false },
        { name: 'Owner:', value: `**${message.guild.owner}**`, inline: false },
        { name: 'Verification Level:', value: `${verificationLevels[message.guild.verificationLevel]}`, inline: false },
        { name: 'Content Filter:', value: `*${contentFilter[message.guild.explicitContentFilter]}*`, inline: false },
        { name: 'Roles:', value: `**${message.guild.roles.size}**`, inline: false },
        { name: 'Number of emojis:', value: `**${message.guild.emojis.size}**`, inline: false },
        { name: 'Member Count:', value: `**${message.guild.memberCount} (${message.guild.members.filter(m => m.presence.status === 'dnd' || m.presence.status === 'idle' || m.presence.status === 'online').size} online)**`, inline: false },
        { name: 'Bots:', value: `**${message.guild.members.filter(u => u.user.bot).size} (${Math.floor(message.guild.members.filter(u => u.user.bot).size / message.guild.members.size * 100)}%)**`, inline: true },
        { name: 'Humans:', value: `**${message.guild.members.filter(u => !u.user.bot).size} (${Math.floor(message.guild.members.filter(u => !u.user.bot).size / message.guild.members.size * 100)}%)**`, inline: true },
        { name: 'Voice/AFK Channels:', value: `**${message.guild.channels.filter(m => m.type === 'voice').size}**${message.guild.afkChannelID ? ` [<#${message.guild.afkChannelID}> *(after ${message.guild.afkTimeout / 60}min)*` : 'None'}]`, inline: true },
        { name: 'Text Channels:', value: `**${message.guild.channels.filter(m => m.type === 'text').size}**`, inline: true },
        { name: 'Created at:', value: `**${message.guild.createdAt.toLocaleString()}**`, inline: true },
        { name: 'Days Since Creation:', value: `**${days.toFixed(0)}**`, inline: true },
        
      ],
      thumbnail: { url: `${message.guild.iconURL || `https://i.imgur.com/onpsTBU.png`}` },
    }
  })
}
if (message.content.startsWith(prefix + `info`)) {
  let uptime = secondsToString(process.uptime()).toString()  
  message.delete();
  message.channel.send('', {
    embed: {
      type: 'rich',
      description: '[This message will self-destruct in 20 seconds.](https://vk.com/waffen)',
      color: 7506394,
      fields: [
        { name: 'Used Memory', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: false },
        { name: 'Free Memory', value: `${((require('util').inspect(require('os').freemem())) / 1024 / 1024 / 1024).toLocaleString()}GB`, inline: false },
        { name: 'Total Memory', value: `${((require('util').inspect(require('os').totalmem())) / 1024 / 1024 / 1024).toLocaleString()}GB`, inline: false },
        { name: 'Version Nodejs', value: `${process.version.toString()}`, inline: false },
        { name: 'Users Online', value: `${client.users.size.toLocaleString()}`, inline: false },
        { name: 'Servers', value: `${client.guilds.size.toLocaleString()}`, inline: false },
        { name: 'Channels', value: `${client.channels.size.toLocaleString()}`, inline: false },
        { name: 'Ping', value: `${client.ping.toFixed(1)}ms`, inline: false },
      ],
      thumbnail: { url: 'https://i.imgur.com/onpsTBU.png' },
      footer: { text: `Uptime: ${uptime}` }
    }
  }).then(message => message.delete(20000));
}
if (message.content.startsWith(prefix +  'uptime')) {
  message.delete(message.author.lastMessageID);
  let uptime = secondsToString(process.uptime()).toString()
  message.channel.send(`${uptime}`).catch(e => console.log(e.stack));
}
if (message.content.startsWith(prefix +  `listem`)) {
  if (!message.guild) return;
  message.delete(message.author.lastMessageID);
    const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
    message.channel.send(emojiList || `On this server there is not one smiley 😩`);
  }
  if (message.content.startsWith(prefix +  `setstream`)) {
    let stream = args.join(" ");
    client.user.setGame(stream, 'http://twitch.tv/antimamba777');
    message.delete();
    message.channel.send('', {
        embed : {
            title: `Streaming info changed to ${stream}!`,
            color: 7506394,
            thumbnail: { url: 'https://i.imgur.com/onpsTBU.png' },
        }
    });
};

///////////////////////////////////////////////////////////////////////////////////////////
  if (message.content.startsWith(prefix + 'purge')) {
    const amount = parseInt(args[0]) + 1;
        if (isNaN(amount)) {
          return message.reply('that doesn\'t seem to be a valid number.');
        }
        else if (amount <= 1 || amount > 100) {
          return message.reply('you need to input a number between 1 and 99.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
          console.error(err);
          message.channel.send('there was an error trying to prune messages in this channel!');
        });
      }
  if (message.content.startsWith(prefix + 'ping')) {
    message.delete()
    message.channel.send(`Ping?`).then(msg => msg.edit(`Pong! (${client.ping.toFixed(1)}ms)`));
    } 
  if (message.content.startsWith(prefix +  'defaultavatar')) {
    message.delete(message.author.lastMessageID);
    message.channel.send({
      "embed": {
        "color": 7506394,
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
    if (message.content.startsWith(prefix +  'guildavatar')) {
      if (!message.guild) return;
    message.delete(message.author.lastMessageID);
    message.channel.send({
      "embed": {
        "color": 7506394,
        "title": "Avatar URL link",
        "url": message.guild.iconURL,
       "footer": {
        },
        "image": {
          "url": message.guild.iconURL ? message.guild.iconURL : `https://i.imgur.com/HpldFUv.gif`
        }
      }
    })
  }
  if (message.content.startsWith(prefix + 'avatar')) {
    message.delete(message.author.lastMessageID);
		if (!message.mentions.users.size) {
			return message.channel.send({
        "embed": {
          "color": 7506394,
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
		const avatarList = message.mentions.users.map(user => {
			return message.channel.send({
        "embed": {
          "color": 7506394,
          "title": "Avatar URL link",
          "url": user.displayAvatarURL,
         "footer": {
          },
          "image": {
            "url": user.displayAvatarURL
          }
        }
      })
		});
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
    while (i <= 20) {
      message.channel.send(`${message.content.substr(5)} ${i} = 20`);
      i++;
    }
    message.channel.send('end.');
  }
  if (message.content.startsWith(prefix + 'halp')) {
      message.delete(message.author.lastMessageID);
      let me = 'Loading.....';
        message.channel.send(me).then(msg => msg.edit(`= HELP =
• ` + prefix + `avatar :: => Исходная аватарка  (` + prefix + `avatar @user аватарка юзера)
• ` + prefix + `defaultavatar :: => Стандартная аватарка при регистрации 
• ` + prefix + `guildavatar :: => Аватарка сервера
• ` + prefix + `clear :: => Удалить последние сообщения (!1)
• ` + prefix + `purge :: => Удалить сообщения с 1-99 (!1)
• ` + prefix + `ping :: => Пинг
• ` + prefix + `listem :: =>  Список emoji смайликов канала
• ` + prefix + `uptime :: =>  Время работы
• ` + prefix + `typing :: => AlwaysTyping
• ` + prefix + `typingstop :: => Stop AlwaysTyping
• ` + prefix + `username :: => Изменить имя пользователя (!2)
• ` + prefix + `setstream :: => Изменить статус 
• ` + prefix + `info :: => Информация о боте
• ` + prefix + `members :: => Информация про сервер
• ` + prefix + `userinfo :: => Информацию о пользователе
• ` + prefix + `spam :: => Спам сообщениями (20) (` + prefix + `spam @user спам с уведомлениями)
• ` + prefix + `halp :: => Помощь\n
(!1)Команда предназначена для бота (Если seflbot) Либо "You can only bulk delete messages that are under 14 days old.".\n(!2) Имя пользователя можно менять только 2 раза за 1 час.
`, {code: "asciidoc"}));
      } 
});

client.login(process.env.BOT_TOKEN);
