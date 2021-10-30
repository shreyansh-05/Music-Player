var sr = {};


sr.enterPress = function() {
  
	document.querySelector(".form-control").addEventListener('keypress', function( e ) {
		if ( e.which === 13 ) {
      var inputValue = e.target.value;
      
			SoundCloudAPI.getTrack(inputValue);
			
		}
	});
}
sr.submitClick = function() {
  
	document.querySelector("i").addEventListener('click', function( e ) {
		var inputValue = document.querySelector(".form-control").value;
    
    SoundCloudAPI.getTrack(inputValue);
    
	});
} 

sr.enterPress();
sr.submitClick();


function clr(){
  localStorage.clear()
  var sd = document.querySelector("#pl");
  sd.innerHTML="";
}

//2. search

var SoundCloudAPI = {};
SoundCloudAPI.init = function() {
  
SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
});

}

// find all sounds of buskers licensed under 'creative commons share alike'

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue){
  
  SC.get('/tracks', {
    q: inputValue
  }).then(function(tracks) {
    
    var searchResult = document.querySelector('.search-results');
			searchResult.innerHTML = "";
    SoundCloudAPI.renderTracks(tracks);
  });
  }

  SoundCloudAPI.renderTracks = function(tracks) {
    
    tracks.forEach(function(track){
  
      var card = document.createElement('div');
      card.classList.add("card");
      card.style="width:350px";

      var img_div = document.createElement('img');
      img_div.classList.add("card","img","top");
      img_div.style="width:100%";
      img_div.src = track.artwork_url || "b.png";
      
      var cin = document.createElement('div');
      cin.classList.add("card","body");

      var hd = document.createElement('div');
      hd.classList.add("text");
      hd.innerHTML = '<a href="'+ track.permalink_url+'" target="_blank">' + track.title + "</a>";
    
      var bt = document.createElement('button');
      bt.classList.add("btn");
      bt.style="background-color: mediumaquamarine;";
      bt.innerHTML="+ Add to playlist";

      var bt2 = document.createElement('button');
      bt2.classList.add("btn");
      bt2.style="background-color: black; color:white;";
      bt2.innerHTML="Play";

    
      card.appendChild(img_div);
      card.appendChild(cin);
      cin.appendChild(hd);
      cin.appendChild(bt);
      cin.appendChild(bt2);
    
      bt.addEventListener('click', function(){
        console.log("click");
    
        SoundCloudAPI.getEmbed(track.permalink_url);
      });
      
      bt2.addEventListener('click', function(){
        console.log("click");
          SC.stream('tracks/'+track.id).then(function(player){
            if(bt2.innerHTML=="Play")
            {
              player.play();
              bt2.innerHTML="Stop";
            }
              bt2.addEventListener('click', function(){
                if(bt2.innerHTML=="Stop"){
                  player.pause();
                  bt2.innerHTML = "PLAY";
                }
                  bt2.addEventListener('click', function(){
                    if(bt2.innerHTML=="PLAY")
                    {
                      player.play();
                      bt2.innerHTML = "Pause";
                    }
                      bt2.addEventListener('click', function(){
                        if(bt2.innerHTML=="Pause"){
                          player.pause();
                          bt2.innerHTML = "Add to playlist to play more";
                        }
                      });
                    });
          
                  });
                });

        //SoundCloudAPI.playsong('tracks/'+track.id);
        console.log(track);      
      });
    
      var searchResults = document.querySelector(".search-results");
      searchResults.appendChild(card);
      });
    }
    
  
  

    SoundCloudAPI.getEmbed = function(trackURL){
    
      SC.oEmbed(trackURL, {
        auto_play: false
      }).then(function(embed){
        console.log('oEmbed response: ', embed);
        var sd= document.querySelector("#pl");
      
        var bx = document.createElement("a");
        
        bx.innerHTML = embed.html;
      
        sd.insertBefore(bx, sd.firstChild);
        
        console.log("hi");
        localStorage.setItem("key",sd.innerHTML);
        alert("Song added to playlist successfully");
      });
    }
  
    var sd = document.querySelector("#pl");
    sd.innerHTML = localStorage.getItem("key");
