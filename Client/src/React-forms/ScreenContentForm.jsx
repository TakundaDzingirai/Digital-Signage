import { useEffect, useState } from "react";
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

  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [urlError, seturlError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAdded, setAdded] = useState(false);
  const { screenId } = useParams();
  const [show, setShow] = useState(false);

  console.log("SCREEN ID: ", screenId);

  useEffect(() => {
    if (isAdded) {
      setTitle("");
      setText("");

      setSelectedImage(null);
      setAdded(false);
      toast.success("Added Succesfully!");
    }

  }, [isAdded, show])


  const handleSubmit = (event) => {
    event.preventDefault();

    setTextError(false);
    setTitleError(false);

    if (text === "") {
      setTextError(true);
    }
    if (title === "") {
      setTitleError(true);
    }


    if (!(textError || titleError)) {

      const data = {
        slideTitle: title,
        post: text,
        imageUrl: selectedImage,
      };
      setShow(true);
      Axios.post(`http://localhost:3000/content/${screenId}`, data)
        .then((response) => {

          setAdded(true);
          setShow(false);
        })
        .catch((err) => {
          toast.error(err);
          setShow(false);
        });
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

    console.log(selectedImage)
  }


  const styl = {
    marginTop: show ? "2vh" : "2vh", // Conditionally set marginTop
    opacity: show ? "0.3" : "1", // Conditionally set opacity
    pointerEvents: show ? "none" : "auto", // Conditionally set pointerEvents
  };

  return (
    <>
      <ScreenPanel />

      <Paper
        elevation={3} // Adds a shadow effect

      >
        <ToastContainer />
        {show && (<CircularIndeterminate />)}

        <form className="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          // encType="multipart/form-data"

          style={styl}
        >
          <h2>Adding new Slide</h2>
          <TextField
            className="TextField"
            label="Slide Title"
            onChange={(e) => setTitle(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3 }}
            value={title}
            error={titleError}
            InputLabelProps={{ style: { color: 'blue' } }}
          />
          <TextField
            className="TextField"

            label="Post"
            onChange={(e) => setText(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            multiline // Set multiline to true
            rows={4} // Optionally, you can set the number of rows to display initially
            value={text}
            error={textError}
            sx={{ mb: 3, }}
            InputLabelProps={{ style: { color: 'blue' } }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
            />
            {selectedImage && (
              <img
                src={selectedImage}
                style={{ width: "40%", height: "15vh", marginLeft: '10px' }}
              />
            )}
          </div>

          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            style={{ borderRadius: "5px", width: "30%", marginTop: "2vh", color: 'blue', borderColor: 'blue' }}

          >
            Add
          </Button>
        </form>

      </Paper>

    </>
  );
}