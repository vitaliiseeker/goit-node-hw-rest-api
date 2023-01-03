const express = require("express");

const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
} = require("../controllers/ctrlAuth");

const { ctrlWrapper } = require("../helpers");
const { authenticate, validateBody, upload } = require("../middlewares");
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require("../models/user/schemasJoi");

const router = new express.Router();

router.post("/register", validateBody(registerSchema), ctrlWrapper(register));

router.post("/login", validateBody(loginSchema), ctrlWrapper(login));

router.post("/logout", authenticate, ctrlWrapper(logout));

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  ctrlWrapper(updateSubscription)
);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(updateAvatar));

module.exports = router;
