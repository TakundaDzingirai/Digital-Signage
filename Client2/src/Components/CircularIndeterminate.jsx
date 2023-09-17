import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./CircularProgress.css"

export default function CircularIndeterminate({ info }) {
    return (
        <Box className="circular-progress" sx={{ display: 'flex' }}>
            <CircularProgress />
            <p style={{ color: "#42f5b9", marginLeft: "1em", fontSize: "20px" }}>{info}</p>
        </Box>
    );
}