/*
This is used as a gateway to the script, so it's only used in my room
*/

var hook = (function(){
	API.on(API.CHAT);
	API.setVolume(0);
	$.getScript('https://raw.githubusercontent.com/Pr0Code/Sound/master/sound.js');

});

var auth = window.location = "";
if(auth = "http://plug.dj/astroparty"){
	API.chatLog("Authentication Successful!");
        hook;
}else{
	API.chatLog("You are not authenticated to use this script in the specified room!", true);
}
