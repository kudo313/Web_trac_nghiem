import { Box, Container, Typography } from "@mui/material";
import Image from "../../assets/images/404Image.svg";
const Error404 = () => {
  return (
    <Container
      sx={{
        display: "flex",
        marginTop: 15,
        marginBottom: 5,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant='h1' fontSize={86}>
          404
        </Typography>
        <Typography variant='h5' fontWeight={400}>
          Oops! Looks like you followed a bad link.
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <img src={Image} />
      </Box>
    </Container>
  );
};

export default Error404;
