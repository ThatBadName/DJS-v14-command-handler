const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDMPermission(false)
    .setDescription('Evaluate some code')
    .addStringOption(option => 
        option.setName('code')
        .setDescription('The code to eval')
        .setRequired(true)
        ),

    async execute(interaction, client) {
        let code = interaction.options.getString('code')
        let evaled = eval(code)
        if (!typeof evaled == "string") evaled = require("util").inspect(evaled)

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle('Result')
                .setColor('0xa477fc')
                .setDescription(`\`\`\`js\n${evaled.replaceAll(client.token, '[Redacted]')}\n\`\`\``)
            ]
        })
    }
}