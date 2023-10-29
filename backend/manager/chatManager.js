"use strict";
const { httpsCodes } = require("../config/contant");
const { language } = require("../language/en/language");
const Chat = require("../models/chatSchema");
const Inbox = require("../models/InboxSchema")


module.exports.getChat = async (inboxId) => {
  try {
    const result = await Chat.find({ inboxId: inboxId })
      .populate('sender', 'name email image')
      .populate('receiver', 'name email image');
    if (result.length > 0) {
      return {
        status: httpsCodes.SUCCESS_CODE,
        message: language.RECORD_FOUND,
        result: result,
      };
    } else {
      return {
        status: httpsCodes.NOT_FOUND,
        message: language.NOT_FOUND,
      };
    }
  } catch (error) {
    throw error;
  }
}

module.exports.Message = async ({ sender, message, receiver, inboxId, type }) => {
  try {
    var inboxData;
    if (inboxId) {
      inboxData = await Inbox.findOne({ _id: inboxId }).populate('senderId', 'name email image').populate('receiverId', 'name email image');
      inboxData.lastMessage = message;
      await inboxData.save();

      inboxData.type = type;

      await inboxData.save();

      const newChatMessage = new Chat({
        inboxId: inboxId,
        message: message,
        sender: sender,
        receiver: receiver,
      });

      const savedMessage = await newChatMessage.save();
      const populateMessage = await Chat.findOne({ _id: savedMessage._id }).populate('sender', 'name email image').populate('receiver', 'name email image');
      IO.to(onlineUsers.get(`${receiver}`)).emit('messageReceived', populateMessage);
      IO.to(onlineUsers.get(`${sender}`)).emit('messageReceived', populateMessage);

      return { status: 200, message: 'Message sent successfully', data: populateMessage };
    } else {
      const newInbox = new Inbox({
        senderId: sender,
        receiverId: receiver,
        lastMessage: message,
        timestamp: new Date(),
        type: type,
      });

      inboxData = await newInbox.save();

      const newChatMessage = new Chat({
        inboxId: inboxData._id,
        message: message,
        sender: sender,
        receiver: receiver,
      });

      const savedMessage = await newChatMessage.save();
      const populateMessage = await Chat.findOne({ _id: savedMessage._id }).populate('sender', 'name email image').populate('receiver', 'name email image');

      IO.to(onlineUsers.get(`${receiver}`)).emit('messageReceived', populateMessage);
      IO.to(onlineUsers.get(`${sender}`)).emit('messageReceived', populateMessage);
      return { status: 200, message: 'Message sent successfully', data: populateMessage };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Internal Server Error' };
  }
};




// ========== Update =========
module.exports.markAsRead = async (inboxId) => {
  try {
    let result = "";
    const data = await Chat.updateMany(
      { inboxId, isRead: false },
      { $set: { isRead: true } }
    );

    result = { status: httpsCodes.NOT_FOUND, message: language.NOT_FOUND };

    if (data) {
      result = {
        status: httpsCodes.SUCCESS_CODE,
        message: language.ONE_RECORD_UPDATE,
        result: data,
      };
    }
    return result;
  } catch (error) {
    throw error;
  }
}

