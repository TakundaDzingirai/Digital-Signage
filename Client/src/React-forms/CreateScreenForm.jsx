import { useEffect, useState } from "react";
import "./FormPopup.css";
import Button from "../Button";
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



  // console.log("After");
  // Axios.post("http://localhost:3000/screens", {
  //   screenName,
  //   department,
  // })
  //   .then((response) => {
  //     setListOfUsers([...listOfScreen, { screenName, department }]);
  //     // window.location.reload();
  //   })
  //   .catch((error) => {
  //     console.error("Error creating screen:", error);
  //   });

  // setScreenName("");
  // setDepartment("");
  // onToggleForm();

  const createScreen = (e) => {
    e.preventDefault();
    console.log("Before");
    console.log("After");
    Axios.post("http://localhost:3000/screens", {
      screenName,
      department,
    })
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

  const handleDelete = () => {
    // window.location.reload();
    // Find the screen by name in listOfUsers
    const screenToDelete = listOfScreen.find(
      (screen) => {
        console.log(screen.screenName);

        if (screen.screenName === screenName) {
          console.log("found")
          setFound(true);
          setId(screen._id);
          console.log(screen._id);

          Axios.delete(`http://localhost:3000/screens/${screen._id}`)
            .then(() => {
              // Remove the deleted screen from your local state
              const updateList = listOfScreen.filter((user) => user._id !== screen._id);
              console.log(updateList);

              setListOfScreen(
                updateList
              );
              console.log("Deleted successfully");

            })
            .catch((error) => {
              console.error("Error deleting screen:", error);
            });

        }
      }
    );



    setScreenName("");
    setDepartment("");
    onToggleForm();
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

      {showForm && (
        <>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}
    </form>
  );
}
