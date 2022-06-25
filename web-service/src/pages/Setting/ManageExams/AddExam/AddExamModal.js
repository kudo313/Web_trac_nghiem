import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import examAPI from "api/examAPI";
import otherAPI from "api/otherAPI";
import MKButton from "components/MKButton";
import TPNotification from "components/TPNotification";
import TPUploadImage from "components/TPUploadImage";
import { NOTIFICATION } from "constants/notification";
import { QUESTION_TYPE } from "constants/questionType";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import "./AddExamModal.scss";
import AddQuestionModal from "../AddQuestion/";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const style = {
  bgcolor: "background.paper",
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  maxWidth: "700px",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};

const initExam = {
  name: "",
  minCorrectAnswers: null,
  duration: null,
  require_rooms: ["AI"],
  questions: [],
};

const yupSchema = yup.object().shape({
  name: yup.string().required("Trường này bắt buộc!"),
  duration: yup
    .number()
    .required("Trường này bắt buộc!")
    .integer("Cần nhập số nguyên!")
    .min(0, "Cần nhập số nguyên dương!"),
  minCorrectAnswers: yup
    .number()
    .required("Trường này bắt buộc!")
    .integer("Cần nhập số nguyên!")
    .min(0, "Cần nhập số nguyên dương!"),
});

