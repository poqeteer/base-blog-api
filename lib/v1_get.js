module.exports.v1_get = function (req, res) {
    switch(req.url) {
        case "/v1/api/blogs":
            req._db.query("SELECT * FROM blog_entries", function (
                error,
                results
            ) {
                if (error) {
                    req._logger("Query Error: " + JSON.stringify(error));
                }
                // req._logger.debug("The solution is: ", results);
                res.writeHead(200, { "Content-Type": "json/application", 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify(results));
              });
            break;
        case "/v1/api/blogs/pages":
            break;
        default:
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("unknown request");
    }
};