import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import Axios from "axios";
// import "./ScreenDetail.css";
import { Button } from "@mui/material";
import Slides from "./Slides";
import Header from "../Header";
// import CircularIndeterminate from "../CircularIndeterminate";
import Footer from "../Footer";

import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  AlertTitle,
  Divider,
} from "@mui/material";

export default function ScreenDetail() {
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
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" component="h1">
            {screenData.screenName}
          </Typography>
          <Divider sx={{ mt: 2 }} />
          {loading && !error && !emptyData && <CircularProgress />}
          {error && (
            <Alert
              severity="error"
              style={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTitle>Error</AlertTitle>
              <div style={{ textAlign: "center" }}>{error}</div>
            </Alert>
          )}
          {emptyData && (
            <Alert
              severity="info"
              style={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTitle>No slides uploaded yet</AlertTitle>
              <div style={{ textAlign: "center" }}>
                You can add slides to this screen by clicking the &quot;Add
                Slide&quot;A button below.
              </div>
            </Alert>
          )}
          {!emptyData && <Slides key={id} />}
          <Button
            onClick={handleButtonClick}
            variant="outlined"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Add Slide
          </Button>
          <Typography
            variant="h6"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            Created on{" "}
            {moment(screenData.createdAt).format("MMMM D, YYYY, HH:mm:ss A")}
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}
