// react-router-dom components
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

function TPAppFooter({ content }) {
  const { brand, socials, menus, copyright } = content;
  const location = useLocation();

  if (
    location.pathname === "/sign-in" ||
    location.pathname === "/forgot-password"
  ) {
    return null;
  }

  return (
    <MKBox component='footer'>
      <Container>
        <MKBox sx={{ textAlign: "center" }}>
          <Link to={brand.route}>
            <img src={brand.image} alt={brand.name} width='200px' />
          </Link>
          {/* <MKTypography variant="h6">{brand.name}</MKTypography> */}
        </MKBox>
        <MKBox
          display='flex'
          alignItems='center'
          justifyContent='center'
          mt={3}
        >
          {socials.map(({ icon, link }, key) => (
            <MKTypography
              key={link}
              component='a'
              href={link}
              target='_blank'
              rel='noreferrer'
              variant='h5'
              color='dark'
              opacity={0.8}
              mr={key === socials.length - 1 ? 0 : 2.5}
            >
              {icon}
            </MKTypography>
          ))}
        </MKBox>
        <Grid item xs={12} sx={{ textAlign: "center", my: 3 }}>
          {copyright}
        </Grid>
      </Container>
    </MKBox>
  );
}

// Typechecking props for the DefaultFooter
TPAppFooter.propTypes = {
  content: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
};

export default TPAppFooter;
