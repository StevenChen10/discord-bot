require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Message } = require('discord.js');
const fetch = require('node-fetch');

const data = new SlashCommandBuilder()
    .setName("playerinfo")
    .setDescription("Provides information on a player's profile")
    .addStringOption((option) => option
    .setName("player")
    .setDescription("player tag")
    .setRequired(true)
    );
const options = {
   headers: { Authorization : 'Bearer '  + process.env.clash}
};
module.exports = {
    data,
    async execute(interaction){
        const player = interaction.options.getString("player");
        let name;
        let townhall;
        let builderHall;
        let attackwins;
        let trophy;
        let experience;
        let warStars;
        let response;
        tag = player.slice(1);
        if(player[0] == "#"){
            const encoded = encodeURIComponent(player);
            console.log(encoded);
            await fetch(`https://api.clashofclans.com/v1/players/${encoded}`,options)
            .then(response => {
                if(!response.ok){
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(response => {
                name = response.name
                townhall = response.townHallLevel;
                attackwins = response.attackWins;
                trophy = response.trophies;
                experience = response.expLevel;
                warStars = response.warStars;
                builderHall = response.builderHallLevel;
                barbKing = response.heroes[0];
                archerQueen = response.heroes[1];
                grandWarden = response.heroes[2];

            }
                )
        }
        else{
            throw new Error(`Hashtag required in input`);
        }
        const embed = new MessageEmbed()
            .setColor('#2ECC71')
            .setTitle(`Stats for ${name}`)
            .setDescription('Chrollo')
            .setURL(`https://www.clashofstats.com/players/${name}-${tag}`)
            .setThumbnail('https://i.kym-cdn.com/entries/icons/mobile/000/031/003/cover3.jpg')
            .addFields(
                {name: 'Townhall', value: `${townhall}`, inline: true},
                {name: 'Builder Hall', value: `${builderHall}`, inline: true},
                {name: '\u200B', value: '\u200B'}
            )
            .addFields(
                {name: 'Barbarian King Lvl', value: `${barbKing.level}`, inline: true},
                {name : 'Archer Queen Lvl', value : `${archerQueen.level}`, inline: true},
                {name: 'Grand Warden Lvl', value : `${grandWarden.level}`, inline: true}
            )
            .addFields(
            {name: 'Experience', value : `${experience}`, inline: true},
            {name: 'War Stars', value: `${warStars}`, inline: true},
            {name: 'Builder Hall', value: `${builderHall}`,inline:true}
            )
            return interaction.reply({
                embeds: [embed],
                empheral: false,
            });
    },
};


