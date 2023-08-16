import { useState } from "react";
import "./FormPopup.css";
import Axios from "axios";

export default function FormPopup() {
  const [screenName, setScreenName] = useState("");
  const [department, setDepartment] = useState("");

  function handleNameChange(e) {
    setScreenName(e.target.value);
  }

  function handleDepartmentChange(e) {
    setDepartment(e.target.value);
  }

  const createScreen = () => {
    Axios.post("http://localhost:3000/screens", {
      screenName,
      department,
    }).then((response) => {
      alert("User successfully created");
    });
  };

  return (
    <form>
      <label htmlFor="">Name</label>
      <input value={screenName} onChange={handleNameChange} type="text" />

      <label>Department</label>
      <input value={department} onChange={handleDepartmentChange} type="text" />
    </form>
  );
}
