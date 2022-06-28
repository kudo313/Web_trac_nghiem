import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LastestResult from "containers/LastestResult";
import "./DetailExam.scss";
import examAPI from "api/examAPI";
import Ranking from "containers/Ranking";
import { convertSecondToTime } from "utils/convert";
const DetailExam = () => {
  const [exam, setExam] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [lastestResultExam, setLastestResultExam] = useState();
  const [historyExam, setHistoryExam] = useState();
  const [rankingExam, setRankingExam] = useState();
  const [shortRankingExam, setShortRankingExam] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getFullRanking = async (params) => {
    await examAPI.getFullExamRanking(params).then((res) => {
      if (res.status === 200) {
        const data = res?.data;
        if (data) {
          setRankingExam(data);
        }
      }
    });
  };

  useEffect(() => {
    setExam(location.state?.exam);
  }, []);

  const promiseAll = async () => {
    const params = {
      user_id: localStorage.getItem("userId"),
      exam_id: location.state?.exam?.id,
    };
    const test = await Promise.all([
      examAPI.getExamHistory(params),
      examAPI.getShortcutExamRanking(params),
    ]).then(([res1, res2]) => {
      if (res1.status === 200) {
        const data = res1.data;
        if (data) {
          setHistoryExam(data);
          setLastestResultExam(data[data.length - 1]);
          setIsLoading(false);
        }
      }
      if (res2?.status === 200) {
        const data = res2?.data;
        if (data) {
          setShortRankingExam(data);
          setIsLoading(false);
        }
      }
    });
    return test;
  };

  useEffect(() => {
    const params = {
      user_id: localStorage.getItem("userId"),
      exam_id: location.state?.exam?.id,
    };
    promiseAll();
    getFullRanking(params);
  }, []);

  return (
    <Card
      sx={{
        p: 1,
        mx: { xs: 2, lg: 3 },
        // mt: 8,
        mb: 4,
        backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
          rgba(white.main, 0.8),
        backdropFilter: "saturate(200%) blur(30px)",
        boxShadow: ({ boxShadows: { xxl } }) => xxl,
      }}
      className='detail-exam__container'
    >
      <Box component='section' py={8}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 2,
              marginBottom: 2,
            }}
            className='description__exam'
          >
            <Box
              sx={{
                flex: 1,
                borderRadius: 4,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${exam?.image})`,
                backgroundRepeat: "no-repeat",
                maxWidth: 180,
                height: 180,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* <img
                src={exam?.image}
                style={{
                  width: 180,
                  height: 180,
                }}
              /> */}
            </Box>
            <Box
              sx={{
                flex: 2,
                marginLeft: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant={"h2"} marginBottom={2}>
                {exam?.name}
              </Typography>
              <Box>
                <Typography variant='subtitle2'>
                  Thời gian:{" "}
                  {`${convertSecondToTime(exam?.duration).minutes}:${
                    convertSecondToTime(exam?.duration).seconds
                  }`}
                </Typography>
                <Typography variant='subtitle2'>
                  Số câu hỏi: {exam?.questionAmount}
                </Typography>
                <Typography variant='subtitle2'>
                  Số điểm tối thiểu: {exam?.min_point_to_pass}
                </Typography>
              </Box>
            </Box>
            <Button
              className='start__button'
              sx={{ height: 40, alignSelf: "center", marginLeft: 2 }}
              onClick={() => {
                navigate("/exam", { state: { exam: exam } });
              }}
            >
              Bắt đầu
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flex: 1, height: "initial" }}>
              <LastestResult
                lastestResultExam={lastestResultExam}
                historyExam={historyExam}
                isLoading={isLoading}
              />
            </Box>

            <Box sx={{ flex: 1, height: "initial" }}>
              <Ranking
                rankingExam={rankingExam}
                shortRankingExam={shortRankingExam}
                isLoading={isLoading}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Card>
  );
};

export default DetailExam;
