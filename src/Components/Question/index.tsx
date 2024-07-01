import React from "react";
import { QuestionProps } from "../types";

const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswerIndex,
  handleAnswerSelected,
  selectAnswer,
}) => {

  const handleClick = (index: number) => {
    if(!selectAnswer) {
      handleAnswerSelected(index)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mt-4">{question.question}</h2>
      <ul className="mt-4">
        {question.choices.map((answer, index) => (
          <li
            key={answer}
            onClick={() => handleClick(index)}
            className={`py-2 px-4 bg-white border border-gray-300 rounded-lg mb-4
              ${selectAnswer ? "cursor-not-allowed" : "cursor-pointer"}
              ${
                selectedAnswerIndex === index
                  ? answer === question.correctAnswer
                    ? "pointer border-2 border-green-400"
                    : "pointer border-2 border-red-400"
                  : ""
              }`}
          >
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
