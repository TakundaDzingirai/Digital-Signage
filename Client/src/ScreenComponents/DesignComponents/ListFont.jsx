import { useEffect, useState } from "react";
import { MenuItem, Select, InputLabel, FormControl, Grid } from "@mui/material";
import { styled } from "@mui/system";

const fontOptions = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Helvetica", value: "Helvetica, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Palatino", value: "Palatino, serif" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
  { label: "Arial Black", value: "Arial Black, sans-serif" },
  { label: "Impact", value: "Impact, sans-serif" },
  { label: "Lucida Console", value: "Lucida Console, monospace" },
  { label: "Comic Sans MS", value: "Comic Sans MS, cursive" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Copperplate", value: "Copperplate, fantasy" },
  { label: "Brush Script MT", value: "Brush Script MT, cursive" },
  {
    label: "Franklin Gothic Medium",
    value: "Franklin Gothic Medium, sans-serif",
  },
  { label: "Century Gothic", value: "Century Gothic, sans-serif" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Bookman Old Style", value: "Bookman Old Style, serif" },
  { label: "Arial Narrow", value: "Arial Narrow, sans-serif" },
];

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: "200px", // Set a reasonable width
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%", // Full width on small screens
  },
}));

export default function ListFont({ setFont }) {
  const [selectedFont, setSelectedFont] = useState("");

  useEffect(() => {
    setFont(selectedFont);
  }, [selectedFont, setFont]);

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <StyledFormControl variant="outlined">
          <InputLabel htmlFor="font-select">Select Font</InputLabel>
          <Select
            value={selectedFont}
            onChange={handleFontChange}
            label="Select Font"
            id="font-select"
          >
            {fontOptions.map((font) => (
              <MenuItem key={font.label} value={font.value}>
                {font.label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Grid>
    </Grid>
  );
}
