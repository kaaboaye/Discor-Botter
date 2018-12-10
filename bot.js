"use strict"

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

let banChannel = 0;

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', async message => {
  // If the message is "ping"
  if (message.content === '!ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }

    else if(message.content === '!avatar'){
        message.reply(message.author.avatarURL);
    }

    else if(message.content === '!hi'){
        message.channel.send('hi ' + message.author.username);
        message.react('💩');
    }

    else if(message.content.startsWith('!say') && !message.author.bot)
    {
        console.log('!say');

        const string = message.content;
        const s = string.substr('!say'.length);

        message.channel.send(s);
    }

    else if(message.content.startsWith('!del')){
        console.log('del');
        
        const string = message.content.split(' ');

        if(string.length == 2)
        {
            const amount = parseInt(string[1]);

            if(Number.isInteger(amount))
            {
                if(amount > 50 || amount < 0){
                    message.channel.send('Maksymalnie 50 wiadomosci na raz!!!1one')
                }
                else{
        
                    message.channel.bulkDelete(amount + 1);
                    const msg = await message.channel.send('Usunieto ' + amount + ' wiadomosci');
                    msg.delete(5000);
                }
            }
            else
            {
                const msg = await message.channel.send(' `!del [liczba wiadomosci do usuniecia]` ');
                msg.delete(10000);
                message.delete(10000)
                
            }
        }
        else
        {
            const msg = await message.channel.send(' `!del [liczba wiadomosci do usuniecia]` ');
            msg.delete(10000);
            message.delete(10000)
        }
    }

    else if(message.content === '!pinned')
    {
        const messages = await message.channel.fetchPinnedMessages();
        messages.forEach(m => message.channel.send(m.content))

        if(messages.size == 0)
        {
            const msg = await message.channel.send('Brak przypietych wiadomosci');
            msg.delete(5000);
            message.delete(5000);
        }
    }

    else if(message.content.startsWith('!set'))
    {
        const string = message.content.split(' ');

        if(string.length == 2)
        {
            if(string[1] == '!ban')
            {
                banChannel = message.channel;

                const msg = await banChannel.send('Ban logs will be displayed here!')
                msg.delete(5000);
                message.delete(5000);
            }
        }
    }


    else if(message.content.startsWith('!ban'))
    {
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        
        const string = message.content.split(' ');
        let reason = '';

        for(let i = 2; i < string.length; i++)
        {
            //reason.concat(string[i]); 
            console.log(string[i]);
            reason = reason + " " + string[i];
        }

        if(user)
        {
            if(member)
            {
                if(banChannel)
                {
                    //member.kick();

                    banChannel.send('** Banned: **' + user + '\n **By: **' + message.author + '\n **Reason: **' + reason);
                }
                else
                {
                    message.channel.send('** Banned: **' + user + '\n **By: **' + message.author + '\n **Reason: **' + reason);
                }
            }
        }
    }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NTE1ODQ2MDAzMjc5MTM0NzIw.Dtsy9A.b3GAb61PO2eUmd52YUd6w7GczAo');