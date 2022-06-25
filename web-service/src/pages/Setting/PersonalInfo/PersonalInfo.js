import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import infoAPI from "api/infoAPI";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import otherAPI from "api/otherAPI";
import * as yup from "yup";
import "./PersonalInfo.scss";

import TPUploadImage from "components/TPUploadImage";
import { ROLE } from "constants/role";
import MKBox from "components/MKBox";

const yupSchema = yup.object().shape({
  fullname: yup.string().required("Trường này bắt buộc!"),
  email: yup
    .string()
    .required("Trường này bắt buộc!")
    .email("Chưa đúng định dạng!"),
});

const PersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState("");
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openNoti, setOpenNoti] = useState(false);
  const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [allRooms, setAllRooms] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

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

  const getPersonalInfo = async () => {
    await infoAPI.getInfo().then((res) => {
      const data = res?.data;
      setPersonalInfo(data);
      setAvatar(data.url_avatar);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllRoom();
    getPersonalInfo();
  }, []);

  const onSubmit = async (data) => {
    console.log({ data });
    const convertData = (data) => {
      return {
        ...data,
        password: null,
        token: null,
        url_avatar: avatar,
        user_id: personalInfo?.user_id,
        // room: room,
      };
    };
    const newData = convertData(data);
    await infoAPI.putUpdateUser(newData).then((res) => {
      if (res?.status == 200) {
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("room", data?.room);
        localStorage.setItem("email", data?.email);
        document.location.reload(true);
        setNotification({
          message: "Thay đổi thông tin thành công!",
          type: NOTIFICATION.SUCCESS,
        });
        setOpenNoti(true);
      } else {
        setNotification({
          message: "Thay đổi thông tin thất bại!",
          type: NOTIFICATION.ERROR,
        });
        setOpenNoti(true);
      }
      setPersonalInfo(newData);
    });
  };

  return (
    <Box className='personal-info__container'>
      <Box
        className='title__box'
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='h5' component={"div"}>
          Thông tin cá nhân
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 1.5 }}>
          <Grid
            className='detail-personal-info__box'
            container
            sx={{
              marginTop: 2,
              marginBottom: 2,
              marginLeft: -2,
              width: "100%",
            }}
            spacing={2}
            rowSpacing={3}
          >
            <Box
              width={"100%"}
              sx={{ display: "flex", justifyContent: "center" }}
              marginBottom={2}
            >
              {isLoading ? (
                <Skeleton variant='circular' width={180} height={180} />
              ) : (
                <TPUploadImage
                  img={avatar}
                  setImg={setAvatar}
                  type={"avatar"}
                />
              )}
            </Box>
            <Grid item xs={6} className='name'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='fullname'
                  control={control}
                  defaultValue={personalInfo?.fullname}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        helperText={
                          <Typography variant='caption' color='error'>
                            {errors.fullname?.message}
                          </Typography>
                        }
                        {...field}
                        label='Họ và tên'
                        variant='outlined'
                      />
                    );
                  }}
                />
              )}
            </Grid>

            <Grid item xs={6} className='dob'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='date_of_birth'
                  control={control}
                  defaultValue={personalInfo?.date_of_birth}
                  render={({ field }) => {
                    return (
                      <TextField
                        id='date'
                        label='Birthday'
                        type='date'
                        helperText={
                          <Typography variant='caption' color='error'>
                            {" "}
                            {errors.date_of_birth?.message}
                          </Typography>
                        }
                        sx={{
                          width: "100%",
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                      />
                    );
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6} className='email'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='email'
                  control={control}
                  defaultValue={personalInfo?.email}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        helperText={
                          <Typography variant='caption' color='error'>
                            {" "}
                            {errors.email?.message}
                          </Typography>
                        }
                        {...field}
                        label='Email'
                        variant='outlined'
                      />
                    );
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6} className='position'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='position'
                  control={control}
                  defaultValue={personalInfo?.position}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        label='Vị trí'
                        variant='outlined'
                        {...field}
                      />
                    );
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6} className='role'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='role'
                  control={control}
                  defaultValue={personalInfo?.role}
                  render={({ field }) => {
                    return (
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Quyền
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Quyền'
                          sx={{ height: 44 }}
                          disabled
                          {...field}
                        >
                          <MenuItem value={0}>Member</MenuItem>
                          <MenuItem value={1}>Admin</MenuItem>
                          <MenuItem value={2}>Super Admin</MenuItem>
                        </Select>
                      </FormControl>
                    );
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6} className='room'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='room'
                  control={control}
                  defaultValue={personalInfo?.room}
                  render={({ field }) => {
                    return (
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Phòng
                        </InputLabel>
                        <Select
                          disabled={personalInfo?.role == ROLE.MEMBER}
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          // value={age}
                          label='Phòng'
                          // onChange={handleChange}
                          sx={{ height: 44 }}
                          {...field}
                        >
                          {allRooms &&
                            allRooms.map((room, idx) => (
                              <MenuItem value={room}>{room}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      // <TextField
                      //   disabled={personalInfo?.role == ROLE.MEMBER}
                      //   sx={{
                      //     width: "100%",
                      //   }}
                      //   label='Phòng'
                      //   variant='outlined'
                      //   {...field}
                      // />
                    );
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Box>
        <Button
          className='confirm__button'
          sx={{
            marginLeft: "auto",
            display: "flex",
            marginRight: 2,
            marginBottom: 4,
          }}
          type='submit'
        >
          Lưu thay đổi
        </Button>
      </form>
      <TPNotification
        type={notification.type}
        message={notification.message}
        open={openNoti}
        setOpen={setOpenNoti}
      />
    </Box>
  );
};

export default PersonalInfo;
