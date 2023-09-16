import { TextField, Button } from "@mui/material";

export default function Button_btn({ onClick, children }) {
  return <Button variant="outlined"
    color="secondary" onClick={onClick}>{children}</Button>;
}
