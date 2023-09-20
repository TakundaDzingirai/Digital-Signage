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
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import ScreenPanel from "../ScreenComponents/ScreenPanel";
import { useParams } from "react-router-dom";
import Axios from "axios";
import CircularIndeterminate from "../CircularIndeterminate";
import { contentValidation } from "../Validations/validations.js";
import * as Yup from "yup";

export default function ScreenContentForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { screenId } = useParams();
  const [show, setShow] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [file, setFile] = useState(null);
  const [selectedScreens, setSelectedScreens] = useState([]);
  const [screens, setScreens] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("slideTitle", title);
    formData.append("post", text);
    formData.append("image", file);

    setShow(true);

    try {
      const response = await Axios.post(
        `http://localhost:3000/content/${screenId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Content uploaded to the selected screen.", {
        position: "top-center",
        autoClose: 2000,
      });

      setTitle("");
      setText("");
      setFile(null);
      setSelectedImage(null);
      setSelectedScreens([]);

      if (selectedScreens.length > 0) {
        for (const selectedScreenId of selectedScreens) {
          const response = await Axios.post(
            `http://localhost:3000/content/${selectedScreenId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        toast.success(
          "Content uploaded successfully to the selected screens from dropdown.",
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
      }

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
          <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
            Add a post
          </Typography>
          <TextField
            className="TextField"
            label="Post title*"
            onChange={(e) => handleInputChange("slideTitle", e.target.value)}
            variant="outlined"
            color="primary"
            fullWidth
            type="text"
            sx={{ mb: 3 }}
            value={title}
            error={!!validationErrors.slideTitle}
            helperText={validationErrors.slideTitle}
            placeholder="Enter your post title"
          />
          <TextField
            className="TextField"
            label="Post*"
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
            placeholder="Enter the your post"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
            />
            {selectedImage && (
              <img
                src={selectedImage}
                style={{ width: "40%", height: "15vh", marginLeft: "10px" }}
              />
            )}
          </div>
          <FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
            <InputLabel id="select-screens-label">Select Screens</InputLabel>
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
            Upload post
          </Button>
        </form>
      </Paper>
    </>
  );
}
