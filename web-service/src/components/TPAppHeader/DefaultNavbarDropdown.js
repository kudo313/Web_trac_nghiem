import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function DefaultNavbarDropdown({
  name,
  icon,
  children,
  href,
  route,
  curTabs,
  setCurTabs,
  ...rest
}) {
  const onClick = () => {
    setCurTabs(route);
  };
  return (
    <>
      <Link to={route}>
        <MKBox
          {...rest}
          mx={1}
          p={1}
          display='flex'
          alignItems='baseline'
          onClick={onClick}
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          <MKTypography
            variant='body2'
            lineHeight={1}
            color={curTabs === route ? "info" : "inherit"}
            // color='info'
            sx={{ alignSelf: "center", "& *": { verticalAlign: "middle" } }}
          >
            {icon}
          </MKTypography>
          <MKTypography
            variant='button'
            fontWeight='regular'
            textTransform='capitalize'
            color={curTabs === route ? "info" : "inherit"}
            sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
          >
            {name}
          </MKTypography>
        </MKBox>
      </Link>
    </>
  );
}

export default DefaultNavbarDropdown;
