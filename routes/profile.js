const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // const selectExistedUser = db.query(
  //   `SELECT * FROM users
  //   WHERE users.id = $1;`,
  //   [req.session.user_id])








  router.get("/profile", (req, res) => {
    if (!req.session.user_id) {
      res.redirect("/login");
    } else {
      db.query(
        `SELECT * FROM users
        WHERE users.id = $1;`,
        [req.session.user_id])

        .then((result) => {
          console.log("this IS RESULT", result.rows)
          // const userResources = result[0].rows;
          const selectedUser = result.rows[0]
          console.log("this user=>", selectedUser)
          const templateVars = { selectedUser };
          res.render("user_profile", templateVars)
        })
        .catch((err) => {
          res
            .status(500)
            .json({ error: err.message });
        });
    }
  })

  router.post("/profile", (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    }

    console.log(req.body.firstName, req.body.lastName, req.body.email, req.body.password)

    db.query(
      `UPDATE users
      SET first_name = $1,
      last_name = $2,
      email = $3,
      password = $4
      WHERE id = $5
      RETURNING *;`, [user.firstName, user.lastName, user.email, user.password, req.session.user_id])

      .then((result) => result.rows[0])
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
        });
    });
  return router;
}

