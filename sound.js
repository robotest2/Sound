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
    		API.moderateLockWaitList(true, true);
    		setTimeout(function(){
    			API.moderateLockWaitList(false);
    		}, 1000);
    	}
    });
    //End of script (for now) 
