import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item"
import "./Carousel.css";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";

export default function MyCarousel() {
    const location = useLocation();
    // const screenId = new URLSearchParams(location.search).get("screenId"); // Get screenId from query string
    const screenId = location.pathname.split("/")[2]; // Get screenId from the URL path

    const [fadeEnter, setFadeEnter] = useState(false);
    const [fadeEnterActive, setFadeEnterActive] = useState(true);
    const [slideDuration, setSlideDuration] = useState(2);
    const [slideInterval, setSlideInterval] = useState(5);
    const [transitionType, setTransitionType] = useState("fade");
    const [background, setbackground] = useState(false);
    const [size, setFontSize] = useState(12)
    const [textColor, setTextColor] = useState('#000000'); // Initial text color
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [settings, setSetings] = useState({});
    const [done, setDone] = useState(false);
    const [textAlign, setTextAlign] = useState({
        left: false,
        center: false,
        right: false
    });
    const [fontWeight, setFontWeight] = useState({
        normal: false,
        bold: false,
        italic: false
    });

    const [pSize, setParagraph] = useState("5px");
    const [hSize, setHeader] = useState("18px");
    const [myfont, setFont] = useState("Times New Roman, serif")
    const [typeWriter, setTypeWriter] = useState(false);


    const [slideData, setsldData] = useState([]);


    useEffect(() => {
        console.log("Here")
        console.log(screenId)
        if (screenId && slideData.length === 0) { // Only fetch data if slideData is empty
            console.log("Fetching data for screenId:", screenId);

            Axios.get(`http://localhost:3000/content/allContent?screenId=${screenId}`)
                .then((response) => {
                    // Check if the component is still mounted before updating state
                    console.log("here")

                    setsldData(response.data.content); // Update slideData
                    setSetings(response.data.settings); // Update settings
                    console.log(settings)


                })
                .catch((error) => {
                    // Check if the component is still mounted before handling errors

                    console.error("Error fetching data:", error);

                });

        }


    }, [screenId])

    console.log(settings)
    console.log(typeWriter)

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



    console.log(typeWriter)


    console.log("Interval", slideInterval)
    console.log("duration", slideDuration)
    return (
        <div className="caroul-wrapper" style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
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
                    // <Grid container key={item._id} alignItems="center" justify="center" style={{ width: "1360px", height: "980px" }}>
                    <Item
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
                    // </Grid>
                ))}
            </Carousel>
        </div>
    );
}