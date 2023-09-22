import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import {
    Divider,
} from '@mui/material';

export default function ColorPicker({ setTextColor, textColor, setBackgroundColor, backgroundColor }) {
    // Initial background color
    const [anchorElTextColor, setAnchorElTextColor] = useState(null);
    const [anchorElBgColor, setAnchorElBgColor] = useState(null);

    const handleTextColorChange = (color) => {
        setTextColor(color.hex);
    };

    const handleBgColorChange = (color) => {
        setBackgroundColor(color.hex);
    };

    const openTextColorPicker = (event) => {
        setAnchorElTextColor(event.currentTarget);
    };

    const openBgColorPicker = (event) => {
        setAnchorElBgColor(event.currentTarget);
    };

    const closeTextColorPicker = () => {
        setAnchorElTextColor(null);
    };

    const closeBgColorPicker = () => {
        setAnchorElBgColor(null);
    };

    return (
        <div style={{
            display: "flex", height: "13vh", width: "100%", flexDirection: "column", position: "relative"
        }}>
            Select Color
            <div style={{ display: 'flex', justifyContent: "space-between", width: "100%", position: "relative " }}>
                <div style={{ marginTop: "1vh", height: "5vh", width: "100%" }}>
                    <TextField
                        label="Text Color"
                        variant="outlined"
                        value={textColor}
                        onClick={openTextColorPicker}
                        style={{ backgroundColor: textColor, height: "4vh" }}
                    />
                    <Popover
                        open={Boolean(anchorElTextColor)}
                        anchorEl={anchorElTextColor}
                        onClose={closeTextColorPicker}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <ChromePicker
                            color={textColor}
                            onChange={handleTextColorChange}
                            disableAlpha={true}
                        />
                    </Popover>
                </div>
                <div style={{ marginTop: "1vh", height: "5vh", width: "100%" }}>
                    <TextField
                        label="Background Color"
                        variant="outlined"
                        value={backgroundColor}
                        onClick={openBgColorPicker}
                        style={{ backgroundColor: backgroundColor, height: "4vh" }}
                    />
                    <Popover
                        open={Boolean(anchorElBgColor)}
                        anchorEl={anchorElBgColor}
                        onClose={closeBgColorPicker}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <ChromePicker
                            color={backgroundColor}
                            onChange={handleBgColorChange}
                            disableAlpha={true}
                        />
                    </Popover>
                </div>
            </div>
        </div>
    );
}
