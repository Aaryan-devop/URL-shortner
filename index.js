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
        },
      },
    },
  );

  if (!entry) {
    return res.status(404).send("URL not found");
  }

  res.redirect(entry.redirecturl);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
