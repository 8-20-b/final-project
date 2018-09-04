// module imports
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

require("dotenv").config();

//Log Env
console.log("Environment:", process.env.APP);

//DATABASE
const models = require("./models");
models.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to SQL database:", process.env.DB_NAME);
  })
  .catch(err => {
    console.error(
      "Unable to connect to SQL database:",
      process.env.DB_NAME,
      err
    );
  });

if (process.env.NODE_ENV !== "production") {
  // models.sequelize.sync(); //creates table if they do not already exist
  // models.sequelize.sync({ force: true }); //deletes all tables then recreates them useful for testing and development purposes
}

const v1 = require("./routes/v1");

//PRODUCTION ONLY
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// app middleware
app.use(express.json());
app.use(cors());

app.use("/v1", v1);

// PRODUCTION ONLY
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// Development mode port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port:${port}`));

module.exports = app;
