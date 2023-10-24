require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./src/modules/auth/routes");

const app = express();

// middlewares
app.use(cors());

// Use the express.urlencoded middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

//middleware to enable JSON data parsing.
app.use(express.json());

// SWAGGER
app.get("/", (req, res) => {
  res.send(
    `<h2 style="text-align:center; padding-top:10px">Welcome to FeedbackHub-API</h2>`
  );
});
// Routes
app.use("/api/v1/", authRouter);

// app running .....
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running..on port::${PORT} 🚀`);
});
