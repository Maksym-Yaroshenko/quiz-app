import { useEffect, useState } from "react";
import css from "./QuizPage.module.css";
import Loader from "../../components/Loader/Loader";
import { fetchQuestions } from "../../api/fetchQuestions";
import { fetchSteps } from "../../api/fetchSteps";
import QuestionList from "../../components/QuestionList/QuestionList";

export default function QuizPage() {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  useEffect(() => {
    console.log("Answers changed:", answers);
  }, [answers]);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const [allQuestions, rawSteps] = await Promise.all([
          fetchQuestions(),
          fetchSteps(),
        ]);

        const stepsWithQuestions = rawSteps.map((step) => {
          const realQuestions = step.questions.map((qRef) => {
            const questionId = qRef.fields.questionId;
            return allQuestions.find((q) => q.id === questionId);
          });

          return {
            ...step,
            questions: realQuestions,
          };
        });

        setSteps(stepsWithQuestions);
      } catch (err) {
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, []);

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id, answer) => {
    setAnswers((prev) => {
      console.log(prev);
      const current = prev[id] || [];
      const isSelected = current.includes(answer);
      return {
        ...prev,
        [id]: isSelected
          ? current.filter((a) => a !== answer)
          : [...current, answer],
      };
    });
  };

  function handleSubmit() {}

  if (loading) return <Loader />;
  if (error) return <div className={css.error}>{error}</div>;

  return (
    <div className={css.quizContainer}>
      <h1>Step {currentStep + 1}</h1>
      <QuestionList
        questions={steps[currentStep].questions}
        answers={answers}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
      />

      <div className={css.navigation}>
        {currentStep > 0 && (
          <button onClick={() => setCurrentStep((prev) => prev - 1)}>
            Back
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button onClick={() => setCurrentStep((prev) => prev + 1)}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit}>Finish</button>
        )}
      </div>
    </div>
  );
}
