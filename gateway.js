/*
This is used as a gateway to the script, so it's only used in my room
*/
try{
var hook = (function(){
	API.on(API.CHAT);
	API.setVolume(0);
	$.getScript('https://raw.githubusercontent.com/Pr0Code/Sound/master/sound.js');

});

var auth = document.url = "http://plug.dj/astroparty";
if(auth = true){
	return true;
}else{
	return false;
}

if(auth return = true){
	hook;
}else{
	API.chatLog("You are not authenticated to use this in the specified room!", true);
}
}catch(err){
	var d = new Date();
	API.chatLog("Authentication error on " + d + " for " + err, true);
}
