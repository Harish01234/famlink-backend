import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    lat: {
      type: Number,
      required: true
    },

    lng: {
      type: Number,
      required: true
    },

    timestamp: {
      type: Number, // epoch ms
      required: true
    }
  }
);

export default mongoose.model("Location", LocationSchema);
