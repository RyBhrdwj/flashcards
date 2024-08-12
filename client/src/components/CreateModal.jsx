import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuestions } from '../hooks/useQuestions';

const CreateModal = ({ isOpen, onClose, onTaskCreated }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { addQuestion } = useQuestions();

  const handleCreate = async () => {
    const newQuestion = { question, answer };

    await addQuestion(newQuestion);
    onTaskCreated(newQuestion); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-zinc-800 p-6 rounded shadow-lg w-[90%]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-xl mb-4">Create New Question</h2>
        <div className="mb-4">
          <label className="block mb-2">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateModal;
