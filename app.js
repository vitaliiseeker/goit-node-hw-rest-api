const express = require('express');
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { authRouter } = require("./routes");
const { contactsRouter } = require("./routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  { flags: "a" }
);
app.use(logger("combined", { stream: accessLogStream }));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
