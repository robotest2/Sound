/*
This is used as a gateway to the script, so it's only used in my room
*/
API.on(API.CHAT, function(){

var hook = {
	API.chatLog("Hooking...");
	$.getScript('https://raw.githubusercontent.com/Pr0Code/Sound/master/sound.js');
}

var auth = document.url = "http://plug.dj/astroparty";
if(auth = "http://plug.dj/astroparty"){
	hook;
}else{
	API.chatLog("You are not authenticated to use this in the specified room!", true);
}
});
