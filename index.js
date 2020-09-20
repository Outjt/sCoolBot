const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const jsonfile = require('jsonfile')
var pacerA = [':flushed:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':checkered_flag:']
var xPo = 0;
var pax = 0;
client.once('ready', () => {
	console.log('Ready!');
});
var lap;
var stop;
var start;
var end;
var score;
var first = 100.00;
var second = 100.00;
var third = 100.00;
var mesg;
var firstHolder = 'Dummy#0001';
var secondHolder = 'Dummy#0001';
var thirdHolder = 'Dummy#0001';
var bool = 1;
var xpArray = [];
var levelArray = [];
var playerXpArray = [];
var moneyArray = [];
var playerMoneyArray = [];
var leaderboard = [first.toString(),firstHolder.toString(),second.toString(),secondHolder.toString(),third.toString(),thirdHolder.toString()];
client.on('message', msg => {

	if (msg.author.bot) return;
	const gameEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Gym')
.addField('FitnessGram PACER Test', pacerA, true)
.setFooter('**Made by Outjt#5616**');
  const args = msg.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();
	const playerLevel = levelArray[playerXpArray.indexOf(msg.member.id)];
	const playerXp = xpArray[playerXpArray.indexOf(msg.member.id)]
	const xpToLevel = 15 * Math.pow(playerLevel, 2) + 75 * playerLevel + 100;
  if (msg.content === 'p.pace') {
		pax = 1;
		newLap();
    lap = 1;
		if (playerMoneyArray.indexOf(msg.member.id).toString() ==='-1'){
			playerMoneyArray.push(msg.member.id);
      moneyArray.push(0);
		}
		if (playerXpArray.indexOf(msg.member.id).toString() ==='-1'){
			playerXpArray.push(msg.member.id);
      xpArray.push(0);
			levelArray.push(0);
		}
  }
  function newLap(){
		if(pax===0){
			xpArray[playerXpArray.indexOf(msg.member.id)] += 100;
		}
    stop = 0;
    pacerA = [':flushed:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':white_large_square:',':checkered_flag:']
    msg.channel.send('3...'+'\n'+'2...'+'\n'+'1...'+'\n'+'GO!')
    msg.channel.send(gameEmbed);
    //mesg = msg.channel.send(pacerA.toString());
    pax = 1
    xPo=0;
    start = new Date().getTime();
  }
	function blackjack(){
		var popScore;
		var yourScore;
		const card = Math.ceil(Math.random() * 13);
		if (card<11){
			yourScore += card;
		} else {
			yourScore += 10;
		}
		const card0 = Math.ceil(Math.random() * 13);
		if (card<11){
			yourScore += card0;
		} else {
			yourScore += 10;
		}
		const card1 = Math.ceil(Math.random() * 13);
		if (card<11){
			popScore += card1;
		} else {
			popScore += 10;
		}
		const card2 = Math.ceil(Math.random() * 13);
		if (card<11){
			popScore += card2;
		} else {
			popScore += 10;
		}
		const bjEmbed = new Discord.MessageEmbed()
	.setColor('#9900aa')
	.setTitle('Cafeteria')
	.addField('Table','You: '+yourScore+'\n'+'Popular Kid: '+popScore,true)
	  msg.channel.send(bjEmbed);
	}
	/* async function embedUpdate() {
		try{
			let TargetMessage = await msg.channel.send(gameEmbed);
			let ember1 = TargetMessage.embeds[0];

			TargetMessage.edit({
				embed:
				setColor('#0099ff')
				.setTitle('Gym')
				.addField('FitnessGram PACER Test', pacerA, true)
				.setFooter('**Made by Outjt#5616**')
			});
		} catch (error) {
			cosole.log('oh noes')
		}

  } */
	if (playerXp>=xpToLevel){
		if (bool === 1){
			levelArray[playerXpArray.indexOf(msg.member.id)]++;
			//xpArray[playerXpArray.indexOf(msg.member.id)] =- xpToLevel;
			msg.channel.send('@'+msg.member.user.tag+' leveled up! GG')
			bool = 0;
		}

	}
	if (msg.content === 'p.bj'){
		blackjack();
	}
	if(msg.content === 'p.level'){
   msg.channel.send('You are level '+playerLevel+'! You have '+playerXp+'/'+xpToLevel+' xp!');
	}
	if (msg.content === 'p.top') {
    leaderboard = [first.toString(),firstHolder.toString(),second.toString(),secondHolder.toString(),third.toString(),thirdHolder.toString()];
    msg.channel.send('1. '+leaderboard[0]+' seconds - '+leaderboard[1]+'\n'+'2. '+leaderboard[2]+' seconds - '+leaderboard[3]+'\n'+'3. '+leaderboard[4]+' seconds - '+leaderboard[5])
  }
	if(msg.content === 'p.shop'){
		const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Shop')
	.addField('Money', '50 coin, gives you 100 coin', true)
	.setFooter('Page 1/1');

   msg.channel.send(exampleEmbed);
	}
	if(command === 'p.buy'){
		if (args.length != 1) {
			return msg.channel.send(`You didn't provide the right amount of arguments, ${msg.author}!`);
		}
		else if (args[0].toString()==='Money'){

		}
	}
  if (msg.content === 'p.logscores'){
    leaderboard = [first.toString(),firstHolder.toString(),second.toString(),secondHolder.toString(),third.toString(),thirdHolder.toString()];
    client.channels.cache.get('756288891937619978').send(leaderboard)
  }
	if (msg.content === 'p.loglevels'){
    client.channels.cache.get('756288891937619978').send(xpArray)
		client.channels.cache.get('756288891937619978').send(levelArray)
		client.channels.cache.get('756288891937619978').send(playerXpArray)
	}
	if (command === 'p.load'){
		if (!args.length){
			return msg.channel.send('Error: No arguments');
		}
		var s = 0;
		var o = 1;
		if (s<=args.length-1){
			if (args[0]==='1'){
				xpArray[s] = args[o];
			} else if (args[0]==='2'){
				levelArray[s] = args[o];
			} else if (args[0]==='3'){
				playerXpArray[s] = args[o];
			} else {
				msg.channel.send('Error: Incorrect first argument');
			}
		}

	}
	if (command === 'p.loadtop') {
	  if(msg.member.id==='487384254389551114'){
			if (args.length != 2) {
		  	return msg.channel.send(`You didn't provide the right amount of arguments, ${msg.author}!`);
	  	}
	  	else if (args[0] === '0') {
		  	first = args[1];
	  	}
			else if (args[0] === '1') {
				if (!msg.mentions.users.size) {
					return msg.reply('Error: no tagged user.');
				}
				const taggedUser = msg.mentions.users.first();
		  	firstHolder = taggedUser.tag.toString();
	  	}
			else if (args[0] === '2') {
		  	second = args[1];
	  	}
			else if (args[0] === '3') {
				if (!msg.mentions.users.size) {
					return msg.reply('Error: no tagged user.');
				}
				const taggedUser = msg.mentions.users.first();
		  	secondHolder = taggedUser.tag.toString();
	  	}
			else if (args[0] === '4') {
		  	third = args[1];
	  	}
			else if (args[0] === '5') {
				if (!msg.mentions.users.size) {
					return msg.reply('Error: no tagged user.');
				}
				const taggedUser = msg.mentions.users.first();
		  	thirdHolder = taggedUser.tag.toString();
	  	}
		}
  }
  if (msg.content === 'pace') {
		bool = 1;
    if (pax = 1){
      if (pacerA[10] != ':flushed:'){
				//embedUpdate();
				pacerA[xPo] = ':green_square:';
        xPo++;
        pacerA[xPo] = ':flushed:'
				msg.channel.send(gameEmbed)//.then(mess => {
    			//mess.delete(2000)
  			//})
        //mesg.edit(pacerA.toString());
      } else if (stop != 1){
        end = new Date().getTime();
        score = end - start;
        score = score * 0.001;
        if (score<first){
          first = score;
          firstHolder = msg.member.user.tag.toString();
        } else if (score<second){
          second = score;
          secondHolder = msg.member.user.tag.toString();
        } else if (score<third){
          third = score;
          thirdHolder = msg.member.user.tag.toString();
        }
        msg.channel.send('Lap #'+lap+' complete! Your time was '+score.toString())
        lap++;
        pax = 0;
        newLap();
      } else {
        msg.channel.send('You made it '+lap+' laps!')
        pax = 0;
				xpArray[playerXpArray.indexOf(msg.member.id)] += 100;
      }

    }
  }
  if (msg.content === 'p.stop'){
    stop = 1;
  }
  if (msg.content === 'p.info'){
    msg.channel.send('The FitnessGram™ PACER Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.'+ '\n' +'The 20-meter pacer test will begin in 30 seconds. Line up at the start.'
    + '\n' +'The running speed starts slowly but gets faster each minute after you hear a beep.'+ '\n' +'A single lap should be completed each time you hear a ding. Remember to run in a straight line, and run as long as possible.'
    + '\n' +'The test will begin on the word start.'+'\n'+'**Bot made by Outjt#5616**');
  }
  if (msg.content === 'p.help') {
    msg.channel.send('COMMANDS:' + '\n' + '`p.info, p.help, p.start, p.stop, p.top,`'+
		 '\n'+ 'UNFINISHED: \n'+'`audio (might not happen), money system, level system`');
  }
	var b = 0;
	var xPos = 0;
});
/*
Ideas:
- Make it a whole school thing
- Caf with shop and food system
- You can sell your food but you get more hungry
- Gym with pacer test and gaga pit
- Level perks
- Fights
*/
client.login('NO');
