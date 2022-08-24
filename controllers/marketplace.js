const express = require("express");
const cloudinary = require("cloudinary").v2;

const marketplaceRouter = express.Router();
const Marketplace = require("../models/marketplace.js");

//Index
marketplaceRouter.get("/", async (req, res) => {
  const marketitems = await Marketplace.find({}).sort("-createdAt").exec();
  res.status(200).json(marketitems);
});

//Show
marketplaceRouter.get("/:marketItemID", async (req, res) => {
  const Marketitem = await Marketplace.findById(req.params.marketItemID).exec();
  res.status(200).json();
});

//Create
marketplaceRouter.post("/", async (req, res) => {
  const newMarketitem = await Marketplace.create(req.body);
  res.status(200).json(newMarketitem);
});

//PUT
marketplaceRouter.put("/:id", async (req, res) => {
  const imageUpdate = await Marketplace.findById(req.params.id);
  const updatedMarketitem = await Marketplace.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  ).exec();
  if (imageUpdate) {
    const tempArray = imageUpdate.image.split(/[/.]/g);
    imageName = tempArray[tempArray.length - 2];
    await cloudinary.uploader.destroy(imageName);
  }
  res.status(200).send(updatedMarketitem);
});

//Delete
marketplaceRouter.delete("/:id", async (req, res) => {
  const deletedMarketitem = await Marketplace.findByIdAndRemove(
    req.params.id
  ).exec();
  let imageName = "";
  if (deletedMarketitem) {
    const tempArray = deletedMarketitem.image.split(/[/.]/g);
    imageName = tempArray[tempArray.length - 2];
    await cloudinary.uploader.destroy(imageName);
  }
  res.status(200).send(deletedMarketitem);
});

module.exports = marketplaceRouter;
