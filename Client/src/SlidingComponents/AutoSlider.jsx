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
import ScreenPanel from '../ScreenComponents/ScreenPanel';

export default function AutoSlider() {
    const [fadeEnter, setFadeEnter] = useState(false);
    const [fadeEnterActive, setFadeEnterActive] = useState(true);
    const [slideDuration, setSlideDuration] = useState(2);
    const [slideInterval, setSlideInterval] = useState(25);
    const location = useLocation(); // Use useLocation to access location state
    const { SlideData } = location.state || {}; // Extract SlideData from location state
    console.log(SlideData);


    const items = [
        {
            id: 1,
            Title: "Slide 1",
            Body: "So this is the information of Slide 1!!!",
        },
        {
            id: 2,
            Title: "Slide 2",
            Body: "So this is the information of Slide 2!!!",
        },
        {
            id: 3,
            Title: "Slide 3",
            Body: "So this is the information of Slide 3!!!",
        },
        {
            id: 4,
            Title: "Slide 4",
            Body: "So this is the information of Slide 4!!!",
        }
    ];

    // Function to handle slider value change
    const handleSlideDurationChange = (event, newValue) => {
        setSlideDuration(newValue);
    };
    const handleSlideIntervalChange = (event, newValue) => {
        setSlideInterval(newValue);
    };

    return (
        <>
            <ScreenPanel h_vh={"0.01vh"} />
            <div className="caroul" style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "3vh",
                justifyContent: "center",
                position: "absolute",
                top: '50 %',
                left: "50 %",
                transform: "translate(-50 %, -50 %)"
            }}>
                <Carousel
                    animation={fadeEnter && fadeEnterActive ? "fade" : "slide"} // Set the animation based on state
                    duration={slideDuration * 1000}
                    interval={slideInterval * 1000} // Convert seconds to milliseconds

                >
                    {SlideData.map((item) => <Item key={item._id} item={item} />)}
                </Carousel>

                <br></br>
                <Typography gutterBottom>Set transition duration (in seconds)</Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={slideDuration}
                    step={1}
                    valueLabelDisplay="auto"
                    onChange={handleSlideDurationChange}
                />
                <Typography gutterBottom>Set slide interval (in seconds)</Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={slideInterval}
                    step={1}
                    valueLabelDisplay="auto"
                    onChange={handleSlideIntervalChange}
                />
                <FormControlLabel
                    control={<Switch defaultChecked={fadeEnter} onChange={() => setFadeEnter(!fadeEnter)} />}
                    label="fade-enter"
                />
                <FormControlLabel
                    control={<Switch defaultChecked={fadeEnterActive} onChange={() => setFadeEnterActive(!fadeEnterActive)} />}
                    label="fade-enter-active"
                />
            </div>
        </>
    );
}