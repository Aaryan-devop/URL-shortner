<<<<<<< HEAD
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
=======
// const express = require("express");

// const { connectToMongoDB } = require("./routes/url");
// const urlRoutes = require("./routes/url");

// const port = process.env.PORT || 8001;

// connectToMongoDB("mongodb://localhost:27017/short-url")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("MongoDB Error:", err));
// // const app = express();
// // app.use(express.json());
// app.use("/url", urlRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const app = express();

const { connectToMongoDB } = require("./connect"); // change path if needed
const URL = require("./models/url"); // ADD THIS to prevent a crash later!
const urlRoutes = require("./routes/url");

const port = process.env.PORT || 8001;

app.use(express.json());
app.use("/url", urlRoutes);

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/:shirtid", async (req, res) => {
  const shirtid = req.params.shirtid;

  const entry = await URL.findOneAndUpdate(
    { shortd: shirtid }, // Check your schema! If you used shortd in create(), use shortd here too.
    {
      $push: {
        visithistory: {
          timestamp: Date.now(), // Wrap it inside an object!
>>>>>>> 287784ff86f454b38368198f14909e7aa15c0441
        },
      },
    },
  );

  if (!entry) {
<<<<<<< HEAD
    return res.status(404).send("Short url not found.");
=======
    return res.status(404).send("URL not found");
>>>>>>> 287784ff86f454b38368198f14909e7aa15c0441
  }

  res.redirect(entry.redirecturl);
});
<<<<<<< HEAD

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
=======
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
>>>>>>> 287784ff86f454b38368198f14909e7aa15c0441
});
