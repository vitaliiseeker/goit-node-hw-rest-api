const fs = require("fs/promises");
const path = require("path");
const { authService } = require("../../services");
const { formatingAvatar } = require("../../helpers");


const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await formatingAvatar(tempUpload);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  await authService.updateUser(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = updateAvatar;