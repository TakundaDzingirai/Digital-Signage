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
  Link as MUILink,
  Paper,
  ThemeProvider,
  createTheme,
  FormHelperText,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Header from "../Header";
import CircularIndeterminate from "../CircularIndeterminate";
import { registrationValidation } from "../Validations/validations";
import * as Yup from "yup";

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
    role: "",
  });
  const [registered, setRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (registered) {
      setShow(false);
      setTimeout(() => {
        navigate("/screens");
      }, 2000);
    }
  }, [show, registered, navigate]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    try {
      await registrationValidation.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }

    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registrationValidation.validate(registrationData, {
        abortEarly: false,
      });

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

        const token = data.token;
        localStorage.setItem("token", token);

        setRegister(true);
      } else {
        console.error("Registration failed");
      }
      setShow(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error.response.data.error);
      }
      setShow(false);
    }
  };

  const styl = {
    marginTop: show ? "2vh" : "2vh",
    opacity: show ? "0.4" : "1",
    pointerEvents: show ? "none" : "auto",
  };

  return (
    <>
      <Header />

      {show && <CircularIndeterminate info={"Registering..."} />}

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
                    error={!!errors.firstname}
                    helperText={errors.firstname}
                    inputProps={{
                      style: {
                        borderColor: errors.firstname ? "red" : "green",
                      },
                    }}
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
                    error={!!errors.lastname}
                    helperText={errors.lastname}
                    inputProps={{
                      style: {
                        borderColor: errors.lastname ? "red" : "green",
                      },
                    }}
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
                    error={!!errors.email}
                    helperText={errors.email}
                    inputProps={{
                      style: {
                        borderColor: errors.email ? "red" : "green",
                      },
                    }}
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
                    error={!!errors.username}
                    helperText={errors.username}
                    inputProps={{
                      style: {
                        borderColor: errors.username ? "red" : "green",
                      },
                    }}
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
                    error={!!errors.password}
                    helperText={errors.password}
                    inputProps={{
                      style: {
                        borderColor: errors.password ? "red" : "green",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.department}
                  >
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      name="department"
                      value={registrationData.department}
                      onChange={handleChange}
                      label="Department"
                      inputProps={{
                        style: {
                          borderColor: errors.department ? "red" : "green",
                        },
                      }}
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
                  {errors.department && (
                    <FormHelperText error>{errors.department}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.role}
                  >
                    <InputLabel id="Role-label">Role</InputLabel>
                    <Select
                      labelId="Role-label"
                      id="role"
                      name="role"
                      value={registrationData.role}
                      onChange={handleChange}
                      label="Role"
                      inputProps={{
                        style: {
                          borderColor: errors.role ? "red" : "green",
                        },
                      }}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.role && (
                    <FormHelperText error>{errors.role}</FormHelperText>
                  )}
                </Grid>
              </Grid>{" "}
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
        </Container>
      </ThemeProvider>
    </>
  );
}

export default RegisterForm;
