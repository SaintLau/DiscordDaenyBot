//Set the server up
const express = require ('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


// =========== Bot Comes To Life ===========
  //The variables:
const Discord = require('discord.js'); //import library
const fetch = require('node-fetch');
const Database = require("@replit/database"); //Set Database here on replit

const db = new Database();
const client = new Discord.Client(); 


const sadWords = [
  "throne",
  "you",
  "dragon",
  "men",
  "fire",
  "wheel",
  "queen",
  "lie",
  "mine",
  "yours",
  "advice",
  "reign",
  "begun",
  "hello",
  "hi",
  "how are you",
  "bye"
]

const starterEncouragements = [
  "All men must die, but we are not men.",
  "I will answer injustice with justice.",
  "Woman? Is that meant to insult me? I would return the slap if I took you for a man.",
  "It seems to me that a queen who trusts no one is as foolish as a queen who trusts everyone.",
  "I am not your little princess.",
  "I am no ordinary woman. My dreams come true.",
  "I will not lie with you. And I will bear no children, for you, or anyone else.",
  "You promised me, 'My sword is yours. My life is yours.' This is what I command.",
  "I said farewell to a man who loves me. A man I thought I cared for. And I felt nothing. Just impatient to get on with it.",
  "Dont ever presume to touch me again or speak my name.",
  "I'm not going to stop the wheel, I'm going to break the wheel.",
  "If I look back, I am lost.",
  "I will take what is mine with fire and blood.",
  "The next time you raise a hand to me will be the last time you have hands.",
  "I will do what queens do. I will rule.",
  "I value your advice, but if you ever question me in front of strangers again, you'll be advising someone else. Is that understood?",
  "My reign has just begun.",
  "I am Daenerys Stormborn, of House Targaryen, of the blood of Old Valyria – I am the Dragon’s Daughter. And I swear to you, that those who would harm you will die screaming.",
  "And I swear this. If you ever betray me, I’ll burn you alive.",
  "You’re both here to advise me. I value your advice, but if you ever question me in front of strangers again, you’ll be advising someone else. Is that understood?",
  "Fire cannot kill a dragon.",
  "They can live in my new world or they can die in their old one",
  "Dracarys.",
  "The next time you raise a hand to me will be the last time you have hands.",
  "The Iron Throne is mine and I will take it.",
  "I’m not going to stop the wheel. I’m going to break the wheel."
]

//Add encouragements to database:
db.get("encouragements").then(encouragements => {
  //console.log(encouragements)
  if (!encouragements || encouragements.length < 1) {
    db.set("encouragements", starterEncouragements)
  }
})

db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true)
  }
})

//Function so users are able to add custom encouraging messages for the bot to use on the chat AND ALSO delete them

function updateEncouragements(encouragingMessage) { //gets encouragements from db and adds a new one to array, stores and update
  db.get("encouragements").then(encouragements => {
    encouragements.push([encouragingMessage])
    db.set("encouragements", encouragements)
  })
}

function deleteEncouragement(index) { // If the length is more than the index, then the list item at that index is deleted
  db.get("encouragements").then(encouragements => {
    if (encouragements.length > index) {
      encouragements.splice(index, 1) //splice is used to remove something from arrays
      db.set("encouragements", encouragements)
    }
  })
}

//Get quotes from API
function getQuote(){
  return fetch("http://zenquotes.io/api/random")
  .then(res => {
    return res.json()
  })
  .then(data => {
    return data[0]["q"] + " -" + data[0]["a"]
  })
}

//from the api quotes
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.author.bot) return

  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }

db.get("responding").then(responding => {
  if (responding && sadWords.some(word => msg.content.includes(word))) {
    db.get("encouragements").then(encouragements => {
      const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
      msg.reply(encouragement)
    })
  }
})

if (msg.content.startsWith("$new")) {
  encouragingMessage = msg.content.split("$new ")[1]
  updateEncouragements(encouragingMessage)
  msg.channel.send("New encouraging message added.")
}

if (msg.content.startsWith("$del")) {
  index = parseInt(msg.content.split("$del ")[1]) //parse is to convert from string to number
  deleteEncouragement(index)
  msg.channel.send("Encouraging message deleted.")
}

if (msg.content.startsWith("$list")) {
  db.get("encouragements").then(encouragements => {
    msg.channel.send(encouragements)
  })
}

if (msg.content.startsWith("$responding")) {
  value = msg.content.split("$responding ")[1]

  if (value.toLowerCase() == "true") {
    db.set("responding", true)
    msg.channel.send("Responding is on.")
  } else {
    db.set("responding", false)
    msg.channel.send("Responding is off.")
  }
} 

})


client.login(process.env.DISCORD_TOKEN);

