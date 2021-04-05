const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TrackingSchema = new Schema(
  {
    _id: { type: String, required: true },
    noenvio: { type: String, required: true, trim: true },
    data: [
      {
        latitude: String,
        longitude: String,
        time: String,
      },
    ],
  },
  { _id: false }
);
module.exports = mongoose.model("Tracking", TrackingSchema);
