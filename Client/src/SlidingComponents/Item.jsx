import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Item.css"
import Typewriter from 'typewriter-effect';

export default function Item({ item, typewriter, background, size, textColor, backgroundColor, fontWeight, textAlign, hSize, pSize, myfont }) {

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
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '60vh', // Adjust the height as needed to cover the whole item
        };
    }
    return (

        <Paper className="paper" style={(background && item.image) ? backgroundImageStyle : {
            backgroundColor: backgroundColor,
            width: "100%",
            height: "60vh",
            margin: "0",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: "center"
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
                {typewriter ? (
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
                    <img className="Image" src={item.image.url} />)
            }
        </Paper >

    );
}
