/* eslint-disable react-hooks/purity */
import { headers } from "@/tailwind/global";
import { useQuestionsContext } from "@/context/questionsContext";
import { tv } from "tailwind-variants";
import { useMemo } from "react";
import { useQuizContext } from "@/context/quizContext";
import { Progress, IconsProvider } from "@/components";

const classesMapLocations = tv({
  slots: {
    progress: "absolute top-2 left-2",
    dot: "-translate-y-1/2 -translate-x-1/2 absolute w-14 h-14 rounded-full cursor-pointer group group-hover:z-10",
    icon: "text-white",
    hover:
      "transition-all duration-300 overflow-hidden w-0 h-0 group-hover:w-max group-hover:h-auto flex flex-col gap-2 p-2 bg-white text-blue-dark rounded-md text-sm font-semibold absolute top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition ",
    level: headers({ size: "lg", color: "blue" }) + " font-bolder",
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

const MapLocations = () => {
  const { questions, setCurrentQuestionIndex } = useQuestionsContext();
  const { quizStarted, setQuizStep, quizStep, results } = useQuizContext();

  const classes = classesMapLocations();

  // Generate stable positions that don't change on re-renders
  const questionPositions = useMemo(() => {
    return questions.map((question, index) => ({
      question,
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      // Use question content as seed for consistency
      idx: index,
      done: results.some((res) => res.index === index),
    }));
  }, [questions, results]); // Only recalculate when questions or results change

  if (!quizStarted) {
    return <Modal />;
  }

  return (
    <>
      <Progress className={classes.progress()} />
      {questionPositions.map(({ question, left, top, idx, done }) => {
        return (
          <button
            key={idx + question.question}
            className={classes.dot({ done })}
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
            onClick={() => {
              setQuizStep(quizStep + 1);
              setCurrentQuestionIndex(idx);
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
              <span className={classes.level()}>Level - {idx + 1}</span>
              <span>{question.time_limit_s + " seconden"}</span>
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
