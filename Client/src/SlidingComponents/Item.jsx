import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Item({ item }) {
    const randomColor = '#' + (Math.random().toString(16) + '000000').slice(2, 8);
    console.log(item.imageUrl)
    const [ismage, setIsimage] = useState(false);
    useEffect(() => {
        if (item.imageUrl && item.imageUrl.includes("base64")) {
            setIsimage(true);
        }
    }, [item.imageUrl])


    return (
        <Paper className="paper"
            style={{
                backgroundColor: randomColor,
                width: "100%",
                height: "60vh",
                margin: "0",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: "center"
            }}>
            <h2 style={{ paddingBottom: "2em", margin: 0 }}>{item.Title}</h2>
            <p style={{ margin: 0 }}>{item.slideTitle}<br></br>{item.post}</p>
            {ismage && <img src={item.imageUrl} />}
        </Paper>
    );
}
