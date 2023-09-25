import Header from "../Header";
import Screens from "./Screens";
import Addbtn from "../Addbtn.jsx";
import CreatescreenForm from "../React-forms/CreateScreenForm";
import Footer from "../Footer";
import ResponsiveAppBar from "../ResponsiveAppBar";
import { useUser } from "../UserContext";
export default function ScreenContainer({
  showForm,
  onToggleForm,
  listOfScreen,
  setListOfScreen,
}) {
  const { setUser, user } = useUser();
  user.user.show = false;
  const neC = user;
  setUser(neC)
  return (
    <div>
      {/* <Header /> */}
      <ResponsiveAppBar show={false} />
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
