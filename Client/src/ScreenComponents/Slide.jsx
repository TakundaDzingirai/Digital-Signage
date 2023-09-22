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
        transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
        "&:hover": {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          transform: "scale(1.05)",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleNavigation}
    >
      <CardContent>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ textAlign: "center" }}
          style={{ marginBottom: "1rem" }}
        >
          Slide Title
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#1e366a",
            marginBottom: "0.5rem",
          }}
        >
          {s.slideTitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Slide;
