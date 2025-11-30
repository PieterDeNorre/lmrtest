"use client";

import { useQuizContext } from "@/context/quizContext";
import { formatTime } from "@/util/time";
import { tv } from "tailwind-variants";

const ClassesQuizStatus = tv({
  slots: {
    container:
      "absolute top-4 right-4 bg-white/10 text-white px-6 py-4 rounded-md flex flex-col gap-1",
    title: "text-lg font-semibold underline underline-offset-4",
  },
});

const QuizStatus = () => {
  const classes = ClassesQuizStatus();
  const { timeLimit, score, progress, level } = useQuizContext();

  return (
    <div className={classes.container()}>
      <h3 className={classes.title()}>Quiz Status</h3>
      <p>
        Level: <b>{level}</b>
      </p>
      <p>Time Limit: {formatTime(timeLimit)}</p>
      <p>Score: {score}</p>
      <p>Progress: {progress}%</p>
    </div>
  );
};

export default QuizStatus;
