const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const { authService } = require("../../services");
const { setApiErrorStatus } = require("../../helpers");

const register = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  const user = await authService.getUser({ email });

  if (user) {
    throw setApiErrorStatus(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = `${gravatar.url(email)}.?s=250`;

  const newUser = await authService.addUser({
    ...body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      password: newUser.password,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;
