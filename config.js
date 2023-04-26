const Application = require("./app/server");
new Application(process.env.APPLICATION_PORT, process.env.MONGO_HOST);
