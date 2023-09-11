import "./Screen.css";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import Axios from "axios"

export default function Screen({ screen, listOfScreen, setListOfScreen }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    console.log("Before!!!!")
    Axios.delete(`http://localhost:3000/screens/${screen._id}`).then(() => {
      toast.success("Screen deleted successfully");
      setListOfScreen(listOfScreen.filter((s) => {
        return s._id !== screen._id
      }))

    }).catch((err) => {
      console.log("in screen/handleDelete", err)
    });

  }

  return (
    <div
      className="screen"
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/screens/${screen._id}`} style={{ flex: '1' }}>
        <h1>{screen.screenName}</h1>
        <p>{screen.department}</p>
      </Link>
      {isHovered && (
        <Button
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '0',
            marginLeft: '28%',
            alignContent: 'center',
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>

      )}
      <ToastContainer />
    </div>
  );
}
