import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import MKButton from "components/MKButton";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const yupSchema = yup.object().shape({
  content: yup.string().required("Trường này bắt buộc!"),
  ans0: yup.string().required("Trường này bắt buộc!"),
  ans1: yup.string().required("Trường này bắt buộc!"),
  ans2: yup.string().required("Trường này bắt buộc!"),
  ans3: yup.string().required("Trường này bắt buộc!"),
  correctAnswerList: yup
    .array()
    .min(2, "Cần chọn ít nhất hai câu trả lời đúng"),
});

export const ManyCorrectAnswer = ({
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
    defaultValues: { correctAnswerList: [] },
  });

  const [stateCheckBoxList, setStateCheckBoxList] = useState(
    Array(4).fill(false)
  );

  const onChangeCheckbox = (idx) => {
    let datas = [...stateCheckBoxList];
    datas[idx] = !datas[idx];
    setStateCheckBoxList(datas);

    setValue(
      "correctAnswerList",
      datas
        .map((data, idx) => {
          if (data === true) return true;
        })
        .filter((data) => {
          return data !== undefined;
        })
    );
  };

  const onSubmit = (data) => {
    const newQuestion = {
      content: data.content,
      type: typeQuestion,
      url_file: "",
      correctAnswerIndex: "",
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
    setStateCheckBoxList(Array(4).fill(false));
    // setValue();
  };

  const handleCloseAddQuestionModal = () => {
    setIsOpenAddQuestionModal(false);
  };

  const handleAnwsers = (answerList) => {
    // const correctAnswerList = getValues("correctAnswerList");
    // console.log({ correctAnswerList });

    let answers = [];
    for (let i = 0; i < answerList.length; i++) {
      let answer = {
        content: answerList[i],
        is_correct: stateCheckBoxList[i] === true ? true : false,
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

        <FormGroup>
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
              width: "100%",
            }}
            control={
              <Checkbox
                checked={stateCheckBoxList[0]}
                onChange={() => {
                  onChangeCheckbox(0);
                }}
              />
            }
            label={
              <Controller
                name='ans0'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ nhất'
                      autoComplete={false}
                      helperText={
                        <Typography variant='caption' color='error'>
                          {errors.ans0?.message}
                        </Typography>
                      }
                      sx={{ width: "100%", marginBottom: 1, flex: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                checked={stateCheckBoxList[1]}
                onChange={() => {
                  onChangeCheckbox(1);
                }}
              />
            }
            label={
              <Controller
                name='ans1'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ hai'
                      autoComplete={false}
                      helperText={
                        <Typography variant='caption' color='error'>
                          {errors.ans1?.message}
                        </Typography>
                      }
                      sx={{ width: "100%", marginBottom: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                checked={stateCheckBoxList[2]}
                onChange={() => {
                  onChangeCheckbox(2);
                }}
              />
            }
            label={
              <Controller
                name='ans2'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ ba'
                      autoComplete={false}
                      helperText={
                        <Typography variant='caption' color='error'>
                          {errors.ans2?.message}
                        </Typography>
                      }
                      sx={{ width: "100%", marginBottom: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                checked={stateCheckBoxList[3]}
                onChange={() => {
                  onChangeCheckbox(3);
                }}
              />
            }
            label={
              <Controller
                name='ans3'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ tư'
                      autoComplete={false}
                      helperText={
                        <Typography variant='caption' color='error'>
                          {errors.ans3?.message}
                        </Typography>
                      }
                      sx={{ width: "100%", marginBottom: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
        </FormGroup>

        <Typography variant='caption' color='error'>
          {errors.correctAnswerList?.message}
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

export default ManyCorrectAnswer;
