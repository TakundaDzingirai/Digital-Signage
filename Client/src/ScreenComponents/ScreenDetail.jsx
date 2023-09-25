import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import Axios from "axios";
import {
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import Slides from "./Slides";
import Footer from "../Footer";
import EmptyDataAlert from "../EmptyDataAlert";
import ErrorAlert from "./ErrorAlert";
import ResponsiveAppBar from "../ResponsiveAppBar";
import { useUser } from "../UserContext";

const ScreenDetail = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [screenData, setScreenData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyData, setEmptyData] = useState(false);
  const { user, setUser } = useUser();

  user.other.screenId = id;
  const neww = user;
  setUser(neww);
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:3000/screens/${id}`);
        if (response.data.content.length === 0) {
          setEmptyData(true);
        } else {
          setScreenData(response.data);
        }
      } catch (error) {
        console.error(error);
        setError(
          "An error occurred while fetching data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleButtonClick = () => {
    history(`/screens/content/${id}`);
  };

  return (
    <div>
      <ResponsiveAppBar show={false} />
      <Container maxWidth="md" style={{ paddingTop: "20px" }}>
        <Paper
          elevation={3}
          style={{ padding: "20px", marginTop: "25px", marginBottom: "30px" }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {screenData.screenName}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h5"
            component="h2"
            align="center"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Screen Contents
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {loading && !error && !emptyData ? (
              <CircularProgress />
            ) : error ? (
              <ErrorAlert error={error} />
            ) : emptyData ? (
              <EmptyDataAlert />
            ) : (
              <Slides key={id} />
            )}
          </Grid>

          <Button
            onClick={handleButtonClick}
            variant="outlined"
            color="primary"
            sx={{ marginTop: "20px", alignSelf: "center" }}
          >
            Add Slide
          </Button>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default ScreenDetail;
