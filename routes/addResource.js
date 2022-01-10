const express = require("express");
const router = express.Router();

app.get('/create', (res, req) => {
  res.redirect('/addResource');
}
