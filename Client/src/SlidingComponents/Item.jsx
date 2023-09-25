import { Paper } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import "./Item.css";
import Typewriter from 'typewriter-effect';

export default function Item({ item, typewriter, background, size, textColor, backgroundColor, fontWeight, textAlign, hSize, pSize, myfont, setSlideInterval }) {
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
            const postLines = item.post.split("\n");
            const filteredLines = postLines.filter((line) => line.trim() !== "");

            setLines(filteredLines);
        } else {
            setLines([]);
        }
    }, [item]);

    let backgroundImageStyle = {};

    if (item.image) {
        backgroundImageStyle = {
            backgroundImage: `url(${item.image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '60vh',
        };
    }

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            if (videoElement.readyState >= 1) {
                const videoDuration = videoElement.duration;
                console.log(`Video duration: ${videoDuration} seconds`);
            } else {
                videoElement.addEventListener("loadedmetadata", () => {
                    const videoDuration = videoElement.duration;
                    setSlideInterval(videoDuration);
                    console.log(`Video duration: ${videoDuration} seconds`);
                });
            }

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
            }}>{item.Title}</h2>
            <p style={{
                margin: 0,
                fontSize: `${pSize}`,
                color: textColor,
                fontWeight: fontWeight.bold ? "bold" : "normal",
                fontStyle: fontWeight.italic ? "italic" : "normal",
                textAlign: textAlign.left ? "left" : textAlign.right ? "right" : textAlign.center ? "center" : "",
                fontFamily: myfont
            }}>
                {item.slideTitle}<br />
                {typewriter ? (
                    <Typewriter
                        options={{
                            strings: lines,
                            autoStart: true,
                            loop: true,
                        }}
                    />
                ) : (
                    lines.map((line, index) => (
                        <span key={index}>{line}<br /></span>
                    ))
                )}
            </p>
            {!background && ismage && (
                <img className="Image" src={item.image.url} />
            )}
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
            {item.qrCodeImage ? (<img className="Qr" src={item.qrCodeImage} />) : null}
        </Paper>
    );
}
