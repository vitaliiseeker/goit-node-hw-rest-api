const Jimp = require("jimp");

const formatingAvatar = async (path) => {
  const image = await Jimp.read(path);
  return await image.resize(250, 250).writeAsync(path);
};

module.exports = formatingAvatar;