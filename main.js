/*

Hey there!

This is property of Pr0Code.

http://plug.dj/astroparty

Enjoy using it in my room!

Credits (Yes I used reverse psycology to put in the credits first :) )

Overall Master God Person Thing: AstroShock (Pr0Code)
Amazing Helper Manager Guy That Fixes Stuff and Manages For Me Because I'm A Noob (<--- lol, it true doe): WayzRG (ProdTv - from pastebin)



*/
if(location.pathname == '/astroparty/') {
	try{

var msgArray = [
	"Welcome to the AstroShock plug.dj room!",
	"Make sure to help out new users!",
	"Need help? Type !help for a list of commands",
	"This script is protected with an authentication system!",
	"More commands are on the way!",
	"The song limit for this room is 10 minutes.",
	"Please do not spam."];
var msgR = Math.floor(Math.random() * msgArray.length);
var sendMsg = "/em [Announcement] " + msgArray[msgR];

//Options
options = {
woot: true,
announcementMsg: true,
songIntervalMessage: { interval: 600000, offset: 0, msg: sendMsg },
logUserJoin: true,
afkRemove: true,
version: "Beta 4.0.3",
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

API.chatLog("Starting Up...");
API.chatLog("Options: ");

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
	
API.chatLog("Loading file...");

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
	startup.init();
}else{
	API.chatLog("You are not authenticated to use this script in the requested room.", true);
}

API
.on(API.WAIT_LIST_UPDATE, $.proxy(afkB.eventWaitListUpdate, this))
.on(API.USER_JOIN, $.proxy(afkB.eventJoin, this))
.on(API.USER_LEAVE, $.proxy(afkB.eventLeave, this))
.on(API.CHAT, $.proxy(afkB.eventChat, this));


//Startup

var on = "Enabled ";
setTimeout(function(){
	API.chatLog(on + "version " + options.version);
}, 1000);
setTimeout(function(){
API.sendChat("/em now live!");
}, 2000);

//Arrays here

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
/*
   _____                                          _     
  / ____|                                        | |    
 | |     ___  _ __ ___  _ __ ___   __ _ _ __   __| |___ 
 | |    / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` / __|
 | |___| (_) | | | | | | | | | | | (_| | | | | (_| \__ \
  \_____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|___/
                                                        
                                                      
*/
//Spin Arrays

var sa = []; //Initial !play array
var se = []; //users that cannot lose
var sar = Math.floor(Math.random() * sa.length); //Gets a random user that joined the game

//User
	
  API.on(API.CHAT, function(data){
    
    if(data.message === '!help'){
           API.moderateDeleteChat(data.chatID);
           API.sendChat("/em [" + data.from + " My commands can be found here: http://goo.gl/PzvBL8]");
       
       }
    
    if(data.message === '!spin'){
    	API.moderateDeleteChat(data.chatID);
    	API.sendChat("/em " + data.from + " requested a game of spin! Type !play to join the game!");
    }
    	
    	if(data.message === '!play'){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em " + data.from + " joined spin!");
    		sa.push(data.from);
    	}
    		if(data.message === '!start'){
    			API.moderateDeleteChat(data.chatID);
    			if(sa > 2){
    			API.sendChat("/em " + data.from + " started spin!");
    			setTimeout(function(){
    				API.sendChat("/em Spinning the ball...");
    			}, 1000);
    			
    			setTimeout(function(){
    				API.sendChat("@" + sar.username + " you got the ball! Type !pass to pass it!");
    			}, 2000);
    			}
    		}
    		if(data.message === '!pass'){
    			API.moderateDeleteChat(data.chatID);
    			API.sendChat("/em " + data.from + " passed the ball!");
    			se.push(data.from);
    			sa.pop(data.from);
    			setTimeout(function(){
    				API.sendChat("@" + sar.username + " you got the ball! Type !pass to pass it!");
    			}, 4000);
    		}
    
    	if(data.message === '!god'){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] Credits: This was created by AstroShock, but helped by WayzRG (ProdTv) for some stuff! :D Thanks!");
    	}
    
      if(data.message === '!fight'){
        API.moderateDeleteChat(data.chatID);
        var fightUser = API.getUsers();
        var fightR = Math.floor(Math.random() * fightArray.length);
        var userFR = Math.floor(Math.random() * fightUser.length);
        API.sendChat("[" + data.from + "] @" + fightUser[userFR].username + fightArray[fightR]);
      }
      
      if(data.message === '!staff'){ //credit: WayzRG
        var isonline = []; 
        API.moderateDeleteChat(data.chatID); 
        var online = API.getStaff();
        for(var i in online) {
                isonline.push(online[i].username);
        }
        API.sendChat("/em [" + data.from + "] Staff that's online: [" + isonline.join(', ') + "]");
        isonline = [];
}

      if(data.message === '!theme'){
        API.moderateDeleteChat(data.chatID);
        API.sendChat("/em [" + data.from + " The theme is Electronic Dance Music. (EDM)]");
      }
    
      if(data.message === '!emoji'){
        API.moderateDeleteChat(data.chatID);
        API.sendChat("/em [" + data.from + " List of all emoji's here: http://www.emoji-cheat-sheet.com]");
      }
    
      if(data.message === '!cookie'){
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
    
      if(data.message.indexOf('!link') === 0){
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
    
      if(data.message === '!ask'){
        API.moderateDeleteChat(data.chatID);
        var askR = Math.floor(Math.random() * askArray.length);
        API.sendChat("/em [" + data.from + "] " + askArray[askR]);
      }
	
	if(data.message === '!eta'){
	API.moderateDeleteChat(data.chatID);
	var pos = API.getWaitListPosition(), str = 'ETA: ';
	str+= pos == -1 ? 'N/A. You are not in the waitlist!' : now.getTime(pos * 1000 * 60 * (25/6) + API.getTimeRemaining() * 1000);
	API.sendChat("/em [" + data.from + "] " + str);
		}
		
    //Put more here soon
	
    //Bouncer
        if(data.message === '!cycle' && API.getUser(data.fromID).permission > 1){
        	API.moderateDeleteChat(data.chatID);
        	API.sendChat("/em [" + data.from + " used cycle]");
        	var toggle = $(".cycle-toggle");
        	if(toggle.hasClass("disabled")) {
        		toggle.click();
        	}else{
        		toggle.click();
        	}
        }
    
    	if(data.message === '!settings' && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] Settings | Auto Woot: " + options.woot + ", Announcement Message: " + options.announcementMsg + ", Log user Join: " + options.logUserJoin + ", AFK Remove: " + options.afkRemove + ".");
    	}
	if (data.message === "!mute" && API.getUser(data.fromID).permission > 1) {
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
	if (data.message === "!unmute" && API.getUser(data.fromID).permission > 1) {
		var msg = data.message.split("@");
		var user = msg[1];
		var users = API.getUsers();
		for (var i in users) {
			if (users[i].username == user) {
				userData[users[i].id].mute = false;
				API.sendChat("/me [" + data.from + "] used unmute on: " + user);
			}
		}
		API.moderateDeleteChat(data.chatID);
	}
    
	if (data.message === "!kick" && API.getUser(data.fromID).permission > 1 ) {
		var messkick = data.message;
		var splitkick = messkick.split("@");
		var userskick = API.getUsers();
		for(var i in userskick) {
			if (userskick[i].username == splitkick[1]) {
				var userkick = userskick[i].id;
				API.sendChat("@" + splitkick[1] + " You will be kick in 10 seconds.")
				setTimeout(function(){API.moderateBanUser(userkick, 1, API.BAN.HOUR)}, 10000);
				setTimeout(function(){API.moderateUnbanUser(userkick)}, 15000);
				setTimeout(function(){API.moderateUnbanUser(userkick)}, 18000);
			}
		}
		API.moderateDeleteChat(data.chatID);
	}
        
	if (data.message === '!ban' && API.getUser(data.fromID).permission > 1 ) {
		var messb = data.message;
		var userb = messb.substring(6);
		var usersb = API.getUsers();
		for(var b in usersb){
			if (usersb[b].username == userb) {
				API.moderateBanUser(usersb[b].id);
				API.sendChat('/me [' + data.from + '] used ban on ' + userb);
			}
		}
		API.moderateDeleteChat(data.chatID);
	}
	
        if(data.message === '!say' && API.getUser(data.fromID).permission > 1){
        	API.moderateDeleteChat(data.chatID);
        	var sayMsg = data.message.substr(5).trim();
        	API.sendChat("/em [" + data.from + "] " + sayMsg);
        }
    
    	if(data.message === '!lock' && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used lock]");
    		API.moderateLockWaitList(true);
    	}
    
    	if(data.message === '!unlock' && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used unlock]");
    		API.moderateLockWaitList(false);
    	}
    
    	if(data.message === '!lskip' && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used lockskip]");
    		API.moderateLockWaitList(true);
    		API.moderateForceSkip();
    	}
    
    	if(data.message === '!wlclear' && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used wlclear]");
    		setTimeout(function(){
    		API.moderateLockWaitList(true, true);
    		}, 1000);
    		setTimeout(function(){
    			API.moderateLockWaitList(false);
    		}, 2000);
    	}
    
    	if(data.message === '!clear' && API.getUser(data.fromID).permission > 1){
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
    
    	if(data.message === '!skip' && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used skip]");
    		API.moderateForceSkip();
    	}
    	
    	
    	//Manager
    	
    	if(data.message === '!rdj' && API.getUser(data.fromID).permission > 2){
        	API.moderateDeleteChat(data.chatID);
        	var msgrd = data.message.split("@");
        	var userrd = msgrd[1];
        	var usersrd = API.getUsers();
        	for (var i in usersrd) {
        		if (usersrd[i].username == userrd) {
        			userData[usersrd[i].id].rdj = true;
        			API.sendChat("/em [" + data.from + "] set " + userrd + " permission to Resident DJ");
        		}
        	}
        	API.moderateSetRole(userrd, API.ROLE.RESIDENTDJ);
        }
    	
    	if(data.message === '!bouncer' && API.getUser(data.fromID).permission > 2){
        	API.moderateDeleteChat(data.chatID);
        	var msgbo = data.message.split("@");
        	var userbo = msgbo[1];
        	var usersbo = API.getUsers();
        	for (var i in usersbo) {
        		if (usersbo[i].username == userbo) {
        			userData[usersbo[i].id].bouncer = true;
        			API.sendChat("/em [" + data.from + "] set " + userbo + " permission to bouncer");
        		}
        	}
        	API.moderateSetRole(userbo, API.ROLE.BOUNCER);
        }
    	
    	//Co-Host Commands
    	
    	if(data.message === '!manager' && API.getUser(data.fromID).permission > 3){
        	API.moderateDeleteChat(data.chatID);
        	var msgma = data.message.split("@");
        	var userma = msgma[1];
        	var usersma = API.getUsers();
        	for (var i in usersma) {
        		if (usersma[i].username == userma) {
        			userData[usersma[i].id].manager = true;
        			API.sendChat("/em [" + data.from + "] set " + userma + " permission to manager");
        		}
        	}
        	API.moderateSetRole(userma, API.ROLE.MANAGER);
        }
        
        //Host
        
        if(data.message === '!cohost' && API.getUser(data.fromID).permission > 4){
        	API.moderateDeleteChat(data.chatID);
        	var msgch = data.message.split("@");
        	var userch = msgch[1];
        	var usersch = API.getUsers();
        	for (var i in usersch) {
        		if (usersch[i].username == userch) {
        			userData[usersch[i].id].cohost = true;
        			API.sendChat("/em [" + data.from + "] set " + userch + " permission to cohost");
        		}
        	}
        	API.moderateSetRole(userch, API.ROLE.COHOST);
        }
        
        if(data.message === '!party' && API.getUser(data.fromID).permission > 4){
        	API.moderateDeleteChat(data.chatID);
        	API.sendChat("!clear");
        	API.moderateLockWaitList(true, true);
        	API.moderateForceSkip();
        	setTimeout(function(){
        	API.sendChat("/em AstroShock started a party!");
        	}, 1000);
        }
    });

	}catch(err){
    	var d = new Date();
    	API.sendChat("/em An error has occurred on " + d + " for " + err);

    }
}
else API.chatLog('This script works only in plug.dj/astroparty !', true);
    
//End of script. No seriously, there's nothing below me
