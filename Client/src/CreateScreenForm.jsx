import { useState } from "react";
import "./FormPopup.css";
import Button from "./Button";
import Axios from "axios";

export default function CreateScreenForm({ listOfUsers, setListOfUsers }) {
  const [screenName, setScreenName] = useState("");
  const [department, setDepartment] = useState("");

  const createScreen = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3000/screens", {
      screenName,
      department,
    }).then((response) => {
      setListOfUsers([...listOfUsers, { screenName, department }]);
    });

    setScreenName("");
    setDepartment("");
  };

  return (
    <form onSubmit={createScreen}>
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

      <Button>Create screen</Button>
    </form>
  );
}
