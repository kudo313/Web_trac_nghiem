import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Popover } from "antd";
import examAPI from "api/examAPI";
// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
// @mui iconsimport TPNotification from "components/TPNotification";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../constant";
import "./ResultModal.scss";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const style = {
  bgcolor: "background.paper",
  position: "relative",
  width: "500px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  shadow: "xl",
  border: "12px",
};
const ResultModal = ({
  showModalResult,
  setShowModalResult,
  questions,
  questionAmount,
  minPointToPass,
  setIsFinish,
  countDown,
  isFinish,
  duration,
  exam,
}) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openNoti, setOpenNoti] = useState(false);
  const [point, setPoint] = useState(0);
  const [isPass, setIsPass] = useState();
  const [openPopover, setOpenPopover] = useState(false);

  const excutePointOfExam = () => {
    let result = 0;
    if (questions)
      for (let question of questions) {
        if (question.status === STATUS.CORRECT) {
          result += 10;
        }
      }
    setPoint(result);
  };

  // dam bao luu xong ket qua moi show modal
  useEffect(() => {
    if (isFinish) {
      setShowModalResult(true);
    }
  }, [questions]);

  useEffect(() => {
    if (showModalResult === true) excutePointOfExam();
  }, [showModalResult]);

  useEffect(() => {
    point >= minPointToPass ? setIsPass(true) : setIsPass(false);
  }, [point]);
  const handleCloseModal = async () => {
    const body = {
      exam_id: exam?.id,
      point: point,
      max_point: questionAmount * 10,
      is_pass: isPass,
      duration: countDown < 0 ? duration : duration - countDown,
    };
    await examAPI.postSaveExam(body).then((res) => {
      if (res?.status === 200) {
        setNotification({
          message: "Lưu kết quả thành công!",
          type: NOTIFICATION.SUCCESS,
        });
        setOpenNoti(true);
        setShowModalResult(false);
        navigate("/detail-exam", { state: { exam: exam } });
      } else {
        setNotification({
          message: "Lưu kết quả thất bại!",
          type: NOTIFICATION.ERROR,
        });
        setOpenNoti(true);
      }
    });
  };
  const handleOpenModal = () => {
    setIsFinish(true);
    // setShowModalResult(true);
  };

  const handleChangeVisiablePopover = (status) => {
    setOpenPopover(status);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };
  return (
    <MKBox component='section'>
      <Box>
        <Popover
          overlayClassName='confirm__submit--exam'
          content={
            <>
              <ErrorOutlineIcon color='error' fontSize='large' />
              <Typography
                variant='h5'
                width='100%'
                textAlign='center'
                color='error'
                maxWidth={150}
              >
                Xác nhận
              </Typography>
              <Typography
                variant='subtitle2'
                width='100%'
                textAlign='center'
                maxWidth={200}
                marginTop={1}
                marginBottom={1}
              >
                Bạn có chắc chắn muốn nộp bài khi chưa hết thời gian làm bài
                thi?
              </Typography>
              <Box sx={{ textAlign: "right" }} className='button__confirm'>
                <MKButton
                  variant='gradient'
                  color='dark'
                  onClick={handleClosePopover}
                  sx={{ marginRight: 2, padding: 1 }}
                >
                  Huỷ
                </MKButton>
                <MKButton
                  onClick={() => {
                    setOpenPopover(false);
                    handleOpenModal();
                  }}
                  color='error'
                  sx={{ padding: 1 }}
                >
                  Xác nhận
                </MKButton>
              </Box>
            </>
          }
          trigger='click'
          placement='bottomRight'
          visible={openPopover}
          onVisibleChange={handleChangeVisiablePopover}
        >
          <MKButton variant='gradient' color='info'>
            Nộp bài
          </MKButton>
        </Popover>
        <Modal
          open={showModalResult}
          onClose={handleCloseModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          sx={{ display: "grid", placeItems: "center" }}
        >
          <MKBox sx={style}>
            <MKBox
              display='flex'
              alginItems='center'
              justifyContent='space-between'
              p={2}
            >
              <MKTypography variant='h5'>Kết quả thi</MKTypography>
            </MKBox>
            <MKBox p={2}>
              <MKTypography
                variant='body2'
                color='secondary'
                fontWeight='regular'
                mt='2'
                mb={3}
              >
                Điểm: {`${point}/${10 * questionAmount}`}
              </MKTypography>
              <MKTypography variant='h6' sx={{ fontStyle: "italic" }}>
                {isPass
                  ? "Chúc mừng bạn đã vượt qua bài thi!"
                  : "Bạn chưa vượt qua bài thi, bạn cần ôn tập kỹ hơn để hoàn thành bài thi này."}
              </MKTypography>
            </MKBox>
            <MKBox display='flex' justifyContent='right' p={2}>
              <MKButton
                ariant='gradient'
                color='info'
                onClick={handleCloseModal}
              >
                Xác nhận
              </MKButton>
            </MKBox>
          </MKBox>
        </Modal>
      </Box>
      <TPNotification
        type={notification.type}
        message={notification.message}
        open={openNoti}
        setOpen={setOpenNoti}
      />
    </MKBox>
  );
};

export default ResultModal;
