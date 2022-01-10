const express = require("express");
const router = express.Router();

module.exports = (db) => {
    router.post("/create", (req, res) => {
    const newResource = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      imageURL: req.body.imageURL,
      category: req.body.category
      }
    console.log(newResource)
    .then((result) => console.log(result))
    // login(email, password).then((user) => {
    //   if (!user) {
    //     res.redirect("/login");
    //     console.log(user.data[0]);
    //   } else {
    //     res.redirect("/");
    //   }
    // });
  });
  router.get("/create", (req, res) => {
    res.render("addResource");
  });

  return router;
};
