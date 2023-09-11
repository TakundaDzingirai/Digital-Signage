import Button from "./Button";
export default function Addbtn({ showForm, onToggleForm, buttonName }) {
  return (
    <div>{!showForm && <Button onClick={onToggleForm}>{buttonName}</Button>}</div>
  );
}
