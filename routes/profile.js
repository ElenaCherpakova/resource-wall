const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // if user is logged in , display the users profile info
  router.get("/profile", (req, res) => {
    if (!req.session.user_id) {
      res.redirect("/login");
    } else {
      db.query(
        `SELECT * FROM users
        WHERE users.id = $1`,
        [req.session.user_id]
      )
        .then((result) => {
          const selectedUser = result.rows[0];
          const templateVars = { selectedUser };
          res.render("user_profile", templateVars);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  // this route updates the users info in the database with what they entered in the form
  router.post("/profile", (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    db.query(
      `UPDATE users
      SET first_name = $1,
      last_name = $2,
      email = $3,
      password = $4
      WHERE id = $5
      RETURNING *;`,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        req.session.user_id,
      ]
    )

      .then((result) => {
        res.redirect("/profile");
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
