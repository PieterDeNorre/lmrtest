import { useQuestionsContext } from "@/context/questionsContext";
import { useQuizContext } from "@/context/quizContext";
import { tv } from "tailwind-variants";
import IconsProvider from "./IconProvider";

const classesProgress = tv({
  slots: {
    container:
      "relative flex gap-2 items-center justify-center bg-blue-light p-2 shadow-blue-dark rounded-md px-3 w-full max-w-64",
    progressBar: "w-full h-4 bg-blue rounded-sm overflow-hidden",
    progress: "h-full bg-yellow transition-all duration-500 ease-in-out",
    label: "text-white font-bold text-center text-xs flex-0 shrink-0 min-w-10",
  },
});

const Progress = ({
  className,
  bar = false,
}: {
  className?: string;
  bar?: boolean;
}) => {
  const classes = classesProgress();
  const { results } = useQuizContext();
  const { questions } = useQuestionsContext();
  if (bar) {
    return (
      <div className={classes.progressBar()}>
        <div
          className={classes.progress()}
          style={{ width: `${(results.length / questions.length) * 100}%` }}
        />
      </div>
    );
  }

  return (
    <div className={classes.container() + " " + className}>
      <div className={classes.progressBar()}>
        <div
          className={classes.progress()}
          style={{ width: `${(results.length / questions.length) * 100}%` }}
        />
      </div>
      <div className={classes.label()}>
        {results.length} / {questions.length}
      </div>
      <IconsProvider icon="Case" className="text-white scale-150" />
    </div>
  );
};
export default Progress;
