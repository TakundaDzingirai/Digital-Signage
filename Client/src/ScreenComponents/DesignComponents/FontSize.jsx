import { useEffect, useState } from "react";
import { Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const sizeOptions = Array.from({ length: 200 }, (_, i) => `${i + 1}px`);

export default function FontSize({ setHeader, setParagraph }) {
  const [headerSize, setHeaderSize] = useState("");
  const [paragraphSize, setParagraphSize] = useState("");

  const handleHeaderSizeChange = (event) => {
    setHeaderSize(event.target.value);
  };

  const handleParagraphSizeChange = (event) => {
    setParagraphSize(event.target.value);
  };

  useEffect(() => {
    if (headerSize.length !== 0) {
      setHeader(headerSize);
    }
    if (paragraphSize.length !== 0) {
      setParagraph(paragraphSize);
    }
  }, [headerSize, paragraphSize, setHeader, setParagraph]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="header-size">Header Text Size</InputLabel>
          <Select
            labelId="header-size-label"
            id="header-size"
            label="Header text size"
            name="header-size"
            value={headerSize}
            onChange={handleHeaderSizeChange}
          >
            {sizeOptions.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="paragraph-size">Paragraph Font Size</InputLabel>
          <Select
            labelId="paragraph-size-label"
            id="paragraph-size"
            label="paragraph font size"
            name="paragraph-size"
            value={paragraphSize}
            onChange={handleParagraphSizeChange}
          >
            {sizeOptions.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
