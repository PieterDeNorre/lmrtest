"use client";

import { useQuizContext } from "@/context/quizContext";
import { tv } from "tailwind-variants";
import { Btn } from "@/components";

const ClassesQuizStatus = tv({
  slots: {
    container:
      "absolute top-4 left-1/2 translate-x-[-50%] [&_*]:whitespace-nowrap bg-white/10 text-white px-6 py-4 rounded-md flex flex gap-10 items-center",
    title: "text-lg font-semibold underline underline-offset-4",
    btnContainer: "flex gap-2",
    btn: "px-3 py-1 bg-blue-dark rounded-md hover:bg-yellow hover:text-blue-dark transition cursor-pointer",
  },
});

//! Just an overview for development purposes, not part of the final design
const QuizStatus = () => {
  const classes = ClassesQuizStatus();
  const {
    score,
    progress,
    level,
    quizStep,
    pauseTimer,
    setQuizStep,
    setQuizStarted,
  } = useQuizContext();

  return (
    <div className={classes.container()}>
      <h3 className={classes.title()}>Quiz Status</h3>
      <p>
        Level: <b>{level}</b>
      </p>
      <p>Quiz Step: {quizStep}</p>
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
            setQuizStarted(false);
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
