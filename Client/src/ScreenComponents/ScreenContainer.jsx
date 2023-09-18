import Header from "../Header";
import Screens from "./Screens";
import Addbtn from "../Addbtn.jsx";
import CreatescreenForm from "../React-forms/CreateScreenForm";
import Footer from "../Footer";
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
      <Addbtn
        buttonName={"Add Screen"}
        showForm={showForm}
        onToggleForm={onToggleForm}
      />
      <Footer />
    </div>
  );
}
