import "./Screen.css";
import { Link } from 'react-router-dom';

export default function Screen({ screen }) {

  return (
    <li className="screen">

      <Link to={`/screen/${screen._id}`}>
        <h1>{screen.screenName}</h1>
        <p>{screen.department}</p>
      </Link>
    </li>
  );
}
