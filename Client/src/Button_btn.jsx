import { Button } from "@mui/material";

export default function Button_btn({ onClick, children }) {
  return (
    <Button
      // style={{ marginTop: "2vh" }}
      variant="outlined"
      color="primary"
      onClick={onClick}
      sx={{ mb: 5, mt: 5 }}
    >
      {children}
    </Button>
  );
}
