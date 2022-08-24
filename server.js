///////////////////////////////
//  Dependencies
///////////////////////////////

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session");


const app = express();
const PORT = process.env.PORT;
const dbURL = process.env.MONGODB_URL;
const MongoDBStore = mongoDBSession(session);
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: "sessions",
});

const userController = require("./controllers/users");
const marketplaceController = require("./controllers/marketplace.js");
const uploadController = require("./controllers/uploads");

//////////////////////////
//  Middlewares
//////////////////////////
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/client/build'))
/////////////////////
//  Controllers
/////////////////////
app.use("/api/marketplace", marketplaceController);
app.use("/users", userController);
app.use("/upload", uploadController);
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})
/////////////////////
//  Listeners & DB
/////////////////////
mongoose.connect(dbURL, () => {
  console.log("Connected to market db");
});

app.listen(PORT, () => {
  console.log("Listening on", PORT);
});
