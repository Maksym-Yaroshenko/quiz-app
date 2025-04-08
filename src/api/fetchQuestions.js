// src/api/fetchQuestions.js

import client from "./contentful";

export const fetchQuestions = async () => {
  try {
    const response = await client.getEntries({
      content_type: "quizApp",
    });

    const questions = response.items.map((item) => ({
      id: item.fields.questionId,
      text: item.fields.questionText,
      type: item.fields.questionType,
      possibleAnswers: item.fields.possibleAnswers || [],
    }));
    return questions;
  } catch (error) {
    console.error("Error retrieving questions:", error);
    throw error;
  }
};
