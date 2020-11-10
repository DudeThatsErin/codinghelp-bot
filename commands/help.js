const { prefix, config } = require('../config.json');
const Discord = require("discord.js");

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help Menu')
    .setDescription('Use `++help <command>` for more information.')
    .addFields(
        { name: 'Rules', value: '```css\nrule1\nrule2\nrule3\nrule4```', inline: true },
        { name: 'Messages', value: '```css\nelaborate\njustask\nshare-code\nfaq\nhire\npatience```', inline: true },
        { name: 'Utilities', value: '```css\nhelp\nping\nprune\n```', inline: true },
    );

	module.exports = {
		name: 'help', // name the command something
		description: 'Displays all information regarding commands', // Describe your command; shows this with the help command
		aliases: ['h', 'halp', 'commands'], // Include if you have other names you want to use for this command as well.
		usage: '[command name]',
		inHelp: 'yes',
		execute(message, args) {
		if(args.length > 0) {
			const cmd = message.client.commands.get(args[0]) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
			if(!cmd) return message.channel.send("That command could not be found!");
			if(!cmd.inHelp) return message.channel.send("No help for that command could be found!");
			else{
				const emb = new Discord.MessageEmbed().setColor(16773617).setTitle(`Help for \`${cmd.name}\``);
				if(cmd.descripton){
					emb.setDescription(cmd.descripton);
				}else{
					emb.setDescription("No description could be found");
				}
				if(cmd.usage){
					emb.addField("Usage", cmd.usage, true);
				}
				if(cmd.aliases){
					emb.addField("Aliases", cmd.aliases.join(", "), true);
				}
				if(cmd.aliases && command.aliases.length > 0){
					const aliases = "```\n";
					cmd.aliases.forEach(alias => {
						useage += alias;
					});
					aliases += "```";
					emb.addField("Aliases", aliases, false);
				}
				message.channel.send(emb);
			}
		}else{
			message.channel.send(helpEmbed);
		}
	
		},
		
	};