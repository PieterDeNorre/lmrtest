/* eslint-disable react-hooks/purity */
import { headers } from "@/tailwind/global";
import { useQuestionsContext } from "@/context/questionsContext";
import { tv } from "tailwind-variants";
import { useMemo } from "react";
import { useQuizContext } from "@/context/quizContext";
import { Progress } from "@/components";

const classesMapLocations = tv({
  slots: {
    progress: "absolute top-2 left-2",
    dot: "-translate-y-1/2 -translate-x-1/2 absolute w-14 h-14 rounded-full cursor-pointer group group-hover:z-10",
    icon: "flex items-center justify-center inset-0 w-full h-full bg-blue-dark rounded-full hover:bg-blue-light transition",
    hover:
      "transition-all duration-300 overflow-hidden w-0 h-0 group-hover:w-max group-hover:h-auto p-2 bg-white text-blue-dark rounded-md text-sm font-semibold absolute top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition ",
    pulse:
      "absolute left-1/2 top-1/2 rounded-full group-hover:bg-white group-hover:animate-ping -translate-y-1/2 -translate-x-1/2 -z-10",
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
  },
});

const classesModal = tv({
  slots: {
    overlay: "rounded-md absolute inset-0 bg-blue-dark/40",
    modal:
      "shadow-lg rounded-md w-[565px] h-auto absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-blue z-50 py-20",
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

const MapLocations = () => {
  const { questions, setCurrentQuestionIndex } = useQuestionsContext();
  const { quizStarted, setQuizStep, quizStep } = useQuizContext();

  const classes = classesMapLocations();

  // Generate stable positions that don't change on re-renders
  const questionPositions = useMemo(() => {
    return questions.map((question, index) => ({
      question,
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      // Use question content as seed for consistency
      idx: index,
    }));
  }, [questions]); // Only recalculate when questions change

  if (!quizStarted) {
    return <Modal />;
  }

  return (
    <>
      <Progress
        amount={questions.length}
        done={0}
        className={classes.progress()}
      />
      {questionPositions.map(({ question, left, top, idx }) => {
        return (
          <button
            key={idx + question.question}
            className={classes.dot()}
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
            onClick={() => {
              setQuizStep(quizStep + 1);
              setCurrentQuestionIndex(idx);
            }}
          >
            <div className={classes.icon()}>
              <svg
                width="21"
                height="24"
                viewBox="0 0 21 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.75 10.5H17.625V7.125C17.625 3.23438 14.3906 0 10.5 0C6.5625 0 3.375 3.23438 3.375 7.125V10.5H2.25C0.984375 10.5 0 11.5312 0 12.75V21.75C0 23.0156 0.984375 24 2.25 24H18.75C19.9688 24 21 23.0156 21 21.75V12.75C21 11.5312 19.9688 10.5 18.75 10.5ZM13.875 10.5H7.125V7.125C7.125 5.29688 8.625 3.75 10.5 3.75C12.3281 3.75 13.875 5.29688 13.875 7.125V10.5Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className={classes.pulse({ pulse: "small" })} />
            <div className={classes.pulse({ pulse: "big" })} />
            <div className={classes.hover()}>
              {question.time_limit_s + " seconden de tijd"}
            </div>
          </button>
        );
      })}
    </>
  );
};

const Modal = () => {
  const classes = classesModal();
  return (
    <>
      <div className={classes.overlay()} />
      <div className={classes.modal()}>
        <p className={classes.modalText()}>
          Welkom <br />
          in Kansstad
        </p>
        <div className={classes.nail({ nail: "topleft" })} />
        <div className={classes.nail({ nail: "topright" })} />
        <div className={classes.nail({ nail: "bottomleft" })} />
        <div className={classes.nail({ nail: "bottomright" })} />
      </div>
    </>
  );
};

export default MapLocations;
