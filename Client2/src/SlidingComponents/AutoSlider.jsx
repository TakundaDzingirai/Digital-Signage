import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import "./Carousel.css";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Paper } from "@mui/material";
// import Carousel from "./Carousel";
import { useNavigate, useLocation } from "react-router-dom"


export default function AutoSlider() {
    const [fadeEnter, setFadeEnter] = useState(false);
    const [fadeEnterActive, setFadeEnterActive] = useState(true);
    const [slideDuration, setSlideDuration] = useState(2);
    const [slideInterval, setSlideInterval] = useState(25);
    const location = useLocation(); // Use useLocation to access location state
    const { SlideData } = location.state || {}; // Extract SlideData from location state
    console.log(SlideData);


    // Function to handle slider value change
    const handleSlideDurationChange = (event, newValue) => {
        setSlideDuration(newValue);
    };
    const handleSlideIntervalChange = (event, newValue) => {
        setSlideInterval(newValue);
    };

    return (
        <>

            <div className="caroul" style={{
                width: "100%",
                height: "100vh",
                justifyContent: "center",
                position: "absolute",

            }}>
                <Carousel
                    animation={fadeEnter && fadeEnterActive ? "fade" : "slide"} // Set the animation based on state
                    duration={slideDuration * 1000}
                    interval={slideInterval * 1000} // Convert seconds to milliseconds

                >
                    {SlideData.map((item) => <Item key={item._id} item={item} />)}
                </Carousel>



            </div>
        </>
    );
}