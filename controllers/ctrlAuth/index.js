const getCurrent = require("./getCurrent");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const resendVerifyEmail = require("./resendVerifyEmail");
const updateAvatar = require("./updateAvatar");
const updateSubscription = require("./updateSubscription");
const verificationToken = require("./verificationToken");

module.exports = {
  getCurrent,
  login,
  logout,
  register,
  resendVerifyEmail,
  updateAvatar,
  updateSubscription,
  verificationToken,
};
