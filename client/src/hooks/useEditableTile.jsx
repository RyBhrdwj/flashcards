import { useState } from "react";

export const useEditableTile = (initialQuestion) => {
  const [isEditing, setIsEditing] = useState(false);
  const [questionData, setQuestionData] = useState(initialQuestion);

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    isEditing,
    questionData,
    toggleEditing,
    handleInputChange,
  };
};
