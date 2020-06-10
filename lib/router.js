module.exports.router = function (req, res) {
  switch (req.method) {
    case "POST":
      if (req.url.startsWith("/v1/api")) {
        console.log("POST url", req.url);
        const post = require("./v1_post").v1_post;
        post(req, res);
      } else {
        res.end("Invalid req!");
      }
      break;
    case "GET":
      if (req.url.startsWith("/v1/api")) {
        console.log("GET url", req.url);
        const get = require("./v1_get").v1_get;
        get(req, res);
      } else res.end("Invalid req!");
      break;
    case "OPTIONS":
      res.writeHead(204, {
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": req.headers.origin,
        "Access-Control-Allow-Methods": ["GET, POST, OPTIONS"],
        "Access-Control-Allow-Headers": ["api_key", "Content-Type"],
        "Access-Control-Max-Age": 86400
      });
      res.end();
      break;
    default:
      res.end("Invalid req!");
  }
};
