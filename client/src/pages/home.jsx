import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../hooks/useQuestions";

export default function HomePage() {
  const { questions, loading } = useQuestions();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCard((prev) =>
      prev === 0 ? questions.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800">
      <nav className="w-full absolute top-0 flex justify-between items-center p-4 bg-zinc-900 shadow-md">
        <motion.div
          className="text-xl text-white font-bold"
          whileHover={{ color: "#3b82f6" }}
        >
          FlashDash
        </motion.div>
        <button
          onClick={() => navigate("/login")}
          className="text-white bg-blue-500 px-4 py-2 rounded-lg"
        >
          Admin Login
        </button>
      </nav>

      <div className="relative w-full max-w-4xl p-4 flex items-center">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Prev
        </button>

        <motion.div
          className="relative mx-4 w-full h-[70vh] bg-zinc-900 shadow-lg rounded-lg"
          onClick={() => setIsFlipped(!isFlipped)}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: 1000 }}
        >
          <div
            className={`absolute w-full h-full flex items-center justify-center p-4 text-xl text-center font-semibold rounded-lg backface-hidden ${
              isFlipped ? "opacity-0" : "opacity-100"
            }`}
          >
            <p>Q: {questions[currentCard].question}</p>
          </div>
          <div
            className={`absolute w-full h-full flex items-center justify-center p-4 text-xl text-center font-semibold rounded-lg backface-hidden transform rotateY-180 ${
              isFlipped ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: "rotateY(180deg)" }}
          >
            <p>A: {questions[currentCard].answer}</p>
          </div>
        </motion.div>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
