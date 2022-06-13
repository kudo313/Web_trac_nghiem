import { MENUBAR, STATUS } from "../constant";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const QuestionNavbar = ({
  questionAmount,
  curIndexQuestion,
  setCurIndexQuestion,
  questions,
  curQuestion,
}) => {
  useEffect(() => {
    for (let i = 0; i < questionAmount; i++) {
      //add style cho nhung cau da tra loi
      if (questions) {
        if (questions[i]?.status !== STATUS.NORESPONSE) addStyleResponsed(i);
        else removeStyleResponsed(i);
      }

      //add style cho cau dang tra loi
      if (i === curIndexQuestion) {
        addStyleActive(i);
      } else {
        removeStyleActive(i);
      }
    }
  }, [curQuestion]);

  const renderQuestionContainer = () => {
    let result = [];
    for (let i = 0; i < questionAmount; i++) {
      if (i === 0) {
        result.push(
          <Button
            key={i}
            id={i}
            onClick={onClickButtonQuestion}
            className='active'
          >
            {i + 1}
          </Button>
        );
      } else
        result.push(
          <Button key={i} id={i} onClick={onClickButtonQuestion}>
            {i + 1}
          </Button>
        );
    }
    return result;
  };

  const onClickButtonQuestion = (e) => {
    const idx = e.target.id;
    setCurIndexQuestion(parseInt(idx));
  };

  const addStyleActive = (id) => {
    document.getElementById(id).classList.add("active");
  };

  const removeStyleActive = (id) => {
    document.getElementById(id).classList.remove("active");
  };

  const addStyleResponsed = (id) => {
    document.getElementById(id)?.classList.add("responsed");
  };

  const removeStyleResponsed = (id) => {
    document.getElementById(id)?.classList.remove("responsed");
  };

  return (
    <Box>
      <Typography
        className='title__box'
        component='div'
        variant='h5'
        textAlign={"center"}
      >
        Chọn câu hỏi
      </Typography>
      <Typography
        variant='subtitle2'
        sx={{ opacity: "0.6", margin: 2, fontSize: 13 }}
        fontWeight={""}
        color='info'
      >
        <i>
          Chào mừng các bạn đến với bài thi.
          <br style={{ marginTop: "8px" }} />
          Hãy thật bình tĩnh và cố gắng để giành được kết quả cao nhất.
          <br />
          Đừng quên kiểm tra kĩ bài làm trước khi nộp bài nhé!
        </i>
      </Typography>
      <Box className='select-question__box'>
        <Box className='select-question'>{renderQuestionContainer()}</Box>
      </Box>
    </Box>
  );
};

export default QuestionNavbar;
