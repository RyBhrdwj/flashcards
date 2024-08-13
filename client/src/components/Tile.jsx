import React, { useState } from "react";

const Tile = ({ question, onDelete, onUpdate, isCreating = false }) => {
  const [isEditing, setIsEditing] = useState(isCreating);
  const [updatedQuestion, setUpdatedQuestion] = useState(question.question);
  const [updatedAnswer, setUpdatedAnswer] = useState(question.answer);

  const handleUpdate = () => {
    onUpdate({ question: updatedQuestion, answer: updatedAnswer });
    setIsEditing(false);
  };

  return (
    <div className="w-[98%] max-w-full rounded border p-4">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedQuestion}
            onChange={(e) => setUpdatedQuestion(e.target.value)}
            className="mb-2 w-full border p-2"
            placeholder="Enter your question"
          />
          <textarea
            value={updatedAnswer}
            onChange={(e) => setUpdatedAnswer(e.target.value)}
            className="mb-2 w-full border p-2"
            placeholder="Enter the answer"
          ></textarea>

          <button
            onClick={handleUpdate}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            {isCreating ? "Add" : "Update"}
          </button>
          <button
            onClick={() => (isCreating ? onDelete() : setIsEditing(false))}
            className="ml-2 rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="flex items-center justify-between text-xl">
          <div className="flex flex-1 flex-col overflow-hidden">
            <p className="truncate text-sm md:text-xl">Q: {question.question}</p>
            <p className="truncate text-sm md:text-xl">A: {question.answer}</p>
          </div>

          <div className="ml-auto flex gap-1 text-sm md:gap-2 md:text-xl">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 md:px-4"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="ml-2 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 md:px-4"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tile;
