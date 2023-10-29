"use strict";
const router = require("express")();
const { httpsCodes } = require("../config/contant");
const ChatManager = require("../manager/InboxManager");


//======= CREATE ========
router.post("/create", async (req, res, next) => {
  const userId = req.user.id;
  const { receiverId, lastMessage , GroupId} = req.body;
  ChatManager
    .sendMessage(receiverId, lastMessage, userId , GroupId)
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
router.get("/", async (req, res, next) => {
  const userId = req.user.id;
  ChatManager.getInbox(userId)
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



module.exports = router;