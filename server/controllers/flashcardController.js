const FlashCardModel = require("../models/flashcard");

class FlashcardController {
  constructor() {
    this.flashCard = FlashCardModel;
  }

  async get(req, res) {
    try {
      const flashcards = await this.flashCard.findAll();
      res.json(flashcards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    const { question, answer } = req.body;

    try {
      if (!question || !answer) {
        return res
          .status(400)
          .json({ error: "Question and answer are required" });
      }
      const flashcard = await this.flashCard.create({ question, answer });

      res.status(201).json(flashcard);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { question, answer } = req.body;

    try {
      const flashcard = await this.flashCard.findByPk(id);

      if (!flashcard) {
        return res.status(404).json({ error: "Flashcard not found" });
      }

      if (question !== undefined) flashcard.question = question;
      if (answer !== undefined) flashcard.answer = answer;

      await flashcard.save();

      res.json(flashcard);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const flashcard = await this.flashCard.findByPk(id);

      if (!flashcard) {
        return res.status(404).json({ error: "Flashcard not found" });
      }

      await flashcard.destroy();

      res.json({ message: "Flashcard deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FlashcardController;
