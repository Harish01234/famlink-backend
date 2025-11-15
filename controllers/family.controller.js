// controllers/family.controller.js
import Family from "../models/Family.model.js";
import User from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateInviteCode } from "../utils/generateInviteCode.js";

export const createFamily = asyncHandler(async (req, res) => {
  const { familyName } = req.body;
  const user = req.user;

  if (user.role !== "parent") {
    return res.status(403).json({ message: "Only parents can create families" });
  }

  const inviteCode = generateInviteCode();

  const family = await Family.create({
    familyName,
    createdBy: user._id,
    members: [user._id],
    inviteCode
  });

  user.familyId = family._id;
  await user.save();

  res.status(201).json({ family });
});

export const joinFamilyByCode = asyncHandler(async (req, res) => {
  const { inviteCode } = req.body;
  const user = req.user;

  const family = await Family.findOne({ inviteCode });
  if (!family) {
    return res.status(404).json({ message: "Family not found" });
  }

  const alreadyMember = family.members.some(
    (m) => m.toString() === user._id.toString()
  );
  if (!alreadyMember) {
    family.members.push(user._id);
    await family.save();
  }

  user.familyId = family._id;
  await user.save();

  res.json({ family });
});

export const getFamilyMembers = asyncHandler(async (req, res) => {
  const { familyId } = req.body;

  if (!familyId) {
    return res.status(400).json({ message: "familyId is required" });
  }

  const family = await Family.findById(familyId)
    .populate("members", "name role email");

  if (!family) {
    return res.status(404).json({ message: "Family not found" });
  }

  return res.status(200).json({
    success: true,
    members: family.members,
  });
});