"use client";

import { selectedAnswer } from "@/components/MultipleChoice/questionContainer";
import { createContext, useContext, ReactNode, useState, useRef } from "react";

export interface QuizContextType {
  // Define your context properties here
  timeLimit: number;
  progress: number;
  score: number;
  level: string;
  isTimerRunning: boolean;
  isPaused: boolean;
  quizStep: number;
  quizStarted: boolean;
  results: questionResult[];
  setScore: (score: number) => void;
  setProgress: (progress: number) => void;
  setLevel: (level: string) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  setQuizStep: (step: number) => void;
  setQuizStarted: (started: boolean) => void;
  getCurrentTime: () => number;
  subscribeToTimer: (callback: (time: number) => void) => () => void;
  setResults: (results: questionResult[]) => void;
}

export interface questionResult {
  index: number;
  selectedAnswers: selectedAnswer[];
}

export const QuizContext = createContext<QuizContextType | null>(null);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};

export interface QuizProviderProps {
  children: ReactNode;
  time_limit_s: number;
}

export const QuizProvider = ({ children, time_limit_s }: QuizProviderProps) => {
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<string>("");

  const [results, setResults] = useState<questionResult[]>([]);

  const [progress, setProgress] = useState<number>(0);
  const [timeLimit, setTimeLimit] = useState(time_limit_s);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizStep, setQuizStep] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeLeftRef = useRef<number>(time_limit_s);
  const onTimerUpdate = useRef<((time: number) => void) | null>(null);

  const startTimer = () => {
    if (isTimerRunning && !isPaused) return; // Prevent multiple timers

    setIsTimerRunning(true);
    setIsPaused(false);
    timeLeftRef.current = timeLimit;

    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1;

      // Only call the callback if it exists, don't update state
      if (onTimerUpdate.current) {
        onTimerUpdate.current(timeLeftRef.current);
      }

      if (timeLeftRef.current <= 0) {
        clearInterval(timerRef.current!);
        setIsTimerRunning(false);
        timerRef.current = null;
        setTimeLimit(0); // Only update state when timer ends
      }
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current && isTimerRunning) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsPaused(true);
    }
  };

  const resumeTimer = () => {
    if (isPaused && !timerRef.current) {
      setIsPaused(false);

      timerRef.current = setInterval(() => {
        timeLeftRef.current -= 1;

        // Only call the callback if it exists, don't update state
        if (onTimerUpdate.current) {
          onTimerUpdate.current(timeLeftRef.current);
        }

        if (timeLeftRef.current <= 0) {
          clearInterval(timerRef.current!);
          setIsTimerRunning(false);
          setIsPaused(false);
          timerRef.current = null;
          setTimeLimit(0); // Only update state when timer ends
        }
      }, 1000);
    }
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setTimeLimit(time_limit_s);
    timeLeftRef.current = time_limit_s;
    setIsTimerRunning(false);
    setIsPaused(false);
  };

  // Get current time without causing re-render
  const getCurrentTime = () => timeLeftRef.current;

  // Subscribe to timer updates
  const subscribeToTimer = (callback: (time: number) => void) => {
    onTimerUpdate.current = callback;
    // Return unsubscribe function
    return () => {
      onTimerUpdate.current = null;
    };
  };

  return (
    <QuizContext.Provider
      value={{
        timeLimit,
        progress,
        score,
        level,
        isTimerRunning,
        isPaused,
        quizStep,
        quizStarted,
        results,
        setScore,
        setProgress,
        setLevel,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        setQuizStep,
        setQuizStarted,
        getCurrentTime,
        subscribeToTimer,
        setResults,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
