/*
This is used as a gateway to the script, so it's only used in my room
*/

function(){

var hook = (function(data){
	API.on(API.CHAT);
	API.setVolume(0);
	$.getScript('https://raw.githubusercontent.com/Pr0Code/Sound/master/sound.js');

});

var auth = window.location = "http://plug.dj/astroparty";
if(auth = "http://plug.dj/astroparty"){
	return true;
}else{
	return false;
}

if(auth = true){
	hook;
}
else{
	API.chatLog("You are not authenticated to use this script in this room.", true);
	}
});
