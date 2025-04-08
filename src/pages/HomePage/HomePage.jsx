// src/pages/HomePage/HomePage.jsx

import { Link } from "react-router";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.container}>
      <div className={css.card}>
        <h1 className={css.title}>Welcome to the Quiz App!</h1>
        <p className={css.description}>
          Take our multi-step quiz to test your knowledge and get your result.
        </p>

        <Link to="/quiz">
          <button className={css.button}>Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}
