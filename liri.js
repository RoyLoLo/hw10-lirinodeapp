//var spotify = new Spotify(keys.spotify);

//requires(((((((((((((((((((((())))))))))))))))))))))
var dotenv = require("dotenv").config();
var fs = require("fs");
var Twitter = require("twitter");
var config = require("./keys.js");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var omdbApi = require('omdb-client');

//spotify keys(((((((((((((((((((()))))))))))))))))))) 
var spotify = new Spotify({
  id : config.spotify.id,
  secret : config.spotify.secret
});


//twitter Keys(((((((((((((((((((())))))))))))))))))))

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.token_key,
  access_token_secret: config.twitter.token_secret
});

//liri app start with inquirer selection((((((()))))))
inquirer.prompt([
  {
    type: "list",
    name: "inputs",
    choices: ["My Tweets", "Spotify This Song", "Movie This", "Do What it Says"],
    message: "Please make you selection."
  }
]).then(function (twitdata) {
 
 
  //console.log(data);
  switch(twitdata.inputs){
   
    case "My Tweets" : 
    
    var params = {
    screen_name: "RoyRoyLoLo",
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (!error) {
        console.log(tweets);
        for (j = 0; j < tweets.length; j++) {
          console.log(`Tweet : ${tweets[j].text}`);
          console.log(`Created : ${tweets[j].created_at}`);
          console.log("****************************************************")
        };
      }
    });
    break;
    
    //console.log(client);
    
    case  "Spotify This Song" :
    
    inquirer.prompt([
      {
        type : "prompt",
        name : "searchterm",
        message : "Please enter the name of a song."
      }
    ]).then(function(data){
    
   
      
      var term = data.searchterm;

        
          spotify.search({ type: 'track', query: term, limit : 10 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log(`${term}`);
            console.log(data.tracks.items[0].artists[0].name); 
          });//spotify search end 
        
    })//inquirer.prompt then end
    

    
    break;
    case "Movie This" :
       
        inquirer.prompt([
          {
          type : "prompt",
          name : "moviename",
          message : "Enter a movie Name"
          }
      ]).then(function(data){
          
          var params = {
            apiKey: "trilogy",
            title: data.moviename,
          }
          omdbApi.get(params, function(err, data) {
            console.log(data.Title);
            console.log(data.Year);
            console.log(data.Ratings[0]);
            console.log(data.Country);
            console.log(data.Language);
            console.log(data.Plot);
            console.log(data.Actors);
          });
  
        })//end movie inquirer then

    break;
    
    case "Do What it Says":
      fs.readFile("random.txt","utf8",function(error,data){
        if (error){
          return console.log(error);
        }
        var textsplit = data.split(",");
                
        spotify.search({ type: 'track', query: textsplit[1], limit : 10 }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          console.log(textsplit[1]);
         console.log(data.tracks.items[0].artists[0].name); 
        });//spotify search end 
      })
    
    break;
  };//switch end

});//inquirer.prompt then end





