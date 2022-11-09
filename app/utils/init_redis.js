const redisDB = require("redis");
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("connect to redis"));
redisClient.on("error", (err) => console.log(err.message));
redisClient.on("connected", () => console.log("redis connected"));
redisClient.on("end", () => console.log("redis disconnected"));

module.exports = redisClient;