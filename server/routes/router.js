const express = require("express");
const router = express.Router();
const FlashcardController = require("../controllers/flashcardController");

const flashCard = new FlashcardController();

router.get("/", (req, res) => flashCard.get(req, res));
router.post("/", (req, res) => flashCard.create(req, res));
router.put("/:id", (req, res) => flashCard.update(req, res));
router.delete('/:id', (req, res) => flashCard.delete(req, res));


module.exports = router;
