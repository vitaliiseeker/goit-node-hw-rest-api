const EMAIL_REGEXP =
  "^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";
const PASSWORD_REGEXP = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^ws]).{6,}$";
const PHONE_REGEXP = "^([+])?([- ()]?[0-9][- ()]?){10,14}$";

module.exports = {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  PHONE_REGEXP,
};
