import { Paper } from "@mui/material";

export default function Item({ item }) {
    const randomColor = '#' + (Math.random().toString(16) + '000000').slice(2, 8);

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
        </Paper>
    );
}
