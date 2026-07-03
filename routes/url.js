const express = require("express");
<<<<<<< HEAD
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
=======
const { generateShortUrl } = require("../controllers/url");
const router = express.Router();

router.post("/", generateShortUrl);
>>>>>>> 287784ff86f454b38368198f14909e7aa15c0441

module.exports = router;
