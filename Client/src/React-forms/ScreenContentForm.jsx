import { useState } from "react";
import "./Form.css";
import { TextField, Button, Paper } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import ScreenPanel from "../ScreenComponents/ScreenPanel";
import { useParams } from "react-router-dom";
import Axios from "axios";
import CircularIndeterminate from "../CircularIndeterminate";

export default function ScreenContentForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { screenId } = useParams();
  const [show, setShow] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      slideTitle: title,
      post: text,
      imageUrl: selectedImage,
    };
    setShow(true);

    try {
      const response = await Axios.post(
        `http://localhost:3000/content/${screenId}`,
        data
      );
      toast.success("Content uploaded successfully.");
      setShow(false);
    } catch (error) {
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
      setShow(false);
    }
  };

  // Function to handle image upload

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    previewFiles(file);
  };

  // previewFile function
  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    console.log(selectedImage);
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
        >
          <h2>Adding new Slide</h2>
          <TextField
            className="TextField"
            label="Slide Title"
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3 }}
            value={title}
            InputLabelProps={{ style: { color: "blue" } }}
          />
          <TextField
            className="TextField"
            label="Post"
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
            value={text}
            sx={{ mb: 3 }}
            InputLabelProps={{ style: { color: "blue" } }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
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

          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            style={{
              borderRadius: "5px",
              width: "30%",
              marginTop: "2vh",
              color: "blue",
              borderColor: "blue",
            }}
          >
            Add
          </Button>
        </form>
      </Paper>
    </>
  );
}
