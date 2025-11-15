import mongoose from "mongoose";

const FamilySchema = new mongoose.Schema(
  {
    familyName: {
      type: String,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    inviteCode: {
      type: String,
      unique: true,
      sparse: true // used for joining via code
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

export default mongoose.model("Family", FamilySchema);
