import { useQuizContext } from "@/context/quizContext";
import { formatTime } from "@/util/time";
import { tv } from "tailwind-variants";

type TimerProps = {
  type: " question" | "quiz";
};
const classesTimer = tv({
  slots: {
    container:
      "absolute top-2 left-2 bg-blue-light text-white px-4 py-1 rounded-md flex items-center justify-center shadow-blue-dark gap-2",
    timer: "font-bold text-center",
  },
});
const Timer = ({ type }: TimerProps) => {
  const classes = classesTimer();
  const { timeLimit } = useQuizContext();
  return (
    <div className={classes.container()}>
      <svg
        width="11"
        height="13"
        viewBox="0 0 11 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5625 7.71875C10.5625 6.67773 10.2324 5.6875 9.69922 4.84961H9.72461L10.4609 4.08789C10.5879 3.98633 10.5879 3.7832 10.4609 3.65625L9.75 2.94531C9.62305 2.81836 9.41992 2.81836 9.31836 2.94531L8.60742 3.65625C7.89648 3.07227 7.0332 2.66602 6.09375 2.51367V1.625H6.80469C6.95703 1.625 7.10938 1.49805 7.10938 1.32031V0.304688C7.10938 0.152344 6.95703 0 6.80469 0H3.75781C3.58008 0 3.45312 0.152344 3.45312 0.304688V1.32031C3.45312 1.49805 3.58008 1.625 3.75781 1.625H4.46875V2.51367C1.92969 2.89453 0 5.07812 0 7.71875C0 10.6387 2.36133 13 5.28125 13C8.17578 13 10.5625 10.6387 10.5625 7.71875ZM6.09375 8.63281C6.09375 8.81055 5.94141 8.9375 5.78906 8.9375H4.77344C4.5957 8.9375 4.46875 8.81055 4.46875 8.63281V4.79883C4.46875 4.62109 4.5957 4.49414 4.77344 4.49414H5.78906C5.94141 4.49414 6.09375 4.62109 6.09375 4.79883V8.63281Z"
          fill="white"
        />
      </svg>

      {type === "quiz" && (
        <span className={classes.timer()}>{formatTime(timeLimit)}</span>
      )}
    </div>
  );
};

export default Timer;
