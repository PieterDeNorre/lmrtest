"use client";

import { Question, useQuestionsContext } from "@/context/questionsContext";
import { tv } from "tailwind-variants";
import { headers } from "@/tailwind/global";
import { Btn } from "@/components";
import { useEffect, useState } from "react";
import { formatTime } from "@/util/time";
import { useQuizContext } from "@/context/quizContext";

export type selectedAnswer = {
  idx: number;
  answer: boolean;
};

const classesQuestionContainer = tv({
  slots: {
    container:
      "p-6 bg-blue-darkest rounded-md shadow-md h-full flex flex-col gap-5 items-center px-12",
    question:
      headers({ size: "xl", color: "white" }) +
      " font-bold text-center leading-tight px-20",
    answersList: "grid grid-cols-2 gap-2 lg:gap-y-6 lg:gap-x-7 w-full",
    actions: "flex flex-col gap-2 w-full px-24 flex-grow justify-center",
    timer:
      headers({ size: "sm", color: "white" }) +
      " font-bold bg-white text-blue-darkest rounded-full px-2 py-1 flex items-center gap-2",
    answer: "",
  },
  variants: {
    timerStopped: {
      true: {
        timer:
          "bg-red-600 text-white animate-pulse shadow-red-800/50 shadow-md",
      },
      false: {},
    },
    correct: {
      true: {},
      false: {},
    },
    validateAnswers: {
      true: {},
      false: {},
    },
    wrong: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      correct: true,
      validateAnswers: true,
      wrong: false,
      class: {
        answer:
          "[&_button]:ring-valid [&_button]:bg-white [&_span]:text-blue-darkest",
      },
    },
    {
      correct: false,
      validateAnswers: true,
      wrong: false,
      class: {
        answer:
          "[&_button]:ring-error [&_button]:bg-white [&_span]:text-blue-darkest",
      },
    },
  ],
});

const QuestionContainer = ({ data }: { data: Question }) => {
  const classes = classesQuestionContainer();
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(data.time_limit_s);
  const [selectedAnswers, setSelectedAnswers] = useState<selectedAnswer[]>([]);
  const [validateAnswers, setValidateAnswers] = useState(false);
  const { quizStep, setQuizStep, results, setResults } = useQuizContext();
  const { currentQuestionIndex } = useQuestionsContext();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (started && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [started, timer]);

  return (
    <div className={classes.container()}>
      <div className={classes.timer({ timerStopped: timer === 0 })}>
        <svg
          width="15"
          height="18"
          viewBox="0 0 15 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0827 10.2915C14.0827 8.90348 13.6426 7.58317 12.9316 6.46598H12.9655L13.9473 5.45036C14.1165 5.31494 14.1165 5.04411 13.9473 4.87484L12.9993 3.92692C12.8301 3.75765 12.5592 3.75765 12.4238 3.92692L11.4759 4.87484C10.528 4.09619 9.37695 3.55452 8.12435 3.3514V2.1665H9.07227C9.27539 2.1665 9.47852 1.99723 9.47852 1.76025V0.406087C9.47852 0.202962 9.27539 -0.000163317 9.07227 -0.000163317H5.00977C4.77279 -0.000163317 4.60352 0.202962 4.60352 0.406087V1.76025C4.60352 1.99723 4.77279 2.1665 5.00977 2.1665H5.95768V3.3514C2.57227 3.85921 -0.000651658 6.77067 -0.000651658 10.2915C-0.000651658 14.1847 3.14779 17.3332 7.04102 17.3332C10.9004 17.3332 14.0827 14.1847 14.0827 10.2915ZM8.12435 11.5103C8.12435 11.7472 7.92122 11.9165 7.7181 11.9165H6.36393C6.12695 11.9165 5.95768 11.7472 5.95768 11.5103V6.39827C5.95768 6.1613 6.12695 5.99202 6.36393 5.99202H7.7181C7.92122 5.99202 8.12435 6.1613 8.12435 6.39827V11.5103Z"
            fill="currentColor"
          />
        </svg>
        {formatTime(timer)}
      </div>
      <div className={classes.question()}>{data.question}</div>
      <div className={classes.answersList()}>
        {data.answers &&
          data.answers.map((answer, index) => {
            const isSelected = selectedAnswers.some((sa) => sa.idx === index);
            const selectedAnswer = selectedAnswers.find(
              (item) => item.idx === index
            );

            // Validation states
            const isCorrectAnswer = selectedAnswer?.answer === true;
            const isUntouchedCorrect =
              !isSelected && answer.correct && validateAnswers;

            return (
              <div
                key={index}
                className={classes.answer({
                  correct: validateAnswers && isSelected && isCorrectAnswer,
                  validateAnswers:
                    validateAnswers && (isSelected || isUntouchedCorrect),
                })}
              >
                <Btn
                  variant="answer"
                  label={answer.answer}
                  action={() => {
                    if (!started) setStarted(true);

                    if (!isSelected) {
                      setSelectedAnswers([
                        ...selectedAnswers,
                        { idx: index, answer: answer.correct },
                      ]);
                    } else {
                      setSelectedAnswers(
                        selectedAnswers.filter((sa) => sa.idx !== index)
                      );
                    }
                  }}
                  active={started}
                  selected={isSelected}
                  className={validateAnswers ? "pointer-events-none" : ""}
                />
              </div>
            );
          })}
      </div>
      <div className={classes.actions()}>
        {!validateAnswers ? (
          <>
            <Btn
              variant="primary"
              label="Klaar"
              action={() => {
                setStarted(false);
                setValidateAnswers(true);
              }}
              disabled={!started}
            />
            <Btn
              variant="tertiary"
              label="Geef me een tip"
              action={() => {}}
              disabled={!started}
            />
          </>
        ) : (
          <Btn
            variant="primary"
            label="Volgende vraag"
            action={() => {
              setResults([
                ...results,
                {
                  index: currentQuestionIndex,
                  selectedAnswers: selectedAnswers,
                },
              ]);
              // Reset states for next question
              setStarted(false);
              setTimer(data.time_limit_s);
              setSelectedAnswers([]);
              setValidateAnswers(false);
              setQuizStep(quizStep - 1);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default QuestionContainer;
