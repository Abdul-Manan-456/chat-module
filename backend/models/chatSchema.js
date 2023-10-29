const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    inboxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inbox", 
      required: true,
    },
    message: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false, 
    }
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Chat", chatSchema);
