const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async (req, res) => {
  const allUrls = await URL.find().sort({ createdAt: -1 });
  const origin = `${req.protocol}://${req.get("host")}`;
  return res.render("home", { urls: allUrls, origin });
});

module.exports = router;
