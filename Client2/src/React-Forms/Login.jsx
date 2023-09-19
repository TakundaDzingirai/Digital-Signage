import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import Header from "../Components/Header";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularIndeterminate from "../Components/CircularIndeterminate";
import { useEffect, useState } from "react";
import "./Form.css";
export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [toastId, setToastId] = useState(null); // Store toastId in state
  const [showDropdown, setShowDropdown] = useState(false);
  const [screenId, setScreen] = useState("");
  const [screenData, setScreenData] = useState([]);

  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (loginSuccess && toastId) {
      // Check the status after a delay
      setShow(false);
      setShowDropdown(true);
      console.log("ScreenData:", screenData);
      console.log(screenId);
      if (selected) {
        const screenObj = {
          screenId: screenId,
          fadeEnter: screenData.fadeEnter,
          fadeEnterActive: screenData.fadeEnterActive,
        };

        navigate(`/content/${screenId}`, { state: { screenId } });
      }
    }
  }, [show, loginSuccess, selected, screenId, navigate]);

  const styl = {
    opacity: showDropdown ? "0.4" : "1", // Conditionally set opacity
    pointerEvents: showDropdown ? "none" : "auto", // Conditionally set pointerEvents
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const fetchData = () => {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      console.log(token);

      Axios.get("http://localhost:3000/screens", { headers })
        .then((response) => {
          console.log(response.data);
          setScreenData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching screens:", error.message);
        });
    };

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
        fetchData();

        setToastId(id); // Store the toastId in state
        setLoginSuccess(true);
      } else {
        toast.error("Incorrect username or password");

        setShow(false);
      }
    } catch (error) {
      toast.error("Incorrect username or password");
      setShow(false);
    }
  };
  const handleSelectChange = (event) => {
    setScreen(event.target.value);
    console.log("Selected value:", event.target.value);
    setSelected(true);
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div styles={{ position: "relative" }}>
        {show && <CircularIndeterminate info={"Verifying..."} />}
        {/* <ToastContainer /> */}
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
                    style={styl}
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
                    style={styl}
                  />

                  {showDropdown && (
                    <Grid item xs={12}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                      >
                        <InputLabel style={{ color: "purple" }} htmlFor="_id">
                          Select an option
                        </InputLabel>
                        <Select
                          className="custom-select"
                          label="Select an option"
                          value={screenId}
                          onChange={handleSelectChange}
                          inputProps={{
                            name: "_id",
                            id: "_id",
                          }}
                        >
                          {screenData.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                              {item.screenName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={styl}
                  >
                    Sign In
                  </Button>
                  <Grid container></Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
}
