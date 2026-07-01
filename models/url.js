const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    shortd: {
      type: String,
      required: true,
      unique: true,
    },
    redirecturl: {
      type: String,
      required: true,
    },
    longid: {
      type: String,
      required: true,
    },
    visithistory: [{ timestamp: { type: Number } }],
  },
  { timestamp: true },
);
const URL = mongoose.model("url", urlSchema);
module.exports = URL;
