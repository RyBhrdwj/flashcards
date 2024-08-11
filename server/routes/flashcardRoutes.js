const express = require("express");
const router = express.Router();
const FlashcardController = require("../controllers/flashcardController");
const authenticateToken = require("../middlewares/auth");

const flashCard = new FlashcardController();

router.get("/", flashCard.get);
router.post("/", authenticateToken, flashCard.create);
router.put("/:id", authenticateToken, flashCard.update);
router.delete("/:id", authenticateToken, flashCard.delete);

module.exports = router;
