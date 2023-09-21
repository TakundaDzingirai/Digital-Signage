import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import TextField from '@mui/material/TextField';

export default function ColorPicker({ setTextColor, textColor, setBackgroundColor, backgroundColor }) {
    // Initial background color
    const [showTextColorPicker, setShowTextColorPicker] = useState(false);
    const [showBgColorPicker, setShowBgColorPicker] = useState(false);

    const handleTextColorChange = (color) => {
        setTextColor(color.hex);
    };

    const handleBgColorChange = (color) => {
        setBackgroundColor(color.hex);
    };

    const toggleTextColorPicker = () => {
        setShowTextColorPicker(!showTextColorPicker);
    };

    const toggleBgColorPicker = () => {
        setShowBgColorPicker(!showBgColorPicker);
    };

    return (
        <div style={{ display: "flex", height: "13vh", }}>
            <div style={{ marginTop: "2vh", height: "5vh" }}>
                <TextField
                    label="Text Color"
                    variant="outlined"
                    value={textColor}
                    onClick={toggleTextColorPicker}
                    style={{ backgroundColor: textColor, height: "4vh" }}
                />
                {showTextColorPicker && (
                    <ChromePicker
                        color={textColor}
                        onChange={handleTextColorChange}
                        disableAlpha={true}

                    />
                )}
            </div>
            <div style={{ marginTop: "2vh", height: "5vh" }}>
                <TextField
                    label="Background Color"
                    variant="outlined"
                    value={backgroundColor}
                    onClick={toggleBgColorPicker}
                    style={{ backgroundColor: backgroundColor, height: "4vh" }}
                />
                {showBgColorPicker && (
                    <ChromePicker
                        color={backgroundColor}
                        onChange={handleBgColorChange}
                        disableAlpha={true}
                    />
                )}
            </div>
        </div>
    );
}
