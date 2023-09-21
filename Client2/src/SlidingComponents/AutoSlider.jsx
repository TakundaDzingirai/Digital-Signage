import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import "./Carousel.css";
import Axios from "axios";
import { useLocation } from "react-router-dom";

export default function AutoSlider() {
  const [fadeEnter, setFadeEnter] = useState(false);
  const [fadeEnterActive, setFadeEnterActive] = useState(true);
  const [slideDuration, setSlideDuration] = useState(2);
  const [slideInterval, setSlideInterval] = useState(25);
  const location = useLocation();
  const screenId = new URLSearchParams(location.search).get("screenId"); // Get screenId from query string

  const [slideData, setsldData] = useState([]);

  useEffect(() => {
    // Make sure screenId is not null or undefined
    if (screenId) {
      Axios.get(`http://localhost:3000/content/allContent?screenId=${screenId}`)
        .then((response) => {
          setsldData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [screenId]);

  return (
    <>
      <div className="caroul-wrapper">
        {/* Wrapping div */}
        <div
          className="caroul"
          style={{
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            position: "absolute",
          }}
        >
          <Carousel
            animation={fadeEnter && fadeEnterActive ? "fade" : "slide"}
            duration={slideDuration * 1000}
            interval={slideInterval * 1000}
            stopAutoPlayOnHover={false}
            indicators={false}
            navButtonsAlwaysVisible={false}
            autoPlay={true} // Enable auto-play
            navButtonsProps={{
              style: {
                display: "none", // Hide the navigation buttons
              },
            }}
          >
            {slideData.map((item) => (
              <Item key={item._id} item={item} />
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
