// react-router-dom components
import { Skeleton, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import examAPI from "api/examAPI";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import TPCardItem from "components/TPCardItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import unknowExam from "../../assets/images/unknowExam.png";

const convertDatas = (datas) =>
  datas.map((data, idx) => {
    return {
      ...data,
      // idExam: data?.id,
      image: data?.image ? data?.image : unknowExam,
      name: data?.name,
      questionAmount: data?.questions.length,
    };
  });

const BlockExams = () => {
  const [listExams, setListExams] = useState();
  const [loading, setLoading] = useState(true);

  const getListExams = async (room) => {
    const params = {
      room: room,
    };

    await examAPI.getListExamForRoom(params).then((res) => {
      if (res?.data) {
        const listExams = convertDatas(res?.data);
        setListExams(listExams);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getListExams(localStorage.getItem("room"));
  }, []);

  const renderListExams = () => {
    return (
      <Grid container spacing={6} maxWidth={1000}>
        {listExams?.map((exam, idx) => (
          <Grid item md={4} sm={6} xs={12} key={idx}>
            <Link to={"/detail-exam"} state={{ exam: exam }}>
              <TPCardItem
                image={exam.image}
                name={exam.name}
                type={"Câu hỏi"}
                count={exam.questionAmount}
              />
            </Link>
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
    <MKBox component='section' py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection='column'
          alignItems='center'
          sx={{ textAlign: "center", mx: "auto", px: 0.75 }}
        >
          <MKTypography variant='h2' fontWeight='bold'>
            Các bài thi
          </MKTypography>
          <MKTypography variant='body1' color='text'>
            Đây là các bài thi mà bạn có thể thi
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6, justifyContent: "center", display: "flex" }}>
        {loading ? renderSkeleton() : renderListExams()}
      </Container>
    </MKBox>
  );
};

export default BlockExams;
