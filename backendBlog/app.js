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

app.use("/api", routes);

app.get("/*", (req, res) => {
  try {
    res.sendFile(
      path.join(__dirname, "..", "frontendBlog", "dist", "index.html")
    );
  } catch (e) {
    console.log(e);
  }
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
