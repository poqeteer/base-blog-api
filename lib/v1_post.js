module.exports.v1_post = function (req, res) {
  if (req.url === "/v1/api/blogs/add") {
    let body = "";
    req.on("data", function (data) {
      body += data;
    });
    req.on("end", function () {
      try {
        const data = JSON.parse(body);
        if (data.title && data.category && data.date && data.blog) {
          req._logger.info(JSON.stringify(data, null, 2));
          const moment = require("moment");
          const date = moment(data.date, "MM/DD/YYYY").format("YYYY-MM-DD 00:00.0000");
          const title = data.title.replace(/'/g, "\\'");
          const blog = data.blog.replace(/'/g, "\\'");
          req._db.query(
            `INSERT INTO blog_entries (user_id, category, title, create_date, entry, src)
                    VALUES (1, '${data.category}', '${title}', '${date}', '${blog}', '${data.src}'  )`,
            function (error, results) {
              if (error) {
                req._logger.error("Query Error: " + JSON.stringify(error));
                res.writeHead(500, {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                });
                req.end(JSON.stringify(error))
              } else {
                req._logger.debug("The results were: ", results);
                res.writeHead(204, {
                  "Access-Control-Allow-Origin": "*",
                });

                res.end();
              }
            }
          );
        } else {
          res.writeHead(400, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          });
          res.end(`{"message":"missing data"}`);
        }
      } catch (e) {
        res.writeHead(300, {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(e));
      }
    });
  }
};
