// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(
  cookieSession({
    name: "SESH",
    keys: ["key1,", "key2"],
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const addResource = require("./routes/addResource");
const registerRoutes = require("./routes/register");
const searchRoutes = require("./routes/search");
const resourcesRoutes = require("./routes/resources");
const profileRoutes = require("./routes/profile");
const { query } = require("express");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/", registerRoutes(db));
app.use("/", addResource(db));
app.use("/", loginRoutes(db));
app.use("/", searchRoutes(db));
app.use("/", resourcesRoutes(db));
app.use("/", profileRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  console.log("User Id Is : ", req.session["user_id"]);
  //res.render("index");
  //added code

  db.query(
    `SELECT resources.*, categories.name AS category_type
    FROM ((resources
    INNER JOIN categories_resources ON resources.id = resource_id)
    INNER JOIN categories ON categories.id = category_id)
    ORDER BY created_at DESC
    LIMIT 4;`
  )
    .then((data) => {
      //  const getTag = await db.query(
      //   `SELECT categories.name as name FROM categories
      //   JOIN categories_resources ON categories.id = category_id
      //   JOIN resources ON resources.id = resource_id
      //   WHERE resources.id = $1`, [data.rows[0].id] //resource_id is hard coded!
      //   )
      const resources = data.rows;
      //const tag = getTag.rows[0].name
      const templateVars = { resources };
      console.log("this is templateVars", templateVars);
      //console.log("getTag info --->", getTag.rows[0].name)
      res.render("index", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/user/:id", (req, res) => {
  res.render("user_resources");
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.post("/likes", (req, res) => {
  const resourceID = req.body['resource_id '] //dont delete the space
  db.query(`INSERT INTO likes (user_id, resource_id)
  VALUES ($1, $2)`, [req.session.user_id, resourceID])
    .then((result) => {
      res.send("Success")
    })
    .catch((err) => {
      res.send("Error: " + err.message)
    });

});

app.post("/comments", (req, res) => {

  const resourceID = req.body['resource_id']
  console.log(resourceID)
  const commentText = req.body['comment']
  console.log(commentText)

  db.query(`INSERT INTO comments (comment, user_id, resource_id)
  VALUES ($1, $2, $3)`, [commentText, req.session.user_id, resourceID])
    .then((result) => {
      res.send("Success")
    })
    .catch((err) => {
      res.send("Error: " + err.message)
    });
});
