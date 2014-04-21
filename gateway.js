/*
This is used as a gateway to the script, so it's only used in my room
*/
API.on(API.CHAT, function get(url){

var auth = document.url;
if(auth = "http://plug.dj/astroparty"){
	return true;
}else{
	return false;
	}
});

if(auth = true){
	API.chatLog("Authentication Successful!");
	(function(){$.getScript('https://raw.githubusercontent.com/Pr0Code/Sound/master/sound.js');
});
else{
	API.chatLog("You are not authenticated to use this in the requested room.", true);
}
