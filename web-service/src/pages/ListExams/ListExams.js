import Card from "@mui/material/Card";
import BlockExams from "./BlockExams";
const ListExams = () => {
  return (
    <Card
      sx={{
        p: 2,
        mx: { xs: 2, lg: 3 },
        // mt: 8,
        mb: 4,
        backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
          rgba(white.main, 0.8),
        backdropFilter: "saturate(200%) blur(30px)",
        boxShadow: ({ boxShadows: { xxl } }) => xxl,
      }}
    >
      <BlockExams />
    </Card>
  );
};
export default ListExams;
