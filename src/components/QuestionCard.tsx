import React from "react";
import styled from "styled-components";

interface CardProps {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  questionNr: number;
  totalQuestions: number;
  correct_answer: string;
  userSelected: string;
}

const QuestionCard: React.FC<CardProps> = ({
  question,
  answers,
  callback,
  questionNr,
  totalQuestions,
  correct_answer,
  userSelected,
}) => {
  return (
    <CardWrapper>
      <p>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      {answers.map((answer) => (
        <ButtonWrapper
          value={answer}
          disabled={userSelected ? true : false}
          correct={userSelected && correct_answer === answer ? true : false}
          onClick={callback}
          userClicked={userSelected === answer ? true : false}
          key={answer}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </ButtonWrapper>
      ))}
    </CardWrapper>
  );
};

export default QuestionCard;

const CardWrapper = styled.div`
  box-shadow: 2px 2px 2px 5px lightgrey;
  margin: 20px;
  padding: 20px;
`;

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

const ButtonWrapper = styled.button<ButtonWrapperProps>`
  width: 100%;
  height: 40px;
  margin: 5px;
  background-color: ${({ correct, userClicked }) =>
    correct ? "green" : !correct && userClicked ? "red" : ""};
`;
