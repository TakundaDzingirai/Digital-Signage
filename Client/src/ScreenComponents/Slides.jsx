import "./Slide.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Slide from "./Slide";
import { TextField, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
export default function Slides() {
  const { id } = useParams();
  //   console.log(`this:${screen._id}`);
  const [sldData, setsldData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    Axios.get(`http://localhost:3000/content/${id}`).then((response) => {
      setsldData(response.data);
      console.log("RESPONSE MHANI!!! ", response.data);
    });
  }, []);

  const handlePreview = () => {
    console.log("FromSlide", sldData);
    navigate(`/carousel/${id}`, { state: { SlideData: sldData } });
  };
  return (
    <>
      <Button onClick={handlePreview} variant="outlined">
        Preview
      </Button>

      <ul className="Slide-list">
        {sldData.map((s) => (
          <Slide key={s._id} s={s} screenId={id} />
        ))}
      </ul>
    </>
  );
}
