/*
This is used as a gateway to the script, so it's only used in my room
*/
var gate = {};

gate.hook = function(){
(function(){$.getScript('https://raw.githubusercontent.com/Pr0Code/Sound/master/sound.js');
API.chatLog("Authentication Successful!");
	});
}

API.on(API.CHAT, function get(url){

var auth = document.url;
if(auth = "http://plug.dj/astroparty"){
	return true;
}else{
	return false;
	}
});

if(auth = true){
	gate.hook;
}else{
	API.chatLog("You are not authenticated to use this in the requested room.", true);
}
