import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuestions } from "../hooks/useQuestions";
import Tile from "./Tile";

export default function CardsTab() {
  const [isCreating, setIsCreating] = useState(false);
  const { questions, deleteQuestion, updateQuestion, addQuestion, loading } = useQuestions();

  const handleAddQuestion = (newQuestion) => {
    addQuestion(newQuestion);
    setIsCreating(false);
  };

  if (loading) return <p>LOADING...</p>;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCreating(true)}
        className="m-4 rounded-full bg-green-600 px-4 py-2 text-white"
      >
        Create New Task
      </motion.button>

      <div className="flex flex-col gap-2 items-center">
        {isCreating && (
          <Tile
            question={{ id: null, question: "", answer: "" }}
            onDelete={() => setIsCreating(false)}
            onUpdate={handleAddQuestion}
            isCreating={true} // Pass a prop to indicate this is a new tile
          />
        )}
        {questions.map((question) => (
          <Tile
            key={question.id}
            question={question}
            onDelete={() => deleteQuestion(question.id)}
            onUpdate={(updatedData) => updateQuestion(question.id, updatedData)}
          />
        ))}
      </div>
    </>
  );
}
