import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import "./Carousel.css";
import Axios from "axios"
import { useLocation, useParams } from "react-router-dom"

export default function AutoSlider() {
    const [fadeEnter, setFadeEnter] = useState(false);
    const [fadeEnterActive, setFadeEnterActive] = useState(true);
    const [slideDuration, setSlideDuration] = useState(2);
    const [slideInterval, setSlideInterval] = useState(25);
    const location = useLocation(); // Use useLocation to access location state
    const { screenId } = location.state || {}; // Extract SlideData from location state
    console.log(screenId);

    // Function to handle slider value change
    const handleSlideDurationChange = (event, newValue) => {
        setSlideDuration(newValue);
    };
    const handleSlideIntervalChange = (event, newValue) => {
        setSlideInterval(newValue);
    };
    const { id } = useParams();
    console.log("Id:", id);
    const [slideData, setsldData] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3000/content/${id}`).then((response) => {
            setsldData(response.data);
            console.log("RESPONSE MHANI!!! ", response.data);
        });
    }, [])

    return (
        <>
            <div className="caroul-wrapper"> {/* Wrapping div */}
                <div className="caroul" style={{
                    width: "100%",
                    height: "100vh",
                    justifyContent: "center",
                    position: "absolute",
                }}>
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
                        {slideData.map((item) => <Item key={item._id} item={item} />)}
                    </Carousel>
                </div>
            </div>
        </>
    );
}
