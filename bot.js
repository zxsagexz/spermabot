const Discord = require('discord.js');
const client = new Discord.Client();
/*const hook = new Discord.WebhookClient('369098418767003648', 'jS16WdUKcK82waymnUkXljnx8iPR7Ff9l_Dpla7NZYY9RSg4k5HBwKJwsr9cYJhDGo7n');
hook.send('I am now alive!');
*/

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === '!picture') {
    message.reply(message.author.avatarURL);
  }
});

client.on('message', message => {
  if (message.content === '!ping') {
    message.reply('Pong! Your ping is sperma');
  }
});

/*
client.on('ready', () => {
client.user.setGame('ʕ•́ᴥ•̀ʔ СПЕРМА ХУЙ ГОВНО', 'https://www.twitch.tv/antimamba777');
});
*/

client.on('ready', () => {
    var games = [
        `${client.guilds.size} Servers`,
        `${client.users.size} Users`,
        `${client.channels.size} Channels`
    ];
    client.user.setPresence({ game: { name: `${prefix}help | ${games[Math.round(Math.random()*games.length)]}`, type: 0 } });
    client.user.setUsername('KhanBot');
    console.log('I am ready Jett!');
    console.log(`I have started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  
    setInterval(function() {
        totalTime++;
    }, 1);
    
    //client.user.setGame({name: prefix + 'help'});
    //client.user.setGame({type: 1, name: prefix + "help", url: ""});
    //client.user.setStatus(status[Math.round(Math.random()*2)]);
});

client.on('message', function(message) {
    if (message.content == "!clear") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
