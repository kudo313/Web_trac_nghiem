import {
  Box,
  ButtonBase,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import examAPI from "api/examAPI";
import { useEffect, useState } from "react";
import unknowExam from "../../../assets/images/unknowExam.png";
import MKBox from "../../../components/MKBox";
import TPCardItem from "../../../components/TPCardItem";
import AddExamModal from "./AddExam";
import DetailExamModal from "./DetailExam";

const checkCorrectAnswer = (answers) => {
  for (let i in answers) {
    if (answers[i]?.is_correct) return i;
  }
};

const convertDatas = (datas) =>
  datas.map((data, idx) => {
    return {
      ...data,
      image: data?.image ? data?.image : unknowExam,
      questionAmount: data?.questions.length,
      questions: data?.questions.map((question, idx) => {
        return {
          ...question,
          correctAnswerIndex: checkCorrectAnswer(question?.answers),
          correctAnswerList: question.answers
            .map((answer, idx) => {
              if (answer?.is_correct) return idx;
            })
            .filter((item) => item != undefined),
        };
      }),
    };
  });
const ManageExams = () => {
  const [listExams, setListExams] = useState();
  const [loading, setLoading] = useState(true);
  const [isOpenDetailExamModal, setIsOpenDetailExamModal] = useState(false);
  const [exam, setExam] = useState("");

  const getListExams = async (room) => {
    const params = {
      room: room,
    };

    await examAPI.getListExamForRoom(params).then((res) => {
      if (res?.data) {
        const listExams = convertDatas(res?.data);
        console.log({ listExams });
        setListExams(listExams);
        if (listExams) setExam(listExams[0]);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (loading) {
      getListExams(localStorage.getItem("room"));
    }
  }, [loading]);

  const handleOpenDetailExamModal = () => {
    isOpenDetailExamModal(true);
  };
  const onClickExam = (exam) => {
    setExam(exam);
    setIsOpenDetailExamModal(true);
  };

  const renderListExams = () => {
    return (
      <Grid container spacing={6} maxWidth={800}>
        {listExams?.map((exam, idx) => (
          <Grid item xs={12} md={4} sx={{ mb: 2 }} key={exam.name}>
            <ButtonBase
              onClick={() => {
                onClickExam(exam);
              }}
            >
              <TPCardItem
                image={exam.image}
                name={exam.name}
                type={"Câu hỏi"}
                count={exam.questionAmount}
              />
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderSkeleton = () => {
    const arrayElement = [];
    for (let i = 0; i < 3; i++) {
      arrayElement.push(
        <Grid item xs={12} md={4} sx={{ mb: 2 }}>
          <Skeleton
            variant='rectangular'
            maxWidth
            sx={{ minHeight: "10rem", aspectRatio: "1/1", margin: "auto" }}
          />
          <Typography variant='h6' textAlign={"center"}>
            <Skeleton />
          </Typography>
          <Typography variant='button' textAlign={"center"}>
            <Skeleton />
          </Typography>
        </Grid>
      );
    }
    return (
      <Grid container spacing={6} maxWidth={800}>
        {arrayElement}
      </Grid>
    );
  };

  return (
    <MKBox>
      <Box
        className='title__box'
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='h5' component={"div"}>
          Quản lý bài thi
        </Typography>
      </Box>
      <Container sx={{ mt: 6, justifyContent: "center", display: "flex" }}>
        {loading ? renderSkeleton() : renderListExams()}
      </Container>
      <AddExamModal loading={loading} setLoading={setLoading} />
      {loading ? null : (
        <DetailExamModal
          exam={exam}
          setIsOpenDetailExamModal={setIsOpenDetailExamModal}
          isOpenDetailExamModal={isOpenDetailExamModal}
          setLoading={setLoading}
        />
      )}
    </MKBox>
  );
};

export default ManageExams;
