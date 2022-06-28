
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import TPCardItem from "components/TPCardItem";
import { Link } from "react-router-dom";
import data from "./courseInfo";





function BlockCourse() {
  const renderData = data.map(({ title, description, items }, idx) => (
    <Grid key={idx} container spacing={4}>
      {items.map(({ image, name, count, route, pro }, idx) => (
        <Grid item xs={12} md={4} sx={{ mb: 2 }} key={idx}>
          <Link to={route}>
            <TPCardItem image={image} name={name} count={count} type={'Bài'} />
          </Link>
        </Grid>
      ))}
    </Grid>
  ));

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
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKTypography variant='h2' fontWeight='bold'>
            Khóa học bạn đang theo
          </MKTypography>
          <MKTypography variant='body1' color='text'>
            Đây là các khóa học mà bạn đang theo học
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>{renderData}</Container>
    </MKBox>
  );
}

export default BlockCourse;
