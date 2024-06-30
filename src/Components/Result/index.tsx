import React from "react";
import { FinalResultProps } from "../types";

const Result: React.FC<FinalResultProps> = ({
  questionsCount,
  correctAnswers,
  wrongAnswers,
  resetQuiz,
}) => {
  return (
    <div className=" bg-white rounded-lg p-6 flex items-center flex-col">
      <h2 className="text-3xl font-semibold mb-2">Quiz Result</h2>
      <p className="text-base font-medium">Total Questions: {questionsCount}</p>
      <p className="text-base font-medium">Correct Answers: {correctAnswers}</p>
      <p className="text-base font-medium">Wrong Answers: {wrongAnswers}</p>
      <div className="flex justify-center mt-4">
        <button
          className="bg-custom-gradient-3 text-white px-8 py-2 rounded-lg font-semibold cursor-pointer"
          onClick={resetQuiz}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
