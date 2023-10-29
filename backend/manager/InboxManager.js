"use strict";
const { httpsCodes } = require("../config/contant");
const { language } = require("../language/en/language");
const Inbox = require("../models/InboxSchema");
const Chat = require('../models/chatSchema')
const Member = require("../models/memberSchema");


module.exports.sendMessage = async (receiverId, lastMessage, userId, GroupId) => {
  var result = ''
  try {
    const existingChat = await Inbox.findOne({ $or: [{ senderId: userId }, { receiverId: userId }] });
    if (existingChat) {
      existingChat.lastMessage = lastMessage;
      existingChat.timestamp = new Date();

      result = await existingChat.save();
    } else {
      const newChat = new Inbox({
        senderId: userId,
        receiverId,
        lastMessage,
        GroupId: GroupId,
        timestamp: new Date(),
      });
      result = await newChat.save();


    }
    return { status: 200, message: 'Message sent successfully', result };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Internal Server Error' };
  }
}

module.exports.getInbox = async (userId) => {
  try {
    const inboxes = await Inbox.find({ $or: [{ senderId: userId }, { receiverId: userId }] })
      .populate('senderId', 'name email image')
      .populate('receiverId', 'name email image')
      .populate({
        path: 'GroupId',
        select: '_id name description image',
      });

    if (inboxes.length > 0) {
      const promises = inboxes.map(async (inbox) => {
        const unreadMessageCount = await Chat.countDocuments({
          inboxId: inbox._id,
          isRead: false
        });

        // Check if there is a valid GroupId
        if (inbox.GroupId && inbox.GroupId._id) {
          const GroupId = inbox.GroupId._id;
          const groupMembers = await Member.find({ group: GroupId });
          return {
            ...inbox.toObject(),
            unreadMessageCount,
            groupMembers,
          };
        }

        return {
          ...inbox.toObject(),
          unreadMessageCount,
        };
      });

      const inboxsWithUnreadCounts = await Promise.all(promises);

      return {
        status: httpsCodes.SUCCESS_CODE,
        message: language.RECORD_FOUND,
        result: inboxsWithUnreadCounts
      };
    } else {
      return {
        status: httpsCodes.NOT_FOUND,
        message: language.NOT_FOUND
      };
    }
  } catch (error) {
    throw error;
  }
};


