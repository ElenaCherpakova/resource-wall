const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/profile", (req, res) => {
    res.render("user_profile");
  });

  return router;
}
