import { useState, useEffect } from "react";
import apiClient from "../apiClient";

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await apiClient.get("/flashcard");

        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const deleteQuestion = async (id) => {
    try {
      await apiClient.delete(`/flashcard/${id}`);

      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Failed to delete question", error);
    }
  };

  const updateQuestion = async (id, updatedData) => {
    try {
      await apiClient.put(`/flashcard/${id}`, updatedData);

      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, ...updatedData } : q)),
      );
    } catch (error) {
      console.error("Failed to update question", error);
    }
  };

  const addQuestion = async (data) => {
    try {
      await apiClient.post("/flashcard", data);
    } catch (error) {
      console.error("Failed to create question", error);
    }
  };

  return { questions, deleteQuestion, updateQuestion, addQuestion, loading };
};
