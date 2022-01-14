const express = require("express");
const router = express.Router();
module.exports = (db) => {
  // if user is logged in , display the chosen resource and its comment section
  router.get("/comments/:id", (req, res) => {
    if (!req.session.user_id) {
      res.redirect("/login");
    } else {
      const resourceID = req.params.id;
      const promises = [];

      // query to get the resource
      const promiseOne = db.query(
        `SELECT resources.*, categories.name AS category_type, count(likes.*) AS like, avg(ratings.rating) AS rating
        FROM resources
        RIGHT JOIN categories_resources ON resources.id = resource_id
        LEFT JOIN categories ON categories.id = category_id
        LEFT JOIN likes ON likes.resource_id = resources.id
        LEFT JOIN ratings ON ratings.resource_id = resources.id
        GROUP BY resources.id, categories.name
        HAVING resources.id = $1`,
        [resourceID]
      );

      //query to get the latest 5 comments for the specific resource
      const promiseTwo = db.query(
        `
        SELECT comments.*, users.username as username
        FROM comments
        JOIN resources ON resources.id = resource_id
        JOIN users ON users.id = comments.user_id
        WHERE resources.id = $1
        ORDER BY comments.created_at DESC
        LIMIT 5`,
        [resourceID]
      );

      promises.push(promiseOne);
      promises.push(promiseTwo);

      Promise.all(promises)
        .then((result) => {
          const resources = result[0].rows;
          const comments = result[1].rows;
          const templateVars = { resources, comments, resourceID };
          res.render("commentsPage", templateVars);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  // this route posts the comment to the database
  router.post("/comments/:id", (req, res) => {
    const resourceID = req.params.id;
    const newCommentText = req.body.comment;
    db.query(
      `INSERT INTO comments (comment, user_id, resource_id)
    VALUES ($1, $2, $3) RETURNING *`,
      [newCommentText, req.session.user_id, resourceID]
    )
      .then((result) => {
        res.json({ resourceID });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
