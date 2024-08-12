import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuestions } from "../hooks/useQuestions";
import CreateModal from "./CreateModal";
import Tile from "./Tile";

export default function CardsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { questions, deleteQuestion, updateQuestion, addQuestion, loading } = useQuestions();

  const handleTaskCreated = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>LOADING...</p>;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="m-4 rounded-full bg-green-600 px-4 py-2 text-white"
      >
        Create New Task
      </motion.button>

      <CreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />

      <div className="flex flex-col gap-2 items-center">
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
