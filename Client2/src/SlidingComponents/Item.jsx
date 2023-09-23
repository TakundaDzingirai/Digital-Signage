import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

import Typewriter from 'typewriter-effect';

export default function Item({ item, typeWriter, background, textColor, backgroundColor, fontWeight, textAlign, hSize, pSize, myfont }) {

    const [ismage, setIsimage] = useState(false);
    const [lines, setLines] = useState([]);
    useEffect(() => {
        if (item && item.image && item.image.url && item.image.url.includes("cloudinary")) {
            setIsimage(true);
        } else {
            setIsimage(false);
        }

        if (item && item.post) {
            // Split item.post into an array of lines
            const postLines = item.post.split("\n");
            // Filter out any empty lines
            const filteredLines = postLines.filter((line) => line.trim() !== "");

            setLines(filteredLines);
        } else {
            setLines([]); // Set lines to an empty array if item.post is not available
        }
    }, [item]);

    let backgroundImageStyle = {};

    if (item.image) {
        backgroundImageStyle = {
            backgroundImage: `url(${item.image.url})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh', // Adjust the height as needed to cover the whole item
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: "center",
            borderRadius: 0
        };
    }
    return (

        <Paper className="paper" style={(background && item.image) ? backgroundImageStyle : {
            backgroundColor: backgroundColor,
            width: "100%",
            height: "100vh",
            margin: "0",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: "center",
            borderRadius: 0
        }}>

            <h2 style={{
                paddingBottom: "2em",
                margin: 0,
                fontSize: `${hSize}`,
                color: textColor,
                fontStyle: fontWeight.italic ? "italic" : "normal",
                textAlign: textAlign.left ? "left" : textAlign.right ? "right" : textAlign.center ? "center" : "",
                fontFamily: myfont
            }}>{item.Title}
            </h2>
            <p style={{
                margin: 0,
                fontSize: `${pSize}`,
                color: textColor,
                fontWeight: fontWeight.bold ? "bold" : "normal",
                fontStyle: fontWeight.italic ? "italic" : "normal",
                textAlign: textAlign.left ? "left" : textAlign.right ? "right" : textAlign.center ? "center" : "",
                fontFamily: myfont
            }}>
                {item.slideTitle}
                <br />
                {typeWriter ? (
                    <Typewriter
                        options={{
                            strings: lines, // Use the lines array as strings
                            autoStart: true,
                            loop: true,
                        }}
                    />
                ) : (
                    lines.map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))
                )}
            </p>
            {
                !background && ismage && (
                    <img style={{ width: "100%", height: "100vh" }} className="Image" src={item.image.url} />)
            }
        </Paper >

    );
}
