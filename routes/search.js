const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/search", (req, res) => {
    const title = req.body.search;
    return db
      // .query("SELECT * FROM resources WHERE title ILIKE $1", [
      //   "%" + title + "%",
      // ])
      .query (`SELECT resources.*, categories.name AS category_type, count(likes.*) AS like
        FROM resources
        RIGHT JOIN categories_resources ON resources.id = resource_id
        LEFT JOIN categories ON categories.id = category_id
        LEFT JOIN likes ON likes.resource_id = resources.id
        LEFT JOIN ratings ON ratings.resource_id = resources.id
        GROUP BY resources.id, categories.name
        HAVING title ILIKE $1
        ORDER BY resources.created_at DESC`, ["%" + title + "%"])
      .then((data) => {
        const resources = data.rows;
        console.log("data.rows -->", data.rows)
        const templateVars = { resources };
        res.render("search", templateVars);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return router;
};
