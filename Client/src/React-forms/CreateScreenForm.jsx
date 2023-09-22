import { useState, useEffect } from "react";
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
import { screenValidation } from "../Validations/validations";
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

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      let response;
      try {
        response = await Axios.get("http://localhost:3000/departments/");
        if (response.status === 200) {
          setDepartments(response.data);
        } else {
          console.log("Error retrieving department data", response);
        }
      } catch (error) {
        console.log("Error:", response.error.message);
      }
    };

    getDepartments();
  }, []);

  const createScreen = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to create a screen.", {
        position: "top-center",
        autoClose: 2000,
      });
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
          toast.error(error.response.data.error, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("An error occurred while creating the screen.", {
            position: "top-center",
            autoClose: 2000,
          });
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
      <DialogTitle
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#1e366a",
        }}
      >
        Create Screen
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Please enter the name and select the department for the screen.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          placeholder="Eter the name of the screen"
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
            placeholder="Computer Science"
            value={department}
            onChange={handleDepartmentChange}
          >
            {departments
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((department) => (
                <MenuItem key={department._id} value={department.name}>
                  {department.name}
                </MenuItem>
              ))}
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
