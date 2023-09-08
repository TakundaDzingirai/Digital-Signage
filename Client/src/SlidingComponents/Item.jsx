import { Paper } from "@mui/material";

export default function Item({ item }) {
    const randomColor = '#' + (Math.random().toString(16) + '000000').slice(2, 8);

    return (
        <Paper className="paper"
            style={{
                backgroundColor: randomColor,
                width: "100%", // Set the width to 100% of the Carousel
                height: "60vh",
                margin: "0",
                display: 'flex',
                flexDirection: 'column', // Ensure content is stacked vertically
                justifyContent: 'center',
                alignItems: 'center', // Center content horizontally
                textAlign: "center"

            }}
        >
            <h2
                style={{
                    paddingBottom: "2em",
                    margin: 0,
                }}
            >{item.Title}</h2>
            <p
                style={{
                    margin: 0,
                }}
            >{item.Body}</p>
        </Paper>

    );
}
