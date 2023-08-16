import "./styles.css";
import { useState } from "react";
import ScreenContainer from "./ScreenContainer";
export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);

  const toggleForm = () => {
    setShowForm((s) => !s);
  };

  return (
    <div className="App">
      <ScreenContainer
        listOfUsers={listOfUsers}
        setListOfUsers={setListOfUsers}
        showForm={showForm}
        onToggleForm={toggleForm}
      />
    </div>
  );
}
