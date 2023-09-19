import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Header from "../Header";
import Footer from "../Footer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SlideContent() {
  const { contentId } = useParams();
  const location = useLocation();
  const { screenId } = location.state || {};
  const [content, setContent] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await Axios.get(
        `http://localhost:3000/content/more/${contentId}`
      );

      const obj = res.data;
      setContent([obj]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contentId]);

  const handleDelete = async () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      console.log("before Delete", contentId);
      const response = await Axios.delete(
        `http://localhost:3000/content/${contentId}`
      );
      console.log(response);
      if (response.status === 200 && response.data) {
        toast.success("Slide deleted successfully.", {
          position: "top-center",
          autoClose: 2000,
        });
        setContent([]);
      } else {
        toast.error("An error occurred while deleting slide", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      setIsLoading(false);
      navigate(`/screens/${screenId}`);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("An error occurred while deleting content", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleEdit = () => {
    setEditedContent(content[0]);
    setEditMode(true);
    setOpenEditDialog(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedContent({});
    setOpenEditDialog(false);
    fetchData();
  };

  const handleSaveEdit = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.put(
        `http://localhost:3000/content/edit/${contentId}`,
        editedContent
      );

      if (response.status === 200 && response.data) {
        setContent([response.data]);
        setIsLoading(false);
        setEditMode(false);
        setOpenEditDialog(false);
        toast.success("Slide updated successfully.", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("An error occurred while updating slide.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating slide.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Header />
      <Container maxWidth="md" style={{ marginTop: theme.spacing(2) }}>
        {content.map((c) => (
          <Paper
            key={c._id}
            elevation={3}
            style={{
              padding: theme.spacing(3),
              marginBottom: theme.spacing(2),
            }}
          >
            <Typography variant="h4" gutterBottom>
              {c.slideTitle}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph>
              {c.post}
            </Typography>

            <Typography variant="subtitle2">
              Created on: {moment(c.createdAt).format("DD/MM/YYYY HH:mm:ss a")}
            </Typography>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginTop: theme.spacing(2) }}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  disabled={isLoading}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
      <Footer />
      <ToastContainer />

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCancelEdit}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Slide</DialogTitle>
        <DialogContent>
          <TextField
            label="Slide Title"
            fullWidth
            margin="normal"
            value={editedContent.slideTitle}
            onChange={(e) =>
              setEditedContent({ ...editedContent, slideTitle: e.target.value })
            }
          />
          <TextField
            label="Post"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={editedContent.post}
            onChange={(e) =>
              setEditedContent({ ...editedContent, post: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleSaveEdit}
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="info"
            startIcon={<CancelIcon />}
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        maxWidth="sm"
      >
        <DialogTitle>Delete Slide</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this slide?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            // startIcon={<DeleteIcon />}
            onClick={handleConfirmDelete}
            disabled={isLoading}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            // startIcon={<CancelIcon />}
            onClick={handleCancelDelete}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
