import React, { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuestions, Difficulty, QuestionState } from "./API";
import styled from "styled-components/macro";

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [userSelected, setUserSelected] = useState("");

  useEffect(() => {
    startTrivia();
  }, []);

  const startTrivia = async () => {
    setLoading(true);
    const response = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(response);
    setLoading(false);
    setNumber(0);
    setScore(0);
    setUserSelected("");
    setGameOver(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === questions[number].correct_answer) {
      setScore(score + 1);
    }
    setUserSelected(e.currentTarget.value);
  };

  const nextQuestion = () => {
    if (number !== TOTAL_QUESTIONS - 1) {
      setNumber(number + 1);
      setUserSelected("");
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="App">
      <QuizWrapper>
        <h1>React Quiz</h1>
        <h2>Score: {score}</h2>
        {<button onClick={startTrivia}>start</button>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            correct_answer={questions[number].correct_answer}
            userSelected={userSelected}
          />
        )}
        {number !== TOTAL_QUESTIONS && userSelected && (
          <button onClick={nextQuestion}>Next</button>
        )}
        {gameOver && <p>Game over</p>}
      </QuizWrapper>
    </div>
  );
}

export default App;

const QuizWrapper = styled.div`
  padding: 15px;
  margin: auto;
  width: 650px;
`;
