import { Container, Typography } from "@mui/material";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  position: "relative",
};

const footerStyle = {
  backgroundColor: "#1e366a",
  color: "white",
  padding: "15px",
  textAlign: "center",
  marginTop: "auto",
  position: "sticky",
  bottom: "0",
};

const Footer = () => {
  return (
    <div style={containerStyle}>
      <footer style={footerStyle}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            &copy; {new Date().getFullYear()} DigiSign. All rights reserved.
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
