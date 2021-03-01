const { prefix, config } = require('../config.json');
const Discord = require("discord.js");

const helpEmbed1 = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help Menu')
    .setDescription('Use `++help <command>` for more information.')
    .addFields(
        { name: 'Messages', value: '```css\nelaborate\njustask\nshare-code\nfaq\nrequests\npatience\nwrong-channel\nformat\nbin\nmods\nwiki\ndocs\nrules\nsuggestions```', inline: true },
		{ name: 'Utilities', value: '```css\navatar\nhelp\ninvites\nchk-invites\nchannels\n```', inline: true },
		/*{ name: 'Contests/Challenges', value: '```css\ncontest-leaderboard\naddpoints\naddchallenge\nsubmitchallenge\nsubmit\n```', inline: true },*/
		{ name: 'Moderator Only Commands', value: '```css\nserver\npartners\nban\nunban\nmute\nunmute\nprune\nping\nprog-sugg\ncomplete-sugg\ndenied-sugg\n```', inline: true },
    );

	module.exports = {
		name: 'help',
		description: 'Displays all information regarding commands',
		aliases: ['h', 'halp', 'commands'],
		usage: '++help or ++help [command name]',
		inHelp: 'yes',
		execute(message, args) {

		if(args.length > 0) {

			const cmd = message.client.commands.get(args[0]) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

			if(!cmd) return message.channel.send("That command could not be found!");

			if(!cmd.inHelp) return message.channel.send("No help for that command could be found!");

			else{
				const emb = new Discord.MessageEmbed().setColor('#0099ff').setTitle(`Help for \`${cmd.name}\``);
				if(cmd.description){
					emb.setDescription(cmd.description, true);
				}else{
					emb.setDescription("No description could be found");
				}
				if(cmd.usage){
					emb.addField("Usage", cmd.usage, false);
				}
				if(cmd.aliases){
					emb.addField("Aliases", cmd.aliases.join(", "), false);
				}
				message.author.send(emb).catch(async err => {
					message.channel.send(`Hey ${message.user.username}, it looks like you have your DMs closed. So I am displaying the command here.`);
					message.channel.send(emb);
				});;
			}
		}else{
			message.author.send(helpEmbed1).catch(async err => {
				message.channel.send(`Hey ${user}, it looks like you have your DMs closed. So I am displaying the command here.`);
				message.channel.send(helpEmbed1);
			});;
		}
		if(message.channel.type !== "dm") {
			message.channel.send('📨 Please check your DMs! I sent you a message with our help command!').catch(async err => {
				message.channel.send(`Hey ${user}, it looks like you have your DMs closed. So I am displaying the command here.`);
				message.channel.send(helpEmbed1);
			});
		} else {
		}
		},
		
	};