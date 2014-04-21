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
	jQuery.getScript("https://raw.githubusercontent.com/Pr0Code/Sound/master/src/main.js");
}
if(auth = false){
	API.chatLog("You are not authenticated to use this script in the requested room.", true);
}
