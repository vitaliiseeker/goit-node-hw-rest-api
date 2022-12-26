const { Schema } = require("mongoose");
const { handleMongooseError } = require("../../helpers");
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require("../regexp");

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: new RegExp(EMAIL_REGEXP),
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      match: new RegExp(PASSWORD_REGEXP),
      trim: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

module.exports = userSchema;
