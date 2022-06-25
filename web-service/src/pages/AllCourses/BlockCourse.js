
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import TPCardItem from "components/TPCardItem";
import { Link } from "react-router-dom";
// Data
import data from "./courseInfo";





function BlockCourse() {
    const renderData = (data) => {
        return (
            <Grid Grid container spacing={6} maxWidth={1000} >
                {
                    items.map(({ image, name, count, route, pro }, idx) => (
                        <Grid item md={4} sm={6} xs={12} key={name}>
                            <Link to={pro ? "/" : route}>
                                <TPCardItem image={image} name={name} count={count} type={'Bài'} />
                            </Link>
                        </Grid>
                    ))
                }
            </Grid>
        )
    };

    return (
        <MKBox component="section" py={6} >
            <Container>
                <Grid
                    container
                    item
                    xs={12}
                    lg={6}
                    flexDirection="column"
                    alignItems="center"
                    sx={{ textAlign: "center", mx: "auto", px: 0.75 }}
                >
                    <MKTypography variant="h2" fontWeight="bold">
                        Khoá học
                    </MKTypography>
                    <MKTypography variant="body1" color="text">
                        Đây là các khoá học hiện có của chúng tôi
                    </MKTypography>
                </Grid>
            </Container>
            <Container sx={{ mt: 6, justifyContent: 'center', display: 'flex' }}>{renderData}</Container>
        </MKBox>
    );
}

export default BlockCourse;
