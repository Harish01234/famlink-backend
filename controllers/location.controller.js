// controllers/location.controller.js
import Location from "../models/Location.model.js";
import User from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// export const updateLocation = asyncHandler(async (req, res) => {
//   const { childId, lat, lng } = req.body;

//   if (!childId || lat == null || lng == null) {
//     return res.status(400).json({ message: "childId, lat & lng are required" });
//   }

//   const child = await User.findById(childId);
//   if (!child || child.role !== "child") {
//     return res.status(400).json({ message: "Invalid child" });
//   }

//   const location = await Location.create({
//     childId,
//     lat,
//     lng,
//     timestamp: Date.now()
//   });

//   const io = req.app.get("io");

//   io.to(`parent:${childId}`).emit("locationUpdate", {
//     childId,
//     lat,
//     lng,
//     ts: location.timestamp
//   });

//   res.json({ success: true });
// });

export const getLatestLocation = asyncHandler(async (req, res) => {
  const { childId } = req.params;

  const location = await Location.findOne({ childId })
    .sort({ timestamp: -1 })
    .lean();

  if (!location) {
    return res.status(404).json({ message: "No location found" });
  }

  res.json({ location });
});




export const updateLocation = asyncHandler(async (req, res) => {
  const { childId, lat, lng } = req.body;

  if (!childId || lat == null || lng == null) {
    return res.status(400).json({ message: "childId, lat & lng are required" });
  }

  // Check if a location already exists for this childId
  let location;
  const existingLocation = await Location.findOne({ childId });

  if (existingLocation) {
    // If the location exists, update lat and lng
    location = await Location.findOneAndUpdate(
      { childId }, // Find the location for this childId
      { lat, lng, timestamp: Date.now() }, // Update the location data
      { new: true } // Return the updated document
    );
  } else {
    // If no location exists, create a new one
    location = await Location.create({
      childId,
      lat,
      lng,
      timestamp: Date.now()
    });
  }

  // Emit the updated location to the parent's room
  const io = req.app.get("io");
  io.to(`parent:${childId}`).emit("locationUpdate", {
    childId,
    lat,
    lng,
    ts: location.timestamp
  });

  res.json({ success: true });
});
