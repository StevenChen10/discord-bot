require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Message } = require('discord.js');
const fetch = require('node-fetch');

const data = new SlashCommandBuilder()
    .setName("claninfo")
    .setDescription("gets the info of player's clan")
    .addStringOption((option) => option
        .setName("clan")
        .setDescription("clan tag")
    .setRequired(true)
    );

const options = {
    headers: { Authorization : 'Bearer '  + process.env.clash}
};

module.exports = {
    data,
    async execute(interaction){
        const clanTag = interaction.options.getString("clan");
        let clanName;
        let clanType;
        let clanId;
        if(clanTag[0] == "#"){
            const encoded = encodeURIComponent(clanTag);
            await fetch(`https://api.clashofclans.com/v1/clans/${encoded}`,options)
            .then(response => {
                if(!response.ok){
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(response => {
                clanId = response.tag;
                clanType = response.type;
                clanName = response.name;
            })
        }
        else {
            throw new Error(`No hashtag was in the input`);
        }
        const embed = new MessageEmbed()
            .setColor('#1234')
            .setDescription("Clan Stats")
            .addFields(
                {name: 'Name', value: `${clanName}`, inline : true},
                {name: 'Clan Tag', value: `${clanId}`, inline : true},
                {name: 'Clan Type', value: `${clanType}`,inline :true}
            )
            return interaction.reply({
                embeds : [embed],
                empheral: false,
            });
    },
};