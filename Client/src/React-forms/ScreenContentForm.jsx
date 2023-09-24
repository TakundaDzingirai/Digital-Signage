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
  Grid,
  FormControlLabel,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Axios from "axios";
import CircularIndeterminate from "../CircularIndeterminate";
import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import Header from "../Header";
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
  const [schedulePost, setSchedulePost] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [qrCodeContent, setQrCodeContent] = useState("");
  const [isQrCodeEnabled, setIsQrCodeEnabled] = useState(false);
  const [mediaType, setMediaType] = useState("");

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
    } else if (name === "qrCodeContent") {
      setQrCodeContent(value);
    }
  };

  const toggleQrCodeInput = () => {
    setIsQrCodeEnabled(!isQrCodeEnabled);
    if (!isQrCodeEnabled) {
      setQrCodeContent("");
    }
  };

  const uploadContent = async (formData, screenId) => {
    await Axios.post(`http://localhost:3000/content/${screenId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleMediaTypeChange = (mediaType) => {
    setMediaType(mediaType);
    // Clear previously selected media
    setSelectedImage(null);
    setSelectedVideo(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("slideTitle", title);
    formData.append("post", text);
    formData.append("startDate", startDate !== null ? startDate : "");
    formData.append("endDate", endDate !== null ? endDate : "");

    if (mediaType === "image" && selectedImage) {
      formData.append("media", file);
    } else if (mediaType === "video" && selectedVideo) {
      formData.append("media", videoFile);
    }

    if (isQrCodeEnabled && qrCodeContent) {
      formData.append("qrCodeContent", qrCodeContent);
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
      setVideoFile(null);
      setSelectedVideo(null);
      setQrCodeContent("");

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

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
    setVideoFile(file);
  };

  return (
    <>
      <Paper elevation={3}>
        <ToastContainer />
        {show && <CircularIndeterminate />}

        <form
          className="form"
          autoComplete="off"
          onSubmit={handleSubmit}
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

          <Grid container spacing={2}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                className="TextField"
                label="Title*"
                onChange={(e) =>
                  handleInputChange("slideTitle", e.target.value)
                }
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
            </Grid>
            {/* Text */}
            <Grid item xs={12}>
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
            </Grid>

            {/* Enable QR Code */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isQrCodeEnabled}
                    onChange={toggleQrCodeInput}
                    color="primary"
                  />
                }
                label={isQrCodeEnabled ? "Disable Qr Code" : "Enable Qr Code"}
              />
            </Grid>

            {/* QR Code Content Link */}
            {isQrCodeEnabled && (
              <Grid item xs={12}>
                <TextField
                  className="TextField"
                  label="QR Code Content Link"
                  onChange={(e) =>
                    handleInputChange("qrCodeContent", e.target.value)
                  }
                  variant="outlined"
                  color="primary"
                  fullWidth
                  type="text"
                  sx={{ mb: 3 }}
                  value={qrCodeContent}
                  placeholder="Enter the QR code content link"
                />
              </Grid>
            )}

            {/* Schedule Post */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={schedulePost}
                    onChange={() => setSchedulePost(!schedulePost)}
                    color="primary"
                  />
                }
                label={schedulePost ? "Cancel schedule" : "Schedule content "}
              />
            </Grid>

            {/* Date Pickers */}
            {schedulePost && (
              <>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DateTimePicker", "DateTimePicker"]}
                    >
                      <DateTimePicker
                        label="Start date"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DateTimePicker", "DateTimePicker"]}
                    >
                      <DateTimePicker
                        label="End date"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </>
            )}

            {/* Media Type */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-media-label">
                  Select Media Type
                </InputLabel>
                <Select
                  id="select-media-label"
                  labelId="select-media-label"
                  value={mediaType}
                  onChange={(e) => handleMediaTypeChange(e.target.value)}
                  fullWidth
                  label="Select media type"
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Image Upload */}
            {mediaType === "image" && (
              <Grid item xs={12}>
                <>
                  <label htmlFor="upload-photo" style={{ marginRight: "20px" }}>
                    <Fab
                      color="primary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                      <AddIcon />{" "}
                      {selectedImage ? "Change Photo" : "Upload Photo"}
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
                </>
              </Grid>
            )}

            {/* Video Upload */}
            {mediaType === "video" && (
              <Grid item xs={12}>
                <>
                  <label htmlFor="upload-video" style={{ marginRight: "20px" }}>
                    <Fab
                      color="primary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                      <AddIcon />{" "}
                      {selectedVideo ? "Change Video" : "Upload Video"}
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
                </>
              </Grid>
            )}

            {/* Select Screens */}
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel id="select-screens-label">
                  Select other screens to add content to
                </InputLabel>
                <Select
                  id="other screens"
                  labelId="select-screens-label"
                  multiple
                  value={selectedScreens}
                  onChange={(e) => setSelectedScreens(e.target.value)}
                  fullWidth
                  label="Other screens to add content"
                >
                  {screens.map((screen) => (
                    <MenuItem key={screen._id} value={screen._id}>
                      {screen.screenName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                // sx={{ mt: 3 }}
              >
                Upload Content
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
