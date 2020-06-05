const http = require("http");
const router = require("./lib/router").router;
const decrypt = require(__dirname + "/lib/crypt").decrypt;

/**
 * Database setup...
 */
const mysql = require("mysql");
let port = "3306";

if (process.env.NODE_ENV === "development") port = "3325";

const connection = mysql.createConnection({
  host: "localhost",
  port,
  user: "lancteme_lance",
  password: decrypt({
    iv: "c87f3baa56713f202709e2ead3ac4508",
    encryptedData:
      "396edc2a8f2966c2dcb57dcc243682a7bca0721ebc1e80531639fd3ca94ef61b8afdbdd061161c0bb2f6db4d6448c8d2",
  }),
  database: "lancteme_blog",
});
connection.connect();

/**
 * Logger setup...
 */
const winston = require("winston");
const { createLogger, format } = winston;
const { combine, timestamp, label, prettyPrint } = format;
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
    callback();
    return;
  }
  // Load the api_key from the header...
  var api_key = req.headers.authorization;
  if (!api_key) api_key = req.headers.api_key;
  if (!api_key) api_key = req.headers['access-control-request-headers'];
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
    }) === "Lance'sMostExcellentBlog"
  ) {
    req._db = connection;
    req._id = api_key;
    req._logger = logger;
    callback();
  } else {
    logger.error("Bad key!!!");
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
} else {
  server.listen();
}

console.log(server.address().port);

process.on("SIGINT", function () {
  logger.log("\nProcessing: Ctrl+C");
  connection.end();
  server.close();
});

// Catch the termination request being sent to the session
process.on("SIGTERM", function () {
  logger.log("\nProcessing: SIGTERM");
  connection.end();
  server.close();
});
