import { useState, useEffect } from "react";
import { Grid, IconButton, Paper, Box } from "@mui/material";
import {
    FormatAlignLeft as FormatAlignLeftIcon,
    FormatAlignCenter as FormatAlignCenterIcon,
    FormatAlignRight as FormatAlignRightIcon,
    FormatBold as FormatBoldIcon,
    FormatItalic as FormatItalicIcon,
} from "@mui/icons-material";
import "./Autoslider.css";
import ColorPicker from "./ColorPicker";
import ListFont from "./ListFont";
import FontSize from "./FontSize";

export default function AutosliderBar({
    setTextColor,
    textColor,
    setBackgroundColor,
    backgroundColor,
    setTextAlign,
    setFontWeight,
    fontWeight,
    setHeader,
    setParagraph,
    setFont,
}) {
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [leftAlign, setLeftAlign] = useState(false);
    const [centreAlign, setCentreAlign] = useState(false);
    const [rightAlign, setRightAlign] = useState(false);

    useEffect(() => {
        setTextAlign({
            left: leftAlign,
            center: centreAlign,
            right: rightAlign,
        });
    }, [leftAlign, centreAlign, rightAlign, setTextAlign]);

    const toggleBold = () => {
        setIsBold(!isBold);
        setFontWeight({
            ...fontWeight,
            bold: !isBold,
        });
    };

    const toggleItalic = () => {
        setIsItalic(!isItalic);
        setFontWeight({
            ...fontWeight,
            italic: !isItalic,
        });
    };

    const toggleAlignment = (alignment) => {
        if (alignment === "left") {
            setLeftAlign(true);
            setCentreAlign(false);
            setRightAlign(false);
        } else if (alignment === "centre") {
            setLeftAlign(false);
            setCentreAlign(true);
            setRightAlign(false);
        } else if (alignment === "right") {
            setLeftAlign(false);
            setCentreAlign(false);
            setRightAlign(true);
        }
    };

    return (
        <Box sx={{ mt: 3, mb: 3 }}>
            <Paper elevation={1}>
                <Grid container spacing={1} justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={4} lg={1}>
                        {/* Text Style (Bold and Italics) */}
                        <IconButton
                            onClick={toggleBold}
                            sx={{
                                color: isBold ? "primary.main" : "text.secondary",
                            }}
                        >
                            <FormatBoldIcon />
                        </IconButton>
                        <IconButton
                            onClick={toggleItalic}
                            sx={{
                                color: isItalic ? "primary.main" : "text.secondary",
                            }}
                        >
                            <FormatItalicIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        {/* Text Alignment */}
                        <IconButton
                            onClick={() => toggleAlignment("left")}
                            sx={{
                                color: leftAlign ? "primary.main" : "text.secondary",
                            }}
                        >
                            <FormatAlignLeftIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => toggleAlignment("centre")}
                            sx={{
                                color: centreAlign ? "primary.main" : "text.secondary",
                            }}
                        >
                            <FormatAlignCenterIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => toggleAlignment("right")}
                            sx={{
                                color: rightAlign ? "primary.main" : "text.secondary",
                            }}
                        >
                            <FormatAlignRightIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={1}>
                        {/* ListFont */}
                        <ListFont setFont={setFont} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        {/* Color Picker */}
                        <ColorPicker
                            setTextColor={setTextColor}
                            textColor={textColor}
                            setBackgroundColor={setBackgroundColor}
                            backgroundColor={backgroundColor}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        {/* Font Size */}
                        <FontSize setHeader={setHeader} setParagraph={setParagraph} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
