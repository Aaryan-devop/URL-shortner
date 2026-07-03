const express = require("express");
const {
  generateShortUrl,
  getAllUrls,
  getUrlStats,
  deleteUrl,
} = require("../controllers/url");
const router = express.Router();

router.post("/", generateShortUrl);
router.get("/", getAllUrls);
router.get("/:shortId", getUrlStats);
router.delete("/:shortId", deleteUrl);

module.exports = router;
