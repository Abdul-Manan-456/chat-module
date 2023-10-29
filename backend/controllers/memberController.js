"use strict";
const router = require("express")();
const { httpsCodes } = require("../config/contant");
const memberManager = require("../manager/memberManager");


//======= Add member in the group ========
router.post("/:groupId", async (req, res, next) => {
    const {userId} = req.body
    const groupId = req.params.groupId;
    memberManager
        .addMember({userId , groupId})
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


//======= Add member in the group ========
router.delete("/:memberId", async (req, res, next) => {
const userId = req.user.id
const memberId = req.params.memberId
    memberManager
        .removeMember({userId , memberId})
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
