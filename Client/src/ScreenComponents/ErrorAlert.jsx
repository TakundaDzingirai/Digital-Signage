import { Alert, AlertTitle } from "@mui/material";
const ErrorAlert = ({ error }) => (
  <Alert
    severity="error"
    style={{
      marginTop: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <AlertTitle>Error</AlertTitle>
    <div style={{ textAlign: "center" }}>{error}</div>
  </Alert>
);

export default ErrorAlert;
