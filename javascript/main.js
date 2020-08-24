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
  var sd = document.querySelector(".playlist");
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
      img_div.src = track.artwork_url || "sh.jpg";
      
      var cin = document.createElement('div');
      cin.classList.add("card","body");

      var hd = document.createElement('div');
      hd.classList.add("text");
      hd.innerHTML = '<a href="'+ track.permalink_url+'" target="_blank">' + track.title + "</a>";
    
      var bt = document.createElement('a');
      bt.classList.add("btn","primary");
      bt.innerHTML="Add to playlist"
    
      card.appendChild(img_div);
      card.appendChild(cin);
      cin.appendChild(hd);
      cin.appendChild(bt);
    
      bt.addEventListener('click', function(){
        console.log("click");
    
        SoundCloudAPI.getEmbed(track.permalink_url);
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
        var sd= document.querySelector(".playlist");
      
        var bx = document.createElement("div");
        bx.innerHTML = embed.html;
      
        sd.insertBefore(bx, sd.firstChild);
        
        console.log("hi");
        localStorage.setItem("key",sd.innerHTML);
        alert("Song added to playlist successfully");
      });
    }
  
    var sd = document.querySelector(".playlist");
    sd.innerHTML = localStorage.getItem("key");