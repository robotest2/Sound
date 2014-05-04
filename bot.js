/*

Hey there!

This is property of Pr0Code.

http://plug.dj/astroparty

Enjoy using it in my room!

Credits (Yes I used reverse psycology to put in the credits first :) )

That guy: AstroShock (Pr0Code)
Amazing Helper Manager Guy That Fixes Stuff and Manages For Me Because I'm A Noob (<--- lol, it true doe): WayzRG (Prod[RG, TV, other])


Please refer to the documentation below or to the license file. Any questions can be messaged to me here.


LICENSE:

Copyright (c) 2014, Jack Labbe (AstroShock, Pr0Code)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are NOT permitted. If I (Jack Labbe) give permission, you may modify this code provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the AstroParty nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

//					SoundBot's Life Starts Here						\\

if(location.pathname == '/astroparty/') {
	try{

var msgArray = [
	"Welcome to the AstroShock plug.dj room!",
	"My commands are being re-written, so not all commands work!",
	"My commands are being re-written, so not all commands work!",
	"My commands are being re-written, so not all commands work!",
	"My commands are being re-written, so not all commands work!",
	"My commands are being re-written, so not all commands work!",
	"Make sure to help out new users!",
	"Need help? Type !help for a list of commands",
	"This script is protected with an authentication system!",
	"More commands are on the way!",
	"The song limit for this room is 10 minutes.",
	"Please do not spam.",
	"We are currently open for applications to be a bouncer. More info here: https://astroparty.typeform.com/to/fwvOjP",
"If you submitted an application, please do not ask if we read it, if you do, we'll just delete it."];
var msgR = Math.floor(Math.random() * msgArray.length);
var sendMsg = "/em [Announcement] " + msgArray[msgR];

//Options
options = {
woot: true,
announcementMsg: true,
songIntervalMessage: { interval: 600000, offset: 0, msg: sendMsg },
logUserJoin: true,
afkRemove: true,
blackList: true,
saveSettings: true,
version: "Beta 4.1_Pre5",
};

// UserData (Wayz)
var userData = {};
var usersinroom = API.getUsers();
for(var i in usersinroom) {
    userData[usersinroom[i].id] = {
        username: usersinroom[i].username,
        afktime: Date.now(),
        warning: false,
        muted: false
    };
}

API.on(API.USER_JOIN, function(user) {
    userData[user.id] = {
        username: user.username,
        afktime: Date.now(),
        warning: false,
        muted: false
    };
});

API.on(API.USER_LEAVE, function(user) {
	delete userData[user.id];
});

API.on(API.CHAT, function(data) {
    userData[data.fromID].afktime = Date.now();
    userData[data.fromID].warning = false;
});

//AFK removal (Wayz)
var thirtyMinute = 3600000;
var afkB = {

afkRemover: function(){
	var userswl = API.getWaitList();
	var now = Date.now();
	for(var i in userswl){
		var userafk = userData[userswl[i].id].afktime;
		var usertimeafksolo = now - userafk;
		var usertimeafk = Math.floor((now - userafk) / 60000) % 60;
		if (usertimeafksolo > thirtyMinute && userData[userswl[i].id].warning === false) {
			API.sendChat("@" + userswl[i].username + " Afk time: " + usertimeafk + " minutes. Chat in 4 minutes or I will remove you from the waitlist.");
			userData[userswl[i].id].warning = true;
			setTimeout(function() {
				userswl = API.getWaitList();
				for (var e in userswl) {
					if (userData[userswl[e].id].warning === true) {
						API.moderateRemoveDJ(userswl[e].id);
						userData[userswl[e].id].warning = false;
					}
				}
			}, 240000);
		}
        }
},
};

//Configure Options + Startup Loader thing

startup = {

init: function(){

	API.chatLog("Loading...");
	setTimeout(function(){
	API.chatLog("Current Options: ");

	if (options.woot == true){
 	API.chatLog("Woot: " + options.woot); 
 	API.on(API.DJ_ADVANCE, function() { $('#woot').click(); });
 	}else{
 		API.chatLog("Woot: " + options.woot);
 	}

	if (options.announcementMsg == true){
	API.chatLog("Announcements: " + options.announcementMsg);
	setInterval(function() { 
		msgR = Math.floor(Math.random() * msgArray.length); 
		API.sendChat("/em [Announcement] " + msgArray[msgR]);
		
	}, options.songIntervalMessage.interval);
	}else{
		API.chatLog("Announcements: " + options.announcementMsg);
	}
	
	if (options.logUserJoin == true){
	API.chatLog("Log User Join: " + options.logUserJoin);
	API.on(API.USER_JOIN, function(a) { API.chatLog(a.username + " joined the room"); });
	}else{
		API.chatLog("Log User Join: " + options.logUserJoin);
	}

	if (options.afkRemove == true){
		API.chatLog("AFK Remove: " + options.afkRemove);
		setInterval(afkB.afkRemover, 300000);
	}else{
		API.chatLog("AFK Remove: " + options.afkRemove);
		}

	if(options.blackList == true){
		API.chatLog("BlackList: " + options.blackList);
	}else{
		API.chatLog("BlackList: " + options.blackList);
	}
	if(options.saveSettings == true){
		API.chatLog("Save: " + options.saveSettings);
	}else{
		API.chatLog("Save: " + options.saveSettings);
	}
	}, 1000);
	API.chatLog("Executing Script...");

	}
}
/*
  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|
      _____           _       _     ____              _   
     / ____|         (_)     | |   |  _ \            | |  
    | (___   ___ _ __ _ _ __ | |_  | |_) | ___   ___ | |_
     \___ \ / __| '__| | '_ \| __| |  _ < / _ \ / _ \| __|
     ____) | (__| |  | | |_) | |_  | |_) | (_) | (_) | |_ 
    |_____/ \___|_|  |_| .__/ \__| |____/ \___/ \___/ \__|
                       | |                                
                       |_|                                

  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
 |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|

dat ascii <3
*/

