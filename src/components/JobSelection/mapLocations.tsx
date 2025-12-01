/* eslint-disable react-hooks/purity */
"use client";

import { useQuestionsContext, Question } from "@/context/questionsContext";
import { tv } from "tailwind-variants";
import { useMemo } from "react";

const classesMapLocations = tv({
  slots: {
    dot: "absolute w-14 h-14 rounded-full bg-blue-dark text-white cursor-pointer hover:bg-blue-light transition z-10 group",
    icon: "flex items-center justify-center w-full h-full",
    hover:
      "p-2 bg-white text-blue-dark rounded-md text-sm font-semibold absolute top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition w-max max-w-xs",
  },
});

export default function MapLocations() {
  const { questions } = useQuestionsContext();
  const classes = classesMapLocations();

  // Generate stable positions that don't change on re-renders
  const questionPositions = useMemo(() => {
    return questions.map((question, index) => ({
      question,
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      // Use question content as seed for consistency
      id: question.question + index,
    }));
  }, [questions]); // Only recalculate when questions change

  return (
    <>
      {questionPositions.map(({ question, left, top, id }) => (
        <button
          key={id}
          className={classes.dot()}
          style={{
            left: `${left}%`,
            top: `${top}%`,
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
          <div className={classes.hover()}>{question.question}</div>
        </button>
      ))}
    </>
  );
}
