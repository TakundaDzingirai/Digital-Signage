import Button from "./Button";
export default function Addbtn({ showForm, onToggleForm }) {
  return (
    <div>{!showForm && <Button onClick={onToggleForm}>Add screen</Button>}</div>
  );
}