//Auth boot

if (location.pathname != '/astroparty'){
	API.chatLog("Authentication Successful!");
	setTimeout(function(){
	startup.init();
	}, 500);
}else{
	API.chatLog("You are not authenticated to use this script in the requested room.", true);
}


//Startup

var on = "Current ";
setTimeout(function(){
	API.chatLog(on + "version " + options.version);
}, 1000);
setTimeout(function(){
API.sendChat("/em Now running!");
}, 2000);

//Save all options

var saved = {}
saved.optionsW = options.woot;
saved.optionsA = options.announcementMsg;
saved.optionsB = options.songIntervalMessage;
saved.optionsC = options.logUserJoin;
saved.optionsD = options.afkRemove;
saved.optionsE = options.blackList;
saved.userdata = userData;

//Save for Command

saveCmd = {
saveData: function(){
	if(options.saveSettings == true){
		try{
			save = JSON.parse(localStorage.getItem("BotSave"));
			if(save === null){
				function save(){ localStorage.setItem("BotSave", JSON.stringify(saved))};
			}else{
				function save(){ localStorage.setItem("BotSave", JSON.stringify(saved))};
			}
		}catch(e){
			var saveErrorNow = Date.now();
			API.sendChat("/em A save error has occurred on " + saveErrorNow + " for " + e + " on line " + e.lineNumber);
		}
	}else{
		API.sendChat(" [" + from + "] saveSettings is set to " + options.saveSettings);
	}
}
}
//Startup Save

	if(options.saveSettings == true){
		try{
			save = JSON.parse(localStorage.getItem("BotSave"));
			if(save === null){
				function save(){ localStorage.setItem("BotSave", JSON.stringify(saved))};
			}else{
				function save(){ localStorage.setItem("BotSave", JSON.stringify(saved))};
			}
		}catch(e){
			var saveErrorNow = Date.now();
			API.sendChat("/em A save error has occurred on " + saveErrorNow + " for " + e + " on line " + e.lineNumber);
		}
	}else{
		API.sendChat(" [" + from + "] saveSettings is set to " + options.saveSettings);
	}

//Arrays here

var blacklistA = [ //keywords for blacklist
	"Hitler",
	"Gangnam Style",
	"#SELFIE",
	"Minecraft",
	"Friday Rebecca Black",
	"Saturday Rebecca Black",
	"LMFAO"];

if(options.blackList == true){
	var current = API.getMedia();
	var currentDj = API.getDJ();
	if(current === blacklistA){
		API.sendChat("@" + currentDj.username + " That song is blacklisted!");
		API.moderateForceSkip();
	}
}else{
	API.sendChat("/em This song is blacklisted, but since blackList is set to" + options.blackList + ", I will do nothing!");
}


