import { Paper } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

import Typewriter from 'typewriter-effect';

export default function Item({ item, typeWriter, background, textColor, backgroundColor, fontWeight, textAlign, hSize, pSize, myfont }) {

    const [ismage, setIsimage] = useState(false);
    const [lines, setLines] = useState([]);
    const videoRef = useRef(null);
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
    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            // Add an event listener for the "ended" event to replay the video
            videoElement.addEventListener("ended", () => {
                videoElement.currentTime = 0; // Reset the video to the beginning
                videoElement.play(); // Replay the video
            });
        }
    }, []);


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


            <p style={{
                margin: 0,
                fontSize: `${pSize}`,
                color: textColor,
                fontWeight: fontWeight.bold ? "bold" : "normal",
                fontStyle: fontWeight.italic ? "italic" : "normal",
                textAlign: textAlign.left ? "left" : textAlign.right ? "right" : textAlign.center ? "center" : "",
                fontFamily: myfont
            }}>

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
            {item.video ? (
                <div className="video-container">
                    <video
                        ref={videoRef}
                        src={item.video.url}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        autoPlay
                        muted
                        playsInline
                    />
                </div>
            ) : null}
        </Paper >

    );
}
