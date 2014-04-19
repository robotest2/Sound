/*

Hey there!

This is property of Pr0Code.

Enjoy using it in my room!

*/

//Get user id

var unloader = function(){
	
	API.off(API.CHAT);
	
	API.setVolume(100);

}

API.sendChat("/em now live!");


//Commands

//User

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!help') === 0){
           API.moderateDeleteChat(data.chatID);
           API.sendChat("/em Help commands: !help, !ba");
       
       }
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!ba') === 0){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] Brand Ambassaadors (BA's) are PlugDJ's global moderators. More info here: http://blog.plug.dj/brand-ambassadors/");
    	}
    });
    
    //Put more here soon
    
    //Bouncer
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!lock') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used lock]");
    		API.moderateLockWaitList(true);
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!unlock') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used unlock]");
    		API.moderateLockWaitList(false);
    	}
    });
    
    API.on(API.CHAT, function(data){
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
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!clear') === 0 && API.getUser(data.fromID).permission > 1){
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
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!skip') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used skip]");
    		API.moderateForceSkip();
    	}
    });
    
    //End of script (for now) 
