const { SlashCommandBuilder }  = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('sorceror')
        .setDescription('Replies with fortify your minds!'),
    async execute(interaction){
        await interaction.reply('FORTIFY YOUR MINDS!');
    }
};