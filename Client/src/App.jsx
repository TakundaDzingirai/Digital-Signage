import "./styles.css";
import { useState } from "react";
import ScreenContainer from "./ScreenComponents/ScreenContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./React-forms/Login";
import ScreenDetail from "./ScreenComponents/ScreenDetail";
import RegisterForm from "./React-forms/RegisterForm"; // Import the RegisterForm component
import ScreenContentForm from "./React-forms/ScreenContentForm";
import AutoSlider from "./SlidingComponents/Autoslider"
import SlideContent from "./ScreenComponents/SlideContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [listOfScreen, setListOfUsers] = useState([]);

  const toggleForm = () => {
    setShowForm((s) => !s);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/screens"
            element={
              <ScreenContainer
                listOfScreen={listOfScreen}
                setListOfScreen={setListOfUsers}
                showForm={showForm}
                onToggleForm={toggleForm}
              />
            }
          />
          <Route
            path="/screens/:id"
            element={
              <ScreenDetail
                listOfUsers={listOfScreen}
                setListOfUsers={setListOfUsers}
              />
            }
          />
          <Route path="/register" element={<RegisterForm />} />{" "}
          {/* Add the RegisterForm route */}
          <Route
            path="/screens/content/:screenId"
            element={<ScreenContentForm />}
          />
          <Route path="/carousel/:id" element={<AutoSlider />} />
          {/* <Route path="/dashboard" element={<ScreenContainer />} /> */}
          <Route path="/content/more/:contentId" element={<SlideContent />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}
