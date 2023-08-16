import Screen from "./Screen";
import "./Screens.css";

export default function Screens({ screens }) {
  return (
    <ul className="screen-list">
      {screens.map((screen) => (
        <Screen key={screen.id} screen={screen} />
      ))}
    </ul>
  );
}
