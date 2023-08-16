import Header from "./Header";
import Screens from "./Screens";
import Addbtn from "./Addbtn.jsx";
import FormPopup from "./FormPopup";

const initialScreens = [
  { id: "1", name: "CSC Level 3", department: "Computer Science" },
  { id: "2", name: "Maths Level 1", department: "Mathematics" },
  { id: "3", name: "Lesley Social 2", department: "Accounting" },
  { id: "4", name: "CSC Level 4", department: "Computer Science" },
  { id: "5", name: "CSC Level 5", department: "Computer Science" },
  { id: "6", name: "CSC Level 6", department: "Computer Science" },
];

export default function ScreenContainer({ showForm, onToggleForm }) {
  return (
    <div>
      <Header />
      <Screens screens={initialScreens} />
      {showForm && <FormPopup />}
      <Addbtn showForm={showForm} onToggleForm={onToggleForm} />
      <hr />
    </div>
  );
}
