export interface Questions {
    question: string;
    choices: string[];
    correctAnswer: string;
  }
  
  export interface QuizResult {
    correctAnswers: number;
    wrongAnswers: number;
  }
 
  export interface QuestionProps {
    question: Questions;
    selectedAnswerIndex: number | null;
    handleAnswerSelected: (index: number) => void;
    selectAnswer: boolean
  }

  export interface FinalResultProps {
    questionsCount: number;
    correctAnswers: number;
    wrongAnswers: number;
    resetQuiz: () => void;
  }