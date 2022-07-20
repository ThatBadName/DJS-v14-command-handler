const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDMPermission(false)
    .setDescription('Need some help?')
    .addStringOption(option =>
        option.setName('command')
        .setDescription('The command to get more info on')
        .setRequired(false)
        ),

        
    async execute(interaction, client) {
        const {
            commandArrayGlobal
        } = client

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle('Command List')
                .setColor('0xa477fc')
                .setFields({
                    name: 'All Commands',
                    value: `${commandArrayGlobal.map(command => `\`${command.name}\``).join(', ')}`
                })
            ],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Invite Me!')
                    .setStyle('Link')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=994644001397428335&permissions=1644935244887&scope=applications.commands+bot'),

                    new ButtonBuilder()
                    .setLabel('Support Server')
                    .setStyle('Link')
                    .setURL('https://discord.gg/9jFqS5H43Q'),

                    new ButtonBuilder()
                    .setLabel('Docs')
                    .setStyle('Link')
                    .setURL('https://thatbadname.gitbook.io/closed-construction/'),
                )
            ]
        })
    }
}