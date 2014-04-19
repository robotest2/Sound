/*
Pr0Code

Room Bot
*/

//Welcome

API.sendChat("/em now live!");

//Commands

//test

help = function(){
        if(typeof users[id] !== 'undefined') API.sendChat("/em [" + data.from + "] Test sucessfull");
}

API.on(API.CHAT, function(data){
        if (data.message.indexOf('!help') === 0 && API.getUser(data.fromID).permission > -1 || API.getUser(data.fromID).permission < 10);
        	API.sendChat("/em Test successfull");
        }
);
