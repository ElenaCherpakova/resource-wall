const express = require("express");
const router = express.Router();


module.exports = (db) => {
    router.post("/create", (req, res) => {
    const resource = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      imageURL: req.body.imageURL,
      category: req.body.category
      }
      const addResourceMain = function (resource) {
        return db
          .query(
            `INSERT INTO resources(title, description, image, url, user_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, [resource.title, resource.description, resource.imageURL, resource.url, 1]
          )
          .then ((result) => console.log(result.rows[0]))
          .catch ((err) => {
            console.log(err.message)
          });
      };
      addResourceMain(resource)
      .then((result) => {
        console.log("result is: ", result);
      })
  });

  router.get("/create", (req, res) => {
    res.render("addResource");
  });

  return router;
};
