const express = require("express");
const router = express.Router();
module.exports = (db) => {
  router.get("/user/:id", (req, res) => {
    res.render("user_resources");
  });
  return router;
};
