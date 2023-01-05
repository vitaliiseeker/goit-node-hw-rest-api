const { authService } = require("../../services");
const { setApiErrorStatus } = require("../../helpers");

const verificationToken = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await authService.getUser({ verificationToken });

  if (!user) {
    throw setApiErrorStatus(404, "User not found");
  }

  await authService.updateUser(user._id, { verify: true, verificationToken: null });

  res.json({ mesage: "Verification successful" });
};

module.exports = verificationToken;
