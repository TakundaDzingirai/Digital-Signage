import { useEffect, useState } from "react";
import "./ScreenContentForm.css";
import { TextField, Button, Paper } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import ScreenPanel from "../ScreenComponents/ScreenPanel";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function ScreenContentForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [url, seturl] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [urlError, seturlError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAdded, setAdded] = useState(false);
  const { screenId } = useParams();

  console.log("SCREEN ID: ", screenId);

  useEffect(() => {
    if (isAdded) {
      setTitle("");
      setText("");
      seturl("");
      setSelectedImage(null);
      setAdded(false);

    }

  },)


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
    if (url == "") {
      seturlError(true);
    }

    if (!(textError || titleError || urlError)) {
      console.log(title, text, url);
      const data = {
        slideTitle: title,
        post: text,
        imageUrl: url,
      };
      console.log(data);
      Axios.post(`http://localhost:3000/content/${screenId}`, data)
        .then((response) => {
          toast.success("Added Succesfully!");
          setAdded(true);


          console.log("THE RESPONSE!!", response.data);
        })
        .catch((err) => {
          console.log("ERROR ENCOUNTERED: ", err.message);
        });
    }
  };
  // Function to handle image upload

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedImage(file);
  // };

  return (
    <>
      <ScreenPanel />
      <h2>Adding new Slide</h2>
      <Paper
        elevation={3} // Adds a shadow effect
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "70%", // Adjust the width as needed
          margin: "0 auto", // Center the form horizontally
          // backgroundColor: "rgba(10, 10, 10, 0.3)"
        }}
      >
        <ToastContainer />
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
        // encType="multipart/form-data"
        >
          <TextField
            label="Slide Title"
            onChange={(e) => setTitle(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3, width: "100%" }}
            value={title}
            error={titleError}
          />
          <TextField
            label="Post"
            onChange={(e) => setText(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            multiline // Set multiline to true
            rows={4} // Optionally, you can set the number of rows to display initially
            value={text}
            error={textError}
            sx={{ mb: 3, width: "100%" }}
          // InputLabelProps={{
          //   style: { color: "lightgrey" }, // Set label color to light grey
          // }}
          />
          <TextField
            label="image url"
            onChange={(e) => seturl(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            multiline // Set multiline to true
            rows={4} // Optionally, you can set the number of rows to display initially
            value={url}
            error={urlError}
            sx={{ mb: 3, width: "100%" }}
          />
          {/* <input
            name="image"
            type="file"
            accept="image/*" // Specify the accepted file types (in this case, images)
            onChange={(e) => handleImageUpload(e)}
          /> */}
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            style={{ borderRadius: "5px" }}
          >
            Add
          </Button>
        </form>
      </Paper>
    </>
  );
}
