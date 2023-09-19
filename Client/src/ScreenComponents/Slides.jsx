import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Slide from "./Slide";
import { Button, Grid, Container, Box, CircularProgress } from "@mui/material";

export default function Slides() {
  const { id } = useParams();
  const [sldData, setsldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:3000/content/${id}`);
        setsldData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handlePreview = () => {
    navigate(`/carousel/${id}`, { state: { SlideData: sldData } });
  };

  return (
    <Container>
      <Box my={2}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {sldData.map((s) => (
              <Grid item xs={12} sm={6} lg={3} key={s._id}>
                <Slide s={s} screenId={id} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {!loading && (
        <Box textAlign="center">
          <Button onClick={handlePreview} variant="outlined" color="primary">
            Preview
          </Button>
        </Box>
      )}
    </Container>
  );
}
