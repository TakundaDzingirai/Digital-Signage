import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";
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
import ScreenPanel from "../ScreenComponents/ScreenPanel";
import Header from "../Header";
import CircularIndeterminate from "../CircularIndeterminate";

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
    role: ""
  });
  const [registered, setRegister] = useState(false);
  const [show, setShow] = useState(false);

  const [toastId, setToastId] = useState(null); // Store toastId in state

  const dimmedFormClass = show ? "dimmed-form" : "";

  useEffect(() => {


    if (registered && toastId) {
      // Check the status after a delay
      setShow(false);
      setTimeout(() => {
        const isActive = toast.isActive(toastId);
        if (isActive) {
          toast.done(); // Mark the toast as done

          navigate("/screens");

        }
      }, 2000); // Adjust the delay as needed
    }
  }, [show, registered, toastId, navigate]);



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
      setShow(true);
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


        setToastId(toast.success(`Welcome to Digi Sign, ${registrationData.firstname}!`, {
          position: "top-center",
          autoClose: 2000,
        }));

        const token = data.token;
        localStorage.setItem("token", token);

        setRegister(true);
      } else {
        toast.error("Registration failed", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      setShow(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setShow(false);
  };

  const styl = {
    marginTop: show ? "2vh" : "2vh", // Conditionally set marginTop
    opacity: show ? "0.4" : "1", // Conditionally set opacity
    pointerEvents: show ? "none" : "auto", // Conditionally set pointerEvents
  };


  return (
    <>
      <Header />

      {show && (<CircularIndeterminate info={"Registering..."} />)}
      <ToastContainer />

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" style={styl}>
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



                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth margin="normal" required>
                    <InputLabel id="Role-label">Role</InputLabel>
                    <Select
                      labelId="Role-label"
                      id="role" // Change the id to "role"
                      name="role"
                      value={registrationData.role}
                      onChange={handleChange}
                      label="Role"
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid> {/* Close the Grid container */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {/* Close the Box component */}

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <MUILink component={Link} to="/" variant="body2">
                    Already have an account? Sign in
                  </MUILink>
                </Grid>
              </Grid>
            </Box>
          </Paper >
          <ToastContainer />
        </Container >
      </ThemeProvider >
    </>
  );
}

export default RegisterForm;
