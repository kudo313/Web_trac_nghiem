import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { QUESTION_TYPE } from "constants/questionType";
import { isEmpty } from "lodash";

const yupSchema = yup.object().shape({
  content: yup.string().required("Trường này bắt buộc!"),
  ans0: yup.string().required("Trường này bắt buộc!"),
  ans1: yup.string().required("Trường này bắt buộc!"),
  ans2: yup.string().required("Trường này bắt buộc!"),
  ans3: yup.string().required("Trường này bắt buộc!"),
  correctAnswerIndex: yup.string().required("Cần chọn một câu trả lời đúng!"),
});

export const OneCorrectAnswer = ({
  typeQuestion,
  questionList,
  setQuestionList,
  setIsOpenAddQuestionModal,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: { correctAnswerList: Array(4).fill(false) },
  });

  const onSubmit = (data) => {
    const newQuestion = {
      content: data.content,
      type: typeQuestion,
      url_file: "",
      correctAnswerIndex: data.correctAnswerIndex,
      correctAnswerList: data.correctAnswerList,
      answers: handleAnwsers([data.ans0, data.ans1, data.ans2, data.ans3]),
    };
    setQuestionList([...questionList, newQuestion]);
    // setNotification({
    //   message: "Thêm câu hỏi thành công!",
    //   type: NOTIFICATION.SUCCESS,
    // });
    // setOpenNoti(true);
    // setIsOpenAddQuestionModal(false);
    setIsOpenAddQuestionModal(false);
    reset({});
    // setValue();
  };

  const handleCloseAddQuestionModal = () => {
    setIsOpenAddQuestionModal(false);
  };

  const handleAnwsers = (answerList) => {
    const correctAnswerIndex = getValues("correctAnswerIndex");

    let answers = [];
    for (let i = 0; i < answerList.length; i++) {
      let answer = {
        content: answerList[i],
        is_correct: correctAnswerIndex == i ? true : false,
        url_file: null,
      };
      answers.push(answer);
    }
    return answers;
  };

  return (
    <Box className='answer-type-many-correct-answer__section'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='content'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                id='standard-basic'
                label='Câu hỏi'
                sx={{ width: "100%", marginBottom: 3 }}
                variant='standard'
                helperText={
                  <Typography variant='caption' color='error'>
                    {errors.content?.message}
                  </Typography>
                }
                {...field}
              />
            );
          }}
        />

        <Controller
          control={control}
          name='correctAnswerIndex'
          render={({ field }) => {
            return (
              <RadioGroup {...field}>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='0'
                    control={<Radio />}
                    label=''
                    sx={{ width: 32, height: 32, padding: 0 }}
                  />
                  <Controller
                    name='ans0'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          id='standard-basic'
                          label='Câu trả lời thứ nhất'
                          sx={{ width: "100%" }}
                          helperText={
                            <Typography variant='caption' color='error'>
                              {" "}
                              {errors.ans0?.message}
                            </Typography>
                          }
                          variant='standard'
                          {...field}
                        />
                      );
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='1'
                    control={<Radio />}
                    label=''
                    sx={{ width: 32, height: 32, padding: 0 }}
                  />
                  <Controller
                    name='ans1'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          id='standard-basic'
                          label='Câu trả lời thứ hai'
                          helperText={
                            <Typography variant='caption' color='error'>
                              {" "}
                              {errors.ans1?.message}
                            </Typography>
                          }
                          sx={{ width: "100%" }}
                          variant='standard'
                          {...field}
                        />
                      );
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='2'
                    control={<Radio />}
                    label=''
                    sx={{ width: 32, height: 32, padding: 0 }}
                  />
                  <Controller
                    name='ans2'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          id='standard-basic'
                          label='Câu trả lời thứ ba'
                          helperText={
                            <Typography variant='caption' color='error'>
                              {" "}
                              {errors.ans2?.message}
                            </Typography>
                          }
                          sx={{ width: "100%" }}
                          variant='standard'
                          {...field}
                        />
                      );
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='3'
                    control={<Radio />}
                    label=''
                    sx={{ width: 32, height: 32, padding: 0 }}
                  />
                  <Controller
                    name='ans3'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          id='standard-basic'
                          label='Câu trả lời thứ tư'
                          helperText={
                            <Typography variant='caption' color='error'>
                              {" "}
                              {errors.ans3?.message}
                            </Typography>
                          }
                          sx={{ width: "100%" }}
                          variant='standard'
                          {...field}
                        />
                      );
                    }}
                  />
                </Box>
              </RadioGroup>
            );
          }}
        />
        <Typography variant='caption' color='error'>
          {errors.correctAnswerIndex?.message}
        </Typography>
        <Box display='flex' justifyContent='right' sx={{ margin: 2 }}>
          <MKButton
            variant='gradient'
            color='dark'
            onClick={handleCloseAddQuestionModal}
            sx={{ marginRight: 2 }}
          >
            Đóng
          </MKButton>
          <MKButton type='submit' color='info'>
            Lưu
          </MKButton>
        </Box>
      </form>
    </Box>
  );
};

export default OneCorrectAnswer;
