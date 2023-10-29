"use strict";
const { httpsCodes } = require("../config/contant");
const { language } = require("../language/en/language");
const Group = require('../models/groupSchema');
const GroupMessage = require('../models/groupMessageSchema');
const Inbox = require('../models/InboxSchema');


module.exports.groupsChat = async ({ senderId, groupId, content }) => {
    try {
        const newMessage = new GroupMessage({
            group: groupId,
            sender: senderId,
            content,
        });

        const savedMessage = await newMessage.save();

        const group = await Group.findById(groupId);
        if (!group) {
            return { status: httpsCodes.NOT_FOUND, error: 'Group not found' };
        }

        group.messages.push(savedMessage._id);
        await group.save();
        
        const inbox = await Inbox.findOne({ GroupId: groupId });
        if (inbox) {
            inbox.lastMessage = content;
            inbox.senderId = senderId;
            await inbox.save();
        } else {
            const newInbox = new Inbox({
                senderId: senderId,
                GroupId: groupId,
                lastMessage: content,
            });
            await newInbox.save();
        }

        return {
            status: httpsCodes.SUCCESS_CODE,
            message: language.ONE_RECORD_CREATE,
            result: savedMessage,
        };
    } catch (error) {
        console.error(error);
        return { status: httpsCodes.NOT_FOUND, error: 'Internal Server Error' };
    }
};