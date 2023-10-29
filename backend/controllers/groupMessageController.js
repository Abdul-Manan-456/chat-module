"use strict";
const router = require("express")();
const { httpsCodes } = require("../config/contant");
const groupMessageManager = require("../manager/groupMessagesManager");


//======= Start chat in the group ========
router.post("/:groupId", async (req, res, next) => {
    const {content} = req.body
    const senderId = req.user.id;
    const groupId = req.params.groupId;
    groupMessageManager
        .groupsChat({senderId , groupId , content})
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
