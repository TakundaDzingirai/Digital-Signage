import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import "./Carousel.css";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useLocation } from "react-router-dom"
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import AutosliderBar from '../ScreenComponents/DesignComponents/AutosliderBar';
import Footer from '../Footer';
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export default function AutoSlider() {
    // const [fade, setFade] = useState(false);
    // const [slide, setSlide] = useState(true);
    const location = useLocation();
    const { SlideData } = location.state || {}; // Extract SlideData from location state
    const { id } = useParams()
    const [typewriter, setTypewriter] = useState(false);
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

    const handleSlideDurationChange = (event, newValue) => {
        setSlideDuration(newValue);
    };
    const handleSlideIntervalChange = (event, newValue) => {
        setSlideInterval(newValue);
    };

    const saveData = async () => {
        console.log(typewriter)
        const settings = {
            slideDuration: slideDuration,
            slideInterval: slideInterval,
            typeWriter: typewriter,
            background: background,
            textColor: textColor,
            backgroundColor: backgroundColor,
            textAlign: textAlign,
            fontWeight: fontWeight,
            pSize: pSize,
            hSize: hSize,
            myfont: myfont,
            transitionType: transitionType
        }
        try {
            const response = await Axios.post(`http://localhost:3000/screens/carousel/${id}`, settings);
            if (response.status === 200) {
                console.log("status")
                toast.success(response.data)
            } else {
                toast.error(response)
            }


        } catch (error) {
            console.log(error)
        }
    }



    return (
        < >
            <ToastContainer />
            <AutosliderBar setTextColor={setTextColor}
                textColor={textColor}
                setBackgroundColor={setBackgroundColor}
                backgroundColor={backgroundColor}
                setTextAlign={setTextAlign}
                textAlign={textAlign}
                setFontWeight={setFontWeight}
                fontWeight={fontWeight}
                setHeader={setHeader}
                setParagraph={setParagraph}
                setFont={setFont} />
            <Grid container justifyContent="center" alignItems="center" style={{ position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Carousel
                        animation={transitionType} // Set the animation based on state
                        duration={slideDuration * 1000}
                        interval={slideInterval * 1000} // Convert seconds to milliseconds
                        stopAutoPlayOnHover={true}
                        indicators={true}
                        navButtonsAlwaysVisible={true}
                    >
                        {SlideData.map((item) => <Item key={item._id}
                            item={item} typewriter={typewriter} background={background}
                            size={size} textColor={textColor} backgroundColor={backgroundColor}
                            fontWeight={fontWeight} textAlign={textAlign} hSize={hSize}
                            pSize={pSize} myfont={myfont} />)}
                    </Carousel>

                    <br></br>
                    <Typography gutterBottom>Adjust the time it takes for transitions to occur (in seconds)</Typography>
                    <Slider
                        aria-label="Custom marks"
                        defaultValue={slideDuration}
                        step={1}
                        valueLabelDisplay="auto"
                        min={2}
                        max={5}
                        marks={[
                            {
                                value: 2,
                                label: '2s',
                            },
                            {
                                value: slideDuration,
                                label: `${slideDuration}s`,
                            },
                            {
                                value: 5,
                                label: '5s',
                            },
                        ]}
                        onChange={handleSlideDurationChange}
                    />
                    <Typography gutterBottom>Specify the time between slides (in seconds)</Typography>
                    <Slider
                        aria-label="Custom marks"
                        defaultValue={slideInterval}
                        step={1}
                        valueLabelDisplay="auto"
                        min={1}
                        max={120}
                        marks={[
                            {
                                value: slideInterval,
                                label: `${slideInterval}s`,
                            },
                        ]}
                        onChange={handleSlideIntervalChange}
                    />

                    <Typography gutterBottom>  set image as background</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={background}
                                onChange={() => setbackground(!background)}
                            />
                        }
                        label="Background"
                    />
                    <Typography gutterBottom> animation effects</Typography>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <RadioGroup
                            aria-label="Transition Type"
                            name="transitionType"
                            value={transitionType}
                            onChange={(e) => setTransitionType(e.target.value)}
                            row
                        >
                            <FormControlLabel
                                value="fade"
                                control={<Radio />}
                                label="Fade"
                            />
                            <FormControlLabel
                                value="slide"
                                control={<Radio />}
                                label="Slide"
                            />
                        </RadioGroup>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={typewriter}
                                    onChange={() => setTypewriter(!typewriter)}
                                />
                            }
                            label="Typewriter"
                        />

                    </div>

                    <br></br>
                    <Button
                        style={{ marginInline: "1em" }}
                        variant="contained"
                        onClick={saveData}
                    >Save</Button>
                    <Button style={{ marginInline: "1em" }} variant="contained">Reset</Button>

                </Grid>
            </Grid>
            <Footer />
        </>
    );
}