module.exports.v1_get = function (req, res) {
  const url = require("url");
  const requestParse = url.parse(req.url, true);
  const queryObject = requestParse.query;
  switch (requestParse.pathname) {
    case "/v1/api/blogs/count":
      req._db.query("SELECT count(*) as count FROM blog_entries", function (
        error,
        results
      ) {
        if (error) {
          req._logger.error("Query Error: " + JSON.stringify(error));
        }
        res.writeHead(200, {
          "Content-Type": "json/application",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify(results));
      });
      break;
    case "/v1/api/blogs/pages":
      if (queryObject && queryObject.start && queryObject.amount)  
        req._db.query(
            `SELECT id, title, category, create_date, src FROM blog_entries ORDER BY create_date DESC, id DESC LIMIT ${queryObject.start}, ${queryObject.amount}`,
            function (error, results) {
            if (error) {
                req._logger.error("Query Error: " + JSON.stringify(error));
            }
            res.writeHead(200, {
                "Content-Type": "json/application",
                "Access-Control-Allow-Origin": "*",
            });
            res.end(JSON.stringify(results));
            }
        );
      else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("unknown request");  
      }
      break;
      case "/v1/api/blogs/entry":
        if (queryObject && queryObject.id)  
          req._db.query(
            `SELECT * FROM blog_entries WHERE id=${queryObject.id}`,
            function (error, results) {
              if (error) {
                req._logger.error("Query Error: " + JSON.stringify(error));
              }
              res.writeHead(200, {
                "Content-Type": "json/application",
                "Access-Control-Allow-Origin": "*",
              });
              res.end(JSON.stringify(results));
            }
          );
        else {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("unknown request");  
        }
        break;    
      default:
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("unknown request");
  }
};
