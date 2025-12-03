"use client";
import { headers } from "@/tailwind/global";
import { tv } from "tailwind-variants";
import { IconsProvider, LevelOption } from "@/components";
import { useQuizContext } from "@/context/quizContext";
import { levels, intro } from "@/mock/flavour";
import parse from "html-react-parser";

const levelSelectionContainer = tv({
  slots: {
    section:
      "p-4 w-full h-full flex flex-col items-center justify-center gap-5 rounded-lg",
    title: headers({ size: "6xl", color: "white" }) + " text-center font-bold",
    intro: headers({ size: "base", color: "white" }) + " text-center w-[562px]",
    levelList: "flex flex gap-10",
    logo: "text-white object-contain ",
  },
});

export default function LevelSelection() {
  const classes = levelSelectionContainer();
  const { setLevel, quizStep, setQuizStep } = useQuizContext();

  if (quizStep !== 0) return null;
  // Placeholder for levels data
  return (
    <div className={classes.section()}>
      <h2 className={classes.title()}>{intro.title}</h2>
      <p className={classes.intro()}>{parse(intro.description)}</p>
      <div className={classes.levelList()}>
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
      </div>
      <div className={classes.logo()}>
        <IconsProvider icon={"Vdab"} className="w-72 h-auto" />
      </div>
    </div>
  );
}
