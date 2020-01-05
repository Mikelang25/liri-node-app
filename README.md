# liri-node-app

1. This node program allows the user to lookup concert information on a specific artist, search the spotify api for song information on a track of their choice, and look up information for some of their favorite movie titles. 

2. The strucutre of the app itself it very straightforward. All of the requirements are first layed out then there is logic to determine the type of request that the user is making whether it be for concert-this, spotify, or axios for the movie info. For each request type there is a different function that represents the next set of actions that will deliver the output to the console for the user. There is also functionality that will log the user's commands to the log.txt file so that one would be able to see what was historically requested with the app. 

3. Instructions: 
    -All users will be required to run NPM install prior to using the App. 
    -Each command will begin with    " node liri.js " follow by one of the following three options 
        1. concert-this ARTIST NAME 
        2. spotify-this-song SONG TITLE
            -If no song title is provided, it will default to We Are the Champions by Queen 
        3. movie-this MOVIE TITLE 
            -If no movie title is provided, it will default to Mr. Nobody
        4. do-what-it-says 
            -this command return information for I Want it That Way by the Backstret Boys 

    -Once the request has been submitted, it will return information based on the type of request  that you made. 

4. Technologies used: 
    - Node Spotify API 
    - Axios 
    - Moment 
    - DotEnv 


        