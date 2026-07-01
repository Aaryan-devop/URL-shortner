const shortid = require("shortid");
const URL = require("../models/url");

async function generateShortUrl(req, res) {
  console.log("THIS IS REQ.BODY:", req.body); // Let's see what Postman is sending

  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ err: "url is required" });
  }

  // FIX: shortid requires .generate()
  const shortID = shortid.generate();

  try {
    await URL.create({
      shortd: shortID,
      redirecturl: body.url,
      longid: shortID,
    });

    return res.json({ shortID: shortID });
  } catch (error) {
    console.log("Database Error:", error);
    return res.status(500).json({ err: "Failed to create URL" });
  }
}

module.exports = { generateShortUrl };
