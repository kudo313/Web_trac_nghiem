import { Box, Typography } from "@mui/material";
import { QUESTION_TYPE } from "constants/questionType";
import { useEffect, useState } from "react";
import { convertSecondToTime } from "../../../utils/convert";
import ResultModal from "../ResultModal";
import ManyCorrectAnswer from "./QuestionType/ManyCorrectAnswer";
import OneCorrectAnswer from "./QuestionType/OneCorrectAnswer";
import TrueFalseAnswer from "./QuestionType/TrueFalseAnswer";

const QuestionDetail = ({
  curQuestion,
  setCurQuestion,
  nameTest,
  questions,
  duration,
  minPointToPass,
  questionAmount,
  isFinish,
  setIsFinish,
  exam,
}) => {
  console.log({ curQuestion });
  console.log({ questions });
  const [showModalResult, setShowModalResult] = useState(false);
  const [countDown, setCountDown] = useState(duration);
  const [time, setTime] = useState("00:00");
  // const [isFinish, setIsFinish] = useState(false);

  // useEffect(() => {
  //   if (duration) setCountDown(duration);
  // }, []);

  useEffect(() => {
    console.log({ countDown });
    if (!isFinish) {
      if (countDown < 0) {
        setTime("00:00");
        setIsFinish(true);
      } else {
        setTimeout(() => {
          const time = convertSecondToTime(countDown);
          setTime(`${time.minutes}:${time.seconds}`);
          setCountDown(countDown - 1);
        }, 1000);
        return;
      }
    }
  }, [countDown]);

  useEffect(() => {
    if (isFinish) {
      setShowModalResult(true);
    }
  }, [questions]);

  const renderQuestion = () => {
    if (curQuestion.type === QUESTION_TYPE.MANY_CORRECT_ANSWERS)
      return (
        <ManyCorrectAnswer
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
        />
      );
    else if (curQuestion.type === QUESTION_TYPE.ONE_CORRECT_ANSWER)
      return (
        <OneCorrectAnswer
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
        />
      );
    else if (curQuestion.type === QUESTION_TYPE.TRUE_FALSE_ANSWERS)
      return (
        <TrueFalseAnswer
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
        />
      );
  };

  return (
    <Box>
      <Box className='detail__exam'>
        <Typography component={"div"} variant='h5' className='name__test'>
          {nameTest ? nameTest : ""}
        </Typography>
        <Typography
          component={"div"}
          variant='h5'
          className='countdown__oclock'
        >
          Thời gian: {time}
        </Typography>

        <ResultModal
          showModalResult={showModalResult}
          setShowModalResult={setShowModalResult}
          questions={questions}
          questionAmount={questionAmount}
          minPointToPass={minPointToPass}
          isFinish={isFinish}
          setIsFinish={setIsFinish}
          exam={exam}
          countDown={countDown}
          duration={duration}
        />
      </Box>
      {/* ádfádfádfsadfads */}
      {renderQuestion()}
    </Box>
  );
};

export default QuestionDetail;
