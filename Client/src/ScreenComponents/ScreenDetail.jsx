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
} from "@mui/material";
import Slides from "./Slides";
import Header from "../Header";
import Footer from "../Footer";
import EmptyDataAlert from "../EmptyDataAlert";
import ErrorAlert from "./ErrorAlert";

const ScreenDetail = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [screenData, setScreenData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyData, setEmptyData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await Axios.get(`http://localhost:3000/screens/${id}`);
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
        setScreenData(response.data);
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
      <Header />
      <Container maxWidth="md" style={{ paddingTop: "20px" }}>
        <Paper
          elevation={3}
          style={{ padding: "20px", marginTop: "25px", marginBottom: "30px" }}
        >
          <Typography
            variant="h4"
            component="h1"
            style={{
              marginTop: "10px",
              textAlign: "center",
              color: "#1e366a",
              fontWeight: "bold",
            }}
          >
            {screenData.screenName}
          </Typography>

          <Divider sx={{ mt: 2 }} />

          <Typography
            variant="h5"
            component="h2"
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: "#1e366a",
              fontWeight: "bold",
            }}
          >
            Screen Contents
          </Typography>

          {/* Conditional rendering based on loading, error, and emptyData */}
          {loading && !error && !emptyData ? (
            <CircularProgress />
          ) : error ? (
            <ErrorAlert error={error} />
          ) : emptyData ? (
            <EmptyDataAlert />
          ) : (
            <Slides key={id} />
          )}

          <Button
            onClick={handleButtonClick}
            variant="outlined"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Add Slide
          </Button>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            Created:{" "}
            {moment(screenData.createdAt).format("MMMM D, YYYY, HH:mm:ss ")}
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default ScreenDetail;
