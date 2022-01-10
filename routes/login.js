const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const login = function (email, password) {
    return getUserWithEmail(email).then((user) => {
      if (password === user.password) {
        return user;
      }
      return null;
    });
  };

  const getUserWithEmail = function (email) {
    return db
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then((result) => result.rows[0])
      .catch((err) => {
        console.log(err.message);
      });
  };

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    login(email, password).then((user) => {
      if (!user) {
        res.redirect("/login");
      } else {
        req.session["user_id"] = user.id;
        res.redirect("/");
      }
    });
  });
  router.get("/login", (req, res) => {
    res.render("login");
  });

  return router;
};
