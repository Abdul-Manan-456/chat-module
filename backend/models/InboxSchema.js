const mongoose = require("mongoose");

// Define Inbox schema
const inboxSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    receiverId:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    GroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group", 
    },
    lastMessage: {
      type: String,
    },
    type: {
      type: String, 
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "inbox",
  }
);

// Export the Inbox model
module.exports = mongoose.model("Inbox", inboxSchema);

