import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Avatar,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Link as MUILink,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ToastContainer, toast } from "react-toastify";

const theme = createTheme();

function RegisterForm() {
  const navigate = useNavigate();

  const [registrationData, setRegistrationData] = useState({
    firstname: "",
    lastname: "",
    department: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        "http://localhost:3000/register",
        registrationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const data = response.data;
        const { firstName } = data.user;
        console.log("FIRSTNAME FROM REGISTRATION.......", firstName);
        toast.success(`Welcome to Digi Sign, ${firstName}!`, {
          position: "top-center",
          autoClose: 2000,
        });

        const token = data.token;
        localStorage.setItem("token", token);

        navigate("/screens");
      } else {
        toast.error("Registration failed", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            action={<Link to="/login" />}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  value={registrationData.firstname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  value={registrationData.lastname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={registrationData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={registrationData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={registrationData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                >
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    labelId="department-label"
                    id="department"
                    name="department"
                    value={registrationData.department}
                    onChange={handleChange}
                    label="Department"
                  >
                    <MenuItem value="Computer Science">
                      Computer Science
                    </MenuItem>
                    <MenuItem value="Information Systems">
                      Information Systems
                    </MenuItem>
                    <MenuItem value="Accounting">Accounting</MenuItem>
                    <MenuItem value="Economics">Economics</MenuItem>
                    <MenuItem value="Applied Statistics">
                      Applied Statistics
                    </MenuItem>
                    <MenuItem value="Law">Law</MenuItem>
                    {/* Add more department options here */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MUILink component={Link} to="/" variant="body2">
                  Already have an account? Sign in
                </MUILink>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}

export default RegisterForm;
