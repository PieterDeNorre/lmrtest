import { tv } from "tailwind-variants";
import { headers } from "../tailwind/global";
import { getQuizData } from "./api/getQuizData";
import { QuestionProvider } from "@/context/questionContext";
import { QuizProvider } from "@/context/quizContext";
import { LevelSelection, QuizStatus } from "@/components";

const classesAppContainer = tv({
  slots: {
    appContainer:
      "fixed h-full w-full bg-blue-dark flex items-center justify-center",
    intro: headers({ size: "md", color: "yellow" }),
    quizContainer: "max-w-[1194px] max-h-[834px] rounded-lg w-full h-full",
  },
});

export default async function Home() {
  const classes = classesAppContainer();

  // Fetch quiz data on server side
  const quizResult = await getQuizData();

  return (
    <QuestionProvider
      initialQuestions={quizResult.success ? quizResult.data : []}
    >
      <QuizProvider time_limit_s={60 * 50}>
        <div className={classes.appContainer()}>
          <QuizStatus />
          <div className={classes.quizContainer()}>
            <LevelSelection />
          </div>
        </div>
      </QuizProvider>
    </QuestionProvider>
  );
}
