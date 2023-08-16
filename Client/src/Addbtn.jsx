import Button from "./Button";
export default function Addbtn({ showForm, onToggleForm }) {
  return (
    <div>
      <Button onClick={onToggleForm}>
        {showForm ? "Submit" : "Add Screen"}
      </Button>
     
    </div>
  );
}
