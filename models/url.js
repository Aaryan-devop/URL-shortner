const mongoose = require("mongoose");
<<<<<<< HEAD

=======
>>>>>>> 287784ff86f454b38368198f14909e7aa15c0441
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
<<<<<<< HEAD
    visithistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true },
);

const URL = mongoose.model("url", urlSchema);

=======
    longid: {
      type: String,
      required: true,
    },
    visithistory: [{ timestamp: { type: Number } }],
  },
  { timestamp: true },
);
const URL = mongoose.model("url", urlSchema);
>>>>>>> 287784ff86f454b38368198f14909e7aa15c0441
module.exports = URL;
