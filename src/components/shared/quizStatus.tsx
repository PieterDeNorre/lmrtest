"use client";

import { useQuizContext } from "@/context/quizContext";
import { formatTime } from "@/util/time";
import { tv } from "tailwind-variants";
import { Btn } from "@/components";

const ClassesQuizStatus = tv({
  slots: {
    container:
      "absolute top-4 left-4 bg-white/10 text-white px-6 py-4 rounded-md flex flex gap-10 items-center",
    title: "text-lg font-semibold underline underline-offset-4",
    btnContainer: "flex gap-2",
    btn: "px-3 py-1 bg-blue-dark rounded-md hover:bg-yellow hover:text-blue-dark transition cursor-pointer",
  },
});

const QuizStatus = () => {
  const classes = ClassesQuizStatus();
  const {
    timeLimit,
    score,
    progress,
    level,
    quizStep,
    pauseTimer,
    setQuizStep,
  } = useQuizContext();

  return (
    <div className={classes.container()}>
      <h3 className={classes.title()}>Quiz Status</h3>
      <p>
        Level: <b>{level}</b>
      </p>
      <p>Quiz Step: {quizStep}</p>
      <p>Time Limit: {formatTime(timeLimit)}</p>
      <p>Score: {score}</p>
      <p>Progress: {progress}%</p>
      <div className={classes.btnContainer()}>
        <Btn
          variant="primary"
          action={() => setQuizStep(quizStep - 1)}
          label="prev"
          square
        />

        <Btn
          variant="primary"
          action={() => setQuizStep(quizStep + 1)}
          label="next"
          square
        />
        <Btn
          variant="secondary"
          action={() => {
            pauseTimer();
          }}
          label="||"
          square
        />
      </div>
    </div>
  );
};

export default QuizStatus;
