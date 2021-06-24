# DiscordDaenyBot
Just a small project in Javascript, where a Discord Bot was created.

The bot replies with sentences that the character Daenerys Targareyn says in the show Game Of Thrones. The sentences were inserted by hand because I haven't found an API with them (still looking for one).

The code was made in Replit (http://replit.com) and you can take a look here in my profile (https://replit.com/@SaintLau).

To do this, you also need a Discord account (can create one here: https://discord.com). After you log in, you can go to user settings (little icon at the bottom of the screen, next to phones icon), APP SETTINGS and Advanced. There, you will turn on the "Developer Mode". Click on "Discord API" and you are redirect to a page. 

On that page, you have access to the API for some guidelines that you may want to use. On the left side, you will see "Intro". Click there and you will see "Bots and Apps" and click "Make an App". From there, click "New Application", give a name to your project and you will go to the "General Information" page.

In the Discord App, I created a channel to be able to test the bot, you can do the same. I did this due to the fact that you will be asked to add the bot somehwere, like this:
- In the "General Information" page, go to "Bot" (left side), give him/her/it a name and copy the Token.
- Go to "OAuth2" and select, in "scopes" - "bot".
- "Bot permissions" will show up and select: on "General Permissions" - "View Channels". On "Text Permissions" check everything except "Send TTS Messages"
- The link above the "Bot Permissions" is not set and copy and paste it in your browser. This will ask you where you want to have the bot, so select the channel you want to have the little bot.

Okay, all set from Discord! As I said, I coded using Replit, an online IDE, because it is really usefull for this project. So let's go!

On replit, create a "New repl" and choose "node.js". Your IDE is ready to be used! Replit is really cool because it install the dependences you need as you require them, allows you to have the secrets and even a database, which is awesome! 

So, remember when I mention that you should copy the token from your Discord bot? We will use it now. Go to the lock symbol to add the key. Write "DISCORD_TOKEN" in key and copy paste teh token to the value. That's only it 😊

Write your code in the "index.js" file (I also set a server to check if it was working). 

Replit is an online IDE and is great because you can keep your bot alive while you the code running there, but as always, there is a little bit of a downside and if you don't keep pinging the channel, your bot friend will go to sleep. So, to prevent that, we will create something really cool! Go to the website www.uptimerobot.com and create an account (it's free), click "+ Monitor", on monitor type choose "HTTP", paste the replit url where you have your code, choose the "Monitoring Interval" (I have mine for each 5 minutes) and you gave life to your bot 🤖!! 
