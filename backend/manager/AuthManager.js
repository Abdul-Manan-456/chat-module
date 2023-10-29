"use-strict";
const User = require("../models/UserSchema");
const { generateToken } = require("../modules/jwt_Token");
const { httpsCodes } = require("../config/contant");
const { language } = require("../language/en/language");


//================ CREATE USER MANAGER =================
module.exports.registerUserManager = async (reqObj) => {
  try {
    let result = "";

    const isUserExist = await User.findOne({ email: reqObj.email });
    if (isUserExist) {
      result = { status: 409, message: "User Already exists" };
      return result;
    }

    const user = new User(reqObj);
    await user.save();

    const token = await generateToken(user);
    result = {
      status: 201,
      message: "Account Created successfully",
      user: user,
      token: token,
    };
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
// =============== LOGIN USER MANAGER =============================
module.exports.loginUserManager = async (reqObj) => {
  try {
    const { email, password } = reqObj;
    let result = "";
    const user = await User.findOne({ email });
    if (!user) {
      result = { status: 404, message: "User not found" };
      return result;
    }

    if (!user || !(await user.passwordCompare(password))) {
      result = { status: 400, message: "Invalid Password" };
      return result;
    }

    console.log("user---------->", user);

    const token = generateToken(user);

    result = {
      status: 200,
      user,
      token,
    };
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};


  // ========== Update =========
  module.exports.updateUser = async (id, profileImageBase64) => {
    try {
      let result = "";

      const data = await User.findByIdAndUpdate(id, { image: profileImageBase64 }, { new: true });

      result = { status: httpsCodes.NOT_FOUND, message: language.NOT_FOUND };

      if (data) {
        result = {
          status: httpsCodes.SUCCESS_CODE,
          message: language.ONE_RECORD_UPDATE,
          result: data,
        };
      }
      return result;
    } catch (error) {
      throw error;
    }
  }




  module.exports.getUser = async () => {
    try {
      const result = await User.find({})
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