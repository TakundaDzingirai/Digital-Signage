import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";

export default function MyCarousel() {
  const location = useLocation();
  const screenId = location.pathname.split("/")[2];

  const [fadeEnter, setFadeEnter] = useState(false);
  const [fadeEnterActive, setFadeEnterActive] = useState(true);
  const [slideDuration, setSlideDuration] = useState(2);
  const [slideInterval, setSlideInterval] = useState(5);
  const [transitionType, setTransitionType] = useState("fade");
  const [background, setbackground] = useState(false);
  const [size, setFontSize] = useState(12);
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [settings, setSettings] = useState({});
  const [done, setDone] = useState(false);
  const [textAlign, setTextAlign] = useState({
    left: false,
    center: false,
    right: false,
  });
  const [fontWeight, setFontWeight] = useState({
    normal: false,
    bold: false,
    italic: false,
  });

  const [pSize, setParagraph] = useState("5px");
  const [hSize, setHeader] = useState("18px");
  const [myfont, setFont] = useState("Times New Roman, serif");
  const [typeWriter, setTypeWriter] = useState(false);

  const [slideData, setSlideData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      Axios.get(`http://localhost:3000/content/allContent?screenId=${screenId}`)
        .then((response) => {
          setSlideData(response.data.content);

          setLastUpdated(Date.now());
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      Axios.get(`http://localhost:3000/screens/carousel/settings/${screenId}`)
        .then((response) => {
          console.log(response)

          setSettings(response.data);
          setDone(false);
        }).catch((error) => {
          console.error("Error fetching data:", error)
        })

    };

    if (screenId && slideData.length === 0) {
      fetchData();
    } else if (lastUpdated) {
      const pollingInterval = 30000;

      const pollIntervalId = setInterval(() => {
        console.log("Polling for updates...");
        fetchData();
      }, pollingInterval);

      return () => {
        clearInterval(pollIntervalId);
      };
    }
  }, [screenId, slideData, lastUpdated]);

  if (slideData.length > 0 && !done) {
    setBackgroundColor(settings.backgroundColor);
    setFont(settings.myfont);
    setTextColor(settings.textColor);
    setTextAlign(settings.textAlign);
    setFontWeight(settings.fontWeight);
    setParagraph(settings.pSize);
    setHeader(settings.hSize);
    setSlideDuration(settings.slideDuration);
    setSlideInterval(settings.slideInterval);
    setTransitionType(settings.transitionType);
    setbackground(settings.background);
    setTypeWriter(settings.typeWriter);
    setDone(true);
  }

  return (
    <div
      className="caroul-wrapper"
      style={{ width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <Carousel
        animation={transitionType}
        duration={slideDuration * 1000}
        interval={slideInterval * 1000}
        stopAutoPlayOnHover={false}
        indicators={false}
        navButtonsAlwaysVisible={false}
        autoPlay={true}
        navButtonsProps={{
          style: {
            display: "none",
          },
        }}
      >
        {slideData.map((item) => (
          <Item
            key={item._id}
            item={item}
            typeWriter={typeWriter}
            background={background}
            size={size}
            textColor={textColor}
            backgroundColor={backgroundColor}
            fontWeight={fontWeight}
            textAlign={textAlign}
            hSize={hSize}
            pSize={pSize}
            myfont={myfont}
          />
        ))}
      </Carousel>
    </div>
  );
}
