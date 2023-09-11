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
  listOfScreen,
  setListOfScreen,
}) {




  return (
    <div>
      <Header />
      <Screens listOfScreen={listOfScreen} setListOfScreen={setListOfScreen} />

      {showForm && (
        <CreatescreenForm
          listOfScreen={listOfScreen}
          setListOfScreen={setListOfScreen}
          showForm={showForm}
          onToggleForm={onToggleForm}
        />
      )}
      <Addbtn buttonName={"Add Screen"} showForm={showForm} onToggleForm={onToggleForm} />


      <hr />
    </div>
  );
}
