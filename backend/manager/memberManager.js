"use strict";
const { httpsCodes } = require("../config/contant");
const { language } = require("../language/en/language");
const Member = require("../models/memberSchema");
const Group = require("../models/groupSchema");
const Inbox = require("../models/InboxSchema");

// ========== Add Member =========
module.exports.addMember = async ({ userId, groupId }) => {
    try {
        let result = "";
        const group = await Group.findById(groupId);
        if (!group) {
            return { status: httpsCodes.NOT_FOUND, message: language.NOT_FOUND };
        }
        const alreadyMember = await Member.findOne({ user: userId, group: groupId });
        if (alreadyMember) {
            return { status: httpsCodes.NOT_FOUND, message: 'User is already a member of the group' };
        }
        const member = new Member({
            user: userId,
            group: groupId,
        });

        await member.save();
        const groupInbox = await Inbox.findOne({ GroupId: groupId });
        if (groupInbox) {
            groupInbox.receiverId.push(userId);
            await groupInbox.save();
        }

        if (member) {
            result = {
                status: httpsCodes.SUCCESS_CODE,
                message: language.ONE_RECORD_UPDATE,
                result: [member, group],
            };
            IO.to(groups.get(`${group.name}`)).emit('userJoined', 'User joined this group');

        }
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.removeMember = async ({ userId, memberId }) => {
    try {
        let result = '';
        const member = await Member.findOne({ user: userId });

        if (!member) {
            return { status: httpsCodes.NOT_FOUND, message: 'Member not found' };
        }

        if (member.role === 'Admin') {
            const group = await Group.findOne({ members: memberId });

            if (group) {
                group.members = group.members.filter((m) => m.toString() !== memberId);
                await group.save();


                const findMember = await Member.findOne({ _id: memberId });


                const inbox = await Inbox.findOne({ GroupId: group._id });
                if (inbox) {
                    const receiverIds = inbox.receiverId || [];
                    const updatedReceiverIds = receiverIds.filter((id) => id.toString() !== findMember.user.toString());
                    inbox.receiverId = updatedReceiverIds;
                    console.log(updatedReceiverIds)
                    await inbox.save();
                }

                await Member.deleteOne({ _id: memberId });

                result = {
                    status: httpsCodes.SUCCESS_CODE,
                    message: language.ONE_RECORD_DELETE,
                };
            }

        }
        return result;
    } catch (error) {
        throw error;
    }
};
