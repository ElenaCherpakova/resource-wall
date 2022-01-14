const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/rate", (req, res) => {
    const { starID, resourceID } = req.body;
    const user = req.session.user_id;
    if (user) {
      // if user is authenticated, check if the user has rated this resource already
      return (
        db
          .query(
            `SELECT * FROM ratings WHERE user_id = $1 AND resource_id = $2;`,
            [user, resourceID]
          )
          // with the user and the resource id, insert a rating into the database
          .then((result) => {
            if (result.rows.length < 1) {
              return db
                .query(
                  `INSERT INTO ratings (rating , user_id , resource_id) VALUES ($1, $2, $3);`,
                  [starID, user, resourceID]
                )
                .then(() => {
                  return res.json({
                    status: 201,
                  });
                });
            } else {
              return res.json({
                "Error Message": "You have already rated this resource.",
                status: 429,
              });
            }
          })
      );
    } else {
      res.redirect("/");
    }
  });
  return router;
};
