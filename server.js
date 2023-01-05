const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const { PORT, DB_HOST } = process.env;

mongoose.set("strictQuery", false);
mongoose.set("useFindAndModify", false);

const start = async () => {
  try {
    await mongoose.connect(
      DB_HOST,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Database connection successful");
        app.listen(PORT || 3000, () => {
          console.log(`Server running. Use our API on port: ${PORT}`);
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

start();
