"use client";

import { Question, useQuestionsContext } from "@/context/questionsContext";
import { tv } from "tailwind-variants";
import { headers } from "@/tailwind/global";
import { Btn, IconsProvider, Modal, Progress } from "@/components";
import { useEffect, useState } from "react";
import { formatTime } from "@/util/time";
import { useQuizContext } from "@/context/quizContext";
import { MultipleChoiceValidator } from "@/util/mutlipleChoiceCheck";
import { btnLabels, modalsText } from "@/mock/flavour";
import { motion } from "framer-motion";

export type SelectedAnswer = {
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
    modalTitle:
      headers({ size: "3xl", color: "blue" }) + " font-bold text-center mb-6",
    modalText: headers({ size: "sm", color: "blue" }) + " text-center mb-6",
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
      true: {
        answer: "animate-shake",
      },
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

const QuestionContainer = ({
  data,
  validation = false,
}: {
  data: Question;
  validation?: boolean;
}) => {
  const classes = classesQuestionContainer();
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(data.time_limit_s);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [validateAnswers, setValidateAnswers] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { quizStep, setQuizStep, results, setResults } = useQuizContext();
  const { currentQuestionIndex, questions } = useQuestionsContext();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const valid = MultipleChoiceValidator({
    answerList: data.answers || [],
    selectedAnswers,
  });

  return (
    <div className={classes.container()}>
      <div className={classes.timer({ timerStopped: timer === 0 })}>
        <IconsProvider icon="Crono" className="scale-125 w-3 h-3" />
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
              <motion.div
                key={index}
                className={classes.answer({
                  correct: validateAnswers && isSelected && isCorrectAnswer,
                  validateAnswers:
                    validateAnswers && (isSelected || isUntouchedCorrect),
                })}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 20,
                  delay: index * 0.15,
                }}
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
              </motion.div>
            );
          })}
      </div>
      {/* Btn Actions */}
      <div className={classes.actions()}>
        {!validateAnswers ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
            >
              <Btn
                variant="primary"
                label={btnLabels.klaar}
                action={() => {
                  setStarted(false);
                  setValidateAnswers(true);
                  const resultsLocal = [...results];
                  if (
                    !results.some((res) => res.index === currentQuestionIndex)
                  ) {
                    resultsLocal.push({
                      index: currentQuestionIndex,
                      selectedAnswers: selectedAnswers,
                    });
                  }
                  setResults(resultsLocal);
                }}
                disabled={!started}
                animate
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 20,
                delay: 0.15,
              }}
            >
              <Btn
                variant="tertiary"
                label={btnLabels.tip}
                action={() => {}}
                disabled={true}
                animate
              />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          >
            <Btn
              variant="primary"
              label={btnLabels.door}
              action={() => setModalOpen(true)}
            />
          </motion.div>
        )}
      </div>
      {/* Modal for level completion */}
      <Modal open={modalOpen || timer === 0}>
        <h1 className={classes.modalTitle()}>
          {validation && valid
            ? modalsText[0].titel
            : !validation
            ? modalsText[0].titel
            : modalsText[1].titel}
        </h1>
        <Progress bar />
        <p className={classes.modalText()}>
          {validation && valid
            ? modalsText[0].text
            : !validation
            ? modalsText[0].text
            : modalsText[1].text}
        </p>

        {validation && valid && results.length < questions.length && (
          <Btn
            variant="primary"
            label={btnLabels.volgende}
            action={() => {
              // Reset states for next question
              setStarted(false);
              setTimer(data.time_limit_s);
              setSelectedAnswers([]);
              setValidateAnswers(false);
              setQuizStep(quizStep - 1);
            }}
            animate
          />
        )}
        {validation && valid && questions.length === results.length && (
          <Btn
            variant="primary"
            label={btnLabels.resultaat}
            action={() => {
              // Reset states for next question
              setStarted(false);
              setTimer(data.time_limit_s);
              setSelectedAnswers([]);
              setValidateAnswers(false);
              setQuizStep(quizStep + 1);
            }}
            animate
          />
        )}
        {validation && !valid && (
          <Btn
            variant="primary"
            label={btnLabels.opnieuw}
            action={() => {
              // Reset states for next question
              const resultsLocal = results.filter(
                (res) => res.index !== currentQuestionIndex
              );

              setResults(resultsLocal);
              setModalOpen(false);
              setStarted(false);
              setTimer(data.time_limit_s);
              setSelectedAnswers([]);
              setValidateAnswers(false);
            }}
            animate
          />
        )}
        {!validation && results.length < questions.length && (
          <Btn
            variant="primary"
            label={btnLabels.volgende}
            action={() => {
              // Reset states for next question
              setStarted(false);
              setTimer(data.time_limit_s);
              setSelectedAnswers([]);
              setValidateAnswers(false);
              setQuizStep(quizStep - 1);
            }}
            animate
          />
        )}
        {!validation && questions.length === results.length && (
          <Btn
            variant="primary"
            label={btnLabels.resultaat}
            action={() => {
              // Reset states for next question
              setStarted(false);
              setTimer(data.time_limit_s);
              setSelectedAnswers([]);
              setValidateAnswers(false);
              setQuizStep(quizStep + 1);
            }}
            animate
          />
        )}
      </Modal>
    </div>
  );
};

export default QuestionContainer;
