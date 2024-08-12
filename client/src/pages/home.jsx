import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../hooks/useQuestions";

export default function HomePage() {
  const { questions, loading } = useQuestions();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="text-xl">
        Loading... The backend might be experiencing a cold start.
      </div>
    );
  }

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-800">
      <nav className="absolute top-0 flex w-full items-center justify-between bg-zinc-900 p-4 border-b border-gray-700">
        <motion.div
          className="text-3xl font-bold text-white"
          whileHover={{ color: "#3b82f6" }}
        >
          FlashDash
        </motion.div>
        <button
          onClick={() => navigate("/login")}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Admin Login
        </button>
      </nav>

      <div className="relative flex w-full max-w-4xl items-center p-4">
        <button
          onClick={handlePrev}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Prev
        </button>

        <motion.div
          className="relative mx-4 h-[70vh] w-full rounded-lg bg-zinc-900 shadow-lg"
          onClick={() => setIsFlipped(!isFlipped)}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: 1000 }}
        >
          <div
            className={`backface-hidden absolute flex h-full w-full items-center justify-center rounded-lg p-4 text-center text-xl font-semibold ${
              isFlipped ? "opacity-0" : "opacity-100"
            }`}
          >
            <p>Q: {questions[currentCard].question}</p>
          </div>
          <div
            className={`backface-hidden rotateY-180 absolute flex h-full w-full transform items-center justify-center rounded-lg p-4 text-center text-xl font-semibold ${
              isFlipped ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: "rotateY(180deg)" }}
          >
            <p>A: {questions[currentCard].answer}</p>
          </div>
        </motion.div>

        <button
          onClick={handleNext}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
