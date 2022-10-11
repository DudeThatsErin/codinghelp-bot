const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ee = require('../config/embed.json');
const { ButtonPaginator } = require('@psibean/discord.js-pagination');

module.exports = {
	name: 'help',
	description: 'This allows users to find out more information on all of our commands.',
	options: [
		{
			name: 'commandname',
			description: 'Type command name here or leave blank to see all commands.',
			required: false,
			type: 3
		}
	],
	usage: '/help or /help [command name here]',
	async execute(interaction, client) {
		const pages = [];
		const roleColor = 0x008080;

		const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Our Website')
        .setStyle(5)
        .setURL('https://codinghelp.site'),
      new ButtonBuilder()
        .setLabel('Our Subreddit')
        .setStyle(5)
        .setURL('https://reddit.com/r/CodingHelp')
    );

		const createCommandHelpEmbed = ({
			roleColor,
			title,
			description = `These are all of the commands r/CodingHelp can do. If you want to get more information you can do \`/help <command>\`.`,
			fields }) => {
				return new EmbedBuilder()
					.setColor(roleColor)
					.setTitle(title)
					.setDescription(description)
					.addFields(fields)
			};

		const embed1 = createCommandHelpEmbed({
			roleColor,
			title: 'Help Menu - General Commands',
			fields: [
				{
					name: 'These are the general commands. By general, we mean commands that are **not** slash commands.',
					value: '```css\nreport\nuser-info\nserver-info\nflip\nreddit\ntech\ninvite\nping\navatar\n```'
				},
				{
					name: 'These are the commands that have to do with message issues. You can use these commands by replying to someone\'s message as well.',
					value: '```css\ngettinganswers\nnoscreens\nfaq\ntry\nhire\nbin\ndocs\nelaborate\nerror\nformat\njust-ask\npatience\nshare-code\nwiki\nwrong-channel\n```'
				}
			]
		});

		const embed2 = createCommandHelpEmbed({
			roleColor,
			title: 'Help Menu - Informative Commands',
			fields: [
				{
					name: 'These are the informative commands. By informative, we mean commands that provide some kind of information whether it be a link or general information.',
					value: '```css\nfreelance\ncareer\nw3schools\nd.js\nd.py\webassembly\nreactiflux\nerror\nddev\neditors\ndom-listening\ndjslangfirst\nsmallhosting\nlargehosting\nnojquery\n```'
				},
			]
		});

		const embed3 = createCommandHelpEmbed({
			roleColor,
			title: 'Help Menu - Slash Commands',
			fields: [
				{
					name: 'These are all of our slash commands. This means that you type `/` before the command name to access them.',
					value: '```css\nhelp\n```'
				}
			]
		});

		const embed4 = createCommandHelpEmbed({
			roleColor,
			title: 'Help Menu - Moderator Only Commands',
			fields: [
				{
					name: 'These are general **moderator** only commands. Meaning only **moderators** can use these commands.',
					value: '```css\ndm\nrules\npartner\nserver-status\nsub-status\nbot-status\nsite-status\nlines\n```'
				}
			]
		});

		const embed5 = createCommandHelpEmbed({
			roleColor,
			title: 'Help Menu - Suggestion System Commands',
			fields: [
				{
					name: 'These are commands any user can use for our Suggestions System.',
					value: '```css\nsuggestions\neditsugg\nstatussugg\n```'
				}, {
					name: 'These are our **moderator** only commands for our Suggestions System.',
					value: '```css\nprog-sugg\ndenied-sugg\ncompletedsugg\n```'
				}
			]

		});

		const embed6 = createCommandHelpEmbed({
			roleColor,
			title: 'Help Menu - Thanks System Commands',
			fields: [
				{
					name: 'These are the commands you can use for our Thanks System. You can use these commands by replying to someone\'s message as well.',
					value: '```css\nthanks\nunthanks\nthanks-on\nthanks-off\nthanks-leaderboard\n```'
				}
			]
		})

		const embed7 = createCommandHelpEmbed({
			roleColor,
			title: 'Help Menu - Challenge System Commands',
			fields: [
				{
					name: 'These are commands any user can use for our Challenge System.',
					value: '```css\nsubmit\nedit-submission\nchallenge-leaderboard\n```'
				}, {
					name: 'These are our **moderator** only commands for our Challenge System.',
					value: '```css\nadd-members\nadd-users\ncheck-participants\nremove-participant\nstart-challenge\nchallenge\nedit-challenge\ncheck-submissions\nreviewed\npurge-submissions\nend-challenge\n```'
				}
			]
		});

		pages.push([embed1, embed2, embed3, embed4, embed5, embed6, embed7]);

		let cmdd = interaction.options.getString('commandname');
		//console.log('cmdd',cmdd)

		if (cmdd) { //WORKS

			const cmd = client.slashCommands.get(cmdd) || client.commands.get(cmdd) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdd));
			//console.log('cmd ',cmd)
			if (!cmd) return interaction.reply({ content: "That command could not be found!", ephemeral: true });

			const emb = new EmbedBuilder()
				.setColor(roleColor)
				.setTitle(`Help for \`${cmd.name}\``);
			if (cmd.description) {
				emb.setDescription(cmd.description);
			} else {
				emb.setDescription("No description could be found");
			}
			if(cmd.aliases) {
				if (Array.isArray(cmd.aliases) && cmd.aliases.length > 0) {
					emb.addFields({name: "Aliases", value: cmd.aliases.join(", ")});
				}
			}
			if (cmd.cooldown) {
				emb.addFields({name:"You need to wait this long between usages of this command:", value: `${cmd.cooldown} seconds`})
			}
			if (cmd.usage) {
				emb.addFields({name: "Usage", value: cmd.usage});
			}
			if (cmd.example) {
				emb.addFields({name: "Example Usage", value: cmd.example});
			}
			if (cmd.ownerOnly) {
				emb.addFields({name: "THIS IS ONLY A COMMAND ERIN CAN USE. Right?", value: 'yes'});
			}
			if (cmd.modOnly) {
				emb.addFields({name: "This is a command only CodingHelp Moderators can use, right?", value: 'yes'});
			}
			if(cmd.challengeMods){
				emb.addFields({name: 'This is a command only Challenge Moderators can use, right?', value: 'yes'});
			}
			if(cmd.options){
				for(i = 0; i < cmd.options.length; i++){
					//console.log('i ', cmd.options)
					emb.addFields({name: `These are the additional fields for this command:`, value: `Option Name: ${cmd.options[i].name}\nDescription: ${cmd.options[i].description}\nIs this option required? ${cmd.options[i].required}`});
				}
			}
			if (cmd.note) {
				emb.addFields({name: "Note:", value: cmd.note});
			}
			emb.addFields({name: 'You can also view all of our commands on our website:', value: 'https://codinghelp.site/r-CodingHelp-Bot-s-Commands-b0c601c559a14d5d936426c98b51193d'})
			emb.setFooter({ text: ee.footertext, iconURL: ee.footericon });
			//console.log(emb.toJSON());

			interaction.reply({ embeds: [emb], components: [row], ephemeral: true })

		} else {
			//  const buttonPaginator = new ButtonPaginator(interaction, { pages });
			//  await buttonPaginator.send();

			interaction.reply({ content: `The commands are listed on our website. Check this link: <https://codinghelp.site/r-CodingHelp-Bot-s-Commands-b0c601c559a14d5d936426c98b51193d>`, components: [row], ephemeral: true})
		}

	},
};