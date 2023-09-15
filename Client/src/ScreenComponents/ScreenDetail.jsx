import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Import useParams and useHistory
import { useEffect, useState } from "react";
import Axios from "axios";
import "./ScreenDetail.css"
import ScreenContentForm from "../React-forms/ScreenContentForm";
import { TextField, Button } from "@mui/material";
import Slides from './Slides';
import ScreenPanel from './ScreenPanel';

export default function ScreenDetail() {
  const { id } = useParams();
  const history = useNavigate(); // Create a history object

  // Find the screen with the matching ID in listOfUsers
  const [screenData, setScreenData] = useState({});
  useEffect(() => {
    Axios.get(`http://localhost:3000/screens/${id}`)
      .then((response) => {
        setScreenData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleButtonClick = () => {
    // Navigate to the CreateContentForm component
    history(`/screens/content/${id}`);
  };

  return (
    <div>
      <ScreenPanel />
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
