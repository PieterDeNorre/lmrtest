"use client";
import { useQuizContext } from "@/context/quizContext";
import { headers } from "@/tailwind/global";
import { tv } from "tailwind-variants";
import Btn from "./btn";
import IconsProvider from "./IconProvider";
import { useQuestionsContext } from "@/context/questionsContext";
import { infoCornerQuestion, overview } from "@/mock/flavour";
import { motion } from "framer-motion";
import { MultipleChoiceScore } from "@/util/mutlipleChoiceCheck";
import Progress from "./progress";
import Image from "next/image";

const classesOverview = tv({
  slots: {
    container: [
      "relative flex flex-col gap-3 bg-white w-full h-full rounded-lg p-10 flex flex-col items-center justify-center",
    ],
    header: "mb-6 text-center flex flex-col gap-3",
    title: headers({ size: "3xl", color: "blue" }) + " font-bold",
    text: headers({ size: "base", color: "blue" }) + " text-center",
    list: "h-full w-full overflow-y-auto",
    grid: "grid grid-cols-2 gap-5 w-full h-auto grid grid-cols-2 px-16",
  },
});

const classesResultItem = tv({
  slots: {
    container:
      "w-full text-left rounded-md p-4 bg-blue-lighter h-auto flex gap-4 items-center",
    image:
      "h-36 w-36 bg-blue-light rounded-md aspect-square relative [&_img]:object-cover [&_img]:rounded-md",
    text:
      headers({ size: "base", color: "blue" }) + " flex flex-col gap-5 w-full",
    title: headers({ size: "2xl", color: "blue" }) + " font-semibold w-full",
  },
});

const Overview = () => {
  const { quizStep, results, setQuizStep } = useQuizContext();
  const { setCurrentQuestionIndex, questions } = useQuestionsContext();

  const classes = classesOverview();
  const resultClasses = classesResultItem();

  if (quizStep === 3)
    return (
      <motion.div
        className={classes.container()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0,
          damping: 10,
          stiffness: 100,
        }}
      >
        <div className={classes.header()}>
          <h2 className={classes.title()}>{overview[0].title}</h2>
          <p className={classes.text()}>{overview[0].text}</p>
        </div>
        <div className={classes.list()}>
          <div className={classes.grid()}>
            {results.map((result, index) => {
              const score = MultipleChoiceScore({
                answerList: questions[result.index].answers || [],
                selectedAnswers: result.selectedAnswers || [],
              });

              return (
                <div key={index} className={resultClasses.container()}>
                  <div className={resultClasses.image()}>
                    <Image
                      src={infoCornerQuestion[index].image}
                      alt={infoCornerQuestion[index].title}
                      fill
                    />
                  </div>
                  <div className={resultClasses.text()}>
                    <h3 className={resultClasses.title()}>
                      {infoCornerQuestion[index].title}
                    </h3>
                    <Progress
                      overview
                      total={score.amountQuestions}
                      label={score.percentage}
                      score={score.score}
                    />
                    <Btn
                      variant="tertiary"
                      label="Bekijk je resultaat"
                      disabled
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Btn
          variant="primary"
          square
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
          circle
          action={() => {
            setQuizStep(1);
            setCurrentQuestionIndex(0);
          }}
        >
          <IconsProvider icon="Cross" className="text-blue-dark h-6 w-6 " />
        </Btn>
      </motion.div>
    );
};

export default Overview;
