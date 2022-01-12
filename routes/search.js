const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/search", (req, res) => {
    const title = req.body.search;
    return db
      .query("SELECT * FROM resources WHERE title ILIKE $1", [
        "%" + title + "%",
      ])
      .then((data) => {
        const resources = data.rows;
        const templateVars = { resources };
        res.render("search", templateVars);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return router;
};
