import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import MKButton from "components/MKButton";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const yupSchema = yup.object().shape({
  content: yup.string().required("Trường này bắt buộc!"),
  ans0: yup.string().required("Trường này bắt buộc!"),
  ans1: yup.string().required("Trường này bắt buộc!"),
  correctAnswerIndex: yup.string().required("Cần chọn một câu trả lời đúng!"),
});

export const TrueFalseAnswer = ({
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
    defaultValues: {
      correctAnswerList: Array(4).fill(false),
      ans0: "Đúng",
      ans1: "Sai",
    },
  });

  const onSubmit = (data) => {
    const newQuestion = {
      content: data.content,
      type: typeQuestion,
      url_file: "",
      correctAnswerIndex: data.correctAnswerIndex,
      correctAnswerList: data.correctAnswerList,
      answers: handleAnwsers([data.ans0, data.ans1]),
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
                <Box>
                  <FormControlLabel
                    value='0'
                    control={<Radio />}
                    label='Đúng'
                    sx={{ padding: 0, display: "flex" }}
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    value='1'
                    control={<Radio />}
                    label='Sai'
                    sx={{ padding: 0, display: "flex" }}
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

export default TrueFalseAnswer;
