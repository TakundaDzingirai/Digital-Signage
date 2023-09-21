import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import "./Autoslider.css"
import ColorPicker from './ColorPicker';
import { useEffect } from 'react';


export default function AutosliderBar({ setTextColor, textColor, setBackgroundColor, backgroundColor, setTextAlign, textAlign, setFontWeight, fontWeight }) {
    const [isBold, setIsBold] = React.useState(false);
    const [isItalic, setIsItalic] = React.useState(false);
    const [leftAlign, setLeftAlign] = React.useState(false);
    const [centreAlign, setCentreAlign] = React.useState(false);
    const [rightAlign, setRightAlign] = React.useState(false);
    useEffect(() => {
        setTextAlign({
            left: leftAlign,
            center: centreAlign,
            right: rightAlign

        })
        console.log(textAlign)
    }, [leftAlign, rightAlign, centreAlign]);




    const toggleBold = () => {
        setIsBold(!isBold);
        setFontWeight({
            ...fontWeight,
            bold: !isBold
        }
        )

    };

    const toggleItalic = () => {
        setIsItalic(!isItalic);
        setFontWeight({
            ...fontWeight,
            italic: !isItalic
        }

        )
        console.log(fontWeight)
    };

    const toggleAlignment = (identity) => {
        if (identity === 'right') {
            setLeftAlign(false);
            setCentreAlign(false);
            setRightAlign(true);

        } else if (identity === 'left') {
            setLeftAlign(true);
            setCentreAlign(false);
            setRightAlign(false);
        } else if (identity === 'centre') {
            setLeftAlign(false);
            setCentreAlign(true);
            setRightAlign(false);

        }
    };

    return (
        <div style={{ height: "2vh", width: "100%", backgroundColor: "#1e366a", marginBottom: "15vh", position: 'relative', zIndex: 2 }}>
            <Grid container style={{ width: '100%' }} alignItems="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Box className="box"
                        sx={{
                            display: 'flex',
                            mt: '2vh',
                            alignItems: 'center',
                            width: '100%',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            bgcolor: 'background.paper',
                            color: 'text.secondary',
                            '& svg': {
                                m: 1.5,
                                cursor: 'pointer', // Add cursor pointer for clickable icons
                                opacity: 0.7, // Initial opacity
                                '&:hover': {
                                    opacity: 1, // Increase opacity on hover
                                },
                            },
                            '& hr': {
                                mx: 0.5,
                            },
                        }}

                    >
                        <div style={{ marginBottom: '1vh', display: "flex", flexDirection: "column", color: "black" }}>Text Align
                            <br></br>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <FormatAlignLeftIcon
                                    onClick={() => toggleAlignment('left')}
                                    sx={{ color: leftAlign ? 'primary.main' : 'text.secondary' }}
                                />
                                <FormatAlignCenterIcon
                                    onClick={() => toggleAlignment('centre')}
                                    sx={{ color: centreAlign ? 'primary.main' : 'text.secondary' }}
                                />
                                <FormatAlignRightIcon
                                    onClick={() => toggleAlignment('right')}
                                    sx={{ color: rightAlign ? 'primary.main' : 'text.secondary' }}
                                />
                            </div>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div style={{ marginBottom: '1vh', display: "flex", flexDirection: "column", color: "black" }}>Font Weight
                            <br></br>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <FormatBoldIcon
                                    onClick={toggleBold}
                                    sx={{ color: isBold ? 'primary.main' : 'text.secondary' }}
                                />
                                <FormatItalicIcon
                                    onClick={toggleItalic}
                                    sx={{ color: isItalic ? 'primary.main' : 'text.secondary' }}
                                />
                            </div>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <ColorPicker setTextColor={setTextColor} textColor={textColor} setBackgroundColor={setBackgroundColor} backgroundColor={backgroundColor} />

                        <Divider orientation="vertical" flexItem />
                    </Box>
                </Grid>
            </Grid>
        </div >
    );
}
