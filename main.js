/*

Hey there!

This is property of Pr0Code.

http://plug.dj/astroparty

Enjoy using it in my room!

Credits (Yes I used reverse psycology to put in the credits first :) )

Overall Master God Person Thing: AstroShock (Pr0Code)
Amazing Helper Manager Guy That Fixes Stuff and Manages For Me Because I'm A Noob (<--- lol, it true doe): WayzRG (ProdTv - from pastebin)



*/

var msgArray = [
	"Welcome to the AstroShock plug.dj room!",
	"Make sure to help out new users!",
	"Need help? Type !help for a list of commands",
	"This script is protected with an authentication system!",
	"More commands are on the way!",
	"The song limit for this room is 10 minutes.",
	"Please do not spam."];
var msgR = Math.floor(Math.random() * msgArray.length);
var sendMsg = API.sendChat("/em [Announcement] " + msgArray[msgR]);

//Options
options = {
woot: true,
announcementMsg: true,
songIntervalMessage: [
	{
	interval: 10,
	offset: 0,
	msg: sendMsg
	}
	],
logUserJoin: true,
afkRemove: true,
version: "Beta 2.9.1",
};

//Configure Options + Startup Loader thing

startup = {

init: function(){

var s = function(){API.chatLog("Starting Up...");}
var o = function(){API.chatLog("Options: ");}

s();
o();

if (options.woot == true){
 API.chatLog("Woot: " + options.woot); 
 $('#woot').click();
 }else{
 API.chatLog("Woot: " + options.woot);
 }

if (options.announcementMsg == true){
	API.chatLog("Announcements: " + options.announcementMsg);
	options.songIntervalMessage;
}else{
	API.chatLog("Announcements: " + options.announcementMsg);
}

if (options.logUserJoin == true){
API.chatLog("Log User Join: " + options.logUserJoin);
API.on(API.USER_JOIN, function(a) { console.log(a.username + " joined the room"); });
}else{
	API.chatLog("Log User Join: " + options.logUserJoin);
}

if (options.afkRemove == true){
	API.chatLog("AFK Remove: " + options.afkRemove);
	afkB.afkRemover();
}else{
	API.chatLog("AFK Remove: " + options.afkRemove);
	}
	
}, 1000);

var on = function(){API.chatLog("Enabled v" + options.version);}
var l =  function(){API.chatLog("Loading file...");}
var live = function(){API.sendChat("/em now live!");}

on();
l();
live();
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
	startup.init;
}else{
	API.chatLog("You are not authenticated to use this script in the requested room.", true);
	}
	
//AFK removal

var afkB = {

afkLimit: 60,
users: {},
getTime: function(ms){
	ms = Math.floor(ms / 60000);
	var t = ms - Math.floor(ms / 60) * 60;
	var n = (ms - t) / 60;
	var r = '';
	r += n < 10 ? '0' : '';
	r += n + 'h';
	r += t < 10 ? '0' : '';
	r += t;
	return r;
},
afkRemover: function(){
	var waitList = API.getWaitList(),
	now = Date.now(), index = [waitList[4], waitList[2], waitList[0]];
	if(waitList.length > 4){
		if(now - afkB.users[index[0].id].afkTime >= afkB.users[index[0].id].warns.warn1){
			API.sendChat("@" + index[0].username + "AFK Time - " + afkb.getTime(now - afkB.users[index[0].id].afkTime) + " | Chat in 5 songs or I will remove you!");
			
			afkB.users[index[0].id].warns.warn1 = true;
		}
		if(now - afkB.users[index[1].id].afkTime >= afkB.afkLimit * 60000 && !afkB.users[index[1].id].warns.warn1){
			API.sendChat("@" + index[1].username + " AFK Time - " + afkB.getTime(now - afkB.users[index[1].id].afkTime) + " | Chat in 2 songs or I will remove you!");
			
			afkB.users[index[2].id].warns.warn2 = true;
		}
		if(now - afkB.users[index[2].id].afkTime >= afkB.afkLimit * 60000 && afkB.users[index[2].id].warns.removed){
			API.sendChat("@" + index[2].username + " You were " + Math.round((now - afkB.users[index[2].id].afkTime) / 60000) + " minutes past AFK limit (" + afkB.afkLimit + "m) | Chat every " + afkB.afkLimit + " minutes while in the waitlist.");
			
			API.moderateRemoveDJ(index[2].id);
		}
	}
},
user: function(obj){
	this.id = obj.id;
	this.afkTime = Date.now();
	this.joinTime = Date.now();
	this.warns = {
		warn1: false,
		warn2: false,
		removed: false
	};
},
eventWaitListUpdate: function(){
	afkB.afkRemover();
},
eventJoin: function(obj){
	bot.users[obj.id] = new afkB.user(obj);
},
eventLeave: function(obj){
	delete afkB.users[obj.id];
},
eventChat: function(obj){
	afkB.users[obj.fromID].afkTime = Date.now();
}
};

API
.on(API.WAIT_LIST_UPDATE, $.proxy(afkB.eventWaitListUpdate, this))
.on(API.USER_JOIN, $.proxy(afkB.eventJoin, this))
.on(API.USER_LEAVE, $.proxy(afkB.eventLeave, this))
.on(API.CHAT, $.proxy(afkB.eventChat, this));

for(var i in API.getUsers()){
	afkB.users[API.getUsers()[i].id] = new afkB.user(API.getUsers()[i]);
}


//Startup

var on = "Enabled ";

API.chatLog("Loading file...");
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