var askArray = [
	"Why is an alarm clock going 'off' when it actually turns on?",
	"If you mated a bull dog and a shitsu, would it be called a bullsh*t?",
	"If an ambulance is on its way to save someone, and it runs someone over, does it stop to help them?",
	"Why is Grape Nuts cereal called that, when it contains neither grapes, nor nuts?",
	"Why is it called a 'drive through' if you have to stop?",
	"Why are Softballs hard?",
	"Do the minutes on the movie boxes include the previews, credits, and special features, or just the movie itself?",
	"If the professor on Giligan's Island can make a radio out of coconut, why can't he fix a hole in a boat?",
	"Why do we scrub Down and wash Up?",
	"Why is an electrical outlet called an outlet when you plug things into it? Shouldn't it be called an inlet.",
	"Why do people point to their wrist when asking for the time, but people don't point to their crotch when they ask where the bathroom is?",
	"Can blind people see their dreams?",
	"Why do most cars have speedometers that go up to at least 130 when you legally can't go that fast on any road?",
	"Why do they call it 'getting your dog fixed' if afterwards it doesn't work anymore?",
	"Why do they call it taking a dump? Shouldn't it be leaving a dump?",
	"Where in the nursery rhyme does it say humpty dumpty is an egg?",
	"Why do they sterilize needles for lethal injections?",
	"Why do banks leave the door wide open but the pens chained to the counter?",
	"If electricity comes from electrons, does morality come from morons?",
	"If all the countries in the world are in debt, where did all the money go?",
	"Why does Donald Duck wear a towel when he comes out of the shower, when he doesn't usually wear any pants?",
	"How come you press harder on a remote control when you know the battery is dead?",
	"If an orange is orange, why isn't a lime called a green or a lemon called a yellow?",
	"If a cat always lands on its feet, and buttered bread always lands butter side down, what would happen if you tied buttered bread on top of a cat?",
	"If the #2 pencil is the most popular, why's it still #2?",
	"What color would a smurf turn if you choked it?",
	"Where's the egg in an egg roll?",
	"Why aren't blue berries blue?",
	"Where is the lead in a lead pencil?",
	"Why is Greenland called green when it is covered in ice?",
	"If a person owns a piece of land, do they own it all the way down to the center of the earth?",
	"Why are they called stairs inside but steps outside?",
	"Why is there a light in the fridge but not in the freezer?",
	"Why does mineral water that has trickled through mountains for centuries have a use by date?",
	"Why do toasters always have a setting on them which burns your toast to a horrible crisp no one would eat?"];

var cookieArray = [" a chocolate chip ", " a sugar ", " a banana ", " a morphed ", " a slime "];
var outcome = [" touching it duplicates it. Wierd, but AWESOME!", " when you eat it, it makes you fall asleep.", " you decide to plant it, and it gives money!", " they take it back and eat it D:", " you accidently throw it out the window while driving."];

var fightArray = [
	" doesn't like water.",
	" likes to wear thier pants at their knees.",
	" hates cookies.",
	" likes to take hot showers infront of homeless people.",
	" doesn't know how to use an ipad.",
	" abuses people.",
	" wears hello-kitty clothes to work (or school).",
	" is 40 years old and lives in their parents basement.",
	" takes long walks in volcanos.",
	" has water, never wakes up.",
	" loves one-direction.",
	" eats coconuts"];

var spinGame = {
	spin: false,
};

var spinJoin = [];
var spinWhite = [];
var spinOutcome = [
	" got thier brains blasted out!",
	" dropped the ball!",
	" lost spin!",
	" got hit in the face with the ball!",
	" fell ontop of the ball!",
	" got shot up into the air and hit the ground!",
	" died."];
var spinTime = [ // game time ranges from 1min to 5 mins
	60,
	120,
	180,
	240,
	300];

/*
Here is a list of permissions.

USER: 0
RESIDENT DJ: 1
BOUNCER: 2
MANAGER: 3
CO-HOST: 4
HOST: 5
AMBASSADOR: 8
ADMIN: 10
*/

