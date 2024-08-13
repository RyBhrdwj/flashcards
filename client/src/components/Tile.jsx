import React, { useState } from "react";

const Tile = ({ question, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState(question.question);
  const [updatedAnswer, setUpdatedAnswer] = useState(question.answer);

  const handleUpdate = () => {
    onUpdate({ question: updatedQuestion, answer: updatedAnswer });
    setIsEditing(false);
  };

  return (
    <div className="w-[98%] rounded border p-4">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedQuestion}
            onChange={(e) => setUpdatedQuestion(e.target.value)}
            className="mb-2 w-full border p-2"
          />
          <textarea
            value={updatedAnswer}
            onChange={(e) => setUpdatedAnswer(e.target.value)}
            className="mb-2 w-full border p-2"
          ></textarea>

          <button
            onClick={handleUpdate}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Update
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="ml-2 rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="flex items-center justify-between text-xl">
          <div>
            <p>
              Q :{" "}
              {question.question.length > 50
                ? `${question.question.slice(0, 50)}...`
                : question.question}
            </p>
            <p>
              A :{" "}
              {question.answer.length > 50
                ? `${question.answer.slice(0, 50)}...`
                : question.answer}
            </p>
          </div>

          <div className="my-2 ml-auto flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="ml-2 rounded bg-red-500 px-4 py-1 text-white hover:bg-red-600"
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
