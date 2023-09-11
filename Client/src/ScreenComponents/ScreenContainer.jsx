import Header from "../Header";
import Screens from "./Screens";
import Addbtn from "../Addbtn.jsx";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import DeleteIcon from '@mui/icons-material/Delete';


import CreatescreenForm from "../React-forms/CreateScreenForm";


export default function ScreenContainer({
  showForm,
  onToggleForm,
  listOfUsers,
  setListOfUsers,
}) {




  return (
    <div>
      <Header />
      <Screens listOfUsers={listOfUsers} setListOfUsers={setListOfUsers} />

      {showForm && (
        <CreatescreenForm
          listOfUsers={listOfUsers}
          setListOfUsers={setListOfUsers}
          showForm={showForm}
          onToggleForm={onToggleForm}
        />
      )}
      <Addbtn buttonName={"Add Screen"} showForm={showForm} onToggleForm={onToggleForm} />

      <button style={
        {
          display: "inline-block",

        }
      }
      >Delete Screen</button>
      <hr />
    </div>
  );
}
