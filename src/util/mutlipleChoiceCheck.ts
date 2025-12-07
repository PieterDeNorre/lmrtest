import { SelectedAnswer } from "@/components/multipleChoice/questionContainer";
import { Answer } from "@/context/questionsContext";

type ValidationResult = {
  score: number;
  percentage: number;
  amountQuestions: number;
};

const MultipleChoiceValidator = ({
  answerList,
  selectedAnswers,
}: {
  answerList: Answer[];
  selectedAnswers: SelectedAnswer[];
}) => {
  const correctAnswers = [];
  for (let i = 0; i < answerList.length; i++) {
    if (answerList[i].correct) {
      correctAnswers.push(i);
    }
  }
  const selectedAnswerIndices = selectedAnswers.map((ans) => ans.idx);

  if (correctAnswers.length !== selectedAnswerIndices.length) {
    return false;
  }

  for (let i = 0; i < correctAnswers.length; i++) {
    if (!selectedAnswerIndices.includes(correctAnswers[i])) {
      return false;
    }
  }
  return true;
};

const MultipleChoiceScore = ({
  answerList,
  selectedAnswers,
}: {
  answerList: Answer[];
  selectedAnswers: SelectedAnswer[];
}): ValidationResult => {
  let score = answerList.length;
  answerList.map((answer, idx) => {
    if (!answer.correct && selectedAnswers.find((sel) => sel.idx === idx))
      score = score - 1;
    if (answer.correct && !selectedAnswers.find((sel) => sel.idx === idx))
      score = score - 1;
  });
  return {
    score,
    percentage: Math.max(0, Math.round((score / answerList.length) * 100)),
    amountQuestions: answerList.length,
  };
};

export { MultipleChoiceValidator, MultipleChoiceScore };
