import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      sparse: true // children may not have email
    },

    password: {
      type: String,
      required: false // children may not log in
    },

    role: {
      type: String,
      enum: ["parent", "child"],
      required: true
    },

    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: false // assigned after joining a family
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

export default mongoose.model("User", UserSchema);
