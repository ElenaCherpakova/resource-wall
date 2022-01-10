const express = require("express");
const router = express.Router();
module.exports = (db) => {
  router.post("/register", (req, res) => {
    const getUserWithEmail = function (email) {
      return db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((result) => result.rows[0])
        .catch((err) => {
          console.log(err.message);
        });
    };

    const getUserWithUsername = function (username) {
      return db
        .query("SELECT * FROM users WHERE username = $1", [username])
        .then((result) => result.rows[0])
        .catch((err) => {
          console.log(err.message);
        });
    };

    const addUser = function (user) {
      return db
        .query(
          `INSERT INTO users (first_name,last_name,username,email,password)
   VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
          [
            user["first_name"],
            user["last_name"],
            user["username"],
            user["email"],
            user["password"],
          ]
        )
        .then((result) => {
          console.log("result is ", result.rows[0]);
          return result.rows[0];
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const user = req.body;
    console.log(req.body);
    getUserWithEmail(user.email)
      .then((result) => {
        if (result) {
          console.log("user already in system");
          return result;
        } else {
          return getUserWithUsername(user.username);
        }
      })
      .then((result) => {
        if (result) {
          console.log("user already in system");
          res.redirect("/login");
        } else {
          addUser(user).then((user) => {
            if (user) {
              console.log("user is :", user);
              req.session["user_id"] = user.id;
            }
            res.redirect("/");
          });
        }
      });
    /*  if (getUserWithEmail(user.email) || getUserWithUsername(user.username)) {
      console.log("user already in system");
      res.redirect("/login");
    } else {
      addUser(user).then(() => res.redirect("/"));
      } */
  });
  router.get("/register", (req, res) => {
    res.render("register");
  });
  return router;
};
