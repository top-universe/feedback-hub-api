
const { createServer } = require("http");
require("./src/utils/database")// load database

const app = require("./index");
const { environment } = require("./src/config/environment");

const { PORT, HOST, NODE_ENV } = environment;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`server running on http://${HOST} in ${NODE_ENV} mode`);
});
