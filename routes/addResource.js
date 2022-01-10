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
    const promises = [];
    const promiseOne = db.query(
      `INSERT INTO resources(title, description, image, url, user_id)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [resource.title, resource.description, resource.imageURL, resource.url, 1] /*user_id is hard coded*/
    );

    const promiseTwo = db.query(
      `INSERT INTO categories (name)
         VALUES ($1) RETURNING *`,
      [resource.category]
    );

    promises.push(promiseOne);
    promises.push(promiseTwo);

    Promise.all(promises)
      .then(async (result) => {
        const resource = result[0].rows[0];
        const category = result[1].rows[0];
        console.log(category.id, resource.id)
        const promiseThree = await db.query(
          `INSERT INTO categories_resources (category_id, resource_id)
         VALUES ($1, $2) RETURNING *`,
          [category.id, resource.id]

        );

        console.log(promiseThree);
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err.message)
      });


  });

  router.get("/create", (req, res) => {
    res.render("addResource");
  });



  return router;
};



