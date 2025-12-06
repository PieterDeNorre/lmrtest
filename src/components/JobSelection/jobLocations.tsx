/* eslint-disable react-hooks/purity */
"use client";

import { headers } from "@/tailwind/global";
import { useQuestionsContext } from "@/context/questionsContext";
import { tv } from "tailwind-variants";
import { useQuizContext } from "@/context/quizContext";
import { Progress, IconsProvider, Btn } from "@/components";
import {
  btnLabels,
  intro,
  jobLocationHoverText,
  positions,
} from "@/mock/flavour";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import MotionPath from "../shared/airplane";
import { motion } from "framer-motion";

const classesJobLocations = tv({
  slots: {
    overlay:
      "absolute inset-0 bg-blue-dark/40 z-10 transition-opacity duration-300 opacity-0 z-1 poiner-events-none",
    progress: "!absolute top-2 left-2 z-10",
    dot: "-translate-y-1/2 -translate-x-1/2 absolute w-14 h-14 rounded-full cursor-pointer z-2 group hover:z-10",
    icon: "text-white",
    hover:
      "opacity-0 relative transition-all duration-300 w-0 h-0 group-hover:opacity-100 group-hover:w-[300px] group-hover:h-auto flex flex-col bg-white rounded-md text-sm font-semibold absolute top-1/2 -right-[320px] -translate-y-1/3 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none group-hover:pointer-events-auto shadow-lg",
    hoverTriangle:
      "absolute top-16 -left-3 bg-white w-6 h-6 rounded-sm rotate-45 opacity-0 group-hover:opacity-100",
    hoverText: "flex flex-col gap-2 mb-4 p-8 opacity-0 group-hover:opacity-100",
    title:
      headers({ size: "xl", color: "blue" }) +
      " font-bolder text-left group-hover:opacity-100 opacity-0",
    text: headers({ size: "lg", color: "blue" }) + " text-left font-light",
    btn: "opacity-0 group-hover:opacity-100",
    pulse:
      "absolute left-1/2 top-1/2 rounded-full group-hover:bg-white group-hover:animate-ping -translate-y-1/2 -translate-x-1/2 -z-10",
    checkmark:
      headers({ size: "md", color: "white" }) +
      " absolute -top-1 -right-1 bg-valid rounded-full flex aspect-square w-6 h-6 items-center justify-center border-2 boreder-white",
  },
  variants: {
    pulse: {
      small: {
        pulse: "w-14 h-14",
      },
      big: {
        pulse: "w-24 h-24",
      },
    },
    done: {
      true: {
        dot: "pointer-events-none z-1",
        icon: "flex items-center justify-center inset-0 w-full h-full bg-teal rounded-full transition",
      },
      false: {
        dot: "",
        icon: "flex items-center justify-center inset-0 w-full h-full bg-blue-dark rounded-full hover:bg-blue-light transition",
      },
    },
    hoverActive: {
      true: {
        overlay: "opacity-100 pointer-events-auto",
      },
      false: {},
    },
  },
});

const classesModal = tv({
  slots: {
    overlay: "rounded-md absolute inset-0 bg-blue-dark/40",
    modal:
      "shadow-lg rounded-lg w-[565px] h-auto absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-blue z-50 py-20",
    modalText:
      headers({ size: "6xl", color: "white" }) + " p-10 text-center font-bold",
    nail: "w-5 h-5 bg-grey rounded-full absolute border-2 border-grey-light inset-shadow-white",
  },
  variants: {
    nail: {
      topleft: {
        nail: "top-3 left-3",
      },
      topright: {
        nail: "top-3 right-3",
      },
      bottomleft: {
        nail: "bottom-3 left-3",
      },
      bottomright: {
        nail: "bottom-3 right-3",
      },
    },
  },
});

const JobLocations = () => {
  const { questions, setCurrentQuestionIndex } = useQuestionsContext();
  const { quizStarted, setQuizStep, quizStep, results } = useQuizContext();
  const [hoverActive, setHoverActive] = useState<boolean>(false);

  const classes = classesJobLocations({ hoverActive });

  // Generate stable positions that don't change on re-renders
  const questionPositions = questions.map((question, index) => ({
    question,
    left: positions[index].left,
    top: positions[index].top,
    idx: index,
    done: results.some((res) => res.index === index),
  }));

  useEffect(() => {
    console.log("triggered");
  }, [hoverActive]);

  if (!quizStarted) {
    return <Modal />;
  }

  return (
    <>
      <Progress className={classes.progress()} />
      <MotionPath />
      <div className={classes.overlay()} />
      {questionPositions.map(({ question, left, top, idx, done }) => {
        return (
          <motion.div
            key={idx + question.question}
            className={classes.dot({ done })}
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
            onMouseEnter={() => {
              setHoverActive(true);
            }}
            onMouseLeave={() => {
              setHoverActive(false);
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: idx * 0.5,
            }}
          >
            <div className={classes.icon({ done })}>
              {!done ? (
                <IconsProvider icon="Lock" className="text-white h-6 w-6" />
              ) : (
                <IconsProvider
                  icon="Warehouse"
                  className="text-white h-12 w-12"
                />
              )}
              {done && (
                <div className={classes.checkmark()}>
                  <IconsProvider
                    icon="Checkmark"
                    className="text-white h-3 w-3"
                  />
                </div>
              )}
            </div>
            <div className={classes.pulse({ pulse: "small" })} />
            <div className={classes.pulse({ pulse: "big" })} />
            <div className={classes.hover()}>
              <div className={classes.hoverTriangle()} />
              <div className={classes.hoverText()}>
                <span className={classes.title()}>
                  {jobLocationHoverText[idx].title}
                </span>
                <span className={classes.text()}>
                  {jobLocationHoverText[idx].text}
                </span>
              </div>
              <Btn
                variant="primary"
                label={btnLabels.ontgrendel}
                action={() => {
                  setQuizStep(quizStep + 1);
                  setCurrentQuestionIndex(idx);
                }}
                notRounded
                className={classes.btn()}
              />
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

// Welcome modal
const Modal = () => {
  const classes = classesModal();
  return (
    <>
      <div className={classes.overlay()} />
      <div className={classes.modal()}>
        <p className={classes.modalText()}>{parse(intro.modal)}</p>
        <div className={classes.nail({ nail: "topleft" })} />
        <div className={classes.nail({ nail: "topright" })} />
        <div className={classes.nail({ nail: "bottomleft" })} />
        <div className={classes.nail({ nail: "bottomright" })} />
      </div>
    </>
  );
};

export default JobLocations;
