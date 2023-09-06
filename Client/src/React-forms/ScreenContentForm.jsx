
import { useState } from 'react';
// import Button from '../Button';
import "./ScreenContentForm.css"
import { TextField, Button } from "@mui/material";
export default function ScreenContentForm(id) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [Slides, setSlide] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  // const [titleError], setTitlrError = useState(False);
  const createSlide = (e) => {
    e.preventDefault();

    Axios.post(`http://localhost:3000/screens/${id}`, {
      title,
      text,
      imgUrl,
    }).then((response) => {
      setSlide([...Slides, { title, text, imgUrl }]);
    });

    setTitle("");
    setText("");
    setImgUrl("")
    // onToggleForm();
  };

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


  };

  return (
    // <div className='Form'>
    //   <input
    //     type="text"
    //     placeholder="Slide title"
    //     value={title} onChange={(e) => setTitle(e.target.value)}

    //   />
    //   <input
    //     type="text"
    //     placeholder="Enter Text"
    //     value={text} onChange={(e) => setText(e.target.value)}

    //   />
    //   <input
    //     type="text"
    //     placeholder="ImageUrl"
    //     value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}

    //   />
    //   <Button>add</Button>
    // </div>
    <>
      <h2>Adding new Slide</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Slide Title"
          onChange={(e) => setTitle(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={title}
          error={titleError}
        />
        <TextField
          label="Post"
          onChange={(e) => setText(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={text}
          error={textError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          style={{ borderRadius: "5px" }}
        >
          Add
        </Button>
      </form>
    </>

  );



}