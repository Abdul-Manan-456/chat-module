"use-strict";
const router = require("express")();
const { httpsCodes } = require("../config/contant");
const authManager = require("../manager/AuthManager");
const Base = require('../middlewares/base')
const User = require("../models/UserSchema");


// ================ CREATE USER =================
router.post("/register", async (req, res, next) => {
  const reqObj = Object.assign({}, req.body);
  authManager
    .registerUserManager(reqObj)
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
// =================  LOGIN USER =================
router.post("/login", async (req, res, next) => {
  const reqObj = Object.assign({}, req.body);
  authManager
    .loginUserManager(reqObj)
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



// =========== Update =======
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  const uploadedImage = req.files.image;
  const cloudinaryResponse = await Base.cloudinary.uploader.upload(uploadedImage.tempFilePath);
  const cloudinaryUrl = cloudinaryResponse.secure_url;
  authManager
    .updateUser(id, cloudinaryUrl)
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

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const regexPattern = new RegExp(query, 'i');
    const searchResults = await User.find({
      $or: [
        { name: { $regex: regexPattern } }
      ],
    });
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// =========== Get All ============
router.get("/", async (req, res, next) => {
  authManager.getUser()
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
