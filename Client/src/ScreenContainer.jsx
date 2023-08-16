import Header from "./Header";
import Screens from "./Screens";
import Addbtn from "./Addbtn.jsx";

import CreatescreenForm from "./CreateScreenForm";

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
      <Addbtn showForm={showForm} onToggleForm={onToggleForm} />
      <hr />
    </div>
  );
}
