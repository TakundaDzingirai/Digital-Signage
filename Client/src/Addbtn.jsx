import Button_btn from "./Button_btn";

export default function Addbtn({ showForm, onToggleForm, buttonName }) {
  return (
    <div>
      {!showForm && (
        <Button_btn onClick={onToggleForm}>{buttonName}</Button_btn>
      )}
    </div>
  );
}