//User
	
  API.on(API.CHAT, function(data){
    
    try{
    
    if(data.message.indexOf('!help') === 0){
           API.moderateDeleteChat(data.chatID);
           API.sendChat("/em [" + data.from + " My commands can be found here: http://goo.gl/PzvBL8]");
       
       }
    
    	if(data.message.indexOf('!god', '!master') === 0){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] Credits: This was created by AstroShock, but helped by WayzRG (ProdTv) for some stuff! :D Thanks!");
    	}
    
      if(data.message.indexOf('!fight') === 0){
        API.moderateDeleteChat(data.chatID);
        var fightUser = API.getUsers();
        var fightR = Math.floor(Math.random() * fightArray.length);
        var userFR = Math.floor(Math.random() * fightUser.length);
        API.sendChat("[" + data.from + "] @" + fightUser[userFR].username + fightArray[fightR]);
      }
      
      if(data.message.indexOf('!staff') !=-1){ //credit: WayzRG
        var isonline = []; 
        API.moderateDeleteChat(data.chatID); 
        var online = API.getStaff();
        for(var i in online) {
                isonline.push(online[i].username);
        }
        API.sendChat("/em [" + data.from + "] Staff that's online: [" + isonline.join(', ') + "]");
        isonline = [];
}

      if(data.message.indexOf('!theme') === 0){
        API.moderateDeleteChat(data.chatID);
        API.sendChat("/em [" + data.from + " The theme is Electronic Dance Music. (EDM)]");
      }
    
      if(data.message.indexOf('!emoji') === 0){
        API.moderateDeleteChat(data.chatID);
        API.sendChat("/em [" + data.from + " List of all emoji's here: http://www.emoji-cheat-sheet.com]");
      }
    
      if(data.message.indexOf('!cookie') === 0){
        API.moderateDeleteChat(data.chatID);
        var room = API.getUsers();
        var cookieR = Math.floor(Math.random() * cookieArray.length);
        var userR = Math.floor(Math.random() * room.length);
        var outcomeR = Math.floor(Math.random() * outcome.length);
        API.sendChat("[@" + room[userR].username + ", " + data.from + " gives you " + cookieArray[cookieR] + " cookie " + ", " + outcome[outcomeR] + "]");
      }
    
      if(data.message.indexOf('!ba') === 0){
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
    
      if(data.message.indexOf('!ask') === 0){
        API.moderateDeleteChat(data.chatID);
        var askR = Math.floor(Math.random() * askArray.length);
        API.sendChat("/em [" + data.from + "] " + askArray[askR]);
      }
	
	if(data.message.indexOf('!eta') === 0){
	API.moderateDeleteChat(data.chatID);
	var pos = API.getWaitListPosition(), str = 'ETA: ';
	str+= pos == -1 ? 'N/A. You are not in the waitlist!' : now.getTime(pos * 1000 * 60 * (25/6) + API.getTimeRemaining() * 1000);
	API.sendChat("/em [" + data.from + "] " + str);
		}
		
    //Put more here soon
	
    //Bouncer
    
    	if(data.message.indexOf('!settings') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] Settings | Auto Woot: " + options.woot + ", Announcement Message: " + options.announcementMsg + ", Log user Join: " + options.logUserJoin + ", AFK Remove: " + options.afkRemove + ".");
    	}
    
    
    
    if(data.message.indexOf('!mute') === 0 && API.getUser(data.fromID).permission > 1){
    	API.moderateDeleteChat(data.chatID);
    	API.sendChat("/em [" + data.from + " used mute]");
    	//Trim message to so it reads (!mute) @user.
    	
    	var getTag = data.message.substr(6).trim();
    	
    	//Get id and pass it to mute
    	
    	var us = getTag.toLowerCase();
	if (us) {
		var usb = API.getUsers();
		for(var i in usb) {
		if(usb[i].username.toLowerCase() == us) {
			return usb[i].id;	
			}else{
				return "notFound"
			}
		}
	}
               if(usb[i].id == us){
               	API.moderateDeleteChat(usb[i].id.chatID);
               }else{
               	API.sendChat("/em [" + data.from + " user not found]");
               }
    }
    
        if(data.message.indexOf('!say') === 0 && API.getUser(data.fromID).permission > 1){
        	API.moderateDeleteChat(data.chatID);
        	var sayMsg = data.message.substr(5).trim();
        	API.sendChat("/em [" + data.from + "] " + sayMsg);
        }
    
    	if(data.message.indexOf('!lock') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used lock]");
    		API.moderateLockWaitList(true);
    	}
    
    	if(data.message.indexOf('!unlock') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used unlock]");
    		API.moderateLockWaitList(false);
    	}
    
    	if(data.message.indexOf('!lskip') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used lockskip]");
    		API.moderateLockWaitList(true);
    		API.moderateForceSkip();
    	}
    
    	if(data.message.indexOf('!wlclear') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used wlclear]");
    		setTimeout(function(){
    		API.moderateLockWaitList(true, true);
    		}, 1000);
    		setTimeout(function(){
    			API.moderateLockWaitList(false);
    		}, 2000);
    	}
    
    	if(data.message.indexOf('!clear') === 0 && API.getUser(data.fromID).permission > 1){
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
    
    	if(data.message.indexOf('!skip') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used skip]");
    		API.moderateForceSkip();
    	}
    	
    }catch(err){
    	var d = new Date();
    	API.sendChat("/em An error has occurred on " + d + " for " + err);
    }
    	
    });
    
    //End of script (for now) 
