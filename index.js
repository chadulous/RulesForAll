require('dotenv').config();
const OPCommands = require("opcommands");
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: []
});

const handler = new OPCommands(client, {
    commandsDir: "commands", // your commands' directory
    eventsDir: "events", // your events' directory
    testGuildID: "GUILD_ID", // the ID of the Test Server
    testMode: false, // should OPCommands start in test mode (guild only)?
    logs: true, // should OPCommands log its actions?
    notifyOwner: true // should OPCommands notify the bot owner when the bot goes online?
});
handler.setBotOwner("OWNER_ID"); // sets the bot's owner(s), can be an array or a string
handler.setMessages({
    ownerOnly: (interaction) => interaction.reply("Missing **Bot Owner** permission."),
    permissions: (interaction, perms) => interaction.reply(`You are missing the following permissions: **${perms.join(", ")}**`),
    cooldown: (interaction, cooldown) => interaction.reply(`You must wait **${cooldown}** before executing another command.`),
    notifyOwnerMessage: (owner) => owner.send("I'm online!")
}); // sets the limit messages, not required

client.login(process.env.BOT_TOKEN);