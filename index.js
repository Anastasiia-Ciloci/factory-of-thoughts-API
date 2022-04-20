const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const { Thought, User } = require("./models");
//const utils = require("./utils");

// Setting PORT
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Now listening at http://localhost:${PORT}`);
  });
});
