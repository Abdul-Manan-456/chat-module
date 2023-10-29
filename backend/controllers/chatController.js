"use strict";
const router = require("express")();
const { httpsCodes } = require("../config/contant");
const ChatManager = require("../manager/chatManager");
const Chat = require("../models/chatSchema");


//======= CREATE ========
router.post("/messages", async (req, res, next) => {
  const { sender, message, receiver, inboxId } = req.body;
  const type = "one-on-one"; 
  ChatManager
    .Message({ sender, message, receiver, inboxId, type })
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch(async (error) => {
      console.log(error);
      res.send({
        error: error,
        status: httpsCodes.SERVER_ERROR_CODE,
      });
    });
});


// =========== Get All ============
router.get("/:id", async (req, res, next) => {
  const inboxId = req.params.id;
  ChatManager.getChat(inboxId)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch(async (error) => {
      console.log(error);
      res.send({
        error: error,
        status: httpsCodes.SERVER_ERROR_CODE,
      });
    });
});



router.post('/', async (req, res) => {
  try {

    await Chat.updateMany(
      { inboxId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: 'All messages marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// =================  LOGIN USER =================
router.post("/mark-as-read/:inboxId", async (req, res, next) => {
  const inboxId = req.params.inboxId;
  ChatManager
    .markAsRead(inboxId)
    .then(async (result) => {
      res.status(result.status).json(result);
    })
    .catch(async (error) => {
      console.log(error);
      res.send({
        error: error,
        status: httpsCodes.SERVER_ERROR_CODE,
      });
    });
});
module.exports = router;
