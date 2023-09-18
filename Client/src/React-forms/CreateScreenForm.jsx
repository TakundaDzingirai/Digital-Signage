import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { toast } from "react-toastify";
import Axios from "axios";
import "./FormPopup.css";
import "react-toastify/dist/ReactToastify.css";
import { screenValidation } from "../Validations/screenValidation";
import * as Yup from "yup";

export default function CreateScreenForm({
  listOfScreen,
  setListOfScreen,
  showForm,
  onToggleForm,
}) {
  const [screenName, setScreenName] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState({});

  const createScreen = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to create a screen.");
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      await screenValidation.validate(
        { screenName, department },
        { abortEarly: false }
      );

      const response = await Axios.post(
        "http://localhost:3000/screens",
        {
          screenName,
          department,
        },
        { headers }
      );
      setListOfScreen([...listOfScreen, { screenName, department }]);
      toast.success(response.data);

      setScreenName("");
      setDepartment("");
      setErrors({});
      onToggleForm();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while creating the screen.");
        }
      }
    }
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setErrors({ ...errors, department: "" });
  };

  const handleNameChange = (e) => {
    setScreenName(e.target.value);
    setErrors({ ...errors, screenName: "" });
  };

  const handleCancel = () => {
    setScreenName("");
    setDepartment("");
    setErrors({});
    onToggleForm();
  };

  return (
    <Dialog open={showForm} onClose={handleCancel}>
      <DialogTitle>Create Screen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the name and select the department for the screen.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          variant="outlined"
          value={screenName}
          onChange={handleNameChange}
          error={!!errors.screenName}
          helperText={errors.screenName}
          sx={{ mb: 3 }}
        />
        <FormControl fullWidth variant="outlined" error={!!errors.department}>
          <InputLabel>Department</InputLabel>
          <Select
            label="Department"
            value={department}
            onChange={handleDepartmentChange}
          >
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Information Systems">Information Systems</MenuItem>
            <MenuItem value="Applied Statistics">Applied Statistics</MenuItem>
            <MenuItem value="Accounting">Accounting</MenuItem>
            <MenuItem value="Economics">Economics</MenuItem>
            <MenuItem value="Law">Law</MenuItem>
          </Select>
          <FormHelperText error={true}>{errors.department}</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={createScreen} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
