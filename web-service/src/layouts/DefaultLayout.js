import TPAppContent from "components/TPAppContent";
import TPAppFooter from "components/TPAppFooter";
import React from "react";
import TPAppHeader from "../components/TPAppHeader";
import footerRoutes from "footer.routes";
import Box from "@mui/material/Box";

const DefaultLayout = () => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <TPAppHeader
        action={{
          type: "external",
          // route: "https://www.creative-tim.com/product/material-kit-react",
          color: "info",
        }}
        sticky
      />
      <TPAppContent />
      <TPAppFooter content={footerRoutes} />
    </Box>
  );
};

export default DefaultLayout;
