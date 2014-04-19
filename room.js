/*
Pr0Code

Room Bot
*/

//Welcome

API.sendChat("/em now live!");

//Commands

API.on(API.CHAT, function(data){
        if (data.message.indexOf('!help') === 0 && API.getUser(data.fromID).permission > -1 || API.getUser(data.fromID).permission < 10){
        	API.moderateDeleteChat(data.chatID);
        	API.sendChat("/em Test successfull");
        }
}
