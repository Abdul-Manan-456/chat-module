"use strict";
const { httpsCodes } = require("../config/contant");
const { language } = require("../language/en/language");
const Group = require("../models/groupSchema");
const Inbox = require("../models/InboxSchema");
const Member = require("../models/memberSchema");
module.exports.groups = async () => {
  try {
    const result = await Group.find({})
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



module.exports.newGroup = async ({ name, description, userId, cloudinaryUrl, memberUserIds }) => {
  try {
    let result = '';
    const group = new Group({
      name: name,
      description: description,
      image: cloudinaryUrl,
      timestamp: new Date(),
    });

    const savedGroup = await group.save();

    const memberPromises = [];

    memberPromises.push(
      new Member({
        user: userId,
        group: savedGroup._id,
        role: 'Admin',
      }).save()
    );
const parse = memberUserIds.split(',')


    if (parse && parse.length > 0) {
      console.log('memberUserId ----->' , parse)

      parse.forEach((data) => {
        memberPromises.push(
          new Member({
            user: data,
            group: savedGroup._id,
            role: 'Member',
          }).save()
        );
      });
    }

    await Promise.all(memberPromises);

    const inbox = new Inbox({
      senderId: userId,
      GroupId: savedGroup._id,
      lastMessage: null,
      type: "group",
      receiverId: [userId, ...(parse || [])],
      timestamp: new Date(),
    });

    const savedInbox = await inbox.save();

    result = { status: 200, message: httpsCodes.CREATED, result: savedGroup, savedInbox };
    return result;
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Internal Server Error' };
  }
}


