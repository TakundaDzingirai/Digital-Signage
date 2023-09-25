import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Slide = ({ s, screenId }) => {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate(`/content/more/${s._id}`, { state: { screenId } });
  }

  const formattedCreatedAt = moment(s.createdAt).format("MMM D, YYYY");
  const truncatedSlideTitle =
    s.slideTitle.length > 20
      ? s.slideTitle.substring(0, 20) + "..."
      : s.slideTitle;

  return (
    <Card
      sx={{
        marginBottom: 1,
        marginTop: 1,
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ccc",
        transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          transform: "scale(1.05)",
        },
        display: "flex",
        flexDirection: "column",
        minHeight: "300px",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      {s.image && (
        <CardMedia
          component="img"
          alt="Slide Image"
          sx={{
            objectFit: "cover",
            height: "150px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
          src={
            s.image.url ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX09PTMzMzJycnPz8/d3d3V1dXi4uLo6Ojw8PDx8fH39/ft7e3Y2NjQ0NDp6enb29uHE20LAAACaklEQVR4nO3b6W6CQBhGYUTWD9T7v9uylLIN6jCk8Cbn+deEGo6DMOAYRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJyFiuzshLesStJAdVZdufEV38LFydkZm6w+IrBJrK86itkxgU1ifnaKmz363QvUvsbjmoNYdjuXPPMQz6R7lfLsGKeq3bd76LvfHwnFIXt0tOKYwjuF51kVtjMUbzqFVmR1/cpK30idwv7qH98yz0SVwvI+XP19JygqhY9xehMnXokihfl0/hZ77a5I4WM2zXz5DKJI4XwKvjHLNGeGRmE1L7w7N7fKeRLSKCy+KGwCnedZjcJofruXuo7SbpwdiRqFlk4D42y9rf0eyOtEjcL5BzFeb2rV5oRApNAmj6QcjyRs8g4sE0UKJ4nxemJq8yGeJ6oURpY/uic26frppy0uJvNEmcI2JM/yovlz8cxlGbhIFCrcsA6cX0/kC52Bt3hMlC90Bk5HUbzQPYL9KA6b6BXmk8/YZuCYqFdYj/f47wL/EtUKrR6/LXsfOCSKFbaBQ+KnwGa79sqpVWjp7x1Ec6B+DhQsHAK7xM+BeoVjYLPzr499eoXTwO+IFfoHihXuWbWgVVh792kV7lt3IlRoe0ZQqvCLax+FZ8c4UUghheebFu6jU1gk++gU7l3t3f2rRmGAyxcGr329cuEh60stunBh2Z3y6yxM/wX52S1u/bf3Ryzzdq9tuIDnYWv1q7NTNlhy0O8t/Nb6/SfLbnHoYbpjSep/sjLfOZ0ZXfTXJKPgH69deAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDyA0uAKIxQw0bjAAAAAElFTkSuQmCC"
          }
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="caption" color="textSecondary">
          {formattedCreatedAt}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "#1e366a" }}
        >
          {truncatedSlideTitle}
        </Typography>
      </CardContent>

      <Box
        sx={{
          borderTop: "1px solid #ccc",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="outlined" onClick={handleNavigation}>
          More Details
        </Button>
      </Box>
    </Card>
  );
};

export default Slide;
