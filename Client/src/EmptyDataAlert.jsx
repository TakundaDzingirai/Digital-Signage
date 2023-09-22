import { Alert, AlertTitle } from "@mui/material";
const EmptyDataAlert = () => (
  <Alert
    severity="info"
    style={{
      marginTop: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <AlertTitle>No slides uploaded yet</AlertTitle>
    <div style={{ textAlign: "center" }}>
      You can add slides to this screen by clicking the &quot;Add Slide&quot;
      button below.
    </div>
  </Alert>
);

export default EmptyDataAlert;
