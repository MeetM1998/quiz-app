import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React, { act } from "react";
import Result from "./";

const mockProps = {
  questionsCount: 10,
  correctAnswers: 7,
  wrongAnswers: 3,
  resetQuiz: jest.fn(),
};

test("renders result details and restart button", () => {
  act(() => {
    render(<Result {...mockProps} />);
  });

  const resultHeading = screen.getByText(/Quiz Result/i);
  expect(resultHeading).toBeInTheDocument();

  const totalQuestionsElement = screen.getByText(
    `Total Questions: ${mockProps.questionsCount}`
  );
  expect(totalQuestionsElement).toBeInTheDocument();

  const correctAnswersElement = screen.getByText(
    `Correct Answers: ${mockProps.correctAnswers}`
  );
  expect(correctAnswersElement).toBeInTheDocument();

  const wrongAnswersElement = screen.getByText(
    `Wrong Answers: ${mockProps.wrongAnswers}`
  );
  expect(wrongAnswersElement).toBeInTheDocument();

  const restartButton = screen.getByText(/Restart Quiz/i);
  expect(restartButton).toBeInTheDocument();
});

test("resetQuiz function when restart button is clicked", () => {
  act(() => {
    render(<Result {...mockProps} />);
  });

  const restartButton = screen.getByText(/Restart Quiz/i);
  fireEvent.click(restartButton);

  expect(mockProps.resetQuiz).toHaveBeenCalledTimes(1);
});
