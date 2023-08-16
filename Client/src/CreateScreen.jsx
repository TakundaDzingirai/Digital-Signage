import Button from "./Button";

export default function CreateScreen() {
  return (
    <form>
      <label>Screen name</label>
      <input type="text" />

      <label>Department</label>
      <input type="text" />

      <Button>Add Screen</Button>
    </form>
  );
}
