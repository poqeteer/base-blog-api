const http = require("http");
const router = require("./lib/router").router;
const decrypt = require("./lib/crypt").decrypt;

/**
 * Database setup...
 */
const mysql = require("mysql");
let port = 3306;

if (process.env.NODE_ENV === "development") port = 3325;

const db = require("./config/database.json");

const connection = mysql.createConnection({
  host: "localhost",
  port,
  user: db.username,
  password: decrypt(db.password),
  database: db.database,
});
connection.connect();

/**
 * Logger setup...
 */
const winston = require("winston");
const { createLogger, format } = winston;
const { combine, timestamp, prettyPrint } = format;
require("winston-daily-rotate-file");
const dailyRotateFile = new winston.transports.DailyRotateFile({
  "level": "debug",
  "maxSize": "20m",
  "maxFiles": "14d",
  "filename": "./logs/blog-%DATE%.log",
  "datePattern": "YYYY-MM-DD-HH",
  "zippedArchive": true
});
const logger = createLogger({
  level: "debug",
  defaultMeta: { service: "user-service" },
  transports: [dailyRotateFile, new winston.transports.Console()],
  format: combine(timestamp(), prettyPrint())
});


const _validateKey = (req, callback) => {
  if (req.method === "OPTIONS") {
    console.log("OPTION", req.headers);
    callback();
    return;
  }
  // Load the api_key from the header...
  var api_key = req.headers.authorization;
  if (!api_key) api_key = req.headers.api_key;
  // No api_key in the header?
  if (!api_key || api_key.length < 96) {
    logger.error('Server:: No ApiKey');
    // Don't know where console.error went but created it here to eliminate error
    console.error = (err) => {
      logger.error(err);
    };
    callback(new Error("ApiKey required"));
    return;
  }
  if (
    decrypt({
      iv: api_key.substring(0, 32),
      encryptedData: api_key.substring(32),
    }) === require(process.env.NODE_ENV === "development" ? "./config/dev_key.json" : "./config/api_key.json").api_key
  ) {
    req._db = connection;
    req._id = api_key;
    req._logger = logger;
    callback();
  } else {
    logger.error("Bad key!!! "+api_key);
    callback(new Error("Invalid ApiKey"));
  }
};

const server = http.createServer(function (req, res) {
  _validateKey(req, (err) => {
    if (err) {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end(err.message);
    } else {
      router(req, res);
    }
  });
});

if (process.env.NODE_ENV === "development") {
  server.listen(3001);
  console.log("listening on: 3001");
} else {
  server.listen();
}

process.on("SIGINT", function () {
  logger.info("Processing: Ctrl+C");
  connection.end();
  server.close();
});

// Catch the termination request being sent to the session
process.on("SIGTERM", function () {
  logger.info("Processing: SIGTERM");
  connection.end();
  server.close();
});
