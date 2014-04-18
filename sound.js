/*

//THIS HAS TO BE USED IN Mozilla Firefox DUE TO THE AUTHENTICATION CODE

Hey there!

This is property of Pr0Code.

Enjoy using it in my room!

*/

//Room Authenticator

var loader = (function(){
	API.setVolume(0);
	$.getScript("http://goo.gl/aAaUr3");
});

var unloader = (function(){
	API.setVolume(100);
	API.off(API.CHAT);
	API.chatLog("Loading aborted!", true);
	API.sendChat("/em This script can only function in http://plug.dj/astroparty");
});

var AUTH = window.location.assign = 'http://plug.dj/astroparty';
if (AUTH = true){
	API.chatLog("Authentication Sucessfull!", true);
	loader;
}else{
  API.chatLog("I'm sorry, but you are not authenticated to use this script in the specified room.", true);
  unloader;
}




API.sendChat("/em now live!");
//Commands

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!') === 0){
            var cmd = data.message, from = data.from, fromID = data.fromID;
            var id = data.fromID;
            var cmdm = data.message;
            var command = cmdm.substring(1).split(' ');
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
            }
            
            try{
            
            if(API.getUser(data.fromID).permission > -1 || API.getUser(fromID).permission < 7){
                switch(command[0].toLowerCase()){
                    
                  case "help":
                    if(typeof command[1] == "undefined"){
                      API.moderateDeleteChat(data.chatID);
                      API.sendChat("/em Here's my commands: | User !help, !staff, !ba, !me | Rdj !space | Bouncer !skip, !say, !lock, !unlock, !lockskip, !clear, !kick, !add | More coming soon!");
                      

                    }
                break;
                    
                  case "staff":
                  	if(typeof command[1] == "undefined"){
                  		API.moderateDeleteChat(data.chatID);
                  		var staff = API.getStaff();
                  		API.sendChat("/em [" + data.from + "] Staff currently online: " + staff);
                  	}
                  	break;
                    
                  case "ba":
                    if(typeof command[1] == "undefined"){
                      API.moderateDeleteChat(data.chatID);
                      API.sendChat("/em Brand Ambassadors (BA's) are Plug.Dj's global moderators. More infro here: http://blog.plug.dj/brand-ambassadors/");
                    }
                    break;
                    
                  case "me":
                    if(typeof command[1] == "undefined"){
                      API.moderateDeleteChat(data.chatID);
                      API.sendChat("/em [" + data.from + "] You are: " + data.from + ", otherwise known as " + data.fromID + ".");
                    }
                    break;
                    
                    //Resident DJ Commands
                    
                  case "space":
                    if(API.getUser(data.fromID).permission > 1 || API.getUser(fromID).permission < 10){
                      API.moderateDeleteChat(data.chatID);
                      API.sendChat("/em I refuse to serve people with spaces!");
                    }
                    break;
                    
                    //Bouncer Commands
                    
                  case "skip":
                  	if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                  		API.moderateDeleteChat(data.chatID);
                  		API.sendChat("/em [" + data.from + " used skip]");
                  		API.moderateForceSkip();
                  	}
                  	break;
                    
                  case "say":
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                      API.moderateDeleteChat(data.chatID);
                      API.sendChat("/em [" + data.from + "] " + command[1]);
                    }
                    break;
                    
                  case "lock":
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                      API.moderateDeleteChat(data.chatID);
                      API.sendChat("/em [" + data.from + " used lock]");
                      API.moderateLockWaitList(true, false);
                    }
                    break;
                    
                  case "unlock":
                  	if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                  		API.moderateDeleteChat(data.chatID);
                  		API.sendChat("/em [" + data.from + " used unlock]");
                  		API.moderateLockWaitList(false);
                  	}
                  	break;
                    
                  case "lockskip":
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                      API.moderateDeleteChat(data.chatID);
                      API.sendChat("/em [" + data.from + " used lockskip]");
                      API.moderateLockWaitList(true, false);
                      API.moderateForceSkip();
                    }
                    break;
                    
                  case "clear":
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                      API.moderateDeleteChat(data.chatID);
                      API.sendChat("/em [" + data.from + " used clear]");
                                   var messages = $('#chat-messages').children();
				   for (var i = 0; i < messages.length; i++) {
    				   for (var j = 0; j < messages[i].classList.length; j++) {
        			   if (messages[i].classList[j].indexOf('cid-') == 0) {
            			   API.moderateDeleteChat(messages[i].classList[j].substr(4));
        				}
    				}
			}
                    }
                    break;
                    
                  case "kick":
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                      API.moderateDeleteChat(data.chatID);
                      API.sendChat("/em [" + data.from + "] kicked " + userid + " for 1 minute!");
                      var name = command.substr(msg.indexOf('@')+1);
                      var userid = getUserID(username);
                      API.moderateBanUser(userid, 0, API.BAN.HOUR);
                      setTimeout(function(){
                        API.moderateUnbanUser(userID)
                      }, 60000);
                      setTimeout(function(){
                        API.sendChat("/em [" + data.from + "] User can now login!");
                      }, 60010);
                    }
                    break;
                    
                  case "add":
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                      API.moderateDeleteChat(data.chatID);
                      var name = command.substr(msg.indexOf('@')+1);
                      var userid = getUserID(username);
                      API.moderateAddDJ(userid);
                      API.sendChat("/em [" + data.from + " used add]");
                    }
                    break;
                    
                  case "kill":
                  	if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                  		API.moderateDeleteChat(data.chatID);
                  		API.sendChat("/em Shutting down...");
                  		setTimeout(function(){
                  			unloader;
                  		}, 2000);
                  		setTimeout(function(){
                  		("/em Sucessfully shut down.");
                  		API.chatLog(data.from + " shut me down!");
                  	}, 2125);
                  	break;
            }
        }
            }
    }catch(err){
  var date = new Date();
  API.chatLog("An error has occured on " + date + " for " + err, true);
  API.sendChat("/em An error has occured on " + date + " for " + err);
  unloader;
 }
        }
    }
);
