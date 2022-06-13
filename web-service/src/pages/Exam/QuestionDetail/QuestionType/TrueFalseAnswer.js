import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { STATUS } from "pages/Exam/constant";

const TrueFalseAnswer = ({ curQuestion, setCurQuestion }) => {
  const onClickClearAnswer = () => {
    let data = JSON.parse(JSON.stringify(curQuestion));
    data.status = STATUS.NORESPONSE;
    data.curAnswer = -1;
    setCurQuestion(data);
  };

  const onChangeRadioGroup = (e) => {
    const value = e.target.value;
    checkCorrectAnswer(value);
  };

  const checkCorrectAnswer = (answer) => {
    let data = JSON.parse(JSON.stringify(curQuestion));

    data.curAnswer = answer;
    if (data?.curAnswer != -1) {
      const indexAnswerCorrect = data?.answers?.findIndex(
        (answer) => answer?.is_correct == true
      );
      if (data?.curAnswer == indexAnswerCorrect) {
        data.status = STATUS.CORRECT;
      } else {
        data.status = STATUS.INCORRECT;
      }
      setCurQuestion(data);
    }
  };

  const renderAnwserQuestion = (answers) => {
    console.log({ answers });

    return (
      <FormControl>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          defaultValue=''
          onChange={onChangeRadioGroup}
          value={curQuestion.curAnswer}
        >
          {answers?.map((answer, idx) => (
            <FormControlLabel
              value={idx}
              key={idx}
              label={answer.content}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
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

export default TrueFalseAnswer;
