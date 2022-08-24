const express = require("express");

const uploadRouter = express.Router();

const upload = require("../middlewares/upload");

uploadRouter.post("/", upload.single("photo"), async (req, res) => {
  res.status(200).json(req.file);
});

module.exports = uploadRouter;
