const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(`SELECT * FROM users WHERE email = $1 AND password = $2;`, [
      email,
      password,
    ])
      .then((data) => {
        const users = data.rows[0];
        console.log(users);
        if (email === users.email && password === users.password) {
          res.redirect("/");
        }
      })
      .catch((err) => {
        console.log("failed");
        res.status(500).json({ error: err.message });
        res.redirect("/login");
      });
  });
  return router;
};