function userc(str, from, fromid, chatid, opt) { // Commands (WAYZ IS GOD)
	var users = API.getUsers();
	switch(str) {
		case '!help':
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + "] Help commands: http://goo.gl/wfpGqc");
			break;
			
		case '!link':
			API.moderateDeleteChat(chatid);
			if(API.getMedia().format == 1){
				API.sendChat("/em [" + from + "] Link to current song: http://youtu.be/" + API.getMedia().cid);
			}else{
                        var id = API.getMedia().cid;
                        SC.get('/tracks', { ids: id,}, function(tracks) {
                                API.sendChat("/em [" + from + "] Link to current song: " + tracks[0].permalink_url);
                        	});
			}
			break;
			
		case '!staff':
			var isonline = []; 
			API.moderateDeleteChat(chatID); 
			var online = API.getStaff();
			for(var i in online) {
				isonline.push(online[i].username);
			}
			API.sendChat("/em [" + data.from + "] Staff that's online: [" + isonline.join(', ') + "]");
			isonline = [];
			break;
			
		case '!ad':
			API.moderateDeleteChat(chatid);
			API.sendChat("/em [" + from + "] Getting annoying ads? Get ADBlock here: https://adblockplus.org");
			break;
			
		case '!spin':
			API.moderateDeleteChat(chatid);
			API.sendChat("/em [" + from + "] Requested a game of spin! Type !join to join the game!");
			if(spinGame.spin === false){
				spinGame.spin = true;
			}else{
				API.sendChat("/em [" + from + "] Game is already running!");
			}
			spinJoin.push(from);
			break;
			
		case '!join':
			API.moderateDeleteChat(chatid);
			if(spinGame === true){
				API.sendChat("/em [" + from + "] Joined spin!");
				spinJoin.push(from);
			}else{
				API.sendChat("/em [" + from + "] Spin isn't running!");
			}
			break;
			
		case '!start':
			API.moderateDeleteChat(chatid);
			if(spinGame === true){
				API.sendChat("/em [" + from + "] Started the game!");
				var a = spinJoin;
				var b = Math.floor(Math.random() * a.length);
				var z = setInterval(function(){
					API.sendChat("@" + b + ", you got the ball! Type !pass to pass it!");
				}, 5000);
				var y = Math.floor(Math.random() * spinTime.length);
				setTimeout(function(){ //ends game
					clearInterval(z);
					if(spinJoin.length == 0){
						API.sendChat("/em Spin has ended! All users are safe! :D");
						spinWhite = []; //clears array
						spinJoin = []; //clears array
					}
					if(spinJoin.length > 1){
						var c = Math.floor(Math.random() * a.length);
						var d = Math.floor(Math.random() * spinOutcome.length);
						API.sendChat("@" + c.username + spinOutcome[d] + " :frowning:");
						spinGame.spin = false;
						spinWhite = []; //clears array
						spinJoin = []; //clears array
					}
				}, y);
				z(); //Starts !pass
			}else{
				API.sendChat("/em [" + from + "] Spin isn't running!");
			}
			break;
			
		case '!pass':
			API.moderateDeleteChat(chatid);
			if(spinGame === true){
				API.sendChat("/em [" + from + "] Passed the ball!");
				spinJoin.pop(from);
				spinWhite.push(from);
			}else{
				API.sendChat("/em [" + from + "] Spin isn't running!");
			}
			break;
			
		case '!spinstop':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				if(spinGame.spin === true){
					clearInterval(z);
					spinJoin = [];
					spinWhite = [];
					spinGame.spin = false;
					API.sendChat("/em [" + from + "] Stopped spin!");
				}else{
					API.sendChat("/em [" + from + "] Spin isn't running!");
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!emoji':
			API.moderateDeleteChat(chatid);
			API.sendChat("/em [" + from + " List of all emoji's here: http://www.emoji-cheat-sheet.com]");
			break;
			
		case '!ask':
				API.moderateDeleteChat(chatid);
				var askR = Math.floor(Math.random() * askArray.length);
				API.sendChat("/em [" + from + "] " + askArray[askR]);
			break;
			
		case '!ba':
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + "] Brand Ambassadors (BA's) are plug.dj's global moderators. More info here: http://blog.plug.dj/brand-ambassadors/");
				break;
			
		case '!eta':
		API.moderateDeleteChat(chatid);
		var a = str.substr(5).trim();
		var y = a[1];
		var b = API.getUsers();
		for (var i in b) {
			if(b[i].username == y) {
				var c = API.getUser(b[i].id).wlIndex + 1;
				var d = 5;
				if(c == 1) {
					var e = $("#now-playing-time").children('span').text();
					API.sendChat("/em [" + from + "] ETA for " + y + " is " + e + " minutes.");
				}
				else if(c > 1) {
					var f = Math.floor(c*d);
					API.sendChat("/em [" + from + "] ETA for " + y + " is " + f + " minutes.");
				
				}else{
				 API.sendChat("/em [" + from + "] ETA for " + y + " is N/A minutes.");
				}
			}
		}
		break;
			
		case '!add':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				var addUser = str.substr(5).trim();
				var addA = addUser[1];
				var addUsers = API.getUsers();
				for(var i in addUsers){
					if(addUsers[i].username == addA){
						API.sendChat("/em [" + from + " used add]");
						API.moderateAddDJ(addUsers[i].id);
					}else{
						API.sendChat("/em [" + from + "] User not found!");
					}
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!move':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				var moveUser = str.substr(6).trim();
				var moveA = moveUser[1];
				var moveRoom = API.getUsers();
				for(var i in moveRoom){
					if(moveRoom[i].username == moveA){
						if(str.substr(6) = 3 < 24){
							var movePos = API.getWaitListPosition(moveRoom[i].username);
							var moveAbove = str.substr(6) > 3 < 26;
							var moveNum = str.substr(moveAbove).trim();
							if(movePos === -1){
								API.moderateAddDJ(moveRoom[i].id);
								API.moderateMoveDJ(moveRoom[i].id, moveNum);
							}else{
								API.moderateMoveDJ(moveRoom[i].id, moveNum);
							}
						}
					}else{
						API.sendChat("/em [" + from + "] User not found!");
					}
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!remove':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				var rUser = str.substr(8).trim();
				var rA = rUser[1];
				var rRoom = API.getUsers();
				for(var i in rRoom){
					if(rRoom[i].username == rA){
						API.sendChat("/em [" + from + " used remove]");
						API.moderateRemoveDJ(rRoom[i].id);
					}else{
						API.sendChat("/em [" + from + "] User not found!");
					}
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!settings':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				API.sendChat("/em [" + from + "] Current Settings | Autowoot: " + options.autowoot + " | Announcements: " + options.announcementMsg + " | Announcement Interval: " + options.songIntervalMessage + " | Log Join: " + options.logUserJoin + " | AFKRemove: " + options.afkRemove + " | Blacklist: " + options.blackList + ".");
			}
			break;
			
		case '!toggle':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				var tMessage = str.substr(8).trim();
				var tMsg = tMessage[1];
				if(tMsg == "woot"){
					API.sendChat("/em [" + from + "] Toggled woot!");
					if(options.woot == true){
						options.woot = false;
					}else{
						options.woot = true;
					}
				}
				if(tMsg == "announcements"){
					API.sendChat("/em [" + from + "] Toggled announcements!");
					if(options.announcementMsg == true){
						options.announcementMsg = false;
					}else{
						options.announcementMsg = true;
					}
				}
				if(tMsg == "logjoin"){
					API.sendChat("/em [" + from + "] Toggled logUserJoin!");
					if(options.logUserJoin == true){
						options.logUserJoin = false;
					}else{
						options.logUserJoin = true;
					}
				}
				if(tMsg == "afkremove"){
					API.sendChat("/em [" + from + "] Toggled AFKRemove!");
					if(options.afkRemove == true){
						options.afkRemove = false;
					}else{
						options.afkRemove = true;
					}
				}
				if(tMsg == "blacklist"){
					API.sendChat("/em [" + from + "] Toggled the blacklist!");
					if(options.blackList == true){
						options.blackList = false;
					}else{
						options.blackList = true;
					}
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!clear':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				var messages = $('#chat-messages').children();
				for (var i = 0; i < messages.length; i++) {
					for (var j = 0; j < messages[i].classList.length; j++) {
						if (messages[i].classList[j].indexOf('cid-') == 0) {
							API.moderateDeleteChat(messages[i].classList[j].substr(4));
							}
						}
					}	
					API.sendChat("/em [" + from + " used clear]");
    				}
    				break;
			
		case '!skip':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + " used skip]");
				API.moderateForceSkip();
			}
			break;
			
		case '!lock':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + " used lock]");
				API.moderateLockWaitList(true, false);
			}
			break;
			
		case '!unlock':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + " used unlock]");
				API.moderateLockWaitList(false);
			}
			break;
			
		case '!cycle':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + " used cycle]");
				var toggle = $(".cycle-toggle");
        			if(toggle.hasClass("disabled")) {
        				toggle.click();
        			}else{
        				toggle.click();
        			}
			}
			break;
			
		case '!mute':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				for (var i in users) {
					if (users[i].username == opt) {
						userData[users[i].id].mute = true;
						API.sendChat("/me [" + from + "] used mute on: " + opt);
					}
				}
			}
			break;
			
		case '!unmute':
			if(API.getUser(fromid).permission >= 2){
				if (userData[fromid].mute === true) API.moderateDeleteChat(chatid);
				if(userData[fromid].mute === true){
					API.sendChat("/em [" + from + "] Tried unmuting themselves, but they're muted!");
				}else{
				for (var i in users) {
					if (users[i].username == opt) {
						userData[users[i].id].mute = false;
						API.sendChat("/me [" + from + "] used unmute on: " + opt);
						}
					}
					API.moderateDeleteChat(chatid);
				}
			}
			break;
			
		case '!ban':
		if(API.getUser(fromid).permission >= 2){
              for (var i in users) {
				if (users[i].username == opt) {
					API.moderateDeleteChat(chatid);
					API.sendChat("/em [" + from + "] used ban on " + opt);
					API.moderateBanUser(users[i].id);
				}else{
					API.sendChat("/em [" + from + "] User not found.");
				}
			}
              }
		break;
		
		case '!say':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				API.sendChat('/em [' + from + '] ' + opt);
			}
			break;
			
		case '!reload':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + "] This command isn't setup!");
			}
			break;
			
		case '!save':
			if(API.getUser(fromid).permission >= 3){
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + "] Saving...");
				setTimeout(function(){
					saveCmd.saveData();
				}, 500);
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		default: setTimeout(function(){
			API.moderateDeleteChat(chatid);
			API.sendChat('/em [' + from + '] That command doesn\'t exist!');
		}, 1);
	}
}

