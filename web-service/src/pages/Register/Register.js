import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { Typography } from "antd";
import infoAPI from "api/infoAPI";
import loginAPI from "api/loginAPI";
// Images
import bgImage from "assets/images/backgroundSignIn.jpeg";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import checkLogin from "utils/checkLogin";
import * as yup from "yup";

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .required("Trường này bắt buộc!")
    .email("Chưa đúng định dạng!"),
  password: yup.string().required("Trường này bắt buộc!"),
});

function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openNoti, setOpenNoti] = useState(false);

  useEffect(() => {
    checkLogin() ? navigate("/register") : "";
  }, []);

  const onChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const showPass = () => {
    setIsShowPass(!isShowPass);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      await loginAPI.login(payload).then((res) => {
        if (res?.status === 200) {
          localStorage.setItem("accessToken", res?.data.access_token);
          localStorage.setItem("email", data.email);
        } else {
          setNotification({
            message: "Đăng nhập thất bại",
            type: NOTIFICATION.ERROR,
          });
          setOpenNoti(true);
        }
      });
      await infoAPI.getInfo().then((res) => {
        if (res?.status === 200) {
          setOpenNoti(true);
          const data = res?.data;
          localStorage.setItem("userId", data?.user_id);
          localStorage.setItem("role", data?.role);
          localStorage.setItem("avatar", data?.url_avatar);
          localStorage.setItem("room", data?.room);
          if (location.state?.from) {
            navigate(location.state.from);
          } else navigate("/list-exams");
        } else {
          setNotification({
            message: "Đăng nhập thất bại",
            type: NOTIFICATION.ERROR,
          });
          setOpenNoti(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox
        px={1}
        width="100%"
        height="100vh"
        mx="auto"
        position="relative"
        zIndex={2}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  mt={1}
                >
                  Đăng ký
                </MKTypography>
              </MKBox>
              <form onSubmit={handleSubmit(onSubmit)} id="register-in-form">
                <Box pt={4} pb={3} px={3}>
                  <Box component="form" role="form">
                    <Box mb={2}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextField
                              sx={{
                                width: "100%",
                              }}
                              size="normal"
                              variant="outlined"
                              label="Email"
                              onChange={onChangeEmail}
                              helperText={
                                <Typography variant="caption" color="error">
                                  {errors.email?.message}
                                </Typography>
                              }
                              {...field}
                            />
                          );
                        }}
                      />
                    </Box>
                    <MKBox
                      display="flex"
                      alignItems="center"
                      sx={{ position: "relative" }}
                      mb={2}
                    >
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => {
                          return (
                            <>
                              <TextField
                                sx={{
                                  width: "100%",
                                }}
                                type={isShowPass ? "text" : "password"}
                                size="normal"
                                variant="outlined"
                                label="Password"
                                onChange={onChangePassword}
                                helperText={
                                  <Typography variant="caption" color="error">
                                    {errors.password?.message}
                                  </Typography>
                                }
                                {...field}
                              />
                              {isShowPass ? (
                                <VisibilityOffIcon
                                  sx={{ position: "absolute", right: 8 }}
                                  onClick={showPass}
                                />
                              ) : (
                                <VisibilityIcon
                                  sx={{ position: "absolute", right: 8 }}
                                  onClick={showPass}
                                />
                              )}
                            </>
                          );
                        }}
                      />
                    </MKBox>

                    <MKBox
                      mt={3}
                      mb={1}
                      textAlign="center"
                      onClick={() =>
                        navigate("/forgot-password", {
                          state: { email: email },
                        })
                      }
                    >
                      <MKButton>Bạn quên mật khẩu?</MKButton>
                    </MKBox>
                    <MKBox
                      mt={3}
                      mb={1}
                      textAlign="center"
                      onClick={() =>
                        navigate("/setting", {
                          state: { email: email },
                        })
                      }
                    >
                      <MKButton>Đ</MKButton>
                    </MKBox>
                  </Box>
                </Box>
              </form>
              <MKBox mt={4} mb={1} sx={{ margin: 2, marginBottom: 2 }}>
                <MKButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="submit"
                  form="register-in-form"
                >
                  Đăng ký
                </MKButton>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <TPNotification
        type={notification.type}
        message={notification.message}
        open={openNoti}
        setOpen={setOpenNoti}
      />
    </>
  );
}

export default Register;
