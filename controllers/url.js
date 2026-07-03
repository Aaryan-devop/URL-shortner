const shortid = require("shortid");
const { URL: NodeURL } = require("url");
const URL = require("../models/url");

// POST /url  { url: "https://..." }
async function generateShortUrl(req, res) {
  const body = req.body;

  if (!body || !body.url) {
    return res.status(400).json({ error: "A url is required." });
  }

  try {
    // basic sanity check so we don't store garbage
    new NodeURL(body.url);
  } catch (err) {
    return res.status(400).json({ error: "That doesn't look like a valid url." });
  }

  const shortID = shortid.generate();

  await URL.create({
    shortd: shortID,
    redirecturl: body.url,
    visithistory: [],
  });

  return res.status(201).json({ id: shortID });
}

// GET /url  -> list all short urls, most recent first
async function getAllUrls(req, res) {
  const urls = await URL.find().sort({ createdAt: -1 });
  return res.json(urls);
}

// GET /url/:shortId -> stats for a single short url
async function getUrlStats(req, res) {
  const url = await URL.findOne({ shortd: req.params.shortId });
  if (!url) {
    return res.status(404).json({ error: "Short url not found." });
  }
  return res.json({
    totalClicks: url.visithistory.length,
    visitHistory: url.visithistory,
  });
}

// DELETE /url/:shortId
async function deleteUrl(req, res) {
  const deleted = await URL.findOneAndDelete({ shortd: req.params.shortId });
  if (!deleted) {
    return res.status(404).json({ error: "Short url not found." });
  }
  return res.json({ success: true });
}

module.exports = {
  generateShortUrl,
  getAllUrls,
  getUrlStats,
  deleteUrl,
};
