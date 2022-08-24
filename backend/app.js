const express = require("express");
const bodyParser = require("body-parser");
console.log("app is working");
const app = express();

playerNumber = 0;
otherX = 200;
otherY = 300;
player1X = 0;
player1Y = 0;
player2X = 0;
player2Y = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// responding to GET requests for the player number
app.get("/output",(req, res, next) => {

  playerNumber +=1;
  console.log("sending " + playerNumber);

  res.status(200).json({output: playerNumber});
  })

  // responding to GET requests for positional data depending on player.
  app.get("/P2X", (req, res, next) => {

  console.log("sending p2X pos as: " + player2X);
  res.status(200).json({P2X: player2X, P2Y: player2Y});
  });

  app.get("/P1X", (req, res, next) => {

    console.log("sending p1X pos as: " + player1X);
    res.status(200).json({P1X: player1X, P1Y: player1Y});
    });

// translating data sent to the backend
  app.post("/receive", (req, res, next) => {
    let a = JSON.parse(req.body.packetX);
    let c = JSON.parse(req.body.packetY);
    let b = JSON.parse(req.body.player);
    if (b === 1){
    player1X = a;
    player1Y= c;
    console.log("player1 reported pos as:" + player1X + " " + player1Y);
    }
    else {
    player2X = a;
    player2Y= c;
    console.log("player2 reported pos as:" + player2X + " " + player2Y);
    }

    reply = JSON.stringify(player1X);
    res.status(201).json(player1X
    );
  });


  module.exports = app;
