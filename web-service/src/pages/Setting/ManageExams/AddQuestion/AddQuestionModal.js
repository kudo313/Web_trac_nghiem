import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import MKButton from "components/MKButton";
import TPNotification from "components/TPNotification";
import { QUESTION_TYPE } from "constants/questionType";
import { useState } from "react";
import ManyCorrectAnswer from "./QuestionType/ManyCorrectAnswer";
import OneCorrectAnswer from "./QuestionType/OneCorrectAnswer";
import TrueFalseAnswer from "./QuestionType/TrueFalseAnswer";

const style = {
  bgcolor: "background.paper",
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "348px",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};
const AddQuestionModal = ({ setQuestionList, questionList }) => {
  const [isOpenAddQuestionModal, setIsOpenAddQuestionModal] = useState(false);
  // const [question, setQuestion] = useState('')
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openNoti, setOpenNoti] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState(
    QUESTION_TYPE.ONE_CORRECT_ANSWER
  );

  const renderQuestion = () => {
    if (typeQuestion === QUESTION_TYPE.MANY_CORRECT_ANSWERS)
      return (
        <ManyCorrectAnswer
          typeQuestion={typeQuestion}
          handleCloseAddQuestionModal={handleCloseAddQuestionModal}
          questionList={questionList}
          setQuestionList={setQuestionList}
          setIsOpenAddQuestionModal={setIsOpenAddQuestionModal}
        />
      );
    else if (typeQuestion === QUESTION_TYPE.ONE_CORRECT_ANSWER)
      return (
        <OneCorrectAnswer
          typeQuestion={typeQuestion}
          handleCloseAddQuestionModal={handleCloseAddQuestionModal}
          questionList={questionList}
          setQuestionList={setQuestionList}
          setIsOpenAddQuestionModal={setIsOpenAddQuestionModal}
        />
      );
    else if (typeQuestion === QUESTION_TYPE.TRUE_FALSE_ANSWERS)
      return (
        <TrueFalseAnswer
          typeQuestion={typeQuestion}
          handleCloseAddQuestionModal={handleCloseAddQuestionModal}
          questionList={questionList}
          setQuestionList={setQuestionList}
          setIsOpenAddQuestionModal={setIsOpenAddQuestionModal}
        />
      );
  };

  const handleCloseAddQuestionModal = () => {
    setIsOpenAddQuestionModal(false);
  };

  const handleOpenAddQuestionModal = () => {
    setIsOpenAddQuestionModal(true);
  };

  const handleChangeTypeQuestion = (event) => {
    setTypeQuestion(event.target.value);
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <MKButton
          onClick={handleOpenAddQuestionModal}
          sx={{ border: "2px solid #1A73E8", color: "#1A73E8" }}
        >
          Thêm câu hỏi
        </MKButton>
      </Box>

      <Modal
        hideBackdrop
        open={isOpenAddQuestionModal}
        onClose={handleCloseAddQuestionModal}
        sx={{
          display: "flex",
          alignItems: "Center",
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box
            display='flex'
            alginItems='center'
            justifyContent='space-between'
            sx={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}
          >
            <Typography id='modal-modal-title' variant='h5'>
              Thêm câu hỏi
            </Typography>
            <CloseIcon
              fontSize='medium'
              sx={{ cursor: "pointer" }}
              onClick={handleCloseAddQuestionModal}
            />
          </Box>
          <Divider />
          <Box sx={{ margin: 2 }}>
            {" "}
            <FormControl variant='standard' fullWidth>
              <InputLabel id='type-question'>Loại câu hỏi</InputLabel>
              <Select
                labelId='type-question'
                id='type-question'
                value={typeQuestion}
                label='Loại câu hỏi'
                onChange={handleChangeTypeQuestion}
                sx={{ height: 30 }}
              >
                <MenuItem value={QUESTION_TYPE.ONE_CORRECT_ANSWER}>
                  Câu hỏi có một đáp án
                </MenuItem>
                <MenuItem value={QUESTION_TYPE.TRUE_FALSE_ANSWERS}>
                  Câu hỏi đúng sai
                </MenuItem>
                <MenuItem value={QUESTION_TYPE.MANY_CORRECT_ANSWERS}>
                  Câu hỏi có nhiều đáp án
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ margin: 2 }}>{renderQuestion()}</Box>
        </Box>
      </Modal>
      <TPNotification
        type={notification.type}
        message={notification.message}
        open={openNoti}
        setOpen={setOpenNoti}
      />
    </>
  );
};

export default AddQuestionModal;
