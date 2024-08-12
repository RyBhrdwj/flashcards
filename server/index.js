const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const flashcardRouter = require("./routes/flashcardRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/flashcard", flashcardRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
