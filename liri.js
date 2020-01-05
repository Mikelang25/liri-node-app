require("dotenv").config();

var fs = require("fs");
var moment = require('moment');
var keys = require("./key.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var reqType = process.argv[2];
var reqSubject = "";
var nodeArgs = process.argv;


for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      reqSubject = reqSubject + " " + nodeArgs[i];
    } else {
      reqSubject += nodeArgs[i];
  
    }
}
var text = reqType + "  " + reqSubject + ",";

switch(reqType){
    case "concert-this":
        findConcerts(reqSubject);
        logRequest();
        break;
    case "spotify-this-song":
        if(reqSubject ===""){
          reqSubject = "The Sign"
        }
        findSpotify(reqSubject);
        logRequest();
        break;  
    case "movie-this":
        if(reqSubject ===""){
          reqSubject = "Mr. Nobody"
        }
        findMovie(reqSubject);
        logRequest();
        break;
    case "do-what-it-says":
        doWhatItSays();
        logRequest();
        break;
}


function logRequest(){
  fs.appendFile("log.txt", text, function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
  
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      console.log("Action successfully logged!");
    }
  
  });
}

function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    findSpotify(data);
  
  });
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
  
  spotify.search({ type: 'track', query: songTitle, limit: 2})
  .then(function(response1) {
    console.log("\n");
    console.log("Artist: " + response1.tracks.items[0].artists[0].name)
    console.log("Song title: " + response1.tracks.items[0].name);
    console.log("Spotify link: " + response1.tracks.items[0].album.external_urls.spotify);
    console.log("Album link: " + response1.tracks.items[0].album.name);
    console.log("\n");
    console.log("Artist: " + response1.tracks.items[1].artists[0].name)
    console.log("Song title: " + response1.tracks.items[1].name);
    console.log("Spotify link: " + response1.tracks.items[1].album.external_urls.spotify);
    console.log("Album link: " + response1.tracks.items[1].album.name);
    console.log("\n");
  })
  .catch(function(err) {
    console.log(err);
  });


}

function findMovie(movieTitle){

var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
  function(response) {
    console.log("\n");
    console.log("Title: " + response.data.Title);
    console.log("Released: " + response.data.Year);
    console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Produced in: " + response.data.Country);
    console.log("Language(s): " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("\n");
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