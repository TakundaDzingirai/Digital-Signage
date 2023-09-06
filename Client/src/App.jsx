import "./styles.css";
import { useState } from "react";
import ScreenContainer from "./ScreenContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ScreenDetail from "./ScreenDetail";
import RegisterForm from "./RegisterForm"; // Import the RegisterForm component

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);

  const toggleForm = () => {
    setShowForm((s) => !s);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ScreenContainer
                listOfUsers={listOfUsers}
                setListOfUsers={setListOfUsers}
                showForm={showForm}
                onToggleForm={toggleForm}
              />
            }
          />
          <Route
            path="/screen/:id"
            element={
              <ScreenDetail
                listOfUsers={listOfUsers}
                setListOfUsers={setListOfUsers}
              />
            }
          />
          <Route path="/register" element={<RegisterForm />} /> {/* Add the RegisterForm route */}
        </Routes>
      </Router>
    </div>
  );
}
