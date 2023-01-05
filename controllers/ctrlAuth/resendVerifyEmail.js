const { authService } = require("../../services");
const { setApiErrorStatus, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await authService.getUser({ email });

  if (!user) {
    throw setApiErrorStatus(404, "User not found");
  }

  if (user.verify) {
    throw setApiErrorStatus(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
  }

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });

};

module.exports = resendVerifyEmail;