"use client";

import { createContext, useContext, ReactNode, useState } from "react";

// Define the answer type
export interface Answer {
  answer: string;
  correct: boolean;
}

// Define the question type
export interface Question {
  question: string;
  time_limit_s: number;
  answers?: Answer[];
}

export interface Solved {
  index: number;
  score: number;
}

// Define the context type
export interface QuestionContextType {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  answers: Record<string | number, string>;
  setAnswer: (questionId: string | number, answer: string) => void;
}

// Create the context
export const QuestionsContext = createContext<QuestionContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useQuestionsContext = () => {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionsContext must be used within a QuestionsProvider"
    );
  }
  return context;
};

export interface QuestionProviderProps {
  children: ReactNode;
  initialQuestions?: Question[];
}

export const QuestionProvider = ({
  children,
  initialQuestions = [],
}: QuestionProviderProps) => {
  const [questions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState<Record<string | number, string>>({});

  const setAnswer = (questionId: string | number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const value: QuestionContextType = {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswer,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};
