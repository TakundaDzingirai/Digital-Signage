// import

import { useState } from "react";
import { MenuItem, Select, InputLabel } from "@mui/material"
// sample use case
export default function ListFont() {
    const fontOptions = [
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Times New Roman', value: 'Times New Roman, serif' },
        { label: 'Verdana', value: 'Verdana, sans-serif' },
        { label: 'Helvetica', value: 'Helvetica, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Palatino', value: 'Palatino, serif' },
        { label: 'Courier New', value: 'Courier New, monospace' },
        { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
        { label: 'Arial Black', value: 'Arial Black, sans-serif' },
        { label: 'Impact', value: 'Impact, sans-serif' },
        { label: 'Lucida Console', value: 'Lucida Console, monospace' },
        { label: 'Comic Sans MS', value: 'Comic Sans MS, cursive' },
        { label: 'Tahoma', value: 'Tahoma, sans-serif' },
        { label: 'Copperplate', value: 'Copperplate, fantasy' },
        { label: 'Brush Script MT', value: 'Brush Script MT, cursive' },
        { label: 'Franklin Gothic Medium', value: 'Franklin Gothic Medium, sans-serif' },
        { label: 'Century Gothic', value: 'Century Gothic, sans-serif' },
        { label: 'Garamond', value: 'Garamond, serif' },
        { label: 'Bookman Old Style', value: 'Bookman Old Style, serif' },
        { label: 'Arial Narrow', value: 'Arial Narrow, sans-serif' },

    ];


    const [selectedFont, setSelectedFont] = useState("");

    const handleFontChange = (event) => {
        setSelectedFont(event.target.value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: "column" }}>
            Choose Font
            <br />
            <Select

                value={selectedFont}
                onChange={handleFontChange}
                style={{ width: '100%' }} // Adjust the width as needed
            >
                {fontOptions.map((font) => (
                    <MenuItem key={font.label} value={font.value}>
                        {font.label}
                    </MenuItem>
                ))}
            </Select>

        </div>
    );
}
