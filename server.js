
const { createServer } = require("http");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true); // to suppress this warning the DeprecationWarning
const app = require("./index");
const { environment } = require("./src/config/environment");

const { PORT, HOST, NODE_ENV } = environment;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`server running on http://${HOST} in ${NODE_ENV} mode`);
});
