import { useState } from "react";
import "./FormPopup.css";
import Button from "../Button_btn";
import Axios from "axios";

export default function CreateScreenForm({
  listOfScreen,
  setListOfScreen,
  showForm,
  onToggleForm,
}) {
  const [screenName, setScreenName] = useState("");
  const [department, setDepartment] = useState("");
  const [id, setId] = useState("");
  const [found, setFound] = useState(false);

  const createScreen = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("TOKEN FROM CREATING SCREEN!!!!", token);
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    Axios.post(
      "http://localhost:3000/screens",
      {
        screenName,
        department,
      },
      { headers }
    )
      .then((response) => {
        setListOfScreen([...listOfScreen, { screenName, department }]);
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating screen:", error);
      });

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
