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
  const [slideInterval, setSlideInterval] = useState(5);
  const [transitionType, setTransitionType] = useState("fade");
  const [background, setbackground] = useState(false);
  const [size, setFontSize] = useState(12)
  const [textColor, setTextColor] = useState('#000000'); // Initial text color
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textAlign, setTextAlign] = useState({
    left: false,
    center: false,
    right: false
  })
  const [fontWeight, setFontWeight] = useState({
    normal: false,
    bold: false,
    italic: false
  })

  const [pSize, setParagraph] = useState("5px");
  const [hSize, setHeader] = useState("18px");
  const [myfont, setFont] = useState("Times New Roman, serif")


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


  //   settings = {
  //     slideDuration: slideDuration,
  //     slideInterval: slideInterval,
  //     typewriter: typewriter,
  //     background: background,
  //     textColor: textColor,
  //     backgroundColor: backgroundColor,
  //     textAlign: textAlign,
  //     fontWeight: fontWeight,
  //     pSize: pSize,
  //     hSize: hSize,
  //     myfont: myfont
  // }


  if (slideData.length > 0) {
    setBackgroundColor(slideData.settings.backgroundColor);
    setFont(slideData.settings.myfont);
    setTextColor(slideData.settings.textColor);
    setTextAlign(slideData.settings.textAlign);
    setFontWeight(slideData.settings.fontWeight);
    setParagraph(slideData.settings.pSize);
    setHeader(slideData.settings.hSize);
    setSlideDuration(slideData.settings.slideDuration);
    setSlideInterval(slideData.settings.slideInterval);
    setTransitionType(slideData.settings.typewriter);
    setbackground(slideData.settings.background);

  }


  return (
    <>
      <div className="caroul-wrapper">

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
            {slideData.map((item) => <Item key={item._id}
              item={item} typewriter={typewriter} background={background}
              size={size} textColor={textColor} backgroundColor={backgroundColor}
              fontWeight={fontWeight} textAlign={textAlign} hSize={hSize}
              pSize={pSize} myfont={myfont} />)}
          </Carousel>
        </div>
      </div>
    </>
  );
}
