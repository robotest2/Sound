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
modification, are NOT permitted. If I (Pr0Code) give permission, you may modify this code provided that the following conditions are met:

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
	songIntervalMessage: { interval: 300000, offset: 0, msg: sendMsg },
	logUserJoin: true,
	afkRemove: true,
	blackList: true,
	begGuard: true,
	saveSettings: true,
	queue: true,
	setCustom: true,
	version: "Beta 6.1",
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


function startup(){
	loadOptions();
	loadCmds();
	enableAfk();
	enableMsg();
	blacklist();
	saveSettings();
	API.sendChat("/em now running!");
}

function loadOptions(){
	API.chatLog("Options | Woot: " + options.woot + " | Announcement Msg: " + options.announcementMsg + " | LogUserJoin: " + options.logUserJoin + " | AFKRemove: " + options.afkRemove + " | Blacklist: " + options.blackList + " | BegGuard: " + options.begGuard + " | Save: " + options.saveSettings);
	if(options.woot === true){
		API.on(API.DJ_ADVANCE, function(){
			$('#woot').click();
		});
	}else{
		console.log('.');
	}
	saveSettings();
}

function enableAfk(){
	if(options.afkRemove === true){
		setInterval(afkB.afkRemover, 300000);
	}
	if(options.afkRemove === false){
		options.afkRemove = false;
	}
}

function enableMsg(){
	if (options.announcementMsg == true){
		setInterval(function() { 
			msgR = Math.floor(Math.random() * msgArray.length); 
			API.sendChat("/em [Announcement] " + msgArray[msgR]);

		}, options.songIntervalMessage.interval);
	}else{
		console.log('enableMsg off');
	}
}
/* CODE FOR QUEUE TEMPLATE
function queue(){
	var a = API.getWaitList().length;
	if(a === 50){
		API.sendChat('User is added to the queue!');
		var queueList = [];
		API.moderateLockWaitList(true, false);
		if(a <= 49){
			API.moderateAddDJ(id of user);
		}
	}else{
		console.log('queue not needed!');
	}
}
*/
//initial

$('#woot').click();

var blacklist = [
	"Mediks - By A Thread (Ft. Georgina Upton) (Official Video)",
	"#SELFIE",
	"Trololol Song",
	"Hitler",
	"Gangnam Style",
	];

function blacklist(){
	var title = API.getMedia().title;
	for(var i = 0; i < blacklist.length; i++){
		if(title.indexOf(blacklist[i]) === true){
			var cdj = API.getDJ();
			API.sendChat('@' + cdj.username + ' that song is blacklisted!');
			var cdjid = [];
			var cdjusr = [];
			cdjid.push(cdj.id);
			cdjusr.push(cdj.username);
			API.moderateForceSkip();
			var a = API.getWaitList().length;
			if(a === 50){
				API.sendChat('User is added to the queue!');
				var queueList = [];
				queueList.push(cdj.id);
				API.moderateLockWaitList(true, false);
				if(a <= 49){
					API.moderateAddDJ(cdjid);
					queueList.pop(cdj.id);
				}
			}else{
				console.log('queue not needed!');
			}
			API.moderateAddDJ(cdjid);
			API.moderateMoveDJ(cdjid, 1);
			var ldj = API.getWaitListPosition(cdjid);
			if(ldj == 0){
				API.sendChat('@' + cdjusr + ' you have been added to position one to play!');
			}else{
				API.sendChat('/em Uh oh! ' + cdjusr + ' didn\'t get thier spot back! Trying again...');
				API.moderateAddDJ(cdjid);
				API.moderateMoveDJ(cdjid, 1);
				if(ldj == 0){
					API.sendChat('/em There we go! ' + cdjusr + ' got thier spot back.');
				}else{
					API.sendChat('/em Uh oh! ' + cdjusr + ' didn\'t get thier spot back! Trying once again...');
					API.moderateAddDJ(cdjid);
					API.moderateMoveDJ(cdjid, 1);
				}
				if(ldj == 0){
					API.sendChat('/em There we go! ' + cdjusr + ' got thier spot back.');
				}else{
					API.sendChat('/em Uh oh! ' + cdjusr + ' didn\'t get thier spot back! Trying once again...');
					API.moderateAddDJ(cdjid);
					API.moderateMoveDJ(cdjid, 1);

				}
				if(ldj == 0){
					API.sendChat('/em There we go! ' + cdjusr + ' got thier spot back.');
				}else{
					API.sendChat('/em Uh oh! ' + cdjusr + ' didn\'t get thier spot back! Trying once again...');
					API.moderateAddDJ(cdjid);
					API.moderateMoveDJ(cdjid, 1);

				}
				if(ldj == 0){
					API.sendChat('/em There we go! ' + cdjusr + ' got thier spot back.');
				}else{
					API.sendChat('Okay, I\'ve tried enough to get the user back in the spot. I need an admin to help me!');
				}
			}
			cdjid.pop();
			cdjusr.pop();
		}else{
			return;
		}
	}
}

