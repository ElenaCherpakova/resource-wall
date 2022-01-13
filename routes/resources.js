const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/resources", (req, res) => {
    if (!req.session.user_id) {
      res.redirect("/login");
    }
    else {
      const promises = [];

      const promiseOne = db.query(`
      SELECT resources.*, categories.name AS category_type, users.first_name as user_name
      FROM (((users INNER JOIN resources ON users.id = user_id)
      INNER JOIN categories_resources ON resources.id = resource_id)
      INNER JOIN categories ON categories.id = category_id)

      WHERE users.id= $1
      ORDER BY created_at DESC
      LIMIT 4;`, [req.session.user_id]);

      //console.log("this is RPOMISEONE", promiseOne)

      const promiseTwo = db.query(`SELECT r.*, c.name AS category_type
      FROM likes l
      INNER JOIN resources r ON l.resource_id = r.id
      INNER JOIN categories_resources cr ON cr.resource_id = r.id
      INNER JOIN categories c ON c.id = cr.id
      WHERE l.user_id = $1
      ORDER BY r.created_at DESC
      LIMIT 4;`, [req.session.user_id]);

      //console.log("this is RPOMISEtwo", promiseTwo)

      promises.push(promiseOne);
      promises.push(promiseTwo);

      //console.log("this IS PROMISES", promises)

      Promise.all(promises)
      .then ((result) => {
        console.log("this IS RESULT", result.rows)
        const userResources = result[0].rows;
        const likedResources = result[1].rows;
        const templateVars = {userResources, likedResources};
        //console.log("userResources -->", userResources)
        console.log("likedResources---> ", likedResources)
        //console.log("templateVars", templateVars)
        res.render("user_resources", templateVars);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
  });

  return router;
}
