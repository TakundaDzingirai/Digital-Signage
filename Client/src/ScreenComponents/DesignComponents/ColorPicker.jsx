import { useState } from "react";
import { ChromePicker } from "react-color";
import { Grid, TextField, Popover } from "@mui/material";

export default function ColorPicker({
  setTextColor,
  textColor,
  setBackgroundColor,
  backgroundColor,
}) {
  const [anchorElTextColor, setAnchorElTextColor] = useState(null);
  const [anchorElBgColor, setAnchorElBgColor] = useState(null);

  const handleTextColorChange = (color) => {
    setTextColor(color.hex);
  };

  const handleBgColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const openTextColorPicker = (event) => {
    setAnchorElTextColor(event.currentTarget);
  };

  const openBgColorPicker = (event) => {
    setAnchorElBgColor(event.currentTarget);
  };

  const closeTextColorPicker = () => {
    setAnchorElTextColor(null);
  };

  const closeBgColorPicker = () => {
    setAnchorElBgColor(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Text Color"
          variant="outlined"
          value={textColor}
          onClick={openTextColorPicker}
          InputProps={{
            style: { borderBottom: `3px solid ${textColor}` },
          }}
          sx={{
            width: "100%",
          }}
        />
        <Popover
          open={Boolean(anchorElTextColor)}
          anchorEl={anchorElTextColor}
          onClose={closeTextColorPicker}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <ChromePicker
            color={textColor}
            onChange={handleTextColorChange}
            disableAlpha={true}
          />
        </Popover>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Background Color"
          variant="outlined"
          value={backgroundColor}
          onClick={openBgColorPicker}
          InputProps={{
            style: { borderBottom: `3px solid ${backgroundColor}` },
          }}
          sx={{
            width: "100%",
          }}
        />
        <Popover
          open={Boolean(anchorElBgColor)}
          anchorEl={anchorElBgColor}
          onClose={closeBgColorPicker}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <ChromePicker
            color={backgroundColor}
            onChange={handleBgColorChange}
            disableAlpha={true}
          />
        </Popover>
      </Grid>
    </Grid>
  );
}
