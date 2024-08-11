const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const flashcardRouter = require("./routes/router");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/flashcard", flashcardRouter);

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
