import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { STATUS } from "pages/Exam/constant";

const ManyCorrectAnswer = ({ curQuestion, setCurQuestion }) => {
  const onClickClearAnswer = () => {
    let data = JSON.parse(JSON.stringify(curQuestion));
    data.status = STATUS.NORESPONSE;
    data.curAnswerList = Array(4).fill(false);
    setCurQuestion(data);
  };

  const onChangeCheckbox = (e, idx) => {
    console.log({ idx });
    checkCorrectAnswer(idx);
  };

  const compareArray = (arrA, arrB) => {
    let isEqual = true;
    if (arrA.length == arrB.length) {
      const lengthArr = arrA.length;
      for (let i = 0; i < lengthArr; i++) {
        if (arrA[i] != arrB[i]) {
          isEqual = false;
          return isEqual;
        }
      }
    }
    return isEqual;
  };

  const checkCorrectAnswer = (idx) => {
    let data = JSON.parse(JSON.stringify(curQuestion));
    // let datas = [...curQuestion.curAnswerList];
    data.curAnswerList[idx] = !data.curAnswerList[idx];
    // console.log({ answer });
    if (compareArray(data.curAnswerList, Array(4).fill(false)))
      data.status = STATUS.NORESPONSE;
    const correctAnswer = curQuestion.answers.map((ans, idx) =>
      ans?.is_correct === true ? true : false
    );
    if (compareArray(correctAnswer, data.curAnswerList)) {
      data.status = STATUS.CORRECT;
    } else {
      data.status = STATUS.INCORRECT;
    }
    setCurQuestion(data);
  };

  const renderAnwserQuestion = (answers) => {
    console.log({ answers });

    return (
      <FormGroup>
        {answers.map((answer, idx) => (
          <FormControlLabel
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                size='small'
                checked={curQuestion?.curAnswerList[idx]}
                onChange={(e) => {
                  onChangeCheckbox(e, idx);
                }}
              />
            }
            label={
              <Typography
                sx={{ display: "inline" }}
                variant='body2'
                fontWeight={400}
              >
                {answer.content}
              </Typography>
            }
          />
        ))}
      </FormGroup>
    );
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component={"div"} className='title__question' variant='h5'>
          {curQuestion?.content}
        </Typography>
        <Button onClick={() => onClickClearAnswer(curQuestion)}>
          Xoá lựa chọn
        </Button>
      </Box>

      <Box className='answer__container'>
        {renderAnwserQuestion(curQuestion?.answers)}
      </Box>
    </>
  );
};

export default ManyCorrectAnswer;
