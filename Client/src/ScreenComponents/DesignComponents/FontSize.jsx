import React, { useEffect, useState } from "react";
import { MenuItem, Select, InputLabel, Typography } from "@mui/material";

// Create an array of pixel values from 1px to 200px
const sizeOptions = Array.from({ length: 200 }, (_, i) => `${i + 1}px`);

export default function FontSize({ setHeader, setParagraph }) {
    const [headerSize, setHeaderSize] = useState("");
    const [paragraphSize, setParagraphSize] = useState("");

    const handleHeaderSizeChange = (event) => {
        setHeaderSize(event.target.value);
    };

    const handleParagraphSizeChange = (event) => {
        setParagraphSize(event.target.value);
    };
    useEffect(() => {

        if (headerSize.length !== 0) {
            setHeader(headerSize);
        }
        if (paragraphSize.length !== 0) {
            setParagraph(paragraphSize);
        }

    }, [headerSize, paragraphSize])

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", color: "black" }}>
            <div>
                Header Text Size
                <Select
                    labelId="header-size-label"
                    id="header-size"
                    name="header-size"
                    value={headerSize}
                    onChange={handleHeaderSizeChange}
                    style={{ width: '80%' }}
                >
                    {sizeOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </div>

            <div>
                Paragraph Font Size
                <Select
                    labelId="paragraph-size-label"
                    id="paragraph-size"
                    name="paragraph-size"
                    value={paragraphSize}
                    onChange={handleParagraphSizeChange}
                    style={{ width: '80%' }}
                >
                    {sizeOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </div>


        </div>
    );
}
