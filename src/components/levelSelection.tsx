"use client";
import { headers } from "@/tailwind/global";
import { tv } from "tailwind-variants";
import { LevelOption } from "@/components";
import { useQuizContext } from "@/context/quizContext";

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
  const { setLevel, startTimer } = useQuizContext();
  const levels = [
    {
      avatar: "one",
      level: "Light",
      description:
        "Voor leerlingen van 10 tot 12 jaar op zoek om eens te proeven van een job-ervaring in verschillende sectoren. Vol spelplezier en handige tips.Voor wie net begint.",
    },
    {
      avatar: "two",
      level: "Casual",
      description:
        "Voor spelers zonder technische achtergrond. Fijn spelplezier met een medium moeilijkheidsgraad en veel helpvolle tips.",
    },
    {
      avatar: "three",
      level: "Expert",
      description:
        "Voor de meest ervaren spelers met technische knowhow. Uitgedaagd om hun kennis te testen met steeds moeilijkere puzzels en een minimum aan hulp.",
    },
  ]; // Placeholder for levels data
  return (
    <div className={classes.section()}>
      <h2 className={classes.title()}>Kies je niveau!</h2>
      <p className={classes.intro()}>
        Welkom in Kansstad: <br />
        Een virtueel spel waarin je nieuwe kennis kan opdoen rond heel wat
        interessante beroepen. Begin er meteen aan. Aangeboden door VDAB.
      </p>
      <div className={classes.levelList()}>
        {levels &&
          levels.map((level, index) => (
            <LevelOption
              {...level}
              key={level.level + `-${index}`}
              levelIdx={index as 0 | 1 | 2}
              action={() => {
                setLevel(level.level);
                startTimer();
              }}
            />
          ))}
      </div>
      <div className={classes.logo()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 569.13 341.05"
          className="w-72 h-auto"
        >
          <polygon
            points="161.46 113.34 178.74 113.34 195.7 162.57 212.66 113.34 229.94 113.34 205.57 184.09 185.77 184.09 161.46 113.34"
            fill="currentColor"
          />
          <path
            d="M1363.17,1496.8v39.88h6.88c8.58,0,14.54-2.89,18.41-6.81a19.16,19.16,0,0,0,5.47-13.21,18.3,18.3,0,0,0-6.55-13.63c-4.24-3.71-10.41-6.23-18.14-6.23Zm-16.42,55.28v-70.74h25.81c11.55,0,20.94,4,27.49,10.37a34.36,34.36,0,0,1,10.14,24.89,36.75,36.75,0,0,1-4,17,32.48,32.48,0,0,1-12.23,13.19,40,40,0,0,1-20.77,5.31Z"
            transform="translate(-1118 -1368)"
            fill="currentColor"
          />
          <path
            d="M1432.09,1524.07h18.25l-9.11-26.61Zm23.62,15.41h-28.92l-4.36,12.6H1405.1l24.31-70.72h23.94l24.36,70.72h-17.64Z"
            transform="translate(-1118 -1368)"
            fill="currentColor"
          />
          <path
            d="M1492.52,1522.67v17.77c6.81,0,12-.16,15.4-1.34s5.21-3.28,5.21-7.3-1.62-6.23-4.79-7.51-7.77-1.62-13.62-1.62Zm0-29.68v16.42c6.22,0,10.46,0,13.25-1.06s3.87-2.9,3.87-6.71c0-4-1.24-6.18-4-7.36s-6.92-1.29-12.88-1.29Zm-16.43,59.09v-70.74h21a54.78,54.78,0,0,1,12.89,1.36c4.13,1.06,8,2.73,10.68,5.51s4.46,6.67,4.46,12a16.79,16.79,0,0,1-2.37,9,19.32,19.32,0,0,1-5.32,5.69c7.36,3,10.95,8.21,10.95,16.64,0,6.38-2,10.79-5.36,13.79s-8.16,4.78-13.69,5.69a113.42,113.42,0,0,1-18.14,1.12Z"
            transform="translate(-1118 -1368)"
            fill="currentColor"
          />
          <rect
            x="230.51"
            y="199.32"
            width="122.24"
            height="10.08"
            fill="currentColor"
          />
          <rect
            x="230.51"
            y="88.04"
            width="122.24"
            height="10.07"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
