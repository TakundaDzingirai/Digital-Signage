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
  Card,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Footer from "../Footer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "../ResponsiveAppBar";
import { useUser } from "../UserContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
const theme = createTheme();

export default function SlideContent() {
  const { contentId } = useParams();
  const location = useLocation();
  const { setUser, user } = useUser();
  const { screenId } = location.state || {};
  const [content, setContent] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();
  user.user.show = true;

  const newC = user;

  setUser(newC);

  console.log("this", newC);

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
      <ResponsiveAppBar show={true} />
      <ToastContainer />

      <Container maxWidth="lg" style={{ marginTop: theme.spacing(12) }}>
        {content.map((c) => (
          <Paper
            key={c._id}
            elevation={3}
            style={{
              padding: theme.spacing(3),
              marginBottom: theme.spacing(5),
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              color="#1e366a"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              {c.slideTitle}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={6} lg={4}>
                {/* Conditionally render CardMedia for image */}
                {c.image && (
                  <Card>
                    <CardMedia
                      component="img"
                      alt="Slide Image"
                      src={c.image.url}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Card>
                )}
                {/* Conditionally render CardMedia for video */}
                {c.video && (
                  <Card>
                    <CardMedia component="video" controls>
                      <source src={c.video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </CardMedia>
                  </Card>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={8}>
                <Typography
                  variant="body1"
                  paragraph
                  color="textPrimary"
                  sx={{ lineHeight: "1.5" }}
                >
                  {c.post}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="flex-end">
              <Box>
                <IconButton
                  color="error"
                  aria-label="Delete"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  <DeleteForeverIcon />
                </IconButton>
                <Typography variant="subtitle2" color="textSecondary">
                  Delete
                </Typography>
              </Box>
              <Box sx={{ marginLeft: "20px" }}>
                {" "}
                {/* Added margin here */}
                <IconButton
                  color="primary"
                  aria-label="Edit"
                  onClick={handleEdit}
                  disabled={isLoading}
                >
                  <EditIcon />
                </IconButton>
                <Typography variant="subtitle2" color="textSecondary">
                  Edit
                </Typography>
              </Box>
              {/* Conditionally render Play Video button */}
              {c.video && <Box></Box>}
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
            value={editedContent.slideTitle || ""}
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
            value={editedContent.post || ""}
            onChange={(e) =>
              setEditedContent({ ...editedContent, post: e.target.value })
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Start date"
                value={dayjs(editedContent.startDate)}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    startDate: dayjs(e).toISOString(),
                  })
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="End date"
                value={dayjs(editedContent.endDate)}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    endDate: dayjs(e).toISOString(),
                  })
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CreateIcon />}
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
            startIcon={<DeleteIcon />}
            onClick={handleConfirmDelete}
            disabled={isLoading}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CancelIcon />}
            onClick={handleCancelDelete}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
