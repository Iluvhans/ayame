let fetch = require("node-fetch")

let handler = async (m, { conn, text }) => {
  let res = await fetch(global.API('https://meme-api.herokuapp.com', '/gimme/' + encodeURI(text || ''), {}))
  await m.reply(global.wait)
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.url) throw 'Media tidak ditemukan!'
  await conn.sendFile(m.chat, json.url, text, json.title, m, false, { thumbnail: Buffer.alloc(0) })
}
//handler.help = ['subreddit <query>']
//handler.tags = ['internet']
handler.command = /^(sr|subreddit)$/i
handler.register = false
handler.limit = 3

module.exports = handler
