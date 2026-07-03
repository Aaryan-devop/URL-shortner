const express = require("express");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const urlRoutes = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const port = process.env.PORT || 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.static(path.resolve("./public")));

app.use("/url", urlRoutes);
app.use("/", staticRoute);

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// redirect handler — keep this AFTER the static router / api routes
// so it doesn't swallow "/" or "/url"
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const entry = await URL.findOneAndUpdate(
    { shortd: shortId },
    {
      $push: {
        visithistory: {
          timestamp: Date.now(),
        },
      },
    },
  );

  if (!entry) {
    return res.status(404).send("Short url not found.");
  }

  res.redirect(entry.redirecturl);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
