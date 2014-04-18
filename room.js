/*
Pr0Code

Room Bot
*/

//Welcome

API.sendChat("/em now live!");

SB = {};

SB.h = false;

if SB.h = true{
API.on(API.DJ_ADVANCE,function(data){
	var hist = API.getHistory();
	for (var i in hist) {
		if (hist[i].media.id == data.media.id) {
			API.moderateForceSkip();
			API.sendChat('That song is on the history!');
			break;
		}
	}
});
}else{
API.sendChat("/em Song is in history, but since history is off, I'll do nothing!");
}

//Commands

//                                                      DC LOOKUP                                                     \\

users = {}
getUserByName = function(name) {
    for(var i in API.getUsers()) {
        if (API.getUsers()[i].username === name.trim()) return API.getUsers()[i].id;
    }
}
dcLookup = function(id) {
        if(typeof users[id] !== 'undefined') API.sendChat(API.getUser(id).username + ' disconnected ~' + Math.round((Date.now() - users[id].time) / 60000) + ' minutes ago at position ' + (users[id].index + 1));
        else API.sendChat('I haven\'t seen that user disconnect!');
}
API.on(API.USER_LEAVE, function(data){
        users[data.id] = { id: data.id, index: data.wlIndex, time: Date.now() }
})
API.on(API.CHAT, function(data){
        if (data.message.indexOf('!dclookup') === 0 && API.getUser(data.fromID).permission > 1) dcLookup(getUserByName(data.message.substring(11)));
});
