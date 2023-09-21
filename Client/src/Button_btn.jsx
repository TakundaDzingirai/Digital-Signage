import { Button } from "@mui/material";

export default function Button_btn({ onClick, children }) {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={onClick}
      sx={{ mb: 10, mt: 5 }}
    >
      {children}
    </Button>
  );
}
