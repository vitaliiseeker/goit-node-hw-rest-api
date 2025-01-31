const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authService } = require("../../services");
const { setApiErrorStatus } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.getUser({ email });

  if (!user) {
    throw setApiErrorStatus(401, "Email invalid");
  }

  if (!user.verify) {
    throw setApiErrorStatus(401, "Email not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw setApiErrorStatus(401, "Password invalid");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  const { subscription } = await authService.updateUser(user._id, { token });

  res.json({ token, user: { email, subscription } });
};

module.exports = login;
