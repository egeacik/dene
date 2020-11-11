const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
let kayityetkili = '765857820007858196' //Yetkili
let codeariusver = '765459370258989076' //Verilecek
let uyever = "765459362918432768"
let codeariusal = '765459367851458570' //Alınacak
let isimön = '𝓖𝓞𝓕𝓣 | ' //İsmin önüne gelecek simge,tag    


  if(!message.member.roles.has(kayityetkili))  //CodeArius
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);
  let member = message.mentions.members.first()
  let isim = args[1]
  let yaş = args[2] //CodeArius
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await db.fetch(`kayıtlıisim_${member}`)
  let toplamaisim = `${isimön} ${isim} ${yaş}` //CodeArius
  if (!member) return message.channel.send('Bir üye etiketlemelisin.')
  if (!isim) return message.channel.send('Bir isim yazmalısın.')
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.') //CodeArius
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.')
  //CodeArius
  setTimeout(function(){
  member.setNickname(`${isimön} ${isim} | ${yaş}`)
  },1000)
    setTimeout(function(){
  member.addRole(codeariusver)
  },2000)
  setTimeout(function(){
  member.addRole(uyever)
  },3000)
  setTimeout(function(){
  member.removeRole(codeariusal)
  },4000)
 //CodeArius
let toplam = await db.fetch(`kayıttoplam_${message.author.id}`) + 1 || '0'
const emoji = client.emojis.find(emoji => emoji.name === "5_");

  if(kayıtlımı !== 'evet') {
  db.add(`kayıte_${message.author.id}`, 1)
  db.add(`kayıttoplam_${message.author.id}` , 1) //CodeArius
  db.set(`kayıtlıkişi_${member}`, 'evet')
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)  //CodeArius
  let embed = new Discord.RichEmbed()
  .setColor('BLUE')
  .setDescription(`${member} kişisinden <@&${codeariusal}> rolü alınıp <@&${codeariusver}> + <@&${uyever}> rolü verildi.

<@!${message.author.id}> **Kişisinin toplam** ${toplam} **adet teyiti oldu.**
`)
  .setAuthor(client.user.username, client.user.avatarURL)
  .setTimestamp()
  .setFooter('CodeArius.com')
  .setThumbnail("https://cdn.discordapp.com/icons/544527577768001538/a_1fa32517dd9fb1d265309255c635b2c0.gif")
message.channel.send(embed)
  }  //CodeArius
  if(kayıtlımı === 'evet'){
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.RichEmbed()
  .setColor('BLUE')
  .setDescription(` **Bu kişi daha önceden de kayıt edilmiş!**

**Kullanıcı daha önce bu isimle kayıt edilmiş!** \`${eskiismi}\``)
  .setAuthor(client.user.username, client.user.avatarURL)
  .setTimestamp()
  .setFooter('CodeArius.com')  //CodeArius
  .setThumbnail("https://cdn.discordapp.com/icons/544527577768001538/a_1fa32517dd9fb1d265309255c635b2c0.gif")
message.channel.send(embed)
  }
};  //CodeArius

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['erkek'],
  permLevel: 0
}
exports.help = {
  name: 'e',
  description: "erkek kullanıcıları kayıt etme komutu.",
  usage: 'erkek @kişi isim yaş'
}