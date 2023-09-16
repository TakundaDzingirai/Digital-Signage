import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Axios from "axios";
import "./ScreenDetail.css"
import { TextField, Button } from "@mui/material";
import Slides from './Slides';
import ScreenPanel from './ScreenPanel';
import CircularIndeterminate from '../CircularIndeterminate';

export default function ScreenDetail() {
  const { id } = useParams();
  const history = useNavigate();
  const [screenData, setScreenData] = useState({});
  const [loading, setLoading] = useState(true); // Initially, set loading to true

  useEffect(() => {
    Axios.get(`http://localhost:3000/screens/${id}`)
      .then((response) => {
        setScreenData(response.data);
        setLoading(false); // Set loading to false when data is retrieved
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Make sure to set loading to false on error as well
      });
  }, [id]);

  const handleButtonClick = () => {
    history(`/screens/content/${id}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <ScreenPanel />
      {loading && (<CircularIndeterminate />)} {/* Show loader while loading */}
      <h1>{screenData.screenName} </h1>
      <Slides key={id} />
      <Button
        onClick={handleButtonClick}
        variant="outlined"
        color="secondary"
        style={{ borderRadius: "5px" }}
      >
        Add Slide
      </Button>
      <h3>This screen was created @ {screenData.createdAt}</h3>
    </div >
  );
}
