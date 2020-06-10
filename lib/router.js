module.exports.router = function (req, res) {
  switch (req.method) {
    case "POST":
      if (req.url === "/v1/api/blogs/add") {
        console.log("POST");
        var body = "";
        req.on("data", function (data) {
          body += data;
          console.log("Partial body: " + body);
        });
        req.on("end", function () {
          console.log("Body: " + body);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("post received");
        });
      } else {
        res.end("Invalid req!");
      }
      break;
    case "GET":
      if (req.url.startsWith("/v1/api")) {
        console.log("url", req.url);
        const get = require("./v1_get").v1_get;
        get(req, res);
      } else res.end("Invalid req!");
      break;
    case "OPTIONS":
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": ["GET, POST, OPTIONS"],
        "Access-Control-Allow-Headers": "api_key",
      });
      res.end();
      break;
    default:
      res.end("Invalid req!");
  }
};
