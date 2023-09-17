import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import Header from "../Header.jsx";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularIndeterminate from "../CircularIndeterminate";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    if (loginSuccess && toastId) {
      // Check the status after a delay
      setShow(false);
      setTimeout(() => {
        const isActive = toast.isActive(toastId);
        if (isActive) {
          toast.done();
          navigate("/screens");
        }
      }, 2000);
    }
  }, [show, loginSuccess, toastId, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      setShow(true);
      const response = await Axios.post("http://localhost:3000/login", {
        username: data.get("username"),
        password: data.get("password"),
      });

      if (response.status === 200) {
        // Successful login
        const responseData = response.data;
        const token = responseData.token;
        const user = jwt_decode(token);
        const username = user.username;

        localStorage.setItem("token", token);
        const id = toast.success(`Welcome back, ${username}`);

        setToastId(id);
        setLoginSuccess(true);
      } else {
        toast.error("Incorrect username and or password");

        setShow(false);
      }
    } catch (error) {
      toast.error("Incorrect username and or password");
      setShow(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div style={{ position: "relative" }}>
        {show && <CircularIndeterminate info={"Logging in..."} />}
        <ThemeProvider theme={createTheme()}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://source.unsplash.com/random?wallpapers)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="body2"
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
}
