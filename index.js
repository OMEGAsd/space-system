const {
  Discord,
  ModalBuilder,
  Permissions,
  Intents,
  Client,
  MessageEmbed,
  MessageAttachment,
  Collection,
  Collector, // npm install discord-modals
  MessageCollector,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu
} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const discordModals = require("discord-modals");
discordModals(client);
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals');
client.on("ready", () => {
  const commands = [
    {
      name: "ping",
      description: "ping"
    },
    {
      name: "hello",
      description: "hi"
    },
    {
      name: "modal",
      description: "hi"
    }
  ]
  const rest = new REST({ version: '9' }).setToken(`OTQyODIyMjM4OTg4NjY4OTI4.G5v5aj.6uePLGw22A2LqlI2sS4C7kUW_13w1JnilOtajY`);

  (async () => {
    try {
      await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: commands },
      );

      console.log("Done Run ApplicationCommands");
    } catch (error) {
      console.error(error);
    }
  })();
})
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  await interaction.deferReply()


  if (interaction.commandName == "ping") {
    await interaction.editReply("3414")
  }

  if (interaction.commandName == "hello") {
    await interaction.editReply("hi")
  }
  if (interaction.commandName == "modal") {
    await interaction.channel.send("modal")
  }
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'staff-apply-nemss') {
      const c1 = new TextInputComponent().setCustomId('staff-apply-c1').setLabel('اسمك').setStyle('SHORT').setMinLength(4).setMaxLength(12).setPlaceholder('يرجى عدم وضع اسماء مستعارة').setRequired(true)
      const c2 = new TextInputComponent().setCustomId('staff-apply-c2').setLabel('العمر').setStyle('SHORT').setMinLength(1).setMaxLength(2).setPlaceholder(' يرجى كتابة عمرك الحقيقي ').setRequired(true)
      const c3 = new TextInputComponent().setCustomId('staff-apply-c3').setLabel('خبراتك بالدسكورد').setStyle('LONG').setMinLength(20).setMaxLength(500).setPlaceholder('يرجى وضع خبراتك بشكل عام وعدم الكذب').setRequired(true)
      const c4 = new TextInputComponent().setCustomId('staff-apply-c4').setLabel('مدة تفاعلك بلدسكورد').setStyle('SHORT').setMinLength(10).setMaxLength(100).setPlaceholder(' يمكنك كتابة بعدد الساعات ').setRequired(true)
      const c5 = new TextInputComponent().setCustomId('staff-apply-c5').setLabel('هل كنت بسيرفر إداري قبل ام لا').setStyle('LONG').setMinLength(0).setMaxLength(500).setPlaceholder('( هذا الحقل غير مطلوب )').setRequired(false).setDefaultValue('لا')
      const modal = new Modal()
        .setCustomId('staff-apply')
        .setTitle('Staff Apply')
        .addComponents([c1], [c2], [c3], [c4], [c5])
      showModal(modal, {
        client,
        interaction,
      });
    }
  }
});

client.on('modalSubmit', async (modal) => {
  if (modal.customId === 'staff-apply') {
    const c1 = modal.getTextInputValue('staff-apply-c1');
    const c2 = modal.getTextInputValue('staff-apply-c2');
    const c3 = modal.getTextInputValue('staff-apply-c3');
    const c4 = modal.getTextInputValue('staff-apply-c4');
    const c5 = modal.getTextInputValue('staff-apply-c5');
    const embed = new MessageEmbed()
      .setAuthor({ name: `${modal.user.tag}`, iconURL: modal.member.displayAvatarURL() })
      .setColor(`GREEN`)
      .setTimestamp()
      .addFields(
        {
          name: "الاسم",
          value: `\`\`\` ${c1} \`\`\``,
          inline: false
        },
        {
          name: "العمر",
          value: `\`\`\` ${c2} \`\`\``,
          inline: false
        },
        {
          name: "خبرات الدسكورد",
          value: `\`\`\` ${c3} \`\`\``,
          inline: false
        },
        {
          name: "مدة التفاعل",
          value: `\`\`\` ${c4} \`\`\``,
          inline: false
        },
        {
          name: "هل كنت اداري في سيرفر اخر ؟",
          value: `\`\`\` ${c5} \`\`\``,
          inline: false
        },
        {
          name: "هوية الشخص",
          value: modal.user.id,
          inline: true
        },
        {
          name: "دعوة للشخص",
          value: `<@${modal.user.id}>`,
          inline: true
        }
      )
    if (modal.guild.id === `907401783364698142`) {
      embed.setThumbnail(`https://cdn.discordapp.com/attachments/1027220455117033563/1027228231042080809/cae7128defa9bae5bc7c33f974f181d9.png`)
      modal.guild.channels.cache.get(`1025774995332411432`).send({ embeds: [embed] })
    }
  }
});
client.on(`messageCreate`, msg => {
  if (!msg.content.startsWith(`!`) || msg.author.bot) return;

  const args = msg.content.slice(`!`.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === `embed`) {
    if (msg.author.id != `758693696089620570`) { msg.reply('you are not the bot devloper'); return; }

    const embed = new MessageEmbed()
      .setTitle(msg.guild.name)
      .setDescription(`Staff  Apply\n\`\`\`[ بسم الله الرحمن الرحيم ]\`\`\`
    \`\`\`تمت اضافة نظام تقديم جديد على الادارة لاي شخص حاب يقدم يمكنك وضع زر\nالتقديم في الاسفل \`\`\`
    \`\`\` اي شخص ما جاه رد خلال يوم يقدر يقدم مرة ثانيه \`\`\`
    \`\`\` ممنوع الاستهبال بالتقديم و التقديم مرتين  \`\`\`
     `)
      .setColor(`GREEN`)
      .setImage(`https://cdn.discordapp.com/attachments/1027220455117033563/1027220774022565999/unknown.png`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/1027220455117033563/1027228231042080809/cae7128defa9bae5bc7c33f974f181d9.png`)
      .setTimestamp()

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('staff-apply-nemss')
          .setLabel('التقديم')
          .setStyle('SUCCESS'),
      );

    msg.delete();
    msg.channel.send({ embeds: [embed], components: [row] });
  }
});

client.login(token)
