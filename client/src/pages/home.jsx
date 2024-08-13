import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../hooks/useQuestions";

function Skeleton() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-800">
      <nav className="absolute top-0 flex w-full items-center justify-between border-b border-gray-700 bg-zinc-900 p-4">
        <motion.div
          className="text-3xl font-bold text-white"
          whileHover={{ color: "#3b82f6" }}
        >
          FlashDash
        </motion.div>
        <div className="h-10 w-24 rounded bg-zinc-800"></div>
      </nav>

      <div className="relative flex w-full max-w-4xl items-center p-4">
        <div className="h-12 w-24 animate-pulse rounded bg-zinc-900"></div>

        <div className="relative mx-4 flex h-[70vh] w-full animate-pulse items-center justify-center rounded-lg bg-zinc-900 text-lg">
          <p>PLEASE WAIT, THE SERVER MIGHT BE EXPERIENCING A COLD START</p>
        </div>

        <div className="h-12 w-24 animate-pulse rounded bg-zinc-900"></div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { questions, loading } = useQuestions();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return <Skeleton />;
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
      <nav className="absolute top-0 flex w-full items-center justify-between border-b border-gray-700 bg-zinc-900 p-4">
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
