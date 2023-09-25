import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import "./Carousel.css";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, Grid, Box } from "@mui/material";
import Switch from "@mui/material/Switch";
import AutosliderBar from "../ScreenComponents/DesignComponents/AutosliderBar";
import Footer from "../Footer";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function AutoSlider() {
    const location = useLocation();
    const { SlideData } = location.state || {};
    const { id } = useParams();
    const [typewriter, setTypewriter] = useState(false);
    const [slideDuration, setSlideDuration] = useState(2);
    const [slideInterval, setSlideInterval] = useState(5);
    const [transitionType, setTransitionType] = useState("fade");
    const [background, setbackground] = useState(true);
    const [size, setFontSize] = useState(12);
    const [textColor, setTextColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
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
    const [screenSettings, setScreenSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleSlideDurationChange = (event, newValue) => {
        setSlideDuration(newValue);
    };
    const handleSlideIntervalChange = (event, newValue) => {
        setSlideInterval(newValue);
    };

    useEffect(() => {
        const fetchScreenSettings = async () => {
            try {
                const response = await Axios.get(
                    //carousel/settings/:id
                    `http://localhost:3000/screens/carousel/settings/${id}`
                );
                if (response.status === 200) {
                    const settings = response.data;
                    setScreenSettings(settings);
                    setSlideDuration(settings.slideDuration);
                    setSlideInterval(settings.slideInterval);
                    setTypewriter(settings.typeWriter);
                    setbackground(settings.background);
                    setTextColor(settings.textColor);
                    setBackgroundColor(settings.backgroundColor);
                    setTextAlign(settings.textAlign);
                    setFontWeight(settings.fontWeight);
                    setParagraph(settings.pSize);
                    setHeader(settings.hSize);
                    setFont(settings.myFont);
                    setTransitionType(settings.transitionType);
                    setIsLoading(false);
                    console.log("SLIDE DURATION.....", settings.slideDuration);
                } else {
                    toast.error("Error fetching screen settings");
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch screen settings");
            }
        };
        fetchScreenSettings();
    }, [id]);

    const saveSettings = async () => {
        const settings = {
            slideDuration,
            slideInterval,
            typeWriter: typewriter,
            background,
            textColor,
            backgroundColor,
            textAlign,
            fontWeight,
            pSize,
            hSize,
            myFont: myfont,
            transitionType,
        };

        try {
            const response = await Axios.put(
                `http://localhost:3000/screens/carousel/${id}`,
                settings
            );
            if (response.status === 200) {
                console.log("Saved Successfully");
                toast.success("Settings saved successfully");
            } else {
                toast.error("Error saving settings");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to save settings");
        }
    };

    return (
        <>
            <ToastContainer />
            <AutosliderBar
                setTextColor={setTextColor}
                textColor={textColor}
                setBackgroundColor={setBackgroundColor}
                backgroundColor={backgroundColor}
                setTextAlign={setTextAlign}
                textAlign={textAlign}
                setFontWeight={setFontWeight}
                fontWeight={fontWeight}
                setHeader={setHeader}
                setParagraph={setParagraph}
                setFont={setFont}
            />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ position: "relative", zIndex: 1 }}
                sx={{ p: 5 }}
            >
                <Grid item xs={12} sm={10} md={10} lg={8}>
                    <Carousel
                        animation={transitionType}
                        duration={slideDuration * 1000}
                        interval={slideInterval * 1000}
                        stopAutoPlayOnHover={true}
                        indicators={true}
                        navButtonsAlwaysVisible={true}
                    >
                        {SlideData.map((item) => (
                            <Item
                                key={item._id}
                                item={item}
                                typewriter={typewriter}
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

                    <Box mt={3}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ mb: 1, mt: 1 }}>
                                    Adjust the time it takes for transitions to occur (in seconds)
                                </Typography>

                                <Slider
                                    aria-label="Custom marks"
                                    value={slideDuration}
                                    step={1}
                                    valueLabelDisplay="auto"
                                    min={2}
                                    max={5}
                                    marks={[
                                        {
                                            value: 2,
                                            label: "2s",
                                        },
                                        {
                                            value: slideDuration,
                                            label: `${slideDuration}s`,
                                        },
                                        {
                                            value: 5,
                                            label: "5s",
                                        },
                                    ]}
                                    onChange={handleSlideDurationChange}
                                />
                                <Typography gutterBottom sx={{ mb: 1, mt: 1 }}>
                                    Specify the time between slides (in seconds)
                                </Typography>
                                <Slider
                                    aria-label="Custom marks"
                                    value={slideInterval}
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

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={background}
                                            onChange={() => setbackground(!background)}
                                        />
                                    }
                                    label={
                                        background
                                            ? "Remove image as background"
                                            : "Set image as background"
                                    }
                                />

                                <Typography sx={{ mt: 1, mb: 1 }} variant="h5">
                                    Animation Effects
                                </Typography>
                                <Box display="flex" justifyContent="center">
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
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box mt={3}>
                        <Button
                            style={{ marginRight: "1em" }}
                            variant="contained"
                            onClick={saveSettings}
                        >
                            Save
                        </Button>
                        <Button variant="contained">Reset</Button>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
}
