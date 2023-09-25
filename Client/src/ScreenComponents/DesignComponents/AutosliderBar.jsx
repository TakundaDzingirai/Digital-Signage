import React, { useState, useEffect } from 'react';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Container
} from '@mui/material';
import {
    FormatAlignLeft as FormatAlignLeftIcon,
    FormatAlignCenter as FormatAlignCenterIcon,
    FormatAlignRight as FormatAlignRightIcon,
    FormatBold as FormatBoldIcon,
    FormatItalic as FormatItalicIcon,
} from '@mui/icons-material';
import './Autoslider.css';
import ColorPicker from './ColorPicker';
import ListFont from './ListFont';
import FontSize from './FontSize';

export default function AutosliderBar({
    setTextColor,
    textColor,
    setBackgroundColor,
    backgroundColor,
    setTextAlign,
    textAlign,
    setFontWeight,
    fontWeight,
    setHeader,
    setParagraph,
    setFont
}) {
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [leftAlign, setLeftAlign] = useState(false);
    const [centreAlign, setCentreAlign] = useState(false);
    const [rightAlign, setRightAlign] = useState(false);

    useEffect(() => {
        setTextAlign({
            left: leftAlign,
            center: centreAlign,
            right: rightAlign,
        });
    }, [leftAlign, centreAlign, rightAlign]);

    const toggleBold = () => {
        setIsBold(!isBold);
        setFontWeight({
            ...fontWeight,
            bold: !isBold,
        });
    };

    const toggleItalic = () => {
        setIsItalic(!isItalic);
        setFontWeight({
            ...fontWeight,
            italic: !isItalic,
        });
    };
    const toggleAlignment = (alignment) => {
        if (alignment === 'left') {
            setLeftAlign(true);
            setCentreAlign(false);
            setRightAlign(false);
        } else if (alignment === 'centre') {
            setLeftAlign(false);
            setCentreAlign(true);
            setRightAlign(false);
        } else if (alignment === 'right') {
            setLeftAlign(false);
            setCentreAlign(false);
            setRightAlign(true);
        }
    };


    return (
        <>

            <Container maxWidth="lg" style={{ marginTop: "2vh" }}>
                <div
                    style={{
                        height: '2vh',
                        width: '100%',
                        backgroundColor: '#1e366a',

                        position: 'relative',
                        zIndex: 2,
                    }}
                > </div>
                <Grid className="box" spacing={3} container >
                    <Grid item xs={12} sm={4} md={3} lg={1}>

                        <div
                            style={{
                                marginBottom: '3vh',
                                display: 'flex',
                                flexDirection: 'column',
                                color: 'black',
                                textAlign: "left"

                            }}
                        >
                            Text Align
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <IconButton
                                    onClick={() => toggleAlignment('left')}
                                    sx={{ color: leftAlign ? 'primary.main' : 'text.secondary' }}
                                >
                                    <FormatAlignLeftIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => toggleAlignment('centre')}
                                    sx={{ color: centreAlign ? 'primary.main' : 'text.secondary' }}
                                >
                                    <FormatAlignCenterIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => toggleAlignment('right')}
                                    sx={{ color: rightAlign ? 'primary.main' : 'text.secondary' }}
                                >
                                    <FormatAlignRightIcon />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        {/* Column 2 - Font Weight */}
                        <div
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                color: 'black',
                                marginBottom: "3vh"
                            }}
                        >
                            Font Weight

                            <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                <IconButton
                                    onClick={toggleBold}
                                    sx={{ color: isBold ? 'primary.main' : 'text.secondary' }}
                                >
                                    <FormatBoldIcon />
                                </IconButton>
                                <IconButton
                                    onClick={toggleItalic}
                                    sx={{ color: isItalic ? 'primary.main' : 'text.secondary' }}
                                >
                                    <FormatItalicIcon />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={3}>
                        <div   >
                            <ColorPicker setTextColor={setTextColor} textColor={textColor} setBackgroundColor={setBackgroundColor} backgroundColor={backgroundColor} />
                            <Divider orientation="vertical" flexItem />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <div>
                            <ListFont setFont={setFont} />
                            <Divider orientation="vertical" flexItem />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={4}>

                        <FontSize setHeader={setHeader} setParagraph={setParagraph} />

                    </Grid>
                </Grid>
            </Container >
        </>
    );
}
