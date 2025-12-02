"use client";
import { useQuizContext } from "@/context/quizContext";
import { gameContainers } from "../../tailwind/global";
import InfoCorner from "../shared/infoCorner";
import { useQuestionsContext } from "@/context/questionsContext";

export default function MultipleChoice() {
  const { quizStep } = useQuizContext();
  const { questions, currentQuestionIndex } = useQuestionsContext();
  const classes = gameContainers();

  if (quizStep !== 2) return null;
  console.log(questions[currentQuestionIndex]);
  return (
    <div className={classes.grid()}>
      <div className={classes.frame()}>
        <InfoCorner />
      </div>
      <div className={classes.frame()}>test</div>
    </div>
  );
}
