require("dotenv").config();

var moment = require('moment');
var keys = require("./key.js");
var axios = require("axios");
var reqType = process.argv[2];
var  reqSubject = "";
var nodeArgs = process.argv;

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      reqSubject = reqSubject + "+" + nodeArgs[i];
    } else {
        reqSubject += nodeArgs[i];
  
    }
}

console.log(reqSubject)

switch(reqType){
    case "concert-this":
        findConcerts(reqSubject);
        break;
    case "spotify-this-song":

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
