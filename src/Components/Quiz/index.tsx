import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "../Question";
import Result from "../Result";
import { Questions, QuizResult } from "../types";

const Quiz: React.FC = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [result, setResult] = useState<QuizResult>({
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectAnswer, setSelectAnswer] = useState<boolean>(false);

  useEffect(() => {
    if (questions.length === 0) {
      fetchQuizData();
    }
  }, [questions.length]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=10");
      const data = await response.data;

      if (data?.response_code === 0 && data?.results) {
        const formattedQuestions = data.results.map((result: any) => ({
          question: result.question,
          choices: [...result.incorrect_answers, result.correct_answer].sort(
            () => Math.random() - 0.5
          ),
          correctAnswer: result.correct_answer,
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswerIndex !== null) {
      const isCorrect =
        questions[activeQuestionIndex].choices[selectedAnswerIndex] ===
        questions[activeQuestionIndex].correctAnswer;

      setResult((prevResult) => ({
        correctAnswers: prevResult.correctAnswers + (isCorrect ? 1 : 0),
        wrongAnswers: prevResult.wrongAnswers + (isCorrect ? 0 : 1),
      }));

      const updatedQuestions = [...questions];
      updatedQuestions[activeQuestionIndex].choices[selectedAnswerIndex] =
        isCorrect ? "correct" : "incorrect";
      setQuestions(updatedQuestions);

      if (activeQuestionIndex !== questions.length - 1) {
        setActiveQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowResult(true);
      }
      setSelectedAnswerIndex(null);
      setSelectAnswer(false);
    }
  };

  const handleAnswerSelected = (index: number) => {
    setSelectedAnswerIndex(index);
    setSelectAnswer(true);
  };

  const resetQuiz = () => {
    setShowResult(false);
    setActiveQuestionIndex(0);
    setLoading(true);
    setQuestions([]);
    setResult({ correctAnswers: 0, wrongAnswers: 0 });
    fetchQuizData();
  };

  const addLeadingZero = (number: number): string =>
    number > 9 ? number.toString() : `0${number}`;

  if (loading) {
    return (
      <div data-testid="quiz-component" className="text-center font-lg text-white font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-lg min-w-64 bg-white rounded-lg mt-100px py-8 px-14">
        {!showResult ? (
          <>
            <div className="flex items-center">
              <span className="text-purple-800 text-4xl font-semibold">
                {addLeadingZero(activeQuestionIndex + 1)}
              </span>
              <span className="text-gray-300 text-sm font-semibold">
                /{addLeadingZero(questions.length)}
              </span>
            </div>
            <Question
              question={questions[activeQuestionIndex]}
              selectedAnswerIndex={selectedAnswerIndex}
              handleAnswerSelected={handleAnswerSelected}
              selectAnswer={selectAnswer}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswerIndex === null || !selectAnswer}
                className={`text-white px-8 py-2 rounded-lg font-semibold  ${
                  selectedAnswerIndex === null
                    ? "bg-custom-gradient-2 cursor-not-allowed"
                    : "bg-custom-gradient-3 cursor-pointer"
                }`}
              >
                {activeQuestionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          </>
        ) : (
          <Result
            questionsCount={questions.length}
            correctAnswers={result.correctAnswers}
            wrongAnswers={result.wrongAnswers}
            resetQuiz={resetQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