API.on(API.CHAT, function(data) {
	if (data.message.substr(0,1) == '!') {
		if(data.message.indexOf('@') !=-1) {
			var index = data.message.indexOf('!');
			var endex = data.message.indexOf('@') -1;
			var msg = data.message.substr(index, endex).trim();
			var indexu = data.message.indexOf('@') +1;
			var u = data.message.substr(indexu).trim();
			userc(msg, data.from, data.fromID, data.chatID, u);
		}
		else {
			if(data.message.indexOf('!say') !=-1) {
				var msg = data.message.substr(5);
				userc('!say', data.from, data.fromID, data.chatID, msg);
			}
			else {
				userc(data.message, data.from, data.fromID, data.chatID);	
			}
		}
	}
	if (userData[data.fromID].mute === true) API.moderateDeleteChat(data.chatID);
});

/*
   _____                                          _     
  / ____|                                        | |    
 | |     ___  _ __ ___  _ __ ___   __ _ _ __   __| |___ 
 | |    / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` / __|
 | |___| (_) | | | | | | | | | | | (_| | | | | (_| \__ \
  \_____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|___/
                                                        
                                                      
*/
//Spin Arrays
/*
var sa = []; //Initial !play array
var se = []; //users that cannot lose
var sar = Math.floor(Math.random() * sa.length); //Gets a random user that joined the game
var sTime = Date.now();
var aTime = sTime + sa.length;
var rTime = Math.floor(Math.random() * aTime + 1000);
//User
	
  API.on(API.CHAT, function(data){
    
    if(data.message == '!help'){
           API.moderateDeleteChat(data.chatID);
           API.sendChat("/em [" + data.from + " My commands can be found here: http://goo.gl/PzvBL8]");
       
       }
    
    if(data.message === '!spin'){
    	API.moderateDeleteChat(data.chatID);
    	API.sendChat("/em " + data.from + " requested a game of spin! Type !play to join the game!");
    	for(var i in sar){
    		sa.push(data.fromID);
    	}
    }
    	if(data.message === '!play'){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em " + data.from + " joined spin!");
    		for(var i in sar){
    			sa.push(data.fromID);
    		}
    	}
    		if(data.message === '!start'){
    			API.moderateDeleteChat(data.chatID);
    			API.sendChat("/em " + data.from + " started spin!");
    			setTimeout(function(){
    				API.sendChat("/em Spinning the ball...");
    			}, 1000);
    			
    			for(var i in sar){
    			
    			setTimeout(function(){
    				API.sendChat("@" + sar.username + " you got the ball! Type !pass to pass it!");
    			}, 2000);
    			
    			setTimeout(function(){
    				API.sendChat("Oh no! @" + sar.username + " got thier brains blown out!");
    				sa = [];
    				se = [];
    			}, rTime);
    			}
    		}
    		if(data.message === '!pass'){
    			API.moderateDeleteChat(data.chatID);
    			API.sendChat("/em " + data.from + " passed the ball!");
    			for(var i in sar){
    				sa.pop(data.fromID);
    			}
    			for(var i in se){
    				se.push(data.fromID);
    			}
    			setTimeout(function(){
    				API.sendChat("@" + sar.username + " you got the ball! Type !pass to pass it!");
    			}, 2000);
    		}
    
    	if(data.message == '!god'){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] Credits: This was created by AstroShock, but helped by WayzRG (ProdTv) for some stuff! :D Thanks!");
    	}
    
      if(data.message == '!fight'){
        API.moderateDeleteChat(data.chatID);
        var fightUser = API.getUsers();
        var fightR = Math.floor(Math.random() * fightArray.length);
        var userFR = Math.floor(Math.random() * fightUser.length);
        API.sendChat("[" + data.from + "] @" + fightUser[userFR].username + fightArray[fightR]);
      }
      
      if(data.message == '!staff'){ //credit: WayzRG
        var isonline = []; 
        API.moderateDeleteChat(data.chatID); 
        var online = API.getStaff();
        for(var i in online) {
                isonline.push(online[i].username);
        }
        API.sendChat("/em [" + data.from + "] Staff that's online: [" + isonline.join(', ') + "]");
        isonline = [];
}

      if(data.message == '!theme'){
        API.moderateDeleteChat(data.chatID);
        API.sendChat("/em [" + data.from + " The theme is Electronic Dance Music. (EDM)]");
      }
    
      if(data.message == '!emoji'){
        API.moderateDeleteChat(data.chatID);
        API.sendChat("/em [" + data.from + " List of all emoji's here: http://www.emoji-cheat-sheet.com]");
      }
    
      if(data.message == '!cookie'){
        API.moderateDeleteChat(data.chatID);
        var room = API.getUsers();
        var cookieR = Math.floor(Math.random() * cookieArray.length);
        var userR = Math.floor(Math.random() * room.length);
        var outcomeR = Math.floor(Math.random() * outcome.length);
        API.sendChat("[@" + room[userR].username + ", " + data.from + " gives you " + cookieArray[cookieR] + " cookie " + ", " + outcome[outcomeR] + "]");
      }
    
      if(data.message == '!ba'){
        API.moderateDeleteChat(data.chatID);
        API.sendChat("/em [" + data.from + " Brand Ambassaadors (BA's) are PlugDJ's global moderators. More info here: http://blog.plug.dj/brand-ambassadors/]");
      }
    
      if(data.message == '!link'){
        if(API.getMedia().format == 1){
          API.moderateDeleteChat(data.chatID);
          API.sendChat("/em [" + data.from + " Link to current song: http://youtu.be/" + API.getMedia().cid + "]");
        }else{
          API.moderateDeleteChat(data.chatID);
          var id = API.getMedia().cid;
          SC.get('/tracks', { ids: id,}, function(tracks) {
            API.sendChat("/em [" + data.from + " Link to current song: " + tracks[0].permalink_url + "]");
          });
        }
      }
    
      if(data.message == '!ask'){
        API.moderateDeleteChat(data.chatID);
        var askR = Math.floor(Math.random() * askArray.length);
        API.sendChat("/em [" + data.from + "] " + askArray[askR]);
      }
	
	if(data.message.indexOf('!eta') !=-1){
		API.moderateDeleteChat(data.chatID);
		var a = data.message.split("@");
		var y = a[1];
		var b = API.getUsers();
		for (var i in b) {
			if(b[i].username == y) {
				var c = API.getUser(b[i].id).wlIndex + 1;
				var d = 5;
				if(c == 1) {
					var e = $("#now-playing-time").children('span').text();
					API.sendChat("/em [" + data.from + "] ETA for " + y + " is " + e + " minutes.");
				}
				else if(c > 1) {
					var f = Math.floor(c*d);
					API.sendChat("/em [" + data.from + "] ETA for " + y + " is " + f + " minutes.");
				}
				else API.sendChat("/em [" + data.from + "] ETA for " + y + " is N/A minutes.");
			}
		}
	}
		
    //Put more here soon
	
    //Bouncer
        if(data.message == '!cycle' && API.getUser(data.fromID).permission >= 1){
        	API.moderateDeleteChat(data.chatID);
        	API.sendChat("/em [" + data.from + " used cycle]");
        	var toggle = $(".cycle-toggle");
        	if(toggle.hasClass("disabled")) {
        		toggle.click();
        	}else{
        		toggle.click();
        	}
        }
    
    	if(data.message == '!settings' && API.getUser(data.fromID).permission >= 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] Settings | Auto Woot: " + options.woot + ", Announcement Message: " + options.announcementMsg + ", Log user Join: " + options.logUserJoin + ", AFK Remove: " + options.afkRemove + ".");
    	}
	if (data.message.indexOf("!mute") !=-1 && API.getUser(data.fromID).permission > 1) {
		var msg = data.message.split("@");
		var user = msg[1];
		var users = API.getUsers();
		for (var i in users) {
			if (users[i].username == user) {
				userData[users[i].id].mute = true;
				API.sendChat("/me [" + data.from + "] used mute on: " + user);
			}
		}
        API.moderateDeleteChat(data.chatID);
	}
	// if user muted
    	if (userData[data.fromID].mute === true) API.moderateDeleteChat(data.chatID);
	if (data.message.indexOf("!unmute") !=-1 && API.getUser(data.fromID).permission > 1) {
		var msg = data.message.split("@");
		var user = msg[1];
		var users = API.getUsers();
		if(userData[data.fromID].mute === true){
			API.sendChat("/em [" + data.from + "] Tried unmuting themselves, but they're muted!");
		}else{
		for (var i in users) {
			if (users[i].username == user) {
				userData[users[i].id].mute = false;
				API.sendChat("/me [" + data.from + "] used unmute on: " + user);
				}
			}
			API.moderateDeleteChat(data.chatID);
		}
	}
    
	if (data.message.indexOf("!kick") !=-1 && API.getUser(data.fromID).permission >= 1 ) {
		var messkick = data.message;
		var splitkick = messkick.split("@");
		var userskick = API.getUsers();
		for(var i in userskick) {
			if (userskick[i].username == splitkick[1]) {
				var userkick = userskick[i].id;
				API.sendChat("[" + data.from + "] @" + splitkick[1] + " You will be kicked in 10 seconds.")
				setTimeout(function(){API.moderateBanUser(userkick, 1, API.BAN.HOUR)}, 10000);
				setTimeout(function(){API.moderateUnbanUser(userkick)}, 15000);
				setTimeout(function(){API.moderateUnbanUser(userkick)}, 18000);
			}
		}
		API.moderateDeleteChat(data.chatID);
	}
        
	if (data.message.indexOf('!ban') !=-1 && API.getUser(data.fromID).permission >= 1 ) {
		API.moderateDeleteChat(data.chatID);
		API.sendChat('/em [' + data.from + ' used ban]');
                var messb = data.message;
		var userb = messb.split("@");
		var usersb = API.getUsers();
		for(var b in usersb){
			API.moderateBanUser(usersb[b].id);
		}
	}
	
        if(data.message.indexOf('!say') !=-1 && API.getUser(data.fromID).permission >= 1){
        	API.moderateDeleteChat(data.chatID);
        	var sayMsg = data.message.substr(5).trim();
        	API.sendChat("/em [" + data.from + "] " + sayMsg);
        }
    
    	if(data.message == '!lock' && API.getUser(data.fromID).permission >= 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used lock]");
    		API.moderateLockWaitList(true);
    	}
    
    	if(data.message == '!unlock' && API.getUser(data.fromID).permission >= 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used unlock]");
    		API.moderateLockWaitList(false);
    	}
    
    	if(data.message == '!lockskip' && API.getUser(data.fromID).permission >= 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used lockskip]");
    		API.moderateLockWaitList(true);
    		API.moderateForceSkip();
    	}
    
    	if(data.message == '!wlclear' && API.getUser(data.fromID).permission >= 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used wlclear]");
    		setTimeout(function(){
    		API.moderateLockWaitList(true, true);
    		}, 1000);
    		setTimeout(function(){
    			API.moderateLockWaitList(false);
    		}, 2000);
    	}
    
    	if(data.message == '!clear' && API.getUser(data.fromID).permission >= 1){
    		API.moderateDeleteChat(data.chatID);
		var messages = $('#chat-messages').children();
		for (var i = 0; i < messages.length; i++) {
			for (var j = 0; j < messages[i].classList.length; j++) {
				if (messages[i].classList[j].indexOf('cid-') == 0) {
					API.moderateDeleteChat(messages[i].classList[j].substr(4));
					}
				}
			}
			API.sendChat("/em [" + data.from + " used clear]");
    		}
    
    	if(data.message == '!skip' && API.getUser(data.fromID).permission >= 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used skip]");
    		API.moderateForceSkip();
    	}
        
        //Manager +
        
        if(data.message == '!rdj' &&  API.getUser(data.fromID).permission >= 2){
        	API.moderateDeleteChat(data.chatID);
        	var messRdj = data.message;
		var userRdj = messbRdj.split("@");
		var usersRdj = API.getUsers();
		for(var i in usersRdj){
			API.sendChat("/em [" + data.from + "] Set " + userRdj + "'s permission to Resident DJ");
			API.moderateSetRole(usersRdj[i].id, API.ROLE.RESIDENTDJ);
		}
        }
        
        if(data.message == '!bouncer' && API.getUser(data.fromID).permission >= 2){
        	API.moderateDeleteChat(data.chatID);
        	var messbo = data.message;
		var userbo = messbo.split("@");
		var usersbo = API.getUsers();
		for(var i in usersbo){
			API.sendChat("/em [" + data.from + "] Set " + userbo + "'s permission to Bouncer");
			API.moderateSetRole(usersbo[i].id, API.ROLE.BOUNCER);
		}
        }
        
        //Co-Host +
        
        if(data.message == '!manager' && API.getUser(data.fromID).permission >= 4){
        	API.moderateDeleteChat(data.chatID);
        	var messm = data.message;
		var userm = messm.split("@");
		var usersm = API.getUsers();
		for(var i in usersm){
			API.sendChat("/em [" + data.from + "] Set " + userm + "'s permission to Manager");
			API.moderateSetRole(usersm[i].id, API.ROLE.MANAGER);
		}
        }
        
        //Host
        
        if(data.message == '!cohost' && API.getUser(data.fromID).permission >= 4){
        	API.moderateDeleteChat(data.chatID);
        	var messCh = data.message;
		var userCh = messCh.split("@");
		var m = userCh[1];
		var usersCh = API.getUsers();
		for(var i in usersCh){
			if (usersCh == m){
			API.sendChat("/em [" + data.from + "] Set " + m + "'s permission to Co-Host");
			API.moderateSetRole(m[i].id, API.ROLE.COHOST);
			}else{
				API.sendChat("/em [" + data.from + "] User not found");
			}
		}
        }
  }); // end of commands
*/
	}catch(err){
    	var d = new Date();
    	API.sendChat("/em An error has occurred on " + d + " for " + err + " on line " + err.lineNumber);

    }
}
else API.chatLog('This script works only in plug.dj/astroparty', true);
    
//End of script. No seriously, there's nothing below me

