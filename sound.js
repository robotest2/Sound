/*

Hey there!

This is property of Pr0Code.

Enjoy using it in my room!

*/

//Get user id

var unloader = function(){
	
	API.off(API.CHAT);
	
	API.setVolume(100);

}


/*

var nameId = function getUser(name) {
        
        var users = API.getUsers();
        
        for (var i in users) if (users[i].username == name) return users[i].id;
        
        return null;

}

*/


API.sendChat("/em now live!");


//Commands

    API.on(API.CHAT, function(data){
        
        if(data.message.indexOf('!help') === 0){
          //Experiment 
           API.moderateDeleteChat(data.from);
           API.sendChat("/em Help commands: TEST");
        );
       }
           
           
           
           
           
           
           /*
            var cmd = data.message, from = data.from, fromID = data.fromID;
           
            var id = data.fromID;
           
            var cmdm = data.message;
           
            var command = cmdm.substring(1).split(' ');
               
            for(var i = 2; i<command.length; i++){
                  
                    command[1] = command[1] + ' ' + command[i];
           
            }
            
           
            try{
            
           
            if(API.getUser(data.fromID).permission > -1 || API.getUser(fromID).permission < 7){
               
                switch(command[0].toLowerCase()){
                    
                
                  case "help":
                    
                    if(typeof command[1] == "undefined"){
                     
                      API.moderateDeleteChat(data.chatID);
                     
                      API.sendChat("/em Here's my commands: | User !help, !staff, !ba, !me | Rdj !space | Bouncer !skip, !say, !lock, !unlock, !lockskip, !clear, !kick, !add | More coming soon!");

                    }
                    
                break;
                   
                   
                  case "link":
                  	
                  	if(API.getMedia().format == 1){
			
				API.sendChat("/em [" + data.from + "] Link to current song: http://youtu.be/" + API.getMedia().cid);
			
			}else{
			
				var md = API.getMedia().cid;
			
				SC.get('/tracks', { ids: id,}, function(tracks) {
				
					API.sendChat("/em [" + data.from + "] Link to current song: " + tracks[0].permalink_url);
			
				});
		
			}
			
			break;
                    
                    
                  case "staff":
                  	
                  	if(typeof command[1] == "undefined"){
                  	
                  		API.moderateDeleteChat(data.chatID);
                  	
                  		var staff = API.getStaff();
                  	
                  		API.sendChat("/em [" + data.from + "] Staff currently online: " + staff);
                  	
                  	}
                  	
                  	break;
                    
                    
                  case "ba":
                   
                    if(typeof command[1] == "undefined"){
                     
                      API.moderateDeleteChat(data.chatID);
                     
                      API.sendChat("/em Brand Ambassadors (BA's) are Plug.Dj's global moderators. More infro here: http://blog.plug.dj/brand-ambassadors/");
                    
                    }
                   
                    break;
                   
                   
                  case "me":
                    
                    if(typeof command[1] == "undefined"){
                      
                      API.moderateDeleteChat(data.chatID);
                     
                      API.sendChat("/em [" + data.from + "] You are: " + data.from + ", otherwise known as " + data.fromID + ".");
                   
                    }
                  
                    break;
                    
                    
                    //Resident DJ Commands
                    
                    
                  case "space":
                    
                    if(API.getUser(data.fromID).permission > 1 || API.getUser(fromID).permission < 10){
                     
                      API.moderateDeleteChat(data.chatID);
                     
                      API.sendChat("/em I refuse to serve people with spaces!");
                    
                    }
                   
                    break;
                    
                    
                    //Bouncer Commands
                   
                    
                  case "skip":
                  	
                  	if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                  		
                  		API.moderateDeleteChat(data.chatID);
                  		
                  		API.sendChat("/em [" + data.from + " used skip]");
                  		
                  		API.moderateForceSkip();
                  	
                  	}
                  
                  	break;
                    
                  
                  case "say":
                    
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                     
                      API.moderateDeleteChat(data.chatID);
                     
                      API.sendChat("/em [" + data.from + "] " + command[1]);
                    
                    }
                   
                    break;
                    
                    
                  case "lock":
                    
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                     
                      API.moderateDeleteChat(data.chatID);
                     
                      API.sendChat("/em [" + data.from + " used lock]");
                     
                      API.moderateLockWaitList(true, false);
                    
                    }
                    
                    break;
                    
                    
                  case "unlock":
                  
                  	if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                  	
                  		API.moderateDeleteChat(data.chatID);
                  	
                  		API.sendChat("/em [" + data.from + " used unlock]");
                  	
                  		API.moderateLockWaitList(false);
                  	
                  	}
                  
                  	break;
                    
                    
                  case "lockskip":
                    
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                    
                      API.moderateDeleteChat(data.chatID);
                     
                      API.sendChat("/em [" + data.from + " used lockskip]");
                     
                      API.moderateLockWaitList(true, false);
                     
                      API.moderateForceSkip();
                    
                    }
                   
                    break;
                    
                    
                  case "clear":
                    
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                     
                      API.moderateDeleteChat(data.chatID);
                     
                      API.sendChat("/em [" + data.from + " used clear]");
                                 
                                   var messages = $('#chat-messages').children();
				 
				   for (var i = 0; i < messages.length; i++) {
    				 
    				   for (var j = 0; j < messages[i].classList.length; j++) {
        			  
        			   if (messages[i].classList[j].indexOf('cid-') == 0) {
            			 
            			   API.moderateDeleteChat(messages[i].classList[j].substr(4));
        			
        				}
    			
    				}
		
			}
                    
                    }
                   
                    break;
                    
                    
                  case "kick":
                   
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                      
                      API.moderateDeleteChat(data.chatID);
                     
                      API.sendChat("/em [" + data.from + "] kicked " + userid + " for 1 minute!");
                     
                     var name = command.substr(command.indexOf('@')+1);
                     
                      var userid = API.getUser(user.id);
                     
                      API.moderateBanUser(userid, 0, API.BAN.HOUR);
                     
                      setTimeout(function(){
                     
                        API.moderateUnbanUser(userID)
                     
                      }, 60000);
                     
                      setTimeout(function(){
                     
                        API.sendChat("/em Kicked user can now login!");
                     
                      }, 60010);
                    
                    }
                  
                    break;
                    
                    
                  case "add":
                    
                    if(API.getUser(data.fromID).permission > 2 || API.getUser(fromID).permission < 10){
                     
                      API.moderateDeleteChat(data.chatID);
                  
                      var name = cmdm.substr(cmdm.indexOf('@')+1);
                    
                      var user = API.getUser(user.id);
                   
                      API.moderateAddDJ(user);
                   
                      API.sendChat("/em [" + data.from + " used add]");
                   
                    }
                  
                    break;
                    
                    //Manager commands

            
            }
       
        }
            
            //}
   */ 
    }catch(err){
  
  var date = new Date();
 
  API.chatLog("An error has occured on " + date + " for " + err, true);
 
  API.sendChat("/em An error has occured on " + date + " for " + err);
 
  unloader;
 
 }
        
        }
    
    }

);
