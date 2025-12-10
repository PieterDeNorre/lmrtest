"use client";

import { useQuizContext } from "@/context/quizContext";
import { formatTime } from "@/util/time";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import IconsProvider from "./IconProvider";

const classesTimer = tv({
  slots: {
    container:
      "bg-blue-light text-white px-4 py-1 rounded-md flex items-center justify-center shadow-blue-dark gap-3 min-w-28",
    timer: "font-bold text-center text-white",
  },
});

const Timer = () => {
  const classes = classesTimer();

  const {
    timeLimit: initialTimeLimit,
    getCurrentTime,
    subscribeToTimer,
  } = useQuizContext();

  const [currentTime, setCurrentTime] = useState(initialTimeLimit);

  useEffect(() => {
    // Subscribe to timer updates to avoid re-rendering the entire app
    const unsubscribe = subscribeToTimer((time) => {
      setCurrentTime(time);
    });

    // Set initial time
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentTime(getCurrentTime());

    return unsubscribe;
  }, [subscribeToTimer, getCurrentTime]);

  return (
    <div className={classes.container()}>
      <IconsProvider icon="Crono" className="text-white scale-110" />
      <span className={classes.timer()}>{formatTime(currentTime)}</span>
    </div>
  );
};

export default Timer;
