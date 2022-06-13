import { Box, CircularProgress } from "@mui/material";
import examAPI from "api/examAPI";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { STATUS } from "./constant";
import "./exam.scss";
import QuestionDetail from "./QuestionDetail";
import QuestionNavbar from "./QuestionNavbar";

const convertDatas = (datas) => {
  const result = datas?.map((data, idx) => {
    return {
      ...data,
      idx: idx,
      status: STATUS.NORESPONSE,
      curAnswer: -1,
      curAnswerList: Array(4).fill(false),
    };
  });
  return result;
};

const Exam = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState();
  const [questionAmount, setQuestionAmount] = useState(0);
  const [curQuestion, setCurQuestion] = useState("");
  const [curIndexQuestion, setCurIndexQuestion] = useState(0);
  const [nameTest, setNameTest] = useState("");
  const [duration, setDuration] = useState();
  const [minPointToPass, setMinPointToPass] = useState();
  const [startCountDown, setStartCountDown] = useState(false);
  const [exam, setExam] = useState();
  const [isFinish, setIsFinish] = useState(false);
  // const [curQuestionType, setCurQuestionType] = useState();
  const searchQuestionByIdx = (id, questions) => {
    if (questions) {
      for (let question of questions) {
        if (question?.idx == id) {
          setCurQuestion(question);
          // setCurQuestionType(question?.type);
          break;
        }
      }
    }
  };

  // ham luu lai cau tra loi moi khi nguoi dung chon cau tra loi khac
  const saveAnswerOfQuestion = (question, listQuestions) => {
    if (questions) {
      let curQuestions = [...listQuestions];
      curQuestions[question.idx] = question;
      setQuestions(curQuestions);
      console.log("eeeeeeeeeeeeee");
    }
  };

  // call API
  useEffect(() => {
    // getExam(location?.state?.exam);
    const exam = location.state?.exam;
    console.log({ exam });
    setExam(exam);
    const questions = convertDatas(exam.questions);
    setNameTest(exam?.name);
    setDuration(exam?.duration);
    setMinPointToPass(exam?.min_point_to_pass);
    setQuestions(questions);
    setQuestionAmount(questions.length);
    setCurQuestion(questions[0]);
    // startCountDown(countDown);
  }, []);

  // tim cau hoi voi moi lua chon so cau
  useEffect(() => {
    saveAnswerOfQuestion(curQuestion, questions);
    searchQuestionByIdx(curIndexQuestion, questions);
  }, [curIndexQuestion, isFinish]);

  return (
    <Box className='exam__container'>
      <Box className='exam__container--left'>
        <QuestionNavbar
          questionAmount={questionAmount}
          setCurIndexQuestion={setCurIndexQuestion}
          curIndexQuestion={curIndexQuestion}
          curQuestion={curQuestion}
          questions={questions}
        />
      </Box>
      <Box className='exam__container--right' sx={{ height: "100%" }}>
        <QuestionDetail
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
          nameTest={nameTest}
          startCountDown={startCountDown}
          setStartCountDown={setStartCountDown}
          questions={questions}
          duration={location.state?.exam?.duration}
          minPointToPass={minPointToPass}
          questionAmount={questionAmount}
          exam={exam}
          isFinish={isFinish}
          setIsFinish={setIsFinish}
        />
      </Box>
    </Box>
  );
};

export default Exam;
