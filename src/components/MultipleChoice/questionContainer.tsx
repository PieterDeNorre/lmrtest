"use client";
import { Question } from "@/context/questionsContext";
import { tv } from "tailwind-variants";
import { headers } from "@/tailwind/global";
import { Btn } from "@/components";
import { useState } from "react";
import { formatTime } from "@/util/time";

const classesQuestionContainer = tv({
  slots: {
    container:
      "p-6 bg-blue-darkest rounded-md shadow-md h-full flex flex-col gap-5 items-center px-20",
    question:
      headers({ size: "xl", color: "white" }) + " font-bold  text-center",
    answersList: "grid grid-cols-2 gap-5 w-full",
    actions: "flex flex-col gap-2",
    timer:
      "bg-white text-blue-darkest rounded-full px-4 py-2 flex items-center gap-2 font-bold",
  },
});

const QuestionContainer = ({ data }: { data: Question }) => {
  const classes = classesQuestionContainer();
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(data.time_limit_s);

  return (
    <div className={classes.container()}>
      <div className={classes.timer()}>
        <svg
          width="15"
          height="18"
          viewBox="0 0 15 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0827 10.2915C14.0827 8.90348 13.6426 7.58317 12.9316 6.46598H12.9655L13.9473 5.45036C14.1165 5.31494 14.1165 5.04411 13.9473 4.87484L12.9993 3.92692C12.8301 3.75765 12.5592 3.75765 12.4238 3.92692L11.4759 4.87484C10.528 4.09619 9.37695 3.55452 8.12435 3.3514V2.1665H9.07227C9.27539 2.1665 9.47852 1.99723 9.47852 1.76025V0.406087C9.47852 0.202962 9.27539 -0.000163317 9.07227 -0.000163317H5.00977C4.77279 -0.000163317 4.60352 0.202962 4.60352 0.406087V1.76025C4.60352 1.99723 4.77279 2.1665 5.00977 2.1665H5.95768V3.3514C2.57227 3.85921 -0.000651658 6.77067 -0.000651658 10.2915C-0.000651658 14.1847 3.14779 17.3332 7.04102 17.3332C10.9004 17.3332 14.0827 14.1847 14.0827 10.2915ZM8.12435 11.5103C8.12435 11.7472 7.92122 11.9165 7.7181 11.9165H6.36393C6.12695 11.9165 5.95768 11.7472 5.95768 11.5103V6.39827C5.95768 6.1613 6.12695 5.99202 6.36393 5.99202H7.7181C7.92122 5.99202 8.12435 6.1613 8.12435 6.39827V11.5103Z"
            fill="#004475"
          />
        </svg>
        {formatTime(timer)}
      </div>
      <div className={classes.question()}>{data.question}</div>
      <div className={classes.answersList()}>
        {data.answers &&
          data.answers.map((answer, index) => (
            <Btn
              variant="answer"
              key={index}
              label={answer.answer}
              action={() => {
                setStarted(true);
              }}
              active={true}
            />
          ))}
      </div>
      <div className={classes.actions()}>
        <Btn
          variant="primary"
          label="Klaar"
          action={() => {}}
          disabled={!started}
        />
        <Btn
          variant="primary"
          label="Geef me een tip"
          action={() => {}}
          disabled={!started}
        />
      </div>
    </div>
  );
};
export default QuestionContainer;
