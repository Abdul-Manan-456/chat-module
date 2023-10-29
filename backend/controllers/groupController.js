"use strict";
const router = require("express")();
const { httpsCodes } = require("../config/contant");
const groupManager = require("../manager/groupManager");
const Base = require('../middlewares/base')



//======= CREATE A GROUP ========
router.post("/create", async (req, res, next) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "No image uploaded" });
    }
    const uploadedImage = req.files.image;
    const cloudinaryResponse = await Base.cloudinary.uploader.upload(uploadedImage.tempFilePath);
    const cloudinaryUrl = cloudinaryResponse.secure_url;
    const { name, description, memberUserIds } = req.body;
    const userId = req.user.id
    groupManager
        .newGroup({ name, description, userId, cloudinaryUrl, memberUserIds })
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



// =========== Get All Groups ============
router.get("/", async (req, res, next) => {
    groupManager.groups()
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
