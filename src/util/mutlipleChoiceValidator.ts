import { SelectedAnswer } from "@/components/multipleChoice/questionContainer";
import { Answer } from "@/context/questionsContext";

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

export { MultipleChoiceValidator };
