const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL, token, verify, verificationToken } = req.user;

  res.json({ email, subscription, avatarURL, token, verify, verificationToken });
};

module.exports = getCurrent;
