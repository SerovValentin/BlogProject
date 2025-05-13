require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontendBlog", "dist")));

app.use("/", routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "frontendBlog", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
