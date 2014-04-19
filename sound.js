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


/*

var nameId = function getUser(name) {
        
        var users = API.getUsers();
        
        for (var i in users) if (users[i].username == name) return users[i].id;
        
        return null;

}

*/


API.sendChat("/em now live!");


//Commands

    API.on(API.CHAT, function(data){
        
        if(data.message.indexOf('!help') === 0){
          //Experiment 
           API.moderateDeleteChat(data.chatID);
           API.sendChat("/em Help commands: !help, !ba");
       
       }
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!ba') === 0){
    		API.modeerateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] Brand Ambassaadors (BA's) are PlugDJ's global moderators. More info here: http://blog.plug.dj/brand-ambassadors/");
    	}
    });
