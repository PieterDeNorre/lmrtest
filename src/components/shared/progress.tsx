import { useQuestionsContext } from "@/context/questionsContext";
import { useQuizContext } from "@/context/quizContext";
import { tv } from "tailwind-variants";
import IconsProvider from "./IconProvider";
import { motion } from "framer-motion";

const classesProgress = tv({
  slots: {
    container:
      "relative flex gap-2 items-center justify-center bg-blue-light p-1 shadow-blue-dark rounded-md px-2 w-full max-w-64",
    progressBar: "w-full h-6 bg-blue rounded-sm overflow-hidden",
    progress:
      "relative h-full bg-yellow transition-all duration-500 ease-in-out overflow-hidden",
    hatches:
      "w-3 h-52 bg-yellow-dark/80 rotate-12 -top-26 absolute left-0 animate-slide-right",
    label: "text-white font-bold text-center text-xs flex-0 shrink-0 min-w-10",
  },
  variants: {
    bar: {
      true: {
        progressBar: "w-full h-3 bg-blue rounded-md overflow-hidden max-w-50",
      },
      false: {},
    },
  },
});

const Progress = ({
  className,
  bar = false,
}: {
  className?: string;
  bar?: boolean;
}) => {
  const classes = classesProgress({ bar });
  const { results } = useQuizContext();
  const { questions } = useQuestionsContext();

  if (bar) {
    return (
      <div className={classes.progressBar()}>
        <div
          className={classes.progress()}
          style={{ width: `${(results.length / questions.length) * 100}%` }}
        >
          {Array.from({ length: 20 }, (_, index) => (
            <div
              key={index}
              className={classes.hatches()}
              style={{
                animationDelay: `0s`,
                left: `${index * -25}px`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={classes.container() + " " + className}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
    >
      <div className={classes.progressBar()}>
        <div
          className={classes.progress()}
          style={{ width: `${(results.length / questions.length) * 100}%` }}
        >
          {/* Generate multiple animated hatches */}
          {Array.from({ length: 20 }, (_, index) => (
            <div
              key={index}
              className={classes.hatches()}
              style={{
                animationDelay: `0s`,
                left: `${index * -25}px`,
              }}
            />
          ))}
        </div>
      </div>
      <div className={classes.label()}>
        {results.length} / {questions.length}
      </div>
      <IconsProvider icon="Case" className="text-white scale-150" />
    </motion.div>
  );
};
export default Progress;
