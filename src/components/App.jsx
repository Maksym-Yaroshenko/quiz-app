// src/components/App.jsx

import "./App.css";

import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import Loader from "./Loader/Loader";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const QuizPage = lazy(() => import("../pages/QuizPage/QuizPage"));
const ResultsPage = lazy(() => import("../pages/ResultsPage/ResultsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <>
      {/* <Layout> */}
      <Suspense fallback={<Loader />}>
        <Routes>
          {<Route path="/" element={<HomePage />} />}
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {/* </Layout> */}
    </>
  );
}

export default App;
