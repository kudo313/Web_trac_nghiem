import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MENUBAR_ADMIN, MENUBAR_MEMBER, MENUBAR_SUPER_ADMIN } from "./constant";
import { useLocation } from "react-router-dom";
import "./Setting.scss";
import MKBox from "components/MKBox";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant='body1'>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

const Setting = () => {
  const [value, setValue] = useState(0);
  const [menubar, setMenubar] = useState();
  // const [isRedirectFromExam, setIsRedirectFromExam] = useState(true)
  const location = useLocation();

  // useEffect(() => {
  //     if (isRedirectFromExam) {
  //         if (location.state?.from === 'exam') {
  //             setValue(1);
  //             setIsRedirectFromExam(false)
  //         }
  //     }
  //     else setValue(0)
  // }, [isRedirectFromExam])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    switch (role) {
      case "0":
        setMenubar(MENUBAR_MEMBER);
        break;
      case "1":
        setMenubar(MENUBAR_ADMIN);
        break;
      case "2":
        setMenubar(MENUBAR_SUPER_ADMIN);
        break;
      default:
        setMenubar(MENUBAR_MEMBER);
    }
  }, []);

  const renderTabs = () => {
    if (menubar)
      return (
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
        >
          {menubar.map((item, idx) => (
            <Tab
              key={idx}
              label={item.name}
              className={value === idx ? "tab--active" : ""}
            />
          ))}
        </Tabs>
      );
  };

  const renderTabPanels = () => {
    if (menubar)
      return (
        <>
          {menubar.map((item, idx) => (
            <TabPanel
              key={idx}
              value={value}
              index={idx}
              className='tab--personal-info'
            >
              {item.component}
            </TabPanel>
          ))}
        </>
      );
  };
  return (
    <MKBox component='section' pu={6}>
      <Box className='setting__container' sx={{ marginTop: 4 }}>
        <Box className='left__container'>{renderTabs()}</Box>
        <Box className='right__container' sx={{ height: "100%" }}>
          {renderTabPanels()}
        </Box>
      </Box>
    </MKBox>
  );
};

export default Setting;