//run blacklist whenever dj advances

API.on(API.DJ_ADVANCE, function(){
	blacklist();
});
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

spinGame = {
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
/*

options = {
	woot: true,
	announcementMsg: true,
	songIntervalMessage: { interval: 300000, offset: 0, msg: sendMsg },
	logUserJoin: true,
	afkRemove: true,
	blackList: true,
	begGuard: true,
	saveSettings: true,
	version: "Beta 5",
};


*/

toggle = {
	woot: "woot",
	announcements: "announcements",
	logjoin: "logjoin",
	afkremove: "afkremove",
	blacklist: "blacklist",
	begGuard: "begguard",
	save: "save",
};

function loadCmds(){

	function userc(str, from, fromid, chatid, opt) { // Commands (WAYZ IS GOD)
		var users = API.getUsers();
		switch(str) {

		case '!help':
			API.moderateDeleteChat(chatid);
			API.sendChat("/em [" + from + "] Help commands: http://goo.gl/jopl9J");
			break;
			
		case '!theme':
			API.moderateDeleteChat(chatid);
			API.sendChat("/em [" + from + "] The theme is Electronic Dance Music");
			break;
			
		case '!fight':
			API.moderateDeleteChat(chatid);
			var fm = str.substr(7).trim();
			var fmsg = fm[1];
			var fusers = API.getUsers();
			for(var i in fusers){
				if(fusers[i].username == fmsg){
					var FR = Math.floor(Math.random() * fightArray.length);
					API.sendChat("@" + fusers[i].username + ", " + from + " says: " + fightArray[FR]);
				}
			}
			break;
			
		case '!cookie':
			API.moderateDeleteChat(chatid);
			var cm = str.substr(8).trim();
			var cmsg = cm[1];
			var cusr = API.getUsers();
			for(var i in cusr){
				if(cusr[i].username == cmsg){
					var ca = Math.floor(Math.random() * cookieArray.length);
					var co = Math.floor(Math.random() * outcome.length);
					API.sendChat("@" + cusr[i].username + ", " + from + " gives you " + cookieArray[ca] + "! " + outcome[co]);
				}
			}
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
			API.moderateDeleteChat(chatid); 
			var online = API.getStaff();
			for(var i in online) {
				isonline.push(online[i].username);
			}
			API.sendChat("/em [" + from + "] Staff that's online: [" + isonline.join(', ') + "]");
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
		var y = opt;
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
		
		case '!check':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				var b = API.getHistory();
				var c = API.getMedia().title;
				for(var i in b){
					if(b[i] === c){
						API.sendChat('@' + API.getDJ().username + ' that song is on the DJ history! PLease pick another song!');
						var d = API.getDJ().id;
						var f = API.getDJ().username;
						var g =  [];
						var h = [];
						g.push(d);
						h.push(f);
						API.modeateForceSkip();
						var j = API.getWaitList().length;
						if(j <= 49){
							API.moderateLockWaitList(true, false);
							API.moderateAddDJ(g);
							API.moderateMoveDJ(g, 1);
							var k = API.getWaitListPosition(g);
							if(k === 0){
								API.sendChat('@' + h + ' you have been added to the waitlist!');
							}else{
								API.sendChat('/em Uh oh! ' + h + ' didn\'t get thier spot back! Trying again...');
								API.moderateAddDJ(g);
								API.moderateMoveDJ(g, 1);
								if(k === 0){
									API.sendChat('/em There we go! I fixed it.');
								}else{
									API.sendChat('/em Uh oh! ' + h + ' didn\'t get thier spot back! Can I have some help?');
								}
							}
							
						}
						if(j === 50){
							API.moderateLockWaitList(true, false);
							var queue = [];
							queue.push(g);
							if(j <= 49){
								API.moderateAddDJ(g);
								API.moderateMoveDJ(g, 1);
							}
						}
					}
					if(b === null || undefined){
						API.sendChat('/em [' + from + '] Song is not in history!');
					}
				}
			}else{
				API.sendChat('/em [' + from + '] No permission!');
			}
			break;
			
			case '!toggle':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 2){
					if(opt == 'woot'){
						if(options.woot === true){
							options.woot = false;
						}else{
							options.woot = true;
						}
					}
					if(opt == 'announcement'){
						if(options.announcementMsg === true){
							options.announcementMsg = false;
						}else{
							options.announcementMsg = true;
						}
					}
					if(opt == 'logjoin'){
						if(options.logUserJoin === true){
							options.logUserJoin = false;
						}else{
							options.logUserJoin = true;
						}
					}
					if(opt == 'afk'){
						if(options.afkRemove === true){
							options.afkRemove = false;
						}else{
							options.afkRemove = true;
						}
					}
					if(opt == 'blacklist'){
						if(options.blackList === true){
							options.blackList = false;
						}else{
							options.blackList = true;
						}
					}
					if(opt == 'begGuard'){
						if(options.begGuard === true){
							options.begGuard = false;
						}else{
							options.begGuard = true;
						}
					}
					if(opt == 'save'){
						if(options.saveSettings === true){
							options.saveSettings = false;
						}else{
							options.saveSettings = true;
						}
					}
					if(opt == 'queue'){
						if(options.queue === true){
							options.queue = false;
						}else{
							options.queue = true;
						}
					}
					if(opt == null || undefined){
						API.sendChat('/em [' + from + '] Available parameters: woot, announcement, logjoin, afk, blacklist, begguard, save, queue');
					}
				}else{
					API.sendChat('/em [' + from + '] No permission!');
				}
				break;
				
			case '!announcement':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 3){
				var atime = str.split('time');
				var thetime = atime.substr(5).trim();
				var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				for(var n = 0; n < numbers.length; n++){
					var i = thetime;
					if(i == '1'){
						API.sendChat('/em [' + from + '] Set the announcement time to 1 minute!');
						options.songIntervalMessage.interval = 60000;
					}
					if(i == '2'){
						API.sendChat('/em [' + from + '] Set the announcement time to 2 minutes!');
						options.songIntervalMessage.interval = 120000;
					}
					if(i == '3'){
						API.sendChat('/em [' + from + '] Set the announcement time to 3 minutes!');
						options.songIntervalMessage.interval = 180000;
					}
					if(i == '4'){
						API.sendChat('/em [' + from + '] Set the announcement time to 4 minutes!');
						options.songIntervalMessage.interval = 240000;
					}
					if(i == '5'){
						API.sendChat('/em [' + from + '] Set the announcement time to 5 minutes!');
						options.songIntervalMessage.interval = 300000;
					}
					if(i == '6'){
						API.sendChat('/em [' + from + '] Set the announcement time to 6 minutes!');
						options.songIntervalMessage.interval = 360000;
					}
					if(i == '7'){
						API.sendChat('/em [' + from + '] Set the announcement time to 7 minutes!');
						options.songIntervalMessage.interval = 420000;
					}
					if(i == '8'){
						API.sendChat('/em [' + from + '] Set the announcement time to 8 minutes!');
						options.songIntervalMessage.interval = 480000;
					}
					if(i == '9'){
						API.sendChat('/em [' + from + '] Set the announcement time to 9 minutes!');
						options.songIntervalMessage.interval = 540000;
					}
					if(i == '10'){
						API.sendChat('/em [' + from + '] Set the announcement time to 10 minutes!');
						options.songIntervalMessage.interval = 600000;
					}
					if(i == null || undefined){
						API.sendChat('/em [' + from + '] Valid parameters are 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Where each number is a minute higher than the previous.');
					}
				}
			}else{
				API.sendChat('/em [' + from + '] No permission!');
			}
			break;
			
		case '!test':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				if(options.saveSettings === true){
					var lsgi = localStorage.getItem("BotSave");
					if(lsgi === true){
						API.sendChat("/em [" + from + "] Save file is up and running!");
					}else{
						API.sendChat("/em [" + from + "] Uh oh! I couldn't find the save file! Try refreshing me, that might work!");
					}
				}else{
					API.sendChat("/em [" + from + "] Uh oh! Save is set to " + options.saveSettings + "!");
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!lockcycle':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				API.sendChat('/em [' + from + '] used lockcycle');
				var lock = $('.toggle-lock');
				var ltoggle = $('.toggle-cycle');
				if(ltoggle.hasClass('enabled')){
					ltoggle.click();
				}else{
					ltoggle.click();
				}
				if(lock.hasClass('disabled')){
					API.moderateLockWaitList(true, false);
				}else{
					API.moderateLockWaitList(false);
				}
			}else{
				API.sendChat('/em [' + from + '] No permission!');
			}
			break;
			
		case '!add':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				var aa = API.getUsers();
				for(var i in aa){
					if(aa[i].username == opt){
						API.sendChat("/em [" + from + "] Used add on: " + aa[i].username);
						var a = API.getWaitList().length;
						if(a === 50){
							API.sendChat('User is added to the queue!');
							var queueList = [];
							API.moderateLockWaitList(true, false);
							if(a <= 49){
								API.moderateAddDJ(aa[i].id);
								var b = API.getWaitListPosition(aa[i].id);
								if(b === 50){
									queueList = [];
									console.log('Queue add is successfull!');
								}else{
									API.sendChat('/em Uh oh! There was an issue when adding a Queue\'d user. Here\'s a list of the users.');
									API.sendChat('/em ' + queueList)
								}
								
							}
						}else{
							console.log('queue not needed!');
							API.moderateAddDJ(aa[i].id);
						}

					}
					if(aa[i].username == null){
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
				var allUsr = API.getUsers();
				var getPoss = str.split(1, 2, 3, 4, 5, 6, 7, 8, 9);
				var getPos = getPoss[1];
				for(var i in allUsr){
					if(allUsr[i].username == opt){
						API.sendChat("/em [" + from + "] Used move on: " + allUsr[i].username);
						API.moderateMoveDj(allUsr[i].id, getPos)
					}
					if(allUsr[i].username === null){
					API.sendChat("/em [" + from + "] User not found!");
					}
				}	
			}
			break;
			
		case '!remove':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				var rAll = API.getUsers();
				for(var i in rAll){
					if(rAll[i].username == opt){
						API.sendChat("/em [" + from + "] used remove on " + rAll[i].username);
						API.moderateRemoveDJ(rAll[i].id);
					}
					if(rAll[i].username == null){
						API.sendChat("/em [" + from + "] User not found!");
					}
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!vr':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 3){
				var vr = API.getRoomScore();
				API.sendChat('/em [' + from + '] Vote Ratio: Positive: ' + vr.positive + ' Negative: ' + vr.negative + ' Grabs: ' + vr.curate + '!');
			}else{
				API.sendChat('/em [' + from + '] No permission!');
			}
			break;
			
		case '!settings':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				API.sendChat("/em [" + from + "] Current Settings | Autowoot: " + options.woot + " | Announcements: " + options.announcementMsg + " | Announcement Interval: " + options.songIntervalMessage + " | Log Join: " + options.logUserJoin + " | AFKRemove: " + options.afkRemove + " | Blacklist: " + options.blackList + ".");
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
			
		case '!lockskip':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + " used lockskip]");
				API.moderateLockWaitList(true, false);
				API.moderateForceSkip();
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!lock':
			if(API.getUser(fromid).permission >= 2){
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + " used lock]");
				var llock = $('.lock-toggle');
				if(llock.hasClass('enabled')){
					API.moderateLockWaitList(true, false);
				}else{
					API.moderateLockWaitList(false);
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
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
			
		case '!save':
			if(API.getUser(fromid).permission >= 3){
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + "] Saving...");
				setTimeout(function(){
					saveSettings();
					API.sendChat("/em Saved!");
				}, 500);
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!kick':
			if(API.getUser(fromid).permission >=2 ){
				var splitkick = opt;
				var userskick = API.getUsers();
				for(var i in userskick) {
					if (userskick[i].username == splitkick){
						var userkick = userskick[i].id;
						API.sendChat("[" + from + "] @" + userskick[i].username + " You will be kicked in 10 seconds.")
						setTimeout(function(){API.moderateBanUser(userkick, 1, API.BAN.HOUR)}, 10000);
						setTimeout(function(){API.moderateUnbanUser(userkick)}, 15000);
						setTimeout(function(){API.moderateUnbanUser(userkick)}, 18000);
					}else{
						if(userskick[i].username === undefined){
							API.sendChat("/em [" + from + "] User not found!");
						}
					}
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		case '!rdj':
			API.moderateDeleteChat(chatid);
			if(API.getUser(fromid).permission >= 2){
				var rUserM = str.substr(6).trim();
				var mtag = rUserM[1];
				var crowd = API.getUsers();
				for(var i in crowd){
					if(crowd[i].username === mtag){
						API.sendChat("/em [" + from + "] Set " + mtag.username + " as a Resident DJ!");
						API.moderateSetRole(mtag.id, API.ROLE.RESIDENTDJ);
					}
				}
			}else{
				API.sendChat("/em [" + from + "] No permission!");
			}
			break;
			
		default: setTimeout(function(){
			API.moderateDeleteChat(chatid);
			API.sendChat('/em [' + from + '] That command doesn\'t exist! Type !help for a list of commands.');
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
			if(data.message.indexOf('!toggle') !=-1){
				var msg = data.message.substr(8);
				userc('!toggle', data.from, data.fromID, data.chatID, msg);
			}
			else {
				userc(data.message, data.from, data.fromID, data.chatID);
			}
		}
		if (userData[data.fromID].mute === true) API.moderateDeleteChat(data.chatID);
	});
}

function saveSettings(){
	localStorage.setItem('SoundBotOptions',JSON.stringify(options));
	localStorage.setItem('SoundBotUserData', JSON.stringify(userData));
}

	}catch(err){
    	var d = new Date();
    	API.sendChat("/em An error has occurred on " + d + " for " + err + " on line " + err.lineNumber);
}
//inside of auth, so noone can get around

startup();

}else{
	alert('This script works only in http://plug.dj/astroparty');
}
//End of script. No seriously, there's nothing below me
//except this lol
