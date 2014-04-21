/*
This is used as a gateway to the script, so it's only used in my room
*/
var gate = {};

gate.hook = function(){
(function(){$.getScript('https://raw.githubusercontent.com/Pr0Code/Sound/master/sound.js');
API.chatLog("Authentication Successful!");
setTimeout(function(){
API.chatLog("Hooking...");
}, 500);
});

API.on(API.CHAT, function(){

var auth = document.url;
if(auth = "http://plug.dj/astroparty"){
	gate.hook;
}else{
	API.chatLog("You are not authenticated to use this in the specified room!", true);
	}
});
