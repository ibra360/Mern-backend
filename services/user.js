const joi = require("@hapi/joi");
const insert = require("../db_functions/insert");
const read = require("../db_functions/read");
const update = require("../db_functions/update");
const mail = require("../utils/nodemailer");
const util = require("util");
const constants = require("../utils/constants");

const registerUser = async (data, isSocial) => {
  try {
    // addUser
    const addUser = await insert.addUser(data, isSocial);
    if (!isSocial) {
      const sendEmailVerificationLink = await read.sendVerificationEmail(
        addUser.email,
        addUser._id
      );
      return addUser;
    }
    return addUser;
  } catch (e) {
    throw e;
  }
};
const VerifyEmail = async (data) => {
  try {
    console.log("Services try k andar in verify email", data);

    const sendEmailVerificationLink = await read.sendVerificationEmail(
      data.email,
    );
    return "email sent successfully!";

    // return addUser;
  } catch (e) {
    throw e;
  }
};
const updatePassword = async (email, password) => {
  try {
    // addUser
    return await update.updatePassword(email, password);
    // return req.body
  } catch (e) {
    throw e;
  }
};

const userLogin = async (data, isSocial) => {
  try {
    return await read.login(data, isSocial);
  } catch (e) {
    throw e;
  }
};

const verifyUser = async (email) => {
  try {
    console.log(email, "emaillllllllllllllllll");
    return await read.verifyUser(email);
  } catch (e) {
    throw e;
  }
};

const addUserWishlist = async (propertyId, id) => {
  try {
    const updateUser = await update.addUserWishlist(propertyId, id);
    return updateUser;
    // return req.body
  } catch (e) {
    throw e;
  }
};

const removeUserWishlist = async (propertyId, userId) => {
  try {
    return await update.removeUserWishlist(propertyId, userId);
  } catch (e) {
    // console.log("catch error==>", e);
    throw e;
  }
};

const propertyListByUserId = async (userId, page, limit) => {
  try {
    return await read.propertyListByUserId(userId, page, limit);
  } catch (e) {
    // console.log("catch error==>", e);
    throw e;
  }
};

const logout = async (userId) => {
  try {
    return await update.logout(userId);
  } catch (e) {
    throw e;
  }
};

const feedback = async (userId, feedback) => {
  try {
    console.log(userId, feedback);
    return await insert.feedback(userId, feedback);
  } catch (e) {
    throw e;
  }
};

const getProfile = async (id) => {
  try {
    const getProfile = await read.getProfile(id);
    return getProfile;
  } catch (e) {
    console.log("catch error==>", e);
    throw e;
  }
};

const getPersonalProfile = async (id) => {
  try {
    const getProfile = await read.getPersonalProfile(id);
    return getProfile;
  } catch (e) {
    console.log("catch error==>", e);
    throw e;
  }
};

const verifyAccount = async (req) => {
  try {
    // console.log("request-===>", req.params.id);

    const verifyAccount = await read.verifyAccount(req);
    return verifyAccount;
  } catch (e) {
    // console.log("catch error==>", e);
    throw e;
  }
};

const verifyCode = async (req) => {
  try {
    const verifyCode = await read.verifyCode(req);
    return verifyCode;
  } catch (e) {
    // console.log("catch error==>", e);
    throw e;
  }
};

const sendCode = async (req) => {
  try {
    console.log("request-===>", req.params.id);

    const sendCode = await read.sendCode(req);
    return sendCode;
  } catch (e) {
    // console.log("catch error==>", e);
    throw e;
  }
};

const passwordReset = async (req) => {
  try {
    // find user
    const updateUser = await update.passwordReset(req);
    return updateUser;
  } catch (e) {
    // console.log(e);
    throw e;
  }
};

const resetProfilePassword = async (oldPassword, newPassword, id) => {
  try {
    console.log(oldPassword, newPassword, id);
    // find user
    const updateUser = await update.resetProfilePassword(
      oldPassword,
      newPassword,
      id
    );
    return updateUser;
  } catch (e) {
    // console.log(e);
    throw e;
  }
};

const forgotPassword = async (user_email) => {
  try {
    // if (user_email.trim().toLowerCase())
    //   return "Please check your email address for the password reset link";

    // return "Incorrect email address";
    // // find user
    let is_user_exist = await read.forgotPassword(user_email);
    console.log(is_user_exist);
    if (is_user_exist) return "Check your mail for the password reset link";

    throw "email isn't registered";
  } catch (e) {
    // console.log(e);
    throw e;
  }
};

const updateProfile = async (id, data) => {
  try {
    return await update.updateProfile(id, data);
  } catch (e) {
    throw e;
  }
};

const checkWishlist = async (id, page, limit) => {
  try {
    return await read.checkWishlist(id, page, limit);
  } catch (e) {
    throw e;
  }
};

const getNotification = async (id, page, limit) => {
  try {
    return await read.getNotification(id, page, limit);
  } catch (e) {
    throw e;
  }
};

const propertyList = async (id) => {
  try {
    return await read.propertyList(id);
  } catch (e) {
    throw e;
  }
};

const validatePayload = (data) => {
  const schema = {
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  };
  return joi.validate(data, schema);
};

module.exports = {
  logout,
  forgotPassword,
  getNotification,
  registerUser,
  VerifyEmail,
  updatePassword,
  propertyList,
  propertyListByUserId,
  userLogin,
  getPersonalProfile,
  passwordReset,
  getProfile,
  addUserWishlist,
  removeUserWishlist,
  updateProfile,
  checkWishlist,
  verifyAccount,
  verifyCode,
  sendCode,
  resetProfilePassword,
  verifyUser,
  feedback,
};
