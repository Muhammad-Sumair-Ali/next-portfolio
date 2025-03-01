import mongoose, { Schema } from "mongoose";

const GuestbookSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, 
    username: { type: String, required: true },
    email: { type: String, required: true },
    profileUrl: { type: String, required: true }, 
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Guestbook ||
  mongoose.model("Guestbook", GuestbookSchema);
