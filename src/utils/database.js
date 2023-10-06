const mongoose = require("mongoose");
const { environment } = require("../config/environment");

const { NODE_ENV, DATABASE_URI_DEVELOP, DATABASE_URI_PROD } =
  environment;
mongoose.set("strictQuery", true);
const db = (URi) => {
  mongoose
    .connect(URi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`MongoDB connected Successful 🚀`))
    .catch((error) => console.log(error.message));
  mongoose.Promise = global.Promise;

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db...");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected...");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose connection is disconnected due to app termination..."
      );
      process.exit(0);
    });
  });
};

if (NODE_ENV === "development") {
  console.log(`DB running in ${NODE_ENV} mode`);
  module.exports = db(DATABASE_URI_DEVELOP);
}
if (NODE_ENV === "production") {
  console.log(`DB running in ${NODE_ENV} mode`);
  module.exports = db(DATABASE_URI_PROD);
}