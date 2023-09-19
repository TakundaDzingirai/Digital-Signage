import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Slide = ({ s, screenId }) => {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate(`/content/more/${s._id}`, { state: { screenId } });
  }

  return (
    <Card
      sx={{
        cursor: "pointer",
        marginBottom: 2,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleNavigation}
    >
      <CardContent>
        <Typography variant="caption" color="textSecondary">
          slide title
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {s.slideTitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Slide;
