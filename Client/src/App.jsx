import "./styles.css";
import { useState } from "react";
import ScreenContainer from "./ScreenContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




import ScreenDetail from "./ScreenDetail"; // Create this component

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);

  const toggleForm = () => {
    setShowForm((s) => !s);
  };
  
  return (
    <div className="App">
      <Router>
        <Routes> {/* Use Routes here */}
          <Route path="/" element={<ScreenContainer
            listOfUsers={listOfUsers}
            setListOfUsers={setListOfUsers}
            showForm={showForm}
            onToggleForm={toggleForm}
          />} />
          <Route path="/screen/:id" element={<ScreenDetail 
          listOfUsers={listOfUsers} 
          setListOfUsers={setListOfUsers}/>} />
        </Routes>
      </Router>
    </div>
  );
}




