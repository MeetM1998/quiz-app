import "@testing-library/jest-dom/extend-expect";
import React, { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Question from "./";

const mockQuestion = {
  question: "What was the first interactive movie video game?",
  choices: ["M.A.C.H. 3", "Astron Belt", "Cube Quest", "Dragon&#039;s Lair"],
  correctAnswer: "Astron Belt",
};

test("renders question and answer choices", () => {
  act(() => {
    render(
      <Question
        question={mockQuestion}
        selectedAnswerIndex={null}
        handleAnswerSelected={() => {}}
        selectAnswer={true}
      />
    );
  });

  const questionElement = screen.getByText(mockQuestion.question);
  expect(questionElement).toBeInTheDocument();

  mockQuestion.choices.forEach((choice) => {
    const choiceElement = screen.getByText(choice);
    expect(choiceElement).toBeInTheDocument();
  });
});

test("selects answer and apply correct styling", () => {
  let selectedAnswerIndex = null;
  const handleAnswerSelected = jest.fn((index: number) => {
    selectedAnswerIndex = index;
  });

  render(
    <Question
      question={mockQuestion}
      selectedAnswerIndex={selectedAnswerIndex}
      handleAnswerSelected={handleAnswerSelected}
      selectAnswer={false}
    />
  );

  const answerIndex = 1;
  const answerElement = screen.getByText(mockQuestion.choices[answerIndex]);
  fireEvent.click(answerElement);

  expect(handleAnswerSelected).toHaveBeenCalledTimes(1);
  expect(handleAnswerSelected).toHaveBeenCalledWith(answerIndex);

  const selectedAnswerElement = screen.getByText(
    mockQuestion.choices[answerIndex]
  );
  expect(selectedAnswerElement).toHaveClass(
    "cursor-pointer py-2 px-4 bg-white border border-gray-300 rounded-lg mb-4"
  );
});
