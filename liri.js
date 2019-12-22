require("dotenv").config();

var moment = require('moment');
var keys = require("./key.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var reqType = process.argv[2];
var  reqSubject = "";
var nodeArgs = process.argv;

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      reqSubject = reqSubject + " " + nodeArgs[i];
    } else {
        reqSubject += nodeArgs[i];
  
    }
}


switch(reqType){
    case "concert-this":
        findConcerts(reqSubject);
        break;
    case "spotify-this-song":
        findSpotify(reqSubject);
        break;  
    case "movie-this":

        break;
    case "do-what-it-says":

        break;
}

function findConcerts(artistName){

var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

axios.get(queryUrl).then(
  function(response) {
        for(var j = 0; j<response.data.length;j++){
            var formattedTime = moment(response.data[j].datetime).format('L');
            console.log("Venue: " + response.data[j].venue.name);
            console.log("Locatiion: " + response.data[j].venue.city +"," +response.data[j].venue.region);
            console.log("Date: " + formattedTime);
            console.log(" ");
        }
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function findSpotify(songTitle){

  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
  
  spotify.search({ type: 'track', query: songTitle, limit: 1})
  .then(function(response1) {
    console.log("\n");
    console.log("Artist: " + response1.tracks.items[0].artists[0].name)
    console.log("Song title: " + response1.tracks.items[0].name);
    console.log("Spotify link: " + response1.tracks.items[0].album.external_urls.spotify);
    console.log("Album link: " + response1.tracks.items[0].album.name);
    console.log("\n");
  })
  .catch(function(err) {
    console.log(err);
  });


}