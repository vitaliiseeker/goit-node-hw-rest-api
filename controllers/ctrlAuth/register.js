const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { authService } = require("../../services");
const { setApiErrorStatus, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  const user = await authService.getUser({ email });

  if (user) {
    throw setApiErrorStatus(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = `${gravatar.url(email)}.?s=250`;
  const verificationToken = nanoid();

  const newUser = await authService.addUser({
    ...body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  }

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
