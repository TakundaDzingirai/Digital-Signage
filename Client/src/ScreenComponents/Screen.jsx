import { useState } from "react";
import {
  Button,
  Typography,
  CardContent,
  IconButton,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import Modal from "react-modal";
import DeleteIcon from "@mui/icons-material/Delete";
import AppsIcon from "@mui/icons-material/Apps";
import "./Screen.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    maxWidth: "400px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
};

export default function Screen({ screen, listOfScreen, setListOfScreen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteClicked(true);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await Axios.delete(
        `http://localhost:3000/screens/${screen._id}`
      );

      if (response.status === 200 && response.data) {
        toast.success(response.data, {
          position: "top-center",
          autoClose: 2000,
        });
        setListOfScreen(listOfScreen.filter((s) => s._id !== screen._id));
      } else {
        toast.error("Error deleting screen, please try again later", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the screen", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteClicked(false);
    setIsModalOpen(false);
  };

  return (
    <Paper elevation={3} className="screen" style={{ position: "relative" }}>
      <Link to={`/screens/${screen._id}`} style={{ textDecoration: "none" }}>
        <CardContent style={{ height: "80px" }}>
          <Typography
            variant="h5"
            color="#1e366a"
            style={{ fontWeight: "bold" }}
          >
            {screen.screenName}
          </Typography>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "8px" }}
          >
            <AppsIcon sx={{ marginRight: 1 }} />
            <Typography color="#444" variant="body2">
              Department: {screen.department}
            </Typography>
          </div>
        </CardContent>
      </Link>
      <div style={{ position: "absolute", top: "8px", right: "8px" }}>
        <IconButton
          color="error"
          aria-label={`Delete screen ${screen.screenName}`}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <Modal
        style={customStyles}
        isOpen={isModalOpen && deleteClicked}
        onRequestClose={handleCancelDelete}
        contentLabel="Confirm Delete Modal"
      >
        <div>
          <Typography variant="h6" style={{ marginBottom: "16px" }}>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "16px" }}>
            Are you sure you want to delete this screen?
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleConfirmDelete}
            style={{ marginRight: "16px" }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={handleCancelDelete}>
            No
          </Button>
        </div>
      </Modal>
    </Paper>
  );
}
