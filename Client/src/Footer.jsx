import { Container, Typography } from "@mui/material";

const footerStyle = {
  backgroundColor: "#1e366a", //#1976D2,
  color: "white",
  padding: "15px",
  textAlign: "center",
  position: "fixed",
  bottom: "0",
  width: "100%",
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} DigiSign. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
