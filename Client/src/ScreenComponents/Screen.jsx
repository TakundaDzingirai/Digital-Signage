import { Button, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Axios from "axios";
import Modal from "react-modal";
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

  const handleDelete = async () => {
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
    setIsModalOpen(false);
  };

  return (
    <Card
      elevation={3}
      className="screen"
      style={{
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent>
        <Link to={`/screens/${screen._id}`} style={{ textDecoration: "none" }}>
          <Typography variant="h5">{screen.screenName}</Typography>
          <Typography variant="body2">{screen.department}</Typography>
        </Link>
      </CardContent>
      <CardContent>
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            aria-label={`Delete screen ${screen.screenName}`}
          >
            Delete
          </Button>
        </div>
      </CardContent>
      <ToastContainer position="top-center" />
      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Delete Modal"
      >
        <div>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Confirm Deletion
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Are you sure you want to delete this screen?
          </Typography>

          <Button
            variant="outlined"
            sx={{ mb: 2 }}
            color="error"
            onClick={handleConfirmDelete}
            style={{ marginRight: "16px" }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={handleCancelDelete}
          >
            No
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
