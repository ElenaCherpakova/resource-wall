const express = require("express");
const router = express.Router();
module.exports = (db) => {
  router.get("/login", (req, res) => {
    res.render("login");
  });
  return router;
};
