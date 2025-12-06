"use client";
import { headers } from "@/tailwind/global";
import { tv } from "tailwind-variants";
import { IconsProvider, LevelOption } from "@/components";
import { useQuizContext } from "@/context/quizContext";
import { levels, intro } from "@/mock/flavour";
import parse from "html-react-parser";
import { motion } from "framer-motion";

const levelSelectionContainer = tv({
  slots: {
    section: [
      "p-4 w-full h-full flex flex-col items-center justify-center gap-6 rounded-lg",
    ],
    title: [
      headers({ size: "6xl", color: "white" }) + " text-center font-bold",
    ],
    intro: [
      headers({ size: "base", color: "white" }) + " text-center w-[562px]",
    ],
    levelList: ["flex flex gap-10"],
    logo: ["text-white object-contain "],
  },
});

export default function LevelSelection() {
  const classes = levelSelectionContainer();
  const { setLevel, quizStep, setQuizStep } = useQuizContext();

  if (quizStep !== 0) return null;
  // Placeholder for levels data
  return (
    <div className={classes.section()}>
      <motion.h2
        className={classes.title()}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          damping: 10,
          stiffness: 100,
        }}
      >
        {intro.title}
      </motion.h2>
      <motion.p
        className={classes.intro()}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          damping: 10,
          stiffness: 100,
        }}
      >
        {parse(intro.description)}
      </motion.p>
      <motion.div
        className={classes.levelList()}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0, 0.2, 1.01],
          damping: 10,
          stiffness: 100,
        }}
      >
        {levels &&
          levels.map((level, index) => (
            <LevelOption
              {...level}
              key={level.level + `-${index}`}
              levelIdx={index as 0 | 1 | 2}
              action={() => {
                setLevel(level.level);
                setQuizStep(1);
              }}
            />
          ))}
      </motion.div>
      <motion.div
        className={classes.logo()}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1,
          damping: 10,
          stiffness: 100,
        }}
      >
        <IconsProvider icon={"Vdab"} className="w-72 h-auto" />
      </motion.div>
    </div>
  );
}
