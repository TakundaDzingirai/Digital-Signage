import { useState, useEffect } from "react";
import "./Form.css";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
  Switch,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import ScreenPanel from "../ScreenComponents/ScreenPanel";
import { useParams } from "react-router-dom";
import Axios from "axios";
import CircularIndeterminate from "../CircularIndeterminate";
import * as Yup from "yup";
// import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ScreenContentForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { screenId } = useParams();
  const [show, setShow] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [file, setFile] = useState(null);
  const [selectedScreens, setSelectedScreens] = useState([]);

  const [screens, setScreens] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [schedulePost, setSchedulePost] = useState(false); // Add a state for scheduling
  const [videoFile, setVideoFile] = useState(null);



  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    Axios.get("http://localhost:3000/screens", { headers })
      .then((response) => {
        setScreens(response.data);
      })
      .catch((error) => {
        console.error("Error fetching screens:", error);
      });
  }, []);

  const handleInputChange = (name, value) => {
    setValidationErrors({ ...validationErrors, [name]: "" });
    if (name === "slideTitle") {
      setTitle(value);
    } else if (name === "post") {
      setText(value);
    }
  };

  const uploadContent = async (formData, screenId) => {
    await Axios.post(`http://localhost:3000/content/${screenId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("slideTitle", title);
    formData.append("post", text);
    if (selectedImage) {
      formData.append("media", file);
    }

    if (startDate && endDate) {
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
    }
    if (selectedVideo) {
      formData.append("media", videoFile);
    }

    setShow(true);

    try {
      await uploadContent(formData, screenId);

      toast.success("Content uploaded to the selected screen.", {
        position: "top-center",
        autoClose: 2000,
      });

      setTitle("");
      setText("");
      setFile(null);
      setSelectedImage(null);
      setStartDate(null);
      setEndDate(null);
      setSelectedVideo(null);

      if (selectedScreens.length > 0) {
        const uploadPromises = selectedScreens.map((selectedScreenId) => {
          return uploadContent(formData, selectedScreenId);
        });

        await Promise.all(uploadPromises);

        toast.success(
          "Content uploaded successfully to the selected screens from dropdown.",
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
      }

      setSelectedScreens([]);
      setShow(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setValidationErrors(validationErrors);
        console.error(validationErrors);
      } else {
        if (error.response) {
          toast.error(error.response.data.error, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("Error uploading content. Please try again later.", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
      setShow(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  const styl = {
    marginTop: show ? "2vh" : "2vh",
    opacity: show ? "0.3" : "1",
    pointerEvents: show ? "none" : "auto",
  };
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(URL.createObjectURL(file)); // Store the video URL
    setVideoFile(file); // Store the video file for later submission

  };

  return (
    <>
      <ScreenPanel />

      <Paper elevation={3}>
        <ToastContainer />
        {show && <CircularIndeterminate />}

        <form
          className="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          style={styl}
          encType="multipart/form-data"
        >
          <Typography
            variant="h5"
            color="primary"
            style={{
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Add Content to Screen
          </Typography>

          <TextField
            className="TextField"
            label="Title*"
            onChange={(e) => handleInputChange("slideTitle", e.target.value)}
            variant="outlined"
            color="primary"
            fullWidth
            type="text"
            sx={{ mb: 3 }}
            value={title}
            error={!!validationErrors.slideTitle}
            helperText={validationErrors.slideTitle}
            placeholder="Enter title of your content"
          />
          <TextField
            className="TextField"
            label="Text*"
            onChange={(e) => handleInputChange("post", e.target.value)}
            variant="outlined"
            color="primary"
            fullWidth
            multiline
            rows={4}
            value={text}
            sx={{ mb: 3 }}
            error={!!validationErrors.post}
            helperText={validationErrors.post}
            placeholder="Enter text for your content"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <label htmlFor="upload-photo" style={{ marginRight: "20px" }}>
              <Fab
                color="primary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <AddIcon /> {selectedImage ? "Change Photo" : "Upload Photo"}
              </Fab>
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="image"
                type="file"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>

            {selectedImage && (
              <div>
                <img
                  src={selectedImage}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "15vh",
                  }}
                  alt="Preview"
                />
              </div>
            )}
          </div>
          <label htmlFor="upload-video" style={{ marginRight: "20px" }}>
            <Fab
              color="primary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <AddIcon /> {selectedVideo ? "Change Video" : "Upload Video"}
            </Fab>
            <input
              style={{ display: "none" }}
              id="upload-video"
              name="video"
              type="file"
              accept="video/*"
              onChange={(e) => handleVideoUpload(e)}
            />
          </label>

          {selectedVideo && (
            <div>
              <video
                controls
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "15vh",
                }}
              >
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}


          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={schedulePost}
                  onChange={() => setSchedulePost(!schedulePost)}
                  color="primary"
                />
              }
              label={schedulePost ? "Cancel schedule" : "Schedule "}
            />
          </div>

          {schedulePost && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ flex: 1, marginRight: "1rem" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Start date"
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div style={{ flex: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="End date"
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          )}

          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="select-screens-label">
              Select other screens to add content to
            </InputLabel>
            <Select
              labelId="select-screens-label"
              multiple
              value={selectedScreens}
              onChange={(e) => setSelectedScreens(e.target.value)}
              fullWidth
            >
              {screens.map((screen) => (
                <MenuItem key={screen._id} value={screen._id}>
                  {screen.screenName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3 }}
          >
            Upload Content
          </Button>
        </form>
      </Paper>
    </>
  );
}
