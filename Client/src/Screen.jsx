import "./Screen.css";
export default function Screen({ screen }) {
  return (
    <li className="screen">
      <h1>{screen.screenName}</h1>
      <p>{screen.department}</p>
    </li>
  );
}