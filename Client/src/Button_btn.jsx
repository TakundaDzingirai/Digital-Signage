import { TextField, Button } from "@mui/material";

export default function Button_btn({ onClick, children }) {
  return <Button style={{ marginTop: "2vh" }} variant="outlined"
    color="secondary" onClick={onClick}>{children}</Button>;
}
