const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const cookieParser = require('cookie-parser');


dotenv.config();

const flashcardRouter = require("./routes/flashcardRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

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
