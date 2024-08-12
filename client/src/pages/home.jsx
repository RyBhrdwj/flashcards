import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuestions } from "../hooks/useQuestions";

export default function HomePage() {
  const { questions, loading } = useQuestions();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (loading) return <p>Loading...</p>;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCard((prev) =>
      prev === 0 ? questions.length - 1 : prev - 1,
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-700">
      <div className="relative w-full max-w-sm p-4">
        <motion.div
          className="relative w-full h-64 bg-zinc-800 shadow-lg rounded-lg"
          onClick={() => setIsFlipped(!isFlipped)}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: 1000 }}
        >
          <div
            className={`absolute w-full h-full flex items-center justify-center p-4 text-lg text-center font-semibold rounded-lg backface-hidden ${isFlipped ? "rotateY-180" : ""}`}
          >
            <p>Q: {questions[currentCard].question}</p>
          </div>
          <div
            className={`absolute w-full h-full flex items-center justify-center p-4 text-lg text-center font-semibold rounded-lg backface-hidden transform rotateY-180 ${isFlipped ? "" : "rotateY-180"}`}
          >
            <p>A: {questions[currentCard].answer}</p>
          </div>
        </motion.div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
