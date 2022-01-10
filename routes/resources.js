const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/resources", (req, res) => {
    res.render("user_resources");
  });

  return router;
}