const AddExamModal = ({ loading, setLoading }) => {
  const [isOpenAddExamModal, setIsOpenAddExamModal] = useState(false);
  const [exam, setExam] = useState(initExam);
  const [questionList, setQuestionList] = useState([]);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openNoti, setOpenNoti] = useState(false);
  const [img, setImg] = useState();
  const [allRooms, setAllRooms] = useState();
  const [roomList, setRoomList] = useState([]);

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    console.log({ value });

    setRoomList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCloseAddExamModal = () => {
    setIsOpenAddExamModal(false);
  };

  const handleOpenAddExamModal = () => {
    setIsOpenAddExamModal(true);
  };

  const getAllRoom = async () => {
    await otherAPI.getAllRoom().then((res) => {
      console.log({ res });
      if (res?.status == 200) {
        const data = res?.data.map((item, idx) => {
          return item?.alias;
        });
        console.log({ data });
        setAllRooms(data);
      }
    });
  };

  useEffect(() => {
    getAllRoom();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({ resolver: yupResolver(yupSchema) });

  useEffect(() => {
    setExam({
      ...exam,
      questions: questionList,
    });
  }, [questionList]);

  const renderAnwserQuestion = (question, typeQuestion) => {
    if (
      typeQuestion === QUESTION_TYPE.ONE_CORRECT_ANSWER ||
      typeQuestion === QUESTION_TYPE.TRUE_FALSE_ANSWERS
    ) {
      return (
        <Box>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            name='radio-buttons-group'
            value={question?.correctAnswerIndex ?? ""}
            sx={{ marginLeft: 1 }}
          >
            {question?.answers?.map((answer, idx) => (
              <FormControlLabel
                value={idx}
                key={idx}
                label={
                  <Typography
                    sx={{ display: "inline" }}
                    variant='body2'
                    fontWeight={400}
                  >
                    {answer.content}
                  </Typography>
                }
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </Box>
      );
    } else if (typeQuestion === QUESTION_TYPE.MANY_CORRECT_ANSWERS) {
      return (
        <Box>
          <FormGroup>
            {question.answers.map((answer, idx) => (
              <FormControlLabel
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 0,
                  marginBottom: 0,
                }}
                control={<Checkbox size='small' checked={answer.is_correct} />}
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
        </Box>
      );
    }
  };

  const handleDeleteQuestion = (question) => {
    const newQuestionList = questionList.filter((item) => item != question);
    setQuestionList(newQuestionList);
  };

  const renderQuestions = (questions) => {
    const result = questions.map((question, idx) => {
      return (
        <Box
          key={idx}
          sx={{
            bgcolor: "#F2F3F5",
            borderRadius: "12px",
            margin: 2,
            padding: 1.5,
          }}
        >
          <Box>
            <Typography
              component={"div"}
              className='title__question'
              variant='h5'
              fontWeight={700}
              marginBottom={1}
            >
              {question.content}
            </Typography>
            <Box className='answer__container'>
              {renderAnwserQuestion(question, question.type)}
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Button
                onClick={() => handleDeleteQuestion(question)}
                size='small'
              >
                <Typography variant='body2' fontSize={12} fontWeight='500'>
                  Xóa câu hỏi
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      );
    });
    return result;
  };

  const onSubmit = async (data) => {
    const convertQuestionList = questionList.map((question) => {
      const convertQuestion = {
        content: question.content,
        type: question.type,
        url_file: "",
        answers: question.answers,
      };
      return convertQuestion;
    });

    const convertData = (data) => {
      return {
        name: data.name,
        min_point_to_pass: data.minCorrectAnswers * 10,
        duration: data.duration,
        require_rooms: roomList,
        created_by: localStorage.getItem("email"),
        questions: convertQuestionList,
        image: img,
      };
    };
    const newData = convertData(data);

    await examAPI.addExamByAdmin(newData).then((res) => {
      if (res?.status == 200) {
        setNotification({
          message: "Thêm bài thi thành công!",
          type: NOTIFICATION.SUCCESS,
        });
        setOpenNoti(true);
        setLoading(true);
        setIsOpenAddExamModal(false);
        reset();
        setQuestionList([]);
      } else {
        setNotification({
          message: "Thêm bài thi thất bại",
          type: NOTIFICATION.ERROR,
        });
        setOpenNoti(true);
      }
    });
  };

  return (
    <Box>
      {/* <Button onClick={handleOpenAddExamModal}>Thêm bài thi</Button> */}
      <Box textAlign={"right"} margin={2}>
        <MKButton
          variant='gradient'
          color='info'
          onClick={handleOpenAddExamModal}
        >
          Thêm bài thi
        </MKButton>
      </Box>
      <Box>
        <Modal
          sx={{
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={isOpenAddExamModal}
          onClose={handleCloseAddExamModal}
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
                Thêm bài thi
              </Typography>
              <CloseIcon
                fontSize='medium'
                sx={{ cursor: "pointer" }}
                onClick={handleCloseAddExamModal}
              />
            </Box>
            <Divider sx={{ marginBottom: 0 }} />
            <Box sx={{ paddingTop: 2, maxHeight: "80vh", overflowY: "auto" }}>
              <TPUploadImage setImg={setImg} img={img} />
              <form onSubmit={handleSubmit(onSubmit)} id='form-add-exam'>
                <Box sx={{ margin: 2, marginTop: 0, marginBottom: 0 }}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          sx={{
                            width: "100%",
                            marginBottom: 2,
                            marginTop: 2,
                          }}
                          size='normal'
                          variant='outlined'
                          label='Tên bài thi'
                          helperText={
                            <Typography variant='caption' color='error'>
                              {errors.name?.message}
                            </Typography>
                          }
                          {...field}
                        />
                      );
                    }}
                  />

                  <Controller
                    name='duration'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          sx={{ width: "100%", marginBottom: 2 }}
                          variant='outlined'
                          helperText={
                            <Typography variant='caption' color='error'>
                              {" "}
                              {errors.duration?.message}
                            </Typography>
                          }
                          label='Thời gian (s)'
                          type='number'
                          {...field}
                        />
                      );
                    }}
                  />

                  <Controller
                    name='minCorrectAnswers'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          sx={{ width: "100%", marginBottom: 2 }}
                          variant='outlined'
                          helperText={
                            <Typography variant='caption' color='error'>
                              {errors.minCorrectAnswers?.message}
                            </Typography>
                          }
                          type='number'
                          label='Số câu đúng tối thiểu'
                          {...field}
                        />
                      );
                    }}
                  />

                  <FormControl fullWidth>
                    <InputLabel id='demo-multiple-checkbox-label'>
                      Yêu cầu phòng
                    </InputLabel>
                    <Select
                      labelId='demo-multiple-checkbox-label'
                      id='demo-multiple-checkbox'
                      multiple
                      sx={{ height: 45 }}
                      value={roomList}
                      onChange={handleChangeSelect}
                      input={<OutlinedInput label='Yêu cầu phòng' />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {allRooms &&
                        allRooms.map((room, idx) => (
                          <MenuItem key={idx} value={room}>
                            <Checkbox checked={roomList.indexOf(room) > -1} />
                            <ListItemText primary={room} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  className='questions__section'
                  sx={{
                    marginBottom: 2,
                  }}
                >
                  {renderQuestions(questionList)}
                </Box>
              </form>
              <AddQuestionModal
                setQuestionList={setQuestionList}
                questionList={questionList}
              />
              <Box display='flex' justifyContent='right' sx={{ margin: 2 }}>
                <MKButton
                  variant='gradient'
                  color='dark'
                  onClick={handleCloseAddExamModal}
                  sx={{ marginRight: 2 }}
                >
                  Đóng
                </MKButton>
                <MKButton type='submit' color='info' form='form-add-exam'>
                  Lưu
                </MKButton>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      <TPNotification
        type={notification.type}
        message={notification.message}
        open={openNoti}
        setOpen={setOpenNoti}
      />
    </Box>
  );
};

export default AddExamModal;
