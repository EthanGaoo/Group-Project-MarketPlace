require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");

const Marketplace = require(path.join(__dirname, "../models/marketplace"));
const dummyData = require("./MOCK_DATA.json");

const dbURL = process.env.MONGODB_URL;

mongoose.connect(dbURL, async () => {
  console.log("Connected to Marketplace db");

  console.log("Resetting Marketplace collection");
  await Marketplace.collection.drop();
  console.log("Marketplace collection dropped");

  console.log("Inserting seed data");
  const insertedMarketplace = await Marketplace.insertMany(dummyData);
  console.log("Dummy Marketplace inserted");
  console.log(insertedMarketplace);

  mongoose.connection.close();
});
