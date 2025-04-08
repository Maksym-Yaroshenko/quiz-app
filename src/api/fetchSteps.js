// src/api/fetchSteps.js

import client from "./contentful";

export const fetchSteps = async () => {
  try {
    const response = await client.getEntries({ content_type: "stepId" });

    const steps = response.items.map((item, index) => ({
      id: item.fields.stepId,
      order: index + 1,
      questions: item.fields.questions,
    }));
    return steps;
  } catch (error) {
    console.error("Error retrieving steps:", error);
    throw error;
  }
};
