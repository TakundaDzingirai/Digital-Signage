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
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
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
    <>
      <Link to={`/screens/${screen._id}`} style={{ textDecoration: "none" }}>
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
          <CardContent style={{ color: "#333" }}>
            <Typography
              variant="h5"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1e366a", //#333
                marginBottom: "0.5rem",
              }}
            >
              {screen.screenName}
            </Typography>
            <Typography
              variant="body2"
              style={{
                marginTop: "10px",
                color: "#555",
                fontStyle: "italic",
              }}
            >
              Department of {screen.department}
            </Typography>
          </CardContent>
          <CardContent>
            <div
              style={{ textAlign: "center", marginTop: "8px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(e);
              }}
            >
              <Button
                variant="outlined"
                color="error"
                aria-label={`Delete screen ${screen.screenName}`}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
      <ToastContainer />
      <Modal
        style={customStyles}
        isOpen={isModalOpen && deleteClicked}
        onRequestClose={handleCancelDelete}
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
    </>
  );
}
