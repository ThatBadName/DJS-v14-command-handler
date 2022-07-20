const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDMPermission(false)
    .setDescription('Pong! Get the bots ping'),

    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        })

        interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setTitle('Pong!')
                .setColor('0xa477fc')
                .setFields({
                    name: 'API Latency',
                    value: `\`${client.ws.ping}\`ms`,
                    inline: true
                }, {
                    name: 'Client Ping',
                    value: `\`${message.createdTimestamp - interaction.createdTimestamp}\`ms`
                })
            ]
        })
    }
}