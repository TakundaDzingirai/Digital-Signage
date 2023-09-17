import { useState } from "react";
import "./FormPopup.css";
import Button from "../Button_btn";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateScreenForm({
  listOfScreen,
  setListOfScreen,
  showForm,
  onToggleForm,
}) {
  const [screenName, setScreenName] = useState("");
  const [department, setDepartment] = useState("");

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
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred while creating the screen.");
      }
    }

    setScreenName("");
    setDepartment("");
    onToggleForm();
  };

  const handleCancel = () => {
    setScreenName("");
    setDepartment("");
    onToggleForm();
  };

  return (
    <form style={{ marginTop: "2vh" }} onSubmit={createScreen}>
      <label>Name</label>
      <input
        value={screenName}
        onChange={(e) => setScreenName(e.target.value)}
        type="text"
      />

      <label>Department</label>
      <input
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        type="text"
      />

      <Button onClick={createScreen}>Create screen</Button>

      {showForm && (
        <>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </>
      )}
    </form>
  );
}
