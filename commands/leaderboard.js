const client = require("discord.js");

module.exports = {
    name: 'leaderboard', 
    description: 'This is how you can check the top 10 people on the leaderboard.', 
    aliases: ['ldrbd', 'top10', 'top'], 
    usage: '++leaderboard',
    inHelp: 'yes',
    execute(message, args) {
  
            // Get a filtered list (for this guild only), and convert to an array while we're at it.
            const filtered = client.points.filter( p => p.guild === message.guild.id ).array();
          
            // Sort it to get the top results... well... at the top. Y'know.
            const sorted = filtered.sort((a, b) => b.points - a.points);
          
            // Slice it, dice it, get the top 10 of it!
            const top10 = sorted.splice(0, 10);
          
            // Now shake it and show it! (as a nice embed, too!)
            const embed = new Discord.MessageEmbed()
              .setTitle("Leaderboard")
              .setAuthor(client.user.username, message.guild.iconURL())
              .setDescription("Our top 10 points leaders!")
              .setColor(0x00AE86);
            for(const data of top10) {
              try {
                embed.addField(client.users.cache.get(data.user).tag, `${data.points} points (level ${data.level})`);
              } catch {
                embed.addField(`<@${data.user}>`, `${data.points} points (level ${data.level})`);
              }
            }
            return message.channel.send({embed});

    }, // End Execute
    
  }; // End module.exports