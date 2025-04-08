// src/components/QuestionList/QuestionList.jsx
import css from "./QuestionList.module.css";

export default function QuestionList({
  questions,
  answers,
  handleInputChange,
  handleCheckboxChange,
}) {
  //   console.log(handleInputChange);
  return (
    <>
      {questions.map((q) => (
        <div key={q.id} className={css.questionCard}>
          <h3 className={css.text}>{q.text}</h3>
          {q.type === "multiple-choice" && (
            <ul className={css.answerList}>
              {q.possibleAnswers.map((a, index) => (
                <li key={`${q.id}-answer-${index}`}>
                  <label
                    className={css.checkboxContainer}
                    htmlFor={`${q.id}-answer-${index}`}
                  >
                    {a}
                    <input
                      type="checkbox"
                      id={`${q.id}-answer-${index}`}
                      checked={(answers[q.id] || []).includes(a)}
                      onChange={() => handleCheckboxChange(q.id, a)}
                    />
                    <span className={css.checkmark}></span>
                  </label>
                </li>
              ))}
            </ul>
          )}
          {q.type === "open-ended" && (
            <input
              className={css.openInput}
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              placeholder="Enter your answer"
            />
          )}
        </div>
      ))}
    </>
  );
}
